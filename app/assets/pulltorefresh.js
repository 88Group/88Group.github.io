/**
 * Amolab Pull-to-Refresh — lightweight modern replacement for pulltorefreshjs.
 * Touch-only, top-of-page, Russian labels, theme-aware indicator.
 */
(function (global) {
	'use strict';

	var STYLE_ID = 'amolab-ptr-style';
	var instances = [];

	var defaults = {
		threshold: 64,
		maxPull: 110,
		hold: 52,
		ignore: 10,
		mainElement: 'body',
		triggerElement: 'body',
		onRefresh: null
	};

	function css() {
		return [
			'.amolab-ptr{',
			'position:fixed;left:0;right:0;top:0;z-index:10050;',
			'display:flex;justify-content:center;align-items:flex-start;',
			'pointer-events:none;touch-action:none;',
			'transform:translate3d(0,var(--ptr-y,0),0);',
			'opacity:var(--ptr-opacity,0);',
			'transition:opacity .2s ease,transform .28s cubic-bezier(.22,.61,.36,1);',
			'will-change:transform,opacity;',
			'}',
			'.amolab-ptr.is-dragging{transition:none;}',
			'.amolab-ptr__pill{',
			'margin-top:max(10px,env(safe-area-inset-top,0px));',
			'min-width:44px;height:44px;padding:0 14px;',
			'display:inline-flex;align-items:center;justify-content:center;gap:10px;',
			'border-radius:999px;',
			'background:color-mix(in srgb,var(--bs-body-bg,#fff) 88%,transparent);',
			'color:var(--bs-body-color,#0f172a);',
			'border:1px solid color-mix(in srgb,var(--bs-body-color,#0f172a) 12%,transparent);',
			'box-shadow:0 8px 28px rgba(15,23,42,.14);',
			'backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);',
			'font:600 12px/1.2 Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;',
			'letter-spacing:.01em;',
			'}',
			'.amolab-ptr__ring{',
			'width:22px;height:22px;flex:0 0 auto;position:relative;',
			'}',
			'.amolab-ptr__ring svg{display:block;width:100%;height:100%;transform:rotate(-90deg);}',
			'.amolab-ptr__track{stroke:color-mix(in srgb,currentColor 18%,transparent);fill:none;stroke-width:2.5;}',
			'.amolab-ptr__progress{stroke:currentColor;fill:none;stroke-width:2.5;stroke-linecap:round;',
			'stroke-dasharray:62.83;stroke-dashoffset:calc(62.83 * (1 - var(--ptr-progress,0)));',
			'transition:stroke-dashoffset .05s linear;}',
			'.amolab-ptr.is-refreshing .amolab-ptr__progress{',
			'animation:amolab-ptr-spin .75s linear infinite;',
			'stroke-dasharray:40 23;stroke-dashoffset:0;transition:none;',
			'}',
			'.amolab-ptr__label{white-space:nowrap;max-width:0;overflow:hidden;opacity:0;',
			'transition:max-width .22s ease,opacity .18s ease;}',
			'.amolab-ptr.is-armed .amolab-ptr__label,',
			'.amolab-ptr.is-refreshing .amolab-ptr__label{max-width:180px;opacity:.85;}',
			'@keyframes amolab-ptr-spin{to{transform:rotate(270deg);}}',
			'@media (prefers-reduced-motion:reduce){',
			'.amolab-ptr,.amolab-ptr__label,.amolab-ptr__progress{transition:none!important;animation:none!important;}',
			'}'
		].join('');
	}

	function ensureStyle() {
		if (document.getElementById(STYLE_ID)) return;
		var el = document.createElement('style');
		el.id = STYLE_ID;
		el.textContent = css();
		document.head.appendChild(el);
	}

	function resolveEl(value) {
		if (!value) return document.body;
		if (typeof value === 'string') return document.querySelector(value) || document.body;
		return value;
	}

	function scrollTop() {
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	}

	function isTouchCapable() {
		return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	}

	function isFormField(node) {
		if (!node || node === document) return false;
		var tag = (node.tagName || '').toLowerCase();
		if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
		if (node.isContentEditable) return true;
		return false;
	}

	function isWlUi(node) {
		if (!node || !node.closest) return false;
		return !!node.closest('#tpwl-search, #tpwl-search-wrap, #tpwl-modals, #tpwl-tickets, #tpwl-modals-root');
	}

	function canScrollUp(node) {
		var el = node;
		while (el && el !== document.body && el !== document.documentElement) {
			if (el.nodeType === 1) {
				var style = window.getComputedStyle(el);
				var oy = style.overflowY;
				if ((oy === 'auto' || oy === 'scroll' || oy === 'overlay') && el.scrollTop > 0) {
					return true;
				}
			}
			el = el.parentNode;
		}
		return false;
	}

	/* Linear resistance — must be able to cross threshold (old curve capped below it). */
	function resist(dist, max) {
		return Math.min(max, Math.max(0, dist) * 0.58);
	}

	function hardReload() {
		var url = String(window.location.href || '').split('#')[0];
		url = url.replace(/([?&])_ptr=\d+/g, '$1').replace(/[?&]$/, '');
		var sep = url.indexOf('?') >= 0 ? '&' : '?';
		window.location.replace(url + sep + '_ptr=' + Date.now());
	}

	function createIndicator() {
		var root = document.createElement('div');
		root.className = 'amolab-ptr';
		root.setAttribute('aria-hidden', 'true');
		root.innerHTML =
			'<div class="amolab-ptr__pill">' +
				'<div class="amolab-ptr__ring" aria-hidden="true">' +
					'<svg viewBox="0 0 24 24">' +
						'<circle class="amolab-ptr__track" cx="12" cy="12" r="10"></circle>' +
						'<circle class="amolab-ptr__progress" cx="12" cy="12" r="10"></circle>' +
					'</svg>' +
				'</div>' +
				'<span class="amolab-ptr__label"></span>' +
			'</div>';
		document.body.appendChild(root);
		return {
			root: root,
			label: root.querySelector('.amolab-ptr__label')
		};
	}

	function init(options) {
		options = options || {};
		if (!isTouchCapable()) {
			return { destroy: function () {} };
		}

		ensureStyle();

		var cfg = {};
		Object.keys(defaults).forEach(function (key) {
			cfg[key] = options[key] !== undefined ? options[key] : defaults[key];
		});
		cfg.mainElement = resolveEl(cfg.mainElement);
		cfg.triggerElement = resolveEl(options.triggerElement || cfg.mainElement);

		var ui = createIndicator();
		var state = 'idle';
		var startY = 0;
		var startX = 0;
		var pulling = false;
		var tracking = false;
		var shown = 0;
		var armed = false;

		function setVisual(y, progress, dragging) {
			ui.root.style.setProperty('--ptr-y', y + 'px');
			ui.root.style.setProperty('--ptr-progress', String(Math.max(0, Math.min(1, progress))));
			ui.root.style.setProperty('--ptr-opacity', y > 2 ? '1' : '0');
			ui.root.classList.toggle('is-dragging', !!dragging);
			ui.root.classList.toggle('is-armed', state === 'armed');
			ui.root.classList.toggle('is-refreshing', state === 'refreshing');
		}

		function setLabel(text) {
			ui.label.textContent = text || '';
		}

		function resetPull() {
			pulling = false;
			tracking = false;
			shown = 0;
			armed = false;
			if (state !== 'refreshing') {
				state = 'idle';
				setLabel('');
				setVisual(0, 0, false);
			}
		}

		function runRefresh() {
			if (state === 'refreshing') return;
			state = 'refreshing';
			armed = false;
			tracking = false;
			pulling = false;
			setLabel('Обновление…');
			setVisual(cfg.hold, 1, false);
			ui.root.classList.add('is-refreshing');

			var custom = cfg.onRefresh;
			var navigated = false;

			function go() {
				if (navigated) return;
				navigated = true;
				hardReload();
			}

			/* Never call reload synchronously from touchend — mobile browsers drop it. */
			window.setTimeout(function () {
				var usedCustom = false;
				if (typeof custom === 'function') {
					try {
						var result = custom(go);
						if (result && typeof result.then === 'function') {
							usedCustom = true;
							result.then(go, go);
						} else if (custom.length > 0) {
							usedCustom = true;
							window.setTimeout(go, 2500);
						}
					} catch (err) {}
				}
				if (!usedCustom) go();
			}, 40);

			/* Safety net */
			window.setTimeout(go, 600);
		}

		function onStart(e) {
			if (state === 'refreshing') return;
			if (!e.touches || e.touches.length !== 1) return;
			var t = e.touches[0];
			if (!cfg.triggerElement.contains(e.target)) return;
			if (isFormField(e.target) || isWlUi(e.target)) return;
			if (scrollTop() > 1) return;
			if (canScrollUp(e.target)) return;

			tracking = true;
			pulling = false;
			armed = false;
			startY = t.clientY;
			startX = t.clientX;
			shown = 0;
		}

		function onMove(e) {
			if (!tracking || state === 'refreshing') return;
			if (!e.touches || e.touches.length !== 1) return;

			var t = e.touches[0];
			var dy = t.clientY - startY;
			var dx = t.clientX - startX;

			if (!pulling) {
				if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
					tracking = false;
					return;
				}
				if (dy < cfg.ignore) return;
				if (scrollTop() > 1 || canScrollUp(e.target)) {
					tracking = false;
					return;
				}
				pulling = true;
				state = 'pulling';
			}

			if (dy <= 0) {
				resetPull();
				return;
			}

			if (e.cancelable) e.preventDefault();

			shown = resist(dy - cfg.ignore, cfg.maxPull);
			var progress = shown / cfg.threshold;
			armed = shown >= cfg.threshold;

			if (armed) {
				state = 'armed';
				setLabel('Отпустите для обновления');
			} else {
				state = 'pulling';
				setLabel(shown > 20 ? 'Тяните вниз для обновления' : '');
			}

			setVisual(shown, progress, true);
		}

		function onEnd() {
			if (state === 'refreshing') return;

			var shouldRefresh = armed || (pulling && shown >= cfg.threshold);
			var wasActive = tracking || pulling;

			tracking = false;
			pulling = false;

			if (shouldRefresh) {
				runRefresh();
				return;
			}

			if (wasActive) resetPull();
		}

		function onCancel() {
			if (state === 'refreshing') return;
			resetPull();
		}

		var moveOpts = { passive: false, capture: true };
		var startOpts = { passive: true, capture: true };
		var endOpts = { passive: true, capture: true };

		document.addEventListener('touchstart', onStart, startOpts);
		document.addEventListener('touchmove', onMove, moveOpts);
		document.addEventListener('touchend', onEnd, endOpts);
		document.addEventListener('touchcancel', onCancel, endOpts);

		var api = {
			destroy: function () {
				document.removeEventListener('touchstart', onStart, true);
				document.removeEventListener('touchmove', onMove, true);
				document.removeEventListener('touchend', onEnd, true);
				document.removeEventListener('touchcancel', onCancel, true);
				if (ui.root && ui.root.parentNode) ui.root.parentNode.removeChild(ui.root);
				var idx = instances.indexOf(api);
				if (idx >= 0) instances.splice(idx, 1);
			}
		};

		instances.push(api);
		return api;
	}

	global.PullToRefresh = {
		init: init,
		destroyAll: function () {
			instances.slice().forEach(function (inst) {
				inst.destroy();
			});
		}
	};
})(typeof window !== 'undefined' ? window : this);
