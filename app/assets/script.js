
is = 0;

host = location.hostname;

uri = location.pathname.split('/')[1];

posiscroll = 500;

cone = 'rgba(255, 255, 255, 0.97)';

ctwo = 'rgba(255, 255, 255, 0.82)';

patternLogin = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

patternPhone = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;

patternMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

function amolabColor(key, fallback){
	var c = window.__amolabColors || {};
	var map = {
		primary: c.primary || '#0ea5e9',
		primaryDark: c.primaryDark || '#0284c7',
		primaryDarker: c.primaryDarker || '#0369a1',
		accent: c.accent || '#f97316',
		accentDark: c.accentDark || '#ea580c',
		icons: c.icons || '#38bdf8'
	};
	return map[key] || fallback || map.primary;
}
function amolabAccentGrad(){
	return 'linear-gradient(90deg,' + amolabColor('accent') + ',' + amolabColor('accentDark') + ')';
}

$(function(){
	
	bums();
	
	if (window.PullToRefresh) {
		PullToRefresh.init({
			mainElement: 'body'
			/* default: hard reload with cache-buster */
		});
	}

	initCookieConsent();
	initServicePillsScroll();
	
	// if(editor){ alert(); }

})

function initCookieConsent(){
	var box = document.getElementById('cookie-consent');
	var btn = document.getElementById('cookie-consent-accept');
	if(!box || !btn) return;
	var accepted = false;
	try{
		if(window.jQuery && $.cookie) accepted = $.cookie('cookie_consent') === '1';
		else accepted = localStorage.getItem('cookie_consent') === '1';
	}catch(err){}
	if(accepted){
		box.hidden = true;
		return;
	}
	box.hidden = false;
	btn.addEventListener('click', function(){
		try{
			if(window.jQuery && $.cookie) $.cookie('cookie_consent', '1', { expires: 365, path: '/' });
			else localStorage.setItem('cookie_consent', '1');
		}catch(err){}
		box.classList.add('is-hiding');
		setTimeout(function(){ box.hidden = true; }, 220);
	});
}

function initServicePillsScroll(){
	var navs = document.querySelectorAll('.service-pills');
	for(var i = 0; i < navs.length; i++){
		var nav = navs[i];
		if(nav._amolabPillsScroll) continue;
		nav._amolabPillsScroll = true;
		nav.addEventListener('wheel', function(e){
			if(this.classList.contains('service-pills--fill')) return;
			if(this.scrollWidth <= this.clientWidth + 1) return;
			var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
			if(!delta) return;
			e.preventDefault();
			this.scrollLeft += delta;
		}, { passive: false });
	}

	updateServicePillsLayout();

	if(document.fonts && document.fonts.ready){
		document.fonts.ready.then(updateServicePillsLayout);
	}else{
		setTimeout(updateServicePillsLayout, 150);
	}

	if(!window._amolabPillsLayoutBound){
		window._amolabPillsLayoutBound = true;
		var resizeTimer;
		window.addEventListener('resize', function(){
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(updateServicePillsLayout, 120);
		});
		if(typeof ResizeObserver !== 'undefined'){
			var ro = new ResizeObserver(function(){
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(updateServicePillsLayout, 80);
			});
			for(var j = 0; j < navs.length; j++) ro.observe(navs[j]);
		}
	}

	/* force navigation — some overlays/widgets can swallow the native click */
	if(!document.body._amolabPillsNav){
		document.body._amolabPillsNav = true;
		document.addEventListener('click', function(e){
			var a = e.target && e.target.closest ? e.target.closest('a.service-pill[href]') : null;
			if(!a) return;
			if(a.classList.contains('active')) return;
			var href = a.getAttribute('href');
			if(!href || href === '#' || href.indexOf('javascript:') === 0) return;
			e.preventDefault();
			e.stopPropagation();
			window.location.assign(a.href || href);
		}, true);
	}
}

function updateServicePillsLayout(){
	var navs = document.querySelectorAll('.service-pills');
	for(var i = 0; i < navs.length; i++){
		var nav = navs[i];
		nav.classList.remove('service-pills--fill');
		void nav.offsetWidth;
		if(nav.scrollWidth <= nav.clientWidth + 1){
			nav.classList.add('service-pills--fill');
			void nav.offsetWidth;
			if(nav.scrollWidth > nav.clientWidth + 1) nav.classList.remove('service-pills--fill');
		}
	}
	requestAnimationFrame(scrollActiveServicePillsIntoView);
}

function scrollActiveServicePillsIntoView(){
	var navs = document.querySelectorAll('.service-pills');
	for(var i = 0; i < navs.length; i++){
		var nav = navs[i];
		if(nav.classList.contains('service-pills--fill')) continue;
		if(nav.scrollWidth <= nav.clientWidth + 1) continue;
		var active = nav.querySelector('.service-pill.active');
		if(!active) continue;

		var navRect = nav.getBoundingClientRect();
		var pillRect = active.getBoundingClientRect();
		var delta = (pillRect.left + pillRect.width / 2) - (navRect.left + navRect.width / 2);
		nav.scrollLeft += delta;
	}
}

$(window).scroll(function(){bums()})

$(window).resize(function(){bums()})

function onOffline(){

	window.location.assign('https://localhost/noNetwork.html');

}

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady(){
	
	document.addEventListener("offline", onOffline, false);

}

function amolabIsPopupVisible(el){
	if(!el) return false;
	if(el.hasAttribute && el.hasAttribute('open')) return true;
	if(el.open === true) return true;
	try{
		var cs = window.getComputedStyle(el);
		if(cs.display === 'none' || cs.visibility === 'hidden') return false;
		if(parseFloat(cs.opacity || '1') <= 0.05) return false;
		var r = el.getBoundingClientRect();
		if(r.width < 24 || r.height < 24) return false;
		if(r.bottom < 0 || r.right < 0 || r.top > window.innerHeight + 20 || r.left > window.innerWidth + 20) return false;
		return true;
	}catch(e){
		return false;
	}
}

function amolabScopeHasOpenPopup(scope){
	if(!scope || !scope.querySelector) return false;
	if(scope.querySelector('dialog[open], .dialog[open]')) return true;
	var nodes = scope.querySelectorAll('.guests, .calendar, .form-datepicker');
	for(var i = 0; i < nodes.length; i++){
		var el = nodes[i];
		if(!amolabIsPopupVisible(el)) continue;
		if(el.open === true) return true;
		if(el.hasAttribute && el.hasAttribute('open')) return true;
		try{
			var cs = window.getComputedStyle(el);
			if(cs.position !== 'absolute' && cs.position !== 'fixed') continue;
			var r = el.getBoundingClientRect();
			if(r.width >= 200 && r.height >= 100) return true;
		}catch(e){}
	}
	return false;
}

function amolabWidgetDialogOpen(){
	if(document.body.classList.contains('amolab-cascoon-dialog-open')
		|| document.body.classList.contains('amolab-popup-open')
		|| document.body.classList.contains('amolab-transfer-dialog-open')){
		return true;
	}
	if(amolabScopeHasOpenPopup(document.querySelector('.embed-stage'))) return true;
	var hosts = document.querySelectorAll('tp-cascoon');
	for(var i = 0; i < hosts.length; i++){
		if(hosts[i].shadowRoot && amolabScopeHasOpenPopup(hosts[i].shadowRoot)) return true;
	}
	return false;
}

function bums(){
	var st = $(window).scrollTop();

	$('.button-up').toggleClass('is-visible', st > posiscroll && !amolabWidgetDialogOpen());

	if(st > 25) $('.site-navbar').addClass('navbar-scrolled');
	else $('.site-navbar').removeClass('navbar-scrolled');
}

$('.support > button').click(function(e){
	e.preventDefault();
	if($('.overlay').is(':hidden')) $('.overlay').fadeIn();
});

$('#themeToggle').on('click', function(){
	var cfg = window.__amolabTheme || {};
	if(cfg.canToggle === false) return;
	var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
	var next = cur === 'dark' ? 'light' : 'dark';
	if(next === 'dark' && cfg.allowDark === false) next = 'light';
	if(next === 'light' && cfg.allowLight === false) next = 'dark';
	document.documentElement.setAttribute('data-theme', next);
	try { localStorage.setItem('theme', next); } catch (e) {}
});

$('a.header-cta[href="#tpwl-search"], a.header-cta[href="#tpwl-search-wrap"]').click(function(e){
	e.preventDefault();
	var $target = $('#tpwl-search-wrap, #tpwl-search').first();
	if($target.length){
		$('html, body').animate({scrollTop: $target.offset().top - ($('.site-header').outerHeight() || 80)}, 600);
	}
});

function slider(direction, position){

	if(direction == 'left')	$('.images').animate({'margin-left':'-' + position} , 30000 , 'linear');
	
	else $('.images').animate({'margin-left':'0'} , 30000 , 'linear');
	
}

if(uri == 'insurance'){

	setInterval(function(){
		
		position = $('.images').width() - $('.gallery .container').width();
		
		if(parseInt($('.images').css('margin-left')) === 0) slider('left' , position);

		else if((parseInt($('.images').css('margin-left')) + position) === 0) slider();
		
	}, 1000);

}

$(document).on('click', '.checks div:not(.active)', function(){
	var key = ($(this).attr('class') || '').split(/\s+/)[0];
	if(!key) return;
	var $wrap = $(this).closest('.form_load');
	$wrap.children('.checks').children('div').removeClass('active');
	$wrap.children('.sea, .river').removeClass('active');
	$wrap.children('.checks').children('div.' + key).addClass('active');
	$wrap.children('div.' + key).addClass('active');
})

$('.button-up').on('click keydown', function(e){
	if(e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
	e.preventDefault();
	if('scrollBehavior' in document.documentElement.style){
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}else{
		$('html').stop(true).animate({ scrollTop: 0 }, 450);
	}
});

$('.subscription-close').click(function(){
	
	$('.overlay, .over').fadeOut();

})

$('.add_hotels').click(function(){
	
	items = $('.item_other').last().index();
	
	show = $('.item_other.show').last().index();

	for(i = 0; i < 6; i++) $('.item_other').eq(i + show).addClass('show');

	if($('.item_other.show').last().index() == items) $('.add_hotels').hide();

})

$('.overlay .subscription-button').click(function(){
	
	mail = $('.overlay .subscription-input');
	
	message = $('.overlay .subscription-textarea');
	
	if(!mail.val() || mail.val().search(patternMail) != 0){
		
		mail.css({'border':'1px solid #ff6663'});
	
	}else{
		
		mail.css({'border':'1px solid transparent'});
		
		if(message.val().length < 10){
			
			message.css({'border':'1px solid #ff6663'});
		
		}else{
			
			message.css({'border':'1px solid transparent'});
			
			$('.overlay .subscription-form').addClass('before');

			$('.overlay .subscription-result-img').show();
			
			$('.overlay .subscription-button').html('ПОЖАЛУЙСТА ПОДОЖДИТЕ');
			
			$('.overlay .subscription-input , .overlay .subscription-button , .overlay .subscription-textarea').attr({'disabled' : 'disabled'});
			
			$.ajax({
				
				url: 'https://' + default_host + '/block/sendmail.php',
				type: 'POST',
				data: ({'mail': mail.val(), 'message': message.val(), 'host': host}),
				dataType: 'HTML',
				success: function success(data){
					
					$('.overlay .subscription-button').hide();
					
					$('.overlay .subscription-title').html('Ваше сообщение отправлено!');
					
					$('.overlay .subscription-info').html('Мы пришлем ответ на ваш e-mail');
				
				}
				
			})
			
		}
		
	}
	
})

$('.service-pill[href="/' + uri + '"], .service-pill[href="/' + uri + '?app=true"], .header-dropdown-menu .dropdown-item[href="/' + uri + '"], .header-dropdown-menu .dropdown-item[href="/' + uri + '?app=true"], .site-navbar .nav-link[href="/' + uri + '"], .site-navbar .nav-link[href="/' + uri + '?app=true"], .header-nav-link[href="/' + uri + '"], .header-nav-link[href="/' + uri + '?app=true"], .service-tabs .nav-link[href="/' + uri + '"], .service-tabs .nav-link[href="/' + uri + '?app=true"], .top-menu > a[href="/' + uri + '"], .tabs_list > a[href="/' + uri + '"]').addClass('active');

DLoad = 500;

if($.cookie('app') == 'true') DLoad = 4000;

$('#preloader .icon').delay(DLoad).fadeOut(200, function(){$('#preloader').hide()});

if($('body').hasClass('page-hotels')){
	(function(){
		function isDark(){
			return document.documentElement.getAttribute('data-theme') === 'dark';
		}

		function cascoonIconCss(){
			var icon = amolabColor('icons');
			return [
				/* form icons — brand icons color */
				'.cascoon{',
				'--search-form-icon-color:' + icon + '!important;',
				'}',
				'.cascoon .form svg,',
				'.cascoon .form__input svg,',
				'.cascoon .form__right svg,',
				'.cascoon .form__top svg,',
				'.cascoon [class*="icon"] svg,',
				'.cascoon [class*="Icon"] svg,',
				'.cascoon [class*="calendar"] svg,',
				'.cascoon [class*="Calendar"] svg,',
				'.cascoon [class*="chevron"] svg,',
				'.cascoon [class*="Chevron"] svg,',
				'.cascoon [class*="arrow"] svg,',
				'.cascoon [class*="Arrow"] svg,',
				'.cascoon button:not(.btn--primary):not([type="submit"]) svg,',
				'.cascoon .input-before-gradient svg{',
				'color:' + icon + '!important;',
				'fill:' + icon + '!important;',
				'}',
				'.cascoon .form svg path,',
				'.cascoon .form__input svg path,',
				'.cascoon .form__right svg path,',
				'.cascoon .form__top svg path,',
				'.cascoon [class*="icon"] svg path,',
				'.cascoon [class*="Icon"] svg path,',
				'.cascoon [class*="calendar"] svg path,',
				'.cascoon [class*="Calendar"] svg path,',
				'.cascoon [class*="chevron"] svg path,',
				'.cascoon [class*="Chevron"] svg path,',
				'.cascoon [class*="arrow"] svg path,',
				'.cascoon [class*="Arrow"] svg path,',
				'.cascoon button:not(.btn--primary):not([type="submit"]) svg path,',
				'.cascoon .input-before-gradient svg path,',
				'.cascoon svg path[fill="#7D7D7D"],',
				'.cascoon svg path[fill="#7d7d7d"],',
				'.cascoon svg path[fill="#000"],',
				'.cascoon svg path[fill="#000000"],',
				'.cascoon svg path[fill="#171c29"],',
				'.cascoon svg path[fill="#171C29"],',
				'.cascoon svg path[fill="#80829b"],',
				'.cascoon svg path[fill="#80829B"]{',
				'fill:' + icon + '!important;',
				'}',
				'.cascoon .form svg [stroke]:not([stroke="none"]),',
				'.cascoon .form__input svg [stroke]:not([stroke="none"]),',
				'.cascoon [class*="icon"] svg [stroke]:not([stroke="none"]),',
				'.cascoon [class*="calendar"] svg [stroke]:not([stroke="none"]),',
				'.cascoon button:not(.btn--primary):not([type="submit"]) svg [stroke]:not([stroke="none"]){',
				'stroke:' + icon + '!important;',
				'}'
			].join('');
		}

		function cascoonDarkThemeCss(){
			var icon = amolabColor('icons');
			var shell = '#1e293b';
			var field = '#0f172a';
			var fieldAlt = '#111827';
			var border = '#334155';
			var text = '#e2e8f0';
			var muted = '#94a3b8';
			var btn = amolabColor('accent');
			var btnSoft = 'rgba(249,115,22,.28)';
			var btnGrad = amolabAccentGrad();

			return [
				/* dark shell — only .cascoon; nested wrappers stay borderless (avoids clipping) */
				'.cascoon{',
				'background:' + shell + '!important;',
				'background-color:' + shell + '!important;',
				'border:1px solid ' + border + '!important;',
				'outline:none!important;',
				'box-shadow:none!important;',
				'overflow:visible!important;',
				'--secondary-color:' + shell + '!important;',
				'--special-color:' + border + '!important;',
				'--light-color:' + field + '!important;',
				'--dark-color:' + text + '!important;',
				'--light-bg-text-color:' + text + '!important;',
				'--dark-bg-text-color:' + text + '!important;',
				'--primary-color:' + btn + '!important;',
				'--dialog-color:' + fieldAlt + '!important;',
				'--input-color:' + text + '!important;',
				'--input-placeholder-color:' + muted + '!important;',
				'--border:' + border + '!important;',
				'--actor-border:' + border + '!important;',
				'--dialog-border:' + border + '!important;',
				'--input-border:' + border + '!important;',
				'color:' + text + '!important;',
				'}',
				'.cascoon .like-wrapper,',
				'.cascoon .app,',
				'.cascoon [class*="app-"]{',
				'background:transparent!important;',
				'background-color:transparent!important;',
				'border:none!important;',
				'outline:none!important;',
				'box-shadow:none!important;',
				'overflow:visible!important;',
				'}',
				'.cascoon .form,',
				'.cascoon .form__top,',
				'.cascoon .form__right{',
				'background:transparent!important;',
				'border:none!important;',
				'box-shadow:none!important;',
				'overflow:visible!important;',
				'}',
				/* only real inputs — no broad [class*=input/field] (double borders) */
				'.cascoon .form__input,',
				'.cascoon input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]),',
				'.cascoon select,',
				'.cascoon textarea{',
				'background:' + field + '!important;',
				'background-color:' + field + '!important;',
				'color:' + text + '!important;',
				'border:1px solid ' + border + '!important;',
				'box-shadow:none!important;',
				'outline:none!important;',
				'caret-color:' + text + '!important;',
				'}',
				'.cascoon .form__input:focus,',
				'.cascoon input:not([type="submit"]):not([type="button"]):focus,',
				'.cascoon select:focus,',
				'.cascoon textarea:focus{',
				'border-color:' + amolabColor('primary') + '!important;',
				'box-shadow:none!important;',
				'}',
				'.cascoon .form__input::placeholder,',
				'.cascoon input::placeholder,',
				'.cascoon textarea::placeholder{',
				'color:' + muted + '!important;',
				'opacity:1!important;',
				'}',
				/* floating label — only kill extra border/shadow (no color/bg) */
				'.cascoon .form__label,',
				'.cascoon .form__label__text,',
				'.cascoon .form__label__text--required,',
				'.cascoon label{',
				'border:none!important;',
				'border-width:0!important;',
				'outline:none!important;',
				'box-shadow:none!important;',
				'}',
				/* white fade on date inputs — dark theme */
				'.cascoon .input-before-gradient{',
				'background-color:transparent!important;',
				'background:transparent!important;',
				'}',
				'.cascoon .input-before-gradient:before{',
				'background:none!important;',
				'background-image:none!important;',
				'opacity:0!important;',
				'content:none!important;',
				'}',
				/* CTA stays orange */
				'.cascoon .btn--primary,',
				'.cascoon a.cascoon-form-submit,',
				'.cascoon a.form-submit,',
				'.cascoon button[type="submit"],',
				'.cascoon input[type="submit"]{',
				'background:' + btnGrad + '!important;',
				'background-color:' + btn + '!important;',
				'border-color:' + btn + '!important;',
				'color:#fff!important;',
				'box-shadow:none!important;',
				'}',
				'.cascoon .btn--primary *,',
				'.cascoon a.cascoon-form-submit *,',
				'.cascoon a.form-submit *,',
				'.cascoon button[type="submit"] *{',
				'color:#fff!important;',
				'}',
				'.cascoon .guests button,',
				'.cascoon .dialog button:not(.btn--primary){',
				'color:' + icon + '!important;',
				'}',
				'.cascoon .guests svg,',
				'.cascoon .dialog svg{',
				'color:' + icon + '!important;',
				'fill:' + icon + '!important;',
				'}',
				'.cascoon .guests svg path,',
				'.cascoon .dialog svg path{',
				'fill:' + icon + '!important;',
				'}',
				/* popovers — container text only, not every child */
				'.cascoon .dialog,',
				'.cascoon .dialog__content,',
				'.cascoon .dialog__position,',
				'.cascoon .dialog__header,',
				'.cascoon .guests,',
				'.cascoon .calendar,',
				'.cascoon [role="listbox"],',
				'.cascoon [role="dialog"],',
				'.cascoon [role="menu"]{',
				'color:' + text + '!important;',
				'}',
				/* guests labels */
				'.cascoon .guests,',
				'.cascoon .guests > *,',
				'.cascoon .guests [class*="label"],',
				'.cascoon .guests [class*="title"],',
				'.cascoon .dialog__title,',
				'.cascoon .dialog__header{',
				'color:' + text + '!important;',
				'}',
				/* autocomplete items — never style list containers via [class*=item]:hover */
				'.cascoon [role="option"],',
				'.cascoon .autocomplete__item,',
				'.cascoon [class*="autocomplete__item"],',
				'.cascoon [class*="Autocomplete__item"],',
				'.cascoon [class*="suggestion__item"],',
				'.cascoon [class*="suggest__item"]{',
				'background:transparent!important;',
				'background-color:transparent!important;',
				'color:' + text + '!important;',
				'box-shadow:none!important;',
				'outline:none!important;',
				'}',
				'.cascoon [role="option"]::before,',
				'.cascoon [role="option"]::after,',
				'.cascoon .autocomplete__item::before,',
				'.cascoon .autocomplete__item::after,',
				'.cascoon [class*="autocomplete__item"]::before,',
				'.cascoon [class*="autocomplete__item"]::after,',
				'.cascoon [class*="suggestion__item"]::before,',
				'.cascoon [class*="suggestion__item"]::after{',
				'content:none!important;',
				'display:none!important;',
				'background:none!important;',
				'border:none!important;',
				'box-shadow:none!important;',
				'width:0!important;',
				'height:0!important;',
				'}',
				'.cascoon [role="option"]:hover,',
				'.cascoon [role="option"][aria-selected="true"],',
				'.cascoon [role="option"]:focus,',
				'.cascoon .autocomplete__item:hover,',
				'.cascoon .autocomplete__item[aria-selected="true"],',
				'.cascoon .autocomplete__item.active,',
				'.cascoon .autocomplete__item.selected,',
				'.cascoon .autocomplete__item.focused,',
				'.cascoon [class*="autocomplete__item"]:hover,',
				'.cascoon [class*="autocomplete__item"][aria-selected="true"],',
				'.cascoon [class*="autocomplete__item"].active,',
				'.cascoon [class*="autocomplete__item"].selected,',
				'.cascoon [class*="suggestion__item"]:hover,',
				'.cascoon [class*="suggestion__item"][aria-selected="true"],',
				'.cascoon [class*="suggest__item"]:hover,',
				'.cascoon [class*="suggest__item"][aria-selected="true"]{',
				'background:#334155!important;',
				'background-color:#334155!important;',
				'color:#f8fafc!important;',
				'box-shadow:none!important;',
				'outline:none!important;',
				'border-color:transparent!important;',
				'}',
				'.cascoon [role="option"]:hover *,',
				'.cascoon [role="option"][aria-selected="true"] *,',
				'.cascoon .autocomplete__item:hover *,',
				'.cascoon .autocomplete__item[aria-selected="true"] *,',
				'.cascoon [class*="autocomplete__item"]:hover *,',
				'.cascoon [class*="autocomplete__item"][aria-selected="true"] *{',
				'color:#f8fafc!important;',
				'background:transparent!important;',
				'box-shadow:none!important;',
				'}',
				'.cascoon .btn--default{',
				'background:' + field + '!important;',
				'background-color:' + field + '!important;',
				'color:' + text + '!important;',
				'border-color:' + border + '!important;',
				'}',
				/* calendar days — override light-bg text color */
				'.cascoon .rdp-day,',
				'.cascoon .rdp-weeknumber,',
				'.cascoon .form-datepicker .rdp-day,',
				'.cascoon .form-datepicker .rdp-weeknumber,',
				'.cascoon .root .form-datepicker .rdp-day,',
				'.cascoon .root .form-datepicker .rdp-weeknumber{',
				'color:' + text + '!important;',
				'}',
				/* calendar: selected ends orange, mid-range soft orange on dark */
				'.cascoon .calendar [aria-selected="true"],',
				'.cascoon .calendar .selected,',
				'.cascoon .rdp-day_selected,',
				'.cascoon .rdp-day_range_start,',
				'.cascoon .rdp-day_range_end{',
				'background:' + btn + '!important;',
				'background-color:' + btn + '!important;',
				'color:#fff!important;',
				'}',
				'.cascoon .calendar [class*="in-range"],',
				'.cascoon .calendar [class*="inRange"],',
				'.cascoon .rdp-day_range_middle{',
				'background:' + btnSoft + '!important;',
				'background-color:' + btnSoft + '!important;',
				'color:' + text + '!important;',
				'}',
				'.cascoon .calendar [class*="weekday"],',
				'.cascoon .calendar [class*="Weekday"],',
				'.cascoon .calendar th{',
				'color:' + muted + '!important;',
				'}'
			].join('');
		}

		function cascoonDialogStackCss(dark){
			var dialogBg = dark ? '#0f172a' : '#fff';
			return [
				':host{position:relative!important;overflow:visible!important;}',
				'.cascoon,.cascoon .like-wrapper,.cascoon .app,',
				'.cascoon .form,.cascoon .form__right,.cascoon .form__top{',
				'overflow:visible!important;',
				'}',
				'.dialog[open],dialog[open]{',
				'z-index:40!important;',
				'}',
				'.dialog[open] .calendar,',
				'.dialog[open] .form-datepicker,',
				'.dialog[open] .guests,',
				'.dialog[open] .dialog__position,',
				'dialog[open] .calendar,',
				'dialog[open] .form-datepicker,',
				'dialog[open] .guests,',
				'dialog[open] .dialog__position{',
				'z-index:40!important;',
				'}',
				'@media (max-width:767.98px){',
				'.dialog[open],dialog[open],',
				'.dialog[open] .calendar,.dialog[open] .guests,',
				'dialog[open] .calendar,dialog[open] .guests,',
				'.dialog[open] .form-datepicker,dialog[open] .form-datepicker{',
				'z-index:2200!important;',
				'}',
				'.dialog[open],dialog[open]{',
				'position:fixed!important;',
				'inset:0!important;',
				'top:0!important;right:0!important;bottom:0!important;left:0!important;',
				'width:100vw!important;',
				'height:100vh!important;',
				'height:100dvh!important;',
				'margin:0!important;',
				'padding:0!important;',
				'z-index:2200!important;',
				'background:' + dialogBg + '!important;',
				'background-color:' + dialogBg + '!important;',
				'opacity:1!important;',
				'visibility:visible!important;',
				'}',
				'.dialog[open] .dialog__position,',
				'dialog[open] .dialog__position{',
				'position:fixed!important;',
				'inset:0!important;',
				'top:0!important;right:0!important;bottom:0!important;left:0!important;',
				'max-height:none!important;',
				'height:100%!important;',
				'width:100%!important;',
				'padding:0!important;',
				'margin:0!important;',
				'z-index:2200!important;',
				'}',
				'.dialog[open] .dialog__content,',
				'dialog[open] .dialog__content{',
				'max-width:none!important;',
				'width:100%!important;',
				'max-height:none!important;',
				'height:100%!important;',
				'border-radius:0!important;',
				'box-shadow:none!important;',
				'border:none!important;',
				'background:' + dialogBg + '!important;',
				'}',
				'}'
			].join('');
		}

		/* Embed widgets: autocomplete list overlays fields below */
		function embedAutocompleteCss(){
			return [
				'.search-form,',
				'.root.search-form{',
				'position:relative!important;',
				'overflow:visible!important;',
				'}',
				'.autocomplete-items:not(:empty){',
				'position:absolute!important;',
				'z-index:100!important;',
				'}'
			].join('');
		}

		/* Cascoon hotels/sanatory/cruize: active field above siblings */
		function cascoonAutocompleteCss(){
			return [
				'.cascoon .form__top,',
				'.cascoon .form__right{',
				'position:relative!important;',
				'overflow:visible!important;',
				'}',
				'.cascoon .form__top > .form__label,',
				'.cascoon .form__right > .form__label{',
				'position:relative!important;',
				'z-index:1!important;',
				'}',
				/* desktop only: focused field above siblings for autocomplete */
				'@media (min-width:768px){',
				'.cascoon .form__top > .form__label:focus-within,',
				'.cascoon .form__right > .form__label:focus-within{',
				'z-index:100!important;',
				'}',
				'}',
				/* when dialog is open, drop all form__label z-index so dialog stays on top */
				'.cascoon:has(.dialog[open]) .form__top > .form__label,',
				'.cascoon:has(.dialog[open]) .form__right > .form__label,',
				'.cascoon:has(dialog[open]) .form__top > .form__label,',
				'.cascoon:has(dialog[open]) .form__right > .form__label{',
				'z-index:auto!important;',
				'}'
			].join('');
		}

		function embedPageClass(){
			if(!document.body) return '';
			if(document.body.classList.contains('page-transfer')) return 'transfer';
			if(document.body.classList.contains('page-sanatory')) return 'sanatory';
			if(document.body.classList.contains('page-cruize')) return 'cruize';
			if(document.body.classList.contains('page-hotels')) return 'hotels';
			return '';
		}

		function injectEmbedAutocompleteCss(){
			var page = embedPageClass();
			if(!page) return;
			if(document.getElementById('amolab-embed-autocomplete')) return;
			var style = document.createElement('style');
			style.id = 'amolab-embed-autocomplete';
			style.textContent = [
				'.page-' + page + ' .embed-stage .search-form,',
				'.page-' + page + ' .embed-stage .root.search-form,',
				'.page-' + page + ' .form_load--cruize .search-form,',
				'.page-' + page + ' .form_load--cruize .root.search-form{',
				'position:relative!important;overflow:visible!important;',
				'}',
				'.page-' + page + ' .embed-stage .autocomplete-items:not(:empty),',
				'.page-' + page + ' .form_load--cruize .autocomplete-items:not(:empty){',
				'position:absolute!important;z-index:100!important;',
				'}'
			].join('');
			document.head.appendChild(style);
		}

		function clearAutocompleteInlineStack(scope){
			if(!scope || !scope.querySelectorAll) return;
			scope.querySelectorAll('[style*="z-index"]').forEach(function(el){
				if(!el.style || el.style.getPropertyPriority('z-index') !== 'important') return;
				el.style.removeProperty('position');
				el.style.removeProperty('z-index');
				if(el.classList && el.classList.contains('autocomplete-items')){
					el.style.removeProperty('display');
				}
			});
		}

		/* Opaque autocomplete/suggest panels — no bleed-through from fields below */
		function cascoonSuggestPanelCss(dark){
			var bg = dark ? '#0f172a' : '#ffffff';
			var hoverBg = dark ? '#334155' : '#f1f5f9';
			return [
				'.autocomplete-items,',
				'.cascoon .autocomplete-items,',
				'.cascoon [role="listbox"]{',
				'background:' + bg + '!important;',
				'background-color:' + bg + '!important;',
				'opacity:1!important;',
				'backdrop-filter:none!important;',
				'-webkit-backdrop-filter:none!important;',
				'}',
				'.cascoon [role="option"],',
				'.cascoon .autocomplete__item,',
				'.cascoon [class*="autocomplete__item"],',
				'.cascoon [class*="Autocomplete__item"],',
				'.cascoon [class*="suggestion__item"],',
				'.cascoon [class*="suggest__item"]{',
				'background:' + bg + '!important;',
				'background-color:' + bg + '!important;',
				'opacity:1!important;',
				'}',
				'.cascoon [role="option"]:hover,',
				'.cascoon [role="option"][aria-selected="true"],',
				'.cascoon .autocomplete__item:hover,',
				'.cascoon .autocomplete__item[aria-selected="true"],',
				'.cascoon .autocomplete__item.active,',
				'.cascoon [class*="autocomplete__item"]:hover,',
				'.cascoon [class*="autocomplete__item"][aria-selected="true"],',
				'.cascoon [class*="autocomplete__item"].active,',
				'.cascoon [class*="suggestion__item"]:hover,',
				'.cascoon [class*="suggestion__item"][aria-selected="true"]{',
				'background:' + hoverBg + '!important;',
				'background-color:' + hoverBg + '!important;',
				'}'
			].join('');
		}

		/* Transfers: colors / dark theme + autocomplete overlay */
		function transferFormCss(dark){
			var stack = embedAutocompleteCss() + cascoonDialogStackCss(dark);
			if(!dark) return stack + cascoonSuggestPanelCss(false);
			return [
				stack,
				'.tp-powered-by{display:none!important;height:0!important;margin:0!important;}',
				cascoonIconCss(),
				cascoonDarkThemeCss(),
				cascoonSuggestPanelCss(true)
			].join('');
		}

		function needsCascoonDialogStack(){
			return !!(document.body && (
				document.body.classList.contains('page-hotels') ||
				document.body.classList.contains('page-transfer') ||
				document.body.classList.contains('page-cruize') ||
				document.body.classList.contains('page-sanatory') ||
				document.body.classList.contains('page-travel')
			));
		}

		function isPopupVisible(el){
			if(!el) return false;
			if(el.hasAttribute && el.hasAttribute('open')) return true;
			if(el.open === true) return true;
			try{
				var cs = window.getComputedStyle(el);
				if(cs.display === 'none' || cs.visibility === 'hidden') return false;
				if(parseFloat(cs.opacity || '1') <= 0.05) return false;
				var r = el.getBoundingClientRect();
				if(r.width < 24 || r.height < 24) return false;
				/* off-screen / collapsed absolute panels */
				if(r.bottom < 0 || r.right < 0 || r.top > window.innerHeight + 20 || r.left > window.innerWidth + 20) return false;
				return true;
			}catch(e){
				return false;
			}
		}

		function hasOpenLevelTravelPopup(){
			if(!document.body.classList.contains('page-travel')) return false;
			/* LT marks open state on wrapper */
			if(document.querySelector('.search-form-wrapper.opened')) return true;
			var stage = document.querySelector('.embed-stage--leveltravel, .page-travel .hero-search-card');
			if(!stage) return false;
			/* field focused and its floating panel actually painted */
			var focused = stage.querySelector('.search-form-field:focus-within, .main-field:focus-within, .search-form-destination:focus-within');
			if(!focused) return false;
			var floats = focused.querySelectorAll(
				'.search-form-floating, .search-form-tourists-select, .search-form-nights-select,' +
				'.search-form-departure-select, .search-form-calendar, .search-form-autocomplete'
			);
			for(var i = 0; i < floats.length; i++){
				if(isPopupVisible(floats[i])) return true;
			}
			return false;
		}

		function hasOpenCascoonPopup(root){
			var scopes = [];
			if(root && root.querySelectorAll) scopes.push(root);
			document.querySelectorAll('.hero-search-card tp-cascoon, .embed-stage tp-cascoon, .form_load--embed tp-cascoon').forEach(function(host){
				if(host.shadowRoot) scopes.push(host.shadowRoot);
			});
			for(var s = 0; s < scopes.length; s++){
				var scope = scopes[s];
				/* definitive open state */
				if(scope.querySelector('dialog[open], .dialog[open]')) return true;

				var nodes = scope.querySelectorAll('.guests, .calendar, .form-datepicker');
				for(var i = 0; i < nodes.length; i++){
					var el = nodes[i];
					if(!isPopupVisible(el)) continue;
					if(el.open === true) return true;
					if(el.hasAttribute && el.hasAttribute('open')) return true;
					try{
						var cs = window.getComputedStyle(el);
						var pos = cs.position;
						if(pos !== 'absolute' && pos !== 'fixed') continue;
						var r = el.getBoundingClientRect();
						/* real overlay panel, not an icon/slot */
						if(r.width >= 200 && r.height >= 100) return true;
					}catch(e){}
				}
			}
			return false;
		}

		function syncCascoonDialogOpen(root){
			if(!needsCascoonDialogStack()) return;
			var open = hasOpenLevelTravelPopup() || hasOpenCascoonPopup(root);
			document.body.classList.toggle('amolab-cascoon-dialog-open', open);
			document.body.classList.toggle('amolab-popup-open', open);
			document.body.classList.toggle('amolab-transfer-dialog-open', open && document.body.classList.contains('page-transfer'));
			if(!open){
				document.body.classList.remove('amolab-cascoon-dialog-open', 'amolab-popup-open', 'amolab-transfer-dialog-open');
			}
			if(typeof bums === 'function') setTimeout(bums, 0);
		}

		function watchPopupStackGlobal(){
			if(!needsCascoonDialogStack() || document.body._amolabPopupStackWatch) return;
			document.body._amolabPopupStackWatch = true;
			var tick = function(){ syncCascoonDialogOpen(null); };
			document.addEventListener('focusin', function(){ setTimeout(tick, 0); setTimeout(tick, 50); }, true);
			document.addEventListener('focusout', function(){ setTimeout(tick, 0); setTimeout(tick, 80); setTimeout(tick, 200); }, true);
			document.addEventListener('click', function(){ setTimeout(tick, 0); setTimeout(tick, 50); setTimeout(tick, 200); }, true);
			document.addEventListener('mousedown', function(){ setTimeout(tick, 0); }, true);
			document.addEventListener('keyup', function(e){
				if(e.key === 'Escape' || e.key === 'Tab') setTimeout(tick, 0);
			}, true);
			setInterval(tick, 150);
			tick();
		}

		function bindCascoonMobileNoScroll(root){
			if(!document.body || !root || root._amolabCascoonMobileNoScrollBound) return;
			if(!needsCascoonDialogStack()) return;
			root._amolabCascoonMobileNoScrollBound = true;

			root.addEventListener('click', function(e){
				if(window.innerWidth > 767.98) return;
				var path = e.composedPath ? e.composedPath() : [];
				var hadInput = false;
				var hadClose = false;
				for(var i = 0; i < path.length; i++){
					var el = path[i];
					if(!el || !el.matches) continue;
					if(el.matches('.form-datepicker__input')) hadInput = true;
					if(el.matches('.mobile-popup__close')) hadClose = true;
					if(hadInput && hadClose) break;
				}
				/* Fallback if composedPath not available */
				if(!hadInput && e.target && e.target.closest && e.target.closest('.form-datepicker__input')) hadInput = true;
				if(!hadClose && e.target && e.target.closest && e.target.closest('.mobile-popup__close')) hadClose = true;

				if(hadInput){
					document.body.classList.add('cascoon-no-scroll-mobile');
					return;
				}
				if(hadClose){
					document.body.classList.remove('cascoon-no-scroll-mobile');
				}
			}, true);
		}

		function watchCascoonDialog(host, root){
			if(!host || !root || host._amolabCascoonDialogWatch) return;
			host._amolabCascoonDialogWatch = true;
			var tick = function(){ syncCascoonDialogOpen(root); };
			root.addEventListener('click', function(){
				setTimeout(tick, 0);
				setTimeout(tick, 50);
				setTimeout(tick, 200);
			}, true);
			host._amolabCascoonDialogPoll = setInterval(tick, 200);
			watchPopupStackGlobal();
			bindCascoonMobileNoScroll(root);
		}

		function hotelsFormCss(dark){
			var stackDialogCss = !!(document.body
				&& document.body.classList.contains('page-hotels')
				&& !document.body.classList.contains('page-transfer')
				&& !document.body.classList.contains('page-sanatory')
				&& !document.body.classList.contains('page-cruize')
				&& !document.body.classList.contains('page-travel'));
			var base = [
				':host{margin-bottom:8px!important;display:block!important;overflow:visible!important;}',
				'.cascoon,.cascoon .like-wrapper,.cascoon .app{',
				'overflow:visible!important;',
				'}',
				'.cascoon .form,.cascoon .form__right,.cascoon .form__top{',
				'overflow:visible!important;',
				'}',
				/* field icons — only main search fields, not tourists/guests dialog */
				'.cascoon .form__top > .form__label,',
				'.cascoon .form__right > .form__label{',
				'position:relative!important;',
				'}',
				'.cascoon .form__top > .form__label .input-before-gradient,',
				'.cascoon .form__top > .form__label [class*="input-before"],',
				'.cascoon .form__right > .form__label .input-before-gradient,',
				'.cascoon .form__right > .form__label [class*="input-before"]{',
				'position:absolute!important;',
				'right:0!important;',
				'top:auto!important;',
				'bottom:0!important;',
				'display:flex!important;',
				'align-items:center!important;',
				'justify-content:center!important;',
				'pointer-events:none!important;',
				'}',
				'.cascoon .dialog .form__label,',
				'.cascoon .guests .form__label,',
				'.cascoon .dialog .form__label .input-before-gradient,',
				'.cascoon .guests .form__label .input-before-gradient,',
				'.cascoon .dialog .form__label [class*="input-before"],',
				'.cascoon .guests .form__label [class*="input-before"]{',
				'position:static!important;',
				'top:auto!important;',
				'right:auto!important;',
				'bottom:auto!important;',
				'height:auto!important;',
				'transform:none!important;',
				'}',
				'.cascoon .dialog .form__label svg,',
				'.cascoon .guests .form__label svg{',
				'position:static!important;',
				'top:auto!important;',
				'right:auto!important;',
				'transform:none!important;',
				'margin:initial!important;',
				'}',
				'.tp-powered-by{display:none!important;height:0!important;margin:0!important;}',
				cascoonIconCss()
			].join('');

			var css = dark ? base + cascoonDarkThemeCss() : base;
			if(stackDialogCss) css += cascoonDialogStackCss(dark);
			css += cascoonAutocompleteCss() + embedAutocompleteCss();
			css += cascoonSuggestPanelCss(dark);
			return css;
		}

		function isNearWhiteBg(color){
			if(!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') return false;
			var m = String(color).match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
			if(!m) return false;
			var r = +m[1], g = +m[2], b = +m[3];
			if(r > 220 && g > 210 && b > 190) return true;
			if(r > 220 && g > 190 && b > 150 && b < 230) return true;
			return false;
		}

		function isNearBlackText(color){
			if(!color) return false;
			var m = String(color).match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
			if(!m) return false;
			var lum = 0.299 * (+m[1]) + 0.587 * (+m[2]) + 0.114 * (+m[3]);
			return lum < 120;
		}

		function fixCascoonFieldIcons(root){
			if(!root || !root.querySelectorAll) return;
			var labels = root.querySelectorAll('.form__label');
			for(var i = 0; i < labels.length; i++){
				var label = labels[i];
				/* never restyle tourists/guests/calendar dialogs — breaks children counters */
				if(label.closest('.dialog, dialog, .guests, .calendar, .form-datepicker, [role="dialog"]')) continue;
				label.style.setProperty('position', 'relative', 'important');

				var field = label.querySelector('.form__input, input:not([type="hidden"]):not([type="submit"]), select, textarea, button:not([type="submit"]):not(.btn--primary)');
				if(!field) continue;

				var labelRect = label.getBoundingClientRect();
				var fieldRect = field.getBoundingClientRect();
				if(!fieldRect.height) continue;

				var topPx = (fieldRect.top - labelRect.top) + 'px';
				var heightPx = fieldRect.height + 'px';
				var centerPx = (fieldRect.top - labelRect.top + fieldRect.height / 2) + 'px';

				var wrappers = label.querySelectorAll('.input-before-gradient, [class*="input-before"]');
				for(var w = 0; w < wrappers.length; w++){
					var wrap = wrappers[w];
					wrap.style.setProperty('position', 'absolute', 'important');
					wrap.style.setProperty('top', topPx, 'important');
					wrap.style.setProperty('height', heightPx, 'important');
					wrap.style.setProperty('right', '0', 'important');
					wrap.style.setProperty('bottom', 'auto', 'important');
					wrap.style.setProperty('display', 'flex', 'important');
					wrap.style.setProperty('align-items', 'center', 'important');
					wrap.style.setProperty('justify-content', 'center', 'important');
					wrap.style.setProperty('pointer-events', 'none', 'important');
				}

				var svgs = label.querySelectorAll('svg');
				for(var s = 0; s < svgs.length; s++){
					var svg = svgs[s];
					if(svg.closest('.form__label__text, .btn--primary, button[type="submit"], a.form-submit, a.cascoon-form-submit')) continue;
					svg.style.setProperty('position', 'absolute', 'important');
					svg.style.setProperty('top', centerPx, 'important');
					svg.style.setProperty('bottom', 'auto', 'important');
					svg.style.setProperty('transform', 'translateY(-50%)', 'important');
					svg.style.setProperty('margin', '0', 'important');
					svg.style.setProperty('right', '12px', 'important');
					svg.style.setProperty('pointer-events', 'none', 'important');
					svg.setAttribute('data-amolab-icon-fixed', '1');
				}
			}
		}

		function fixHotelsFormDark(root){
			if(!root || !root.querySelectorAll || !isDark()) return;
			/* only guests/dialog labels + pale selected options — never paint whole list on hover */
			var nodes = root.querySelectorAll(
				'.guests [class*="label"], .guests [class*="title"], .dialog__title, .dialog__header,' +
				'[role="option"][aria-selected="true"], .autocomplete__item[aria-selected="true"],' +
				'[class*="autocomplete__item"][aria-selected="true"]'
			);
			for(var i = 0; i < nodes.length; i++){
				var el = nodes[i];
				if(!el || el.tagName === 'IMG' || el.tagName === 'SVG' || el.tagName === 'PATH') continue;
				try{
					var cs = window.getComputedStyle(el);
					if(isNearBlackText(cs.color)){
						el.style.setProperty('color', '#e2e8f0', 'important');
					}
					if(isNearWhiteBg(cs.backgroundColor)){
						el.style.setProperty('background', '#334155', 'important');
						el.style.setProperty('background-color', '#334155', 'important');
						el.style.setProperty('color', '#f8fafc', 'important');
					}
				}catch(e){}
			}
		}

		function skinCascoon(host){
			if(!host) return;
			var isTransfer = document.body && document.body.classList.contains('page-transfer');
			var isTravel = document.body && document.body.classList.contains('page-travel');
			var shouldFixIcons = !isTransfer && !isTravel;
			var stackDialog = needsCascoonDialogStack();
			var root = host.shadowRoot;
			if(!root) return;
			var style = root.getElementById('amolab-hotels-form-skin');
			if(!style){
				style = document.createElement('style');
				style.id = 'amolab-hotels-form-skin';
			}
			/* Transfers: dark colors + dialog z-index; light keeps stock layout + URL colors */
			style.textContent = isTransfer ? transferFormCss(isDark()) : hotelsFormCss(isDark());
			/* keep overrides after widget styles */
			root.appendChild(style);
			host.dataset.skinDone = '1';
			fixHotelsFormDark(root);
			if(shouldFixIcons) fixCascoonFieldIcons(root);
			if(stackDialog){
				syncCascoonDialogOpen(root);
				watchCascoonDialog(host, root);
			}
			if(!host._amolabHotelsObs){
				var t = null;
				host._amolabHotelsObs = new MutationObserver(function(muts){
					if(stackDialog){
						/* always re-check dialog [open] for z-index stacking */
						var dialogMut = false;
						for(var d = 0; d < muts.length; d++){
							var dm = muts[d];
							if(dm.type === 'childList'){ dialogMut = true; break; }
							if(dm.type === 'attributes' && (dm.attributeName === 'open' || dm.attributeName === 'class' || dm.attributeName === 'style')){
								dialogMut = true; break;
							}
						}
						if(dialogMut){
							if(t) clearTimeout(t);
							t = setTimeout(function(){
								if(style.parentNode !== root || style !== root.lastElementChild){
									root.appendChild(style);
								}
								fixHotelsFormDark(root);
								if(shouldFixIcons) fixCascoonFieldIcons(root);
								syncCascoonDialogOpen(root);
							}, 20);
						}
						return;
					}
					/* ignore pure hover class toggles on options — prevents recoloring whole list */
					var worth = false;
					for(var i = 0; i < muts.length; i++){
						var m = muts[i];
						if(m.type === 'childList'){ worth = true; break; }
						if(m.type === 'attributes' && m.attributeName === 'style'){
							if(m.target && m.target.getAttribute && m.target.getAttribute('data-amolab-icon-fixed') === '1') continue;
							worth = true; break;
						}
						if(m.type === 'attributes' && m.attributeName === 'class'){
							var tname = (m.target && m.target.className) ? String(m.target.className) : '';
							if(!/option|autocomplete__item|suggestion__item|hover|active|focused|selected/i.test(tname)
								&& m.target && m.target.getAttribute && m.target.getAttribute('role') !== 'option'){
								worth = true; break;
							}
						}
					}
					if(!worth) return;
					if(t) clearTimeout(t);
					t = setTimeout(function(){
						if(style.parentNode !== root || style !== root.lastElementChild){
							root.appendChild(style);
						}
						fixHotelsFormDark(root);
						if(shouldFixIcons) fixCascoonFieldIcons(root);
					}, 40);
				});
				host._amolabHotelsObs.observe(root, {
					childList: true,
					subtree: true,
					attributes: true,
					attributeFilter: stackDialog ? ['style', 'class', 'open'] : ['style', 'class']
				});
			}
		}

		function skinAll(stage){
			if(!stage) return;
			stage.querySelectorAll('tp-cascoon').forEach(skinCascoon);
		}

		function skinAllForms(){
			document.querySelectorAll('.embed-stage tp-cascoon, .hero-search-card tp-cascoon').forEach(skinCascoon);
			skinTutuOnThemeChange();
		}

		function markReady(stage){
			if(!stage || stage.classList.contains('is-ready')) return;
			stage.classList.add('is-ready');
			var stub = stage.querySelector('.widget-stub');
			if(stub){
				stub.classList.add('is-hidden');
				stub.setAttribute('hidden', '');
			}
			skinAll(stage);
			injectEmbedAutocompleteCss();
			clearAutocompleteInlineStack(stage);
			layoutTutuForm();
			layoutInsuranceForm();
			syncInsuranceDropdowns();
			skinLevelTravelTheme();
			watchLevelTravelForm();
		}

		function hasWidget(stage){
			if(stage.classList.contains('embed-stage--price-chart')){
				return !!(stage.querySelector('.price-stat.loaded, .price-stat .ps_graph, .lt-statistic .ps_graph, .lt-widget-wrapper .price-stat'));
			}
			if(stage.querySelector('iframe, object, embed, tp-cascoon')) return true;
			if(stage.querySelector('[id^="leveltravel_widget_wrapper"] .search-form, [id^="leveltravel_widget_wrapper"] .search-form-body, .search-form-body, .lt-widget-wrapper .search-form')) return true;
			if(document.body && document.body.classList.contains('page-tutu')){
				var tutu = document.getElementById('tutuSearchWidget');
				if(tutu && tutu.querySelector('[class*="formGroupElement"], [class*="row_"]')) return true;
			}
			var nodes = stage.children;
			for(var i = 0; i < nodes.length; i++){
				var el = nodes[i];
				if(el.tagName === 'SCRIPT') continue;
				if(el.classList && el.classList.contains('widget-stub')) continue;
				/* Travelpayouts wraps the form in #powered_by_* — wait for real search UI */
				if(el.id && /^powered_by_/.test(el.id)){
					if(el.querySelector('.search-form, .search-form-body, [id^="leveltravel_widget_wrapper"] > *')) return true;
					continue;
				}
				/* пустые обёртки без контента не считаем готовой формой */
				if(!el.children.length && !(el.textContent || '').trim()) continue;
				return true;
			}
			return false;
		}

		function watchStage(stage){
			if(hasWidget(stage)){
				markReady(stage);
				return;
			}

			var done = false;
			function check(){
				if(done) return;
				skinAll(stage);
				if(hasWidget(stage)){
					/* даём кадру отрисоваться, чтобы не мигала пустая оболочка */
					done = true;
					obs.disconnect();
					clearInterval(poll);
					clearTimeout(failSafe);
					requestAnimationFrame(function(){
						setTimeout(function(){ markReady(stage); }, 120);
					});
				}
			}

			var obs = new MutationObserver(check);
			obs.observe(stage, { childList: true, subtree: true });
			var poll = setInterval(check, 80);
			var failSafe = setTimeout(function(){
				done = true;
				markReady(stage);
				obs.disconnect();
				clearInterval(poll);
			}, 8000);

			stage.addEventListener('load', check, true);
		}

		function layoutTutuForm(){
			if(!document.body || !document.body.classList.contains('page-tutu')) return;
			var root = document.getElementById('tutuSearchWidget') || document.getElementById('widget-container');
			if(!root) return;
			var rows = root.querySelectorAll('[class*="row_"]');
			for(var i = 0; i < rows.length; i++){
				var row = rows[i];
				var kids = row.children;
				if(!kids || kids.length < 6) continue;
				var txt = (row.textContent || '');
				if(txt.indexOf('Откуда') === -1 && txt.indexOf('Найти') === -1) continue;
				row.classList.add('amolab-tutu-form-row');
				if(kids[1]) kids[1].classList.add('amolab-tutu-swap');
			}
			skinTutuWidgetTheme();
			skinTutuMainFormColors();
			skinTutuPortaledColors();
		}

		function skinTutuWidgetTheme(){
			if(!document.body || !document.body.classList.contains('page-tutu')) return;
			var target = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
			var roots = document.querySelectorAll(
				'body [class*="panel_689f01a1"],' +
				'.passengersContent,' +
				'[data-ti="child_passenger"],' +
				'[class*="calendarWrapper_"],' +
				'[class*="contentCalendar_"],' +
				'[class*="calendar_ff9f6322"]'
			);
			var i;
			for(i = 0; i < roots.length; i++){
				if(roots[i].hasAttribute('data-theme')){
					roots[i].setAttribute('data-theme', target);
				}
			}
			var nested = document.querySelectorAll(
				'body [class*="panel_689f01a1"] [data-theme],' +
				'.passengersContent [data-theme],' +
				'[data-ti="child_passenger"] [data-theme],' +
				'[class*="calendarWrapper_"] [data-theme],' +
				'[class*="contentCalendar_"] [data-theme]'
			);
			for(i = 0; i < nested.length; i++){
				nested[i].setAttribute('data-theme', target);
			}
		}

		function skinTutuIsActionButton(el){
			if(!el || !el.closest) return false;
			return !!el.closest(
				'[class*="generalPrimary_"],' +
				'[data-testid="select-button"],' +
				'[class*="generalSecondary_"]:not([class*="generalSecondaryNeutral_"])'
			);
		}

		function skinTutuPaint(el, color){
			if(!el || skinTutuIsActionButton(el)) return;
			el.style.setProperty('color', color, 'important');
			el.style.setProperty('-webkit-text-fill-color', color, 'important');
		}

		function skinTutuPortaledColors(){
			if(!document.body || !document.body.classList.contains('page-tutu')) return;
			var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
			var main = isDark ? '#e2e8f0' : '#171c29';
			var sub = isDark ? '#94a3b8' : '#80829b';
			var sec = isDark ? '#cbd5e1' : '#555a7a';
			var panelBg = isDark ? '#0f172a' : '#ffffff';
			var panelBorder = isDark ? '#334155' : '#e2e8f0';
			var btnNeutralBg = isDark ? 'rgba(148, 163, 184, 0.12)' : '#f1f5f9';
			var iconColor = amolabColor('icons');
			var scopes = document.querySelectorAll(
				'body [class*="panel_689f01a1"],' +
				'.passengersContent,' +
				'[data-ti="child_passenger"],' +
				'[class*="calendarWrapper_"],' +
				'[class*="contentCalendar_"]'
			);
			var i, j, scope, els;
			for(i = 0; i < scopes.length; i++){
				scope = scopes[i];
				scope.style.setProperty('background-color', panelBg, 'important');
				scope.style.setProperty('border-color', panelBorder, 'important');
				els = scope.querySelectorAll('[class*="sublabel_"], [class*="textNeutralSecondary_"], [class*="textNeutralTertiary_"]');
				for(j = 0; j < els.length; j++) skinTutuPaint(els[j], sub);
				els = scope.querySelectorAll(
					'[class*="textNeutralPrimary_"],' +
					'[class*="label_"],' +
					'[class*="value_"],' +
					'[class*="date_"],' +
					'[data-ti="label-value-label"],' +
					'[data-ti="label-value-value"],' +
					'.kite-label-value span,' +
					'h2'
				);
				for(j = 0; j < els.length; j++){
					if(els[j].closest('[class*="sublabel_"]')) continue;
					skinTutuPaint(els[j], main);
				}
				els = scope.querySelectorAll('[role="option"], [class*="cell_"], [class*="suggest_"] span');
				for(j = 0; j < els.length; j++) skinTutuPaint(els[j], main);
				els = scope.querySelectorAll('[class*="counter_"] [class*="text_"], [class*="counter_"] [class*="label_"], [class*="counter_"] [class*="value_"]');
				for(j = 0; j < els.length; j++) skinTutuPaint(els[j], main);
				els = scope.querySelectorAll('[class*="counter_"] [class*="button_"], [class*="counter_"] [class*="generalSecondaryNeutral_"]');
				for(j = 0; j < els.length; j++){
					els[j].style.setProperty('background-color', btnNeutralBg, 'important');
					els[j].style.setProperty('border-color', isDark ? '#475569' : '#e2e8f0', 'important');
					skinTutuPaint(els[j], main);
				}
				els = scope.querySelectorAll('[class*="counter_"] svg, [class*="controlAddon_"] svg, [class*="clearIcon_"] svg');
				for(j = 0; j < els.length; j++){
					els[j].style.setProperty('color', iconColor, 'important');
					els[j].style.setProperty('fill', 'currentColor', 'important');
				}
				els = scope.querySelectorAll('[data-testid="clear-button"], [class*="bottomButtons_"] [class*="generalSecondaryNeutral_"]');
				for(j = 0; j < els.length; j++){
					els[j].style.setProperty('background-color', btnNeutralBg, 'important');
					els[j].style.setProperty('border-color', panelBorder, 'important');
					skinTutuPaint(els[j], main);
				}
				els = scope.querySelectorAll('[class*="controlAddon_"], [class*="clearIcon_"]');
				for(j = 0; j < els.length; j++){
					els[j].style.setProperty('background', 'transparent', 'important');
					els[j].style.setProperty('background-color', 'transparent', 'important');
					els[j].style.setProperty('border', 'none', 'important');
					els[j].style.setProperty('box-shadow', 'none', 'important');
					els[j].style.setProperty('color', iconColor, 'important');
				}
			}
			document.body.style.setProperty('--kite-tooltip-background', panelBg, 'important');
			document.body.style.setProperty('--kite-popover-background', panelBg, 'important');
			var tooltips = document.querySelectorAll('[class*="tooltip_0c5a859e"]');
			for(i = 0; i < tooltips.length; i++){
				if(!tooltips[i].querySelector('[class*="contentCalendar_"], [class*="calendarWrapper_"]')) continue;
				els = tooltips[i].querySelectorAll('[class*="panel_0c5a859e"], [class*="panelStandard_0c5a859e"], [class*="content_0c5a859e"]');
				for(j = 0; j < els.length; j++){
					els[j].style.setProperty('background-color', panelBg, 'important');
					els[j].style.setProperty('--kite-tooltip-background', panelBg, 'important');
				}
				els = tooltips[i].querySelectorAll('[class*="tip_0c5a859e"]');
				for(j = 0; j < els.length; j++){
					els[j].style.setProperty('fill', panelBg, 'important');
				}
			}
			var calPanels = document.querySelectorAll('[class*="panel_689f01a1"]');
			for(i = 0; i < calPanels.length; i++){
				if(!calPanels[i].querySelector('[class*="contentCalendar_"], [class*="calendarWrapper_"]')) continue;
				calPanels[i].style.setProperty('background-color', panelBg, 'important');
				calPanels[i].style.setProperty('border-color', panelBorder, 'important');
			}
		}

		function skinTutuMainFormColors(){
			if(!document.body || !document.body.classList.contains('page-tutu')) return;
			var root = document.getElementById('tutuSearchWidget');
			if(!root) return;
			var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
			var main = isDark ? '#e2e8f0' : '#171c29';
			var sub = isDark ? '#94a3b8' : '#80829b';
			var bg = isDark ? '#0f172a' : '#ffffff';
			var border = isDark ? '#334155' : 'transparent';
			var fields = root.querySelectorAll('[class*="formGroupElement"]:not([class*="button_"])');
			for(var i = 0; i < fields.length; i++){
				fields[i].style.setProperty('background-color', bg, 'important');
				fields[i].style.setProperty('border-color', border, 'important');
			}
			var fieldButtons = root.querySelectorAll('[class*="formGroupElement"]:not([class*="button_"]) button');
			for(i = 0; i < fieldButtons.length; i++){
				fieldButtons[i].style.setProperty('padding-left', '16px', 'important');
				fieldButtons[i].style.setProperty('padding-right', '16px', 'important');
				fieldButtons[i].style.setProperty('box-sizing', 'border-box', 'important');
			}
			var texts = root.querySelectorAll(
				'[class*="formGroupElement"]:not([class*="button_"]) [class*="label_"],' +
				'[class*="formGroupElement"]:not([class*="button_"]) [class*="value_"],' +
				'[class*="formGroupElement"]:not([class*="button_"]) input'
			);
			for(i = 0; i < texts.length; i++){
				texts[i].style.setProperty('color', main, 'important');
				texts[i].style.setProperty('-webkit-text-fill-color', main, 'important');
				texts[i].style.setProperty('padding-left', '16px', 'important');
				texts[i].style.setProperty('padding-right', '16px', 'important');
				texts[i].style.setProperty('box-sizing', 'border-box', 'important');
			}
			var subs = root.querySelectorAll('[class*="formGroupElement"]:not([class*="button_"]) [class*="sublabel_"]');
			for(i = 0; i < subs.length; i++){
				subs[i].style.setProperty('color', sub, 'important');
				subs[i].style.setProperty('padding-left', '16px', 'important');
				subs[i].style.setProperty('padding-right', '16px', 'important');
				subs[i].style.setProperty('box-sizing', 'border-box', 'important');
			}
			var clears = root.querySelectorAll(
				'[class*="controlAddon_"],' +
				'[class*="clearIcon_"],' +
				'[class*="formGroupElement"] [class*="generalSecondaryNeutral_"]'
			);
			for(i = 0; i < clears.length; i++){
				if(clears[i].closest('[class*="counter_"]')) continue;
				clears[i].style.setProperty('background', 'transparent', 'important');
				clears[i].style.setProperty('background-color', 'transparent', 'important');
				clears[i].style.setProperty('border', 'none', 'important');
				clears[i].style.setProperty('outline', 'none', 'important');
				clears[i].style.setProperty('box-shadow', 'none', 'important');
				clears[i].style.setProperty('color', amolabColor('icons'), 'important');
			}
			var shells = document.querySelectorAll('.page-tutu [class*="_content_"]');
			for(i = 0; i < shells.length; i++){
				shells[i].style.setProperty('background-color', isDark ? '#1e293b' : amolabColor('primary'), 'important');
				shells[i].style.setProperty('border-color', isDark ? '#334155' : amolabColor('primary'), 'important');
			}
		}

		function skinTutuOnThemeChange(){
			skinTutuWidgetTheme();
			skinTutuMainFormColors();
			skinTutuPortaledColors();
			layoutTutuForm();
		}

		function insuranceDropdownIsOpen(){
			return !!(document.querySelector(
				'.page-insurance [class*="cherehapa-field-dropdown-opened"],' +
				'.page-insurance [class*="tourists-age-opened"],' +
				'.page-insurance [class*="tourists-dropdown-year-opened"]'
			));
		}

		function fixInsuranceTouristsAgeScroll(touristsField){
			if(!touristsField) return;
			var years = touristsField.querySelectorAll('[class*="tourists-dropdown-year"]');
			if(years.length < 8) return;

			var menu = null;
			var el = years[0].parentElement;
			while(el && el !== touristsField){
				var kids = el.children;
				var yearKids = 0;
				for(var k = 0; k < kids.length; k++){
					if(/dropdown-year/.test(kids[k].className || '')) yearKids++;
				}
				/* Parent whose children are mostly age options (not the whole tourists panel) */
				if(yearKids >= 8 && yearKids >= kids.length * 0.6){
					menu = el;
					break;
				}
				el = el.parentElement;
			}
			if(!menu) menu = years[0].parentElement;
			if(!menu) return;
			if(/tourists-container|field-dropdown|labels-container/.test(menu.className || '')) return;

			menu.classList.add('amolab-age-menu');
			menu.style.setProperty('grid-column', '1 / -1', 'important');
			menu.style.setProperty('width', '100%', 'important');
			menu.style.setProperty('max-width', '100%', 'important');
			menu.style.setProperty('min-width', '0', 'important');
			menu.style.setProperty('left', '0', 'important');
			menu.style.setProperty('right', '0', 'important');
			menu.style.setProperty('display', 'flex', 'important');
			menu.style.setProperty('flex-direction', 'column', 'important');
			menu.style.setProperty('flex-wrap', 'nowrap', 'important');
			menu.style.setProperty('align-items', 'stretch', 'important');
			menu.style.setProperty('grid-template-columns', 'none', 'important');
			menu.style.setProperty('max-height', isInsuranceMobile() ? 'min(14rem, 45vh)' : '14rem', 'important');
			menu.style.setProperty('overflow-y', 'auto', 'important');
			menu.style.setProperty('overflow-x', 'hidden', 'important');
			menu.style.setProperty('-webkit-overflow-scrolling', 'touch', 'important');
			menu.style.setProperty('overscroll-behavior', 'contain', 'important');
			menu.style.setProperty('box-sizing', 'border-box', 'important');
			for(var y = 0; y < years.length; y++){
				years[y].style.setProperty('display', 'block', 'important');
				years[y].style.setProperty('width', '100%', 'important');
				years[y].style.setProperty('max-width', '100%', 'important');
				years[y].style.setProperty('float', 'none', 'important');
				years[y].style.setProperty('clear', 'both', 'important');
				years[y].style.setProperty('flex', '0 0 auto', 'important');
				years[y].style.setProperty('box-sizing', 'border-box', 'important');
				years[y].style.setProperty('text-align', 'left', 'important');
			}
		}

		function hideInsuranceTouristsCarets(touristsField){
			if(!touristsField) return;
			var root = touristsField.querySelector('[class*="cherehapa-field-dropdown-opened"]')
				|| touristsField.querySelector('[class*="cherehapa-field-dropdown"]')
				|| touristsField;
			var nodes = root.querySelectorAll('*');
			for(var i = 0; i < nodes.length; i++){
				var el = nodes[i];
				var cls = String(el.className || '');
				if(/tourists-age|tourists-delete|tourists-button|tourists-add|tourists-dropdown-year|amolab-age-menu|labels-container|tourists-container/i.test(cls)
					&& !/arrow|caret|triangle|tip|notch|pointer/i.test(cls)){
					continue;
				}
				if(/arrow|caret|triangle|tip|notch|pointer/i.test(cls)){
					el.classList.add('amolab-hide-caret');
					el.style.setProperty('display', 'none', 'important');
					continue;
				}
				if(el.children.length || (el.textContent || '').trim()) continue;
				var r = el.getBoundingClientRect();
				if(r.width <= 0 && r.height <= 0){
					var cs0 = window.getComputedStyle(el);
					var bw = (parseFloat(cs0.borderTopWidth) || 0)
						+ (parseFloat(cs0.borderBottomWidth) || 0)
						+ (parseFloat(cs0.borderLeftWidth) || 0)
						+ (parseFloat(cs0.borderRightWidth) || 0);
					if(bw >= 6){
						el.classList.add('amolab-hide-caret');
						el.style.setProperty('display', 'none', 'important');
					}
					continue;
				}
				if(r.width > 0 && r.width <= 28 && r.height > 0 && r.height <= 28){
					var cs = window.getComputedStyle(el);
					var bt = parseFloat(cs.borderTopWidth) || 0;
					var bb = parseFloat(cs.borderBottomWidth) || 0;
					var bl = parseFloat(cs.borderLeftWidth) || 0;
					var br = parseFloat(cs.borderRightWidth) || 0;
					var bg = (cs.backgroundColor || '').replace(/\s/g, '');
					var isBlue = /rgba?\((14,\s*165,\s*233|2,\s*132,\s*199|56,\s*189,\s*248|0,\s*1[0-9]{2},\s*2[0-9]{2})/i.test(bg)
						|| /#(0ea5e9|0284c7|38bdf8|0099|0088|0ea)/i.test(cs.borderTopColor + cs.borderBottomColor + cs.borderLeftColor + cs.borderRightColor + bg);
					if(bt + bb + bl + br >= 6 || isBlue){
						el.classList.add('amolab-hide-caret');
						el.style.setProperty('display', 'none', 'important');
					}
				}
			}
			var dd = touristsField.querySelector('[class*="cherehapa-field-dropdown"]');
			if(dd){
				dd.style.setProperty('background', '#fff', 'important');
				dd.style.setProperty('background-color', '#fff', 'important');
				dd.style.setProperty('box-shadow', '0 0 0 4px #fff, 0 8px 24px rgba(15,23,42,.12)', 'important');
			}
		}

		function fixInsuranceTouristsDelete(touristsField){
			if(!touristsField) return;
			var panels = touristsField.querySelectorAll('[class*="tourists-container"], [class*="tourists-dropdown-container"]');
			for(var p = 0; p < panels.length; p++){
				panels[p].style.setProperty('display', 'grid', 'important');
				panels[p].style.setProperty('grid-template-columns', 'minmax(0, 1fr) 2rem', 'important');
				panels[p].style.setProperty('align-items', 'center', 'important');
				panels[p].style.setProperty('column-gap', '.5rem', 'important');
				panels[p].style.setProperty('row-gap', '.5rem', 'important');
				panels[p].style.setProperty('justify-items', 'stretch', 'important');
				panels[p].style.setProperty('width', '100%', 'important');
				panels[p].style.setProperty('box-sizing', 'border-box', 'important');
			}
			var ages = touristsField.querySelectorAll('[class*="tourists-age"]:not([class*="dropdown"])');
			for(var a = 0; a < ages.length; a++){
				var age = ages[a];
				age.style.setProperty('grid-column', '1', 'important');
				age.style.setProperty('justify-self', 'stretch', 'important');
				age.style.setProperty('width', 'auto', 'important');
				age.style.setProperty('max-width', '100%', 'important');
				age.style.setProperty('min-width', '0', 'important');
				age.style.setProperty('box-sizing', 'border-box', 'important');
				age.style.setProperty('display', 'flex', 'important');
				age.style.setProperty('align-items', 'center', 'important');
				age.style.setProperty('justify-content', 'flex-start', 'important');
				age.style.setProperty('text-align', 'left', 'important');
				age.style.setProperty('margin', '0', 'important');
				age.style.setProperty('position', 'relative', 'important');
				age.style.setProperty('inset', 'auto', 'important');
				age.style.setProperty('transform', 'none', 'important');
			}
			var dels = touristsField.querySelectorAll('[class*="tourists-delete-button"]');
			for(var i = 0; i < dels.length; i++){
				var btn = dels[i];
				var nested = !!(btn.parentElement && /tourists-age/.test(btn.parentElement.className || ''));
				btn.style.setProperty('pointer-events', 'auto', 'important');
				btn.style.setProperty('cursor', 'pointer', 'important');
				btn.style.setProperty('z-index', '10', 'important');
				btn.style.setProperty('position', 'relative', 'important');
				btn.style.setProperty('inset', 'auto', 'important');
				btn.style.setProperty('top', 'auto', 'important');
				btn.style.setProperty('right', 'auto', 'important');
				btn.style.setProperty('left', 'auto', 'important');
				btn.style.setProperty('bottom', 'auto', 'important');
				btn.style.setProperty('transform', 'none', 'important');
				btn.style.setProperty('float', 'none', 'important');
				btn.style.setProperty('display', 'inline-flex', 'important');
				btn.style.setProperty('align-items', 'center', 'important');
				btn.style.setProperty('justify-content', 'center', 'important');
				btn.style.setProperty('width', '2rem', 'important');
				btn.style.setProperty('min-width', '2rem', 'important');
				btn.style.setProperty('height', '2rem', 'important');
				btn.style.setProperty('flex', '0 0 auto', 'important');
				btn.style.setProperty('margin', '0', 'important');
				if(nested){
					btn.style.setProperty('grid-column', 'auto', 'important');
					btn.style.setProperty('margin-left', 'auto', 'important');
				}else{
					btn.style.setProperty('grid-column', '2', 'important');
					btn.style.setProperty('justify-self', 'center', 'important');
					btn.style.setProperty('align-self', 'center', 'important');
					btn.style.removeProperty('margin-left');
				}
			}
		}

		function syncInsuranceDropdowns(){
			if(!document.body || !document.body.classList.contains('page-insurance')) return;
			var grid = document.querySelector('.page-insurance [class*="cherehapa-fields"]');
			if(!grid) return;
			var container = grid.closest('[class*="cherehapa-container"]') || grid.parentElement;

			var selectors = [
				'[class*="cherehapa-direction"]',
				'[class*="cherehapa-dateStart"]',
				'[class*="cherehapa-dateEnd"]',
				'[class*="cherehapa-tourists"]',
				'[class*="cherehapa-sports"]'
			];
			var hasOpen = false;

			for(var s = 0; s < selectors.length; s++){
				var fields = grid.querySelectorAll(':scope > ' + selectors[s]);
				for(var i = 0; i < fields.length; i++){
					var field = fields[i];
					var dropdown = field.querySelector('[class*="cherehapa-field-dropdown"]');
					var opened = field.querySelector('[class*="cherehapa-field-dropdown-opened"]');
					if(dropdown && isInsuranceMobile() && (/dateStart/.test(field.className) || /dateEnd/.test(field.className))){
						var calWidth = 'min(19.5rem, calc(100vw - 2rem))';
						dropdown.style.setProperty('top', '100%', 'important');
						dropdown.style.setProperty('margin-top', '.5rem', 'important');
						dropdown.style.setProperty('transform', 'none', 'important');
						dropdown.style.setProperty('width', calWidth, 'important');
						dropdown.style.setProperty('min-width', '0', 'important');
						dropdown.style.setProperty('max-width', 'calc(100vw - 2rem)', 'important');
						if(/dateStart/.test(field.className)){
							dropdown.style.setProperty('left', '0', 'important');
							dropdown.style.setProperty('right', 'auto', 'important');
						}else{
							dropdown.style.setProperty('left', 'auto', 'important');
							dropdown.style.setProperty('right', '0', 'important');
						}
					}
					if(opened){
						if(!field.classList.contains('amolab-insurance-field-open')){
							field.classList.add('amolab-insurance-field-open');
						}
						field.style.setProperty('overflow', 'visible', 'important');
						field.style.setProperty('z-index', /tourists/.test(field.className) ? '200' : '120', 'important');
						if(dropdown){
							dropdown.style.setProperty('z-index', /tourists/.test(field.className) ? '220' : '130', 'important');
						}
						if(/tourists/.test(field.className)){
							fixInsuranceTouristsDelete(field);
							fixInsuranceTouristsAgeScroll(field);
							hideInsuranceTouristsCarets(field);
						}
						hasOpen = true;
					}else if(field.classList.contains('amolab-insurance-field-open')){
						field.classList.remove('amolab-insurance-field-open');
						field.style.removeProperty('overflow');
						field.style.removeProperty('z-index');
					}
				}
			}

			var shellHosts = document.querySelectorAll('.page-insurance .hero-search-card, .page-insurance .hero-search-card .card-body, .page-insurance .embed-stage, .page-insurance .form_load, .page-insurance #che-smallWidget');
			if(hasOpen){
				if(!grid.classList.contains('amolab-insurance-has-open')) grid.classList.add('amolab-insurance-has-open');
				if(container){
					if(!container.classList.contains('amolab-insurance-has-open')) container.classList.add('amolab-insurance-has-open');
					container.style.setProperty('overflow', 'visible', 'important');
				}
				for(var h = 0; h < shellHosts.length; h++){
					if(!shellHosts[h].classList.contains('amolab-insurance-has-open')) shellHosts[h].classList.add('amolab-insurance-has-open');
					shellHosts[h].style.setProperty('overflow', 'visible', 'important');
				}
			}else{
				if(grid.classList.contains('amolab-insurance-has-open')) grid.classList.remove('amolab-insurance-has-open');
				if(container){
					if(container.classList.contains('amolab-insurance-has-open')) container.classList.remove('amolab-insurance-has-open');
					if(isInsuranceMobile()) container.style.setProperty('overflow', 'hidden', 'important');
					else container.style.removeProperty('overflow');
				}
				for(var hc = 0; hc < shellHosts.length; hc++){
					if(shellHosts[hc].classList.contains('amolab-insurance-has-open')) shellHosts[hc].classList.remove('amolab-insurance-has-open');
					if(isInsuranceMobile()) shellHosts[hc].style.setProperty('overflow', 'hidden', 'important');
					else shellHosts[hc].style.removeProperty('overflow');
				}
			}
		}

		function isInsuranceMobile(){
			return window.matchMedia('(max-width:767.98px)').matches;
		}

		function unwrapInsuranceDatesRow(grid){
			if(!grid) return;
			var row = grid.querySelector(':scope > .amolab-insurance-dates-row');
			if(!row) return;
			while(row.firstChild) grid.insertBefore(row.firstChild, row);
			row.remove();
		}

		function skinInsuranceFieldCards(grid){
			if(!grid) return;
			var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
			var radius = '8px';
			var bg = isDark ? '#0f172a' : '#fff';
			var fields = grid.querySelectorAll(
				':scope > [class*="cherehapa-direction"],' +
				':scope > [class*="cherehapa-dateStart"],' +
				':scope > [class*="cherehapa-dateEnd"],' +
				':scope > [class*="cherehapa-tourists"],' +
				':scope > [class*="cherehapa-sports"]'
			);
			for(var i = 0; i < fields.length; i++){
				var field = fields[i];
				field.style.setProperty('border-radius', radius, 'important');
				field.style.setProperty('background', bg, 'important');
				field.style.setProperty('background-color', bg, 'important');
				if(!field.classList.contains('amolab-insurance-field-open')){
					field.style.removeProperty('overflow');
				}
				var inners = field.querySelectorAll(':scope > [class*="field"], [class*="labels-container"], [class*="cherehapa-labels-container"]');
				for(var j = 0; j < inners.length; j++){
					inners[j].style.setProperty('border-radius', radius, 'important');
				}
			}
		}

		function applyInsuranceInlineLayout(grid){
			if(!grid) return;
			unwrapInsuranceDatesRow(grid);
			var mobile = isInsuranceMobile();
			var container = grid.closest('[class*="cherehapa-container"]') || grid.parentElement;
			var dateStart = grid.querySelector(':scope > [class*="cherehapa-dateStart"]');
			var dateEnd = grid.querySelector(':scope > [class*="cherehapa-dateEnd"]');

			if(container){
				container.style.setProperty('width', '100%', 'important');
				container.style.setProperty('max-width', '100%', 'important');
				container.style.setProperty('min-width', '0', 'important');
				container.style.setProperty('box-sizing', 'border-box', 'important');
				if(!grid.classList.contains('amolab-insurance-has-open')){
					container.style.setProperty('overflow', mobile ? 'hidden' : 'visible', 'important');
				}
			}

			grid.style.setProperty('display', 'grid', 'important');
			grid.style.setProperty('width', '100%', 'important');
			grid.style.setProperty('max-width', '100%', 'important');
			grid.style.setProperty('min-width', '0', 'important');
			grid.style.setProperty('grid-template-areas', 'none', 'important');
			grid.style.setProperty('gap', mobile ? '.5rem' : '.75rem', 'important');
			grid.style.setProperty('grid-template-columns', mobile ? '1fr 1fr' : 'repeat(3,minmax(0,1fr))', 'important');

			if(mobile && dateStart && dateEnd){
				dateStart.style.setProperty('grid-column', '1 / 2', 'important');
				dateStart.style.setProperty('grid-row', '2', 'important');
				dateStart.style.setProperty('width', '100%', 'important');
				dateStart.style.setProperty('max-width', '100%', 'important');
				dateStart.style.setProperty('min-width', '0', 'important');
				dateStart.style.setProperty('justify-self', 'stretch', 'important');
				dateEnd.style.setProperty('grid-column', '2 / 3', 'important');
				dateEnd.style.setProperty('grid-row', '2', 'important');
				dateEnd.style.setProperty('width', '100%', 'important');
				dateEnd.style.setProperty('max-width', '100%', 'important');
				dateEnd.style.setProperty('min-width', '0', 'important');
				dateEnd.style.setProperty('justify-self', 'stretch', 'important');
			}

			var kids = grid.children;
			for(var i = 0; i < kids.length; i++){
				var el = kids[i];
				var cls = el.className || '';
				el.style.setProperty('grid-area', 'auto', 'important');
				el.style.setProperty('min-width', '0', 'important');

				if(/cherehapa-direction/.test(cls)){
					el.style.setProperty('grid-column', mobile ? '1 / -1' : '1 / 2', 'important');
					el.style.setProperty('grid-row', '1', 'important');
					el.style.setProperty('width', mobile ? '100%' : '', 'important');
				}else if(/cherehapa-dateStart/.test(cls)){
					if(mobile) continue;
					el.style.setProperty('grid-column', '2 / 3', 'important');
					el.style.setProperty('grid-row', '1', 'important');
				}else if(/cherehapa-dateEnd/.test(cls)){
					if(mobile) continue;
					el.style.setProperty('grid-column', '3 / 4', 'important');
					el.style.setProperty('grid-row', '1', 'important');
				}else if(/cherehapa-tourists/.test(cls)){
					el.style.setProperty('grid-column', mobile ? '1 / -1' : '1 / 2', 'important');
					el.style.setProperty('grid-row', mobile ? '3' : '2', 'important');
					el.style.setProperty('width', mobile ? '100%' : '', 'important');
				}else if(/abroad-wrapper|cherehapa-abroad-wrapper/.test(cls)){
					el.style.setProperty('grid-column', mobile ? '1 / -1' : '2 / 3', 'important');
					el.style.setProperty('grid-row', mobile ? '4' : '2', 'important');
					el.style.setProperty('width', mobile ? '100%' : '', 'important');
				}else if(/cherehapa-submit-button/.test(cls)){
					el.style.setProperty('grid-column', mobile ? '1 / -1' : '3 / 4', 'important');
					el.style.setProperty('grid-row', mobile ? '5' : '2', 'important');
					el.style.setProperty('width', mobile ? '100%' : '', 'important');
				}else if(/cherehapa-sports/.test(cls)){
					el.style.setProperty('grid-column', mobile ? '1 / -1' : '', 'important');
					el.style.setProperty('width', mobile ? '100%' : '', 'important');
				}
			}
		}

		function layoutInsuranceForm(){
			if(!document.body || !document.body.classList.contains('page-insurance')) return;
			var grid = document.querySelector('.page-insurance [class*="cherehapa-fields"]');
			if(!grid) return;
			grid.classList.add('amolab-insurance-grid');

			var styleId = 'amolab-insurance-form-skin';
			var styleEl = document.getElementById(styleId);
			if(!styleEl){
				styleEl = document.createElement('style');
				styleEl.id = styleId;
				document.head.appendChild(styleEl);
			}

			styleEl.textContent = [
				'.page-insurance [class*="cherehapa-fields"]{',
				'display:grid!important;',
				'gap:.75rem!important;',
				'filter:none!important;',
				'overflow:visible!important;',
				'grid-template-columns:repeat(3,minmax(0,1fr))!important;',
				'grid-template-rows:none!important;',
				'grid-auto-rows:minmax(3.25rem,auto)!important;',
				'grid-template-areas:none!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-direction"]{',
				'grid-column:1 / 2!important;grid-row:1!important;grid-area:auto!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-dateStart"]{',
				'grid-column:2 / 3!important;grid-row:1!important;grid-area:auto!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-dateEnd"]{',
				'grid-column:3 / 4!important;grid-row:1!important;grid-area:auto!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-tourists"]{',
				'grid-column:1 / 2!important;grid-row:2!important;grid-area:auto!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > [class*="abroad-wrapper"],',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-abroad-wrapper"]{',
				'grid-column:2 / 3!important;grid-row:2!important;grid-area:auto!important;align-self:center!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-submit-button"]{',
				'grid-column:3 / 4!important;grid-row:2!important;grid-area:auto!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-direction"],',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-dateStart"],',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-dateEnd"],',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-tourists"],',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-sports"]{',
				'border-radius:8px!important;overflow:visible!important;background:#fff!important;',
				'min-height:3.25rem!important;height:auto!important;',
				'display:flex!important;align-items:center!important;',
				'position:relative!important;z-index:1!important;',
				'}',
				'.page-insurance [class*="cherehapa-direction"] > [class*="field"],',
				'.page-insurance [class*="cherehapa-dateStart"] > [class*="field"],',
				'.page-insurance [class*="cherehapa-dateEnd"] > [class*="field"],',
				'.page-insurance [class*="cherehapa-tourists"] > [class*="field"],',
				'.page-insurance [class*="cherehapa-sports"] > [class*="field"]{',
				'border-radius:8px!important;overflow:visible!important;background:#fff!important;',
				'width:100%!important;min-width:0!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > .amolab-insurance-field-open,',
				'.page-insurance .amolab-insurance-field-open{',
				'overflow:visible!important;z-index:120!important;',
				'}',
				'.page-insurance [class*="cherehapa-field-dropdown"]:not([class*="dropdown-opened"]){',
				'position:absolute!important;left:0!important;right:0!important;top:100%!important;',
				'margin-top:.5rem!important;z-index:130!important;overflow:visible!important;',
				'pointer-events:none!important;opacity:0!important;visibility:hidden!important;',
				'}',
				'.page-insurance [class*="cherehapa-field-dropdown-opened"]{',
				'position:absolute!important;left:0!important;right:0!important;top:100%!important;',
				'margin-top:.5rem!important;z-index:130!important;overflow:visible!important;',
				'border-radius:12px!important;box-shadow:0 8px 24px rgba(15,23,42,.12)!important;',
				'opacity:1!important;visibility:visible!important;transform:translateY(0)!important;',
				'pointer-events:auto!important;',
				'}',
				'.page-insurance [class*="cherehapa-directions-container"],',
				'.page-insurance [class*="cherehapa-datepicker-box"],',
				'.page-insurance [class*="cherehapa-datepicker-container"]{',
				'border-radius:12px!important;overflow:hidden!important;',
				'}',
				'.page-insurance [class*="cherehapa-tourists"] [class*="cherehapa-field-dropdown"]{',
				'right:auto!important;left:0!important;width:100%!important;min-width:0!important;max-width:100%!important;',
				'height:auto!important;max-height:none!important;overflow:visible!important;z-index:220!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-tourists"].amolab-insurance-field-open,',
				'.page-insurance [class*="cherehapa-tourists"].amolab-insurance-field-open{',
				'z-index:200!important;overflow:visible!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-submit-button"]{',
				'position:relative!important;z-index:1!important;',
				'}',
				'.page-insurance [class*="cherehapa-tourists-container"]{',
				'border-radius:12px!important;overflow:visible!important;height:auto!important;',
				'max-height:none!important;width:100%!important;box-sizing:border-box!important;',
				'position:relative!important;z-index:2!important;',
				'display:grid!important;grid-template-columns:minmax(0,1fr) 2rem!important;',
				'align-items:center!important;column-gap:.5rem!important;row-gap:.5rem!important;justify-items:stretch!important;',
				'}',
				'.page-insurance [class*="tourists-dropdown-container"]{',
				'overflow:visible!important;max-height:none!important;height:auto!important;',
				'width:100%!important;box-sizing:border-box!important;position:relative!important;z-index:2!important;',
				'display:grid!important;grid-template-columns:minmax(0,1fr) 2rem!important;',
				'align-items:center!important;column-gap:.5rem!important;row-gap:.5rem!important;justify-items:stretch!important;',
				'}',
				'.page-insurance [class*="tourists-age"]:not([class*="dropdown"]){',
				'grid-column:1!important;justify-self:stretch!important;width:auto!important;max-width:100%!important;min-width:0!important;',
				'box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;',
				'text-align:left!important;margin:0!important;position:relative!important;inset:auto!important;transform:none!important;',
				'padding:.55rem .85rem!important;',
				'}',
				'.page-insurance [class*="tourists-delete-button"]{',
				'grid-column:2!important;justify-self:center!important;align-self:center!important;',
				'position:relative!important;inset:auto!important;top:auto!important;right:auto!important;left:auto!important;bottom:auto!important;',
				'transform:none!important;float:none!important;z-index:10!important;pointer-events:auto!important;cursor:pointer!important;',
				'display:inline-flex!important;align-items:center!important;justify-content:center!important;',
				'width:2rem!important;min-width:2rem!important;height:2rem!important;margin:0!important;padding:0!important;',
				'border:0!important;border-radius:999px!important;background:transparent!important;color:#94a3b8!important;',
				'}',
				'.page-insurance [class*="tourists-age"] > [class*="tourists-delete-button"]{',
				'grid-column:auto!important;margin-left:auto!important;flex:0 0 auto!important;',
				'}',
				'.page-insurance [class*="cherehapa-tourists-button-container"],',
				'.page-insurance [class*="tourists-button-container"],',
				'.page-insurance [class*="cherehapa-tourists-button"]:not([class*="delete"]):not([class*="container"]),',
				'.page-insurance [class*="tourists-add"]:not([class*="icon"]){',
				'grid-column:1 / -1!important;width:100%!important;max-width:100%!important;box-sizing:border-box!important;',
				'position:relative!important;z-index:3!important;display:block!important;',
				'}',
				'.page-insurance [class*="tourists-age-opened"],',
				'.page-insurance [class*="tourists-dropdown-year-opened"]{',
				'position:relative!important;z-index:5!important;',
				'}',
				'.page-insurance [class*="cherehapa-tourists"] .amolab-age-menu,',
				'.page-insurance .amolab-age-menu{',
				'grid-column:1 / -1!important;width:100%!important;max-width:100%!important;min-width:0!important;',
				'left:0!important;right:0!important;',
				'display:flex!important;flex-direction:column!important;flex-wrap:nowrap!important;align-items:stretch!important;',
				'grid-template-columns:none!important;',
				'max-height:14rem!important;overflow-x:hidden!important;overflow-y:auto!important;',
				'-webkit-overflow-scrolling:touch!important;overscroll-behavior:contain!important;',
				'box-sizing:border-box!important;',
				'}',
				'.page-insurance [class*="tourists-dropdown-year"]{',
				'display:block!important;width:100%!important;max-width:100%!important;box-sizing:border-box!important;',
				'text-align:left!important;float:none!important;clear:both!important;flex:0 0 auto!important;',
				'}',
				'.page-insurance [class*="cherehapa-tourists"] [class*="cherehapa-field-dropdown"],',
				'.page-insurance [class*="cherehapa-tourists"] [class*="cherehapa-field-dropdown-opened"]{',
				'background:#fff!important;background-color:#fff!important;',
				'box-shadow:0 0 0 4px #fff,0 8px 24px rgba(15,23,42,.12)!important;',
				'}',
				'.page-insurance [class*="cherehapa-tourists"].amolab-insurance-field-open::before,',
				'.page-insurance [class*="cherehapa-tourists"].amolab-insurance-field-open::after,',
				'.page-insurance [class*="cherehapa-tourists"] [class*="cherehapa-field-dropdown"]::before,',
				'.page-insurance [class*="cherehapa-tourists"] [class*="cherehapa-field-dropdown"]::after,',
				'.page-insurance [class*="tourists-container"]::before,',
				'.page-insurance [class*="tourists-container"]::after,',
				'.page-insurance [class*="tourists-dropdown-container"]::before,',
				'.page-insurance [class*="tourists-dropdown-container"]::after,',
				'.page-insurance [class*="cherehapa-tourists-button-container"]::before,',
				'.page-insurance [class*="cherehapa-tourists-button-container"]::after,',
				'.page-insurance [class*="tourists-button"]:not([class*="delete"])::before,',
				'.page-insurance [class*="tourists-button"]:not([class*="delete"])::after,',
				'.page-insurance [class*="tourists-add"]::before,',
				'.page-insurance [class*="tourists-add"]::after{',
				'content:none!important;display:none!important;border:0!important;width:0!important;height:0!important;',
				'opacity:0!important;visibility:hidden!important;background:none!important;',
				'}',
				'.page-insurance [class*="cherehapa-tourists-add-icon"],',
				'.page-insurance [class*="tourists-add-icon"]{',
				'display:none!important;visibility:hidden!important;opacity:0!important;',
				'width:0!important;height:0!important;overflow:hidden!important;pointer-events:none!important;',
				'}',
				'.page-insurance [class*="cherehapa-datepicker-box"],',
				'.page-insurance [class*="cherehapa-datepicker-container"]{',
				'display:flex!important;flex-direction:column!important;align-items:center!important;',
				'}',
				'.page-insurance [class*="cherehapa-datepicker-month-name"],',
				'.page-insurance [class*="cherehapa-calendar-container"],',
				'.page-insurance [class*="cherehapa-datepicker-year-button"]{',
				'width:224px!important;max-width:100%!important;margin-left:auto!important;margin-right:auto!important;',
				'}',
				'.page-insurance [class*="cherehapa-dateStart"] [class*="cherehapa-field-dropdown"],',
				'.page-insurance [class*="cherehapa-dateEnd"] [class*="cherehapa-field-dropdown"]{',
				'right:auto!important;width:min(19.5rem,calc(100vw - 2.5rem))!important;min-width:17.5rem!important;',
				'}',
				'.page-insurance [class*="cherehapa-dateEnd"] [class*="cherehapa-field-dropdown"]{',
				'left:auto!important;right:0!important;',
				'}',
				'.page-insurance [class*="cherehapa-labels-container"],',
				'.page-insurance [class*="labels-container"]{',
				'padding:.55rem .85rem!important;min-height:0!important;align-items:center!important;',
				'overflow:hidden!important;border-radius:8px!important;width:100%!important;background:transparent!important;',
				'}',
				'.page-insurance [class*="cherehapa-submit-button"]{',
				'width:100%!important;margin:0!important;height:3.25rem!important;min-height:3.25rem!important;',
				'border-radius:12px!important;font-weight:300!important;',
				'}',
				'.page-insurance [class*="abroad-wrapper"],',
				'.page-insurance [class*="cherehapa-abroad-wrapper"]{',
				'margin:0!important;height:auto!important;min-height:0!important;max-height:none!important;',
				'display:flex!important;align-items:center!important;align-self:center!important;padding:0!important;',
				'}',
				'.page-insurance [class*="cherehapa-abroad"]:not([class*="wrapper"]):not([class*="icon"]):not([class*="text"]){',
				'display:flex!important;align-items:center!important;gap:.5rem!important;height:auto!important;',
				'}',
				'.page-insurance [class*="abroad-icon"],',
				'.page-insurance [class*="cherehapa-abroad-icon"]{',
				'box-sizing:border-box!important;width:1.5rem!important;height:1.5rem!important;',
				'min-width:1.5rem!important;min-height:1.5rem!important;max-width:1.5rem!important;max-height:1.5rem!important;',
				'flex:0 0 1.5rem!important;align-self:center!important;',
				'}',
				'.page-insurance [class*="abroad-text"],',
				'.page-insurance [class*="cherehapa-abroad-text"]{',
				'line-height:1.25!important;align-self:center!important;',
				'}',
				'@media (max-width:767.98px){',
				'.page-insurance .cherehapa-container,',
				'.page-insurance [class*="cherehapa-container"]{',
				'width:100%!important;max-width:100%!important;min-width:0!important;',
				'box-sizing:border-box!important;padding:.75rem!important;overflow:hidden!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"]{',
				'grid-template-columns:1fr 1fr!important;',
				'gap:.5rem!important;width:100%!important;max-width:100%!important;min-width:0!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-direction"]{',
				'grid-column:1 / -1!important;grid-row:1!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-dateStart"]{',
				'grid-column:1 / 2!important;grid-row:2!important;width:100%!important;min-width:0!important;justify-self:stretch!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-dateEnd"]{',
				'grid-column:2 / 3!important;grid-row:2!important;width:100%!important;min-width:0!important;justify-self:stretch!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-tourists"]{',
				'grid-column:1 / -1!important;grid-row:3!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > [class*="abroad-wrapper"],',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-abroad-wrapper"]{',
				'grid-column:1 / -1!important;grid-row:4!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-submit-button"]{',
				'grid-column:1 / -1!important;grid-row:5!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-direction"],',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-tourists"],',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-sports"],',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-submit-button"],',
				'.page-insurance [class*="cherehapa-fields"] > [class*="abroad-wrapper"],',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-abroad-wrapper"]{',
				'width:100%!important;max-width:100%!important;min-width:0!important;',
				'}',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-dateStart"],',
				'.page-insurance [class*="cherehapa-fields"] > [class*="cherehapa-dateEnd"]{',
				'width:100%!important;max-width:100%!important;min-width:0!important;overflow:visible!important;',
				'}',
				'.page-insurance [class*="cherehapa-dateStart"] > [class*="field"],',
				'.page-insurance [class*="cherehapa-dateEnd"] > [class*="field"],',
				'.page-insurance [class*="cherehapa-dateStart"] [class*="cherehapa-labels-container"],',
				'.page-insurance [class*="cherehapa-dateEnd"] [class*="cherehapa-labels-container"],',
				'.page-insurance [class*="cherehapa-dateStart"] [class*="labels-container"],',
				'.page-insurance [class*="cherehapa-dateEnd"] [class*="labels-container"]{',
				'width:100%!important;max-width:100%!important;min-width:0!important;box-sizing:border-box!important;',
				'}',
				'.page-insurance [class*="cherehapa-dateStart"] [class*="cherehapa-labels-container"],',
				'.page-insurance [class*="cherehapa-dateEnd"] [class*="cherehapa-labels-container"],',
				'.page-insurance [class*="cherehapa-dateStart"] [class*="labels-container"],',
				'.page-insurance [class*="cherehapa-dateEnd"] [class*="labels-container"]{',
				'padding:.55rem .5rem!important;',
				'}',
				'.page-insurance [class*="cherehapa-dateStart"] [class*="cherehapa-field-dropdown"],',
				'.page-insurance [class*="cherehapa-dateEnd"] [class*="cherehapa-field-dropdown"]{',
				'width:min(19.5rem,calc(100vw - 2rem))!important;min-width:0!important;max-width:calc(100vw - 2rem)!important;',
				'}',
				'.page-insurance [class*="cherehapa-dateStart"] [class*="cherehapa-field-dropdown"],',
				'.page-insurance [class*="cherehapa-dateStart"] [class*="cherehapa-field-dropdown-opened"]{',
				'left:0!important;right:auto!important;top:100%!important;margin-top:.5rem!important;transform:none!important;',
				'}',
				'.page-insurance [class*="cherehapa-dateEnd"] [class*="cherehapa-field-dropdown"],',
				'.page-insurance [class*="cherehapa-dateEnd"] [class*="cherehapa-field-dropdown-opened"]{',
				'left:auto!important;right:0!important;top:100%!important;margin-top:.5rem!important;transform:none!important;',
				'}',
				'.page-insurance [class*="cherehapa-tourists"] [class*="cherehapa-field-dropdown"]{',
				'min-width:0!important;width:100%!important;max-width:100%!important;',
				'}',
				'.page-insurance [class*="abroad-text"],',
				'.page-insurance [class*="cherehapa-abroad-text"]{',
				'white-space:normal!important;overflow-wrap:anywhere!important;',
				'}',
				'}'
			].join('');

			applyInsuranceInlineLayout(grid);
			skinInsuranceFieldCards(grid);
			syncInsuranceDropdowns();
		}

		function watchInsuranceForm(){
			if(!document.body || !document.body.classList.contains('page-insurance')) return;
			layoutInsuranceForm();
			if(!window._amolabInsuranceResizeBound){
				window._amolabInsuranceResizeBound = true;
				var resizeT = null;
				window.addEventListener('resize', function(){
					if(resizeT) clearTimeout(resizeT);
					resizeT = setTimeout(layoutInsuranceForm, 100);
				});
			}
			var host = document.querySelector('.page-insurance .embed-stage, .page-insurance #che-smallWidget, .page-insurance .form_load') || document.body;
			if(host._amolabInsuranceObs) return;
			var t = null;
			host._amolabInsuranceObs = new MutationObserver(function(mutations){
				if(t) clearTimeout(t);
				var needsLayout = false;
				var needsSync = false;
				for(var m = 0; m < mutations.length; m++){
					var mut = mutations[m];
					if(mut.type === 'attributes'){
						var cls = (mut.target && mut.target.className) ? String(mut.target.className) : '';
						/* our own open-state markers — avoid sync/layout feedback loops */
						if(/amolab-insurance-(field-open|has-open|grid)/.test(cls) && mut.attributeName === 'class'){
							continue;
						}
						needsSync = true;
					}else if(mut.type === 'childList'){
						var tgt = mut.target;
						var insidePanel = !!(tgt && tgt.closest && tgt.closest(
							'[class*="cherehapa-field-dropdown"], [class*="tourists-container"], [class*="tourists-dropdown"], [class*="datepicker"]'
						));
						if(insidePanel || insuranceDropdownIsOpen()) needsSync = true;
						else needsLayout = true;
					}
				}
				if(!needsLayout && !needsSync) return;
				t = setTimeout(function(){
					/* Full re-layout while a dropdown is open closes the tourists panel */
					if(needsLayout && !insuranceDropdownIsOpen()) layoutInsuranceForm();
					else syncInsuranceDropdowns();
				}, needsLayout ? 50 : 16);
			});
			host._amolabInsuranceObs.observe(host, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
			setTimeout(layoutInsuranceForm, 300);
			setTimeout(layoutInsuranceForm, 1200);
			setTimeout(layoutInsuranceForm, 3000);
		}

		function watchTutuForm(){
			if(!document.body || !document.body.classList.contains('page-tutu')) return;
			layoutTutuForm();
			var host = document.querySelector('.page-tutu .embed-stage, .page-tutu #widget-container, .page-tutu #tutuSearchWidget') || document.body;
			if(host._amolabTutuObs) return;
			var t = null;
			host._amolabTutuObs = new MutationObserver(function(){
				if(t) clearTimeout(t);
				t = setTimeout(function(){
					layoutTutuForm();
					skinTutuWidgetTheme();
					skinTutuMainFormColors();
					skinTutuPortaledColors();
				}, 50);
			});
			host._amolabTutuObs.observe(host, { childList: true, subtree: true });
			if(!document.body._amolabTutuPortalObs){
				document.body._amolabTutuPortalObs = new MutationObserver(function(){
					if(t) clearTimeout(t);
					t = setTimeout(function(){
						skinTutuWidgetTheme();
						skinTutuMainFormColors();
						skinTutuPortaledColors();
					}, 50);
				});
				document.body._amolabTutuPortalObs.observe(document.body, { childList: true, subtree: true });
			}
			setTimeout(layoutTutuForm, 300);
			setTimeout(layoutTutuForm, 1200);
			setTimeout(layoutTutuForm, 3000);
		}

		document.querySelectorAll('.embed-stage').forEach(watchStage);
		watchTutuForm();
		watchInsuranceForm();
		watchPopupStackGlobal();
		watchLevelTravelForm();


		function skinLevelTravelTheme(){
			if(!document.body || !document.body.classList.contains('page-travel')) return;
			var dark = document.documentElement.getAttribute('data-theme') === 'dark';
			var primary = amolabColor('primary');
			var accent = amolabColor('accent');
			var accentDark = amolabColor('accentDark');
			var icons = amolabColor('icons');
			var stages = document.querySelectorAll('.embed-stage--leveltravel');
			for(var i = 0; i < stages.length; i++){
				var stage = stages[i];
				stage.style.setProperty('--lt-form-bg', dark ? '#1e293b' : primary);
				stage.style.setProperty('--lt-form-btn', accent);
				stage.style.setProperty('--lt-form-btn-dark', accentDark);
				stage.style.setProperty('--lt-icon', icons);
				stage.style.setProperty('--lt-field-bg', dark ? '#0f172a' : '#ffffff');
				stage.style.setProperty('--lt-field-text', dark ? '#e2e8f0' : '#0f172a');
				stage.style.setProperty('--lt-field-muted', dark ? '#94a3b8' : '#64748b');
				stage.style.setProperty('--lt-field-border', dark ? '#334155' : 'rgba(255,255,255,.35)');
				stage.setAttribute('data-lt-theme', dark ? 'dark' : 'light');

				var wide = window.innerWidth >= 768;
				var bodies = stage.querySelectorAll('.search-form-body');
				for(var b = 0; b < bodies.length; b++){
					bodies[b].style.setProperty('background', dark ? '#1e293b' : primary, 'important');
					bodies[b].style.setProperty('background-color', dark ? '#1e293b' : primary, 'important');
					bodies[b].style.setProperty('border-radius', '12px', 'important');
					bodies[b].style.setProperty('position', 'relative', 'important');
					bodies[b].style.setProperty('display', wide ? 'grid' : 'flex', 'important');
					if(wide){
						bodies[b].style.setProperty('grid-template-columns', 'repeat(3, minmax(0, 1fr))', 'important');
						bodies[b].style.setProperty('grid-template-areas', '"dest date nights" "tourists departure submit"', 'important');
						bodies[b].style.removeProperty('flex-direction');
					}else{
						bodies[b].style.setProperty('flex-direction', 'column', 'important');
						bodies[b].style.removeProperty('grid-template-columns');
						bodies[b].style.removeProperty('grid-template-areas');
					}
					bodies[b].style.setProperty('align-items', 'stretch', 'important');
					bodies[b].style.setProperty('justify-content', 'flex-start', 'important');
					bodies[b].style.setProperty('gap', '.5rem', 'important');
					bodies[b].style.setProperty('width', '100%', 'important');
					bodies[b].style.setProperty('max-width', '100%', 'important');
					bodies[b].style.setProperty('height', 'auto', 'important');
					bodies[b].style.setProperty('margin', '0', 'important');
					bodies[b].style.setProperty('text-align', 'left', 'important');
					bodies[b].style.setProperty('overflow', 'visible', 'important');
				}
				var contents = stage.querySelectorAll('.search-form-content');
				for(var c = 0; c < contents.length; c++){
					contents[c].style.setProperty('display', wide ? 'contents' : 'flex', 'important');
					contents[c].style.setProperty('flex-direction', 'column', 'important');
					contents[c].style.setProperty('width', '100%', 'important');
					contents[c].style.setProperty('max-width', '100%', 'important');
					contents[c].style.setProperty('margin', '0', 'important');
					contents[c].style.setProperty('padding', '0', 'important');
					contents[c].style.setProperty('gap', '.5rem', 'important');
				}
				var wraps = stage.querySelectorAll('.search-form-wrapper, [id^="leveltravel_widget_wrapper"], [id^="powered_by_1150"]');
				for(var w = 0; w < wraps.length; w++){
					wraps[w].style.setProperty('position', 'relative', 'important');
					wraps[w].style.setProperty('height', 'auto', 'important');
					wraps[w].style.setProperty('width', '100%', 'important');
					wraps[w].style.setProperty('max-width', '100%', 'important');
					wraps[w].style.setProperty('margin', '0', 'important');
					wraps[w].style.setProperty('overflow', 'visible', 'important');
					wraps[w].style.setProperty('text-align', 'left', 'important');
				}
				var areaMap = [
					['.search-form-destination, .main-field', 'dest'],
					['.search-form-date', 'date'],
					['.search-form-nights', 'nights'],
					['.search-form-tourists', 'tourists'],
					['.search-form-departure', 'departure'],
					['.search-form-submit', 'submit']
				];
				for(var a = 0; a < areaMap.length; a++){
					var nodes = stage.querySelectorAll(areaMap[a][0]);
					for(var n = 0; n < nodes.length; n++){
						if(wide) nodes[n].style.setProperty('grid-area', areaMap[a][1], 'important');
						else nodes[n].style.removeProperty('grid-area');
					}
				}
				var btnsWrap = stage.querySelectorAll('.search-form-submit');
				for(var s = 0; s < btnsWrap.length; s++){
					btnsWrap[s].style.setProperty('position', 'relative', 'important');
					btnsWrap[s].style.setProperty('top', 'auto', 'important');
					btnsWrap[s].style.setProperty('left', 'auto', 'important');
					btnsWrap[s].style.setProperty('right', 'auto', 'important');
					btnsWrap[s].style.setProperty('bottom', 'auto', 'important');
					btnsWrap[s].style.setProperty('float', 'none', 'important');
					btnsWrap[s].style.setProperty('transform', 'none', 'important');
					btnsWrap[s].style.setProperty('margin', '0', 'important');
					btnsWrap[s].style.setProperty('width', '100%', 'important');
					btnsWrap[s].style.setProperty('max-width', 'none', 'important');
					btnsWrap[s].style.setProperty('flex', 'none', 'important');
				}
				var btns = stage.querySelectorAll('.search-form-submit button');
				for(var t = 0; t < btns.length; t++){
					btns[t].style.setProperty('background', 'linear-gradient(90deg,' + accent + ',' + accentDark + ')', 'important');
					btns[t].style.setProperty('background-color', accent, 'important');
					btns[t].style.setProperty('color', '#fff', 'important');
					btns[t].style.setProperty('border', 'none', 'important');
					btns[t].style.setProperty('border-radius', '10px', 'important');
					btns[t].style.setProperty('position', 'relative', 'important');
					btns[t].style.setProperty('top', 'auto', 'important');
					btns[t].style.setProperty('left', 'auto', 'important');
					btns[t].style.setProperty('right', 'auto', 'important');
					btns[t].style.setProperty('bottom', 'auto', 'important');
					btns[t].style.setProperty('float', 'none', 'important');
					btns[t].style.setProperty('transform', 'none', 'important');
					btns[t].style.setProperty('width', '100%', 'important');
					btns[t].style.setProperty('height', '100%', 'important');
					btns[t].style.setProperty('min-height', '3.15rem', 'important');
					btns[t].style.setProperty('margin', '0', 'important');
				}
				var fields = stage.querySelectorAll('.search-form-field, .main-field, .search-form-destination, .search-form-date, .search-form-nights, .search-form-tourists, .search-form-departure');
				for(var f = 0; f < fields.length; f++){
					fields[f].style.setProperty('background', dark ? '#0f172a' : '#fff', 'important');
					fields[f].style.setProperty('background-color', dark ? '#0f172a' : '#fff', 'important');
					fields[f].style.setProperty('border-radius', '10px', 'important');
					fields[f].style.setProperty('color', dark ? '#e2e8f0' : '#0f172a', 'important');
					fields[f].style.setProperty('position', 'relative', 'important');
					fields[f].style.setProperty('top', 'auto', 'important');
					fields[f].style.setProperty('left', 'auto', 'important');
					fields[f].style.setProperty('right', 'auto', 'important');
					fields[f].style.setProperty('bottom', 'auto', 'important');
					fields[f].style.setProperty('float', 'none', 'important');
					fields[f].style.setProperty('transform', 'none', 'important');
					fields[f].style.setProperty('margin', '0', 'important');
					fields[f].style.setProperty('flex', 'none', 'important');
					fields[f].style.setProperty('width', '100%', 'important');
					fields[f].style.setProperty('min-width', '0', 'important');
					fields[f].style.setProperty('max-width', 'none', 'important');
					fields[f].style.setProperty('height', '3.15rem', 'important');
				}
			}
		}

		function watchLevelTravelForm(){
			if(!document.body || !document.body.classList.contains('page-travel')) return;
			if(document.body._amolabLtWatch) return;
			document.body._amolabLtWatch = true;
			var tick = function(){
				skinLevelTravelTheme();
				syncCascoonDialogOpen(null);
			};
			document.querySelectorAll('.embed-stage--leveltravel').forEach(function(stage){
				if(stage._amolabLtObs) return;
				stage._amolabLtObs = new MutationObserver(function(){
					clearTimeout(stage._amolabLtTimer);
					stage._amolabLtTimer = setTimeout(tick, 40);
				});
				stage._amolabLtObs.observe(stage, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style', 'open'] });
			});
			watchPopupStackGlobal();
			setTimeout(tick, 200);
			setTimeout(tick, 800);
			setTimeout(tick, 2000);
		}

		function onPageThemeChange(){
			skinAllForms();
			skinLevelTravelTheme();
			if(!document.body.classList.contains('page-tutu')) return;
			setTimeout(skinTutuOnThemeChange, 0);
			setTimeout(skinTutuOnThemeChange, 120);
			setTimeout(skinTutuOnThemeChange, 400);
			setTimeout(skinTutuOnThemeChange, 900);
		}

		var themeObs = new MutationObserver(onPageThemeChange);
		themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
		$('#themeToggle').on('click', function(){
			setTimeout(onPageThemeChange, 0);
		});

		watchLevelTravelForm();
		document.querySelectorAll('.embed-stage').forEach(function(stage){
			if(!stage.classList.contains('embed-stage--leveltravel')) return;
			var readyObs = new MutationObserver(function(){
				if(stage.classList.contains('is-ready')) skinLevelTravelTheme();
			});
			readyObs.observe(stage, { attributes: true, attributeFilter: ['class'] });
		});

		/* Popular tours (promo 4097): dark theme inside tp-cascoon shadow */
		(function(){
			var section = document.getElementById('popular-tours');
			if(!section) return;

			function isDark(){
				return document.documentElement.getAttribute('data-theme') === 'dark';
			}

			function darkCss(){
				return [
					':host{',
					'display:block!important;',
					'background:transparent!important;',
					'color:#f1f5f9!important;',
					'border:none!important;',
					'border-radius:12px!important;',
					'box-shadow:none!important;',
					'}',
					'.cascoon,',
					'.like-wrapper,',
					'.cascoon .like-wrapper{',
					'background:transparent!important;',
					'background-color:transparent!important;',
					'color:#f1f5f9!important;',
					'border:none!important;',
					'box-shadow:none!important;',
					'outline:none!important;',
					'}',
					'.cascoon{',
					'--dark-color:#f1f5f9!important;',
					'--dark-bg-text-color:#f1f5f9!important;',
					'--light-color:#111827!important;',
					'--secondary-color:#111827!important;',
					'--special-color:#111827!important;',
					'--primary-color:#fbbf24!important;',
					'}',
					/* заголовок виджета и названия отелей */
					'.cascoon div,',
					'.cascoon span,',
					'.cascoon p,',
					'.cascoon h1,',
					'.cascoon h2,',
					'.cascoon h3,',
					'.cascoon h4,',
					'.cascoon [class*="Title"],',
					'.cascoon [class*="title"],',
					'.cascoon [class*="name"],',
					'.cascoon [class*="Name"]{',
					'color:#f1f5f9!important;',
					'}',
					'.cascoon svg path[fill="#7D7D7D"],',
					'.cascoon svg path[fill="#7d7d7d"]{',
					'fill:#94a3b8!important;',
					'}',
					'a.cascoon-form-submit,',
					'a.form-submit,',
					'.cascoon a.cascoon-form-submit,',
					'.cascoon a.form-submit{',
					'background:linear-gradient(180deg,#FFE601 0%,#FED000 100%)!important;',
					'background-color:#FFE601!important;',
					'color:#262626!important;',
					'}',
					'.cascoon a.cascoon-form-submit *,',
					'.cascoon a.form-submit *{',
					'color:#262626!important;',
					'}',
					/* разделители между отелями */
					'.cascoon [class*="Card"],',
					'.cascoon [class*="card"],',
					'.cascoon [class*="cascoon-component"]{',
					'border-bottom-color:#1e293b!important;',
					'}',
					'.cascoon hr{',
					'border:none!important;',
					'border-top:1px solid #1e293b!important;',
					'background:transparent!important;',
					'}',
					/* лого */
					'.cascoon img[src*="leveltravel"],',
					'.cascoon img[src*="level.travel"],',
					'.cascoon a[href="https://level.travel"],',
					'.cascoon a[href="https://level.travel/"]{',
					'display:none!important;',
					'}'
				].join('');
			}

			function lightCss(){
				return [
					':host{display:block!important;border-radius:12px!important;}',
					'.cascoon img[src*="leveltravel"],',
					'.cascoon img[src*="level.travel"],',
					'.cascoon a[href="https://level.travel"],',
					'.cascoon a[href="https://level.travel/"]{',
					'display:none!important;',
					'}'
				].join('');
			}

			function hideLogo(root){
				if(!root || !root.querySelectorAll) return;
				var logos = root.querySelectorAll('img[src*="leveltravel"], img[src*="level.travel"], a[href="https://level.travel"], a[href="https://level.travel/"]');
				for(var i = 0; i < logos.length; i++){
					logos[i].style.setProperty('display', 'none', 'important');
				}
			}

			function fixTextColors(root){
				if(!root || !isDark()) return;
				var nodes = root.querySelectorAll('div, span, p, h1, h2, h3, h4');
				for(var i = 0; i < nodes.length; i++){
					var el = nodes[i];
					if(el.tagName === 'IMG') continue;
					if(el.querySelector && el.querySelector('img')) continue;
					if(el.closest && el.closest('a.cascoon-form-submit, a.form-submit')) continue;
					if(el.classList && (el.classList.contains('cascoon-form-submit') || el.classList.contains('form-submit'))) continue;
					var raw = el.getAttribute('style') || '';
					if(/#7[Dd]7[Dd]7[Dd]/i.test(raw)){
						el.style.setProperty('color', '#94a3b8', 'important');
						continue;
					}
					try{
						var cs = window.getComputedStyle(el);
						var m = (cs.color || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
						if(!m) continue;
						var r = +m[1], g = +m[2], b = +m[3];
						var lum = 0.299 * r + 0.587 * g + 0.114 * b;
						/* тёмные заголовки/названия отелей → светлые */
						if(lum < 160){
							el.style.setProperty('color', '#f1f5f9', 'important');
						}
					}catch(e){}
				}
			}

			function fixRowBorders(root){
				if(!root || !isDark()) return;
				var nodes = root.querySelectorAll('div, li, hr, section, article');
				for(var i = 0; i < nodes.length; i++){
					var el = nodes[i];
					if(el.tagName === 'IMG' || (el.querySelector && el.querySelector(':scope > img'))) continue;
					try{
						var cs = window.getComputedStyle(el);
						var bw = parseFloat(cs.borderBottomWidth) || 0;
						if(bw < 0.5) continue;
						var bc = cs.borderBottomColor || '';
						var m = bc.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
						if(!m) continue;
						var lum = 0.299 * (+m[1]) + 0.587 * (+m[2]) + 0.114 * (+m[3]);
						if(lum > 140){
							el.style.setProperty('border-bottom-color', '#1e293b', 'important');
						}
					}catch(e){}
				}
			}

			function styleBottomCta(root){
				if(!root || !isDark()) return;
				var links = root.querySelectorAll('a');
				for(var i = 0; i < links.length; i++){
					var a = links[i];
					if(a.classList.contains('cascoon-form-submit') || a.classList.contains('form-submit')) continue;
					if(a.querySelector('img')) continue;
					var t = (a.textContent || '').replace(/\s+/g, ' ').trim();
					if(t.indexOf('Выбрать тур') === -1) continue;
					a.style.setProperty('background', '#1e293b', 'important');
					a.style.setProperty('background-color', '#1e293b', 'important');
					a.style.setProperty('color', '#e2e8f0', 'important');
					a.style.setProperty('border', '1px solid #334155', 'important');
					a.style.setProperty('border-radius', '10px', 'important');
					var spans = a.querySelectorAll('span');
					for(var s = 0; s < spans.length; s++){
						spans[s].style.setProperty('color', '#e2e8f0', 'important');
					}
				}
			}

			function clearInlineSkins(root){
				if(!root || !root.querySelectorAll) return;
				var nodes = root.querySelectorAll('[data-amolab-popular-skin]');
				for(var i = 0; i < nodes.length; i++){
					var el = nodes[i];
					el.style.removeProperty('background');
					el.style.removeProperty('background-color');
					el.style.removeProperty('border');
					el.style.removeProperty('border-top');
					el.style.removeProperty('border-bottom');
					el.style.removeProperty('border-color');
					el.style.removeProperty('box-shadow');
					el.style.removeProperty('margin');
					el.style.removeProperty('padding');
					el.style.removeProperty('color');
					delete el.dataset.amolabPopularSkin;
				}
			}

			function skin(host){
				if(!host) return;
				var root = host.shadowRoot;
				if(!root) return;
				var style = root.getElementById('amolab-popular-tours-skin');
				if(!style){
					style = document.createElement('style');
					style.id = 'amolab-popular-tours-skin';
					root.appendChild(style);
				}
				var css = isDark() ? darkCss() : lightCss();
				if(style.textContent !== css) style.textContent = css;
				hideLogo(root);
				if(isDark()){
					fixTextColors(root);
					fixRowBorders(root);
					styleBottomCta(root);
				} else {
					clearInlineSkins(root);
				}
				if(!root.__amolabPopularObs){
					root.__amolabPopularObs = new MutationObserver(function(){
						hideLogo(root);
						if(isDark()){
							fixTextColors(root);
							fixRowBorders(root);
							styleBottomCta(root);
						}
					});
					root.__amolabPopularObs.observe(root, { childList: true, subtree: true });
				}
			}

			function skinAll(){
				section.querySelectorAll('tp-cascoon').forEach(skin);
			}

			var obs = new MutationObserver(function(){ skinAll(); });
			obs.observe(section, { childList: true, subtree: true });

			var themeObs = new MutationObserver(function(){ skinAll(); });
			themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

			var tries = 0;
			var poll = setInterval(function(){
				skinAll();
				tries++;
				if(tries > 80) clearInterval(poll);
				var host = section.querySelector('tp-cascoon');
				if(host && host.shadowRoot && (host.shadowRoot.textContent || '').length > 40) clearInterval(poll);
			}, 200);

			skinAll();
		})();

		/* Карта: заглушка внутри блока, грузим виджет при появлении в экране */
		(function(){
			var frame = document.querySelector('.hotels-map-frame[data-map-src]');
			if(!frame) return;
			var stub = frame.querySelector('.widget-stub');

			function markReady(){
				if(frame.classList.contains('is-ready')) return;
				frame.classList.add('is-ready');
				if(stub){
					stub.classList.add('is-hidden');
					stub.setAttribute('hidden', '');
				}
			}

			function nudge(){
				try { window.dispatchEvent(new Event('resize')); } catch(e) {}
			}

			function bindIframeNudge(){
				var iframe = frame.querySelector('iframe');
				if(!iframe || iframe.dataset.nudgeBound === '1') return;
				iframe.dataset.nudgeBound = '1';
				iframe.addEventListener('load', function(){
					markReady();
					nudge();
					setTimeout(nudge, 250);
					setTimeout(nudge, 900);
				});
			}

			function loadMap(){
				if(frame.dataset.mapLoaded === '1') return;
				frame.dataset.mapLoaded = '1';
				var src = frame.getAttribute('data-map-src');
				if(!src) return;
				var script = document.createElement('script');
				script.async = true;
				script.charset = 'utf-8';
				script.src = src;
				frame.appendChild(script);

				var mo = new MutationObserver(function(){
					bindIframeNudge();
					if(frame.querySelector('iframe')){
						markReady();
						nudge();
						setTimeout(nudge, 300);
						setTimeout(nudge, 1000);
						mo.disconnect();
					}
				});
				mo.observe(frame, { childList: true, subtree: true });
				setTimeout(markReady, 8000);
			}

			if('IntersectionObserver' in window){
				var io = new IntersectionObserver(function(entries){
					entries.forEach(function(entry){
						if(!entry.isIntersecting) return;
						loadMap();
						nudge();
						setTimeout(nudge, 400);
						io.disconnect();
					});
				}, { rootMargin: '180px 0px', threshold: 0.01 });
				io.observe(frame);
			} else {
				loadMap();
			}
		})();
	})();
}

if($('body').hasClass('avia-wl')){

	var wlSearchIntent = false;

	(function () {
		var skinReady = false;
		var applying = false;
		var hostObserver = null;

		function isDark(){
			return document.documentElement.getAttribute('data-theme') === 'dark';
		}

		function hostVars(dark){
			var primary = amolabColor('primary');
			var primaryDark = amolabColor('primaryDark');
			var primaryDarker = amolabColor('primaryDarker');
			var icons = amolabColor('icons');
			if(dark){
			return {
				'--main-accent': icons,
				'--main-accent-opacified': 'rgba(56,189,248,0.14)',
				'--main-accent-darken': primary,
				'--main-accent-contrast-color': '#0b1220',
				'--main-accent-contrast-opacified': 'rgba(11,18,32,0.3)',
				'--font-color': '#e2e8f0',
				'--text-color': '#e2e8f0',
				'--search-form-icon-color': icons,
				'--search-form-link-color': '#94a3b8',
				'--link-color': icons,
				'--link-color-darken': primary,
				'--border-radius': '16px',
				'--border-color': '#334155',
				'--ticket-cards-background': '#0f172a',
				'--font-main': "Inter, sans-serif"
			};
			}
			return {
				'--main-accent': icons,
				'--main-accent-opacified': 'rgba(14,165,233,0.12)',
				'--main-accent-darken': primaryDark,
				'--main-accent-contrast-color': '#ffffff',
				'--main-accent-contrast-opacified': 'rgba(255,255,255,0.3)',
				'--font-color': '#0f172a',
				'--text-color': '#0f172a',
				'--search-form-icon-color': icons,
				'--search-form-link-color': '#64748b',
				'--link-color': primaryDark,
				'--link-color-darken': primaryDarker,
				'--border-radius': '16px',
				'--border-color': '#e2e8f0',
				'--ticket-cards-background': '#ffffff',
				'--font-main': "Inter, sans-serif"
			};
		}

		function setHostVars(el){
			if(!el || !el.style) return;
			var vars = hostVars(isDark());
			applying = true;
			Object.keys(vars).forEach(function(key){
				el.style.setProperty(key, vars[key]);
			});
			applying = false;
		}

		function shadowSkinCss(dark){
			var primary = amolabColor('primary');
			var accent = amolabColor('accent');
			var icons = amolabColor('icons');
			var fieldBg = dark ? '#0f172a' : '#fff';
			var fieldBorder = dark ? '#334155' : '#e2e8f0';
			var fieldBorderFocus = dark ? icons : primary;
			var formBg = dark ? '#1e293b' : primary;
			var formBorder = dark ? '#334155' : primary;
			var btnBg = amolabAccentGrad();
			var shellRadius = '12px';
			var fieldRadius = '8px';
			var formGap = '.5rem';
			return [
				'[class*="Button-module__primary"],',
				'[class*="DefaultSearch-module__submitBtn"],',
				'button[type="submit"]{',
				'border-radius:' + shellRadius + '!important;',
				'font-weight:300!important;',
				'letter-spacing:.01em;',
				'background:' + btnBg + '!important;',
				'background-color:' + accent + '!important;',
				'border-color:' + accent + '!important;',
				'color:#fff!important;',
				'box-shadow:none!important;',
				'transition:transform .15s ease,filter .15s ease;',
				'}',
				/* hide “Составить сложный маршрут” */
				'[class*="SearchEdit-module__multiRouteBtn"],',
				'[class*="multiRouteBtn"]{',
				'display:none!important;',
				'}',
				'[class*="Button-module__primary"]:hover,',
				'[class*="DefaultSearch-module__submitBtn"]:hover,',
				'button[type="submit"]:hover{',
				'transform:translateY(-1px);',
				'filter:brightness(1.05);',
				'background:' + btnBg + '!important;',
				'box-shadow:none!important;',
				'}',
				/* hide validation “beard”, keep red outline */
				'[class*="Input-module__errorLabel"],',
				'[class*="errorLabel"]{',
				'display:none!important;',
				'}',
				'[class*="Input-module__isError"],',
				'[class*="isError"]{',
				'border-color:#f35050!important;',
				'box-shadow:0 0 0 1px #f35050!important;',
				'}',
				/* group wrappers — no outer border */
				'[class*="mergedInputs"],',
				'[class*="DefaultSearch-module__places"],',
				'[class*="DefaultSearch-module__dates"]{',
				'border:none!important;',
				'box-shadow:none!important;',
				'background:transparent!important;',
				'}',
				/* compact fields */
				'[class*="Input-module__root"],',
				'[class*="SearchInput-module__root"],',
				'[class*="DateRangePicker-module__mergedInputs"] > *,',
				'[class*="DateRangePicker-module__input"]{',
				'border:1px solid ' + fieldBorder + '!important;',
				'border-radius:' + fieldRadius + '!important;',
				'background:' + fieldBg + '!important;',
				'background-color:' + fieldBg + '!important;',
				'box-sizing:border-box!important;',
				'min-height:3rem!important;',
				'padding:.625rem 1rem!important;',
				'}',
				'[class*="Input-module__root"] input,',
				'[class*="SearchInput-module__root"] input,',
				'[class*="DateRangePicker"] input{',
				'background:transparent!important;',
				'background-color:transparent!important;',
				'padding:0!important;',
				'font-size:.875rem!important;',
				'line-height:1.25!important;',
				'min-height:0!important;',
				'}',
				'[class*="Input-module__root"] button,',
				'[class*="SearchInput-module__root"] button,',
				'[class*="DateRangePicker"] button{',
				'background:transparent!important;',
				'background-color:transparent!important;',
				'}',
				'[class*="DefaultSearch-module__passengersPicker"],',
				'[class*="passengersPicker"]{',
				'display:flex!important;',
				'align-items:center!important;',
				'min-height:3rem!important;',
				'max-height:3rem!important;',
				'height:3rem!important;',
				'padding:.625rem 1rem!important;',
				'box-sizing:border-box!important;',
				'overflow:hidden!important;',
				'border:1px solid ' + fieldBorder + '!important;',
				'border-radius:' + fieldRadius + '!important;',
				'background:' + fieldBg + '!important;',
				'background-color:' + fieldBg + '!important;',
				'}',
				'[class*="passengersPicker"] > *,',
				'[class*="DefaultSearch-module__passengersPicker"] > *,',
				'[class*="passengersPicker"] [class*="Input-module__root"],',
				'[class*="passengersPicker"] [class*="Input-module__button"],',
				'[class*="passengersPicker"] button{',
				'display:flex!important;',
				'align-items:center!important;',
				'justify-content:flex-start!important;',
				'width:100%!important;',
				'height:auto!important;',
				'min-height:0!important;',
				'max-height:100%!important;',
				'padding:0!important;',
				'margin:0!important;',
				'border:none!important;',
				'box-shadow:none!important;',
				'background:transparent!important;',
				'}',
				'[class*="passengersPicker"] [class*="Input-module__button"] > *,',
				'[class*="passengersPicker"] button > *{',
				'display:inline-flex!important;',
				'align-items:center!important;',
				'line-height:1.25!important;',
				'transform:none!important;',
				'position:static!important;',
				'top:auto!important;',
				'bottom:auto!important;',
				'}',
				'[class*="Input-module__root"]:focus-within,',
				'[class*="SearchInput-module__root"]:focus-within,',
				'[class*="passengersPicker"]:focus-within{',
				'border-color:' + fieldBorderFocus + '!important;',
				'box-shadow:0 0 0 2px ' + (dark ? 'rgba(56,189,248,.18)' : 'rgba(14,165,233,.15)') + '!important;',
				'}',
				/* layout like Aviasales: row1 places, row2 dates|passengers|button */
				'[class*="DefaultSearch-module__root"]{',
				'display:grid!important;',
				'grid-template-columns:repeat(4,minmax(0,1fr))!important;',
				'grid-auto-rows:minmax(3rem,auto)!important;',
				'gap:' + formGap + '!important;',
				'align-items:stretch!important;',
				'flex-direction:unset!important;',
				'width:100%!important;',
				'box-sizing:border-box!important;',
				'padding:1rem!important;',
				'border-radius:' + shellRadius + '!important;',
				'background:' + formBg + '!important;',
				'background-color:' + formBg + '!important;',
				'border:1px solid ' + formBorder + '!important;',
				'}',
				'[class*="DefaultSearch-module__root"] > *{',
				'width:auto!important;',
				'max-width:none!important;',
				'min-width:0!important;',
				'}',
				/* 1) places full width */
				'[class*="DefaultSearch-module__root"] > [class*="flex2"]:nth-child(1),',
				'[class*="DefaultSearch-module__root"] > *:nth-child(1){',
				'grid-column:1/-1!important;',
				'}',
				/* 2) dates = half row (two fields inside) */
				'[class*="DefaultSearch-module__root"] > [class*="flex2"]:nth-child(2),',
				'[class*="DefaultSearch-module__root"] > *:nth-child(2){',
				'grid-column:1/3!important;',
				'}',
				/* 3) passengers */
				'[class*="DefaultSearch-module__root"] > [class*="flex1"],',
				'[class*="DefaultSearch-module__root"] > [class*="passengersPicker"],',
				'[class*="DefaultSearch-module__root"] > *:nth-child(3){',
				'grid-column:3/4!important;',
				'}',
				/* 4) search button */
				'[class*="DefaultSearch-module__root"] > [class*="submitBtn"],',
				'[class*="DefaultSearch-module__root"] > button[type="submit"],',
				'[class*="DefaultSearch-module__root"] > *:nth-child(4){',
				'grid-column:4/5!important;',
				'}',
				'[class*="DefaultSearch-module__submitBtn"],',
				'[class*="DefaultSearch-module__root"] > button[type="submit"]{',
				'width:100%!important;',
				'max-width:none!important;',
				'height:100%!important;',
				'min-height:3rem!important;',
				'align-self:stretch!important;',
				'padding-top:.45rem!important;',
				'padding-bottom:.45rem!important;',
				'font-size:.9rem!important;',
				'}',
				/* keep origin/destination and dates as separate fields with gap, no join stripe */
				'[class*="mergedInputs"],',
				'[class*="DefaultSearch-module__mergedInputs"],',
				'[class*="DateRangePicker-module__mergedInputs"]{',
				'display:flex!important;',
				'flex-direction:row!important;',
				'gap:0!important;',
				'column-gap:0!important;',
				'row-gap:0!important;',
				'width:100%!important;',
				'height:auto!important;',
				'min-height:3rem!important;',
				'border:0!important;',
				'border-width:0!important;',
				'outline:none!important;',
				'box-shadow:none!important;',
				'background:transparent!important;',
				'background-color:transparent!important;',
				'background-image:none!important;',
				'padding:0!important;',
				'overflow:visible!important;',
				'}',
				'[class*="mergedInputs"] > *,',
				'[class*="DefaultSearch-module__mergedInputLeft"],',
				'[class*="DefaultSearch-module__mergedInputRight"],',
				'[class*="DateRangePicker-module__mergedInputLeft"],',
				'[class*="DateRangePicker-module__mergedInputRight"],',
				'[class*="DateRangePicker-module__mergedInputs"] > *,',
				'[class*="DateRangePicker-module__input"]{',
				'flex:1 1 0!important;',
				'min-width:0!important;',
				'width:auto!important;',
				'margin:0!important;',
				'border:1px solid ' + fieldBorder + '!important;',
				'border-radius:' + fieldRadius + '!important;',
				'border-top-left-radius:' + fieldRadius + '!important;',
				'border-top-right-radius:' + fieldRadius + '!important;',
				'border-bottom-left-radius:' + fieldRadius + '!important;',
				'border-bottom-right-radius:' + fieldRadius + '!important;',
				'background:' + fieldBg + '!important;',
				'background-color:' + fieldBg + '!important;',
				'box-shadow:none!important;',
				'}',
				/* readable field text — avoid "M…" truncation from cramped padding */
				'[class*="Input-module__root"] input,',
				'[class*="SearchInput-module__root"] input,',
				'[class*="DateRangePicker"] input,',
				'[class*="Input-module__button"],',
				'[class*="Input-module__button"] > *{',
				'font-size:.8125rem!important;',
				'letter-spacing:0!important;',
				'text-overflow:ellipsis!important;',
				'overflow:hidden!important;',
				'white-space:nowrap!important;',
				'max-width:100%!important;',
				'}',
				'[class*="Input-module__root"],',
				'[class*="SearchInput-module__root"]{',
				'padding-left:1rem!important;',
				'padding-right:1rem!important;',
				'}',
				/* space between paired fields — desktop/tablet row only */
				'@media (min-width:768px){',
				'[class*="mergedInputs"] > *:nth-child(2),',
				'[class*="mergedInputRight"],',
				'[class*="DateRangePicker-module__mergedInputRight"]{',
				'margin-left:.5rem!important;',
				'}',
				'}',
				'[class*="mergedInputs"] [class*="Input-module__root"],',
				'[class*="mergedInputs"] [class*="SearchInput-module__root"],',
				'[class*="mergedInputs"] [class*="Input-module__button"]{',
				'border-radius:' + fieldRadius + '!important;',
				'border-top-left-radius:' + fieldRadius + '!important;',
				'border-top-right-radius:' + fieldRadius + '!important;',
				'border-bottom-left-radius:' + fieldRadius + '!important;',
				'border-bottom-right-radius:' + fieldRadius + '!important;',
				'}',
				/* kill any join stripe / pseudo divider */
				'[class*="mergedInputs"]:before,',
				'[class*="mergedInputs"]:after,',
				'[class*="mergedInputs"] > *:before,',
				'[class*="mergedInputs"] > *:after,',
				'[class*="mergedInputLeft"]:before,',
				'[class*="mergedInputLeft"]:after,',
				'[class*="mergedInputRight"]:before,',
				'[class*="mergedInputRight"]:after{',
				'content:none!important;',
				'display:none!important;',
				'width:0!important;',
				'height:0!important;',
				'border:none!important;',
				'background:none!important;',
				'box-shadow:none!important;',
				'opacity:0!important;',
				'}',
				/* hide direction swap / reverse */
				'[class*="DefaultSearch-module__swapButton"],',
				'[data-testid="default-search-swap-button"]{',
				'display:none!important;',
				'}',
				/* phone/tablet: one column — override desktop nth-child grid lines */
				'@media (max-width:767.98px){',
				'[class*="DefaultSearch-module__root"]{',
				'display:flex!important;',
				'flex-direction:column!important;',
				'grid-template-columns:none!important;',
				'gap:' + formGap + '!important;',
				'align-items:stretch!important;',
				'padding:1rem!important;',
				'background:' + formBg + '!important;',
				'background-color:' + formBg + '!important;',
				'border:1px solid ' + formBorder + '!important;',
				'border-radius:' + shellRadius + '!important;',
				'}',
				'[class*="DefaultSearch-module__root"] > *,',
				'[class*="DefaultSearch-module__root"] > *:nth-child(1),',
				'[class*="DefaultSearch-module__root"] > *:nth-child(2),',
				'[class*="DefaultSearch-module__root"] > *:nth-child(3),',
				'[class*="DefaultSearch-module__root"] > *:nth-child(4),',
				'[class*="DefaultSearch-module__root"] > [class*="flex2"],',
				'[class*="DefaultSearch-module__root"] > [class*="flex1"],',
				'[class*="DefaultSearch-module__root"] > [class*="passengersPicker"],',
				'[class*="DefaultSearch-module__root"] > [class*="submitBtn"],',
				'[class*="DefaultSearch-module__root"] > button[type="submit"]{',
				'grid-column:auto!important;',
				'grid-row:auto!important;',
				'width:100%!important;',
				'max-width:100%!important;',
				'min-width:0!important;',
				'flex:0 0 auto!important;',
				'}',
				'[class*="DefaultSearch-module__flex2"],',
				'[class*="DefaultSearch-module__flex1"],',
				'[class*="DefaultSearch-module__submitBtn"],',
				'[class*="DefaultSearch-module__root"] > button[type="submit"]{',
				'width:100%!important;',
				'min-height:3rem!important;',
				'position:relative!important;',
				'}',
				'[class*="DefaultSearch-module__passengersPicker"],',
				'[class*="passengersPicker"]{',
				'width:100%!important;',
				'min-height:3rem!important;',
				'max-height:3rem!important;',
				'height:3rem!important;',
				'position:relative!important;',
				'}',
				/* stack ALL paired fields: origin/destination + dates */
				'[class*="DefaultSearch-module__mergedInputs"],',
				'[class*="mergedInputs"],',
				'[class*="DateRangePicker-module__mergedInputs"]{',
				'display:flex!important;',
				'flex-direction:column!important;',
				'align-items:stretch!important;',
				'row-gap:.5rem!important;',
				'column-gap:0!important;',
				'height:auto!important;',
				'width:100%!important;',
				'position:relative!important;',
				'}',
				'[class*="mergedInputs"] > *,',
				'[class*="DefaultSearch-module__mergedInputLeft"],',
				'[class*="DefaultSearch-module__mergedInputRight"],',
				'[class*="DateRangePicker-module__mergedInputLeft"],',
				'[class*="DateRangePicker-module__mergedInputRight"],',
				'[class*="DateRangePicker-module__mergedInputs"] > *{',
				'flex:0 0 auto!important;',
				'align-self:stretch!important;',
				'width:100%!important;',
				'max-width:100%!important;',
				'min-width:0!important;',
				'margin:0!important;',
				'margin-left:0!important;',
				'margin-right:0!important;',
				'left:auto!important;',
				'right:auto!important;',
				'position:relative!important;',
				'transform:none!important;',
				'box-sizing:border-box!important;',
				'}',
				/* "Обратно" — force full-width like "Туда" */
				'[class*="DateRangePicker-module__mergedInputRight"],',
				'[class*="DateRangePicker-module__mergedInputs"] > *:nth-child(2){',
				'width:100%!important;',
				'max-width:100%!important;',
				'min-width:100%!important;',
				'flex:0 0 auto!important;',
				'align-self:stretch!important;',
				'margin-left:0!important;',
				'}',
				'[class*="DefaultSearch-module__swapButton"],',
				'[data-testid="default-search-swap-button"]{',
				'display:none!important;',
				'}',
				'[class*="Input-module__root"] input,',
				'[class*="SearchInput-module__root"] input,',
				'[class*="DateRangePicker"] input,',
				'[class*="Input-module__button"],',
				'[class*="Input-module__button"] > *,',
				'[class*="passengersPicker"] [class*="Input-module__button"] > *{',
				'font-size:.875rem!important;',
				'max-width:100%!important;',
				'}',
				'}',
				dark ? darkPopupCss() : ''
			].join('');
		}

		function darkPopupCss(){
			var bg = '#111827';
			var bgElev = '#0f172a';
			var bgMuted = '#1e293b';
			var border = '#334155';
			var text = '#e2e8f0';
			var muted = '#94a3b8';
			return [
				/* main floating shell — this is the white #fff wrapper */
				'[class*="Popover-module__root"],',
				'[class*="PlacePicker-module__popover"],',
				'[class*="LocalizationDropdown-module__popover"],',
				'[class*="LocalizationDropdown-module__popoverWrapper"],',
				'[class*="PassengersPicker-module__popover"],',
				'[class*="PassengersPickerContent-module__root"],',
				'[class*="PassengersPickerContent-module__mobileRoot"],',
				'[class*="DateRangePicker-module__popoverRoot"],',
				'[class*="DateRangePicker-module__popoverRootMobile"],',
				'[class*="DateRangePicker-module__popover"],',
				'[class*="DateRangePicker-module__contentMobile"],',
				'[class*="DateRangePicker-module__monthMobile"],',
				'[class*="DateRangePicker-module__headerMobile"],',
				'[class*="DatePicker-module__popover"],',
				'[class*="DateRangePicker-module__header"],',
				'[class*="CaptionLabel-module__captionMonths"],',
				'[class*="CaptionLabel-module__dropdown"]{',
				'background:' + bg + '!important;',
				'background-color:' + bg + '!important;',
				'color:' + text + '!important;',
				'border-color:' + border + '!important;',
				'box-shadow:0 16px 40px rgba(0,0,0,.45)!important;',
				'}',
				'[class*="PlacePicker-module__popoverSectionHeader"],',
				'[class*="LocalizationDropdown-module__popoverHeader"],',
				'[class*="PopoverAdditionalContent-module__button"],',
				'[class*="PopoverAdditionalContent-module__mobileResetButton"]{',
				'background:' + bgMuted + '!important;',
				'background-color:' + bgMuted + '!important;',
				'color:' + text + '!important;',
				'}',
				'[class*="PopoverAdditionalContent-module__title"],',
				'[class*="LocalizationDropdown-module__popoverTitle"]{',
				'color:' + text + '!important;',
				'}',
				'[class*="PlaceOption-module__root"],',
				'[class*="FlightHistoryOption-module__root"]{',
				'color:' + text + '!important;',
				'}',
				'[class*="PlaceOption-module__root"] b,',
				'[class*="PlaceOption-module__root"] strong{',
				'color:' + text + '!important;',
				'}',
				'[class*="PlaceOption-module__root"]:hover,',
				'[class*="FlightHistoryOption-module__root"]:hover{',
				'background:' + bgMuted + '!important;',
				'}',
				'[class*="PlaceOption-module__hint"],',
				'[class*="LocalizationList-module__hint"]{',
				'color:' + muted + '!important;',
				'}',
				/* passengers popup */
				'[class*="PassengersPicker-module__title"],',
				'[class*="PassengersPickerContent-module__title"],',
				'[class*="PassengersPickerContent-module__mobileTitle"],',
				'[class*="PassengersCounter-module__title"],',
				'[class*="TripClassRadio-module__label"]{',
				'color:' + text + '!important;',
				'}',
				'[class*="PassengersCounter-module__description"],',
				'[class*="PassengersCounter-module__text"]{',
				'color:' + muted + '!important;',
				'}',
				'[class*="PassengersPicker-module__counters"],',
				'[class*="PassengersPickerContent-module__mobileSection"],',
				'[class*="TripClassRadio-module__root"]{',
				'background:' + bgElev + '!important;',
				'background-color:' + bgElev + '!important;',
				'border-color:' + border + '!important;',
				'}',
				'[class*="PassengersCounter-module__value"],',
				'[class*="PassengersCounter-module__counter"]{',
				'color:' + text + '!important;',
				'}',
				'[class*="PassengersCounter-module__counterBtn"]{',
				'background:' + bgMuted + '!important;',
				'border-color:' + border + '!important;',
				'}',
				'[class*="TripClassRadio-module__variant"]{',
				'border-color:' + border + '!important;',
				'color:' + text + '!important;',
				'}',
				/* calendar */
				'[class*="DateRangePicker-module__popoverRoot"],',
				'[class*="DateRangePicker-module__popoverRootMobile"],',
				'[class*="DateRangePicker-module__popover"],',
				'[class*="DateRangePicker-module__header"],',
				'[class*="DateRangePicker-module__headerMobile"],',
				'[class*="DateRangePicker-module__contentMobile"],',
				'[class*="DateRangePicker-module__monthMobile"],',
				'[class*="DateRangePicker-module__mobileFixedFooter"],',
				'[class*="DateRangePicker-module__popoverMobileFixedFooter"],',
				'[class*="FlightsDateRangePicker-module__popoverMobileFixedFooter"]{',
				'background:' + bg + '!important;',
				'background-color:' + bg + '!important;',
				'color:' + text + '!important;',
				'border-color:' + border + '!important;',
				'}',
				'[data-testid="date-range-picker-popover-root"],',
				'[data-testid="date-range-picker-popover-root-mobile"]{',
				'background:' + bg + '!important;',
				'background-color:' + bg + '!important;',
				'color:' + text + '!important;',
				'}',
				'[class*="DateRangePicker-module__contentMobile"] *,',
				'[class*="DateRangePicker-module__monthMobile"],',
				'[class*="DateRangePicker-module__monthMobile"] *,',
				'[class*="DateRangePicker-module__day"],',
				'[class*="DateRangePicker-module__dayContent"],',
				'[class*="DateRangePicker-module__price"],',
				'[class*="DateRangePicker-module__lowPrice"],',
				'[class*="FlightsDateRangePicker-module__day"],',
				'[class*="FlightsDateRangePicker-module__dayContent"],',
				'[class*="FlightsDateRangePicker-module__price"],',
				'[class*="FlightsDateRangePicker-module__lowPrice"]{',
				'color:' + text + '!important;',
				'}',
				'[class*="DateRangePicker-module__price"],',
				'[class*="DateRangePicker-module__lowPrice"],',
				'[class*="FlightsDateRangePicker-module__price"],',
				'[class*="FlightsDateRangePicker-module__lowPrice"]{',
				'color:' + muted + '!important;',
				'}',
				'[class*="Calendar-module__root"],',
				'[class*="Calendar-module__root"] *,',
				'[class*="CalendarCaption-module__"],',
				'[class*="CaptionLabel-module__root"],',
				'[class*="CaptionLabel-module__caption"],',
				'[class*="style-module__caption_label"],',
				'[class*="style-module__day"],',
				'[class*="style-module__head_cell"],',
				'[class*="style-module__month"],',
				'[class*="style-module__month_caption"],',
				'[class*="style-module__table"],',
				'[class*="rdp-month"],',
				'[class*="rdp-caption"],',
				'[class*="rdp-head_cell"],',
				'[class*="rdp-day"],',
				'[class*="DateRangePicker"] label,',
				'[class*="DateRangePicker"] span,',
				'[class*="DateRangePicker"] button,',
				'[class*="DateRangePicker"] h2,',
				'[class*="DateRangePicker"] h3,',
				'[class*="DateRangePicker"] h6{',
				'color:' + text + '!important;',
				'}',
				'[class*="Calendar-module__root"],',
				'[class*="style-module__root"],',
				'[class*="style-module__months"],',
				'[class*="style-module__month"],',
				'[class*="rdp"],',
				'[class*="rdp-months"]{',
				'background:' + bg + '!important;',
				'background-color:' + bg + '!important;',
				'color:' + text + '!important;',
				'--rdp-accent-color:' + amolabColor('icons') + '!important;',
				'--rdp-background-color:rgba(56,189,248,.18)!important;',
				'--rdp-accent-color-dark:' + amolabColor('icons') + '!important;',
				'--rdp-background-color-dark:rgba(56,189,248,.18)!important;',
				'}',
				'[class*="CalendarCaption-module__calendarArrowButton"],',
				'[class*="Calendar-module__calendarArrowButton"],',
				'[class*="style-module__nav_button"],',
				'[class*="CaptionLabel-module__captionMonths"] button,',
				'[class*="PopoverAdditionalContent-module__button"]{',
				'background:' + bgMuted + '!important;',
				'color:' + text + '!important;',
				'border-color:' + border + '!important;',
				'}',
				'[class*="style-module__day_outside"],',
				'[class*="style-module__day_disabled"],',
				'[class*="rdp-day_outside"],',
				'[class*="rdp-day_disabled"]{',
				'color:' + muted + '!important;',
				'opacity:.45!important;',
				'}',
				'[class*="LocalizationDropdown-module__popoverTitle"],',
				'[class*="PopoverAdditionalContent-module__title"]{',
				'color:' + text + '!important;',
				'}',
				darkTicketDetailCss()
			].join('');
		}

		function darkTicketDetailCss(){
			var bg = '#0f172a';
			var bgElev = '#111827';
			var bgMuted = '#1e293b';
			var border = '#334155';
			var text = '#e2e8f0';
			var muted = '#94a3b8';
			var btnBg = amolabAccentGrad();
			return [
				/* ticket detail modal after "Выбрать билет" */
				'[class*="Modal-module__root"],',
				'[class*="Modal-module__fullscreen"],',
				'[class*="Modal-module__fullHeight"],',
				'[class*="Modal-module__container"],',
				'[class*="Modal-module__popup"]{',
				'background:' + bg + '!important;',
				'background-color:' + bg + '!important;',
				'color:' + text + '!important;',
				'box-shadow:0 24px 60px rgba(0,0,0,.55)!important;',
				'}',
				'[class*="Modal-module__overlay"]{',
				'background:rgba(2,6,23,.72)!important;',
				'}',
				'[class*="TicketDetail-module__root"],',
				'[class*="TicketDetail-module__wrapper"],',
				'[class*="TicketDetail-module__body"],',
				'[class*="TicketDetail-module__content"],',
				'[class*="TicketDetail-module__main"],',
				'[class*="TicketDetail-module__flights"],',
				'[class*="TicketDetail-module__head"]{',
				'background:' + bg + '!important;',
				'background-color:' + bg + '!important;',
				'color:' + text + '!important;',
				'}',
				'[class*="TicketDetail-module__wrapper"]{',
				'background:' + bgElev + '!important;',
				'background-color:' + bgElev + '!important;',
				'border-radius:1rem!important;',
				'}',
				'[class*="FareCard-module__root"],',
				'[class*="FareCard-module__box"],',
				'[class*="TicketFare-module__root"]{',
				'border-radius:1rem!important;',
				'}',
				'[class*="TicketDetail-module__head"] button,',
				'[class*="TicketDetail-module__share"],',
				'[class*="TicketDetail-module__close"],',
				'[class*="TicketDetail"] [class*="close"]{',
				'color:var(--main-accent,' + amolabColor('icons') + ')!important;',
				'}',
				/* fare + proposals cards */
				'[class*="TicketFare-module__root"],',
				'[class*="TicketFare-module__minimumFare"],',
				'[class*="TicketFare-module__actions"],',
				'[class*="FareOptions-module__root"],',
				'[class*="FareOptions-module__option"],',
				'[class*="FareCard-module__root"],',
				'[class*="FareCard-module__box"],',
				'[class*="FareCard-module__head"],',
				'[class*="TicketProposals-module__root"],',
				'[class*="TicketProposals-module__list"],',
				'[class*="TicketProposal"]{',
				'background:' + bgMuted + '!important;',
				'background-color:' + bgMuted + '!important;',
				'color:' + text + '!important;',
				'border-color:' + border + '!important;',
				'box-shadow:none!important;',
				'}',
				'[class*="FareCard-module__price"],',
				'[class*="TicketProposals"] [class*="price"],',
				'[class*="TicketDetail"] [class*="price"]{',
				'color:' + text + '!important;',
				'}',
				/* white card in light = rounded TicketFlights-module__list; keep radius in dark */
				'[class*="TicketFlights-module__list"]{',
				'background:' + bgMuted + '!important;',
				'background-color:' + bgMuted + '!important;',
				'color:' + text + '!important;',
				'border:none!important;',
				'border-radius:1rem!important;',
				'overflow:hidden!important;',
				'box-shadow:none!important;',
				'}',
				'[class*="TicketFlights-module__root"],',
				'[class*="FlightHead-module__root"]{',
				'background:transparent!important;',
				'background-color:transparent!important;',
				'color:' + text + '!important;',
				'box-shadow:none!important;',
				'}',
				'[class*="ItineraryFlight-module__root"],',
				'[class*="ItineraryFlight-module__details"],',
				'[class*="ItineraryFlight-module__airline"],',
				'[class*="ItineraryFlight-module__airlineBox"],',
				'[class*="FlightStop-module__root"]{',
				'background:transparent!important;',
				'background-color:transparent!important;',
				'color:' + text + '!important;',
				'border:none!important;',
				'box-shadow:none!important;',
				'}',
				'[class*="ItineraryTransfer-module__root"],',
				'[class*="ItineraryTransfer-module__box"]{',
				'background:' + bg + '!important;',
				'background-color:' + bg + '!important;',
				'color:' + text + '!important;',
				'border:none!important;',
				'border-radius:.75rem!important;',
				'box-shadow:none!important;',
				'}',
				'[class*="TicketAlerts-module__root"],',
				'[class*="TicketAlerts-module__item"],',
				'[class*="SoftTicketsNotice-module__root"],',
				'[class*="Notice-module__root"]{',
				'border-radius:.75rem!important;',
				'overflow:hidden!important;',
				'}',
				'[class*="ItineraryFlight-module__airlineName"],',
				'[class*="ItineraryFlight-module__airlineTime"],',
				'[class*="ItineraryTransfer-module__time"],',
				'[class*="FlightHead-module__root"] *,',
				'[class*="ItineraryFlight-module__details"] *{',
				'color:' + text + '!important;',
				'}',
				'[class*="ItineraryFlight-module__airlinePartner"],',
				'[class*="ItineraryFlight-module__airlineChip"]{',
				'color:' + muted + '!important;',
				'background:transparent!important;',
				'}',
				/* timeline dots / lines — no light grey */
				'[class*="ItineraryFlight-module__root"] [class*="line"],',
				'[class*="ItineraryFlight-module__root"] [class*="dot"],',
				'[class*="FlightItem-module__root"]:before,',
				'[class*="FlightItem-module__root"]:after{',
				'background-color:' + border + '!important;',
				'border-color:' + border + '!important;',
				'}',
				/* warning / notes that stay white */
				'[class*="ItineraryNote-module__root"],',
				'[class*="ItineraryNote-module__light"],',
				'[class*="ItineraryNote-module__dark"],',
				'[class*="SoftTicketsNotice-module__root"],',
				'[class*="SoftTicketsNotice-module__text"],',
				'[class*="TicketAlerts-module__item"],',
				'[class*="TicketAlerts-module__"],',
				'[class*="Notice-module__root"],',
				'[class*="Notice-module__text"],',
				'[class*="Alerts-module__item"]{',
				'background:' + bgMuted + '!important;',
				'background-color:' + bgMuted + '!important;',
				'color:' + text + '!important;',
				'border-color:' + border + '!important;',
				'box-shadow:none!important;',
				'}',
				'[class*="ItineraryNote-module__light"],',
				'[class*="ItineraryNote-module__light"] span{',
				'color:' + text + '!important;',
				'}',
				'[class*="ItineraryNote-module__highlight"],',
				'[class*="ItineraryTransfer-module__notes"]{',
				'background:rgba(249,115,22,.2)!important;',
				'color:#fdba74!important;',
				'border-color:rgba(249,115,22,.4)!important;',
				'border-radius:.5rem!important;',
				'}',
				/* flight points / times / pink date chips */
				'[class*="FlightItem-module__root"],',
				'[class*="FlightItem-module__place"],',
				'[class*="FlightItem-module__date"]{',
				'color:' + text + '!important;',
				'}',
				'[class*="FlightItem-module__time"],',
				'[class*="FlightItem-module__city"],',
				'[class*="FlightItem-module__airport"]{',
				'color:' + text + '!important;',
				'}',
				'[class*="FlightItem-module__day"]{',
				'color:' + muted + '!important;',
				'}',
				'[class*="FlightItem-module__highlightDate"],',
				'[class*="FlightItem-module__highlightAirport"]{',
				'background:rgba(249,115,22,.22)!important;',
				'background-color:rgba(249,115,22,.22)!important;',
				'color:#fdba74!important;',
				'border-radius:4px!important;',
				'}',
				'[class*="TicketFare-module__title"],',
				'[class*="TicketDetail"] h1,',
				'[class*="TicketDetail"] h2,',
				'[class*="TicketDetail"] h3,',
				'[class*="TicketDetail"] h4,',
				'[class*="TicketDetail"] strong,',
				'[class*="TicketDetail"] b{',
				'color:' + text + '!important;',
				'}',
				'[class*="TicketDetail"] [class*="hint"],',
				'[class*="TicketDetail"] [class*="muted"],',
				'[class*="TicketDetail"] [class*="secondary"],',
				'[class*="TicketDetail"] [class*="duration"],',
				'[class*="TicketFare-module__title"]{',
				'color:' + muted + '!important;',
				'}',
				/* buy CTA — high contrast orange */
				'[class*="FareCard-module__button"],',
				'[class*="TicketProposals-module__button"],',
				'[class*="TicketDetail"] button[class*="primary"],',
				'[class*="TicketProposal"] button,',
				'[class*="TicketDetail"] [class*="buy"],',
				'[class*="TicketDetail"] button[class*="Buy"]{',
				'background:' + btnBg + '!important;',
				'background-color:' + amolabColor('accent') + '!important;',
				'border-color:' + amolabColor('accent') + '!important;',
				'color:#fff!important;',
				'opacity:1!important;',
				'filter:none!important;',
				'}',
				'[class*="TicketDetail"] input,',
				'[class*="TicketDetail"] select,',
				'[class*="TicketDetail"] textarea{',
				'background:' + bg + '!important;',
				'color:' + text + '!important;',
				'border-color:' + border + '!important;',
				'}'
			].join('');
		}

		function paintPopupEl(el){
			if(!el || !el.style) return;
			var cls = el.className || '';
			if(typeof cls !== 'string') return;
			if(
				cls.indexOf('Popover-module__root') !== -1 ||
				cls.indexOf('PlacePicker-module__popover') !== -1 ||
				cls.indexOf('PassengersPicker-module__popover') !== -1 ||
				cls.indexOf('DateRangePicker-module__popoverRoot') !== -1 ||
				cls.indexOf('DateRangePicker-module__contentMobile') !== -1 ||
				cls.indexOf('DateRangePicker-module__monthMobile') !== -1 ||
				cls.indexOf('DateRangePicker-module__headerMobile') !== -1 ||
				cls.indexOf('DatePicker-module__popover') !== -1 ||
				cls.indexOf('LocalizationDropdown-module__popover') !== -1 ||
				cls.indexOf('Calendar-module__root') !== -1 ||
				cls.indexOf('Modal-module__root') !== -1 ||
				cls.indexOf('TicketDetail-module__root') !== -1 ||
				cls.indexOf('TicketDetail-module__wrapper') !== -1
			){
				el.style.setProperty('background', '#111827', 'important');
				el.style.setProperty('background-color', '#111827', 'important');
				el.style.setProperty('color', '#e2e8f0', 'important');
				el.style.setProperty('border-color', '#334155', 'important');
			}
			if(cls.indexOf('TicketFare-module__root') !== -1 || cls.indexOf('FareOptions-module__') !== -1 || cls.indexOf('ItineraryFlight-module__root') !== -1 || cls.indexOf('FareCard-module__root') !== -1 || cls.indexOf('ItineraryNote-module__root') !== -1){
				el.style.setProperty('background', '#1e293b', 'important');
				el.style.setProperty('background-color', '#1e293b', 'important');
				el.style.setProperty('color', '#e2e8f0', 'important');
			}
			if(cls.indexOf('PlacePicker-module__popoverSectionHeader') !== -1){
				el.style.setProperty('background', '#1e293b', 'important');
				el.style.setProperty('color', '#94a3b8', 'important');
			}
			if(cls.indexOf('PassengersPicker-module__counters') !== -1 || cls.indexOf('PassengersPickerContent-module__mobileSection') !== -1){
				el.style.setProperty('background', '#0f172a', 'important');
			}
			if(
				cls.indexOf('PassengersPicker-module__title') !== -1 ||
				cls.indexOf('PassengersCounter-module__title') !== -1 ||
				cls.indexOf('TripClassRadio-module__label') !== -1 ||
				cls.indexOf('PlaceOption-module__root') !== -1 ||
				cls.indexOf('PopoverAdditionalContent-module__title') !== -1
			){
				el.style.setProperty('color', '#e2e8f0', 'important');
			}
		}

		function scanPopups(root){
			if(!isDark() || !root || !root.querySelectorAll) return;
			var nodes = root.querySelectorAll('[class*="Popover-module__root"],[class*="PlacePicker-module__popover"],[class*="PassengersPicker-module__popover"],[class*="DateRangePicker-module__popoverRoot"],[class*="DateRangePicker-module__popoverRootMobile"],[class*="DateRangePicker-module__contentMobile"],[class*="DateRangePicker-module__monthMobile"],[class*="DateRangePicker-module__headerMobile"],[class*="DatePicker-module__popover"],[class*="Calendar-module__root"],[class*="LocalizationDropdown-module__popover"],[class*="PlacePicker-module__popoverSectionHeader"],[class*="PassengersPicker-module__counters"],[class*="PassengersPicker-module__title"],[class*="PassengersCounter-module__title"],[class*="TripClassRadio-module__label"],[class*="PlaceOption-module__root"],[class*="PopoverAdditionalContent-module__title"],[class*="PassengersPickerContent-module__mobileSection"],[class*="Modal-module__root"],[class*="TicketDetail-module__root"],[class*="TicketDetail-module__wrapper"],[class*="TicketFare-module__root"]');
			for(var i = 0; i < nodes.length; i++) paintPopupEl(nodes[i]);
		}

		function watchPopups(root){
			if(!root || root.__amolabPopupWatch) return;
			root.__amolabPopupWatch = true;
			var scanTimer = null;
			var obs = new MutationObserver(function(muts){
				if(!isDark()) return;
				var heavy = false;
				for(var i = 0; i < muts.length; i++){
					var m = muts[i];
					if(!m.addedNodes) continue;
					for(var j = 0; j < m.addedNodes.length; j++){
						var n = m.addedNodes[j];
						if(n.nodeType !== 1) continue;
						if(n.id === 'amolab-wl-modals-skin' || n.id === 'amolab-wl-skin' || n.id === 'amolab-wl-tickets-skin') continue;
						var cls = typeof n.className === 'string' ? n.className : '';
						if(cls.indexOf('TicketDetail') !== -1 || cls.indexOf('Modal-module__root') !== -1){
							heavy = true;
							paintPopupEl(n);
							continue;
						}
						/* light paint only the node itself — no deep scan per child */
						paintPopupEl(n);
					}
				}
				if(heavy){
					clearTimeout(scanTimer);
					scanTimer = setTimeout(function(){ scanPopups(root); }, 80);
				}
			});
			obs.observe(root, {childList: true, subtree: true});
		}

		function injectDocumentPopupSkin(){
			var style = document.getElementById('amolab-wl-popups');
			if(!style){
				style = document.createElement('style');
				style.id = 'amolab-wl-popups';
				document.head.appendChild(style);
			}
			style.textContent = isDark() ? darkPopupCss() : '';
		}

		function injectShadowSkin(shadow){
			if(!shadow) return;
			var style = shadow.getElementById('amolab-wl-skin');
			if(!style){
				style = document.createElement('style');
				style.id = 'amolab-wl-skin';
			}
			var css = shadowSkinCss(isDark());
			if(style.textContent !== css) style.textContent = css;
			/* keep last so our rules win over widget sheets */
			if(style.parentNode !== shadow || shadow.lastChild !== style){
				shadow.appendChild(style);
			}
			injectDocumentPopupSkin();
		}

		/* Calendar / passengers / places live in #tpwl-modals shadow — style only that host */
		function applyModalsSkin(){
			var el = document.getElementById('tpwl-modals');
			if(!el) return false;
			setHostVars(el);
			var shadow = el.shadowRoot;
			if(!shadow) return false;
			var style = shadow.getElementById('amolab-wl-modals-skin');
			if(!style){
				style = document.createElement('style');
				style.id = 'amolab-wl-modals-skin';
				shadow.appendChild(style);
			}
			style.textContent = isDark() ? darkPopupCss() : '';
			if(!el.__amolabModalsHostObs){
				el.__amolabModalsHostObs = true;
				new MutationObserver(function(){
					if(applying) return;
					setHostVars(el);
				}).observe(el, {attributes: true, attributeFilter: ['style']});
			}
			if(!shadow.__amolabPopupWatch){
				watchPopups(shadow);
			}
			scanPopups(shadow);
			return true;
		}

		function darkTicketsCss(){
			var bg = '#0f172a';
			var bgElev = '#111827';
			var bgMuted = '#1e293b';
			var border = '#334155';
			var text = '#e2e8f0';
			var muted = '#94a3b8';
			var btnBg = amolabAccentGrad();
			return [
				':host{',
				'color:' + text + '!important;',
				'--border-radius:16px;',
				'--ticket-cards-background:' + bg + ';',
				'--border-color:' + border + ';',
				'}',
				'[class*="TicketsWidget-module__root"],',
				'[class*="TicketsWidget-module__wrapper"]{',
				'color:' + text + '!important;',
				'}',
				/* progress: "Ищем у поставщиков" */
				'[class*="TicketsWidget-module__progressBar"],',
				'[class*="TicketsWidgetSkeleton-module__progressBar"],',
				'[class*="Filter-module__skeletonFilterProgressbar"],',
				'[class*="progressBar"]{',
				'background:' + bgElev + '!important;',
				'background-color:' + bgElev + '!important;',
				'color:' + text + '!important;',
				'border-radius:12px!important;',
				'}',
				'[class*="progressBar"] *,',
				'[class*="TicketsWidget-module__progressBar"] *,',
				'[class*="TicketsWidgetSkeleton-module__progressBar"] *{',
				'color:' + text + '!important;',
				'}',
				/* filters sidebar — color/bg only, no forced borders */
				'[class*="TicketsWidget-module__filtersDesktop"],',
				'[class*="TicketsWidget-module__filtersMobileMenu"],',
				'[class*="FlightFilters-module__filerContainer"],',
				'[class*="FlightFilters-module__filterContainer"],',
				'[class*="FlightFiltersContent-module__root"],',
				'[class*="FlightFilters-module__contentDesktop"],',
				'[class*="FlightFilters-module__filtersMobileView"],',
				'[class*="FlightFilters-module__menuMobile"],',
				'[class*="FlightFiltersMobileMenu-module__root"],',
				'[class*="FlightFiltersMobileMenu-module__list"],',
				'[class*="FiltersModal-module__"],',
				'[class*="FilterTicket-module__cardFilterTicket"]{',
				'background:' + bg + '!important;',
				'background-color:' + bg + '!important;',
				'color:' + text + '!important;',
				'}',
				/* mobile quick-filter chips: "Багаж включён", "Без пересадок" */
				'[class*="FlightFiltersMobileMenu-module__chip"],',
				'[class*="FlightFiltersMobileMenu-module__list"] > *,',
				'[class*="FlightFiltersMobileMenu-module__list"] button,',
				'[class*="FlightFiltersMobileMenu-module__list"] a,',
				'[class*="TicketsWidget-module__filtersMobileMenu"] button,',
				'[class*="TicketsWidget-module__filtersMobileMenu"] [class*="chip"]{',
				'background:' + bgMuted + '!important;',
				'background-color:' + bgMuted + '!important;',
				'color:' + text + '!important;',
				'border:1px solid ' + border + '!important;',
				'box-shadow:none!important;',
				'}',
				'[class*="FlightFiltersMobileMenu-module__chip"] *,',
				'[class*="FlightFiltersMobileMenu-module__list"] button *,',
				'[class*="TicketsWidget-module__filtersMobileMenu"] button *{',
				'color:' + text + '!important;',
				'}',
				'[class*="FlightFiltersMobileMenu-module__chip"][class*="active"],',
				'[class*="FlightFiltersMobileMenu-module__chip"][aria-pressed="true"],',
				'[class*="FlightFiltersMobileMenu-module__list"] button[aria-pressed="true"],',
				'[class*="FlightFiltersMobileMenu-module__list"] [class*="active"]{',
				'background:rgba(56,189,248,.18)!important;',
				'background-color:rgba(56,189,248,.18)!important;',
				'border-color:' + amolabColor('icons') + '!important;',
				'color:#e0f2fe!important;',
				'}',
				'[class*="Convenience-module__toggle"],',
				'[class*="Convenience-module__toggles"] button,',
				'[class*="BaggageFilter-module__toggle"],',
				'[class*="Toggle-module__root"]{',
				'background:' + bgMuted + '!important;',
				'background-color:' + bgMuted + '!important;',
				'color:' + text + '!important;',
				'border-color:' + border + '!important;',
				'}',
				'[class*="FlightFiltersContent-module__filterHeader"],',
				'[class*="FlightFilters"] h2,',
				'[class*="FlightFilters"] h3,',
				'[class*="FlightFilters"] h4,',
				'[class*="FlightFilters"] label,',
				'[class*="FlightFilters"] span,',
				'[class*="FlightFilters"] p{',
				'color:' + text + '!important;',
				'}',
				'[class*="FlightFilters"] [class*="hint"],',
				'[class*="FlightFilters"] [class*="price"],',
				'[class*="FlightFilters"] [class*="muted"]{',
				'color:' + muted + '!important;',
				'}',
				/* outer ticket card only (card___hash — not cardLeft/Right/…) */
				'[class*="FlightCard-module__card___"],',
				'[class*="TicketFare-module__root"],',
				'[class*="TicketProposals-module__root"],',
				'[class*="Ticket-module__root"]{',
				'background:var(--ticket-cards-background,' + bg + ')!important;',
				'background-color:var(--ticket-cards-background,' + bg + ')!important;',
				'color:' + text + '!important;',
				'border:1px solid ' + border + '!important;',
				'border-radius:var(--border-radius,16px)!important;',
				/* no overflow:hidden — cardBadges sit at top:-.625rem */
				'box-shadow:none!important;',
				'}',
				'[class*="FlightCard-module__cardBadges"]{',
				'overflow:visible!important;',
				'z-index:2!important;',
				'}',
				/* kill nested “dark square” boxes inside the card */
				'[class*="FlightCard-module__cardLeft"],',
				'[class*="FlightCard-module__cardRight"],',
				'[class*="FlightCard-module__cardTop"],',
				'[class*="FlightCard-module__cardBlockFlight"],',
				'[class*="FlightCard-module__cardLeftBaggage"],',
				'[class*="Flight-module__root"],',
				'[class*="TicketFlights-module__list"]{',
				'background:transparent!important;',
				'background-color:transparent!important;',
				'border:none!important;',
				'box-shadow:none!important;',
				'color:' + text + '!important;',
				'}',
				'[class*="FlightCard-module__cardLeft"]{',
				'border-right:1px solid ' + border + '!important;',
				'}',
				'[class*="FlightCard-module__cardLeftButton"]{',
				'border:none!important;',
				'}',
				'[class*="FlightCard-module__cardLeftPrice"],',
				'[class*="FlightCard-module__"] [class*="price"],',
				'[class*="Flight-module__"] time,',
				'[class*="Flight-module__"] [class*="time"],',
				'[class*="Flight-module__airportCode"],',
				'[class*="Ticket"] [class*="price"],',
				'[class*="TicketFare"] [class*="price"]{',
				'color:' + text + '!important;',
				'}',
				'[class*="FlightCard-module__cardTicketText"],',
				'[class*="Flight-module__"] [class*="duration"],',
				'[class*="Flight-module__"] [class*="hint"],',
				'[class*="Flight-module__"] [class*="city"],',
				'[class*="Ticket"] [class*="description"]{',
				'color:' + muted + '!important;',
				'}',
				/* progress striped bar under status */
				'[class*="TicketsWidget-module__progressBar"] [class*="bar"],',
				'[class*="progressBar"] [class*="bar"],',
				'[class*="TicketsWidgetSkeleton-module__progressBar"] [class*="bar"]{',
				'border-radius:0 0 12px 12px!important;',
				'}',
				/* Прямые рейсы — hardcoded #fff in widget */
				'[class*="DirectFlights-module__root"],',
				'[class*="DirectFlights-module__list"],',
				'[class*="DirectFlightsItem-module__root"],',
				'[class*="DirectFlightsItem-module__body"],',
				'[class*="DirectFlightsItem-module__box"],',
				'[class*="DirectFlightsItem-module__table"],',
				'[class*="DirectFlightsItem-module__scroller"]{',
				'background:' + bg + '!important;',
				'background-color:' + bg + '!important;',
				'color:' + text + '!important;',
				'box-shadow:none!important;',
				'}',
				'[class*="DirectFlights-module__title"],',
				'[class*="DirectFlightsItem-module__airline"],',
				'[class*="DirectFlightsItem-module__message"],',
				'[class*="DirectFlightsItem-module__head"],',
				'[class*="DirectFlightsItem-module__times"],',
				'[class*="DirectFlightsItem-module__tableCell"],',
				'[class*="DirectFlightsItem-module__tableRow"],',
				'[class*="DirectFlights"] span,',
				'[class*="DirectFlights"] p,',
				'[class*="DirectFlights"] div{',
				'color:' + text + '!important;',
				'}',
				'[class*="DirectFlightsItem-module__price"],',
				'[class*="DirectFlightsItem-module__price"] *{',
				'color:' + amolabColor('icons') + '!important;',
				'}',
				'[class*="DirectFlightsItem-module__date"]{',
				'color:' + muted + '!important;',
				'}',
				'[class*="DirectFlights-module__more"],',
				'[class*="DirectFlightsItem-module__more"],',
				'[class*="DirectFlightsItem-module__show"]{',
				'color:' + amolabColor('icons') + '!important;',
				'}',
				'[class*="DirectFlightsItem-module__airlinePicture"],',
				'[class*="DirectFlightsItem-module__logo"]{',
				'border-color:' + bg + '!important;',
				'}',
				'[class*="DirectFlightsItem-module__prev"],',
				'[class*="DirectFlightsItem-module__next"]{',
				'background:linear-gradient(90deg,' + bg + ',' + bg + '00)!important;',
				'}',
				'[class*="DirectFlightsItem-module__root"]:after,',
				'[class*="DirectFlights-module__moreBox"]:after{',
				'background-color:rgba(148,163,184,.25)!important;',
				'}',
				/* matrix / date chips — bg/color only */
				'[class*="FlightMatrixDesktop-module__root"],',
				'[class*="FlightMatrixMobile-module__"],',
				'[class*="FlightMatrixDesktop-module__buttonBox"],',
				'[class*="FlightMatrix-module__flightMatrix"],',
				'[class*="FlightMatrix-module__flightMatrixModal"]{',
				'background:' + bgMuted + '!important;',
				'background-color:' + bgMuted + '!important;',
				'color:' + text + '!important;',
				'}',
				'[class*="FlightMatrixDesktop-module__flightMatrixButton"],',
				'[class*="FlightMatrix"] [class*="dateCell"],',
				'[class*="FlightMatrix"] [class*="subtitle"],',
				'[class*="FlightMatrix"] [class*="label"]{',
				'background:transparent!important;',
				'background-color:transparent!important;',
				'color:' + text + '!important;',
				'}',
				/* CTA — force full orange, no dark patches on inner spans */
				'[class*="FlightCard-module__cardLeftButton"],',
				'[class*="FlightCard"] button[class*="Button"],',
				'[class*="FlightCard"] button[type="button"],',
				'[class*="Ticket"] button[class*="primary"],',
				'[class*="TicketFare"] button,',
				'[class*="TicketProposals"] button,',
				'[class*="TicketsWidget-module__moreTickets"],',
				'[class*="Button-module__primary"]{',
				'background:' + btnBg + '!important;',
				'background-color:' + amolabColor('accent') + '!important;',
				'background-image:' + btnBg + '!important;',
				'border-color:' + amolabColor('accent') + '!important;',
				'color:#fff!important;',
				'}',
				'[class*="FlightCard-module__cardLeftButton"] *,',
				'[class*="FlightCard"] button *,',
				'[class*="TicketsWidget-module__moreTickets"] *,',
				'[class*="Button-module__primary"] *{',
				'background:transparent!important;',
				'background-color:transparent!important;',
				'background-image:none!important;',
				'color:#fff!important;',
				'box-shadow:none!important;',
				'}',
				/* skeletons — only outer shell gets bg; left/right stay transparent so radius clips */
				'[class*="SkeletonCard-module__skeletonCardPc"],',
				'[class*="SkeletonCard-module__skeletonCardMobile"]{',
				'background:var(--ticket-cards-background,' + bg + ')!important;',
				'background-color:var(--ticket-cards-background,' + bg + ')!important;',
				'border:1px solid ' + border + '!important;',
				'border-radius:var(--border-radius,16px)!important;',
				'overflow:hidden!important;',
				'}',
				'[class*="SkeletonCard-module__skeletonCardLeft"],',
				'[class*="SkeletonCard-module__skeletonCardRight"],',
				'[class*="SkeletonCard-module__skeletonCardBlock"],',
				'[class*="SkeletonCard-module__skeletonCardBlockWrap"],',
				'[class*="SkeletonCard-module__skeletonCardMobileWrap"],',
				'[class*="SkeletonCard-module__skeletonCardMobileBlock"],',
				'[class*="SkeletonCard-module__skeletonCardIcon"]{',
				'background:transparent!important;',
				'background-color:transparent!important;',
				'}',
				'[class*="SkeletonCard-module__skeletonCardLeft"]{',
				'border-right:1px solid ' + border + '!important;',
				'border-left:none!important;',
				'}',
				'[class*="SkeletonCard-module__skeletonCardBlockWrap"]{',
				'border-bottom:1px solid ' + border + '!important;',
				'}',
				'[class*="Skeleton-module__skeleton"]{',
				'background:rgba(148,163,184,.28)!important;',
				'border-radius:4px!important;',
				'}',
				'[class*="TicketsWidgetSkeleton-module__root"],',
				'[class*="TicketsWidgetSkeleton-module__wrapper"],',
				'[class*="SkeletonCard-module__root"],',
				'[class*="filtersLoader"]{',
				'background:transparent!important;',
				'color:' + muted + '!important;',
				'}',
				'[class*="TicketsWidget-module__moreTickets"]{',
				'color:#fff!important;',
				'border-color:' + amolabColor('accent') + '!important;',
				'background:' + btnBg + '!important;',
				'background-color:' + amolabColor('accent') + '!important;',
				'background-image:' + btnBg + '!important;',
				'border-radius:var(--border-radius,16px)!important;',
				'}'
			].join('');
		}

		function lightTicketsCss(){
			var btnBg = amolabAccentGrad();
			return [
				/* CTA orange in light theme (widget uses --main-accent blue) */
				'[class*="FlightCard-module__cardLeftButton"],',
				'[class*="FlightCard"] button[class*="Button"],',
				'[class*="FlightCard"] button[type="button"],',
				'[class*="Ticket"] button[class*="primary"],',
				'[class*="TicketFare"] button[class*="primary"],',
				'[class*="TicketProposals"] button[class*="primary"],',
				'[class*="TicketsWidget-module__moreTickets"],',
				'[class*="Button-module__primary"]{',
				'background:' + btnBg + '!important;',
				'background-color:' + amolabColor('accent') + '!important;',
				'background-image:' + btnBg + '!important;',
				'border-color:' + amolabColor('accent') + '!important;',
				'color:#fff!important;',
				'}',
				'[class*="FlightCard-module__cardLeftButton"] *,',
				'[class*="FlightCard"] button *,',
				'[class*="TicketsWidget-module__moreTickets"] *,',
				'[class*="Button-module__primary"] *{',
				'background:transparent!important;',
				'background-color:transparent!important;',
				'background-image:none!important;',
				'color:#fff!important;',
				'box-shadow:none!important;',
				'}'
			].join('');
		}

		function applyTicketsSkin(){
			var el = document.getElementById('tpwl-tickets');
			if(!el) return false;
			setHostVars(el);
			var shadow = el.shadowRoot;
			if(!shadow) return false;
			var style = shadow.getElementById('amolab-wl-tickets-skin');
			if(!style){
				style = document.createElement('style');
				style.id = 'amolab-wl-tickets-skin';
			}
			var css = isDark() ? darkTicketsCss() : lightTicketsCss();
			if(style.textContent !== css) style.textContent = css;
			/* always keep our skin last (widget re-injects its styles) */
			if(style.parentNode !== shadow || shadow.lastChild !== style){
				shadow.appendChild(style);
			}
			if(!el.__amolabTicketsHostObs){
				el.__amolabTicketsHostObs = true;
				var hostTimer = null;
				new MutationObserver(function(){
					if(applying) return;
					clearTimeout(hostTimer);
					hostTimer = setTimeout(function(){
						setHostVars(el);
						applyTicketsSkin();
					}, 30);
				}).observe(el, {attributes: true, attributeFilter: ['style']});
			}
			if(!shadow.__amolabTicketsShadowObs){
				shadow.__amolabTicketsShadowObs = true;
				var shadowTimer = null;
				new MutationObserver(function(muts){
					for(var i = 0; i < muts.length; i++){
						var nodes = muts[i].addedNodes;
						for(var j = 0; j < nodes.length; j++){
							var n = nodes[j];
							if(n && n.id === 'amolab-wl-tickets-skin') return;
						}
					}
					clearTimeout(shadowTimer);
					shadowTimer = setTimeout(applyTicketsSkin, 40);
				}).observe(shadow, {childList: true, subtree: true});
			}
			return true;
		}

		function hideWidgetStub(){
			var wrap = document.getElementById('tpwl-search-wrap');
			var stub = document.getElementById('tpwl-widget-stub');
			if(wrap) wrap.classList.add('is-form-ready');
			if(!stub) return;
			stub.classList.add('is-hidden');
			stub.setAttribute('hidden', '');
			stub.style.cssText = 'display:none!important';
			if(stub.parentNode){
				try { stub.parentNode.removeChild(stub); } catch(e) {}
			}
		}

		function scrollToResults(){
			var target = document.getElementById('avia-results');
			if(!target || resultsScrolled) return;
			resultsScrolled = true;
			wlSearchIntent = false;
			var header = document.querySelector('.site-header') || document.querySelector('.site-navbar');
			var top = target.getBoundingClientRect().top + window.pageYOffset - ((header && header.offsetHeight) || 80) - 8;
			window.scrollTo({ top: top, behavior: 'smooth' });
		}
		window.__amolabScrollToResults = scrollToResults;

		function formHasErrors(shadow){
			if(!shadow || !shadow.querySelector) return false;
			return !!shadow.querySelector('[class*="Input-module__isError"], [class*="isError"], [class*="errorLabel"]');
		}

		function bindSearchScroll(shadow){
			if(!shadow || shadow.__amolabSearchScroll) return;
			shadow.__amolabSearchScroll = true;

			function onSearchAttempt(){
				if(shadow.__amolabSearchPending) return;
				shadow.__amolabSearchPending = true;
				wlSearchIntent = true;
				resultsScrolled = false;

				/* 1) paint validation  2) let tickets show "search started"  3) scroll */
				requestAnimationFrame(function(){
					requestAnimationFrame(function(){
						if(formHasErrors(shadow)){
							shadow.__amolabSearchPending = false;
							wlSearchIntent = false;
							return;
						}
						setTimeout(function(){
							shadow.__amolabSearchPending = false;
							if(!wlSearchIntent || formHasErrors(shadow)){
								wlSearchIntent = false;
								return;
							}
							scrollToResults();
						}, 280);
					});
				});
			}

			shadow.addEventListener('click', function(e){
				var t = e.target;
				if(!t || !t.closest) return;
				if(t.closest('[class*="submitBtn"], [class*="Button-module__primary"], button[type="submit"]')){
					onSearchAttempt();
				}
			}, true);
			shadow.addEventListener('submit', function(){
				onSearchAttempt();
			}, true);
		}

		function scrollToForm(){
			/* desktop: page top; mobile: a bit above the form */
			if(window.innerWidth >= 992){
				window.scrollTo({ top: 0, behavior: 'smooth' });
				return;
			}
			var target = document.getElementById('tpwl-search-wrap') || document.getElementById('tpwl-search');
			if(!target){
				window.scrollTo({ top: 0, behavior: 'smooth' });
				return;
			}
			var header = document.querySelector('.site-header') || document.querySelector('.site-navbar');
			var top = target.getBoundingClientRect().top + window.pageYOffset - ((header && header.offsetHeight) || 64) - 24;
			window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
		}

		function setNativeInputValue(input, value){
			if(!input) return;
			var proto = window.HTMLInputElement && window.HTMLInputElement.prototype;
			var desc = proto && Object.getOwnPropertyDescriptor(proto, 'value');
			if(desc && desc.set) desc.set.call(input, value);
			else input.value = value;
			input.dispatchEvent(new Event('input', {bubbles: true, composed: true}));
			input.dispatchEvent(new Event('change', {bubbles: true, composed: true}));
		}

		function getSearchShadow(){
			var el = document.getElementById('tpwl-search');
			return el && el.shadowRoot ? el.shadowRoot : null;
		}

		function getModalsShadow(){
			var el = document.getElementById('tpwl-modals');
			return el && el.shadowRoot ? el.shadowRoot : null;
		}

		function getPlaceInputs(shadow){
			if(!shadow) return [];
			var places = shadow.querySelector(
				'[class*="DefaultSearch-module__places"], [class*="mergedInputs"][class*="places"], [class*="places"]'
			);
			var list = places
				? places.querySelectorAll('input')
				: shadow.querySelectorAll('[class*="SearchInput-module__root"] input, [class*="Input-module__root"] input');
			var out = [];
			for(var i = 0; i < list.length; i++){
				var inp = list[i];
				if(!inp || !inp.isConnected) continue;
				var wrap = inp.closest('[class*="DateRange"], [class*="DatePicker"], [class*="passengers"], [class*="Passengers"]');
				if(wrap) continue;
				out.push(inp);
			}
			return out;
		}

		function resolvePlaceInput(index){
			var inputs = getPlaceInputs(getSearchShadow());
			return inputs[index] || null;
		}

		function formHasDates(shadow){
			if(!shadow) return false;
			var inputs = shadow.querySelectorAll(
				'[class*="DateRangePicker"] input, ' +
				'[class*="DatePicker"] input, ' +
				'[class*="dates"] input'
			);
			for(var i = 0; i < inputs.length; i++){
				var v = (inputs[i].value || '').replace(/\s+/g, '');
				if(v && !/когда|дата|date|дд|mm|\.\.\./i.test(v) && /\d/.test(v)) return true;
			}
			/* filled date chips / buttons with day numbers */
			var chips = shadow.querySelectorAll('[class*="DateRangePicker-module__input"], [class*="DateRangePicker"] [class*="Input-module__button"]');
			for(var j = 0; j < chips.length; j++){
				var t = (chips[j].textContent || '').replace(/\s+/g, ' ').trim();
				if(t && /\d/.test(t) && !/когда|обратн/i.test(t)) return true;
			}
			return false;
		}

		function parseIataFromHref(href){
			if(!href) return null;
			var origin = null;
			var destination = null;
			var depart = null;
			var ret = null;
			function absorb(str){
				if(!str) return;
				var s = str;
				try { s = decodeURIComponent(str); } catch(e) {}
				var o = s.match(/(?:origin_iata|origin)=([A-Za-z]{3})\b/i);
				var d = s.match(/(?:destination_iata|destination)=([A-Za-z]{3})\b/i);
				var dep = s.match(/depart_date=([^&]+)/i);
				var re = s.match(/return_date=([^&]*)/i);
				if(o) origin = o[1].toUpperCase();
				if(d) destination = d[1].toUpperCase();
				if(dep && dep[1] && dep[1] !== 'null') depart = dep[1];
				if(re && re[1] && re[1] !== 'null') ret = re[1];
				/* /search/MOWAERSKX or similar packed codes */
				var packed = s.match(/\/search\/([A-Z]{3})[0-9A-Z]*?([A-Z]{3})/i);
				if(packed){
					if(!origin) origin = packed[1].toUpperCase();
					if(!destination) destination = packed[2].toUpperCase();
				}
			}
			absorb(href);
			try {
				var u = new URL(href, location.href);
				absorb(u.search);
				absorb(u.pathname);
				u.searchParams.forEach(function(val, key){
					if(/origin|destination|depart_date/i.test(key) || /origin_iata|destination_iata|https?:/.test(val)) absorb(key + '=' + val);
					if(/https?:/.test(val)) absorb(val);
				});
			} catch(e) {}
			if(!origin && !destination) return null;
			return {origin: origin, destination: destination, depart: depart, returnDate: ret};
		}

		var CITY_TO_IATA = {
			'МОСКВА': 'MOW', 'МОСКВУ': 'MOW', 'МОСКВЫ': 'MOW',
			'САНКТ-ПЕТЕРБУРГ': 'LED', 'САНКТ ПЕТЕРБУРГ': 'LED', 'ПЕТЕРБУРГ': 'LED', 'СПБ': 'LED',
			'САМАРА': 'KUF', 'САМАРУ': 'KUF',
			'МУРМАНСК': 'MMK',
			'ЕКАТЕРИНБУРГ': 'SVX',
			'КАЗАНЬ': 'KZN', 'КАЗАНИ': 'KZN',
			'НОВОСИБИРСК': 'OVB',
			'КРАСНОЯРСК': 'KJA',
			'ТЮМЕНЬ': 'TJM',
			'МИНЕРАЛЬНЫЕ ВОДЫ': 'MRV', 'МИНЕРАЛЬНЫХ ВОД': 'MRV',
			'СОЧИ': 'AER',
			'ПЕТРОЗАВОДСК': 'PES',
			'ГОРНО-АЛТАЙСК': 'RGK', 'ГОРНО АЛТАЙСК': 'RGK',
			'ИРКУТСК': 'IKT',
			'ВЛАДИВОСТОК': 'VVO',
			'КАЛИНИНГРАД': 'KGD',
			'УФА': 'UFA',
			'ПЕРМЬ': 'PEE',
			'РОСТОВ-НА-ДОНУ': 'ROV', 'РОСТОВ НА ДОНУ': 'ROV',
			'НИЖНИЙ НОВГОРОД': 'GOJ',
			'ЧЕЛЯБИНСК': 'CEK',
			'ОМСК': 'OMS',
			'ВОРОНЕЖ': 'VOZ',
			'КРАСНОДАР': 'KRR',
			'САРАТОВ': 'GSV',
			'ВОЛГОГРАД': 'VOG',
			'АРХАНГЕЛЬСК': 'ARH',
			'ХАБАРОВСК': 'KHV',
			'ЯКУТСК': 'YKS',
			'МАХАЧКАЛА': 'MCX',
			'АСТРАХАНЬ': 'ASF',
			'ИЖЕВСК': 'IJK',
			'ТВЕРЬ': 'KLD',
			'ЯРОСЛАВЛЬ': 'IAR'
		};

		function iataFromCityText(text){
			if(!text) return null;
			var t = String(text).replace(/\s+/g, ' ').trim().toUpperCase();
			if(/^[A-Z]{3}$/.test(t)) return t;
			if(CITY_TO_IATA[t]) return CITY_TO_IATA[t];
			var keys = Object.keys(CITY_TO_IATA);
			for(var i = 0; i < keys.length; i++){
				if(t.indexOf(keys[i]) !== -1) return CITY_TO_IATA[keys[i]];
			}
			return null;
		}

		function originFromPath(path, anchor){
			var i;
			if(anchor){
				var href = anchor.href || anchor.getAttribute('href') || '';
				var fromHref = parseIataFromHref(href);
				if(fromHref && fromHref.origin) return fromHref.origin;
				for(var ai = 0; ai < anchor.attributes.length; ai++){
					var at = anchor.attributes[ai];
					if(!at) continue;
					if(/origin/i.test(at.name) && /^[A-Za-z]{3}$/.test(at.value || '')) return at.value.toUpperCase();
					var am = (at.value || '').match(/(?:origin_iata|origin)=([A-Za-z]{3})\b/i);
					if(am) return am[1].toUpperCase();
				}
			}
			if(!path) return null;
			for(i = 0; i < path.length; i++){
				var n = path[i];
				if(!n || n.nodeType !== 1) continue;
				if(n.getAttribute){
					var dataOrigin = n.getAttribute('data-origin') || n.getAttribute('data-origin-iata') || n.getAttribute('data-iata');
					if(dataOrigin && /^[A-Za-z]{3}$/.test(dataOrigin)) return dataOrigin.toUpperCase();
				}
			}
			/* row / cell city label near the click */
			for(i = 0; i < path.length; i++){
				var el = path[i];
				if(!el || el.nodeType !== 1) continue;
				var row = null;
				if(el.closest){
					row = el.closest('tr, li, [class*="row"], [class*="item"], [class*="Item"]');
				}
				if(!row && (el.tagName === 'TR' || el.tagName === 'LI' || el.tagName === 'TD' || el.tagName === 'A')) row = el;
				if(!row) continue;
				var label = '';
				var firstCell = row.querySelector && (row.querySelector('td, th, span, a, div') || row);
				if(row.tagName === 'TR'){
					var td = row.querySelector('td');
					label = ((td && td.textContent) || row.textContent || '').trim();
				}else{
					label = (row.textContent || '').trim();
				}
				/* take first line / before price */
				label = label.split('\n')[0].replace(/\d[\d\s]*[₽P].*$/i, '').replace(/\d[\d\s]*руб.*$/i, '').trim();
				label = label.replace(/Цена от|Город вылета|⇌/gi, '').trim();
				var code = iataFromCityText(label);
				if(code) return code;
				if(firstCell && firstCell !== row){
					code = iataFromCityText((firstCell.textContent || '').trim());
					if(code) return code;
				}
			}
			return null;
		}

		function destinationFromPath(path){
			var routes = document.getElementById('routes');
			if(!routes || !path) return null;
			for(var i = 0; i < path.length; i++){
				var n = path[i];
				if(!n || n === routes || n === document || n === window) continue;
				if(n.nodeType !== 1) continue;
				if(!routes.contains(n)) continue;
				var script = n.querySelector && n.querySelector('script[src*="destination="]');
				if(!script) continue;
				var m = (script.getAttribute('src') || '').match(/[?&]destination=([A-Za-z]{3})/i);
				if(m) return m[1].toUpperCase();
			}
			return null;
		}

		function findAnchorInPath(path){
			for(var i = 0; i < path.length; i++){
				var n = path[i];
				if(!n || n.nodeType !== 1) continue;
				if(n.tagName === 'A' && (n.href || n.getAttribute('href'))) return n;
			}
			return null;
		}

		function getFieldRoot(input){
			if(!input) return null;
			return input.closest('[class*="Input-module__root"], [class*="SearchInput-module__root"]') || input.parentNode;
		}

		function getSelectedIata(input){
			var root = getFieldRoot(input);
			if(!root) return null;
			/* only spans that look like IATA inside THIS field */
			var nodes = root.querySelectorAll('span, b, i, em, strong');
			for(var i = 0; i < nodes.length; i++){
				var t = (nodes[i].textContent || '').trim().toUpperCase();
				if(/^[A-Z]{3}$/.test(t)) return t;
			}
			var val = (input.value || '').trim().toUpperCase();
			if(/^[A-Z]{3}$/.test(val)) return val;
			return null;
		}

		function placeAlreadySelected(input, iata){
			if(!input || !iata || !input.isConnected) return false;
			return getSelectedIata(input) === iata;
		}

		function clearPlaceField(input){
			if(!input) return;
			var root = getFieldRoot(input);
			var scope = root;
			if(scope && scope.parentNode) scope = scope.parentNode;
			var clearBtn = null;
			if(scope && scope.querySelector){
				clearBtn = scope.querySelector('[class*="ClearableParameter-module__clearBtn"], [class*="clearBtn"]');
			}
			if(!clearBtn && root && root.querySelector){
				clearBtn = root.querySelector('[class*="ClearableParameter-module__clearBtn"], [class*="clearBtn"]');
			}
			if(clearBtn){
				dispatchFullClick(clearBtn);
			}
			setNativeInputValue(input, '');
			try {
				input.dispatchEvent(new InputEvent('input', {bubbles: true, composed: true, data: '', inputType: 'deleteContentBackward'}));
			} catch(e) {}
		}

		function dispatchFullClick(el){
			if(!el) return;
			var opts = {bubbles: true, cancelable: true, composed: true, view: window, button: 0, buttons: 1, clientX: 1, clientY: 1};
			['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(function(type){
				var Ev = (type.indexOf('pointer') === 0 && typeof PointerEvent === 'function') ? PointerEvent : MouseEvent;
				try { el.dispatchEvent(new Ev(type, opts)); } catch(err) {}
			});
			if(typeof el.click === 'function') el.click();
		}

		function focusNoScroll(el){
			if(!el) return;
			try { el.focus({preventScroll: true}); }
			catch(e){ try { el.focus(); } catch(err) {} }
		}

		function findPlaceOption(iata){
			var roots = [getModalsShadow(), getSearchShadow()];
			/* also scan any other open shadows (widget portals) */
			var all = document.querySelectorAll('*');
			for(var a = 0; a < all.length; a++){
				if(all[a].shadowRoot && roots.indexOf(all[a].shadowRoot) === -1) roots.push(all[a].shadowRoot);
			}
			var codeRe = iata ? new RegExp('\\b' + iata + '\\b', 'i') : null;
			var first = null;
			for(var r = 0; r < roots.length; r++){
				var root = roots[r];
				if(!root) continue;
				var opts = root.querySelectorAll('[class*="PlaceOption-module__root"]');
				if(!opts.length) continue;
				if(!first) first = opts[0];
				for(var i = 0; i < opts.length; i++){
					var opt = opts[i];
					var codeEl = opt.querySelector('[class*="PlaceOption-module__code"]');
					var code = ((codeEl && codeEl.textContent) || '').trim().toUpperCase();
					if(iata && code === iata) return opt;
					var txt = (opt.textContent || '').toUpperCase();
					if(iata && codeRe && codeRe.test(txt)) return opt;
				}
			}
			return first;
		}

		function placeSelectedOk(input, iata){
			if(!input || !input.isConnected || !iata) return false;
			return getSelectedIata(input) === iata;
		}

		function clickPlaceOption(iata, input, done){
			var tries = 0;
			var timer = setInterval(function(){
				tries++;
				var live = input && input.isConnected ? input : null;
				var hit = findPlaceOption(iata);
				if(hit){
					clearInterval(timer);
					dispatchFullClick(hit);
					var nameEl = hit.querySelector('[class*="PlaceOption-module__name"]');
					if(nameEl) dispatchFullClick(nameEl);
					setTimeout(function(){
						if(placeSelectedOk(live, iata)){
							if(done) done(true);
							return;
						}
						if(live){
							focusNoScroll(live);
							try {
								live.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown', code: 'ArrowDown', keyCode: 40, which: 40, bubbles: true, cancelable: true}));
								live.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true}));
								live.dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true}));
							} catch(e) {}
						}
						setTimeout(function(){ if(done) done(placeSelectedOk(live, iata)); }, 80);
					}, 60);
					return;
				}
				if(tries > 40){
					clearInterval(timer);
					if(live){
						try {
							live.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true}));
						} catch(e) {}
					}
					if(done) done(placeSelectedOk(live, iata));
				}
			}, 50);
		}

		function fillPlaceFieldByIndex(index, iata, done, force){
			if(iata == null || iata === ''){
				if(done) done(false);
				return;
			}
			var input = resolvePlaceInput(index);
			if(!input){
				if(done) done(false);
				return;
			}
			if(!force && placeAlreadySelected(input, iata)){
				if(done) done(true);
				return;
			}
			clearPlaceField(input);
			setTimeout(function(){
				input = resolvePlaceInput(index);
				if(!input){
					if(done) done(false);
					return;
				}
				focusNoScroll(input);
				dispatchFullClick(input);
				setNativeInputValue(input, '');
				setTimeout(function(){
					input = resolvePlaceInput(index);
					if(!input){
						if(done) done(false);
						return;
					}
					setNativeInputValue(input, iata);
					try {
						input.dispatchEvent(new InputEvent('input', {bubbles: true, composed: true, data: iata, inputType: 'insertText'}));
					} catch(e) {}
					clickPlaceOption(iata, input, function(ok){
						/* one retry with fresh node after search re-render */
						if(ok){
							if(done) done(true);
							return;
						}
						setTimeout(function(){
							input = resolvePlaceInput(index);
							if(!input || placeAlreadySelected(input, iata)){
								if(done) done(!!input && placeAlreadySelected(input, iata));
								return;
							}
							clearPlaceField(input);
							setTimeout(function(){
								input = resolvePlaceInput(index);
								if(!input){
									if(done) done(false);
									return;
								}
								focusNoScroll(input);
								dispatchFullClick(input);
								setNativeInputValue(input, iata);
								clickPlaceOption(iata, input, done);
							}, 120);
						}, 200);
					});
				}, 100);
			}, 140);
		}

		var routeFillLock = false;

		function showFormFillOverlay(){
			var wrap = document.getElementById('tpwl-search-wrap');
			if(!wrap) return;
			var overlay = document.getElementById('tpwl-form-fill-overlay');
			if(!overlay){
				overlay = document.createElement('div');
				overlay.id = 'tpwl-form-fill-overlay';
				overlay.className = 'tpwl-form-fill-overlay';
				overlay.setAttribute('aria-hidden', 'true');
				overlay.innerHTML = '<span>Подставляем направление…</span>';
				overlay.addEventListener('click', function(e){
					e.preventDefault();
					e.stopPropagation();
				}, true);
				wrap.appendChild(overlay);
			}
			overlay.classList.add('is-on');
			overlay.setAttribute('aria-busy', 'true');
		}

		function hideFormFillOverlay(){
			var overlay = document.getElementById('tpwl-form-fill-overlay');
			if(!overlay) return;
			overlay.classList.remove('is-on');
			overlay.removeAttribute('aria-busy');
		}

		function fillRouteAndContinue(route){
			if(routeFillLock) return;
			var shadow = getSearchShadow();
			if(!shadow || !route || !route.destination) return;
			var origin = route.origin || 'MOW';
			var destination = route.destination;
			if(origin === destination) return;
			if(getPlaceInputs(shadow).length < 2){
				scrollToForm();
				return;
			}
			routeFillLock = true;
			showFormFillOverlay();
			setTimeout(function(){
				routeFillLock = false;
				hideFormFillOverlay();
			}, 8000);
			scrollToForm();
			/* always reset both fields so previous origin is not kept */
			var inputs = getPlaceInputs(shadow);
			if(inputs[0]) clearPlaceField(inputs[0]);
			if(inputs[1]) clearPlaceField(inputs[1]);
			setTimeout(function(){
				fillPlaceFieldByIndex(0, origin, function(){
					setTimeout(function(){
						fillPlaceFieldByIndex(1, destination, function(){
							setTimeout(function(){
								routeFillLock = false;
								hideFormFillOverlay();
								try { if(document.activeElement) document.activeElement.blur(); } catch(e) {}
							}, 180);
						}, true);
					}, 400);
				}, true);
			}, 180);
		}

		function routesPhotoTitleCss(){
			return [
				'[data-amolab-photo]{position:relative!important;}',
				'[data-amolab-photo]:after{',
				'content:""!important;',
				'position:absolute!important;',
				'inset:0!important;',
				'background:rgba(0,0,0,.36)!important;',
				'pointer-events:none!important;',
				'z-index:1!important;',
				'}',
				'[data-amolab-photo] > *,',
				'[data-amolab-photo] span,',
				'[data-amolab-photo] div,',
				'[data-amolab-photo] p,',
				'[data-amolab-photo] strong,',
				'[data-amolab-photo] b,',
				'[data-amolab-photo] h1,',
				'[data-amolab-photo] h2,',
				'[data-amolab-photo] h3{',
				'position:relative!important;',
				'z-index:2!important;',
				'color:#fff!important;',
				'-webkit-text-fill-color:#fff!important;',
				'opacity:1!important;',
				'text-shadow:0 1px 3px rgba(0,0,0,.55)!important;',
				'}'
			].join('');
		}

		function routesWidgetCss(dark){
			var radius = '16px';
			var killBottom = [
				'table{border-bottom:none!important;}',
				'tr:last-child td,tr:last-child th{border-bottom:none!important;box-shadow:none!important;}',
				'[class*="footer"],[class*="bottom"]{border-bottom:none!important;box-shadow:none!important;}'
			].join('');
			if(!dark){
				return [
					':host{',
					'display:block!important;',
					'border-radius:' + radius + '!important;',
					'overflow:hidden!important;',
					'border:none!important;',
					'box-shadow:none!important;',
					'background:transparent!important;',
					'--primary-color:var(--bs-primary)!important;',
					'}',
					':host > div,',
					':host > *{',
					'border-radius:' + radius + '!important;',
					'overflow:hidden!important;',
					'}',
					'img{border-radius:' + radius + ' ' + radius + ' 0 0!important;}',
					routesPhotoTitleCss(),
					/* header labels — muted (Город вылета / Цена от) */
					'tr:first-child td,tr:first-child th,tr:first-child td *,tr:first-child th *,',
					'[class*="head"],[class*="Head"],[class*="subheader"],[class*="Subheader"],',
					'[class*="head"] *,[class*="Head"] *,[class*="subheader"] *,[class*="Subheader"] *{',
					'color:#94a3b8!important;',
					'fill:#94a3b8!important;',
					'opacity:1!important;',
					'}',
					'tr:first-child td,tr:first-child th,',
					'[class*="head"],[class*="Head"],[class*="subheader"],[class*="Subheader"]{',
					'border-bottom:1px solid #e2e8f0!important;',
					'border-color:#e2e8f0!important;',
					'}',
					/* departure city column — soft bottom border */
					'#wrapper,',
					'[data-testid="wrapper"]{',
					'border-bottom:1px solid #e2e8f0!important;',
					'}',
					/* prices — brand primary */
					'tr:not(:first-child) [class*="price"],',
					'tr:not(:first-child) [class*="Price"],',
					'tr:not(:first-child) [class*="price"] *,',
					'tr:not(:first-child) [class*="Price"] *,',
					'td:last-child:not(:first-child),',
					'td:last-child:not(:first-child) *,',
					'tr:not(:first-child) td:last-child,',
					'tr:not(:first-child) td:last-child *,',
					'#wrapper2 > *:not(:first-child),',
					'#wrapper2 > *:not(:first-child) *,',
					'[data-testid="wrapper2"] > *:not(:first-child),',
					'[data-testid="wrapper2"] > *:not(:first-child) *,',
					'[class*="price"],',
					'[class*="Price"],',
					'[class*="price"] *,',
					'[class*="Price"] *{',
					'color:var(--bs-primary)!important;',
					'}',
					/* hard-kill row hover */
					'a:hover,a:hover *,tr:hover,tr:hover *,td:hover,th:hover,li:hover,li:hover *,',
					'table tr:hover,table tr:hover td,table tr:hover th,tbody tr:hover,tbody tr:hover td{',
					'background:transparent!important;',
					'background-color:transparent!important;',
					'background-image:none!important;',
					'box-shadow:none!important;',
					'outline:none!important;',
					'}',
					'table tr:hover,tbody tr:hover{background-color:#fff!important;}',
					'tr:hover:before,tr:hover:after,td:hover:before,a:hover:before,li:hover:before{',
					'display:none!important;content:none!important;opacity:0!important;background:none!important;',
					'}',
					killBottom,
					'table,tbody,tr,td,th,div,ul,li{margin-bottom:0!important;}',
					'table,tbody{padding-bottom:0!important;}'
				].join('');
			}
			var bg = '#0f172a';
			var border = '#334155';
			var borderSoft = '#1e293b';
			var text = '#e2e8f0';
			var muted = '#94a3b8';
			var link = 'var(--bs-primary)';
			return [
				':host{',
				'display:block!important;',
				'border-radius:' + radius + '!important;',
				'overflow:hidden!important;',
				'background:transparent!important;',
				'color:' + text + '!important;',
				'border:none!important;',
				'box-shadow:none!important;',
				'--primary-color:var(--bs-primary)!important;',
				'}',
				':host > div,',
				':host > *{',
				'border-radius:' + radius + '!important;',
				'overflow:hidden!important;',
				'color:' + text + '!important;',
				'}',
				'img{',
				'border-radius:' + radius + ' ' + radius + ' 0 0!important;',
				'}',
				routesPhotoTitleCss(),
				/* header same as card body — muted labels */
				'thead, th,',
				'tr:first-child,',
				'tr:first-child td,',
				'tr:first-child th,',
				'[class*="head"],',
				'[class*="Head"],',
				'[class*="caption"],',
				'[class*="Caption"],',
				'[class*="subheader"],',
				'[class*="Subheader"]{',
				'background:' + bg + '!important;',
				'background-color:' + bg + '!important;',
				'background-image:none!important;',
				'color:' + muted + '!important;',
				'border-bottom:1px solid ' + borderSoft + '!important;',
				'border-color:' + borderSoft + '!important;',
				'}',
				'tr:first-child td *,',
				'tr:first-child th *,',
				'[class*="head"] *,',
				'[class*="Head"] *,',
				'[class*="subheader"] *,',
				'[class*="Subheader"] *{',
				'color:' + muted + '!important;',
				'fill:' + muted + '!important;',
				'opacity:1!important;',
				'}',
				/* departure city column — soft bottom border */
				'#wrapper,',
				'[data-testid="wrapper"]{',
				'border-bottom:1px solid ' + borderSoft + '!important;',
				'}',
				'table, thead, tbody, tr, td, th, ul, li, p, span, div{',
				'color:' + text + '!important;',
				'border-color:' + border + '!important;',
				'}',
				'table, tbody, tr{',
				'background-color:' + bg + '!important;',
				'}',
				'td{',
				'background-color:transparent!important;',
				'}',
				'thead, th,',
				'tr:first-child,',
				'tr:first-child td,',
				'tr:first-child th{',
				'background-color:' + bg + '!important;',
				'color:' + muted + '!important;',
				'border-bottom:1px solid ' + borderSoft + '!important;',
				'border-color:' + borderSoft + '!important;',
				'}',
				'tr:first-child td *,',
				'tr:first-child th *{',
				'color:' + muted + '!important;',
				'fill:' + muted + '!important;',
				'opacity:1!important;',
				'}',
				'a{',
				'color:' + text + '!important;',
				'background:transparent!important;',
				'background-color:transparent!important;',
				'}',
				'tbody a, table a, li a, [class*="list"] a, [class*="origin"] a, [class*="city"] a{',
				'color:' + text + '!important;',
				'}',
				/* hard-kill row hover (widget primary blue) */
				'a:hover,a:hover *,',
				'tr:hover,tr:hover *,',
				'td:hover,th:hover,',
				'li:hover,li:hover *,',
				'table tr:hover,table tr:hover td,table tr:hover th,',
				'tbody tr:hover,tbody tr:hover td,tbody tr:hover th{',
				'background:transparent!important;',
				'background-color:transparent!important;',
				'background-image:none!important;',
				'box-shadow:none!important;',
				'outline:none!important;',
				'filter:none!important;',
				'}',
				'table tr:hover,tbody tr:hover{',
				'background-color:' + bg + '!important;',
				'}',
				'table tr:hover td,tbody tr:hover td,table tr:hover span,tbody tr:hover span{',
				'background:transparent!important;',
				'background-color:transparent!important;',
				'color:' + text + '!important;',
				'}',
				'table tr:hover td:last-child,tbody tr:hover td:last-child{',
				'color:' + link + '!important;',
				'}',
				'tr:hover:before,tr:hover:after,td:hover:before,td:hover:after,',
				'a:hover:before,a:hover:after,li:hover:before,li:hover:after{',
				'display:none!important;',
				'content:none!important;',
				'opacity:0!important;',
				'background:none!important;',
				'border:none!important;',
				'}',
				'tr:not(:first-child) [class*="price"],',
				'tr:not(:first-child) [class*="Price"],',
				'tr:not(:first-child) [class*="price"] *,',
				'tr:not(:first-child) [class*="Price"] *,',
				'td:last-child:not(:first-child),',
				'td:last-child:not(:first-child) *,',
				'tr:not(:first-child) td:last-child,',
				'tr:not(:first-child) td:last-child *,',
				'#wrapper2 > *:not(:first-child),',
				'#wrapper2 > *:not(:first-child) *,',
				'[data-testid="wrapper2"] > *:not(:first-child),',
				'[data-testid="wrapper2"] > *:not(:first-child) *,',
				'[class*="price"],',
				'[class*="Price"],',
				'[class*="price"] *,',
				'[class*="Price"] *{',
				'color:' + link + '!important;',
				'}',
				'[class*="list"],',
				'[class*="prices"],',
				'[class*="content"],',
				'[class*="body"],',
				'[class*="footer"]{',
				'background-color:' + bg + '!important;',
				'color:' + text + '!important;',
				'}',
				killBottom,
				'table,tbody,tr,td,th,div,ul,li{margin-bottom:0!important;}',
				'table,tbody{padding-bottom:0!important;}'
			].join('');
		}

		function isNearWhiteBg(color){
			if(!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') return false;
			var m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
			if(!m) return false;
			return (+m[1] > 235 && +m[2] > 235 && +m[3] > 235);
		}

		function isLightPanelBg(color){
			if(!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') return false;
			var m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
			if(!m) return false;
			var r = +m[1], g = +m[2], b = +m[3];
			/* white or lighter-than-card slate panels */
			if(r > 235 && g > 235 && b > 235) return true;
			if(r > 40 && g > 50 && b > 70 && r < 80 && g < 100 && b < 130) return true; /* ~#1e293b */
			return false;
		}

		function clearRoutesInlineStyles(root){
			if(!root || !root.querySelectorAll) return;
			var nodes = root.querySelectorAll('[style]');
			for(var i = 0; i < nodes.length; i++){
				var el = nodes[i];
				if(!el || !el.style || el.tagName === 'IMG') continue;
				if(el.closest && el.closest('[data-amolab-photo]')) continue;
				if(el.getAttribute && el.getAttribute('data-amolab-photo') !== null) continue;
				if((el.className + '').indexOf('amolab-photo-dim') !== -1) continue;
				var bi = el.style.getPropertyValue('background-image') || '';
				var keepPhoto = bi.indexOf('url(') !== -1;
				var bg = el.style.getPropertyValue('background-color') || '';
				var col = el.style.getPropertyValue('color') || '';
				var bc = el.style.getPropertyValue('border-color') || '';
				/* strip our dark-theme paints (hex + rgb forms) */
				var ourDarkBg = /15,\s*23,\s*42|30,\s*41,\s*59|#0f172a|#1e293b/i.test(bg);
				var ourMuted = /148,\s*163,\s*184|226,\s*232,\s*240|#94a3b8|#e2e8f0/i.test(col);
				var ourBorder = /51,\s*65,\s*85|#334155/i.test(bc);
				if(ourDarkBg){
					el.style.removeProperty('background-color');
					if(!keepPhoto){
						el.style.removeProperty('background');
						el.style.removeProperty('background-image');
					}
				}
				if(ourMuted) el.style.removeProperty('color');
				if(ourBorder) el.style.removeProperty('border-color');
				el.style.removeProperty('box-shadow');
				el.style.removeProperty('outline');
				el.style.removeProperty('filter');
			}
		}

		function routePriceColor(){
			var v = '';
			try{
				v = (window.getComputedStyle(document.documentElement).getPropertyValue('--bs-primary') || '').trim();
			}catch(err){}
			return v || (isDark() ? amolabColor('icons') : amolabColor('primary'));
		}

		function isRoutePriceText(t){
			if(!t) return false;
			t = (t + '').replace(/\s+/g, ' ').trim();
			if(!t || t === 'Цена от' || t === 'Город вылета') return false;
			/* 8 918 ₽ / 8918 руб / from 1234 */
			return /\d[\d\s\u00a0]*\s*(₽|руб\.?|rub)?$/i.test(t) && t.length < 24;
		}

		function paintRoutePrices(root){
			if(!root || !root.querySelectorAll) return;
			var color = routePriceColor();
			var nodes = root.querySelectorAll('a, span, td, th, div, p, strong, b');
			for(var i = 0; i < nodes.length; i++){
				var el = nodes[i];
				if(!el || el.tagName === 'IMG') continue;
				if(el.closest && el.closest('[data-amolab-photo]')) continue;
				var cls = (el.className + '');
				var inPriceCol = !!(el.id === 'wrapper2' || (el.closest && (el.closest('#wrapper2') || el.closest('[data-testid="wrapper2"]'))));
				var byClass = /price|Price/i.test(cls);
				var byCell = false;
				if(el.tagName === 'TD' && typeof el.cellIndex === 'number' && el.cellIndex > 0){
					var row = el.parentElement;
					if(row && row.rowIndex > 0) byCell = true;
				}
				if(el.closest){
					var cell = el.closest('td');
					if(cell && cell.cellIndex > 0){
						var r = cell.parentElement;
						if(r && r.rowIndex > 0) byCell = true;
					}
				}
				var t = (el.childNodes && el.childNodes.length === 1 && el.childNodes[0].nodeType === 3)
					? (el.textContent || '')
					: ((el.children && el.children.length) ? '' : (el.textContent || ''));
				t = t.replace(/\s+/g, ' ').trim();
				var byText = isRoutePriceText(t);
				/* price column items except the header label */
				var byPriceColItem = false;
				if(inPriceCol && t && t !== 'Цена от' && (byText || /\d/.test(t))){
					byPriceColItem = true;
				}
				if(!(byClass || byCell || byText || byPriceColItem)) continue;
				if(t === 'Цена от' || t === 'Город вылета') continue;
				el.style.setProperty('color', color, 'important');
				var kids = el.querySelectorAll('span, strong, b, em');
				for(var j = 0; j < kids.length; j++){
					var kt = (kids[j].textContent || '').replace(/\s+/g, ' ').trim();
					if(kt === 'Цена от') continue;
					kids[j].style.setProperty('color', color, 'important');
				}
			}
		}

		function unifyRouteHeaderColors(root){
			if(!root || !root.querySelectorAll) return;
			var color = '#94a3b8';
			var border = isDark() ? '#1e293b' : '#e2e8f0';
			var nodes = root.querySelectorAll('td, th, span, p, div');
			var painted = [];
			for(var i = 0; i < nodes.length; i++){
				var el = nodes[i];
				if(!el || (el.closest && el.closest('[data-amolab-photo]'))) continue;
				/* only leaf-ish labels — avoid whole-card textContent matches */
				if(el.children && el.children.length > 3) continue;
				var t = (el.textContent || '').replace(/\s+/g, ' ').trim();
				if(t !== 'Город вылета' && t !== 'Цена от') continue;
				var row = el.closest ? el.closest('tr') : null;
				var box = row || el.parentElement || el;
				if(painted.indexOf(box) !== -1) continue;
				painted.push(box);
				var targets = box.querySelectorAll('td, th, span, p, svg, path, use');
				for(var j = 0; j < targets.length; j++){
					targets[j].style.setProperty('color', color, 'important');
					targets[j].style.setProperty('fill', color, 'important');
					targets[j].style.setProperty('opacity', '1', 'important');
				}
				box.style.setProperty('color', color, 'important');
				box.style.setProperty('border-bottom-color', border, 'important');
				box.style.setProperty('border-color', border, 'important');
			}
		}

		function fixLightRouteListText(root){
			if(!root || !root.querySelectorAll || isDark()) return;
			var texts = root.querySelectorAll('td, span, a, p, li');
			for(var i = 0; i < texts.length; i++){
				var tx = texts[i];
				if(!tx || tx.tagName === 'IMG') continue;
				if(tx.closest && tx.closest('[data-amolab-photo]')) continue;
				/* never recolor price column / price-like values */
				if(tx.closest && (tx.closest('#wrapper2') || tx.closest('[data-testid="wrapper2"]'))) continue;
				var cls = (tx.className + '');
				if(/price|Price|head|Head|caption|Caption|subheader|Subheader/i.test(cls)) continue;
				var parent = tx.parentElement;
				if(parent && /price|Price|head|Head|caption|Caption/i.test(parent.className + '')) continue;
				if(tx.tagName === 'TH') continue;
				var raw = (tx.textContent || '').replace(/\s+/g, ' ').trim();
				if(isRoutePriceText(raw)) continue;
				if(tx.closest){
					var row = tx.closest('tr');
					if(row && typeof row.rowIndex === 'number' && row.rowIndex === 0) continue;
					var cell = tx.closest('td');
					if(cell && typeof cell.cellIndex === 'number' && cell.cellIndex > 0) continue;
				}else if(tx.tagName === 'TD'){
					if(parent && parent.rowIndex === 0) continue;
					if(tx.cellIndex > 0) continue;
				}
				var tcs = window.getComputedStyle(tx);
				if((tcs.backgroundImage || '').indexOf('url(') !== -1) continue;
				if(tx.style.getPropertyValue('color') === '#0f172a') continue;
				tx.style.setProperty('color', '#0f172a', 'important');
			}
		}

		function enhanceRoutePhotos(root){
			if(!root || !root.querySelectorAll) return;
			var nodes = root.querySelectorAll('div, a, section, figure, header');
			for(var i = 0; i < nodes.length; i++){
				var el = nodes[i];
				if(!el || el.tagName === 'IMG') continue;
				if(el.getAttribute && el.getAttribute('data-amolab-photo') !== null) continue;
				var cs = window.getComputedStyle(el);
				var bi = cs.backgroundImage || '';
				var hasBg = bi.indexOf('url(') !== -1;
				var hasImg = false;
				try{
					hasImg = !!(el.querySelector && el.querySelector(':scope > img'));
				}catch(err){
					hasImg = !!(el.firstElementChild && el.firstElementChild.tagName === 'IMG');
				}
				if(!hasBg && !hasImg) continue;
				if(el.offsetHeight > 0 && el.offsetHeight < 72) continue;
				el.setAttribute('data-amolab-photo', '1');
			}
		}

		function darkenRoutesWhitePanels(root){
			if(!root || !root.querySelectorAll) return;
			if(!isDark()){
				clearRoutesInlineStyles(root);
				fixLightRouteListText(root);
				unifyRouteHeaderColors(root);
				paintRoutePrices(root);
				enhanceRoutePhotos(root);
				return;
			}
			var nodes = root.querySelectorAll('div, section, header, thead, th, tr, td, table, span, p, ul, li');
			for(var i = 0; i < nodes.length; i++){
				var el = nodes[i];
				if(el.tagName === 'IMG') continue;
				if(el.getAttribute && el.getAttribute('data-amolab-photo') !== null) continue;
				var cs = window.getComputedStyle(el);
				var bi = cs.backgroundImage || '';
				if(bi.indexOf('url(') !== -1) continue;
				if(!isLightPanelBg(cs.backgroundColor) && !isNearWhiteBg(cs.backgroundColor)) continue;
				el.style.setProperty('background-color', '#0f172a', 'important');
				el.style.setProperty('background-image', 'none', 'important');
				el.style.setProperty('color', '#e2e8f0', 'important');
				el.style.setProperty('border-color', '#334155', 'important');
			}
			/* city names often keep widget dark-blue — force light text outside photo */
			var texts = root.querySelectorAll('td, th, span, a, p, li, div');
			for(var j = 0; j < texts.length; j++){
				var tx = texts[j];
				if(!tx || tx.tagName === 'IMG') continue;
				if(tx.closest && tx.closest('[data-amolab-photo]')) continue;
				var cls = (tx.className + '');
				if(/price|Price/i.test(cls)) continue;
				var parent = tx.parentElement;
				if(parent && /price|Price/i.test(parent.className + '')) continue;
				if(tx.tagName === 'TD' && tx.cellIndex > 0 && parent && parent.rowIndex > 0) continue;
				var tcs = window.getComputedStyle(tx);
				var tbi = tcs.backgroundImage || '';
				if(tbi.indexOf('url(') !== -1) continue;
				var m = (tcs.color || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
				if(!m) continue;
				var r = +m[1], g = +m[2], b = +m[3];
				/* skip cyan/sky prices */
				if(g > 150 && b > 200 && b >= g) continue;
				var lum = 0.299 * r + 0.587 * g + 0.114 * b;
				/* only lift dark / hard-to-read city text */
				if(lum < 145){
					tx.style.setProperty('color', '#e2e8f0', 'important');
				}
			}
			unifyRouteHeaderColors(root);
			paintRoutePrices(root);
			enhanceRoutePhotos(root);
		}


		function isHoverBlueBg(color){
			if(!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') return false;
			var m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
			if(!m) return false;
			var r = +m[1], g = +m[2], b = +m[3];
			if(b > 150 && g > 120 && b >= r) return true;
			if(r > 170 && g > 200 && b > 220 && b > r) return true;
			return false;
		}

		function isRoutesUiChrome(el){
			if(!el || !el.closest) return false;
			return !!(el.closest('.section-tag') || el.closest('.section-header'));
		}

		function neutralizeHoverEl(el){
			if(!el || !el.style) return;
			if(isRoutesUiChrome(el)) return;
			var tag = (el.tagName || '').toUpperCase();
			var fill = isDark() ? '#0f172a' : '#ffffff';
			if(tag === 'TD' || tag === 'TH' || tag === 'SPAN' || tag === 'P'){
				el.style.setProperty('background', 'transparent', 'important');
				el.style.setProperty('background-color', 'transparent', 'important');
			}else{
				el.style.setProperty('background', fill, 'important');
				el.style.setProperty('background-color', fill, 'important');
			}
			el.style.setProperty('background-image', 'none', 'important');
			el.style.setProperty('box-shadow', 'none', 'important');
			el.style.setProperty('outline', 'none', 'important');
			el.style.setProperty('filter', 'none', 'important');
		}

		function scrubRouteHoverBlues(root){
			if(!root || !root.querySelectorAll) return;
			var nodes = root.querySelectorAll('a, tr, td, th, li, div, span, p, section');
			for(var i = 0; i < nodes.length; i++){
				var el = nodes[i];
				if(el.tagName === 'IMG') continue;
				if(isRoutesUiChrome(el)) continue;
				var cs = window.getComputedStyle(el);
				var bi = cs.backgroundImage || '';
				if(bi.indexOf('url(') !== -1) continue;
				var blueBg = isHoverBlueBg(cs.backgroundColor);
				var blueGrad = /linear-gradient|radial-gradient/i.test(bi) && /rgb\(|#[0-9a-fA-F]{3,8}|cyan|sky|blue/i.test(bi);
				if(blueBg || blueGrad) neutralizeHoverEl(el);
			}
		}

		function bindKillRouteHover(root){
			if(!root || root.__amolabKillHover) return;
			root.__amolabKillHover = true;
			var ticking = false;
			function run(){
				ticking = false;
				scrubRouteHoverBlues(root);
			}
			function schedule(){
				if(ticking) return;
				ticking = true;
				requestAnimationFrame(run);
			}
			root.addEventListener('mouseover', function(e){
				var path = e.composedPath ? e.composedPath() : [];
				var list = path.length ? path : [e.target];
				for(var i = 0; i < list.length && i < 20; i++){
					var el = list[i];
					if(!el || el.nodeType !== 1) continue;
					if(isRoutesUiChrome(el)) continue;
					if(root !== el && root.contains && !root.contains(el) && !(el.getRootNode && el.getRootNode() === root)) continue;
					try{
						var cs = window.getComputedStyle(el);
						if(isHoverBlueBg(cs.backgroundColor)) neutralizeHoverEl(el);
					}catch(err){}
				}
				schedule();
				setTimeout(function(){ scrubRouteHoverBlues(root); }, 0);
				setTimeout(function(){ scrubRouteHoverBlues(root); }, 40);
			}, true);
			root.addEventListener('mousemove', schedule, true);
		}

		function injectRoutesShadowSkin(shadow){
			if(!shadow) return;
			var style = shadow.getElementById('amolab-routes-skin');
			if(!style){
				style = document.createElement('style');
				style.id = 'amolab-routes-skin';
				shadow.appendChild(style);
			}
			var css = routesWidgetCss(isDark());
			if(style.textContent !== css) style.textContent = css;
			/* do NOT re-append style — moving it retriggers MutationObserver forever */
			if(isDark()) darkenRoutesWhitePanels(shadow);
			else{
				clearRoutesInlineStyles(shadow);
				fixLightRouteListText(shadow);
				unifyRouteHeaderColors(shadow);
				paintRoutePrices(shadow);
				enhanceRoutePhotos(shadow);
			}
			bindKillRouteHover(shadow);
		}

		var routesSkinBusy = false;

		function routeCardHasContent(card){
			if(!card) return false;
			var kids = card.children;
			for(var i = 0; i < kids.length; i++){
				var n = kids[i];
				if(!n || n.tagName === 'SCRIPT') continue;
				if((n.className + '').indexOf('route-card-skeleton') !== -1) continue;
				if(n.shadowRoot){
					var sr = n.shadowRoot;
					if(sr.querySelector('table, img, a, [style*="background-image"], [class*="title"], [class*="price"]')) return true;
					if((sr.textContent || '').replace(/\s+/g, '').length > 20) return true;
				}
				if(n.querySelector && n.querySelector('table, img, iframe, a')) return true;
				if((n.textContent || '').replace(/\s+/g, '').length > 20) return true;
			}
			return false;
		}

		function hideRouteSkeletons(){
			var cards = document.querySelectorAll('#routes .route-card');
			for(var i = 0; i < cards.length; i++){
				var card = cards[i];
				if(card.classList.contains('is-ready')) continue;
				if(!routeCardHasContent(card)) continue;
				card.classList.add('is-ready');
				var sk = card.querySelector('.route-card-skeleton');
				if(sk) sk.classList.add('is-hidden');
			}
		}

		function restoreRoutesSectionChrome(routes){
			if(!routes || !routes.querySelectorAll) return;
			var chrome = routes.querySelectorAll('.section-tag, .section-tag *');
			for(var i = 0; i < chrome.length; i++){
				var el = chrome[i];
				if(!el || !el.style) continue;
				el.style.removeProperty('background');
				el.style.removeProperty('background-color');
				el.style.removeProperty('background-image');
				el.style.removeProperty('box-shadow');
				el.style.removeProperty('filter');
				el.style.removeProperty('outline');
				el.style.removeProperty('color');
				el.style.removeProperty('border-color');
			}
		}

		function applyRoutesSkin(){
			if(routesSkinBusy) return;
			var routes = document.getElementById('routes');
			if(!routes) return;
			routesSkinBusy = true;
			try{
				restoreRoutesSectionChrome(routes);
				hideRouteSkeletons();
				var nodes = routes.querySelectorAll('.route-card, .route-card *, .col-md-6, .col-lg-4');
				var seen = [];
				for(var i = 0; i < nodes.length; i++){
					var n = nodes[i];
					if(n.shadowRoot && seen.indexOf(n.shadowRoot) === -1){
						seen.push(n.shadowRoot);
						injectRoutesShadowSkin(n.shadowRoot);
					}
				}
				var cards = routes.querySelectorAll('.route-card');
				for(var j = 0; j < cards.length; j++){
					var kids = cards[j].children;
					for(var k = 0; k < kids.length; k++){
						if(kids[k].shadowRoot) injectRoutesShadowSkin(kids[k].shadowRoot);
					}
					if(isDark()) darkenRoutesWhitePanels(cards[j]);
					else{
						clearRoutesInlineStyles(cards[j]);
						fixLightRouteListText(cards[j]);
						unifyRouteHeaderColors(cards[j]);
						paintRoutePrices(cards[j]);
						enhanceRoutePhotos(cards[j]);
					}
					bindKillRouteHover(cards[j]);
				}
				bindKillRouteHover(routes);
				hideRouteSkeletons();
			}finally{
				routesSkinBusy = false;
			}
		}

		function bindRoutesSkin(){
			var routes = document.getElementById('routes');
			if(!routes || routes.__amolabRoutesSkin) return;
			routes.__amolabRoutesSkin = true;
			applyRoutesSkin();
			var t = null;
			var obs = new MutationObserver(function(){
				if(routesSkinBusy) return;
				clearTimeout(t);
				t = setTimeout(applyRoutesSkin, 120);
			});
			obs.observe(routes, {childList: true, subtree: true});
			var tries = 0;
			var poll = setInterval(function(){
				tries++;
				applyRoutesSkin();
				if(tries > 40) clearInterval(poll);
			}, 700);
		}

		function bindRoutesClick(){
			var routes = document.getElementById('routes');
			if(!routes || routes.__amolabRoutesBound) return;
			routes.__amolabRoutesBound = true;
			routes.addEventListener('click', function(e){
				var path = e.composedPath ? e.composedPath() : (e.path || [e.target]);
				var a = findAnchorInPath(path);
				if(!a) return;
				var href = a.href || a.getAttribute('href') || '';
				if(!href || href === '#' || href.indexOf('javascript:') === 0) return;
				/* only intercept outbound search / aviasales / tp.media redirects */
				if(!/aviasales|origin_iata|destination_iata|tp\.media|travelpayouts|\/search/i.test(href)) return;

				e.preventDefault();
				e.stopPropagation();
				if(e.stopImmediatePropagation) e.stopImmediatePropagation();

				var parsed = parseIataFromHref(href) || {};
				if(!parsed.destination){
					var dest = destinationFromPath(path);
					if(dest) parsed.destination = dest;
				}
				if(!parsed.origin){
					parsed.origin = originFromPath(path, a);
				}
				/* never reuse previous form origin — only click/href/default */
				if(!parsed.origin) parsed.origin = 'MOW';
				if(!parsed.destination) return;
				fillRouteAndContinue(parsed);
			}, true);
		}

		function formMounted(el){
			return !!(el && el.shadowRoot && el.shadowRoot.querySelector('form, [class*="SearchEdit"], button[type="submit"]'));
		}

		function applyWlSkin(){
			var el = document.getElementById('tpwl-search');
			if(!el || !el.shadowRoot) return false;
			setHostVars(el);
			if(!formMounted(el)) return false;
			injectShadowSkin(el.shadowRoot);
			bindSearchScroll(el.shadowRoot);
			if(!hostObserver){
				hostObserver = new MutationObserver(function(){
					if(applying) return;
					setHostVars(el);
				});
				hostObserver.observe(el, {attributes: true, attributeFilter: ['style']});
			}
			skinReady = true;
			requestAnimationFrame(function(){
				requestAnimationFrame(hideWidgetStub);
			});
			return true;
		}

		var tries = 0;
		var poll = setInterval(function(){
			tries++;
			if(applyWlSkin() || tries > 80) clearInterval(poll);
		}, 100);

		/* wait for widget-created #tpwl-modals — no DOM walk, no body observers */
		var modalsTries = 0;
		var modalsPoll = setInterval(function(){
			modalsTries++;
			if(applyModalsSkin() || modalsTries > 120) clearInterval(modalsPoll);
		}, 250);

		/* tickets appear after search — keep re-applying while results live */
		var ticketsTries = 0;
		var ticketsPoll = setInterval(function(){
			ticketsTries++;
			applyTicketsSkin();
			if(typeof window.__amolabSyncResultsVisibility === 'function'){
				window.__amolabSyncResultsVisibility();
			}
			var tel = document.getElementById('tpwl-tickets');
			if(ticketsTries > 150 && !(tel && tel.shadowRoot)) clearInterval(ticketsPoll);
			if(ticketsTries > 600) clearInterval(ticketsPoll);
		}, 500);

		/* while results are open, gently refresh skin (widget resets vars) */
		setInterval(function(){
			if(!isDark()) return;
			var t = document.getElementById('tpwl-tickets');
			if(t && t.shadowRoot && t.shadowRoot.querySelector('[class*="FlightCard"], [class*="TicketsWidget"]')){
				applyTicketsSkin();
			}
		}, 2000);

		window.__amolabApplyTicketsSkin = applyTicketsSkin;

		$('#themeToggle').on('click', function(){
			setTimeout(function(){
				var el = document.getElementById('tpwl-search');
				if(el && el.shadowRoot){
					setHostVars(el);
					if(formMounted(el)) injectShadowSkin(el.shadowRoot);
					else injectDocumentPopupSkin();
				}
				applyModalsSkin();
				applyTicketsSkin();
				applyRoutesSkin();
				if(typeof window.__amolabSyncResultsVisibility === 'function'){
					window.__amolabSyncResultsVisibility();
				}
				/* second pass after theme class settles / widget paints */
				setTimeout(applyRoutesSkin, 80);
			}, 40);
		});

		bindRoutesClick();
		bindRoutesSkin();
		window.__amolabApplyRoutesSkin = applyRoutesSkin;
	})();

	var resultsScrolled = false;

	function hasTicketResults(){
		var el = document.getElementById('tpwl-tickets');
		if(!el) return false;
		if(el.children.length) return true;
		var sr = el.shadowRoot;
		if(!sr) return false;
		return !!sr.querySelector(
			'[class*="FlightCard"],' +
			'[class*="TicketsWidget"],' +
			'[class*="TicketsWidgetSkeleton"],' +
			'[class*="FlightFilters"],' +
			'[class*="FlightMatrix"],' +
			'[class*="DirectFlights"],' +
			'[class*="progressBar"]'
		);
	}

	var hadTicketResults = false;

	function syncResultsVisibility(){
		var has = hasTicketResults();
		document.body.classList.toggle('wl-has-results', has);
		/* apply skin once when results first appear — avoid style→observer loop */
		if(has && !hadTicketResults && typeof window.__amolabApplyTicketsSkin === 'function'){
			window.__amolabApplyTicketsSkin();
		}
		/* scroll to results without waiting only for submit timer — after SPA search */
		if(has && !hadTicketResults && typeof window.__amolabScrollToResults === 'function'){
			window.__amolabScrollToResults();
		}
		hadTicketResults = has;
		if(!has) resultsScrolled = false;
	}

	window.__amolabSyncResultsVisibility = syncResultsVisibility;

	function bindTicketsResultsObserver(){
		var el = document.getElementById('tpwl-tickets');
		if(!el || el.__amolabResultsObs) return;
		el.__amolabResultsObs = true;

		var t = null;
		function schedule(){
			clearTimeout(t);
			t = setTimeout(syncResultsVisibility, 40);
		}

		/* light DOM only — do not watch style attrs (setHostVars would loop) */
		var hostObs = new MutationObserver(schedule);
		hostObs.observe(el, {childList: true, subtree: true});

		function watchShadow(){
			var sr = el.shadowRoot;
			if(!sr || sr.__amolabResultsObs) return;
			sr.__amolabResultsObs = true;
			var shadowObs = new MutationObserver(schedule);
			shadowObs.observe(sr, {childList: true, subtree: true});
			schedule();
		}

		watchShadow();
		var shadowTries = 0;
		var shadowPoll = setInterval(function(){
			shadowTries++;
			watchShadow();
			syncResultsVisibility();
			if((el.shadowRoot && el.shadowRoot.__amolabResultsObs) || shadowTries > 120){
				clearInterval(shadowPoll);
			}
		}, 250);

		syncResultsVisibility();
	}

	bindTicketsResultsObserver();

}