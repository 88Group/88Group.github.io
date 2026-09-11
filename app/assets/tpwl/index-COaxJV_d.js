import { g as Oc, w as Lc, a as Rc, _ as w, i as Dn, f as mi, b as $i, c as wn, d as Ys, k as Ie, h as Pc, N as Bc, x as $c, I as jc, e as Ce, u as o, j as B, A as It, l as Y, m as Vc, n as Q, s as _, y as re, F as qc, o as Uc, p as Zr, q as Ti, r as Pe, t as $e, v as _t, z as Ze, S as Ga, B as Ge, C as ye, D as st, E as Za, G as lr, H as Js, J as Xs, T as Rr, K as Tn, L as el, M as Qc, O as Wc, P as Ae, Q as zc, R as tl, U as Hc, V as xo, W as On, X as Gc, Y as br, Z as Zc, $ as Kc, a0 as Ka, a1 as Yc, a2 as Ya, a3 as Jc, a4 as Xc, a5 as eu, a6 as fa, a7 as tu, a8 as ru, a9 as Fo, aa as nu, ab as Mt, ac as rl, ad as pa, ae as Ct, af as k, ag as nt, ah as Yt, ai as Jt, aj as At, ak as iu, al as au, am as ou, an as su, ao as lu, ap as cu, aq as Eo, ar as uu, as as du, at as hu, au as fu } from "./main-Bxwjt8cf.js";
var pu = {
  area: !0,
  base: !0,
  br: !0,
  col: !0,
  embed: !0,
  hr: !0,
  img: !0,
  input: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0
};
const _u = /* @__PURE__ */ Oc(pu);
var gu = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;
function Mo(t) {
  var e = { type: "tag", name: "", voidElement: !1, attrs: {}, children: [] }, r = t.match(/<\/?([^\s]+?)[/\s>]/);
  if (r && (e.name = r[1], (_u[r[1]] || t.charAt(t.length - 2) === "/") && (e.voidElement = !0), e.name.startsWith("!--"))) {
    var n = t.indexOf("-->");
    return { type: "comment", comment: n !== -1 ? t.slice(4, n) : "" };
  }
  for (var i = new RegExp(gu), a = null; (a = i.exec(t)) !== null; ) if (a[0].trim()) if (a[1]) {
    var s = a[1].trim(), l = [s, ""];
    s.indexOf("=") > -1 && (l = s.split("=")), e.attrs[l[0]] = l[1], i.lastIndex--;
  } else a[2] && (e.attrs[a[2]] = a[3].trim().substring(1, a[3].length - 1));
  return e;
}
var mu = /<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g, vu = /^\s*$/, yu = /* @__PURE__ */ Object.create(null);
function nl(t, e) {
  switch (e.type) {
    case "text":
      return t + e.content;
    case "tag":
      return t += "<" + e.name + (e.attrs ? function(r) {
        var n = [];
        for (var i in r) n.push(i + '="' + r[i] + '"');
        return n.length ? " " + n.join(" ") : "";
      }(e.attrs) : "") + (e.voidElement ? "/>" : ">"), e.voidElement ? t : t + e.children.reduce(nl, "") + "</" + e.name + ">";
    case "comment":
      return t + "<!--" + e.comment + "-->";
  }
}
var bu = { parse: function(t, e) {
  e || (e = {}), e.components || (e.components = yu);
  var r, n = [], i = [], a = -1, s = !1;
  if (t.indexOf("<") !== 0) {
    var l = t.indexOf("<");
    n.push({ type: "text", content: l === -1 ? t : t.substring(0, l) });
  }
  return t.replace(mu, function(c, u) {
    if (s) {
      if (c !== "</" + r.name + ">") return;
      s = !1;
    }
    var d, h = c.charAt(1) !== "/", f = c.startsWith("<!--"), p = u + c.length, m = t.charAt(p);
    if (f) {
      var y = Mo(c);
      return a < 0 ? (n.push(y), n) : ((d = i[a]).children.push(y), n);
    }
    if (h && (a++, (r = Mo(c)).type === "tag" && e.components[r.name] && (r.type = "component", s = !0), r.voidElement || s || !m || m === "<" || r.children.push({ type: "text", content: t.slice(p, t.indexOf("<", p)) }), a === 0 && n.push(r), (d = i[a - 1]) && d.children.push(r), i[a] = r), (!h || r.voidElement) && (a > -1 && (r.voidElement || r.name === c.slice(2, -1)) && (a--, r = a === -1 ? n : i[a]), !s && m !== "<" && m)) {
      d = a === -1 ? n : i[a].children;
      var v = t.indexOf("<", p), g = t.slice(p, v === -1 ? void 0 : v);
      vu.test(g) && (g = " "), (v > -1 && a + d.length >= 0 || g !== " ") && d.push({ type: "text", content: g });
    }
  }), n;
}, stringify: function(t) {
  return t.reduce(function(e, r) {
    return e + nl("", r);
  }, "");
} };
const ji = (t, e) => {
  var n;
  if (!t) return !1;
  const r = ((n = t.props) == null ? void 0 : n.children) ?? t.children;
  return e ? r.length > 0 : !!r;
}, Vi = (t) => {
  var r, n;
  if (!t) return [];
  const e = ((r = t.props) == null ? void 0 : r.children) ?? t.children;
  return (n = t.props) != null && n.i18nIsDynamicList ? Pr(e) : e;
}, Cu = (t) => Array.isArray(t) && t.every(mi), Pr = (t) => Array.isArray(t) ? t : [t], wu = (t, e) => {
  const r = {
    ...e
  };
  return r.props = Object.assign(t.props, e.props), r;
}, il = (t, e) => {
  if (!t) return "";
  let r = "";
  const n = Pr(t), i = e != null && e.transSupportBasicHtmlNodes ? e.transKeepBasicHtmlNodesFor ?? [] : [];
  return n.forEach((a, s) => {
    if (Dn(a))
      r += `${a}`;
    else if (mi(a)) {
      const {
        props: l,
        type: c
      } = a, u = Object.keys(l).length, d = i.indexOf(c) > -1, h = l.children;
      if (!h && d && !u)
        r += `<${c}/>`;
      else if (!h && (!d || u) || l.i18nIsDynamicList)
        r += `<${s}></${s}>`;
      else if (d && u === 1 && Dn(h))
        r += `<${c}>${h}</${c}>`;
      else {
        const f = il(h, e);
        r += `<${s}>${f}</${s}>`;
      }
    } else if (a === null)
      $i("Trans: the passed in value is invalid - seems you passed in a null child.");
    else if (wn(a)) {
      const {
        format: l,
        ...c
      } = a, u = Object.keys(c);
      if (u.length === 1) {
        const d = l ? `${u[0]}, ${l}` : u[0];
        r += `{{${d}}}`;
      } else
        $i("react-i18next: the passed in object contained more than one variable - the object should look like {{ value, format }} where format is optional.", a);
    } else
      $i("Trans: the passed in value is invalid - seems you passed in a variable like {number} - please pass in variables for interpolation as full objects like {{number}}.", a);
  }), r;
}, Tu = (t, e, r, n, i, a) => {
  if (e === "") return [];
  const s = n.transKeepBasicHtmlNodesFor || [], l = e && new RegExp(s.map((v) => `<${v}`).join("|")).test(e);
  if (!t && !l && !a) return [e];
  const c = {}, u = (v) => {
    Pr(v).forEach((b) => {
      Dn(b) || (ji(b) ? u(Vi(b)) : wn(b) && !mi(b) && Object.assign(c, b));
    });
  };
  u(t);
  const d = bu.parse(`<0>${e}</0>`), h = {
    ...c,
    ...i
  }, f = (v, g, b) => {
    var N;
    const C = Vi(v), x = m(C, g.children, b);
    return Cu(C) && x.length === 0 || (N = v.props) != null && N.i18nIsDynamicList ? C : x;
  }, p = (v, g, b, C, x) => {
    v.dummy ? (v.children = g, b.push(Pc(v, {
      key: C
    }, x ? void 0 : g))) : b.push(...Bc.map([v], (N) => {
      const T = {
        ...N.props
      };
      return delete T.i18nIsDynamicList, w(N.type, {
        ...T,
        key: C,
        ref: N.ref
      }, x ? null : g);
    }));
  }, m = (v, g, b) => {
    const C = Pr(v);
    return Pr(g).reduce((N, T, M) => {
      var R, $;
      const S = (($ = (R = T.children) == null ? void 0 : R[0]) == null ? void 0 : $.content) && r.services.interpolator.interpolate(T.children[0].content, h, r.language);
      if (T.type === "tag") {
        let V = C[parseInt(T.name, 10)];
        b.length === 1 && !V && (V = b[0][T.name]), V || (V = {});
        const J = Object.keys(T.attrs).length !== 0 ? wu({
          props: T.attrs
        }, V) : V, F = mi(J), I = F && ji(T, !0) && !T.voidElement, O = l && wn(J) && J.dummy && !F, H = wn(t) && Object.hasOwnProperty.call(t, T.name);
        if (Dn(J)) {
          const W = r.services.interpolator.interpolate(J, h, r.language);
          N.push(W);
        } else if (ji(J) || I) {
          const W = f(J, T, b);
          p(J, W, N, M);
        } else if (O) {
          const W = m(C, T.children, b);
          p(J, W, N, M);
        } else if (Number.isNaN(parseFloat(T.name)))
          if (H) {
            const W = f(J, T, b);
            p(J, W, N, M, T.voidElement);
          } else if (n.transSupportBasicHtmlNodes && s.indexOf(T.name) > -1)
            if (T.voidElement)
              N.push(w(T.name, {
                key: `${T.name}-${M}`
              }));
            else {
              const W = m(C, T.children, b);
              N.push(w(T.name, {
                key: `${T.name}-${M}`
              }, W));
            }
          else if (T.voidElement)
            N.push(`<${T.name} />`);
          else {
            const W = m(C, T.children, b);
            N.push(`<${T.name}>${W}</${T.name}>`);
          }
        else if (wn(J) && !F) {
          const W = T.children[0] ? S : null;
          W && N.push(W);
        } else
          p(J, S, N, M, T.children.length !== 1 || !S);
      } else if (T.type === "text") {
        const V = n.transWrapTextNodes, J = a ? n.unescape(r.services.interpolator.interpolate(T.content, h, r.language)) : r.services.interpolator.interpolate(T.content, h, r.language);
        V ? N.push(w(V, {
          key: `${T.name}-${M}`
        }, J)) : N.push(J);
      }
      return N;
    }, []);
  }, y = m([{
    dummy: !0,
    children: t || []
  }], d, Pr(t || []));
  return Vi(y[0]);
};
function ku({
  children: t,
  count: e,
  parent: r,
  i18nKey: n,
  context: i,
  tOptions: a = {},
  values: s,
  defaults: l,
  components: c,
  ns: u,
  i18n: d,
  t: h,
  shouldUnescape: f,
  ...p
}) {
  var V, J, F, I;
  const m = d || Ys();
  if (!m)
    return Lc("You will need to pass in an i18next instance by using i18nextReactModule"), t;
  const y = h || m.t.bind(m) || ((O) => O), v = {
    ...Rc(),
    ...(V = m.options) == null ? void 0 : V.react
  };
  let g = u || y.ns || ((J = m.options) == null ? void 0 : J.defaultNS);
  g = Dn(g) ? [g] : g || ["translation"];
  const b = il(t, v), C = l || b || v.transEmptyNodeValue || n, {
    hashTransKey: x
  } = v, N = n || (x ? x(b || C) : b || C);
  (I = (F = m.options) == null ? void 0 : F.interpolation) != null && I.defaultVariables && (s = s && Object.keys(s).length > 0 ? {
    ...s,
    ...m.options.interpolation.defaultVariables
  } : {
    ...m.options.interpolation.defaultVariables
  });
  const T = s || e !== void 0 || !t ? a.interpolation : {
    interpolation: {
      ...a.interpolation,
      prefix: "#$?",
      suffix: "?$#"
    }
  }, M = {
    ...a,
    context: i || a.context,
    count: e,
    ...s,
    ...T,
    defaultValue: C,
    ns: g
  }, S = N ? y(N, M) : C;
  c && Object.keys(c).forEach((O) => {
    const H = c[O];
    if (typeof H.type == "function" || !H.props || !H.props.children || S.indexOf(`${O}/>`) < 0 && S.indexOf(`${O} />`) < 0) return;
    function W() {
      return w(Ie, null, H);
    }
    c[O] = w(W);
  });
  const R = Tu(c || t, S, m, v, M, f), $ = r ?? v.defaultTransParent;
  return $ ? w($, p, R) : R;
}
function al({
  children: t,
  count: e,
  parent: r,
  i18nKey: n,
  context: i,
  tOptions: a = {},
  values: s,
  defaults: l,
  components: c,
  ns: u,
  i18n: d,
  t: h,
  shouldUnescape: f,
  ...p
}) {
  var b;
  const {
    i18n: m,
    defaultNS: y
  } = $c(jc) || {}, v = d || m || Ys(), g = h || (v == null ? void 0 : v.t.bind(v));
  return ku({
    children: t,
    count: e,
    parent: r,
    i18nKey: n,
    context: i,
    tOptions: a,
    values: s,
    defaults: l,
    components: c,
    ns: u || (g == null ? void 0 : g.ns) || y || ((b = v == null ? void 0 : v.options) == null ? void 0 : b.defaultNS),
    i18n: v,
    t: h,
    shouldUnescape: f,
    ...p
  });
}
const Nu = "ClearableParameter-module__root___RwC7Z", xu = "ClearableParameter-module__clickable___goVVu", Fu = "ClearableParameter-module__medium___-37D3", Eu = "ClearableParameter-module__valueChanged___AkF5w", Mu = "ClearableParameter-module__clearBtn___omVNx", en = {
  root: Nu,
  clickable: xu,
  medium: Fu,
  valueChanged: Eu,
  clearBtn: Mu
}, Su = (t, e) => /* @__PURE__ */ w("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("circle", { cx: 8, cy: 8, r: 8, fill: "white" }), /* @__PURE__ */ w("path", { d: "M10.9248 4.18448C11.1708 3.93851 11.5696 3.93851 11.8155 4.18448C12.0615 4.43045 12.0615 4.82925 11.8155 5.07522L8.89074 8L11.8155 10.9248C12.0615 11.1708 12.0615 11.5696 11.8155 11.8155C11.5696 12.0615 11.1708 12.0615 10.9248 11.8155L8 8.89074L5.07522 11.8155C4.82925 12.0615 4.43045 12.0615 4.18448 11.8155C3.93851 11.5696 3.93851 11.1708 4.18448 10.9248L7.10926 8L4.18448 5.07522C3.93851 4.82925 3.93851 4.43045 4.18448 4.18448C4.43045 3.93851 4.82925 3.93851 5.07522 4.18448L8 7.10926L10.9248 4.18448Z", fill: "#07C369" }), /* @__PURE__ */ w("path", { d: "M10.9248 4.18448C11.1708 3.93851 11.5696 3.93851 11.8155 4.18448C12.0615 4.43045 12.0615 4.82925 11.8155 5.07522L8.89074 8L11.8155 10.9248C12.0615 11.1708 12.0615 11.5696 11.8155 11.8155C11.5696 12.0615 11.1708 12.0615 10.9248 11.8155L8 8.89074L5.07522 11.8155C4.82925 12.0615 4.43045 12.0615 4.18448 11.8155C3.93851 11.5696 3.93851 11.1708 4.18448 10.9248L7.10926 8L4.18448 5.07522C3.93851 4.82925 3.93851 4.43045 4.18448 4.18448C4.43045 3.93851 4.82925 3.93851 5.07522 4.18448L8 7.10926L10.9248 4.18448Z", fill: "black", fillOpacity: 0.1 })), Au = Ce(Su), rr = ({
  valueChanged: t,
  onClear: e,
  onClick: r,
  children: n,
  className: i,
  size: a = "small",
  ...s
}) => /* @__PURE__ */ o(
  "button",
  {
    type: "button",
    className: B(en.root, i, en[a], {
      [en.valueChanged]: t,
      [en.clickable]: r
    }),
    onClick: t ? e : r,
    disabled: !t && !r,
    ...s,
    children: [
      n,
      t && /* @__PURE__ */ o("div", { className: en.clearBtn, children: /* @__PURE__ */ o(Au, {}) })
    ]
  }
), Iu = "RangeInput-module__root___QmXdI", Du = "RangeInput-module__line___3-yN1", Ou = "RangeInput-module__before___bdp2P", Lu = "RangeInput-module__after___sjiMR", Ru = "RangeInput-module__current___TfscY", Pu = "RangeInput-module__label___IZLKi", Bu = "RangeInput-module__control___CDnrj", vt = {
  root: Iu,
  line: Du,
  before: Ou,
  after: Lu,
  current: Ru,
  label: Pu,
  control: Bu
}, $u = (t, e) => /* @__PURE__ */ w("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("circle", { cx: 10, cy: 10, r: 9, fill: "white", stroke: "#07C369", strokeWidth: 2 })), So = Ce($u), ki = (t, e) => t.filter((r, n) => t.findIndex((i) => e(r, i)) === n), tn = (t, e, r) => Math.min(Math.max(e, t), r), Ni = ({
  min: t,
  max: e,
  labels: r,
  minValue: n,
  maxValue: i,
  showMax: a = !0,
  showMin: s = !0,
  options: l,
  className: c,
  onSelectionEnd: u
}) => {
  var N, T;
  const d = It(null), h = t ?? ((N = l == null ? void 0 : l.at(0)) == null ? void 0 : N.value) ?? 0, f = e ?? ((T = l == null ? void 0 : l.at(-1)) == null ? void 0 : T.value) ?? 0, p = l == null ? void 0 : l.map((M, S) => S / (l.length - 1));
  let m = !1;
  const { i18n: y } = Y(), v = y.dir(y.language) === "rtl", g = (M) => (M - h) / (f - h) * 100, b = (M) => {
    m = !0;
    const S = v ? d.current.getBoundingClientRect().right : d.current.getBoundingClientRect().left, R = v ? d.current.getBoundingClientRect().left : d.current.getBoundingClientRect().right, $ = (J) => {
      if (!m) return;
      const F = "pageX" in J ? J.pageX : J.touches[0].pageX, I = v ? tn(0, (S - F) / (S - R), 1) : tn(0, (F - S) / (R - S), 1), O = p == null ? void 0 : p.reduce(
        (H, W, se) => Math.abs(I - W) < Math.abs(p[H] - W) / 2 ? se : H,
        0
      );
      M.value = O !== void 0 ? l[O].value : I * (f - h) + h;
    }, V = () => {
      m = !1, u == null || u(), window.removeEventListener("mousemove", $), window.removeEventListener("mouseup", V), window.removeEventListener("touchmove", $), window.removeEventListener("touchend", V);
    };
    window.addEventListener("mousemove", $), window.addEventListener("mouseup", V), window.addEventListener("touchmove", $), window.addEventListener("touchend", V);
  };
  Vc(() => {
    i.value < n.value && (i.value = n.value);
  });
  const C = (M, S) => {
    if (!S || S.length === 0) return M;
    const R = S.reduce(
      ($, V, J) => Math.abs(V.value - M) < Math.abs(S[$].value - M) ? J : $,
      0
    );
    return S[R].value;
  }, x = (M) => {
    if (!d.current) return;
    const S = d.current.getBoundingClientRect(), R = v ? S.right - M.pageX : M.pageX - S.left;
    let V = tn(0, R / S.width, 1) * (f - h) + h;
    if (l && l.length > 0 && (V = C(V, l)), !s)
      i.value = V;
    else {
      const J = Math.abs(n.value - V), F = Math.abs(i.value - V);
      if (J === F) {
        const I = Math.abs(h - V), O = Math.abs(f - V);
        I > O ? n.value = V : i.value = V;
      } else J < F ? n.value = tn(h, V, i.value) : i.value = tn(n.value, V, f);
    }
    u == null || u();
  };
  return /* @__PURE__ */ o("div", { className: B(vt.root, c), children: [
    /* @__PURE__ */ o("span", { className: vt.line, ref: d, onClick: x, children: [
      /* @__PURE__ */ o(
        "span",
        {
          className: vt.before,
          style: {
            width: `${g(n.value)}%`,
            zIndex: 3
          }
        }
      ),
      /* @__PURE__ */ o(
        "span",
        {
          className: vt.current,
          style: {
            width: `${(i.value - h) / (f - h) * 100}%`,
            zIndex: 2
          }
        }
      ),
      /* @__PURE__ */ o("span", { className: vt.after, style: { width: "100%", zIndex: 1 } })
    ] }),
    ki(r ?? [], (M, S) => M.value === S.value).map((M) => /* @__PURE__ */ o(
      "span",
      {
        className: vt.label,
        style: {
          [v ? "right" : "left"]: `${g(M.value)}%`
        },
        children: M.label
      },
      M.value
    )),
    s && /* @__PURE__ */ o(
      "span",
      {
        className: B(vt.control, vt.minControl),
        onMouseDown: () => b(n),
        onTouchStart: () => b(n),
        style: {
          [v ? "right" : "left"]: `${g(n.value)}%`
        },
        children: /* @__PURE__ */ o(So, {})
      }
    ),
    a && /* @__PURE__ */ o(
      "span",
      {
        className: B(vt.control, vt.maxControl),
        onMouseDown: () => b(i),
        onTouchStart: () => b(i),
        style: {
          [v ? "right" : "left"]: `${g(i.value)}%`
        },
        children: /* @__PURE__ */ o(So, {})
      }
    )
  ] });
}, ju = "TimeRangeInput-module__root___Uiha5", Vu = "TimeRangeInput-module__info___CKS4o", qu = "TimeRangeInput-module__infoLabel___LX0ac", Uu = "TimeRangeInput-module__range___nLqrE", Zn = {
  root: ju,
  info: Vu,
  infoLabel: qu,
  range: Uu
}, _a = 60 * 24, Qu = _a / 30 + 1, Wu = Array.from({ length: Qu }).map((t, e) => e * 30), qi = Wu.map((t) => ({
  value: t
})), Ao = (t) => {
  const e = t === 0 ? 0 : t / 60, r = 60 * (e - Math.trunc(e));
  return Math.trunc(e).toString().padStart(2, "0") + ":" + r.toString().padStart(2, "0");
}, Io = (t, e) => {
  const r = t === 0 ? 0 : t / 60, n = 60 * (r - Math.trunc(r));
  return (e || "") + " " + Math.trunc(r).toString().padStart(2, "0") + ":" + n.toString().padStart(2, "0");
}, Kn = (t) => {
  if (!t) return 0;
  try {
    const r = t.split(" ");
    return r.length === 2 ? e(r[1]) : e(t);
  } catch {
    return console.error(`Failed to parse time: ${t}`), 0;
  }
  function e(r) {
    const [n, i] = r.split(":").map(Number);
    if (n === 24 && i === 0)
      return 1440;
    if (isNaN(n) || isNaN(i))
      throw new Error("Invalid time format");
    return n * 60 + i;
  }
}, Do = ({ segmentIdx: t, type: e, dateCurrent: r }) => {
  var u, d, h, f, p, m, y, v;
  const { t: n } = Y(), i = Q(
    Kn((d = (u = _.filters.values.segments[t]) == null ? void 0 : u[e][0]) == null ? void 0 : d.min) ?? qi.at(0).value
  ), a = Q(
    Kn((f = (h = _.filters.values.segments[t]) == null ? void 0 : h[e][0]) == null ? void 0 : f.max) ?? qi.at(-1).value
  ), s = () => {
    _.filters.setIsUserInteraction(!0), _.filters.values.segments[t] || (_.filters.values.segments[t] = {
      departureTime: [{ min: "", max: "" }],
      arrivalTime: [{ min: "", max: "" }],
      arrivalDate: [],
      directionAirports: [],
      airportsArrival: []
    }), _.filters.values.segments[t][e][0].min = Io(
      i.value,
      r
    ), _.filters.values.segments[t][e][0].max = Io(
      a.value,
      r
    );
  }, l = () => {
    i.value = 0, a.value = _a;
  }, c = () => {
    l(), s();
  };
  return re(() => {
    var b, C;
    const g = Kn(
      (C = (b = _.filters.values.segments[t]) == null ? void 0 : b[e][0]) == null ? void 0 : C.min
    );
    i.value !== g && (i.value = g);
  }, [(m = (p = _.filters.values.segments[t]) == null ? void 0 : p[e][0]) == null ? void 0 : m.min]), re(() => {
    var b, C;
    const g = Kn(
      (C = (b = _.filters.values.segments[t]) == null ? void 0 : b[e][0]) == null ? void 0 : C.max
    );
    a.value !== g && (a.value = g);
  }, [(v = (y = _.filters.values.segments[t]) == null ? void 0 : y[e][0]) == null ? void 0 : v.max]), /* @__PURE__ */ o("div", { className: B(Zn.root), children: [
    /* @__PURE__ */ o("div", { className: Zn.info, children: [
      /* @__PURE__ */ o("p", { className: Zn.infoLabel, children: n(e === "departureTime" ? "filters.departure" : "filters.arrival") }),
      /* @__PURE__ */ o(
        rr,
        {
          valueChanged: i.value !== 0 || a.value !== _a,
          onClear: c,
          children: `${Ao(i.value)} - ${Ao(a.value)}`
        }
      )
    ] }),
    /* @__PURE__ */ o(
      Ni,
      {
        options: qi,
        minValue: i,
        maxValue: a,
        onSelectionEnd: s,
        className: Zn.range
      }
    )
  ] });
}, zu = "Checklist-module__root___RqsjG", Hu = "Checklist-module__option___UTutL", Gu = "Checklist-module__checkboxOnRight___iASKb", Zu = "Checklist-module__checkbox___4NkD1", Ku = "Checklist-module__active___7o0de", Yu = "Checklist-module__label___iboyI", Ju = "Checklist-module__nativeInput___gnB4T", Wt = {
  root: zu,
  option: Hu,
  checkboxOnRight: Gu,
  checkbox: Zu,
  active: Ku,
  label: Yu,
  nativeInput: Ju
}, Dt = ({
  options: t,
  values: e,
  className: r,
  checkboxOnRight: n,
  onChange: i
}) => {
  const a = (s) => {
    if (!(e != null && e.value)) return;
    const l = e.value.findIndex((u) => u === s), c = [...e.value];
    l === -1 ? c.push(s) : c.splice(l, 1), e.value = c, i && i();
  };
  return /* @__PURE__ */ o("div", { className: B(Wt.root, r), children: t.map((s) => {
    var c, u;
    const l = Object.fromEntries(
      Object.entries(s).filter(([d]) => d.startsWith("data-"))
    );
    return /* @__PURE__ */ o(
      "label",
      {
        ...l,
        className: B(Wt.option, {
          [Wt.checkboxOnRight]: n
        }),
        children: [
          /* @__PURE__ */ o(
            "input",
            {
              type: "checkbox",
              checked: (c = e == null ? void 0 : e.value) == null ? void 0 : c.includes(s.value),
              onChange: () => a(s.value),
              value: s.value,
              className: Wt.nativeInput
            }
          ),
          (u = e == null ? void 0 : e.value) != null && u.includes(s.value) ? /* @__PURE__ */ o(qc, { className: B(Wt.checkbox, Wt.active) }) : /* @__PURE__ */ o(Uc, { className: Wt.checkbox }),
          /* @__PURE__ */ o("span", { className: Wt.label, children: s.label })
        ]
      },
      s.key ?? s.value
    );
  }) });
}, Xu = "Expandable-module__header___ID97A", ed = "Expandable-module__arrowIcon___HXMJS", td = "Expandable-module__isOpen___HWAJz", Yn = {
  header: Xu,
  arrowIcon: ed,
  isOpen: td
}, rd = (t, e) => /* @__PURE__ */ w("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M2.24429 7.20159L7.5927 12.3377C7.81784 12.5541 8.18157 12.5541 8.4073 12.3377L13.7557 7.20159C14.0814 6.88919 14.0814 6.3809 13.7557 6.06794C13.43 5.75554 12.9013 5.75554 12.5756 6.06794L7.99971 10.4616L3.42496 6.06794C3.09866 5.75554 2.57001 5.75554 2.24429 6.06794C1.91857 6.3809 1.91857 6.88919 2.24429 7.20159Z", fill: "#9EA9B7" })), nd = Ce(rd), wt = ({
  header: t,
  children: e,
  isOpen: r = !1,
  withArrowIcon: n,
  onToggle: i,
  classNames: a,
  ...s
}) => {
  const l = Q(r), c = () => {
    l.value = !l.value;
  };
  return re(() => {
    i == null || i(l.value);
  }, [l.value]), /* @__PURE__ */ o("div", { className: B(Yn.root, a == null ? void 0 : a.root), ...s, children: [
    /* @__PURE__ */ o(
      "button",
      {
        className: B(Yn.header, a == null ? void 0 : a.header, {
          [a == null ? void 0 : a.closed]: !l.value
        }),
        onClick: c,
        children: [
          t,
          n && /* @__PURE__ */ o(
            nd,
            {
              className: B(Yn.arrowIcon, {
                [Yn.isOpen]: l.value
              })
            }
          )
        ]
      }
    ),
    l.value && e
  ] });
}, id = "ArrivalTo-module__body___x0BtU", ad = "ArrivalTo-module__ranges___KJlAx", od = "ArrivalTo-module__dates___mu6jk", sd = "ArrivalTo-module__datesLabel___PdvCR", rn = {
  body: id,
  ranges: ad,
  dates: od,
  datesLabel: sd
}, ld = ({
  classNames: t,
  fromIata: e,
  title: r,
  toIata: n,
  segmentIdx: i,
  arrivalDateTimes: a
}) => {
  var v;
  const { t: s, i18n: l } = Y(), c = Zr(l.language), u = ki(
    a.map((g) => new Date(g)),
    (g, b) => g.getDate() === b.getDate()
  ).sort((g, b) => g.getDate() - b.getDate()), { formatShortDateWithWeekDay: d } = Ti(), h = () => u.map((g) => ({
    value: $e(_t(g), "yyyy-MM-dd", { locale: c }),
    label: d(g, c)
  })), [f, p] = Pe(h()), m = It(a.length);
  re(() => {
    a.length > m.current && (p(h()), m.current = a.length);
  }, [a.length]), re(() => {
    p(h());
  }, [e, n, i]);
  const y = (g) => !Array.isArray(g) || g.length === 0 ? null : $e(_t(g[0]), "yyyy-MM-dd", {
    locale: c
  });
  return /* @__PURE__ */ o(
    wt,
    {
      withArrowIcon: !0,
      header: r ?? `${e} - ${n}`,
      classNames: { root: rn.root, header: t == null ? void 0 : t.header },
      children: /* @__PURE__ */ o("div", { className: B(rn.body, t == null ? void 0 : t.body), children: [
        /* @__PURE__ */ o("div", { className: rn.ranges, children: [
          /* @__PURE__ */ o(
            Do,
            {
              dateCurrent: y(u),
              segmentIdx: i,
              type: "departureTime"
            }
          ),
          /* @__PURE__ */ o(
            Do,
            {
              dateCurrent: y(u),
              segmentIdx: i,
              type: "arrivalTime"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: rn.dates, children: [
          /* @__PURE__ */ o("span", { className: rn.datesLabel, children: s("filters.arrival_date") }),
          ((v = _.filters.values.segments[i]) == null ? void 0 : v.$arrivalDate) && /* @__PURE__ */ o(
            Dt,
            {
              options: f,
              values: _.filters.values.segments[i].$arrivalDate,
              onChange: () => {
                _.filters.setIsUserInteraction(!0);
              }
            }
          )
        ] })
      ] })
    }
  );
}, cd = "FlightFiltersContent-module__root___HU2wS", ud = "FlightFiltersContent-module__filterHeader___xHuF-", dd = "FlightFiltersContent-module__filterBody___mNMPZ", ga = {
  root: cd,
  filterHeader: ud,
  filterBody: dd
}, hd = "SelectAllBtn-module__root___ESa4o", fd = {
  root: hd
}, qn = ({ options: t, value: e, className: r, onClick: n, ...i }) => {
  const a = e.value.length, { t: s } = Y(), l = (d) => {
    d.stopPropagation(), e.value = t;
  }, c = (d) => {
    d.stopPropagation(), e.value = [];
  };
  return /* @__PURE__ */ o("button", { type: "button", onClick: (d) => {
    n && n(), a ? c(d) : l(d);
  }, className: B(fd.root, r), ...i, children: s(a ? "filters.reset" : "inputs.selectall") });
}, Un = (t) => t && !isNaN(t) && t !== 0 && t !== -1 / 0 && t !== 1 / 0, pd = "Agencies-module__root___p067U", _d = "Agencies-module__body___hG9lX", gd = "Agencies-module__header___dmD-I", md = "Agencies-module__label___zrSQh", vd = "Agencies-module__price___HVIfr", nn = {
  root: pd,
  body: _d,
  header: gd,
  label: md,
  price: vd
}, yd = ({ agencies: t, classNames: e }) => {
  const r = Q(""), { t: n } = Y(), { priceFormatter: i } = Ze(), a = t.filter((l) => {
    var c;
    return (c = l.name) == null ? void 0 : c.toString().toLowerCase().includes(r.value.toLowerCase());
  }).map((l) => ({
    value: l.id,
    label: /* @__PURE__ */ o("div", { className: nn.label, children: [
      /* @__PURE__ */ o("span", { children: l.name }),
      Un(l.lowestPrice) && /* @__PURE__ */ o("span", { className: nn.price, children: i.format(l.lowestPrice) })
    ] })
  })), s = () => _.filters.setIsUserInteraction(!0);
  return /* @__PURE__ */ o(
    wt,
    {
      withArrowIcon: !0,
      classNames: { root: nn.root, header: e == null ? void 0 : e.header },
      header: /* @__PURE__ */ o("div", { className: nn.header, children: [
        /* @__PURE__ */ o("span", { children: n("agencies.agencies") }),
        /* @__PURE__ */ o(
          qn,
          {
            options: a.map((l) => l.value),
            value: _.filters.values.$agents,
            onClick: s
          }
        )
      ] }),
      children: /* @__PURE__ */ o("div", { className: B(nn.body, e == null ? void 0 : e.body), children: [
        /* @__PURE__ */ o(Ga, { value: r, placeholder: n("agencies.agency_name") }),
        /* @__PURE__ */ o(
          Dt,
          {
            options: a,
            values: _.filters.values.$agents,
            onChange: s
          }
        )
      ] })
    }
  );
}, bd = "Toggle-module__root___Lt4QM", Cd = "Toggle-module__large___aWHTC", wd = "Toggle-module__disabled___OJEJ-", Ui = {
  root: bd,
  large: Cd,
  disabled: wd
}, gt = ({
  value: t,
  tabIndex: e,
  className: r,
  size: n = "default",
  disabled: i = !1,
  onChange: a,
  ...s
}) => {
  const l = () => {
    t.value = !t.value, a && a();
  };
  return /* @__PURE__ */ o(
    "label",
    {
      className: B(Ui.root, Ui[n], r, {
        [Ui.disabled]: i
      }),
      tabIndex: e,
      ...s,
      children: [
        /* @__PURE__ */ o("input", { type: "checkbox", onChange: l, checked: !!t.value, disabled: i }),
        /* @__PURE__ */ o("span", {})
      ]
    }
  );
}, Td = "AirportsIn-module__body___ALBoq", kd = "AirportsIn-module__header___y7K0A", Nd = "AirportsIn-module__label___BudqI", xd = "AirportsIn-module__labelInfo___UENlq", Fd = "AirportsIn-module__price___MN7i7", Ed = "AirportsIn-module__iata___sZXaW", Md = "AirportsIn-module__sameAirportToggle___jcUpS", zt = {
  body: Td,
  header: kd,
  label: Nd,
  labelInfo: xd,
  price: Fd,
  iata: Ed,
  sameAirportToggle: Md
}, Sd = ({
  classNames: t,
  placeIata: e,
  cityNameWhere: r,
  airports: n,
  isRoundTrip: i,
  airportCity: a,
  changeAirportCity: s
}) => {
  const { priceFormatter: l } = Ze(), { t: c } = Y(), u = Q(
    _.filters.values.sameAirportsDepartureAndArrival.includes(e)
  );
  a == null || a.subscribe((h) => {
    s != null && s(h);
  }), re(() => {
    u.value && _.filters.values.sameAirportsDepartureAndArrival.push(e);
  }, [u.value]), re(() => {
    u.value || _.filters.values.sameAirportsDepartureAndArrival.splice(
      _.filters.values.sameAirportsDepartureAndArrival.indexOf(e),
      1
    );
  }, [u.value]);
  const d = () => _.filters.setIsUserInteraction(!0);
  return /* @__PURE__ */ o(
    wt,
    {
      withArrowIcon: !0,
      classNames: { root: zt.root, header: t == null ? void 0 : t.header },
      header: /* @__PURE__ */ o("div", { className: zt.header, children: [
        /* @__PURE__ */ o("span", { children: c("airportsin.airports", { cityNameWhere: r }) }),
        /* @__PURE__ */ o(
          qn,
          {
            options: n.map((h) => h.iata),
            value: a,
            onClick: d
          }
        )
      ] }),
      "data-testid": `expandable-airports-in-filter-${e}`,
      children: /* @__PURE__ */ o("div", { className: B(zt.body, t == null ? void 0 : t.body), children: [
        /* @__PURE__ */ o(
          Dt,
          {
            options: n.map((h) => ({
              value: h.iata,
              label: /* @__PURE__ */ o("div", { className: zt.label, children: [
                /* @__PURE__ */ o("div", { className: zt.labelInfo, children: [
                  /* @__PURE__ */ o("span", { children: h.name }),
                  /* @__PURE__ */ o("span", { className: zt.iata, children: h.iata })
                ] }),
                Un(h.lowestPrice) && /* @__PURE__ */ o("span", { className: zt.price, children: l.format(h.lowestPrice) })
              ] }),
              "data-role": "airports-in-filter-option"
            })),
            values: a,
            onChange: d
          }
        ),
        i && /* @__PURE__ */ o("div", { className: zt.sameAirportToggle, children: [
          /* @__PURE__ */ o("span", { children: c("airportsin.departure_and_arrival_the_same_airport") }),
          /* @__PURE__ */ o(gt, { value: u, size: "large", onChange: d })
        ] })
      ] })
    }
  );
}, Ad = (t, e) => /* @__PURE__ */ w("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10C12.5523 10 13 9.55228 13 9Z", fill: "#9EA9B7" }), /* @__PURE__ */ w("path", { d: "M13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V15Z", fill: "#9EA9B7" }), /* @__PURE__ */ w("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12Z", fill: "#9EA9B7" })), St = Ce(Ad), Id = "SingleAirlineModal-module__root___SP2Uc", Dd = "SingleAirlineModal-module__title___OiYU-", Od = "SingleAirlineModal-module__button___-HYoz", Qi = {
  root: Id,
  title: Dd,
  button: Od
}, Ld = () => {
  const { t } = Y();
  return /* @__PURE__ */ o("div", { className: Qi.root, children: [
    /* @__PURE__ */ o("h1", { className: Qi.title, children: t("singleairlinemodal.filter_out_flights_operated_by_multiple_airlines") }),
    /* @__PURE__ */ o(Ge, { className: Qi.button, onClick: () => _.modal.closeLastModal(), children: t("singleairlinemodal.confirm") })
  ] });
}, Rd = "Alliances-module__body___J8ptC", Pd = "Alliances-module__label___dL1ij", Bd = "Alliances-module__labelMain___edsJr", $d = "Alliances-module__price___t1YF-", jd = "Alliances-module__alliancesHeader___bg5Qi", Vd = "Alliances-module__alliances___xydRh", qd = "Alliances-module__airlinesHeader___POUEv", Ud = "Alliances-module__airlinesTitle___gxN-S", Qd = "Alliances-module__airlinesToggles___r5Ztm", Wd = "Alliances-module__toggleLine___7tgQD", zd = "Alliances-module__info___MmKlQ", Hd = "Alliances-module__infoBtn___Yc0r5", Gd = "Alliances-module__search___Y2wWY", Zd = "Alliances-module__airlines___Mn706", We = {
  body: Rd,
  label: Pd,
  labelMain: Bd,
  price: $d,
  alliancesHeader: jd,
  alliances: Vd,
  airlinesHeader: qd,
  airlinesTitle: Ud,
  airlinesToggles: Qd,
  toggleLine: Wd,
  info: zd,
  infoBtn: Hd,
  search: Gd,
  airlines: Zd
}, Oo = ({ id: t, name: e, lowestPrice: r, isAlliance: n }) => {
  const { priceFormatter: i } = Ze();
  return /* @__PURE__ */ o("span", { className: We.label, children: [
    /* @__PURE__ */ o("div", { className: We.labelMain, children: [
      /* @__PURE__ */ o(
        "img",
        {
          src: `https://img.avs.io/pics/night_square/${n ? "alliance_" : ""}${t}@png?rs=fit:48:48`,
          alt: t
        }
      ),
      /* @__PURE__ */ o("span", { children: e })
    ] }),
    Un(r) && /* @__PURE__ */ o("div", { className: We.price, children: i.format(r) })
  ] });
}, Kd = ({
  classNames: t,
  alliances: e,
  airlines: r,
  hasLowcosts: n
}) => {
  var u;
  const i = Q(""), { t: a } = Y(), s = r.filter((d) => {
    var h;
    return !((h = _.filters.values.$isNoLowcost) != null && h.value && d.is_lowcost);
  }).filter(
    (d) => {
      var h;
      return d.iata.toLowerCase().includes(i.value.toLowerCase()) || ((h = d.name[ye()]) == null ? void 0 : h.default.toLowerCase().includes(i.value.toLowerCase()));
    }
  );
  re(() => {
    var h;
    if (!((h = _.filters.values.$isNoLowcost) != null && h.value)) return;
    const d = r.filter((f) => f.is_lowcost).map((f) => f.iata);
    _.filters.values.airlines = _.filters.values.airlines.filter(
      (f) => !d.includes(f)
    );
  }, [(u = _.filters.values.$isNoLowcost) == null ? void 0 : u.value]);
  const l = () => _.modal.openModal({ content: /* @__PURE__ */ o(Ld, {}) }), c = () => _.filters.setIsUserInteraction(!0);
  return /* @__PURE__ */ o(
    wt,
    {
      withArrowIcon: !0,
      classNames: { root: We.root, header: t == null ? void 0 : t.header },
      header: a("alliances.alliances_and_airlines"),
      "data-testid": "expandable-alliances-filter",
      children: /* @__PURE__ */ o("div", { className: B(We.body, t == null ? void 0 : t.body), children: [
        e.length > 0 && /* @__PURE__ */ o(Ie, { children: [
          /* @__PURE__ */ o("div", { className: We.alliancesHeader, children: a("alliances.alliances") }),
          /* @__PURE__ */ o("div", { className: We.alliances, children: /* @__PURE__ */ o(
            Dt,
            {
              options: e.map((d) => ({
                value: d.id,
                label: /* @__PURE__ */ o(
                  Oo,
                  {
                    id: d.id,
                    name: d.name,
                    lowestPrice: d.lowestPrice,
                    isAlliance: !0
                  }
                ),
                "data-role": "alliances-filter-option",
                "data-alliance-id": d.id
              })),
              values: _.filters.values.$alliances,
              checkboxOnRight: !0,
              onChange: c
            }
          ) })
        ] }),
        /* @__PURE__ */ o("div", { className: We.airlinesHeader, children: [
          /* @__PURE__ */ o("span", { className: We.airlinesTitle, children: a("filters.airlines") }),
          /* @__PURE__ */ o(
            qn,
            {
              options: r.map((d) => d.iata),
              value: _.filters.values.$airlines,
              className: We.selectAll,
              onClick: c
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: We.airlinesToggles, children: [
          n && /* @__PURE__ */ o("div", { className: We.toggleLine, children: [
            /* @__PURE__ */ o("div", { children: a("alliances.no_lowcost_airlines") }),
            /* @__PURE__ */ o(
              gt,
              {
                value: _.filters.values.$isNoLowcost,
                size: "large",
                onChange: c
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: We.toggleLine, children: [
            /* @__PURE__ */ o("div", { children: a("alliances.flights_operated_by_a_single_airline") }),
            /* @__PURE__ */ o("div", { className: We.info, children: [
              /* @__PURE__ */ o("button", { type: "button", onClick: l, className: We.infoBtn, children: /* @__PURE__ */ o(St, {}) }),
              /* @__PURE__ */ o(
                gt,
                {
                  value: _.filters.values.$isSingleAirline,
                  size: "large",
                  onChange: c
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ o(Ga, { value: i, placeholder: "Airline, IATA code", className: We.search }),
        /* @__PURE__ */ o("div", { className: We.airlines, children: /* @__PURE__ */ o(
          Dt,
          {
            options: s.map((d) => {
              var h;
              return {
                value: d.iata,
                "data-role": "airlines-filter-option",
                label: /* @__PURE__ */ o(
                  Oo,
                  {
                    id: d.iata,
                    name: (h = d.name[ye()]) == null ? void 0 : h.default,
                    lowestPrice: d.lowestPrice
                  }
                )
              };
            }),
            values: _.filters.values.$airlines,
            checkboxOnRight: !0,
            onChange: c
          }
        ) })
      ] })
    }
  );
}, Yd = (t, e) => /* @__PURE__ */ w("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M4 4L16 16", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" }), /* @__PURE__ */ w("path", { d: "M4 16L16 4", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" })), Tt = Ce(Yd), Jd = (t, e) => /* @__PURE__ */ w("svg", { width: 28, height: 28, viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M19.1336 2.80078C18.5148 2.80078 17.9213 3.04661 17.4837 3.4842C17.0461 3.92178 16.8003 4.51528 16.8003 5.13411C16.8003 5.75295 17.0461 6.34645 17.4837 6.78403C17.9213 7.22162 18.5148 7.46745 19.1336 7.46745C19.7525 7.46745 20.346 7.22162 20.7836 6.78403C21.2211 6.34645 21.467 5.75295 21.467 5.13411C21.467 4.51528 21.2211 3.92178 20.7836 3.4842C20.346 3.04661 19.7525 2.80078 19.1336 2.80078ZM17.2646 8.40078C16.8983 8.40078 16.5553 8.49411 16.2461 8.64578C16.1291 8.681 16.0201 8.73887 15.9253 8.81612L13.1253 11.0479C13.07 11.0919 13.0199 11.142 12.976 11.1973L10.4688 14.3543C10.3886 14.4498 10.3284 14.5605 10.2917 14.6797C10.255 14.7989 10.2425 14.9243 10.2551 15.0484C10.2677 15.1725 10.305 15.2928 10.3649 15.4022C10.4247 15.5117 10.5059 15.608 10.6036 15.6855C10.7014 15.763 10.8136 15.8202 10.9338 15.8536C11.054 15.887 11.1797 15.8959 11.3034 15.88C11.4271 15.864 11.5463 15.8233 11.6541 15.7605C11.7618 15.6976 11.8559 15.6138 11.9306 15.5139L11.9563 15.4813L11.9551 15.4883L13.9256 13.3206L14.4086 13.0278C14.271 13.7639 14.0505 14.9201 14.0493 14.9248L14.047 14.9306V14.9341C13.9634 15.3462 13.9935 15.7732 14.1341 16.1694C14.2747 16.5657 14.5204 16.9162 14.845 17.1834L14.8531 17.2056L18.4861 20.0675L19.5245 23.9781L19.6108 24.4168C19.6548 24.6605 19.7937 24.8767 19.9971 25.0179C20.2004 25.1591 20.4516 25.2138 20.6952 25.1699C20.9389 25.1259 21.1551 24.987 21.2964 24.7836C21.4376 24.5803 21.4923 24.3291 21.4483 24.0854L20.515 19.4188C20.49 19.2923 20.4392 19.1724 20.3656 19.0664L18.6191 15.8709C18.6215 15.8628 18.6191 15.8534 18.6215 15.8453L19.5385 11.2591L19.5361 11.2568C19.5758 11.0888 19.6003 10.9149 19.6003 10.7341C19.6003 9.44728 18.555 8.40078 17.2646 8.40078ZM20.893 11.8938L20.4555 14.0078L20.8428 14.3566C20.9128 14.4196 20.9945 14.4733 21.0808 14.5118L23.8808 15.7834C24.0642 15.8685 24.2703 15.8915 24.468 15.849C24.6656 15.8066 24.8441 15.7009 24.9764 15.5481C25.1087 15.3952 25.1876 15.2035 25.2013 15.0018C25.2149 14.8001 25.1626 14.5994 25.0521 14.4301C24.9551 14.279 24.8166 14.1591 24.6531 14.0848L24.6298 14.0731H24.6275L21.9826 12.8714L20.893 11.8938ZM9.97531 15.8698C9.79159 15.8644 9.61036 15.9134 9.45431 16.0105C9.29826 16.1076 9.17431 16.2486 9.09798 16.4158L8.49131 17.7458L6.79031 16.9734C6.56721 16.8709 6.32586 16.8139 6.08044 16.8059C5.83502 16.7979 5.59047 16.839 5.36115 16.9268C4.89448 17.1018 4.52465 17.4494 4.32048 17.8998L2.96715 20.8584C2.76339 21.3098 2.74697 21.8236 2.92151 22.287C3.09604 22.7505 3.44727 23.1258 3.89815 23.3306L4.75798 23.7203C4.99131 22.9584 5.69481 22.4008 6.53365 22.4008C7.16365 22.4008 7.71665 22.7135 8.05615 23.1918C8.05848 23.1848 8.06431 23.1801 8.06665 23.1743L10.7966 17.1904C10.8603 17.0504 10.8884 16.8967 10.8784 16.7432C10.8684 16.5897 10.8207 16.441 10.7394 16.3103C10.6582 16.1796 10.5459 16.0711 10.4126 15.9942C10.2793 15.9174 10.1291 15.8746 9.97531 15.8698ZM13.9595 18.4108L13.4811 19.9939L11.401 23.6713L11.331 23.7879L11.3333 23.7903C11.3222 23.8082 11.3117 23.8265 11.3018 23.8451L11.2948 23.8591C11.1939 24.0688 11.175 24.3086 11.2417 24.5315C11.3084 24.7544 11.456 24.9443 11.6554 25.0641C11.8549 25.1838 12.092 25.2248 12.3201 25.1788C12.5482 25.1329 12.7509 25.0034 12.8885 24.8158H12.8896L12.9048 24.7948L12.906 24.7924L16.0105 20.0791L13.9595 18.4108ZM6.53365 23.3341C6.28611 23.3341 6.04871 23.4324 5.87368 23.6075C5.69865 23.7825 5.60031 24.0199 5.60031 24.2674C5.60031 24.515 5.69865 24.7524 5.87368 24.9274C6.04871 25.1024 6.28611 25.2008 6.53365 25.2008C6.78118 25.2008 7.01858 25.1024 7.19361 24.9274C7.36865 24.7524 7.46698 24.515 7.46698 24.2674C7.46698 24.0199 7.36865 23.7825 7.19361 23.6075C7.01858 23.4324 6.78118 23.3341 6.53365 23.3341Z", fill: "white" })), Xd = Ce(Jd), eh = (t, e) => /* @__PURE__ */ w("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M2.27116 18.1875C1.99338 18.1875 1.7497 18.1194 1.54012 17.9833C1.33067 17.8472 1.16463 17.6722 1.04199 17.4583C0.916992 17.2639 0.854492 17.041 0.854492 16.7896C0.854492 16.5383 0.916992 16.289 1.04199 16.0417L8.77116 2.70833C8.89616 2.45833 9.07394 2.27778 9.30449 2.16667C9.53519 2.05556 9.76783 2 10.0024 2C10.2371 2 10.4691 2.05556 10.6982 2.16667C10.9274 2.27778 11.1045 2.45833 11.2295 2.70833L18.9587 16.0417C19.0837 16.289 19.1462 16.5383 19.1462 16.7896C19.1462 17.041 19.0837 17.2639 18.9587 17.4583C18.8337 17.6667 18.667 17.8403 18.4587 17.9792C18.2503 18.1181 18.0073 18.1875 17.7295 18.1875H2.27116ZM10.0003 15.1458C10.292 15.1458 10.5385 15.0451 10.7399 14.8438C10.9413 14.6424 11.042 14.3958 11.042 14.1042C11.042 13.8264 10.9413 13.5868 10.7399 13.3854C10.5385 13.184 10.292 13.0833 10.0003 13.0833C9.72255 13.0833 9.47949 13.184 9.27116 13.3854C9.06283 13.5868 8.95866 13.8264 8.95866 14.1042C8.95866 14.3958 9.06283 14.6424 9.27116 14.8438C9.47949 15.0451 9.72255 15.1458 10.0003 15.1458ZM10.0003 12.5417C10.2642 12.5417 10.4864 12.4479 10.667 12.2604C10.8475 12.0729 10.9378 11.8542 10.9378 11.6042V9.5C10.9378 9.23611 10.8475 9.01389 10.667 8.83333C10.4864 8.65278 10.2642 8.5625 10.0003 8.5625C9.75033 8.5625 9.53158 8.65278 9.34408 8.83333C9.15658 9.01389 9.06283 9.23611 9.06283 9.5V11.6042C9.06283 11.8542 9.15658 12.0729 9.34408 12.2604C9.53158 12.4479 9.75033 12.5417 10.0003 12.5417Z", fill: "#FFBC11" })), an = Ce(eh), th = "RepeatCheckInModal-module__root___9uEFw", rh = "RepeatCheckInModal-module__container___0qOLj", nh = "RepeatCheckInModal-module__icon___HF8yz", ih = "RepeatCheckInModal-module__title___Qyzeu", ah = "RepeatCheckInModal-module__description___FulMC", oh = "RepeatCheckInModal-module__list___SvqqI", sh = "RepeatCheckInModal-module__close___8d9zC", cr = {
  root: th,
  container: rh,
  icon: nh,
  title: ih,
  description: ah,
  list: oh,
  close: sh
}, Ja = () => {
  const t = () => {
    _.modal.closeLastModal();
  }, { t: e } = Y();
  return /* @__PURE__ */ o("div", { className: cr.root, children: /* @__PURE__ */ o("div", { className: cr.container, children: [
    /* @__PURE__ */ o("button", { className: cr.close, type: "button", onClick: t, children: /* @__PURE__ */ o(Tt, {}) }),
    /* @__PURE__ */ o("div", { className: cr.icon, children: /* @__PURE__ */ o(Xd, {}) }),
    /* @__PURE__ */ o("h1", { className: cr.title, children: e("repeatcheckinmodal.repeat_checkin") }),
    /* @__PURE__ */ o("p", { className: cr.description, children: e("repeatcheckinmodal.ticket_consists_several_separate_bookings_this_option_is") }),
    /* @__PURE__ */ o("ul", { className: cr.list, children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ o(an, {}),
        /* @__PURE__ */ o("p", { children: e("repeatcheckinmodal.the_layover_will_involve_entering_the_country_if") })
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ o(an, {}),
        /* @__PURE__ */ o("p", { children: e("repeatcheckinmodal.if_the_country_is_closed_tourists_you_may") })
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ o(an, {}),
        /* @__PURE__ */ o("p", { children: e("repeatcheckinmodal.if_quarantine_is_required_upon_arrival_the_country") })
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ o(an, {}),
        /* @__PURE__ */ o("p", { children: e("repeatcheckinmodal.youaposll_need_check_the_next_flight_the_connecting") })
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ o(an, {}),
        /* @__PURE__ */ o("p", { children: e("repeatcheckinmodal.the_exchange_and_refund_terms_each_ticket_are") })
      ] })
    ] })
  ] }) });
}, lh = "BaggageFilter-module__root___DpiNe", ch = "BaggageFilter-module__body___CJfM1", uh = "BaggageFilter-module__checks___ZWX3V", dh = "BaggageFilter-module__toggle___1o2jF", hh = "BaggageFilter-module__info___-7FUg", fh = "BaggageFilter-module__infoBtn___qxGDX", kr = {
  root: lh,
  body: ch,
  checks: uh,
  toggle: dh,
  info: hh,
  infoBtn: fh
}, ph = ({ classNames: t }) => {
  const { t: e } = Y(), r = () => {
    _.modal.openModal({
      content: /* @__PURE__ */ o(Ja, {}),
      variant: "popup"
    });
  }, n = [
    {
      value: "full_baggage",
      label: e("flightmatrix.baggage_included")
    }
  ];
  return /* @__PURE__ */ o(
    wt,
    {
      withArrowIcon: !0,
      classNames: { root: kr.root, header: t == null ? void 0 : t.header },
      header: e("filters.baggage"),
      children: /* @__PURE__ */ o("div", { className: B(kr.body, t == null ? void 0 : t.body), children: /* @__PURE__ */ o("div", { className: kr.checks, children: [
        /* @__PURE__ */ o(
          Dt,
          {
            options: n,
            values: _.filters.values.$baggage,
            onChange: () => _.filters.setIsUserInteraction(!0)
          }
        ),
        /* @__PURE__ */ o("div", { className: kr.toggle, children: [
          /* @__PURE__ */ o("span", { children: e("baggagefilter.no_repeat_checkin") }),
          /* @__PURE__ */ o("div", { className: kr.info, children: [
            /* @__PURE__ */ o("button", { type: "button", onClick: r, className: kr.infoBtn, children: /* @__PURE__ */ o(St, {}) }),
            /* @__PURE__ */ o(
              gt,
              {
                value: _.filters.values.$isNoRepeatCheckIn,
                size: "large",
                onChange: () => _.filters.setIsUserInteraction(!0)
              }
            )
          ] })
        ] })
      ] }) })
    }
  );
}, _h = "ConnectingAirports-module__root___8hdvv", gh = "ConnectingAirports-module__body___PUmXw", mh = "ConnectingAirports-module__header___W-ffh", vh = "ConnectingAirports-module__label___O3Key", yh = "ConnectingAirports-module__price___uenuU", bh = "ConnectingAirports-module__additional___vqeuC", Ch = "ConnectingAirports-module__search___IRU5H", Ht = {
  root: _h,
  body: gh,
  header: mh,
  label: vh,
  price: yh,
  additional: bh,
  search: Ch
}, wh = ({ airports: t, classNames: e }) => {
  const r = Q(""), { t: n } = Y(), { priceFormatter: i } = Ze(), a = t.filter(
    (l) => Object.values(l).some(
      (c) => c.toString().toLowerCase().includes(r.value.toLowerCase())
    )
  ), s = () => _.filters.setIsUserInteraction(!0);
  return /* @__PURE__ */ o(
    wt,
    {
      withArrowIcon: !0,
      classNames: { root: Ht.root, header: e == null ? void 0 : e.header },
      header: /* @__PURE__ */ o("div", { className: Ht.header, children: [
        /* @__PURE__ */ o("span", { children: n("filters.stops_airports") }),
        /* @__PURE__ */ o(
          qn,
          {
            options: a.map((l) => l.cityIata),
            value: _.filters.values.$connectingAirports,
            onClick: s
          }
        )
      ] }),
      "data-testid": "expandable-connecting-airports-filter",
      children: /* @__PURE__ */ o("div", { className: B(Ht.body, e == null ? void 0 : e.body), children: [
        /* @__PURE__ */ o(
          Ga,
          {
            className: Ht.search,
            value: r,
            placeholder: n("connecting_airports.search_input_placeholder")
          }
        ),
        /* @__PURE__ */ o(
          Dt,
          {
            options: a.map((l) => ({
              value: l.cityIata,
              key: `${l.cityIata}-${l.iata}`,
              label: /* @__PURE__ */ o("span", { className: Ht.label, children: [
                /* @__PURE__ */ o("span", { className: Ht.labelInfo, children: [
                  l.cityName,
                  ",",
                  " ",
                  /* @__PURE__ */ o("span", { className: Ht.additional, children: [
                    l.name,
                    " ",
                    l.iata,
                    " ",
                    /* @__PURE__ */ o("br", {}),
                    " ",
                    l.countryName
                  ] })
                ] }),
                Un(l.lowestPrice) && /* @__PURE__ */ o("span", { className: Ht.price, children: i.format(l.lowestPrice) })
              ] }),
              "data-role": "connecting-airports-filter-option"
            })),
            values: _.filters.values.$connectingAirports,
            onChange: s
          }
        )
      ] })
    }
  );
}, Th = "Convenience-module__root___NXIue", kh = "Convenience-module__header___bPL1X", Nh = "Convenience-module__toggleAll___c-vvt", xh = "Convenience-module__toggles___0lKM3", Fh = "Convenience-module__toggle___WbV2c", Eh = "Convenience-module__label___bgBfn", Mh = "Convenience-module__info___-LMsB", Sh = "Convenience-module__infoBtn___h5aWh", it = {
  root: Th,
  header: kh,
  toggleAll: Nh,
  toggles: xh,
  toggle: Fh,
  label: Eh,
  info: Mh,
  infoBtn: Sh
}, Ah = "VisaModal-module__root___6q28U", Ih = "VisaModal-module__title___Ndapl", Dh = "VisaModal-module__button___MQ3wC", Wi = {
  root: Ah,
  title: Ih,
  button: Dh
}, Oh = () => {
  const { t } = Y();
  return /* @__PURE__ */ o("div", { className: Wi.root, children: [
    /* @__PURE__ */ o("h1", { className: Wi.title, children: t("visamodal.filter_by_visa_requirements") }),
    /* @__PURE__ */ o(Ge, { className: Wi.button, onClick: () => _.modal.closeLastModal(), children: t("visamodal.confirm") })
  ] });
}, Lh = ({ classNames: t }) => {
  const { t: e, i18n: r } = Y(), n = st(() => r.language === "ru" ? _.filters.values.isNoLayoversWithVisa || _.filters.values.isNoOvernightLayovers || _.filters.values.isNoAirportChanges : _.filters.values.isNoOvernightLayovers || _.filters.values.isNoAirportChanges), i = () => {
    s();
    const l = !n.value;
    _.filters.values.isNoLayoversWithVisa = r.language === "ru" ? l : void 0, _.filters.values.isNoOvernightLayovers = l, _.filters.values.isNoAirportChanges = l;
  }, a = () => _.modal.openModal({ content: /* @__PURE__ */ o(Oh, {}) }), s = () => {
    _.filters.setIsUserInteraction(!0);
  };
  return /* @__PURE__ */ o("div", { className: it.root, children: [
    /* @__PURE__ */ o("div", { className: B(it.header, t == null ? void 0 : t.header), children: [
      /* @__PURE__ */ o("span", { children: e("convenience.convenience") }),
      /* @__PURE__ */ o("button", { type: "button", onClick: i, className: it.toggleAll, children: n.value ? e("filters.reset") : e("inputs.selectall") })
    ] }),
    /* @__PURE__ */ o("div", { className: B(it.body, t == null ? void 0 : t.body), children: /* @__PURE__ */ o("div", { className: it.toggles, children: [
      r.language === "ru" && /* @__PURE__ */ o("div", { className: it.toggle, children: [
        /* @__PURE__ */ o("span", { className: it.label, children: e("convenience.no_layovers_requiring_visas") }),
        /* @__PURE__ */ o("div", { className: it.info, children: [
          /* @__PURE__ */ o("button", { type: "button", onClick: a, className: it.infoBtn, children: /* @__PURE__ */ o(St, {}) }),
          /* @__PURE__ */ o(
            gt,
            {
              value: _.filters.values.$isNoLayoversWithVisa,
              size: "large",
              onChange: s
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: it.toggle, children: [
        /* @__PURE__ */ o("span", { className: it.label, children: e("convenience.no_overnight_layovers") }),
        /* @__PURE__ */ o(
          gt,
          {
            value: _.filters.values.$isNoOvernightLayovers,
            size: "large",
            onChange: s,
            "data-testid": "no-overnight-layovers-toggle"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: it.toggle, children: [
        /* @__PURE__ */ o("span", { className: it.label, children: e("convenience.no_airport_changes") }),
        /* @__PURE__ */ o(
          gt,
          {
            value: _.filters.values.$isNoAirportChanges,
            size: "large",
            onChange: s
          }
        )
      ] })
    ] }) })
  ] });
}, Rh = "LayoverDuration-module__info___2cJf2", Ph = "LayoverDuration-module__infoLabel___z5wh2", Bh = "LayoverDuration-module__range___Etszv", Jn = {
  info: Rh,
  infoLabel: Ph,
  range: Bh
}, Ir = 0, Dr = 24 * 60, $h = (Dr - Ir) / 60, zi = Array.from({ length: $h + 1 }).map((t, e) => ({
  value: e * 60
})), jh = [4, 8, 12].map((t) => ({
  value: t * 60,
  label: t.toString()
})), Vh = () => {
  const t = Q(
    _.filters.values.layoverDurationMin ?? zi.at(0).value
  );
  re(() => {
    t.value = Ir;
  }, [Ir]);
  const e = Q(
    _.filters.values.layoverDurationMax ?? zi.at(-1).value
  );
  re(() => {
    _.filters.values.travelTime === void 0 && (e.value = Dr);
  }, [Dr]);
  const r = () => {
    _.filters.setIsUserInteraction(!0), _.filters.values.layoverDurationMin = t.value, _.filters.values.layoverDurationMax = e.value;
  }, n = () => {
    t.value = Ir, e.value = Dr;
  }, i = () => {
    n(), r();
  };
  re(() => {
    t.value !== _.filters.values.layoverDurationMin && (t.value = _.filters.values.layoverDurationMin ?? Ir);
  }, [_.filters.values.layoverDurationMin]), re(() => {
    e.value !== _.filters.values.layoverDurationMax && (e.value = _.filters.values.layoverDurationMax ?? Dr);
  }, [_.filters.values.layoverDurationMax]);
  const { t: a } = Y();
  return /* @__PURE__ */ o("div", { className: B(Jn.root), children: [
    /* @__PURE__ */ o("div", { className: Jn.info, children: [
      /* @__PURE__ */ o("p", { className: Jn.infoLabel, children: a("layoverduration.layover_duration") }),
      /* @__PURE__ */ o(
        rr,
        {
          valueChanged: t.value !== Ir || e.value !== Dr,
          onClear: i,
          children: t.value ? a("traveltime.from_to", {
            timeFrom: t.value / 60,
            timeTo: e.value / 60
          }) : a("traveltime.up_to", { time: e.value / 60 })
        }
      )
    ] }),
    /* @__PURE__ */ o(
      Ni,
      {
        options: zi,
        labels: jh,
        minValue: t,
        maxValue: e,
        onSelectionEnd: r,
        className: Jn.range
      }
    )
  ] });
}, qh = "Layovers-module__root___ISoIo", Uh = "Layovers-module__duration___Wv1-U", Qh = "Layovers-module__body___c84bP", Wh = "Layovers-module__label___KjsI9", zh = "Layovers-module__price___u0I4R", Nr = {
  root: qh,
  duration: Uh,
  body: Qh,
  label: Wh,
  price: zh
}, Hh = ["layovers-option-zero", "layovers-option-one", "layovers-option-two"], Gh = ({ classNames: t, options: e }) => {
  const { priceFormatter: r } = Ze(), { t: n } = Y(), i = new Intl.PluralRules(Za()), a = (s) => s === 0 ? n("filters.stops_zero") : n(`layovers.count_layovers.${i.select(s)}`, {
    count: s
  });
  return /* @__PURE__ */ o("div", { className: Nr.root, children: [
    /* @__PURE__ */ o("div", { className: B(Nr.header, t == null ? void 0 : t.header), children: n("layovers.layovers") }),
    /* @__PURE__ */ o("div", { className: B(Nr.body, t == null ? void 0 : t.body), children: [
      /* @__PURE__ */ o(
        Dt,
        {
          options: ki(e, (s, l) => s.layoversCount === l.layoversCount).sort((s, l) => s.layoversCount > l.layoversCount ? 1 : -1).map((s) => ({
            value: s.layoversCount,
            "data-testid": Hh[s.layoversCount],
            label: /* @__PURE__ */ o("div", { className: Nr.label, children: [
              /* @__PURE__ */ o("span", { children: a(s.layoversCount) }),
              /* @__PURE__ */ o("span", { className: Nr.price, children: r.format(s.lowestPrice) })
            ] })
          })),
          values: _.filters.values.$layoversCounts,
          onChange: () => {
            _.filters.setIsUserInteraction(!0);
          }
        }
      ),
      /* @__PURE__ */ o("div", { className: Nr.duration, children: /* @__PURE__ */ o(Vh, {}) })
    ] })
  ] });
}, Zh = "Popular-module__body___41ohT", Hi = {
  body: Zh
}, Kh = ({ classNames: t }) => {
  const { t: e } = Y(), r = () => {
    _.filters.setIsUserInteraction(!0), _.filters.values.baggage = ["full_baggage"];
  }, n = () => {
    _.filters.setIsUserInteraction(!0), _.filters.values.baggage = [];
  }, i = () => {
    _.filters.setIsUserInteraction(!0), _.filters.values.layoversCounts = [0];
  }, a = () => {
    _.filters.setIsUserInteraction(!0), _.filters.values.layoversCounts = [];
  };
  return /* @__PURE__ */ o("div", { className: Hi.root, children: [
    /* @__PURE__ */ o("div", { className: B(Hi.header, t == null ? void 0 : t.header), children: e("popular.popular_filters") }),
    /* @__PURE__ */ o("div", { className: B(Hi.body, t == null ? void 0 : t.body), children: [
      /* @__PURE__ */ o(
        rr,
        {
          valueChanged: _.filters.values.baggage.length === 1,
          onClick: r,
          onClear: n,
          "data-testid": "baggage-included-filter",
          children: e("flightmatrix.baggage_included")
        }
      ),
      /* @__PURE__ */ o(
        rr,
        {
          valueChanged: _.filters.values.layoversCounts.length === 1 && _.filters.values.layoversCounts.includes(0),
          onClick: i,
          onClear: a,
          children: e("flightmatrix.no_layovers")
        }
      )
    ] })
  ] });
}, Yh = "PriceFilter-module__body___-06mH", Jh = "PriceFilter-module__info___xecPl", Xh = "PriceFilter-module__infoLabel___rDCC5", ef = "PriceFilter-module__range___C26oX", on = {
  body: Yh,
  info: Jh,
  infoLabel: Xh,
  range: ef
}, tf = ({ classNames: t, maxPrice: e, minPrice: r }) => {
  const { t: n } = Y(), i = Q(r), { priceFormatter: a } = Ze();
  re(() => {
    i.value = r, _.filters.values.priceMin = r;
  }, [r]);
  const s = Q(_.filters.values.priceMax ?? e);
  re(() => {
    _.filters.values.priceMax === void 0 && (s.value = e);
  }, [e]);
  const l = () => {
    _.filters.setIsUserInteraction(!0), _.filters.values.priceMin = i.value, _.filters.values.priceMax = s.value;
  };
  re(() => {
    i.value !== _.filters.values.priceMin && (i.value = _.filters.values.priceMin ?? r);
  }, [_.filters.values.priceMin]), re(() => {
    s.value !== _.filters.values.priceMax && (s.value = _.filters.values.priceMax ?? e);
  }, [_.filters.values.priceMax]);
  const c = () => {
    s.value = e, l();
  };
  return /* @__PURE__ */ o(
    wt,
    {
      withArrowIcon: !0,
      classNames: { root: on.root, header: t == null ? void 0 : t.header },
      header: n("sorting.price"),
      children: /* @__PURE__ */ o("div", { className: B(on.body, t == null ? void 0 : t.body), children: [
        /* @__PURE__ */ o("div", { className: on.info, children: [
          /* @__PURE__ */ o("p", { className: on.infoLabel, children: n("pricefilter.total") }),
          /* @__PURE__ */ o(rr, { valueChanged: s.value !== e, onClear: c, children: n("to_price", {
            price: a.format(s.value)
          }) })
        ] }),
        /* @__PURE__ */ o(
          Ni,
          {
            min: r,
            max: e,
            minValue: i,
            maxValue: s,
            onSelectionEnd: l,
            showMin: !1,
            className: on.range
          }
        )
      ] })
    }
  );
}, rf = "Radiolist-module__root___RXRYc", nf = "Radiolist-module__option___F2zBL", af = "Radiolist-module__nativeInput___361IY", of = "Radiolist-module__radio___q96O-", sf = "Radiolist-module__active___uJmRe", ur = {
  root: rf,
  option: nf,
  nativeInput: af,
  radio: of,
  active: sf
}, lf = (t, e) => /* @__PURE__ */ w("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("circle", { cx: 10, cy: 10, r: 10, fill: "#07C369" }), /* @__PURE__ */ w("circle", { cx: 10, cy: 10, r: 4, fill: "white" })), cf = Ce(lf), uf = (t, e) => /* @__PURE__ */ w("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("circle", { cx: 10, cy: 10, r: 9.5, stroke: "#E0E2E8" })), df = Ce(uf), hf = ({ options: t, className: e, value: r }) => /* @__PURE__ */ o("div", { className: B(ur.root, e), children: t.map((n) => {
  const i = Object.fromEntries(
    Object.entries(n).filter(([a]) => a.startsWith("data-"))
  );
  return /* @__PURE__ */ o("label", { className: ur.option, ...i, children: [
    /* @__PURE__ */ o(
      "input",
      {
        type: "radio",
        checked: n.value === r.value,
        onChange: () => r.value = n.value,
        value: n.value,
        className: ur.nativeInput,
        tabIndex: 0
      }
    ),
    n.value === r.value ? /* @__PURE__ */ o(cf, { className: B(ur.radio, ur.active) }) : /* @__PURE__ */ o(df, { className: ur.radio }),
    /* @__PURE__ */ o("span", { className: ur.label, children: n.label })
  ] }, n.value);
}) }), ff = "SortBy-module__closed___YSRrx", Xn = {
  closed: ff
}, pf = ({ classNames: t }) => {
  const { t: e } = Y(), r = [
    {
      value: lr.Best,
      label: e("sorting.recommended_first"),
      "data-testid": "sort-recommended-first"
    },
    {
      value: lr.Cheapest,
      label: e("sorting.cheapest_first"),
      "data-testid": "sort-cheapest-first"
    },
    {
      value: lr.DepartureTime,
      label: e("sorting.departure_time"),
      "data-testid": "sort-departure-time"
    },
    { value: lr.ArrivalTime, label: e("sorting.arrival_time") },
    { value: lr.LayoverDuration, label: e("sorting.layover_duration") },
    { value: lr.TripDuration, label: e("sorting.trip_duration") },
    { value: lr.Rating, label: e("sorting.rating_sort") }
  ];
  return /* @__PURE__ */ o(
    wt,
    {
      withArrowIcon: !0,
      classNames: {
        root: Xn.root,
        header: B(Xn.header, t == null ? void 0 : t.header),
        closed: Xn.closed
      },
      header: e("filters.sorting"),
      "data-testid": "expandable-sort-filter",
      children: /* @__PURE__ */ o("div", { className: B(Xn.body, t == null ? void 0 : t.body), children: /* @__PURE__ */ o(hf, { options: r, value: _.filters.values.$order }) })
    }
  );
}, _f = "TravelTime-module__body___KWBoi", gf = "TravelTime-module__info___eKDho", mf = "TravelTime-module__infoLabel___HcHzZ", vf = "TravelTime-module__range___5SHFV", sn = {
  body: _f,
  info: gf,
  infoLabel: mf,
  range: vf
}, yf = ({ minTime: t, maxTime: e, classNames: r }) => {
  const { t: n } = Y(), i = Math.ceil(t / 60) * 60, a = Math.ceil(e / 60) * 60, s = i / 60, c = a / 60 - s, u = Array.from({ length: c + 1 }).map((m, y, v) => ({
    value: y === v.length - 1 ? a : (s + y) * 60
  })), d = Q(u.at(0).value);
  re(() => {
    d.value = i;
  }, [i]);
  const h = Q(_.filters.values.travelTime ?? u.at(-1).value);
  re(() => {
    _.filters.values.travelTime === void 0 && (h.value = a);
  }, [a]);
  const f = () => {
    _.filters.setIsUserInteraction(!0), _.filters.values.travelTime = h.value;
  }, p = () => {
    h.value = a, f();
  };
  return re(() => {
    h.value !== _.filters.values.travelTime && (h.value = _.filters.values.travelTime ?? a);
  }, [_.filters.values.travelTime]), /* @__PURE__ */ o(
    wt,
    {
      withArrowIcon: !0,
      classNames: { root: sn.root, header: r == null ? void 0 : r.header },
      header: n("filters.duration_of_flight"),
      children: /* @__PURE__ */ o("div", { className: B(sn.body, r == null ? void 0 : r.body), children: [
        /* @__PURE__ */ o("div", { className: sn.info, children: [
          /* @__PURE__ */ o("p", { className: sn.infoLabel, children: n("pricefilter.total") }),
          /* @__PURE__ */ o(
            rr,
            {
              valueChanged: h.value !== a,
              onClear: p,
              children: n("traveltime.up_to", {
                time: Math.ceil(h.value / 60)
              })
            }
          )
        ] }),
        /* @__PURE__ */ o(
          Ni,
          {
            options: u,
            minValue: d,
            maxValue: h,
            onSelectionEnd: f,
            showMin: !1,
            className: sn.range
          }
        )
      ] })
    }
  );
}, bf = "AircraftTypes-module__root___3fFXl", Cf = "AircraftTypes-module__body___aH80H", wf = "AircraftTypes-module__header___GimlF", Tf = "AircraftTypes-module__label___m1F9E", kf = "AircraftTypes-module__price___c6enm", xr = {
  root: bf,
  body: Cf,
  header: wf,
  label: Tf,
  price: kf
}, Nf = ({ equipments: t, classNames: e }) => {
  const { t: r } = Y(), { priceFormatter: n } = Ze(), i = () => _.filters.setIsUserInteraction(!0);
  return /* @__PURE__ */ o(
    wt,
    {
      withArrowIcon: !0,
      classNames: { root: xr.root, header: e == null ? void 0 : e.header },
      header: /* @__PURE__ */ o("div", { className: xr.header, children: [
        /* @__PURE__ */ o("span", { children: r("filters.aircraft_types") }),
        /* @__PURE__ */ o(
          qn,
          {
            options: t.map((a) => a.code),
            value: _.filters.values.$equipments,
            onClick: i,
            "data-testid": "aircraft-types-filter-toggle-all"
          }
        )
      ] }),
      "data-testid": "expandable-aircraft-types-filter",
      children: /* @__PURE__ */ o("div", { className: B(xr.body, e == null ? void 0 : e.body), children: /* @__PURE__ */ o(
        Dt,
        {
          options: t.map((a) => ({
            value: a.code,
            key: a.code,
            label: /* @__PURE__ */ o("div", { className: xr.label, children: [
              /* @__PURE__ */ o("div", { className: xr.labelInfo, children: /* @__PURE__ */ o("span", { children: a.name }) }),
              Un(a.lowestPrice) && /* @__PURE__ */ o("span", { className: xr.price, "data-role": "aircraft-types-filter-price", children: n.format(a.lowestPrice) })
            ] }),
            "data-role": "aircraft-types-filter-option"
          })),
          values: _.filters.values.$equipments,
          onChange: i
        }
      ) })
    }
  );
}, at = {
  header: ga.filterHeader,
  body: ga.filterBody
}, ei = (t) => !isNaN(t) && t !== 1 / 0 && t !== -1 / 0, xf = (t) => t.reduce(
  (e, r) => r.price.value < e.price.value ? r : e,
  { price: { value: 1 / 0 } }
).price.value, Ff = (t, e) => xf(
  t.filter(
    (r) => r.airports.arrival.find((n) => (n == null ? void 0 : n.code) === (e == null ? void 0 : e.code)) || r.airports.departure.find((n) => (n == null ? void 0 : n.code) === (e == null ? void 0 : e.code))
  )
), Lo = ({
  initialInfo: {
    agencies: t,
    places: { cities: e = {}, airports: r = {}, countries: n = {} } = {},
    selectedIatas: i,
    alliances: a,
    airlines: s,
    tickets: l,
    flightLegs: c,
    filter_boundaries: u,
    equipments: d
  },
  className: h
}) => {
  var J;
  const { i18n: f } = Y(), { t: p } = Y(), m = ((J = _.search.params) == null ? void 0 : J.directions) ?? [], y = Object.values(e ?? {}), v = Object.values(r ?? {}), g = Object.values(n ?? {}), b = m.map((F) => ({
    ...F,
    city: y.find((I) => I.code === F.origin)
  })), C = /* @__PURE__ */ new Set(), x = v.filter((F) => !i.includes(F.code)).filter((F) => !i.includes(F == null ? void 0 : F.city_code)).filter((F) => C.has(F.city_code) ? !1 : (C.add(F.city_code), !0)).map((F) => {
    var H, W, se;
    const I = y.find((L) => L.code === (F == null ? void 0 : F.city_code));
    if (!I) return null;
    const O = g.find((L) => L.code === (I == null ? void 0 : I.country));
    return O ? {
      iata: F.code,
      cityIata: F.city_code,
      name: (H = F.name[ye()]) == null ? void 0 : H.default,
      cityName: (W = I.name[ye()]) == null ? void 0 : W.default,
      countryName: (se = O.name[ye()]) == null ? void 0 : se.default,
      lowestPrice: Ff(l, F)
    } : null;
  }).filter(Boolean), N = (F, I) => {
    var se;
    const O = (se = g.find((L) => L.code === F)) == null ? void 0 : se.code, H = y.filter((L) => L.code === F || L.country === F).map((L) => L.code), W = v.filter((L) => L.code === F || H.includes(L == null ? void 0 : L.city_code)).map((L) => L.code);
    return [O, ...H, ...W].includes(
      I
    );
  }, T = [...g, ...v, ...y], M = (F) => Rr(() => {
    var O;
    const I = T.find((H) => H.code === F);
    return I == null || (I == null ? void 0 : I.name[f.language]) == null ? "[not-fond]" : (O = I == null ? void 0 : I.name[ye()]) == null ? void 0 : O.default;
  }, [f.language, F]), S = () => u != null && u.agents ? Object.entries(u.agents).map(([F, I]) => {
    var H;
    const O = t[F];
    return {
      id: Number(F),
      name: (H = O.label[ye()]) == null ? void 0 : H.default,
      lowestPrice: I
    };
  }) : [], R = (F) => {
    var I, O;
    return (O = (I = u == null ? void 0 : u.airports) == null ? void 0 : I[F]) != null && O.departure ? Object.entries(u.airports[F].departure).map(([H, W]) => {
      var L;
      return {
        name: (L = r[H].name[ye()]) == null ? void 0 : L.default,
        iata: H,
        lowestPrice: W
      };
    }) : [];
  }, $ = () => {
    const F = u.departure_arrival_time;
    let I = F[0].trip_duration.min, O = F[0].trip_duration.max;
    for (const H in F) {
      const W = F[H].trip_duration;
      W.min > I && (I = W.min), W.max > O && (O = W.max);
    }
    return { min: I, max: O };
  }, V = () => !(u != null && u.equipments) || !d ? [] : Object.entries(u.equipments).filter(([F]) => {
    const I = d[F];
    return (I == null ? void 0 : I.type) === "plane";
  }).map(([F, I]) => {
    const O = d[F];
    return {
      code: O.code,
      type: O.type,
      name: O.name,
      lowestPrice: Number(I)
    };
  });
  return /* @__PURE__ */ o("div", { className: B(ga.root, h), children: [
    /* @__PURE__ */ o(Kh, { classNames: at }),
    /* @__PURE__ */ o(
      Gh,
      {
        options: Object.entries(u.transfers_count ?? {}).map(([F, I]) => ({
          layoversCount: Number(F),
          lowestPrice: I
        })),
        classNames: at
      }
    ),
    /* @__PURE__ */ o(Lh, { classNames: at }),
    b.map((F, I) => /* @__PURE__ */ o(
      ld,
      {
        title: b.length === 2 && b[1].destination === b[0].origin ? `${p(I === 0 ? "filters.departure_to" : "filters.return_to")} ${M(F.destination)}` : void 0,
        fromIata: F.origin,
        toIata: F.destination,
        arrivalDateTimes: c.filter((O) => new Date(F.date) <= new Date(O.local_departure_date_time)).filter((O) => N(F.destination, O.destination)).filter(Boolean).map((O) => O.local_arrival_date_time),
        segmentIdx: I,
        classNames: at
      },
      `${F.origin}-${F.destination}-${I}`
    )),
    /* @__PURE__ */ o(ph, { classNames: at }),
    /* @__PURE__ */ o(
      Kd,
      {
        alliances: Object.entries((u == null ? void 0 : u.alliances) ?? {}).map(([F, I]) => {
          const O = a[F];
          return {
            id: F,
            name: (O == null ? void 0 : O.name) ?? "-",
            lowestPrice: Number(I)
          };
        }),
        airlines: Object.entries((u == null ? void 0 : u.airlines) ?? {}).map(([F, I]) => ({
          ...s[F],
          lowestPrice: Number(I)
        })),
        hasLowcosts: u == null ? void 0 : u.has_lowcosts,
        classNames: at
      }
    ),
    ei($().min) && ei($().max) && /* @__PURE__ */ o(
      yf,
      {
        minTime: $().min,
        maxTime: $().max,
        classNames: at
      }
    ),
    /* @__PURE__ */ o(wh, { airports: x, classNames: at }),
    b.map((F, I) => {
      var O, H, W;
      return /* @__PURE__ */ o(
        Sd,
        {
          placeIata: F.origin,
          airportCity: ((O = _.filters.values.segments[I]) == null ? void 0 : O.$directionAirports) || Js([]),
          changeAirportCity: (se) => {
            Xs(() => {
              _.filters.setIsUserInteraction(!0), _.filters.values.segments[I] || (_.filters.values.segments[I] = {
                arrivalTime: [{ min: "00:00", max: "24:00" }],
                departureTime: [{ min: "00:00", max: "24:00" }],
                arrivalDate: [],
                directionAirports: [],
                airportsArrival: []
              }), _.filters.values.segments[I].directionAirports = se;
            });
          },
          isRoundTrip: i.reduce(
            (se, L) => L === F.origin ? se + 1 : se,
            0
          ) > 1,
          airports: R(I),
          classNames: at,
          cityNameWhere: ((W = (H = F.city) == null ? void 0 : H.name[ye()]) == null ? void 0 : W.where) ?? ""
        },
        F.origin
      );
    }),
    ei(u.price.min) && ei(u.price.max) && /* @__PURE__ */ o(
      tf,
      {
        classNames: at,
        minPrice: u.price.min,
        maxPrice: u.price.max
      }
    ),
    /* @__PURE__ */ o(yd, { agencies: S(), classNames: at }),
    /* @__PURE__ */ o(Nf, { equipments: V(), classNames: at }),
    /* @__PURE__ */ o(pf, { classNames: at })
  ] });
}, Ef = "FlightFiltersMobileMenu-module__root___vey-7", Mf = "FlightFiltersMobileMenu-module__list___5LFtK", Sf = "FlightFiltersMobileMenu-module__chip___o8Hew", ln = {
  root: Ef,
  list: Mf,
  chip: Sf
}, Af = ({
  className: t,
  onMoreFiltersRequested: e,
  isLegacyResults: r,
  openUpdateModal: n
}) => {
  const { t: i } = Y(), a = () => {
    if (r != null && r.value) {
      n == null || n();
      return;
    }
    _.filters.values.baggage = ["full_baggage"];
  }, s = () => {
    if (r != null && r.value) {
      n == null || n();
      return;
    }
    _.filters.values.layoversCounts = [0];
  }, l = () => {
    if (r != null && r.value) {
      n == null || n();
      return;
    }
    e == null || e();
  };
  return /* @__PURE__ */ o("div", { className: B(ln.root, t), children: /* @__PURE__ */ o("div", { className: ln.list, children: [
    /* @__PURE__ */ o(
      rr,
      {
        valueChanged: _.filters.values.baggage.length === 1,
        onClick: a,
        onClear: () => _.filters.values.baggage = [],
        className: ln.chip,
        size: "medium",
        children: i("flightmatrix.baggage_included")
      }
    ),
    /* @__PURE__ */ o(
      rr,
      {
        valueChanged: _.filters.values.layoversCounts.length === 1 && _.filters.values.layoversCounts.includes(0),
        onClick: s,
        onClear: () => _.filters.values.layoversCounts = [],
        className: ln.chip,
        size: "medium",
        children: i("flightmatrix.no_layovers")
      }
    ),
    /* @__PURE__ */ o("button", { className: ln.chip, onClick: l, children: [
      /* @__PURE__ */ o("span", { children: i("card.checkboxes.more") }),
      /* @__PURE__ */ o(Tn, {})
    ] })
  ] }) });
}, If = "FlightFiltersMobileModal-module__root___871l1", Df = "FlightFiltersMobileModal-module__header___cp9Um", Of = "FlightFiltersMobileModal-module__content___KvPwe", Lf = "FlightFiltersMobileModal-module__resetBtn___IjTPV", Rf = "FlightFiltersMobileModal-module__title___ioMKp", Pf = "FlightFiltersMobileModal-module__submitBtn___vgiSF", Bf = "FlightFiltersMobileModal-module__closeBtn___tGEmA", dr = {
  root: If,
  header: Df,
  content: Of,
  resetBtn: Lf,
  title: Rf,
  submitBtn: Pf,
  closeBtn: Bf
}, $f = ({ children: t }) => {
  const { t: e } = Y();
  return /* @__PURE__ */ o("div", { className: dr.root, children: [
    /* @__PURE__ */ o("div", { className: dr.header, children: [
      /* @__PURE__ */ o("button", { className: dr.resetBtn, onClick: () => _.filters.reset(), children: e("filters.reset") }),
      /* @__PURE__ */ o("h1", { className: dr.title, children: e("filters.header") }),
      /* @__PURE__ */ o("button", { className: dr.closeBtn, onClick: () => _.modal.closeAllModals(), children: /* @__PURE__ */ o(el, {}) })
    ] }),
    /* @__PURE__ */ o("div", { className: dr.content, children: t }),
    /* @__PURE__ */ o(Ge, { className: dr.submitBtn, onClick: () => _.modal.closeAllModals(), children: e("flight_filters_modal.confirm") })
  ] });
}, jf = "FlightFilters-module__contentDesktop___ufEwC", Vf = "FlightFilters-module__contentDesktopLegacy___7lAgT", qf = "FlightFilters-module__resetLegacy___olAtu", Uf = "FlightFilters-module__filerContainer___YsfW4", Qf = "FlightFilters-module__menuMobile___EeKT-", Wf = "FlightFilters-module__filtersMobileView___COqGv", cn = {
  contentDesktop: jf,
  contentDesktopLegacy: Vf,
  resetLegacy: qf,
  filerContainer: Uf,
  menuMobile: Qf,
  filtersMobileView: Wf
}, zf = "FlightFiltersReset-module__root___YUC1H", Hf = "FlightFiltersReset-module__text___ESImy", Gf = "FlightFiltersReset-module__button___fyGtE", ti = {
  root: zf,
  text: Hf,
  button: Gf
}, Zf = ({
  className: t,
  onReset: e,
  onOkay: r,
  isSavedFromPrevSearch: n = !1
}) => {
  const { t: i } = Y(), a = i(n ? "filters.we_applied_filters_from_your_previous_search" : "filters.we_cleared_filters_from_your_previous_search");
  return n === null ? null : /* @__PURE__ */ o("div", { className: B(ti.root, t), children: [
    /* @__PURE__ */ o("p", { className: ti.text, children: a }),
    n ? /* @__PURE__ */ o(Ge, { className: ti.button, onClick: e, children: i("filters.reset_filters") }) : /* @__PURE__ */ o(Ge, { className: ti.button, onClick: r, children: i("filters.okay") })
  ] });
}, Kf = ({
  initialInfo: t,
  classNames: e,
  isStale: r,
  openUpdateModal: n
}) => {
  const i = () => _.modal.openModal({
    content: /* @__PURE__ */ o($f, { children: /* @__PURE__ */ o(Lo, { initialInfo: t }) }),
    variant: "fullscreen",
    name: "filtersMobileModal"
  }), a = Q(!1);
  re(() => {
    a.value = !!r, r && _.modal.modals.find((u) => u.name === "filtersMobileModal") && _.modal.closeAllModals();
  }, [r]);
  const s = () => {
    _.filters.reset(), c();
  }, l = Q(_.filters.isSavedFromPrevSearch !== null), c = () => {
    l.value = !1;
  };
  return /* @__PURE__ */ o(Ie, { children: [
    /* @__PURE__ */ o(
      Af,
      {
        className: B(cn.menuMobile, e == null ? void 0 : e.mobileMenu),
        onMoreFiltersRequested: i,
        isLegacyResults: a,
        openUpdateModal: n
      }
    ),
    /* @__PURE__ */ o("div", { className: cn.filerContainer, children: [
      l.value && /* @__PURE__ */ o(
        Zf,
        {
          className: B({
            [cn.resetLegacy]: a.value
          }),
          onReset: s,
          onOkay: c,
          isSavedFromPrevSearch: _.filters.isSavedFromPrevSearch
        }
      ),
      /* @__PURE__ */ o(
        Lo,
        {
          initialInfo: t,
          className: B(cn.contentDesktop, e == null ? void 0 : e.contentDesktop, {
            [cn.contentDesktopLegacy]: a.value
          })
        }
      )
    ] })
  ] });
}, Yf = "ChangeFlightClassModal-module__root___zXAde", Jf = "ChangeFlightClassModal-module__title___XgM6C", Xf = "ChangeFlightClassModal-module__content___y0ftI", ep = "ChangeFlightClassModal-module__description___36vnD", tp = "ChangeFlightClassModal-module__button___Ls44A", ri = {
  root: Yf,
  title: Jf,
  content: Xf,
  description: ep,
  button: tp
}, rp = ({ onChangeClass: t }) => {
  const { t: e } = Y();
  return /* @__PURE__ */ o("div", { className: ri.root, children: [
    /* @__PURE__ */ o("h1", { className: ri.title, children: e("changeflightclassmodal.no_business_tickets_found") }),
    /* @__PURE__ */ o("div", { className: ri.content, children: [
      /* @__PURE__ */ o("p", { children: e("changeflightclassmodal.but_we_have_economy_one") }),
      /* @__PURE__ */ o("p", { children: e("changeflightclassmodal.if_you_want_you_can_try_searching_them") })
    ] }),
    /* @__PURE__ */ o(Ge, { className: ri.button, onClick: t, children: e("changeflightclassmodal.search_economy_class") })
  ] });
}, np = (t, e) => /* @__PURE__ */ w("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8 15.5C11.866 15.5 15 12.366 15 8.5C15 4.63401 11.866 1.5 8 1.5C4.13401 1.5 1 4.63401 1 8.5C1 12.366 4.13401 15.5 8 15.5ZM7.53033 11.5303L12.0303 7.03033L10.9697 5.96967L7 9.93934L5.03033 7.96967L3.96967 9.03033L6.46967 11.5303H7.53033Z", fill: "#3BBF56" })), er = Ce(np), ip = (t, e) => /* @__PURE__ */ w("svg", { width: 14, height: 14, viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M1.76206 10.7322C1.89943 10.9032 2.09237 11.0002 2.29427 11L5.14978 10.9955C5.37513 10.9952 5.59724 10.9342 5.79814 10.8175L12.1628 7.12609C12.7477 6.78683 13.272 6.30256 13.6288 5.66829C14.0293 4.95626 14.0729 4.44099 13.9147 4.07697C13.757 3.71271 13.3735 3.4452 12.6405 3.3907C11.9876 3.34219 11.3381 3.5387 10.7532 3.87772L8.5983 5.12752L3.81433 3.07593C3.75681 3.03165 3.68999 3.00572 3.62076 3.00084C3.55154 2.99596 3.48244 3.01231 3.42059 3.04818L1.98234 3.88247C1.74894 4.01772 1.6925 4.37374 1.86925 4.59574L5.28649 7.04834L3.02882 8.35789L1.44619 7.44611C1.39167 7.41469 1.33144 7.39836 1.27038 7.39845C1.20931 7.39854 1.14912 7.41503 1.09467 7.44661L0.216839 7.95588C-0.0115313 8.08838 -0.0716864 8.4339 0.0949979 8.65791L1.76206 10.7322Z", fill: "#FF3B30" })), ap = Ce(ip), op = (t, e) => /* @__PURE__ */ w("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M12.6931 3.78799C12.3083 3.404 11.6846 3.404 11.2998 3.78799L7.98111 7.10028L4.70018 3.82569C4.31545 3.44171 3.69168 3.44171 3.30695 3.82569C2.92222 4.20968 2.92221 4.83224 3.30694 5.21623L6.58788 8.49082L3.28855 11.7838C2.90382 12.1678 2.90382 12.7903 3.28855 13.1743C3.67328 13.5583 4.29705 13.5583 4.68178 13.1743L7.98111 9.88135L11.3182 13.212C11.703 13.596 12.3267 13.596 12.7115 13.212C13.0962 12.828 13.0962 12.2055 12.7115 11.8215L9.37434 8.49082L12.6931 5.17852C13.0778 4.79454 13.0778 4.17197 12.6931 3.78799Z", fill: "#9EA9B7" })), kn = Ce(op), sp = (t, e) => /* @__PURE__ */ w("svg", { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M11.3748 2.27221L8.27709 5.56899C7.90764 5.93194 7.90764 6.59735 8.27709 6.9603C8.41918 7.11153 8.64653 7.20227 8.87389 7.17202C9.10124 7.17202 9.32859 7.08128 9.4991 6.89981L11 5.1758V15.0624C11 15.5437 11.5 16 12 16C12.5 16 13 15.59 13 15.0624V5.1758L14.4725 6.93006C14.643 7.11153 14.8987 7.20227 15.1261 7.20227C15.3534 7.20227 15.5524 7.11153 15.7229 6.9603C16.0923 6.59735 16.0923 5.96219 15.7229 5.56899L12.6252 2.27221C12.2842 1.90926 11.7158 1.90926 11.3748 2.27221Z", fill: "#9EA9B7" }), /* @__PURE__ */ w("path", { d: "M8 9C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11H7C6.44772 11 6 11.4477 6 12V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V12C18 11.4477 17.5523 11 17 11H16C15.4477 11 15 10.5523 15 10C15 9.44772 15.4477 9 16 9H17C18.6569 9 20 10.3431 20 12V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V12C4 10.3431 5.34315 9 7 9H8Z", fill: "#9EA9B7" })), ma = Ce(sp), lp = "Tooltip-module__tooltipContainer___8bHLD", cp = "Tooltip-module__tooltipBox___ME2TR", up = "Tooltip-module__arrow___leG7P", dp = "Tooltip-module__text___yUtb9", hp = "Tooltip-module__tooltipTop___tQXJ0", fp = "Tooltip-module__tooltipRight___hG7Ro", pp = "Tooltip-module__tooltipBottom___6xlYv", _p = "Tooltip-module__tooltipLeft___eWjSs", gp = "Tooltip-module__tooltipDisabled___oFfn0", mp = "Tooltip-module__leftAlign___-lKhU", vp = "Tooltip-module__rightAlign___ijdg2", yp = "Tooltip-module__centerTextAlign___ZCe63", bp = "Tooltip-module__rightTextAlign___vkpaJ", Cp = "Tooltip-module__leftTextAlign___3GXs1", wp = "Tooltip-module__arrowTop___p-LhB", Tp = "Tooltip-module__arrowRight___Fu8xj", kp = "Tooltip-module__arrowBottom___t1FMR", Np = "Tooltip-module__arrowLeft___UCnYd", kt = {
  tooltipContainer: lp,
  tooltipBox: cp,
  arrow: up,
  text: dp,
  tooltipTop: hp,
  tooltipRight: fp,
  tooltipBottom: pp,
  tooltipLeft: _p,
  tooltipDisabled: gp,
  leftAlign: mp,
  rightAlign: vp,
  centerTextAlign: yp,
  rightTextAlign: bp,
  leftTextAlign: Cp,
  arrowTop: wp,
  arrowRight: Tp,
  arrowBottom: kp,
  arrowLeft: Np
}, He = ({
  text: t,
  children: e,
  direction: r = "top",
  disabled: n,
  style: i,
  className: a,
  maxWidth: s,
  align: l,
  textAlign: c = "left"
}) => {
  const [u, d] = Pe(!0), h = It(null), f = Q("");
  re(() => {
    u && h.current && r === "top" && p();
  }, [u]);
  const p = () => {
    if (!h.current) return;
    const m = h.current.getBoundingClientRect();
    m && (f.value = `${m.height}px`);
  };
  return /* @__PURE__ */ o(
    "div",
    {
      ref: h,
      className: B(kt.tooltipContainer, a),
      onMouseEnter: () => d(!0),
      onMouseLeave: () => d(!1),
      style: i,
      children: [
        e,
        u && t && /* @__PURE__ */ o(Ie, { children: [
          /* @__PURE__ */ o(
            "div",
            {
              className: B(
                kt.arrow,
                kt[`arrow${r == null ? void 0 : r.charAt(0).toUpperCase()}${r == null ? void 0 : r.slice(1)}`]
              )
            }
          ),
          /* @__PURE__ */ o(
            "div",
            {
              className: B(
                kt.tooltipBox,
                kt[`tooltip${r.charAt(0).toUpperCase()}${r == null ? void 0 : r.slice(1)}`],
                { [kt.tooltipDisabled]: n },
                { [kt[`${l}Align`]]: l },
                { [kt[`${c}TextAlign`]]: c }
              ),
              style: {
                ...s ? { maxWidth: s } : void 0,
                ...f.value ? { top: f.value } : void 0
              },
              children: /* @__PURE__ */ o("div", { className: B(kt.text), children: t })
            }
          )
        ] })
      ]
    }
  );
}, Ln = (t) => {
  if (!t) return !1;
  const e = {
    weight: 8,
    width: 25,
    length: 35,
    height: 55
  }, { weight: r, length: n, width: i, height: a } = t;
  return !(!r || r < e.weight || !i || i < e.width || !n || n < e.length || !a || a < e.height);
}, xn = (t, e, r, n) => {
  var m, y, v;
  const i = e.minimum_fare, a = ((m = i == null ? void 0 : i.baggage) == null ? void 0 : m.count) || 0, s = a > 0 ? t("flightmatrix.baggage_included").toLowerCase() : "", l = Ln(i == null ? void 0 : i.handbags) ? 1 : 0, c = (y = i == null ? void 0 : i.change_before_flight) != null && y.available ? 1 : 0, u = c ? t("flightmatrix.changeable") : "", d = (v = i == null ? void 0 : i.return_before_flight) != null && v.available ? 1 : 0, h = d ? t("flightmatrix.refundable") : "", f = [s, u, h].filter(Boolean), p = `${a}_${l}_${d}_${c}`;
  return {
    isBasic: r === 0,
    id: p,
    options: {
      baggage: e.minimum_fare.baggage,
      handbags: e.minimum_fare.handbags,
      return_before_flight: e.minimum_fare.return_before_flight,
      change_before_flight: e.minimum_fare.change_before_flight,
      fare_key: e.minimum_fare.fare_key
    },
    price: e.price,
    unified_price: e.unified_price,
    labels: f.length ? f : [t("ticket.baggage.basic_fare")],
    flight_terms: e.flight_terms,
    title: n || "",
    tags: e.tags
  };
}, va = (t, e) => {
  const r = {};
  e.forEach((a, s) => {
    const l = xn(t, a, s);
    r[l.id] || (r[l.id] = l);
  });
  let n = !1;
  const i = Object.values(r);
  return i.forEach((a, s) => {
    var l, c, u, d, h;
    s === 0 ? (c = (l = a == null ? void 0 : a.options) == null ? void 0 : l.baggage) != null && c.count ? (a.title = t("ticket.baggage.cheap_fare_included"), n = !0) : a.title = t("ticket.baggage.cheap_fare") : (d = (u = a == null ? void 0 : a.options) == null ? void 0 : u.baggage) != null && d.count && !n ? (a.title = t("ticket.baggage.cheap_fare_included"), n = !0) : a.title = (h = a.labels) != null && h.length ? a.labels.join(" + ") : "";
  }), i;
}, xp = (t) => {
  const e = It(null);
  return re(() => {
    var r;
    if (e.current) {
      const n = e.current.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      ), i = n[0], a = n[n.length - 1], s = (l) => {
        l.key === "Tab" && (l.shiftKey ? document.activeElement === i && (a.focus(), l.preventDefault()) : document.activeElement === a && (i.focus(), l.preventDefault()));
      };
      return (r = e.current) == null || r.addEventListener("keydown", s), () => {
        var l;
        (l = e.current) == null || l.removeEventListener("keydown", s);
      };
    }
  }, [t]), e;
}, Fp = "TicketDetail-module__root___8FH0b", Ep = "TicketDetail-module__wrapper___a-NpT", Mp = "TicketDetail-module__close___VlIfc", Sp = "TicketDetail-module__share___bHDH6", Ap = "TicketDetail-module__head___yjh5i", Ip = "TicketDetail-module__fixed___NDBRl", Dp = "TicketDetail-module__body___Sszgu", Op = "TicketDetail-module__content___YELtV", Lp = "TicketDetail-module__main___snLFZ", Rp = "TicketDetail-module__flights___S8k26", ot = {
  root: Fp,
  wrapper: Ep,
  close: Mp,
  share: Sp,
  head: Ap,
  fixed: Ip,
  body: Dp,
  content: Op,
  main: Lp,
  flights: Rp
}, Pp = (t, e) => /* @__PURE__ */ w("svg", { width: 48, height: 48, viewBox: "0 0 48 48", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M23.8537 44.8011C35.4215 44.8011 44.7991 35.4235 44.7991 23.8556C44.7991 12.2878 35.4215 2.91016 23.8537 2.91016C12.2858 2.91016 2.9082 12.2878 2.9082 23.8556C2.9082 35.4235 12.2858 44.8011 23.8537 44.8011Z", fill: "url(#paint0_radial_4625_70643)" }), /* @__PURE__ */ w("path", { opacity: 0.5, d: "M23.8537 44.8011C35.4215 44.8011 44.7991 35.4235 44.7991 23.8556C44.7991 12.2878 35.4215 2.91016 23.8537 2.91016C12.2858 2.91016 2.9082 12.2878 2.9082 23.8556C2.9082 35.4235 12.2858 44.8011 23.8537 44.8011Z", fill: "url(#paint1_radial_4625_70643)" }), /* @__PURE__ */ w("path", { d: "M19.3234 13.8954C19.271 12.8874 18.3285 12.3114 16.7707 12.3899C15.4485 12.4685 12.5816 13.5027 10.7489 16.6968C10.4085 17.2859 10.9976 17.5739 11.338 17.1812C12.503 15.859 15.7103 14.0656 18.3023 14.2619C19.3496 14.3405 19.3234 13.8954 19.3234 13.8954Z", fill: "url(#paint2_linear_4625_70643)" }), /* @__PURE__ */ w("path", { d: "M17.0199 24.7605C18.1333 24.7605 19.0359 23.3949 19.0359 21.7103C19.0359 20.0258 18.1333 18.6602 17.0199 18.6602C15.9065 18.6602 15.0039 20.0258 15.0039 21.7103C15.0039 23.3949 15.9065 24.7605 17.0199 24.7605Z", fill: "url(#paint3_radial_4625_70643)" }), /* @__PURE__ */ w("path", { d: "M17.0199 19.6934C17.8839 19.6934 18.6432 20.4527 19.0359 21.5654C19.0097 19.9159 18.1195 18.5938 17.0199 18.5938C15.9203 18.5938 15.0301 19.9159 15.0039 21.5654C15.3966 20.4396 16.1428 19.6934 17.0199 19.6934Z", fill: "url(#paint4_linear_4625_70643)" }), /* @__PURE__ */ w("path", { d: "M30.6879 24.7605C31.8013 24.7605 32.7039 23.3949 32.7039 21.7103C32.7039 20.0258 31.8013 18.6602 30.6879 18.6602C29.5745 18.6602 28.6719 20.0258 28.6719 21.7103C28.6719 23.3949 29.5745 24.7605 30.6879 24.7605Z", fill: "url(#paint5_radial_4625_70643)" }), /* @__PURE__ */ w("path", { d: "M28.3829 13.9579C28.4352 12.9499 29.3778 12.3739 30.9356 12.4524C32.2578 12.531 35.1247 13.5652 36.9574 16.7593C37.2978 17.3484 36.7087 17.6364 36.3683 17.2437C35.2032 15.9215 31.996 14.1281 29.404 14.3244C28.3567 14.4161 28.3829 13.9579 28.3829 13.9579Z", fill: "url(#paint6_linear_4625_70643)" }), /* @__PURE__ */ w("path", { d: "M30.6879 19.7598C29.8239 19.7598 29.0646 20.5191 28.6719 21.6318C28.6981 19.9823 29.5882 18.6602 30.6879 18.6602C31.7875 18.6602 32.6777 19.9823 32.7039 21.6318C32.3111 20.5191 31.565 19.7598 30.6879 19.7598Z", fill: "url(#paint7_linear_4625_70643)" }), /* @__PURE__ */ w("path", { d: "M33.0975 35.8984C33.5033 35.5711 33.5818 34.9689 33.2677 34.55C31.4218 32.0628 28.4764 29.8242 23.8553 29.8242C19.2342 29.8242 16.2887 32.0628 14.4429 34.55C14.1287 34.9689 14.2073 35.5711 14.6131 35.8984C15.0451 36.2519 15.6997 36.1733 16.0269 35.7151C17.6109 33.6206 20.0327 31.8664 23.8422 31.8664C27.6517 31.8664 30.0866 33.6206 31.6575 35.7151C32.0109 36.1733 32.6524 36.2519 33.0975 35.8984Z", fill: "url(#paint8_radial_4625_70643)" }), /* @__PURE__ */ w("path", { d: "M33.4516 35.2439C33.4778 35.0082 33.4254 34.7595 33.2683 34.55C31.4225 32.0628 28.4771 29.8242 23.856 29.8242C19.2349 29.8242 16.2894 32.0628 14.4436 34.55C14.2865 34.7595 14.2342 35.0082 14.2603 35.2439C16.2632 32.8089 19.3003 30.7537 23.856 30.7537C28.4116 30.7537 31.4618 32.8089 33.4516 35.2439Z", fill: "url(#paint9_linear_4625_70643)" }), /* @__PURE__ */ w("defs", null, /* @__PURE__ */ w("radialGradient", { id: "paint0_radial_4625_70643", cx: 0, cy: 0, r: 1, gradientUnits: "userSpaceOnUse", gradientTransform: "translate(19.7326 15.3714) scale(25.268)" }, /* @__PURE__ */ w("stop", { stopColor: "#FFE030" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#FFB92E" })), /* @__PURE__ */ w("radialGradient", { id: "paint1_radial_4625_70643", cx: 0, cy: 0, r: 1, gradientUnits: "userSpaceOnUse", gradientTransform: "translate(19.7326 15.3714) scale(19.8794)" }, /* @__PURE__ */ w("stop", { stopColor: "#FFEA5F" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#FFBC47", stopOpacity: 0 })), /* @__PURE__ */ w("linearGradient", { id: "paint2_linear_4625_70643", x1: 15.0078, y1: 15.8094, x2: 14.8621, y2: 13.1656, gradientUnits: "userSpaceOnUse" }, /* @__PURE__ */ w("stop", { offset: 132565e-8, stopColor: "#3C2200" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#7A4400" })), /* @__PURE__ */ w("radialGradient", { id: "paint3_radial_4625_70643", cx: 0, cy: 0, r: 1, gradientUnits: "userSpaceOnUse", gradientTransform: "translate(16.405 21.7863) rotate(73.8539) scale(2.95944 1.91471)" }, /* @__PURE__ */ w("stop", { offset: 132565e-8, stopColor: "#7A4400" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#643800" })), /* @__PURE__ */ w("linearGradient", { id: "paint4_linear_4625_70643", x1: 17.0149, y1: 18.6386, x2: 17.0149, y2: 21.4812, gradientUnits: "userSpaceOnUse" }, /* @__PURE__ */ w("stop", { offset: 132565e-8, stopColor: "#3C2200" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#512D00" })), /* @__PURE__ */ w("radialGradient", { id: "paint5_radial_4625_70643", cx: 0, cy: 0, r: 1, gradientUnits: "userSpaceOnUse", gradientTransform: "translate(30.0835 21.7868) rotate(73.854) scale(2.95944 1.9147)" }, /* @__PURE__ */ w("stop", { offset: 132565e-8, stopColor: "#7A4400" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#643800" })), /* @__PURE__ */ w("linearGradient", { id: "paint6_linear_4625_70643", x1: 32.711, y1: 15.8819, x2: 32.8567, y2: 13.238, gradientUnits: "userSpaceOnUse" }, /* @__PURE__ */ w("stop", { offset: 132565e-8, stopColor: "#3C2200" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#7A4400" })), /* @__PURE__ */ w("linearGradient", { id: "paint7_linear_4625_70643", x1: 30.6929, y1: 18.7144, x2: 30.6929, y2: 21.557, gradientUnits: "userSpaceOnUse" }, /* @__PURE__ */ w("stop", { offset: 132565e-8, stopColor: "#3C2200" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#512D00" })), /* @__PURE__ */ w("radialGradient", { id: "paint8_radial_4625_70643", cx: 0, cy: 0, r: 1, gradientUnits: "userSpaceOnUse", gradientTransform: "translate(28.0506 30.2408) scale(8.13807 9.17896)" }, /* @__PURE__ */ w("stop", { offset: 132565e-8, stopColor: "#7A4400" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#643800" })), /* @__PURE__ */ w("linearGradient", { id: "paint9_linear_4625_70643", x1: 14.2479, y1: 32.5338, x2: 33.4641, y2: 32.5338, gradientUnits: "userSpaceOnUse" }, /* @__PURE__ */ w("stop", { offset: 132565e-8, stopColor: "#3C2200" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#512D00" })))), ol = Ce(Pp), Bp = (t, e) => /* @__PURE__ */ w("svg", { width: 40, height: 40, viewBox: "0 0 40 40", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M20.5 7.66667C18.0402 7.6673 15.6325 8.37482 13.5634 9.70499C11.4943 11.0352 9.85109 12.9319 8.82939 15.1695C7.80769 17.407 7.45055 19.8911 7.8005 22.3258C8.15046 24.7605 9.19275 27.0434 10.8033 28.9026C12.4138 30.7618 14.5247 32.119 16.8847 32.8126C19.2447 33.5062 21.7542 33.5069 24.1146 32.8147C26.475 32.1226 28.5867 30.7666 30.1983 28.9084C31.81 27.0501 32.8536 24.7679 33.205 22.3333H36.8992C36.4257 26.5207 34.3682 30.3682 31.1486 33.0871C27.929 35.8059 23.7912 37.19 19.5837 36.9555C15.3762 36.7211 11.4178 34.8858 8.52016 31.8261C5.62255 28.7664 4.00529 24.714 4 20.5C4.00007 17.3148 4.92205 14.1978 6.65466 11.525C8.38726 8.85234 10.8564 6.73823 13.7641 5.43793C16.6717 4.13762 19.8936 3.7067 23.0408 4.19717C26.188 4.68765 29.1259 6.07855 31.5 8.202V4H35.1667V13.1667L33.3333 15H24.1667V11.3333H29.4815C27.0853 8.97918 23.8592 7.66213 20.5 7.66667Z", fill: "white" }), /* @__PURE__ */ w("path", { d: "M20.5 7.66667C18.0402 7.6673 15.6325 8.37482 13.5634 9.70499C11.4943 11.0352 9.85109 12.9319 8.82939 15.1695C7.80769 17.407 7.45055 19.8911 7.8005 22.3258C8.15046 24.7605 9.19275 27.0434 10.8033 28.9026C12.4138 30.7618 14.5247 32.119 16.8847 32.8126C19.2447 33.5062 21.7542 33.5069 24.1146 32.8147C26.475 32.1226 28.5867 30.7666 30.1983 28.9084C31.81 27.0501 32.8536 24.7679 33.205 22.3333H36.8992C36.4257 26.5207 34.3682 30.3682 31.1486 33.0871C27.929 35.8059 23.7912 37.19 19.5837 36.9555C15.3762 36.7211 11.4178 34.8858 8.52016 31.8261C5.62255 28.7664 4.00529 24.714 4 20.5C4.00007 17.3148 4.92205 14.1978 6.65466 11.525C8.38726 8.85234 10.8564 6.73823 13.7641 5.43793C16.6717 4.13762 19.8936 3.7067 23.0408 4.19717C26.188 4.68765 29.1259 6.07855 31.5 8.202V4H35.1667V13.1667L33.3333 15H24.1667V11.3333H29.4815C27.0853 8.97918 23.8592 7.66213 20.5 7.66667Z", fill: "white" })), $p = Ce(Bp), jp = "PartiallyRefundableModal-module__root___RqAFZ", Vp = "PartiallyRefundableModal-module__container___VVC6N", qp = "PartiallyRefundableModal-module__icon___OsPP6", Up = "PartiallyRefundableModal-module__title___-y5vb", Qp = "PartiallyRefundableModal-module__content___aqVc0", Wp = "PartiallyRefundableModal-module__list___QU13U", zp = "PartiallyRefundableModal-module__close___GulfJ", Nt = {
  root: jp,
  container: Vp,
  icon: qp,
  title: Up,
  content: Qp,
  list: Wp,
  close: zp
}, Hp = () => {
  const t = () => {
    _.modal.closeLastModal();
  }, { t: e } = Y();
  return /* @__PURE__ */ o("div", { className: Nt.root, children: /* @__PURE__ */ o("div", { className: Nt.container, children: [
    /* @__PURE__ */ o("button", { className: Nt.close, type: "button", onClick: t, children: /* @__PURE__ */ o(Tt, {}) }),
    /* @__PURE__ */ o("div", { className: Nt.icon, children: /* @__PURE__ */ o($p, {}) }),
    /* @__PURE__ */ o("h1", { className: Nt.title, children: e("partiallyrefundablemodal.partial_refunds_what_are_they") }),
    /* @__PURE__ */ o("div", { className: Nt.content, children: [
      /* @__PURE__ */ o("p", { className: Nt.description, children: e("partiallyrefundablemodal.its_when_you_can_get_your_ticket_refunded") }),
      /* @__PURE__ */ o("ul", { className: Nt.list, children: [
        /* @__PURE__ */ o("li", { children: e("partiallyrefundablemodal.you_can_find_out_the_additional_fee_amount") }),
        /* @__PURE__ */ o("li", { children: e("partiallyrefundablemodal.if_youre_booking_an_agency_they_might_charge") }),
        /* @__PURE__ */ o("li", { children: e("partiallyrefundablemodal.its_often_the_case_that_the_earlier_you") })
      ] }),
      /* @__PURE__ */ o("p", { className: Nt.description, children: e("partiallyrefundablemodal.only_the_seller_can_refund_your_ticket_however") })
    ] })
  ] }) });
}, Gp = (t, e) => /* @__PURE__ */ w("svg", { width: 40, height: 40, viewBox: "0 0 40 40", fill: "none", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", ref: e, ...t }, /* @__PURE__ */ w("mask", { id: "mask0_3655_70990", style: {
  maskType: "alpha"
}, maskUnits: "userSpaceOnUse", x: 0, y: 0, width: 40, height: 40 }, /* @__PURE__ */ w("rect", { width: 40, height: 40, fill: "url(#pattern0_3655_70990)" })), /* @__PURE__ */ w("g", { mask: "url(#mask0_3655_70990)" }, /* @__PURE__ */ w("rect", { width: 40, height: 40, fill: "white" })), /* @__PURE__ */ w("defs", null, /* @__PURE__ */ w("pattern", { id: "pattern0_3655_70990", patternContentUnits: "objectBoundingBox", width: 1, height: 1 }, /* @__PURE__ */ w("use", { xlinkHref: "#image0_3655_70990", transform: "scale(0.0104167)" })), /* @__PURE__ */ w("image", { id: "image0_3655_70990", width: 96, height: 96, xlinkHref: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAJKklEQVR4nO2db4wU5R3Hv7+ZvduD2xU4dnbm5kSuetjG0yJ9QZtoU/8UDEZabS2pVUhTTYyx1sbYF4itocWmb1patWlJJFHrC1u0SEFJlJRW0aZCqKGeYkQ5KTf7zN2iyO1yeNw8v764g17o/puZZ2f/3H7e3e7z/J7vzneeZ56/c0CLFi1atGjRokWLFi1mGlRrAbXGNM3LAO0OgK8F0Dv18SBAuwD5uOu6b1Wz/BlrQF9fXzyXy21kxp0AtCLJPGb83jDm3zcwMDBeDR0z0oC+vr746GhuJ4CrK8zy11Rq/opqmKCrDtgItLe3PwbgWz6yfObkybF5+Xxup2otM64GTLb59CaKNzvF8IiwWAgxoFKPXxFNgHYHgv1unZlvV65GdcD6h78aPC8tU6djkhloAC4IkXehMhVTzEQDuEZ5CzITDfhPiLxHlKmYYgYaQC8Hzkl4SaUSYEYaIB8H4AXI6AHYrFhM/Y8DLMtaykw/BHgZgHGABgC5g5lfGB4efj9IzHTaeowId/vLRY+4bubeIOWVjKo6oCosy+pnxkMAbkZxnR8AtAOQ21Op1CuVThX09/e3Z7PHXgRwbWVqaJfrZq4HcLqy9JVTdwbYtv05KeUDzPgO/E2V5AHsBmi7553ens1mM6UST5nwSwB3lSjHA+i3rpu5H1W4+EAdGdDd3b1QSvkAQN8DEAsZTgL4FxF2ENH2TCazH0W6kJM1jW+fGmT1Tn08OPXA3SyEeDuklpLU3ICenp7zJyYmHpy68G3VKIMZp4noRUA+WO35fb/UzADbtlOeJ+8H8AMAsyIqlpmxyTDm31ut+X2/RG6AYRgJTYutA/geAJ1Rlz8JvZ5KdV1dDyZEasDcub1z4/FTewD0R1luIZixc3hYXF9rHZEuyMyZM+sXAFYGyUuEPQD/DKBjAGwAiTBaiLAokUg6+Xxuf5g4YYm0BpimdQDAZT6zHSDCBiHElukfWpbVD+AGZvoJwLMDSsrF4+0XHDly5OOA+UMT9VREykfaAwDf6Lri8nMvPgAIIQaI6BlmGeYBnhgfH/9NiPyhidqAvRWkOQjwt11XLHFddxtKTAFLyQ8RUahazIzV6XT3TWFihCHSJsi27S94nnwNQEeBrw8TYb0Q4mlUMFmWTqcvItIOIvygDQCGiXCpEGJEQSxfRFoDHMfZzyyvAfDGtI8/YKa7XFd8VgjxJCqeqdR+DDUXHwDSzLxJUSxf1GwglkqluuPxuD40NHTUb17DMPo0TX8H6gwAADDT6uHhzNMqY5aj5lMRQbAs6ylmrK5C6E90Xfu84zjKV76K0XALMoZhLGLGLVUKP8fzeDMivDEbbmdcMjnnUQCLq1jEhZ2dSZHP5/ZVsYyzNFQTlEr1XKzr3tuo/o2Tl9JbMjIy8l6Vy2msJkjXvfUIf/GZiMrtjOjUtNgTCsoqS8PUAMuyLmHGvxH6puHnNU3bKCXvDh8LADAK8C5d19c6jvOu38wNUwOkxE8RXi9rmvZwJpN5hQi/VqELQBKgmzxPvt7T03O+38wNYYBt20uI8I3wkXhbJpPZBwAdHR3rALwTPuZZuiYmvF/5zdQQBkgpn0X45pI1TXv4zB+Dg4OnNI3WAJgIGXc61/nNUPcGmKZ5DTMuDB+J/nLm7j9DJpPZR4Sfh499Ft97R+veAIBuVBCENQ0bCn0hhNjADCWLMkTY5TdPAxhQ6eapUvyv7S/A6VhMuxXARyEL+cjzvLV+MzWCAWH28wPntP2FcBznoJTeF4nwHMDHfcY/QYTnpPS+FGTgVvfjANO0TgBIBo/Az7uuW7MFl3I0Qg0Is58f5e7+WtMABgTfz8/MHjNnVapRTQMYEHg/P4hIB/A7tXrUUvfT0fl8frizM5EmwtKAIfo6O5Nv5fM5laNeZTRADQAMY/59qGxHRUGI+NF58+bNUShJGQ1hwMDAwLiua1cBOBwwRHd7e8d6dYrUUffd0HPQTbN7C8BBupWermtLHcep6VbEc2mIGjANz3Uz3ySC71lHALrnyU2os+deXYk5g2EYfSdPnhzF5EmX/yOXy72UTCZOAfD72gE7mUwM53K5wM8T1dRdE2QYxiJN018FsLetLbbq6NGjY8XSWpZ1NzMegb+afGJiInbJsWNHh0KLVUBd1QDbthcAtBtAD4CLpZRXxuPtfx4bG/u0UPpcLre3szP5PhFWovLfEtc02ZPP555VpTsMSmqAbdsLpJQbmbEcoeZtCrI3FtNXDA0NHSuWwDTNlQD9CYX3nBaECDcIIV5QojAEoQ2wbXuB58k3AXQp0FOMAc+bWJ7NZp1iCSzLuooZ2wCcV2HMDwHud103r0ZiMEL3gqSUG1Hdiw8A/boee9U0zaIrY0KIvxFhGYCiNeUcFhLRj9TIC05oA6aanSiwpNTtUgmEEG8Q4SsAitaU6TDjHtS4K94o44BxItw8MuLsKZdw8p1ufCWASt4j0ZVKpazw8oKjwAD2vQ7qE48ItwkhKn5joeu6hz1v4ssAlVuh+jSRSIRdigxFaAN0XV+L8OupxZAA31nojFg5stmsALjc73t5cHDwVEBtSghtgOM478Zi+mIAWwCcCC8JAHAK4NeYtRWu6wZ6R49h2FcAuKhUGiI8GUidQpScMJk65bJKRSxVaJq3pkwv++NEIrE9Kj3FaJSHsC96e3s7UObNuER45tChQwVH2FHSlAaMjY19HaC5pdIw81NR6SlFUxoA0Joy37/nuu4/o9FSmqYzwDTNNFBucCifQBXeARqEpjOAWbsNpTsXUtf1SI+ilqLpDCCS5Y6v7o7yGGo5msoA0zQvBejyUmmYqeZ9/+k0lQFE9N0ySfLME1uj0FIpzWSAPvWqy6IwY8vIyEguKkGV0DQGWJa1HEB3qTSahrro+0+naQxgRpm+Pz4UQvw9EjE+aAoDurq6zgPwtdKp+A8oss2lljSFAW1tbasAlHxvXD31/afTFAYAdGuZBP8Icoo9CprBAA3AFaUS1FvffzrNYABQum0/NT4e/2NkSnzSDAZIoPi/FiHCluPHB/2efIyMZjAAuq59H4XXpYWmaeui1uOHutobGpTR0dFPZs+etZVISwNIY/Ls7lZd125xHCfUKcsWLVq0aNGiRYsWLVq0UM1/ASUf75CbXKMFAAAAAElFTkSuQmCC" }))), sl = Ce(Gp), Zp = "ExchangeableFreeForChargeModal-module__root___PY5vh", Kp = "ExchangeableFreeForChargeModal-module__container___AXjeH", Yp = "ExchangeableFreeForChargeModal-module__icon___6Ozwr", Jp = "ExchangeableFreeForChargeModal-module__title___iofVN", Xp = "ExchangeableFreeForChargeModal-module__content___nKl-B", e_ = "ExchangeableFreeForChargeModal-module__list___lLk-r", t_ = "ExchangeableFreeForChargeModal-module__close___1lwvo", xt = {
  root: Zp,
  container: Kp,
  icon: Yp,
  title: Jp,
  content: Xp,
  list: e_,
  close: t_
}, r_ = () => {
  const t = () => {
    _.modal.closeLastModal();
  }, { t: e } = Y();
  return /* @__PURE__ */ o("div", { className: xt.root, children: /* @__PURE__ */ o("div", { className: xt.container, children: [
    /* @__PURE__ */ o("button", { className: xt.close, type: "button", onClick: t, children: /* @__PURE__ */ o(Tt, {}) }),
    /* @__PURE__ */ o("div", { className: xt.icon, children: /* @__PURE__ */ o(sl, {}) }),
    /* @__PURE__ */ o("h1", { className: xt.title, children: e("exchangeablefreeforchargemodal.exchangeable_free_charge") }),
    /* @__PURE__ */ o("div", { className: xt.content, children: [
      /* @__PURE__ */ o("p", { className: xt.description, children: e("exchangeablefreeforchargemodal.its_when_you_can_exchange_your_ticket_but") }),
      /* @__PURE__ */ o("ul", { className: xt.list, children: [
        /* @__PURE__ */ o("li", { children: e("exchangeablefreeforchargemodal.you_can_find_out_the_additional_fee_amount") }),
        /* @__PURE__ */ o("li", { children: e("exchangeablefreeforchargemodal.if_youre_booking_an_agency_they_might_charge") }),
        /* @__PURE__ */ o("li", { children: e("exchangeablefreeforchargemodal.its_often_the_case_that_the_earlier_you") })
      ] }),
      /* @__PURE__ */ o("p", { className: xt.description, children: e("exchangeablefreeforchargemodal.you_can_only_exchange_your_ticket_via_the") })
    ] })
  ] }) });
}, n_ = "FareOptions-module__root___Dzk-9", i_ = "FareOptions-module__option___yC-Ud", a_ = "FareOptions-module__box___Ua5zI", o_ = "FareOptions-module__label___j0sbq", s_ = "FareOptions-module__note___BSxxM", l_ = "FareOptions-module__infoIcon___v0Pov", c_ = "FareOptions-module__tooltip___RGP-u", u_ = "FareOptions-module__statusIcon___qpgxh", fe = {
  root: n_,
  option: i_,
  box: a_,
  label: o_,
  note: s_,
  infoIcon: l_,
  tooltip: c_,
  statusIcon: u_
}, ll = ({
  fare: t,
  isAvailableAddBaggage: e
}) => {
  var l, c, u, d, h, f, p, m, y, v, g, b, C, x;
  const { t: r } = Y(), n = (l = t == null ? void 0 : t.baggage) != null && l.height && ((c = t == null ? void 0 : t.baggage) != null && c.width) && ((u = t == null ? void 0 : t.baggage) != null && u.length) ? {
    height: t.baggage.height,
    width: t.baggage.width,
    length: t.baggage.length
  } : null, i = (d = t == null ? void 0 : t.handbags) != null && d.height && ((h = t == null ? void 0 : t.handbags) != null && h.width) && ((f = t == null ? void 0 : t.handbags) != null && f.length) ? {
    height: t.handbags.height,
    width: t.handbags.width,
    length: t.handbags.length
  } : null, a = (N) => {
    N.stopPropagation(), _.modal.openModal({
      content: /* @__PURE__ */ o(r_, {}),
      variant: "popup"
    });
  }, s = (N) => {
    N.stopPropagation(), _.modal.openModal({
      content: /* @__PURE__ */ o(Hp, {}),
      variant: "popup"
    });
  };
  return /* @__PURE__ */ o("ul", { className: fe.root, children: [
    (p = t == null ? void 0 : t.handbags) != null && p.count ? /* @__PURE__ */ o("li", { className: fe.option, children: [
      /* @__PURE__ */ o("div", { className: fe.box, children: [
        /* @__PURE__ */ o(er, { className: fe.statusIcon }),
        /* @__PURE__ */ o("span", { className: fe.label, children: (m = t == null ? void 0 : t.handbags) != null && m.weight ? r("flightmatrix.carry_on", {
          count: t.handbags.count,
          weight: t.handbags.weight
        }) : r("flightmatrix.personal_item") })
      ] }),
      i && i.length && i.height && i.width && /* @__PURE__ */ o("span", { className: fe.note, children: r("ticket.baggage.handbags_size", {
        height: i.height,
        width: i.width,
        length: i.length
      }) })
    ] }) : /* @__PURE__ */ o("li", { className: fe.option, children: /* @__PURE__ */ o("div", { className: fe.box, children: [
      /* @__PURE__ */ o(er, { className: fe.statusIcon }),
      /* @__PURE__ */ o("span", { className: fe.label, children: r("flightmatrix.personal_item") })
    ] }) }),
    e ? (y = t == null ? void 0 : t.baggage) != null && y.count ? /* @__PURE__ */ o("li", { className: fe.option, children: [
      /* @__PURE__ */ o("div", { className: fe.box, children: [
        /* @__PURE__ */ o(er, { className: fe.statusIcon }),
        /* @__PURE__ */ o("span", { className: fe.label, children: (v = t == null ? void 0 : t.baggage) != null && v.weight ? r("flightmatrix.baggage_kg", {
          count: t.baggage.count,
          weight: t.baggage.weight
        }) : r("flightmatrix.baggage_included") })
      ] }),
      n && /* @__PURE__ */ o("span", { className: fe.note, children: [
        n.height,
        "x",
        n.width,
        "x",
        n.length,
        " ",
        r("ticket.baggage.measurement")
      ] })
    ] }) : /* @__PURE__ */ o("li", { className: fe.option, children: /* @__PURE__ */ o("div", { className: fe.box, children: [
      /* @__PURE__ */ o(kn, { className: fe.statusIcon }),
      /* @__PURE__ */ o("span", { className: fe.label, children: r("flightmatrix.baggage_not_included") })
    ] }) }) : /* @__PURE__ */ o("li", { className: fe.option, children: /* @__PURE__ */ o("div", { className: fe.box, children: /* @__PURE__ */ o(
      He,
      {
        className: fe.tooltip,
        text: r("flightmatrix.you_can_add_baggage_later"),
        direction: "top",
        align: "left",
        maxWidth: "20rem",
        children: [
          /* @__PURE__ */ o(kn, { className: fe.statusIcon }),
          /* @__PURE__ */ o("span", { className: fe.label, children: r("flightmatrix.checked_baggage_paid") }),
          /* @__PURE__ */ o(St, { className: fe.infoIcon })
        ]
      }
    ) }) }),
    /* @__PURE__ */ o("li", { className: fe.option, children: /* @__PURE__ */ o("div", { className: fe.box, children: (g = t == null ? void 0 : t.change_before_flight) != null && g.available ? /* @__PURE__ */ o(Ie, { children: [
      /* @__PURE__ */ o(er, { className: fe.statusIcon }),
      (b = t.change_before_flight) != null && b.penalty && !t.change_before_flight.penalty.value ? /* @__PURE__ */ o("span", { className: fe.label, children: r("flightmatrix.exchangeable") }) : /* @__PURE__ */ o("span", { className: fe.tooltip, onClick: a, children: [
        r("flightmatrix.exchangeable_for_fee"),
        " ",
        /* @__PURE__ */ o(St, { className: fe.infoIcon })
      ] })
    ] }) : /* @__PURE__ */ o(Ie, { children: [
      /* @__PURE__ */ o(kn, { className: fe.statusIcon }),
      /* @__PURE__ */ o("span", { className: fe.label, children: r("flightmatrix.non_exchangeable") })
    ] }) }) }),
    /* @__PURE__ */ o("li", { className: fe.option, children: /* @__PURE__ */ o("div", { className: fe.box, children: (C = t == null ? void 0 : t.return_before_flight) != null && C.available ? /* @__PURE__ */ o(Ie, { children: [
      /* @__PURE__ */ o(er, { className: fe.statusIcon }),
      (x = t.return_before_flight) != null && x.penalty && !t.return_before_flight.penalty.value ? /* @__PURE__ */ o("span", { className: fe.label, children: r("flightmatrix.refundable") }) : /* @__PURE__ */ o("span", { className: fe.tooltip, onClick: s, children: [
        r("flightmatrix.partially_refundable"),
        " ",
        /* @__PURE__ */ o(St, { className: fe.infoIcon })
      ] })
    ] }) : /* @__PURE__ */ o(Ie, { children: /* @__PURE__ */ o(
      He,
      {
        className: fe.tooltip,
        text: r("flightmatrix.non_refundable_tooltip"),
        direction: "bottom",
        align: "left",
        maxWidth: "20rem",
        children: [
          /* @__PURE__ */ o(kn, { className: fe.statusIcon }),
          /* @__PURE__ */ o("span", { className: fe.label, children: r("flightmatrix.non_refundable") }),
          /* @__PURE__ */ o(St, { className: fe.infoIcon })
        ]
      }
    ) }) }) })
  ] });
}, d_ = "FareCard-module__root___ujUg4", h_ = "FareCard-module__active___M-Fxg", f_ = "FareCard-module__head___q8ciJ", p_ = "FareCard-module__box___mxquV", __ = "FareCard-module__label___sXFf-", g_ = "FareCard-module__price___oSheG", m_ = "FareCard-module__button___Lg4c2", hr = {
  root: d_,
  active: h_,
  head: f_,
  box: p_,
  label: __,
  price: g_,
  button: m_
}, v_ = ({
  fare: t,
  label: e,
  price: r,
  isActive: n,
  onClick: i
}) => {
  const { t: a } = Y(), s = a(n ? "flightschedule.selected" : "flightschedule.select"), { priceFormatter: l } = Ze(), c = () => {
    n || i();
  };
  return /* @__PURE__ */ o("div", { className: B(hr.root, { [hr.active]: n }), onClick: c, children: [
    /* @__PURE__ */ o("div", { className: hr.head, children: [
      /* @__PURE__ */ o("div", { className: hr.box, children: [
        e && /* @__PURE__ */ o("span", { className: hr.label, children: [
          " ",
          e
        ] }),
        (r == null ? void 0 : r.value) && /* @__PURE__ */ o("span", { className: hr.price, children: l.format(r.value) })
      ] }),
      /* @__PURE__ */ o(Ge, { className: hr.button, disabled: n, tabindex: n ? -1 : 0, children: s })
    ] }),
    /* @__PURE__ */ o(ll, { fare: t, isAvailableAddBaggage: !0 })
  ] });
}, y_ = "FareModal-module__root___Wp224", b_ = "FareModal-module__container___a3O8B", C_ = "FareModal-module__head___u1IxJ", w_ = "FareModal-module__close___ASTGB", T_ = "FareModal-module__title___wocOV", k_ = "FareModal-module__filters___O9ICy", N_ = "FareModal-module__label___OqX0R", x_ = "FareModal-module__checked___bRV0S", F_ = "FareModal-module__checkbox___4Tiug", E_ = "FareModal-module__list___iUuw1", M_ = "FareModal-module__empty___vMJhz", S_ = "FareModal-module__emptyIcon___-yCJS", A_ = "FareModal-module__emptyText___lnAMa", ct = {
  root: y_,
  container: b_,
  head: C_,
  close: w_,
  title: T_,
  filters: k_,
  label: N_,
  checked: x_,
  checkbox: F_,
  list: E_,
  empty: M_,
  emptyIcon: S_,
  emptyText: A_
}, I_ = (t, e) => t.filter((r) => {
  var n, i, a, s, l;
  return !(e.largeCarryOn && !((n = r.options.handbags) != null && n.count) && !Ln(r.options.handbags) || e.baggageIncluded && !((a = (i = r.options) == null ? void 0 : i.baggage) != null && a.count) || e.changeable && !((s = r.options.change_before_flight) != null && s.available) || e.refundable && !((l = r.options.return_before_flight) != null && l.available));
}), D_ = ({
  onClose: t,
  onSelect: e,
  fares: r = [],
  currentFare: n
}) => {
  const { t: i } = Y(), a = Q({
    largeCarryOn: !1,
    baggageIncluded: !1,
    changeable: !1,
    refundable: !1
  }), s = Q(r), l = [
    {
      name: "baggageIncluded",
      label: i("flightmatrix.baggage_included")
    },
    {
      name: "changeable",
      label: i("flightmatrix.changeable")
    },
    {
      name: "refundable",
      label: i("flightmatrix.refundable")
    },
    {
      name: "largeCarryOn",
      label: i("flightmatrix.large_carry_allowance")
    }
  ], c = {
    largeCarryOn: (h) => {
      var f;
      return ((f = h.options.handbags) == null ? void 0 : f.count) && Ln(h.options.handbags);
    },
    baggageIncluded: (h) => {
      var f;
      return (f = h.options.baggage) == null ? void 0 : f.count;
    },
    changeable: (h) => {
      var f;
      return (f = h.options.change_before_flight) == null ? void 0 : f.available;
    },
    refundable: (h) => {
      var f;
      return (f = h.options.return_before_flight) == null ? void 0 : f.available;
    }
  }, u = (h) => r.some((f) => c[h](f)), d = (h, f) => {
    const p = h.target;
    a.value = {
      ...a.value,
      [f]: p.checked
    }, s.value = I_(r, a.value);
  };
  return /* @__PURE__ */ o("div", { className: ct.root, children: /* @__PURE__ */ o("div", { className: ct.container, children: [
    /* @__PURE__ */ o("button", { className: ct.close, type: "button", onClick: t, children: /* @__PURE__ */ o(Tt, {}) }),
    /* @__PURE__ */ o("h3", { className: ct.title, children: i("faremodal.fares") }),
    /* @__PURE__ */ o("div", { className: ct.filters, children: l.map(
      (h) => u(h.name) && /* @__PURE__ */ o(
        "label",
        {
          className: B(ct.label, {
            [ct.checked]: a.value[h.name]
          }),
          tabIndex: 0,
          children: [
            /* @__PURE__ */ o(
              "input",
              {
                type: "checkbox",
                className: ct.checkbox,
                checked: a.value[h.name],
                onChange: (f) => d(f, h.name)
              }
            ),
            h.label
          ]
        },
        h.name
      )
    ) }),
    !!s.value.length && /* @__PURE__ */ o("div", { className: ct.list, children: s.value.map((h) => {
      var f, p;
      return /* @__PURE__ */ o(
        v_,
        {
          label: (f = h.labels) != null && f.length ? h.labels.join(" + ") : "",
          fare: h.options,
          isActive: h.id === ((p = n.value) == null ? void 0 : p.id),
          price: h.price,
          onClick: () => e(h)
        },
        h.id
      );
    }) }),
    !s.value.length && /* @__PURE__ */ o("div", { className: ct.empty, children: [
      /* @__PURE__ */ o(ol, { className: ct.emptyIcon }),
      /* @__PURE__ */ o("p", { className: ct.emptyText, children: i("faremodal.no_fares_found_matching_these_criteria") })
    ] })
  ] }) });
}, O_ = (t, e) => /* @__PURE__ */ w("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M2.27214 18.1879C1.99436 18.1879 1.75068 18.1198 1.54109 17.9837C1.33165 17.8476 1.16561 17.6726 1.04297 17.4587C0.917969 17.2643 0.855469 17.0413 0.855469 16.79C0.855469 16.5387 0.917969 16.2894 1.04297 16.042L8.77214 2.7087C8.89714 2.4587 9.07491 2.27814 9.30547 2.16703C9.53616 2.05592 9.7688 2.00037 10.0034 2.00037C10.2381 2.00037 10.4701 2.05592 10.6992 2.16703C10.9284 2.27814 11.1055 2.4587 11.2305 2.7087L18.9596 16.042C19.0846 16.2894 19.1471 16.5387 19.1471 16.79C19.1471 17.0413 19.0846 17.2643 18.9596 17.4587C18.8346 17.667 18.668 17.8406 18.4596 17.9795C18.2513 18.1184 18.0082 18.1879 17.7305 18.1879H2.27214ZM10.0013 15.1462C10.293 15.1462 10.5395 15.0455 10.7409 14.8441C10.9423 14.6427 11.043 14.3962 11.043 14.1045C11.043 13.8268 10.9423 13.5872 10.7409 13.3858C10.5395 13.1844 10.293 13.0837 10.0013 13.0837C9.72352 13.0837 9.48047 13.1844 9.27214 13.3858C9.0638 13.5872 8.95964 13.8268 8.95964 14.1045C8.95964 14.3962 9.0638 14.6427 9.27214 14.8441C9.48047 15.0455 9.72352 15.1462 10.0013 15.1462ZM10.0013 12.542C10.2652 12.542 10.4874 12.4483 10.668 12.2608C10.8485 12.0733 10.9388 11.8545 10.9388 11.6045V9.50037C10.9388 9.23648 10.8485 9.01426 10.668 8.8337C10.4874 8.65314 10.2652 8.56287 10.0013 8.56287C9.7513 8.56287 9.53255 8.65314 9.34505 8.8337C9.15755 9.01426 9.0638 9.23648 9.0638 9.50037V11.6045C9.0638 11.8545 9.15755 12.0733 9.34505 12.2608C9.53255 12.4483 9.7513 12.542 10.0013 12.542Z", fill: "#FFBC11" })), Ro = Ce(O_), L_ = (t, e) => /* @__PURE__ */ w("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M6.92891 14C7.18768 14 7.39336 13.9068 7.57251 13.7338L12.6616 8.74875C12.8872 8.52246 12.9934 8.28952 13 8.00333C13 7.71714 12.8938 7.47754 12.6616 7.2579L7.57251 2.26622C7.39336 2.09318 7.18104 2 6.92891 2C6.41137 2 6 2.41265 6 2.92512C6 3.17804 6.10616 3.41764 6.29194 3.60399L10.8038 8.00333L6.29194 12.396C6.10616 12.5824 6 12.822 6 13.0749C6 13.5874 6.41137 14 6.92891 14Z", fill: "currentColor" })), Cr = Ce(L_), R_ = "TicketAlerts-module__root___KbAlJ", P_ = "TicketAlerts-module__item___ZpMMp", B_ = "TicketAlerts-module__text___vRw1P", $_ = "TicketAlerts-module__arrow___GnU7k", fr = {
  root: R_,
  item: P_,
  text: B_,
  arrow: $_
}, j_ = (t, e) => /* @__PURE__ */ w("svg", { width: 64, height: 64, viewBox: "0 0 64 64", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M26.6689 46.4751L28.3514 52.4834C28.6632 53.5967 28.3502 54.7916 27.5327 55.6091L27.0918 56.0499C26.3583 56.7834 25.1315 56.6358 24.593 55.7493L18.9659 46.4861L9.70244 40.8587C8.81589 40.3202 8.66827 39.0934 9.40176 38.3599L9.84263 37.919C10.6601 37.1015 11.855 36.7885 12.9683 37.1003L18.9766 38.7828L27.292 30.4674L9.96685 23.4634C8.90426 23.0339 8.62471 21.6591 9.43515 20.8487L11.2416 19.0422C11.9331 18.3507 12.9029 18.0134 13.8743 18.1264L36.9473 20.8121L49.4459 8.31345C51.57 6.18937 55.0142 6.1897 57.1382 8.31378C59.2623 10.4379 59.2623 13.8817 57.1382 16.0058L44.6396 28.5044L47.3253 51.5774C47.4383 52.5488 47.101 53.5186 46.4095 54.2101L44.603 56.0165C43.7926 56.827 42.4178 56.5474 41.9883 55.4848L34.9843 38.1597L26.6689 46.4751Z", fill: "#07C369" })), V_ = Ce(j_), q_ = "CharterModal-module__root___1hPCC", U_ = "CharterModal-module__container___PEIM6", Q_ = "CharterModal-module__icon___Y2nKQ", W_ = "CharterModal-module__title___D1LUg", z_ = "CharterModal-module__content___VUaNi", H_ = "CharterModal-module__list___XSVux", G_ = "CharterModal-module__close___Wm-oc", pr = {
  root: q_,
  container: U_,
  icon: Q_,
  title: W_,
  content: z_,
  list: H_,
  close: G_
}, Z_ = () => {
  const t = () => {
    _.modal.closeLastModal();
  }, { t: e } = Y();
  return /* @__PURE__ */ o("div", { className: pr.root, children: /* @__PURE__ */ o("div", { className: pr.container, children: [
    /* @__PURE__ */ o("button", { className: pr.close, type: "button", onClick: t, children: /* @__PURE__ */ o(Tt, {}) }),
    /* @__PURE__ */ o("div", { className: pr.icon, children: /* @__PURE__ */ o(V_, {}) }),
    /* @__PURE__ */ o("h1", { className: pr.title, children: e("chartermodal.charter_ticket") }),
    /* @__PURE__ */ o("div", { className: pr.content, children: [
      /* @__PURE__ */ o("p", { children: e("chartermodal.cheap_flights_tour_operator_tips") }),
      /* @__PURE__ */ o("ul", { className: pr.list, children: [
        /* @__PURE__ */ o("li", { children: e("chartermodal.tickets_delivery_info") }),
        /* @__PURE__ */ o("li", { children: e("chartermodal.tour_operator_ticket_discount_reason") }),
        /* @__PURE__ */ o("li", { children: e("chartermodal.flight_rules_online_checkin_animals") }),
        /* @__PURE__ */ o("li", { children: e("chartermodal.charter_seats_on_regular_flights") })
      ] })
    ] })
  ] }) });
}, K_ = ({ alerts: t }) => {
  const { t: e } = Y(), r = () => {
    _.modal.openModal({
      content: /* @__PURE__ */ o(Ja, {}),
      variant: "popup"
    });
  }, n = () => {
    _.modal.openModal({
      content: /* @__PURE__ */ o(Z_, {}),
      variant: "popup"
    });
  };
  return /* @__PURE__ */ o("div", { className: fr.root, children: [
    t.recheck_baggage && /* @__PURE__ */ o("div", { className: fr.item, onClick: r, children: [
      /* @__PURE__ */ o(Ro, {}),
      /* @__PURE__ */ o("span", { className: fr.text, children: e("ticketalerts.repeat_checkin_layover") }),
      /* @__PURE__ */ o(Cr, { className: fr.arrow })
    ] }),
    t.is_charter && /* @__PURE__ */ o("div", { className: fr.item, onClick: n, children: [
      /* @__PURE__ */ o(Ro, {}),
      /* @__PURE__ */ o("span", { className: fr.text, children: e("ticketalerts.ticket_incudes_charter_flights") }),
      /* @__PURE__ */ o(Cr, { className: fr.arrow })
    ] })
  ] });
}, Y_ = "TicketFare-module__root___2TjDo", J_ = "TicketFare-module__title___JGmNF", X_ = "TicketFare-module__actions___Qes3b", e1 = "TicketFare-module__baggageAction___0lvDY", t1 = "TicketFare-module__fareAction___Nz9ND", r1 = "TicketFare-module__actionText___jU-bZ", n1 = "TicketFare-module__changeText___A8wDB", i1 = "TicketFare-module__baggagePrice___dO9Cf", a1 = "TicketFare-module__minimumFare___MYcRa", o1 = "TicketFare-module__arrow___P3Pad", yt = {
  root: Y_,
  title: J_,
  actions: X_,
  baggageAction: e1,
  fareAction: t1,
  actionText: r1,
  changeText: n1,
  baggagePrice: i1,
  minimumFare: a1,
  arrow: o1
}, s1 = ({
  priceDiff: t,
  isCheckedBaggage: e,
  onClickBaggage: r,
  fare: n,
  isAvailableAddBaggage: i,
  isAvailableCancelBaggage: a,
  isAvailableChangeFare: s,
  isLegacyResults: l,
  onClickChangeFare: c,
  isShowAddBaggageToggle: u
}) => {
  var f, p, m;
  const { priceFormatter: d } = Ze(), { t: h } = Y();
  return /* @__PURE__ */ o("div", { className: yt.root, children: [
    /* @__PURE__ */ o("span", { className: yt.title, children: [
      " ",
      n == null ? void 0 : n.title
    ] }),
    /* @__PURE__ */ o("div", { className: yt.minimumFare, children: /* @__PURE__ */ o(ll, { fare: (n == null ? void 0 : n.options) || {}, isAvailableAddBaggage: i }) }),
    (i && a || s) && !l && /* @__PURE__ */ o("div", { className: yt.actions, children: [
      i && a && u && /* @__PURE__ */ o("div", { className: yt.baggageAction, onClick: r, tabIndex: 0, children: [
        /* @__PURE__ */ o("div", { className: yt.actionText, onClick: r, children: [
          h("ticket.baggage.add_baggage"),
          !!((f = t == null ? void 0 : t.value) != null && f.value) && /* @__PURE__ */ o("span", { className: yt.baggagePrice, children: ((p = t == null ? void 0 : t.value) == null ? void 0 : p.value) <= 0 ? null : "+" + d.format((m = t == null ? void 0 : t.value) == null ? void 0 : m.value) })
        ] }),
        /* @__PURE__ */ o(gt, { value: e, size: "large" })
      ] }),
      s && /* @__PURE__ */ o("div", { className: yt.fareAction, tabIndex: 0, onClick: c, children: /* @__PURE__ */ o("div", { className: yt.changeText, children: [
        h("ticket.baggage.change_exchange_refund_policy"),
        /* @__PURE__ */ o(Cr, { className: yt.arrow })
      ] }) })
    ] })
  ] });
}, l1 = (t, e) => /* @__PURE__ */ w("svg", { width: 40, height: 40, viewBox: "0 0 40 40", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M19.9974 12.3087C19.9974 7.35036 24.1007 3.33203 29.1641 3.33203C34.2274 3.33203 38.3307 7.35036 38.3307 12.3087C38.3307 17.3287 34.0241 20.0654 32.2741 21.1754C32.0489 21.3096 31.8318 21.4571 31.6241 21.617C30.8607 22.2887 30.2307 23.637 29.9774 24.4904C29.9282 24.6695 29.8224 24.8279 29.6759 24.9421C29.5293 25.0562 29.3498 25.1199 29.1641 25.1237C28.9783 25.1199 28.7988 25.0562 28.6522 24.9421C28.5057 24.8279 28.3999 24.6695 28.3507 24.4904C28.0957 23.6354 27.4657 22.2887 26.7041 21.617C26.5924 21.517 26.3624 21.372 26.0541 21.177C24.3041 20.0654 19.9974 17.3254 19.9974 12.3087ZM31.7824 12.3087C31.7824 10.892 30.6107 9.7437 29.1641 9.7437C27.7174 9.7437 26.5441 10.892 26.5441 12.3104C26.5441 13.727 27.7174 14.8737 29.1641 14.8737C30.6107 14.8737 31.7824 13.7254 31.7824 12.3087ZM10.8307 14.8754C5.7674 14.8754 1.66406 18.892 1.66406 23.8504C1.66406 28.8704 5.97073 31.607 7.72073 32.717C8.02906 32.9154 8.25906 33.0604 8.37073 33.1587C9.1324 33.8304 9.7624 35.177 10.0174 36.032C10.0666 36.2112 10.1723 36.3696 10.3189 36.4837C10.4655 36.5979 10.645 36.6616 10.8307 36.6654C11.0165 36.6616 11.196 36.5979 11.3425 36.4837C11.4891 36.3696 11.5949 36.2112 11.6441 36.032C11.8974 35.1787 12.5274 33.832 13.2907 33.1587C13.4024 33.0587 13.6324 32.9154 13.9407 32.7187C15.6907 31.6054 19.9974 28.8654 19.9974 23.852C19.9974 18.8937 15.8941 14.8754 10.8307 14.8754ZM13.4491 23.8504C13.4491 22.4337 12.2774 21.287 10.8307 21.287C9.38406 21.287 8.2124 22.4337 8.2124 23.8504C8.2124 25.267 9.38406 26.417 10.8307 26.417C12.2774 26.417 13.4491 25.267 13.4491 23.8504Z", fill: "black" })), c1 = Ce(l1), u1 = "AirportChangeLayoverModal-module__root___Cy16m", d1 = "AirportChangeLayoverModal-module__container___7Y18v", h1 = "AirportChangeLayoverModal-module__icon___qpTur", f1 = "AirportChangeLayoverModal-module__title___nB2Fq", p1 = "AirportChangeLayoverModal-module__content___PCC4q", _1 = "AirportChangeLayoverModal-module__description___1F3aP", g1 = "AirportChangeLayoverModal-module__list___4EhLA", m1 = "AirportChangeLayoverModal-module__close___Z2QcA", Gt = {
  root: u1,
  container: d1,
  icon: h1,
  title: f1,
  content: p1,
  description: _1,
  list: g1,
  close: m1
}, v1 = ({ nameWhere: t }) => {
  const { t: e } = Y(), r = () => {
    _.modal.closeLastModal();
  };
  return /* @__PURE__ */ o("div", { className: Gt.root, children: /* @__PURE__ */ o("div", { className: Gt.container, children: [
    /* @__PURE__ */ o("button", { className: Gt.close, type: "button", onClick: r, children: /* @__PURE__ */ o(Tt, {}) }),
    /* @__PURE__ */ o("div", { className: Gt.icon, children: /* @__PURE__ */ o(c1, {}) }),
    /* @__PURE__ */ o("h1", { className: Gt.title, children: e("airportchangelayovermodal.layover_airport_change", {
      nameWhere: t
    }) }),
    /* @__PURE__ */ o("div", { className: Gt.content, children: [
      /* @__PURE__ */ o("p", { className: Gt.description, children: e("airportchangelayovermodal.itaposs_not_difficult_but_there_are_things_consider") }),
      /* @__PURE__ */ o("ul", { className: Gt.list, children: [
        /* @__PURE__ */ o("li", { children: e("airportchangelayovermodal.expect_transfer_costs_airports") }),
        /* @__PURE__ */ o("li", { children: e("airportchangelayovermodal.you_will_have_collect_and_recheck_your_baggage") }),
        /* @__PURE__ */ o("li", { children: e("airportchangelayovermodal.there_is_a_risk_getting_stuck_traffic_and") })
      ] })
    ] })
  ] }) });
}, y1 = "ItineraryFlight-module__root___dbsyJ", b1 = "ItineraryFlight-module__airline___TAAkP", C1 = "ItineraryFlight-module__airlineLogo___hgk-k", w1 = "ItineraryFlight-module__airlinePicture___Xmadh", T1 = "ItineraryFlight-module__airlineImage___0Z7Qb", k1 = "ItineraryFlight-module__partnerLogo___PSnCA", N1 = "ItineraryFlight-module__partnerImage___OeZvR", x1 = "ItineraryFlight-module__airlineBox___vc9s1", F1 = "ItineraryFlight-module__airlineName___K5-ih", E1 = "ItineraryFlight-module__airlinePartner___vLPjb", M1 = "ItineraryFlight-module__airlineTime___FOKWV", S1 = "ItineraryFlight-module__details___mEuId", A1 = "ItineraryFlight-module__airlineChip___UsHjM", et = {
  root: y1,
  airline: b1,
  airlineLogo: C1,
  airlinePicture: w1,
  airlineImage: T1,
  partnerLogo: k1,
  partnerImage: N1,
  airlineBox: x1,
  airlineName: F1,
  airlinePartner: E1,
  airlineTime: M1,
  details: S1,
  airlineChip: A1
}, I1 = "FlightItem-module__root___d48qY", D1 = "FlightItem-module__date___wNchb", O1 = "FlightItem-module__time___YKmzu", L1 = "FlightItem-module__day___u3Pt4", R1 = "FlightItem-module__place___JkxvD", P1 = "FlightItem-module__city___xI4TJ", B1 = "FlightItem-module__airport___Rj8Gw", $1 = "FlightItem-module__highlightDate___UydM-", j1 = "FlightItem-module__highlightAirport___EHd9E", Ft = {
  root: I1,
  date: D1,
  time: O1,
  day: L1,
  place: R1,
  city: P1,
  airport: B1,
  highlightDate: $1,
  highlightAirport: j1
}, Po = ({
  time: t,
  day: e,
  cityName: r,
  airportName: n,
  airportCode: i,
  isChangeDate: a,
  isChangeAirport: s
}) => /* @__PURE__ */ o("div", { className: Ft.root, children: [
  /* @__PURE__ */ o("div", { className: Ft.date, children: [
    /* @__PURE__ */ o("span", { className: Ft.time, children: t }),
    /* @__PURE__ */ o("span", { className: B(Ft.day, a && Ft.highlightDate), children: e })
  ] }),
  /* @__PURE__ */ o("div", { className: Ft.place, children: [
    /* @__PURE__ */ o("span", { className: Ft.city, children: r }),
    /* @__PURE__ */ o("p", { children: /* @__PURE__ */ o("span", { className: B(Ft.airport, s && Ft.highlightAirport), children: [
      n,
      ", ",
      i
    ] }) })
  ] })
] }), V1 = "FlightStop-module__root___3-BLt", q1 = {
  root: V1
}, U1 = ({ children: t }) => /* @__PURE__ */ o("div", { className: q1.root, children: t }), Q1 = ({
  departure: t,
  arrival: e,
  time: r,
  marketingCarrier: n,
  operatingCarrier: i,
  isChangeDepartureAirport: a,
  isChangeArrivalAirport: s,
  stopPlaces: l = [],
  isCharter: c
}) => {
  var h, f, p, m, y, v, g, b, C, x, N, T, M, S, R, $, V, J;
  const u = (n == null ? void 0 : n.iata) === (i == null ? void 0 : i.iata), { t: d } = Y();
  return /* @__PURE__ */ o("div", { className: et.root, children: [
    /* @__PURE__ */ o("div", { className: et.airline, children: [
      /* @__PURE__ */ o("div", { className: et.airlineLogo, children: [
        /* @__PURE__ */ o("picture", { className: et.airlinePicture, children: [
          /* @__PURE__ */ o(
            "source",
            {
              src: `https://img.avs.io/pics/al_square/${n == null ? void 0 : n.iata}@avif?rs=fit:64:64`
            }
          ),
          /* @__PURE__ */ o(
            "img",
            {
              className: et.airlineImage,
              src: `https://img.avs.io/pics/al_square/${n == null ? void 0 : n.iata}@png?rs=fit:64:64`,
              alt: ""
            }
          )
        ] }),
        !u && /* @__PURE__ */ o("div", { className: et.partnerLogo, children: /* @__PURE__ */ o("picture", { className: et.airlinePicture, children: [
          /* @__PURE__ */ o(
            "source",
            {
              src: `https://img.avs.io/pics/al_square/${i == null ? void 0 : i.iata}@avif?rs=fit:40:40`
            }
          ),
          /* @__PURE__ */ o(
            "img",
            {
              className: et.airlineImage,
              src: `https://img.avs.io/pics/al_square/${i == null ? void 0 : i.iata}@png?rs=fit:40:40`,
              alt: ""
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ o("div", { className: et.airlineBox, children: [
        /* @__PURE__ */ o("span", { className: et.airlineName, children: ((f = (h = n == null ? void 0 : n.name) == null ? void 0 : h[ye()]) == null ? void 0 : f.default) || "" }),
        !u && /* @__PURE__ */ o("span", { className: et.airlinePartner, children: d("itineraryflight.operated_by", {
          operatingCarrier: ((m = (p = i == null ? void 0 : i.name) == null ? void 0 : p[ye()]) == null ? void 0 : m.default) || ""
        }) }),
        /* @__PURE__ */ o("span", { className: et.airlineTime, children: [
          " ",
          d("flighthead.in_flight", { time: r })
        ] })
      ] }),
      c && /* @__PURE__ */ o("div", { className: et.airlineChip, children: d("ticket.charter_ticket") })
    ] }),
    /* @__PURE__ */ o("div", { className: et.details, children: [
      /* @__PURE__ */ o(
        Po,
        {
          day: t.day,
          time: t.time,
          cityName: ((g = (v = (y = t.city) == null ? void 0 : y.name) == null ? void 0 : v[ye()]) == null ? void 0 : g.default) || "",
          airportName: ((x = (C = (b = t.airport) == null ? void 0 : b.name) == null ? void 0 : C[ye()]) == null ? void 0 : x.default) || "",
          airportCode: ((N = t.airport) == null ? void 0 : N.code) || "",
          isChangeAirport: a,
          isChangeDate: t.highlight
        }
      ),
      l.map((F, I) => /* @__PURE__ */ o(U1, { children: [
        "Technical stop",
        /* @__PURE__ */ o("br", {}),
        " ",
        F == null ? void 0 : F.city,
        " (",
        F == null ? void 0 : F.airport,
        ")"
      ] }, I)),
      /* @__PURE__ */ o(
        Po,
        {
          day: e.day,
          time: e.time,
          cityName: ((S = (M = (T = e.city) == null ? void 0 : T.name) == null ? void 0 : M[ye()]) == null ? void 0 : S.default) || "",
          airportName: ((V = ($ = (R = e.airport) == null ? void 0 : R.name) == null ? void 0 : $[ye()]) == null ? void 0 : V.default) || "",
          airportCode: ((J = e.airport) == null ? void 0 : J.code) || "",
          isChangeDate: e.highlight,
          isChangeAirport: s
        }
      )
    ] })
  ] });
}, W1 = "ItineraryTransfer-module__root___KdAYF", z1 = "ItineraryTransfer-module__icon___TmPAB", H1 = "ItineraryTransfer-module__box___vTKNY", G1 = "ItineraryTransfer-module__notes___ges3a", Z1 = "ItineraryTransfer-module__time___O0tjl", un = {
  root: W1,
  icon: z1,
  box: H1,
  notes: G1,
  time: Z1
}, K1 = (t, e) => /* @__PURE__ */ w("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M13.1235 3C12.6265 3 12.1498 3.19754 11.7984 3.54917C11.4469 3.90081 11.2495 4.37772 11.2495 4.875C11.2495 5.37228 11.4469 5.84919 11.7984 6.20083C12.1498 6.55246 12.6265 6.75 13.1235 6.75C13.6206 6.75 14.0972 6.55246 14.4487 6.20083C14.8002 5.84919 14.9976 5.37228 14.9976 4.875C14.9976 4.37772 14.8002 3.90081 14.4487 3.54917C14.0972 3.19754 13.6206 3 13.1235 3ZM11.6228 7.5C11.326 7.5 11.0494 7.57616 10.8 7.69922C10.7623 7.71095 10.7256 7.72565 10.6902 7.74316L7.75466 9.14941C7.59526 9.22526 7.46772 9.35494 7.39449 9.51562L6.06948 12.4395C6.02647 12.5294 6.00183 12.627 5.99698 12.7266C5.99213 12.8262 6.00718 12.9258 6.04125 13.0195C6.07532 13.1132 6.12772 13.1992 6.19538 13.2724C6.26305 13.3456 6.34463 13.4046 6.43534 13.4458C6.52606 13.4871 6.62409 13.5099 6.72371 13.5129C6.82333 13.5158 6.92254 13.4988 7.01553 13.4629C7.10851 13.4271 7.19342 13.373 7.26528 13.3039C7.33714 13.2348 7.3945 13.1521 7.43402 13.0605L8.51893 10.6685L9.48963 10.377C9.28996 11.4308 9.04135 12.7362 9.04015 12.7427C9.03983 12.7442 9.039 12.7455 9.03869 12.7471C9.03869 12.7471 9.03869 12.75 9.03869 12.75C9.0141 12.8712 9.00062 12.9966 9.00062 13.125C9.00062 13.7033 9.26844 14.2136 9.67996 14.5576L9.68582 14.5752L12.6038 16.875L13.4383 20.0215L13.513 20.3965C13.5469 20.5666 13.6386 20.7197 13.7726 20.8297C13.9066 20.9398 14.0746 21 14.248 21C14.4468 21 14.6375 20.921 14.778 20.7803C14.9186 20.6397 14.9976 20.4489 14.9976 20.25C14.9975 20.2008 14.9926 20.1517 14.983 20.1035V20.1006C14.982 20.0977 14.981 20.0947 14.98 20.0918L14.2333 16.3535C14.2132 16.252 14.1724 16.1557 14.1133 16.0708L12.7107 13.5029C12.712 13.4963 12.7109 13.489 12.7121 13.4824L13.4486 9.79688L13.4471 9.79541C13.4783 9.65984 13.4984 9.52 13.4984 9.375C13.4984 8.34049 12.6589 7.5008 11.6228 7.5ZM14.5364 10.3066L14.185 12.0059L14.4969 12.2856C14.5531 12.3366 14.6182 12.3794 14.6872 12.4102L16.9361 13.4326V13.4312C17.0334 13.476 17.1393 13.4995 17.2465 13.5C17.4453 13.5 17.636 13.421 17.7765 13.2803C17.9171 13.1397 17.9961 12.9489 17.9961 12.75C17.9958 12.6063 17.9542 12.4657 17.8764 12.3449C17.7985 12.2242 17.6876 12.1284 17.5569 12.0688V12.0674L15.4119 11.0918L14.5364 10.3066ZM8.96841 15.5435L8.58335 16.8164L6.9128 19.771L6.85717 19.8647L6.85863 19.8662C6.84978 19.8815 6.84148 19.8972 6.83374 19.9131L6.82788 19.9219C6.77797 20.0241 6.75193 20.1363 6.75175 20.25C6.75175 20.4489 6.83073 20.6397 6.97131 20.7803C7.11189 20.921 7.30256 21 7.50137 21C7.61961 21 7.73616 20.9719 7.84151 20.9182C7.94685 20.8645 8.038 20.7866 8.10751 20.6909H8.10898L8.12069 20.6733C8.12118 20.6724 8.12167 20.6714 8.12215 20.6704L10.6155 16.8838L8.96841 15.5435Z", fill: "#9EA9B7" })), Y1 = Ce(K1), J1 = "ItineraryNote-module__root___qvmN0", X1 = "ItineraryNote-module__highlight___KLwGC", eg = "ItineraryNote-module__light___nZHwd", tg = "ItineraryNote-module__dark___OybuN", rg = "ItineraryNote-module__clickable___8KQiL", ng = "ItineraryNote-module__unclickable___UwGgP", ig = "ItineraryNote-module__icon___ie-C7", Fr = {
  root: J1,
  highlight: X1,
  light: eg,
  dark: tg,
  clickable: rg,
  unclickable: ng,
  icon: ig
}, dn = ({
  backgroundColor: t,
  withIcon: e,
  textTheme: r = "dark",
  onClick: n,
  children: i,
  ...a
}) => /* @__PURE__ */ o("div", { className: Fr.root, onClick: n, tabIndex: n ? 0 : -1, ...a, children: /* @__PURE__ */ o(
  "span",
  {
    className: B([Fr[r]], {
      [Fr.highlight]: t,
      [Fr.clickable]: n,
      [Fr.unclickable]: !n
    }),
    style: { backgroundColor: t },
    children: [
      i,
      e && /* @__PURE__ */ o("span", { className: Fr.icon, children: /* @__PURE__ */ o(St, {}) })
    ]
  }
) }), ag = ({
  time: t,
  tags: e,
  cityNameWhere: r,
  onClickTag: n
}) => {
  const { t: i } = Y(), a = () => e.recheck_baggage && r && !e.night_transfer && !e.airport_change && !e.short_layover;
  return /* @__PURE__ */ o("div", { className: un.root, children: [
    /* @__PURE__ */ o(Y1, { className: un.icon }),
    /* @__PURE__ */ o("div", { className: un.box, children: [
      /* @__PURE__ */ o("div", { className: un.notes, children: [
        e.night_transfer && /* @__PURE__ */ o(
          dn,
          {
            withIcon: !0,
            textTheme: "light",
            backgroundColor: "#9EA9B7",
            onClick: () => n({ tag: "night_transfer", cityNameWhere: r }),
            "data-role": "itinerary-note-overnight-layover",
            children: [
              i("itinerarynote.overnight_layover"),
              /* @__PURE__ */ o("span", { children: [
                " ",
                r
              ] })
            ]
          }
        ),
        e.airport_change && /* @__PURE__ */ o(
          dn,
          {
            withIcon: !0,
            textTheme: "dark",
            backgroundColor: "#FFBD12",
            onClick: () => n({ tag: "airport_change", cityNameWhere: r }),
            children: [
              i("itinerarynote.changing_the_airport"),
              /* @__PURE__ */ o("span", { children: [
                " ",
                r
              ] })
            ]
          }
        ),
        e.short_layover && /* @__PURE__ */ o(
          dn,
          {
            withIcon: !0,
            textTheme: "light",
            backgroundColor: "#388AFA",
            onClick: () => n({ tag: "short_layover", cityNameWhere: r, time: t }),
            children: [
              i("itinerarynote.short_layover"),
              /* @__PURE__ */ o("span", { children: [
                " ",
                r
              ] })
            ]
          }
        ),
        e.recheck_baggage && /* @__PURE__ */ o(
          dn,
          {
            withIcon: !0,
            textTheme: "light",
            backgroundColor: "#F14C18",
            onClick: () => n({ tag: "recheck_baggage", cityNameWhere: r }),
            children: [
              i("itinerarynote.repeat_checkin"),
              a() && /* @__PURE__ */ o("span", { children: [
                " ",
                r
              ] })
            ]
          }
        ),
        !e.night_transfer && !e.airport_change && !e.short_layover && !e.recheck_baggage && /* @__PURE__ */ o(dn, { children: [
          i("itinerarynote.layover"),
          /* @__PURE__ */ o("span", { children: [
            " ",
            r
          ] })
        ] })
      ] }),
      /* @__PURE__ */ o("span", { className: un.time, children: t })
    ] })
  ] });
}, og = (t, e) => /* @__PURE__ */ w("svg", { width: 40, height: 40, viewBox: "0 0 40 40", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M30.11 27.3117C21.3517 27.3117 14.2517 20.4267 14.2517 11.935C14.2517 9.435 14.8783 7.085 15.9683 5C9.60667 7 5 12.7867 5 19.6233C5 28.115 12.1 35 20.8583 35C27.0417 35 32.3833 31.5633 35 26.5583C33.4583 27.0417 31.8167 27.3117 30.11 27.3117Z", fill: "white" }), /* @__PURE__ */ w("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M22.6656 2.78753C22.658 2.43163 22.7918 2.08724 23.0377 1.82982C23.2835 1.57239 23.6214 1.42293 23.9773 1.41419C24.1563 1.41169 24.334 1.44556 24.4996 1.51374C24.6652 1.58192 24.8152 1.683 24.9406 1.81086C25.0672 1.9397 25.167 2.09235 25.2342 2.25999C25.3014 2.42762 25.3348 2.60693 25.3323 2.78753V4.14252H26.6656C26.9028 4.13997 27.1364 4.2009 27.3421 4.319C27.5478 4.4371 27.7182 4.60807 27.8356 4.81419C27.9549 5.02217 28.0177 5.25776 28.0177 5.49752C28.0177 5.73729 27.9549 5.97288 27.8356 6.18086C27.7182 6.38698 27.5478 6.55795 27.3421 6.67605C27.1364 6.79415 26.9028 6.85508 26.6656 6.85252H25.3323V8.20752C25.3363 8.44653 25.2773 8.68237 25.1611 8.89129C25.0449 9.10021 24.8758 9.27482 24.6706 9.39753C24.4673 9.5181 24.2353 9.58173 23.999 9.58173C23.7626 9.58173 23.5306 9.5181 23.3273 9.39753C23.1221 9.27482 22.953 9.10021 22.8368 8.89129C22.7206 8.68237 22.6616 8.44653 22.6656 8.20752V6.85086H21.3323C21.0951 6.85341 20.8615 6.79248 20.6558 6.67438C20.4501 6.55628 20.2797 6.38531 20.1623 6.17919C20.0431 5.97116 19.9805 5.73559 19.9805 5.49586C19.9805 5.25612 20.0431 5.02056 20.1623 4.81253C20.2797 4.6064 20.4501 4.43543 20.6558 4.31733C20.8615 4.19923 21.0951 4.1383 21.3323 4.14086H22.6656V2.78586V2.78753ZM30.6656 12.2709C30.6656 11.5242 31.2623 10.9175 31.999 10.9175C32.7356 10.9175 33.3323 11.5242 33.3323 12.2725V13.6259C33.3323 14.3759 33.929 14.9809 34.6656 14.9809H35.999C36.7356 14.9809 37.3323 15.5892 37.3323 16.3359C37.3349 16.6923 37.196 17.0352 36.946 17.2893C36.696 17.5433 36.3554 17.6878 35.999 17.6909H34.6656C33.929 17.6909 33.3323 18.2975 33.3323 19.0459V20.4009C33.335 20.7573 33.196 21.1002 32.946 21.3543C32.696 21.6083 32.3554 21.7528 31.999 21.7559C31.6425 21.7528 31.3019 21.6083 31.0519 21.3543C30.8019 21.1002 30.663 20.7573 30.6656 20.4009V19.0459C30.6683 18.6894 30.5294 18.3465 30.2794 18.0924C30.0293 17.8384 29.6887 17.6939 29.3323 17.6909H27.999C27.6425 17.6878 27.3019 17.5433 27.0519 17.2893C26.8019 17.0352 26.663 16.6923 26.6656 16.3359C26.6656 15.5892 27.2623 14.9809 27.999 14.9809H29.3323C30.069 14.9809 30.6656 14.3742 30.6656 13.6259V12.2709Z", fill: "white" })), sg = Ce(og), lg = "OvernightLayoverModal-module__root___Ivfnw", cg = "OvernightLayoverModal-module__icon___hNXTU", ug = "OvernightLayoverModal-module__title___cyynU", dg = "OvernightLayoverModal-module__description___HjVcB", hg = "OvernightLayoverModal-module__close___X1dR2", hn = {
  root: lg,
  icon: cg,
  title: ug,
  description: dg,
  close: hg
}, fg = ({ nameWhere: t }) => {
  const { t: e } = Y(), r = () => {
    _.modal.closeLastModal();
  };
  return /* @__PURE__ */ o("div", { className: hn.root, children: [
    /* @__PURE__ */ o("button", { className: hn.close, type: "button", onClick: r, children: /* @__PURE__ */ o(Tt, {}) }),
    /* @__PURE__ */ o("div", { className: hn.icon, children: /* @__PURE__ */ o(sg, {}) }),
    /* @__PURE__ */ o("h1", { className: hn.title, children: e("overnightlayovermodal.overnight_layover", { nameWhere: t }) }),
    /* @__PURE__ */ o("p", { className: hn.description, children: e("overnightlayovermodal.you_will_have_spend_money_a_hotel_or") })
  ] });
}, pg = "ShortLayoverModal-module__root___YZQyS", _g = "ShortLayoverModal-module__container___9l9bj", gg = "ShortLayoverModal-module__icon___lrSwm", mg = "ShortLayoverModal-module__title___133tx", vg = "ShortLayoverModal-module__content___ojIpa", yg = "ShortLayoverModal-module__description___FD-ky", bg = "ShortLayoverModal-module__list___maMSW", Cg = "ShortLayoverModal-module__close___7dWqt", Zt = {
  root: pg,
  container: _g,
  icon: gg,
  title: mg,
  content: vg,
  description: yg,
  list: bg,
  close: Cg
}, wg = ({ layoverTime: t, nameWhere: e }) => {
  const r = () => {
    _.modal.closeLastModal();
  }, { t: n } = Y();
  return /* @__PURE__ */ o("div", { className: Zt.root, children: /* @__PURE__ */ o("div", { className: Zt.container, children: [
    /* @__PURE__ */ o("button", { className: Zt.close, type: "button", onClick: r, children: /* @__PURE__ */ o(Tt, {}) }),
    /* @__PURE__ */ o("div", { className: Zt.icon, children: /* @__PURE__ */ o(sl, {}) }),
    /* @__PURE__ */ o("h1", { className: Zt.title, children: n("shortlayovermodal.short_layover", { nameWhere: e || "" }) }),
    /* @__PURE__ */ o("div", { className: Zt.content, children: [
      /* @__PURE__ */ o("p", { className: Zt.description, children: n("shortlayovermodal.you_will_have_to_hurry", {
        layoverTime: t || ""
      }) }),
      /* @__PURE__ */ o("ul", { className: Zt.list, children: [
        /* @__PURE__ */ o("li", { children: n("shortlayovermodal.your_baggage_may_not_get_transferred_time_and") }),
        /* @__PURE__ */ o("li", { children: n("shortlayovermodal.your_may_not_be_time_the_next_flight") })
      ] })
    ] })
  ] }) });
}, Fn = (t) => {
  const e = Math.floor(t / 3600), r = Math.floor(e / 24), n = e % 24, i = Math.floor(t % 3600 / 60);
  return { days: r, hours: n, minutes: i };
}, xi = () => {
  const { i18n: t } = Y();
  return { timeFormatter: Rr(() => ({
    format: (r) => {
      const n = Qc(r);
      if (!n)
        return "";
      const i = Wc();
      try {
        return n.toLocaleTimeString(Za(), {
          hour: "2-digit",
          minute: "2-digit",
          ...i ? { hourCycle: i } : {}
        }).toLowerCase();
      } catch (a) {
        return console.error("Time format error:", a, r), "";
      }
    }
  }), [t.language]) };
}, Tg = (t) => t.length ? t[t.length - 1].arrival_unix_timestamp - t[0].departure_unix_timestamp : 0, kg = (t) => t.length ? t.map((e, r) => {
  const n = e.arrival_unix_timestamp - e.departure_unix_timestamp, i = r === t.length - 1 ? 0 : t[r + 1].departure_unix_timestamp - t[r].arrival_unix_timestamp;
  return {
    flight: n,
    transfer: i
  };
}) : [], Ng = "FlightHead-module__root___cTUL4", xg = "FlightHead-module__title___-8zc2", Fg = "FlightHead-module__time___o5145", Gi = {
  root: Ng,
  title: xg,
  time: Fg
}, Eg = ({ title: t, time: e, isShowTime: r }) => {
  const { t: n } = Y();
  return /* @__PURE__ */ o("div", { className: Gi.root, children: [
    /* @__PURE__ */ o("span", { className: Gi.title, children: t }),
    r && /* @__PURE__ */ o("span", { className: Gi.time, children: n("flighthead.travel_time", { time: e }) })
  ] });
}, Mg = "FlightSchedule-module__root___2MJAG", Sg = "FlightSchedule-module__list___kyjT7", Ag = "FlightSchedule-module__item___19NrK", Ig = "FlightSchedule-module__status___nn4eo", Dg = "FlightSchedule-module__datetime___nlR-C", Og = "FlightSchedule-module__sliderItem___iie0f", Lg = "FlightSchedule-module__disabledSlide___p1B2O", Rg = "FlightSchedule-module__current___nNCy0", Pg = "FlightSchedule-module__price___M7PjY", Bg = "FlightSchedule-module__lower___vrr7W", $g = "FlightSchedule-module__higher___2UK8c", jg = "FlightSchedule-module__button___dj-3K", Vg = "FlightSchedule-module__prev___QNwCJ", qg = "FlightSchedule-module__next___ezCTa", Ug = "FlightSchedule-module__disabled___bZczT", Qg = "FlightSchedule-module__loaderBox___gyEzI", Wg = "FlightSchedule-module__loader___fZ3pP", zg = "FlightSchedule-module__rotation___odW-l", Se = {
  root: Mg,
  list: Sg,
  item: Ag,
  status: Ig,
  datetime: Dg,
  sliderItem: Og,
  disabledSlide: Lg,
  current: Rg,
  price: Pg,
  lower: Bg,
  higher: $g,
  button: jg,
  prev: Vg,
  next: qg,
  disabled: Ug,
  loaderBox: Qg,
  loader: Wg,
  rotation: zg
}, Hg = 5, Gg = ({
  list: t,
  onClick: e,
  isDisabled: r
}) => {
  const { timeFormatter: n } = xi(), { priceFormatter: i } = Ze(), { t: a } = Y(), s = t.value.length > Hg, l = It(null), c = Q(!1), u = Q(!1), d = It(null), h = Q(-1), f = (b) => b.isCurrent ? /* @__PURE__ */ o("span", { className: Se.status, children: a("flightschedule.selected") }) : b.isAvailable ? b.priceDiff.value === 0 ? /* @__PURE__ */ o("span", { className: Se.status, children: a("flightschedule.same_price") }) : b.priceDiff.value < 0 ? /* @__PURE__ */ o("span", { className: B(Se.price, Se.lower), children: i.format(b.priceDiff.value, !0, !1, b.priceDiff.currencyCode) }) : /* @__PURE__ */ o("span", { className: B(Se.price, Se.higher), children: [
    "+ ",
    i.format(b.priceDiff.value, !0, !1, b.priceDiff.currencyCode)
  ] }) : /* @__PURE__ */ o("span", { className: Se.status, children: a("flightschedule.unavailable") }), p = () => {
    if (!l.current) return;
    const { scrollLeft: b, offsetWidth: C } = l.current;
    y(b - C);
  }, m = () => {
    if (!l.current) return;
    const { scrollLeft: b, offsetWidth: C } = l.current;
    y(b + C);
  }, y = (b) => {
    l.current && (l.current.scrollLeft = b);
  }, v = () => {
    if (!l.current) return;
    const { scrollLeft: b, scrollWidth: C, offsetWidth: x } = l.current;
    b ? c.value = !1 : c.value = !0, b < C - x ? u.value = !1 : u.value = !0;
  };
  re(() => {
    if (d.current && l.current) {
      const b = d.current;
      h.value = -1, b.scrollIntoView({
        inline: "center",
        block: "nearest"
      });
    }
  }, [t.value]);
  const g = (b, C) => {
    h.value = b, e(C);
  };
  return /* @__PURE__ */ o("div", { className: Se.root, children: [
    s && /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        className: B(Se.button, Se.prev, {
          [Se.disabled]: c.value
        }),
        onClick: p,
        disabled: c.value,
        tabIndex: 0,
        children: /* @__PURE__ */ o(Cr, {})
      }
    ),
    /* @__PURE__ */ o("ul", { className: Se.list, ref: l, onScroll: v, children: t.value.map((b, C) => /* @__PURE__ */ o(
      "li",
      {
        className: B(Se.item, {
          [Se.current]: b.isCurrent,
          [Se.sliderItem]: s,
          [Se.disabledSlide]: r || !b.isAvailable,
          [Se.loadedSlide]: h.value === C
        }),
        ref: b.isCurrent ? d : null,
        onClick: () => g(C, b),
        tabIndex: b.isCurrent || r || h.value === C ? -1 : 0,
        children: h.value === C ? /* @__PURE__ */ o("div", { className: Se.loaderBox, children: /* @__PURE__ */ o("div", { className: Se.loader }) }) : /* @__PURE__ */ o(Ie, { children: [
          /* @__PURE__ */ o("div", { className: Se.datetime, children: n.format(b.datetime) }),
          f(b)
        ] })
      },
      b.signature
    )) }),
    s && /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        className: B(Se.button, Se.next, {
          [Se.disabled]: u.value
        }),
        onClick: m,
        disabled: u.value,
        tabIndex: 0,
        children: /* @__PURE__ */ o(Cr, {})
      }
    )
  ] });
}, Zg = "SkeletonFlightSchedule-module__root___9F-U5", Kg = "SkeletonFlightSchedule-module__slider___jFI6A", Yg = "SkeletonFlightSchedule-module__button___aS-PB", Jg = "SkeletonFlightSchedule-module__prev___5dNHy", Xg = "SkeletonFlightSchedule-module__disabled___jadN8", _r = {
  root: Zg,
  slider: Kg,
  button: Yg,
  prev: Jg,
  disabled: Xg
}, em = () => /* @__PURE__ */ o("div", { className: _r.root, children: [
  /* @__PURE__ */ o("button", { type: "button", className: B(_r.button, _r.prev, _r.disabled), children: /* @__PURE__ */ o(Cr, {}) }),
  /* @__PURE__ */ o("div", { className: _r.slider, children: /* @__PURE__ */ o(Ae, { height: "1.875rem", margin: "0" }) }),
  /* @__PURE__ */ o("button", { type: "button", className: B(_r.button, _r.next), children: /* @__PURE__ */ o(Cr, {}) })
] }), tm = "SkeletonItinaryFlight-module__root___cs9gp", rm = "SkeletonItinaryFlight-module__logo___VozMv", nm = "SkeletonItinaryFlight-module__desktop___pbQIh", im = "SkeletonItinaryFlight-module__mobile___LtjhO", am = "SkeletonItinaryFlight-module__box___NU7pd", Er = {
  root: tm,
  logo: rm,
  desktop: nm,
  mobile: im,
  box: am
}, om = ({
  isSkeletonFlightStop: t = !1
}) => /* @__PURE__ */ o("div", { className: Er.root, children: [
  /* @__PURE__ */ o(
    Ae,
    {
      className: Er.logo,
      height: "2rem",
      width: "2rem",
      margin: "0",
      borderRadius: "50%"
    }
  ),
  /* @__PURE__ */ o("div", { className: Er.desktop, children: [
    /* @__PURE__ */ o(Ae, { height: "2rem", width: "6.69rem", margin: "0 0 1.5rem 0" }),
    /* @__PURE__ */ o(Ae, { height: "2.25rem", margin: "0 0 0.75rem 0" }),
    !t && /* @__PURE__ */ o(Ae, { height: "2rem", width: "5.31rem", margin: "0 0 0.75rem 0" }),
    /* @__PURE__ */ o(Ae, { height: "2.25rem", margin: "0 0 0.75rem 0" })
  ] }),
  /* @__PURE__ */ o("div", { className: Er.mobile, children: [
    /* @__PURE__ */ o(Ae, { height: "1.94rem", width: "6.75rem", margin: "0 0 1.5rem 0" }),
    /* @__PURE__ */ o("div", { className: Er.box, children: [
      /* @__PURE__ */ o(Ae, { height: "2.12rem", width: "4.38rem", margin: "0" }),
      /* @__PURE__ */ o(Ae, { height: "3.5rem", margin: "0" })
    ] }),
    !t && /* @__PURE__ */ o(Ae, { height: "2.12rem", width: "4.38rem", margin: "0 0 0.75rem 0" }),
    /* @__PURE__ */ o("div", { className: Er.box, children: [
      /* @__PURE__ */ o(Ae, { height: "2.12rem", width: "4.38rem", margin: "0" }),
      /* @__PURE__ */ o(Ae, { height: "3.5rem", margin: "0" })
    ] })
  ] })
] }), sm = "TicketFlights-module__root___uLpjI", lm = "TicketFlights-module__list___np1SL", Bo = {
  root: sm,
  list: lm
}, $o = ({
  segment: t,
  schedule: e,
  onClickScheduleItem: r,
  isShowTravelTime: n = !0,
  isLoading: i,
  isLegacyResults: a,
  proposals: s,
  fare: l
}) => {
  const { flights: c, transfers: u, airports: d, cities: h, airlines: f } = t, p = Q(-1), m = Q(-1), y = (P, E) => P !== E, { t: v, i18n: g } = Y(), { timeFormatter: b } = xi(), C = Zr(g.language), { formatShortDateWithWeekDay: x } = Ti(), N = (P) => {
    const E = d[P.origin];
    return {
      day: x(P.local_departure_date_time, C),
      time: b.format(P.local_departure_date_time),
      city: h[E == null ? void 0 : E.city_code],
      airport: E
    };
  }, T = (P) => {
    const E = d[P.destination];
    return {
      day: x(P.local_arrival_date_time, C),
      time: b.format(P.local_arrival_date_time),
      city: h[E == null ? void 0 : E.city_code],
      airport: E
    };
  }, M = () => {
    var K, z, de, D, ne, le;
    const P = d[c[0].origin], E = ((de = (z = (K = h[P == null ? void 0 : P.city_code]) == null ? void 0 : K.name) == null ? void 0 : z[ye()]) == null ? void 0 : de.default) || "", U = d[c[c.length - 1].destination], Z = ((le = (ne = (D = h[U == null ? void 0 : U.city_code]) == null ? void 0 : D.name) == null ? void 0 : ne[ye()]) == null ? void 0 : le.default) || "";
    return `${E} - ${Z}`;
  }, S = Tg(c), R = () => {
    const { days: P, hours: E, minutes: U } = Fn(S);
    return P ? P + v("base.d") + " " + E + v("base.h") + " " + U + v("base.m") : E + v("base.h") + " " + U + v("base.m");
  }, $ = (P) => P ? c[P].origin !== c[P - 1].destination : !1, V = (P) => P === c.length - 1 ? !1 : c[P].destination !== c[P + 1].origin, J = kg(c), F = (P) => {
    const E = J[P].flight, { days: U, hours: Z, minutes: K } = Fn(E);
    return U ? U + v("base.d") + " " + Z + v("base.h") + " " + K + v("base.m") : Z + v("base.h") + " " + K + v("base.m");
  }, I = (P) => {
    const E = J[P].transfer, { days: U, hours: Z, minutes: K } = Fn(E);
    return U ? U + v("base.d") + " " + Z + v("base.h") + " " + K + v("base.m") : Z ? Z + v("base.h") + " " + K + v("base.m") : K + v("base.m");
  }, O = (P) => c[P].technical_stops.map((E) => {
    var K, z;
    const U = d[E.airport_code], Z = h[U == null ? void 0 : U.city_code];
    return {
      city: ((z = (K = Z == null ? void 0 : Z.name) == null ? void 0 : K[ye()]) == null ? void 0 : z.where) || "",
      airport: (E == null ? void 0 : E.airport_code) || ""
    };
  }), H = (P) => {
    var Z, K, z, de, D;
    return {
      recheck_baggage: !!((Z = s == null ? void 0 : s.value) == null ? void 0 : Z.some((ne) => {
        var le;
        return (le = ne.transfer_terms) == null ? void 0 : le.some((ve) => ve.some((j, he) => j.is_virtual_interline && he === P));
      })),
      night_transfer: u[P].night_transfer,
      airport_change: ((z = (K = u[P]) == null ? void 0 : K.tags) == null ? void 0 : z.includes("airport_change")) || !1,
      short_layover: ((D = (de = u[P]) == null ? void 0 : de.tags) == null ? void 0 : D.includes("short_layover")) || !1
    };
  }, W = (P) => {
    var U, Z, K;
    const E = d[c[P].destination];
    return ((K = (Z = (U = h[E == null ? void 0 : E.city_code]) == null ? void 0 : U.name) == null ? void 0 : Z[ye()]) == null ? void 0 : K.where) || "";
  }, se = (P) => f[P.marketing_carrier_designator.carrier], L = (P) => f[P.operating_carrier_designator.carrier], X = () => {
    let P = N(c[0]).day;
    for (let E = 0; E < c.length && !(m.value !== -1 && p.value !== -1); E++) {
      const U = c[E], Z = N(U).day, K = T(U).day;
      y(P, Z) && (p.value = E), (y(P, K) || y(Z, K)) && m.value === -1 && (m.value = E), P = Z;
    }
  }, Me = (P) => {
    var U, Z, K;
    const E = c[P].id;
    return E === void 0 ? !1 : !!((K = (Z = (U = l.value) == null ? void 0 : U.flight_terms) == null ? void 0 : Z[E]) != null && K.is_charter);
  }, me = {
    recheck_baggage: () => /* @__PURE__ */ o(Ja, {}),
    night_transfer: (P) => /* @__PURE__ */ o(fg, { nameWhere: P }),
    airport_change: (P) => /* @__PURE__ */ o(v1, { nameWhere: P }),
    short_layover: (P, E) => /* @__PURE__ */ o(wg, { nameWhere: P, layoverTime: E || "" })
  }, Fe = ({ cityNameWhere: P, tag: E, time: U }) => {
    _.modal.openModal({
      content: me[E](P, U),
      variant: "popup"
    });
  };
  return re(() => {
    X();
  }, []), /* @__PURE__ */ o("div", { className: Bo.root, children: [
    /* @__PURE__ */ o(
      Eg,
      {
        title: M(),
        time: R(),
        isShowTime: n
      }
    ),
    (i == null ? void 0 : i.value) && /* @__PURE__ */ o(em, {}),
    !(i != null && i.value) && (e == null ? void 0 : e.value) && /* @__PURE__ */ o(
      Gg,
      {
        list: e,
        onClick: (P) => r == null ? void 0 : r(P),
        isDisabled: a == null ? void 0 : a.value
      }
    ),
    /* @__PURE__ */ o("div", { className: Bo.list, children: c.map((P, E) => {
      var U;
      return /* @__PURE__ */ o("div", { children: [
        (i == null ? void 0 : i.value) && /* @__PURE__ */ o(om, { isSkeletonFlightStop: !!((U = O(E)) != null && U.length) }),
        !(i != null && i.value) && /* @__PURE__ */ o(
          Q1,
          {
            departure: {
              ...N(P),
              highlight: p.value !== -1 && E >= p.value
            },
            arrival: {
              ...T(P),
              highlight: m.value !== -1 && E >= m.value
            },
            time: F(E),
            stopPlaces: O(E),
            marketingCarrier: se(P),
            operatingCarrier: L(P),
            isChangeDepartureAirport: $(E),
            isChangeArrivalAirport: V(E),
            isCharter: Me(E)
          }
        ),
        u[E] && /* @__PURE__ */ o(
          ag,
          {
            time: I(E),
            tags: H(E),
            cityNameWhere: W(E),
            onClickTag: Fe
          }
        )
      ] }, E);
    }) })
  ] });
}, cm = (t, e) => /* @__PURE__ */ w("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M17.1946 8.37699L10.5091 14.7971C10.2277 15.0676 9.77303 15.0676 9.49088 14.7971L2.80537 8.37699C2.39821 7.98648 2.39821 7.35113 2.80537 6.95993C3.21252 6.56942 3.87332 6.56942 4.28048 6.95993L10.0004 12.452L15.7188 6.95993C16.1267 6.56942 16.7875 6.56942 17.1946 6.95993C17.6018 7.35113 17.6018 7.98649 17.1946 8.37699Z", fill: "currentColor" })), um = Ce(cm), dm = "ProposaCard-module__root___mXrcJ", hm = "ProposaCard-module__logo___N1P7f", fm = "ProposaCard-module__logoPicture___OcbF2", pm = "ProposaCard-module__logoImage___iL6LO", _m = "ProposaCard-module__wrapper___J7Z8-", gm = "ProposaCard-module__box___76Xy4", mm = "ProposaCard-module__price___bLwS9", vm = "ProposaCard-module__name___OsKDu", ym = "ProposaCard-module__disabled___ovhsk", dt = {
  root: dm,
  logo: hm,
  logoPicture: fm,
  logoImage: pm,
  wrapper: _m,
  box: gm,
  price: mm,
  name: vm,
  disabled: ym
}, bm = ({
  id: t,
  name: e,
  price: r,
  disabled: n,
  children: i
}) => {
  const { priceFormatter: a } = Ze(), { t: s } = Y();
  return /* @__PURE__ */ o("div", { className: dt.root, children: [
    /* @__PURE__ */ o("div", { className: dt.logo, children: /* @__PURE__ */ o("picture", { className: dt.logoPicture, children: [
      /* @__PURE__ */ o("source", { src: `https://img.avs.io/pics/as_gates_square/ru/${t}@avif?rs=fit:48:48` }),
      /* @__PURE__ */ o(
        "img",
        {
          className: dt.logoImage,
          src: `https://img.avs.io/pics/as_gates_square/ru/${t}@png?rs=fit:48:48`,
          alt: ""
        }
      )
    ] }) }),
    /* @__PURE__ */ o("div", { className: dt.wrapper, children: [
      /* @__PURE__ */ o("div", { className: dt.box, children: [
        /* @__PURE__ */ o("span", { className: B(dt.price, { [dt.disabled]: n }), children: a.format(r) }),
        /* @__PURE__ */ o("span", { className: B(dt.name, { [dt.disabled]: n }), children: n ? s("proposal_card.prices_are_outdated") : e })
      ] }),
      i && /* @__PURE__ */ o("div", { className: dt.actions, children: i })
    ] })
  ] });
}, Cm = "TicketProposals-module__root___lnzKO", wm = "TicketProposals-module__list___uigII", Tm = "TicketProposals-module__button___a-l7S", km = "TicketProposals-module__more___A4kub", Nm = "TicketProposals-module__allProposals___I4iuR", fn = {
  root: Cm,
  list: wm,
  button: Tm,
  more: km,
  allProposals: Nm
}, Zi = 3, xm = ({
  proposals: t,
  isLegacyResults: e,
  onUpdate: r,
  onBuy: n,
  isLoadingPrices: i,
  shareUrl: a
}) => {
  const { t: s, i18n: l } = Y(), c = Q(s("ticket.update")), u = Q(!1), d = u.value ? t : t.slice(0, Zi);
  re(() => {
    u.value = !1;
  }, [t]), re(() => {
    c.value = s(e ? "ticket.update" : "ticket.buy");
  }, [e]);
  const h = () => {
    u.value = !u.value;
  }, f = (p) => {
    var T, M, S, R;
    const y = new URL(import.meta.url).hostname, v = ((M = (T = p.agent) == null ? void 0 : T.label[ye()]) == null ? void 0 : M.default) || "", g = l.language, b = ((S = _.search.requestRes) == null ? void 0 : S.results_url) || "", C = ((R = _.search.requestRes) == null ? void 0 : R.search_id) || "", x = encodeURIComponent(
      `https://${b}/searches/${C}/clicks/${p.id}`
    ), N = encodeURIComponent((a == null ? void 0 : a.value) || "");
    return `https://${y}/wl/redirect?locale=${g}&gate_name=${v}&redirect_url=${x}&fallback_url=${N}`;
  };
  return /* @__PURE__ */ o("div", { className: fn.root, children: [
    /* @__PURE__ */ o("div", { className: fn.list, children: d.map((p, m) => {
      var v, g;
      const y = e ? {
        onClick: () => {
          r();
        }
      } : {
        onClick: () => {
          var b;
          n(p.id), (b = window.TPWL_BACKEND_CONFIGURATION) != null && b.onBuyButtonClick && typeof window[window.TPWL_BACKEND_CONFIGURATION.onBuyButtonClick] == "function" && window[window.TPWL_BACKEND_CONFIGURATION.onBuyButtonClick]();
        },
        link: f(p),
        target: "_blank"
      };
      return /* @__PURE__ */ o(
        bm,
        {
          id: p.agent_id,
          price: p.price.value,
          disabled: e,
          name: ((g = (v = p.agent) == null ? void 0 : v.label[ye()]) == null ? void 0 : g.default) || "",
          children: /* @__PURE__ */ o(
            Ge,
            {
              className: fn.button,
              variant: m > 0 ? "secondary" : "primary",
              isLoading: i == null ? void 0 : i.value,
              ...y,
              children: c
            }
          )
        },
        p.id
      );
    }) }),
    t.length > Zi && /* @__PURE__ */ o(
      "button",
      {
        className: B(fn.more, {
          [fn.allProposals]: u.value
        }),
        type: "button",
        onClick: h,
        children: [
          /* @__PURE__ */ o(um, {}),
          u.value ? s("ticket_proposals.less") : s("ticket_proposals.more_offers", {
            count: t.length - Zi
          })
        ]
      }
    )
  ] });
}, Fm = "SkeletonTicketFare-module__root___4TLyX", Em = "SkeletonTicketFare-module__desktop___1MKYC", Mm = "SkeletonTicketFare-module__mobile___DlfD7", Ki = {
  root: Fm,
  desktop: Em,
  mobile: Mm
}, Sm = () => /* @__PURE__ */ o("div", { className: Ki.root, children: [
  /* @__PURE__ */ o("div", { className: Ki.desktop, children: [
    /* @__PURE__ */ o(Ae, { width: "5.88rem", height: "1.44rem", margin: "0 0 0.5rem 0" }),
    /* @__PURE__ */ o(Ae, { width: "11rem", height: "1.44rem", margin: "0 0 0.3125rem 0" }),
    /* @__PURE__ */ o(Ae, { width: "13.31rem", height: "1.44rem", margin: "0 0 0.3125rem 0" }),
    /* @__PURE__ */ o(Ae, { width: "11rem", height: "1.44rem", margin: "0 0 0.3125rem 0" }),
    /* @__PURE__ */ o(Ae, { width: "13.31rem", height: "1.44rem", margin: "0 0 0.75rem 0" }),
    /* @__PURE__ */ o(Ae, { height: "5.81rem", margin: "0" })
  ] }),
  /* @__PURE__ */ o("div", { className: Ki.mobile, children: [
    /* @__PURE__ */ o(Ae, { width: "5.88rem", height: "1.44rem", margin: "0 0 0.75rem 0" }),
    /* @__PURE__ */ o(Ae, { width: "11.38rem", height: "6.25rem", margin: "0 0 1rem 0" }),
    /* @__PURE__ */ o(Ae, { height: "6.25rem", margin: "0" })
  ] })
] }), Am = "SkeletonTicketProposals-module__root___tVtWZ", Im = "SkeletonTicketProposals-module__logo___byIDM", Dm = "SkeletonTicketProposals-module__text___eUC1e", Om = "SkeletonTicketProposals-module__button___8objY", ni = {
  root: Am,
  logo: Im,
  text: Dm,
  button: Om
}, Lm = () => {
  const { t } = Y();
  return /* @__PURE__ */ o("div", { className: ni.root, children: [
    /* @__PURE__ */ o(Ae, { className: ni.logo, width: "1.5rem", height: "1.5rem", margin: "0" }),
    /* @__PURE__ */ o("span", { className: ni.text, children: t("skeletonticketproposals.loading_prices") }),
    /* @__PURE__ */ o(Ge, { className: ni.button, isLoading: !0 })
  ] });
}, Rm = (t, e) => !t || !e ? [] : (t == null ? void 0 : t.proposals.filter((r) => {
  var c, u, d, h, f, p, m, y, v, g;
  const n = r.minimum_fare, i = (((c = n.baggage) == null ? void 0 : c.count) || 0) === (((d = (u = e.options) == null ? void 0 : u.baggage) == null ? void 0 : d.count) || 0), a = (Ln(n == null ? void 0 : n.handbags) || 0) === (Ln((h = e.options) == null ? void 0 : h.handbags) || 0), s = ((f = n.return_before_flight) == null ? void 0 : f.available) === ((m = (p = e.options) == null ? void 0 : p.return_before_flight) == null ? void 0 : m.available), l = ((y = n.change_before_flight) == null ? void 0 : y.available) === ((g = (v = e.options) == null ? void 0 : v.change_before_flight) == null ? void 0 : g.available);
  return i && a && s && l;
}).sort((r, n) => r.price.value - n.price.value)) || [], ya = ({
  ticket: t,
  isLegacyResults: e,
  onUpdateTickets: r,
  currentFare: n,
  onChangeFare: i,
  fareOptions: a,
  onToggleBaggage: s,
  directFlightSchedule: l,
  onClickScheduleItem: c,
  isLoadingPrices: u,
  isDirectFlight: d,
  isStartLoading: h,
  seatsAvailable: f,
  isFromUrl: p
}) => {
  var j, he, Je, Le, lt;
  const m = Q(!1), y = It(null), v = Q(!1), g = Q(!0), b = Q(!1), { t: C } = Y(), x = () => {
    var q;
    return (q = t.value) == null ? void 0 : q.segments.reduce(
      (G, ue) => {
        var we;
        return G + (((we = ue.flights) == null ? void 0 : we.length) || 0);
      },
      0
    );
  }, N = () => {
    var q;
    return (q = t.value) == null ? void 0 : q.segments.reduce(
      (G, ue) => {
        var we;
        return G + (((we = ue.transfers) == null ? void 0 : we.length) || 0);
      },
      0
    );
  }, T = (q) => q.reduce((G, ue) => {
    const we = ue.flights;
    if (!we || we.length < 2) return G;
    const Ve = we.reduce((Ke, ze, qe) => {
      if (qe === we.length - 1) return Ke;
      const mt = we[qe + 1];
      return Ke + (mt.departure_unix_timestamp - ze.arrival_unix_timestamp);
    }, 0);
    return G + Ve;
  }, 0), M = (q) => {
    var Ve;
    const G = [], ue = [];
    return tl((Ve = _.search.params) == null ? void 0 : Ve.directions).type === "roundtrip" ? q.forEach((Ke, ze) => {
      ze === 0 ? Ke.flights.forEach((qe) => {
        G.push({
          local_arrival_date_time: qe.local_arrival_date_time,
          local_departure_date_time: qe.local_departure_date_time
        });
      }) : ze === 1 && Ke.flights.forEach((qe) => {
        ue.push({
          local_arrival_date_time: qe.local_arrival_date_time,
          local_departure_date_time: qe.local_departure_date_time
        });
      });
    }) : q.forEach((Ke) => {
      Ke.flights.forEach((ze) => {
        G.push({
          local_arrival_date_time: ze.local_arrival_date_time,
          local_departure_date_time: ze.local_departure_date_time
        });
      });
    }), ue.length ? [G, ue] : [G];
  };
  re(() => {
    var G, ue, we, Ve, Ke, ze, qe, mt, Rt, Pt, Bt, $t, ie, ae, ke, Ue, jt, Vt, Xe, qt, Ut, Qt, Xr, ko;
    const q = () => {
      if (!y.current) return;
      const Ac = 0, No = y.current.scrollTop, Ic = y.current.scrollHeight, Dc = y.current.clientHeight;
      No + Dc >= Ic || (No > Ac ? v.value = !0 : v.value = !1);
    };
    return y.current && y.current.addEventListener("scroll", q), window.addEventListener("resize", q), zc({
      ticket_signature: (G = t.value) == null ? void 0 : G.signature,
      ticket_request_id: (ue = t.value) == null ? void 0 : ue.id,
      source: d != null && d.value ? "search_results--direct_schedule" : "search_results",
      ticket_position: (we = t.value) == null ? void 0 : we.position,
      flights_count: x(),
      baggage_upsell_available: O.value && H.value && g.value,
      baggage_option: (Ke = (Ve = n.value) == null ? void 0 : Ve.options) == null ? void 0 : Ke.baggage,
      fare_key: (qe = (ze = n.value) == null ? void 0 : ze.options) == null ? void 0 : qe.fare_key,
      fare_baggage: (mt = n.value) == null ? void 0 : mt.options.baggage,
      fare_handbags: (Rt = n.value) == null ? void 0 : Rt.options.handbags,
      price: (Bt = (Pt = n.value) == null ? void 0 : Pt.price) == null ? void 0 : Bt.value,
      unified_price: (ie = ($t = n.value) == null ? void 0 : $t.unified_price) == null ? void 0 : ie.value,
      second_unified_price: (ke = (ae = n.value) == null ? void 0 : ae.unified_price) == null ? void 0 : ke.value,
      currency: (jt = (Ue = n.value) == null ? void 0 : Ue.price) == null ? void 0 : jt.currency_code,
      flights_time: M(((Vt = t.value) == null ? void 0 : Vt.segments) || []),
      layovers_count: N(),
      layovers_length: T(((Xe = t.value) == null ? void 0 : Xe.segments) || []),
      main_badge: ((Qt = (Ut = (qt = t.value) == null ? void 0 : qt.badges) == null ? void 0 : Ut[0]) == null ? void 0 : Qt.type) || [],
      ticket_badges: ((Xr = t.value) == null ? void 0 : Xr.badges) || [],
      seats_available: f ?? void 0,
      flight_terms: (ko = n.value) == null ? void 0 : ko.flight_terms
    }), () => {
      y.current && y.current.removeEventListener("scroll", q), window.removeEventListener("resize", q);
    };
  }, []);
  const S = () => {
    var q, G, ue;
    return !!((ue = (G = (q = n.value) == null ? void 0 : q.options) == null ? void 0 : G.baggage) != null && ue.count);
  };
  re(() => {
    me(n == null ? void 0 : n.value), m.value = S();
  }, []), re(() => {
    m.value = S();
  }, [n == null ? void 0 : n.value]);
  const R = st(() => {
    var q;
    return ((q = t.value) == null ? void 0 : q.proposals.filter((G) => {
      var ue;
      return (ue = G.minimum_fare.baggage) == null ? void 0 : ue.count;
    }).sort((G, ue) => G.price.value - ue.price.value)) || [];
  }), $ = st(() => {
    var q;
    return ((q = t.value) == null ? void 0 : q.proposals.filter((G) => {
      var ue;
      return !((ue = G.minimum_fare.baggage) != null && ue.count);
    }).sort((G, ue) => G.price.value - ue.price.value)) || [];
  }), V = st(() => m.value ? R.value : $.value), J = st(() => {
    var G;
    const q = (G = n.value) != null && G.isBasic ? V.value : F.value;
    return ve(q);
  }), F = st(
    () => Rm(t.value, n == null ? void 0 : n.value)
  ), I = st(() => {
    var q, G, ue;
    return m.value || !(n != null && n.value) || !R.value[0] ? null : {
      value: Math.round(
        R.value[0].price.value - (((q = n.value.price) == null ? void 0 : q.value) || 0)
      ),
      currency_code: (ue = (G = R.value[0]) == null ? void 0 : G.price) == null ? void 0 : ue.currency_code
    };
  }), O = st(() => !!R.value.length), H = st(() => !!$.value.length), W = a.value.length > 1;
  re(() => {
    b.value ? s == null || s(m.value || !1) : b.value = !0;
  }, [m.value]);
  const X = {
    recheck_baggage: ((he = (j = t.value) == null ? void 0 : j.proposals) == null ? void 0 : he.some(
      (q) => {
        var G;
        return (G = q.transfer_terms) == null ? void 0 : G.some(
          (ue) => ue.some((we) => we.is_virtual_interline)
        );
      }
    )) || !1,
    is_charter: (() => {
      var q;
      return (q = n.value) != null && q.flight_terms ? Object.values(n.value.flight_terms).some((G) => G.is_charter) : !1;
    })()
  }, Me = async (q) => {
    var we, Ve, Ke, ze, qe, mt, Rt, Pt, Bt, $t, ie, ae;
    if (!((we = _.search.requestRes) != null && we.results_url) || !((Ve = _.search.requestRes) != null && Ve.search_id) || !q)
      return;
    const G = V.value.find((ke) => ke.id === q), ue = V.value.findIndex((ke) => ke.id === q);
    G && Hc({
      ticket_signature: (Ke = t.value) == null ? void 0 : Ke.signature,
      ticket_request_id: (ze = t.value) == null ? void 0 : ze.id,
      source: d != null && d.value ? "search_results--direct_schedule" : "search_results",
      ticket_position: (qe = t.value) == null ? void 0 : qe.position,
      proposal_position: ue + 1,
      gate_id: G.agent_id,
      flights_count: x(),
      baggage_option: G.minimum_fare.baggage,
      fare_key: G.minimum_fare.fare_key,
      fare_baggage: G.minimum_fare.baggage,
      fare_handbags: G.minimum_fare.handbags,
      fare_return: G.minimum_fare.return_before_flight,
      fare_change: G.minimum_fare.change_before_flight,
      price: (Rt = (mt = n.value) == null ? void 0 : mt.price) == null ? void 0 : Rt.value,
      unified_price: (Pt = G.unified_price) == null ? void 0 : Pt.value,
      second_unified_price: ($t = (Bt = n.value) == null ? void 0 : Bt.unified_price) == null ? void 0 : $t.value,
      currency: (ae = (ie = n.value) == null ? void 0 : ie.price) == null ? void 0 : ae.currency_code,
      layovers_count: N(),
      flight_terms: G.flight_terms
    });
  }, me = (q) => {
    var G, ue;
    q != null && q.isBasic ? g.value = !0 : g.value = !((ue = (G = q == null ? void 0 : q.options) == null ? void 0 : G.baggage) != null && ue.count);
  }, Fe = (q) => {
    var G, ue;
    me(q), m.value = !!((ue = (G = q == null ? void 0 : q.options) == null ? void 0 : G.baggage) != null && ue.count), i(q), E();
  }, P = xp(!0), E = () => {
    _.modal.closeLastModal();
  }, U = () => {
    _.modal.openModal({
      content: /* @__PURE__ */ o(
        D_,
        {
          onSelect: Fe,
          onClose: E,
          fares: a.value,
          currentFare: n
        }
      ),
      variant: "fullHeight"
    });
  }, Z = () => {
    m.value = !m.value;
  }, K = () => {
    _.modal.closeLastModal();
  }, z = st(() => {
    var q;
    return ((q = l == null ? void 0 : l.value) == null ? void 0 : q.departures) || [];
  }), de = st(() => {
    var q;
    return ((q = l == null ? void 0 : l.value) == null ? void 0 : q.returns) || [];
  }), D = Q(!1), ne = Q(null);
  re(() => {
    var G;
    const q = (G = t.value) == null ? void 0 : G.id;
    if (!q) {
      ne.value = null;
      return;
    }
    ne.value = _.search.getTicketLinkFromParams({ ticketId: q });
  }, [(Je = t.value) == null ? void 0 : Je.id]);
  const le = (q) => {
    q.stopPropagation(), ne.value && navigator.clipboard && navigator.clipboard.writeText(ne.value).then(() => {
      D.value = !0, setTimeout(() => {
        D.value = !1;
      }, 1500);
    }).catch((G) => {
      console.error(G);
    });
  }, ve = (q) => {
    const G = [], ue = /* @__PURE__ */ new Set();
    return q.forEach((we) => {
      const Ve = we.agent_id;
      ue.has(Ve) || (G.push(we), ue.add(Ve));
    }), G.sort((we, Ve) => we.price.value - Ve.price.value);
  };
  return /* @__PURE__ */ o("div", { className: ot.root, ref: P, children: /* @__PURE__ */ o("div", { className: ot.wrapper, children: [
    /* @__PURE__ */ o("div", { className: B(ot.head, { [ot.fixed]: v.value }), children: [
      /* @__PURE__ */ o("button", { className: ot.close, type: "button", onClick: K, children: [
        /* @__PURE__ */ o(Tt, {}),
        C("calendar.close")
      ] }),
      D.value ? /* @__PURE__ */ o(He, { text: C("inputs.link_copied"), direction: "top", children: /* @__PURE__ */ o("button", { className: ot.share, type: "button", children: [
        /* @__PURE__ */ o(ma, {}),
        C("inputs.share")
      ] }) }) : /* @__PURE__ */ o("button", { className: ot.share, type: "button", onClick: le, children: [
        /* @__PURE__ */ o(ma, {}),
        C("inputs.share")
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: ot.body, ref: y, children: /* @__PURE__ */ o("div", { className: ot.content, children: [
      /* @__PURE__ */ o("div", { className: ot.main, children: [
        (h == null ? void 0 : h.value) && /* @__PURE__ */ o(Sm, {}),
        !(h != null && h.value) && /* @__PURE__ */ o(
          s1,
          {
            isCheckedBaggage: m,
            onClickBaggage: Z,
            priceDiff: I,
            fare: n.value,
            isAvailableAddBaggage: O.value,
            isAvailableCancelBaggage: H.value,
            isAvailableChangeFare: W,
            isShowAddBaggageToggle: g.value,
            isLegacyResults: e.value,
            onClickChangeFare: U
          }
        ),
        Object.values(X).some(Boolean) && !(h != null && h.value) && /* @__PURE__ */ o(K_, { alerts: X }),
        /* @__PURE__ */ o("div", { className: ot.flights, children: (Le = t.value) == null ? void 0 : Le.segments.map((q, G) => l != null && l.value ? /* @__PURE__ */ o(
          $o,
          {
            segment: q,
            schedule: G === 0 ? z : de,
            onClickScheduleItem: c,
            isShowTravelTime: !(d != null && d.value),
            isLoading: h,
            isLegacyResults: e,
            proposals: V,
            fare: n
          },
          G
        ) : /* @__PURE__ */ o(
          $o,
          {
            segment: q,
            proposals: V,
            fare: n
          },
          G
        )) })
      ] }),
      /* @__PURE__ */ o("div", { className: ot.side, children: /* @__PURE__ */ o("div", { className: ot.proposals, children: h != null && h.value || p && !((lt = t.value) != null && lt.isLast) ? /* @__PURE__ */ o(Lm, {}) : /* @__PURE__ */ o(
        xm,
        {
          proposals: J.value,
          onBuy: Me,
          onUpdate: r,
          isLegacyResults: e.value,
          isLoadingPrices: u,
          shareUrl: ne
        }
      ) }) })
    ] }) })
  ] }) });
}, Pm = "AirCompany-module__cardAirCompany___SCY8L", Bm = "AirCompany-module__cardAirCompanyWrap___yLvhc", jo = {
  cardAirCompany: Pm,
  cardAirCompanyWrap: Bm
}, Vo = ({ air: t, oneAirline: e }) => {
  var r, n, i;
  return /* @__PURE__ */ o("div", { className: jo.cardAirCompany, children: /* @__PURE__ */ o(
    He,
    {
      text: (r = t == null ? void 0 : t.name[ye()]) != null && r.default ? (n = t.name[ye()]) == null ? void 0 : n.default : "",
      direction: "bottom",
      disabled: e === 1,
      children: /* @__PURE__ */ o("div", { className: jo.cardAirCompanyWrap, "data-role": "flight-card-air-company", children: [
        /* @__PURE__ */ o("picture", { children: [
          /* @__PURE__ */ o("source", { src: `https://img.avs.io/pics/al_square/${t == null ? void 0 : t.iata}@avif?rs=fit:128:128` }),
          /* @__PURE__ */ o(
            "img",
            {
              src: `https://img.avs.io/pics/al_square/${t == null ? void 0 : t.iata}@avif?rs=fit:128:128`,
              alt: ""
            }
          )
        ] }),
        e === 1 ? (i = t.name[ye()]) == null ? void 0 : i.default : null
      ] })
    }
  ) });
}, $m = "FilterTicket-module__cardFilterTicket___ptM2F", jm = {
  cardFilterTicket: $m
}, Vm = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20%3e%3cpath%20d='M13.5318%2011.4008C12.997%2011.5742%2012.4262%2011.668%2011.8336%2011.668C8.79605%2011.668%206.33362%209.20553%206.33362%206.16797C6.33362%204.30919%207.2557%202.66578%208.66739%201.67019C8.61187%201.66871%208.55616%201.66797%208.50029%201.66797C5.09453%201.66797%202.33362%204.42888%202.33362%207.83464C2.33362%2011.2404%205.09453%2014.0013%208.50029%2014.0013C10.5773%2014.0013%2012.4144%2012.9745%2013.5318%2011.4008Z'%20stroke='%23F4764F'%20stroke-width='1.5'%20stroke-linejoin='bevel'%20/%3e%3c/svg%3e", qm = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20%3e%3cpath%20d='M7.83362%2013.334C4.79605%2013.334%202.33362%2010.8716%202.33362%207.83398C2.33362%207.06465%202.49158%206.3322%202.77683%205.66732M7.83362%202.33398C10.8712%202.33398%2013.3336%204.79642%2013.3336%207.83398C13.3336%208.73421%2013.1173%209.58392%2012.7339%2010.334'%20stroke='%23F4764F'%20stroke-width='1.5'%20/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.33393%203.93186V0.734371C8.33393%200.1616%207.65932%20-0.144522%207.22826%200.232652L5.40113%201.8314C5.09757%202.097%205.09757%202.56922%205.40113%202.83483L7.22826%204.43358C7.65932%204.81075%208.33393%204.50463%208.33393%203.93186Z'%20fill='%23F4764F'%20/%3e%3cpath%20d='M7.33393%2011.7344L7.33393%2014.9319C7.33393%2015.5046%208.00854%2015.8108%208.4396%2015.4336L10.2667%2013.8348C10.5703%2013.5692%2010.5703%2013.097%2010.2667%2012.8314L8.4396%2011.2327C8.00855%2010.8555%207.33393%2011.1616%207.33393%2011.7344Z'%20fill='%23F4764F'%20/%3e%3c/svg%3e", Um = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20%3e%3cpath%20d='M3.00073%202.66602H13.0007'%20stroke='%23F4764F'%20stroke-width='1.5'%20/%3e%3cpath%20d='M3.00073%2013.334H13.0007'%20stroke='%23F4764F'%20stroke-width='1.5'%20/%3e%3cpath%20d='M5.00073%202.66602V4.39713C5.00073%204.99221%205.25521%205.55888%205.69997%205.95423L8.00073%207.99935M11.0007%202.66602V4.39713C11.0007%204.99221%2010.7463%205.55888%2010.3015%205.95423L8.00073%207.99935M11.0007%2013.3327V11.6016C11.0007%2011.0065%2010.7463%2010.4398%2010.3015%2010.0445L8.00073%207.99935M5.00073%2013.3327V11.6016C5.00073%2011.0065%205.25521%2010.4398%205.69997%2010.0445L8.00073%207.99935'%20stroke='%23F4764F'%20stroke-width='1.5'%20/%3e%3cpath%20d='M10.833%205.33398H5.16638L7.99972%207.83398L10.833%205.33398Z'%20fill='%23F4764F'%20/%3e%3c/svg%3e", Qm = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20%3e%3cpath%20d='M1.00073%205.66797H14.6674'%20stroke='%23F4764F'%20stroke-width='1.5'%20/%3e%3cpath%20d='M4.85706%2015.3027L11.1511%200.616609'%20stroke='%23F4764F'%20stroke-width='1.5'%20/%3e%3cpath%20d='M1.00073%2010.332H14.6674'%20stroke='%23F4764F'%20stroke-width='1.5'%20/%3e%3c/svg%3e", Wm = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M5.1864%202.86667H11.3333V1H3.86667L5.1864%202.86667ZM5.1108%203.8L3.86667%205.35586H5.52613C5.52613%206.98733%206.6648%208.46666%208.32613%208.46666C9.98746%208.46666%2011.3333%207.1432%2011.3333%205.51173V3.8H5.1108ZM5.05387%2014.5427C5.72472%2014.8453%206.45245%2015.0012%207.1884%2015H8.0116C9.38773%2014.9997%2010.7074%2014.4529%2011.6804%2013.4797C12.6534%2012.5066%2013.2%2011.1868%2013.2%209.81066C13.2%209.70175%2013.1567%209.59729%2013.0797%209.52028C13.0027%209.44326%2012.8982%209.4%2012.7893%209.4H12.4001L5.05387%2014.5427ZM10.4569%209.4H2.4116C2.35759%209.39987%202.30409%209.41041%202.25416%209.43099C2.20423%209.45157%202.15885%209.4818%202.12061%209.51995C2.08238%209.55809%202.05205%209.60341%202.03135%209.65329C2.01066%209.70318%202%209.75665%202%209.81066C1.99925%2010.6026%202.18008%2011.3841%202.5286%2012.0952C2.87711%2012.8064%203.38404%2013.4281%204.0104%2013.9127L10.4569%209.4Z'%20fill='%23F4764F'/%3e%3c/svg%3e", zm = {
  night: Vm,
  change: qm,
  long: Um,
  noLine: Qm,
  visa: Wm
}, pn = ({ name: t }) => {
  const { t: e } = Y(), r = {
    night: e("filterticket.overnight_layover"),
    change: e("filterticket.airport_change"),
    long: e("filterticket.long_layover"),
    noLine: e("filterticket.your_return_flight_wont_land_at_the_same_airport_you_left_from"),
    visa: e("filterticket.visa_required")
  };
  return /* @__PURE__ */ o(He, { text: r[t], direction: "bottom", children: /* @__PURE__ */ o("div", { className: jm.cardFilterTicket, children: /* @__PURE__ */ o("img", { src: zm[t], alt: "" }) }) });
}, Hm = (t, e) => /* @__PURE__ */ w("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", ref: e, ...t }, /* @__PURE__ */ w("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M16.1089 14.0185L13.39 12.7507C12.5949 10.8064 11.2117 8.2314 10.2094 5.76167L9.01659 5.19441C9.07723 6.8679 9.24638 9.09449 9.3116 10.8489L6.59268 9.58102C6.02852 8.52281 5.29696 7.51227 4.84781 6.67404C4.60309 6.21828 4.06296 6.26629 4.08565 6.87196C4.18893 9.73001 4.22539 10.8781 4.22539 10.8781C4.24405 11.3746 4.40754 11.8682 4.87167 12.0886L17.3168 17.8919C18.2516 18.2902 18.7237 17.8487 18.9758 17.3352C19.5228 16.1621 18.4276 15.1213 16.1089 14.0185Z", fill: "#9EA9B7" })), Gm = Ce(Hm), Zm = (t, e) => /* @__PURE__ */ w("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", ref: e, ...t }, /* @__PURE__ */ w("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M16.9542 9.79262L14.2353 11.0605C12.2348 10.4198 9.37319 9.82421 6.837 9.00452L5.63573 9.55363C6.95667 10.5829 8.77106 11.8845 10.1569 12.9623L7.438 14.2301C6.26473 13.9821 5.02038 13.8929 4.08955 13.6982C3.58311 13.5927 3.2727 14.0373 3.75126 14.4093C6.00703 16.1673 6.90994 16.8773 6.90994 16.8773C7.30232 17.1822 7.7855 17.3742 8.2527 17.1603L20.6979 11.3571C21.6038 10.897 21.5691 10.2516 21.3378 9.72841C20.7908 8.5553 19.2894 8.72531 16.9542 9.79262Z", fill: "#9EA9B7" })), Km = Ce(Zm), Ym = (t) => {
  if (t.length === 0)
    return { totalTravelTime: 0, times: [] };
  const e = t[t.length - 1].arrival_unix_timestamp - t[0].departure_unix_timestamp, r = t.map((n, i) => {
    const a = n.arrival_unix_timestamp - n.departure_unix_timestamp;
    let s = 0;
    return i > 0 && (s = t[i].departure_unix_timestamp - t[i - 1].arrival_unix_timestamp), {
      flightTime: a,
      transferTime: s
    };
  });
  return { totalTravelTime: e, times: r };
}, Jm = "Flight-module__cardFlight___SVPPm", Xm = "Flight-module__cardFlightInfo___DSEpA", e0 = "Flight-module__cardFlightTime___e3wta", t0 = "Flight-module__cardFlightCity___ybLJu", r0 = "Flight-module__cardFlightDay___JA3s5", n0 = "Flight-module__cardFlightAirport___VNFZA", i0 = "Flight-module__cardFlightTravel___OSIil", a0 = "Flight-module__cardFlightTravelMobile___jVSlI", o0 = "Flight-module__cardFlightTravelDetailMobile___7DWB1", s0 = "Flight-module__cardFlightTravelTop___XRPrQ", l0 = "Flight-module__cardFlightTravelTime___dANk4", c0 = "Flight-module__cardFlightTravelLineTop___1E8vM", u0 = "Flight-module__cardFlightTravelLineTopFlight___7R-l-", d0 = "Flight-module__cardFlightTravelLineTopTransfer___KPiSN", h0 = "Flight-module__cardFlightTravelLineOrigin___K6YK3", f0 = "Flight-module__cardFlightTravelLineDestination___MIXG8", p0 = "Flight-module__cardFlightTravelLineTransfer___Cd8jK", _0 = "Flight-module__cardFlightTravelLineAirport___L-bJ9", g0 = "Flight-module__airportCode___Zn-3D", m0 = "Flight-module__differentAirportsLine___UgJUU", v0 = "Flight-module__differentAirportsText___fYxUH", ge = {
  cardFlight: Jm,
  cardFlightInfo: Xm,
  cardFlightTime: e0,
  cardFlightCity: t0,
  cardFlightDay: r0,
  cardFlightAirport: n0,
  cardFlightTravel: i0,
  cardFlightTravelMobile: a0,
  cardFlightTravelDetailMobile: o0,
  cardFlightTravelTop: s0,
  cardFlightTravelTime: l0,
  cardFlightTravelLineTop: c0,
  cardFlightTravelLineTopFlight: u0,
  cardFlightTravelLineTopTransfer: d0,
  cardFlightTravelLineOrigin: h0,
  cardFlightTravelLineDestination: f0,
  cardFlightTravelLineTransfer: p0,
  cardFlightTravelLineAirport: _0,
  airportCode: g0,
  differentAirportsLine: m0,
  differentAirportsText: v0
}, y0 = ({ segment: t }) => {
  var I, O, H, W, se;
  const { t: e, i18n: r } = Y(), { timeFormatter: n } = xi(), i = t.flights[0].local_departure_date_time, a = t.flights[t.flights.length - 1].local_arrival_date_time, s = Zr(r.language), { formatShortDateWithWeekDay: l } = Ti(), c = l(
    t.flights[0].local_departure_date_time,
    s
  ), u = l(
    t.flights[t.flights.length - 1].local_arrival_date_time,
    s
  ), d = (L) => {
    const X = Fn(L);
    return `${X.days ? X.days + e("base.d") : ""} ${X.hours ? X.hours + e("base.h") : ""} ${X.minutes ? X.minutes + e("base.m") : ""}`;
  }, { totalTravelTime: h, times: f } = Ym(t.flights), p = h / 100, m = Fn(h), y = t.flights[0].origin, v = t.cities[(I = t.airports[y]) == null ? void 0 : I.city_code], g = (O = v == null ? void 0 : v.name[ye()]) == null ? void 0 : O.default, b = t.flights[t.flights.length - 1].destination, C = t.airports[b], x = (H = C == null ? void 0 : C.name[ye()]) == null ? void 0 : H.default, N = t.cities[(W = t.airports[b]) == null ? void 0 : W.city_code], T = (se = N == null ? void 0 : N.name[ye()]) == null ? void 0 : se.default, M = e("filters.flight_departs", {
    airport: g,
    city: g,
    time: n.format(i),
    interpolation: { escapeValue: !1 }
  }), S = e("filters.flight_arrives", {
    airport: x,
    city: T,
    time: n.format(a),
    interpolation: { escapeValue: !1 }
  }), R = (L) => {
    var U, Z, K, z, de, D, ne;
    const X = t.flights[L], Me = t.flights[L - 1], me = (Z = (U = t.airports[Me.destination]) == null ? void 0 : U.name[r.language]) == null ? void 0 : Z.default, Fe = (z = (K = t.airports[X.origin]) == null ? void 0 : K.name[ye()]) == null ? void 0 : z.default, P = (ne = (D = t.cities[(de = t.airports[Me.destination]) == null ? void 0 : de.city_code]) == null ? void 0 : D.name[ye()]) == null ? void 0 : ne.where, E = d(f[L].transferTime);
    return e("flight.airport_change", {
      previousAirport: me,
      currentAirport: Fe,
      cityWhere: P,
      transferTime: E
    });
  }, $ = () => t.transfers.map((L, X) => {
    var Z, K, z, de, D, ne;
    const Me = t.flights[X + 1], me = t.flights[X], Fe = Me.departure_unix_timestamp - me.arrival_unix_timestamp, P = d(Fe), E = (z = (K = t.cities[(Z = t.airports[me.destination]) == null ? void 0 : Z.city_code]) == null ? void 0 : K.name[ye()]) == null ? void 0 : z.default, U = [];
    return L.recheck_baggage && U.push(e("transfer.repeat_check-in")), L.night_transfer && U.push(e("transfer.overnight")), (de = L.tags) != null && de.includes("airport_change") && U.push(e("transfer.airport_change")), (D = L.tags) != null && D.includes("short_layover") && U.push(e("transfer.short_layover")), (ne = L.visa_rules) != null && ne.required && U.push(e("transfer.visa_required")), {
      transferTime: P,
      transferCity: E,
      transferConditions: U
    };
  }), V = t.transfers.length, J = new Intl.PluralRules(Za()), F = V ? e(`search_results.layovers_plural.${J.select(V)}`, {
    count: V
  }) : e("search_results.layovers_direct");
  return /* @__PURE__ */ o("div", { className: ge.cardFlight, children: [
    /* @__PURE__ */ o("div", { className: ge.cardFlightInfo, children: [
      /* @__PURE__ */ o("div", { className: ge.cardFlightTime, "data-role": "flight-departure-time", children: n.format(i) }),
      /* @__PURE__ */ o("div", { className: ge.cardFlightCity, children: g }),
      /* @__PURE__ */ o("div", { className: ge.cardFlightDay, children: c }),
      /* @__PURE__ */ o("div", { className: ge.cardFlightAirport, children: y })
    ] }),
    /* @__PURE__ */ o("div", { className: ge.cardFlightTravel, children: [
      /* @__PURE__ */ o("div", { className: ge.cardFlightTravelTop, children: [
        /* @__PURE__ */ o(
          He,
          {
            text: M,
            direction: "bottom",
            maxWidth: "12rem",
            textAlign: "center",
            children: /* @__PURE__ */ o(Km, {})
          }
        ),
        /* @__PURE__ */ o("div", { className: ge.cardFlightTravelTime, children: [
          /* @__PURE__ */ o("div", { className: ge.cardFlightTravelMobile, children: F }),
          /* @__PURE__ */ o("span", { children: [
            e("filters.duration_of_flight"),
            ": "
          ] }),
          m.days ? /* @__PURE__ */ o(Ie, { children: [
            m.days,
            e("base.d"),
            " ",
            m.hours ? m.hours + e("base.h") : null
          ] }) : /* @__PURE__ */ o(Ie, { children: [
            m.hours,
            e("base.h"),
            " ",
            m.minutes ? m.minutes + e("base.min") : null
          ] })
        ] }),
        /* @__PURE__ */ o(
          He,
          {
            text: S,
            direction: "bottom",
            maxWidth: "12rem",
            textAlign: "center",
            children: /* @__PURE__ */ o(Gm, {})
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: ge.cardFlightTravelLine, children: [
        /* @__PURE__ */ o("div", { className: ge.cardFlightTravelLineTop, children: f.map((L, X) => /* @__PURE__ */ o(Ie, { children: [
          L.transferTime !== 0 ? /* @__PURE__ */ o(
            He,
            {
              text: t.flights[X].origin === t.flights[X - 1].destination ? e("flight.transfer_time", {
                time: d(L.transferTime)
              }) : R(X),
              direction: "bottom",
              style: `width: ${L.transferTime / p}%;`,
              textAlign: "center",
              children: /* @__PURE__ */ o(
                "div",
                {
                  className: B(ge.cardFlightTravelLineTopTransfer, {
                    [ge.differentAirportsLine]: t.flights[X].origin !== t.flights[X - 1].destination
                  }),
                  "data-role": "flight-card-transfer-line"
                }
              )
            }
          ) : null,
          /* @__PURE__ */ o(
            He,
            {
              text: e("flight.travel_time", {
                time: d(L.flightTime)
              }),
              direction: "bottom",
              style: `width: ${L.flightTime / p}%;`,
              textAlign: "center",
              children: /* @__PURE__ */ o("div", { className: ge.cardFlightTravelLineTopFlight })
            }
          )
        ] }, X)) }),
        /* @__PURE__ */ o("div", { className: ge.cardFlightTravelLineAirport, children: f.map((L, X) => /* @__PURE__ */ o(Ie, { children: [
          !!(L != null && L.transferTime) && /* @__PURE__ */ o(
            "div",
            {
              className: ge.cardFlightTravelLineTransfer,
              style: {
                width: `${(L == null ? void 0 : L.transferTime) / p}%`
              },
              children: t.flights[X].origin === t.flights[X - 1].destination ? /* @__PURE__ */ o(
                He,
                {
                  text: t.flights[X].origin === t.flights[X - 1].destination ? e("flight.transfer_time", {
                    time: d(L.transferTime)
                  }) : R(X),
                  direction: "bottom",
                  textAlign: "center",
                  children: /* @__PURE__ */ o(
                    "span",
                    {
                      className: B([ge.airportCode]),
                      "data-role": "flight-airport-code",
                      children: [
                        " ",
                        t.flights[X].origin,
                        " "
                      ]
                    }
                  )
                }
              ) : /* @__PURE__ */ o(
                He,
                {
                  text: R(X),
                  direction: "bottom",
                  textAlign: "center",
                  children: /* @__PURE__ */ o("span", { className: ge.differentAirportsText, children: [
                    t.flights[X - 1].destination,
                    (L == null ? void 0 : L.transferTime) / p < 25 ? /* @__PURE__ */ o("br", {}) : " - ",
                    t.flights[X].origin
                  ] })
                }
              )
            }
          ),
          X === 0 && /* @__PURE__ */ o(
            "div",
            {
              className: B([
                ge.cardFlightTravelLineFlight,
                ge.cardFlightTravelLineOrigin
              ]),
              style: { width: `${L.flightTime / p}%` },
              children: /* @__PURE__ */ o(
                He,
                {
                  text: M,
                  direction: "bottom",
                  maxWidth: "12rem",
                  textAlign: "center",
                  children: /* @__PURE__ */ o("span", { className: B([ge.airportCode]), "data-role": "flight-airport-code", children: t.flights[X].origin })
                }
              )
            }
          ),
          X === f.length - 1 && /* @__PURE__ */ o(
            "div",
            {
              className: B([
                ge.cardFlightTravelLineFlight,
                ge.cardFlightTravelLineDestination
              ]),
              style: { width: `${L.flightTime / p}%` },
              children: /* @__PURE__ */ o(
                He,
                {
                  text: S,
                  direction: "bottom",
                  maxWidth: "12rem",
                  textAlign: "center",
                  children: /* @__PURE__ */ o("span", { className: B([ge.airportCode]), "data-role": "flight-airport-code", children: t.flights[X].destination })
                }
              )
            }
          ),
          X !== 0 && X !== f.length - 1 && /* @__PURE__ */ o(
            "div",
            {
              className: ge.cardFlightTravelLineFlight,
              style: { width: `${L.flightTime / p}%` }
            }
          )
        ] }, X)) })
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: ge.cardFlightInfo, children: [
      /* @__PURE__ */ o("div", { className: ge.cardFlightTime, children: n.format(a) }),
      /* @__PURE__ */ o("div", { className: ge.cardFlightCity, children: T }),
      /* @__PURE__ */ o("div", { className: ge.cardFlightDay, children: u }),
      /* @__PURE__ */ o("div", { className: ge.cardFlightAirport, children: b })
    ] }),
    !!$().length && /* @__PURE__ */ o("div", { className: ge.cardFlightTravelDetailMobile, children: $().map((L, X) => /* @__PURE__ */ o("div", { children: [
      L.transferTime,
      " ",
      L.transferCity,
      L.transferConditions.length > 0 && /* @__PURE__ */ o("span", { children: L.transferConditions.join(", ") })
    ] }, X)) })
  ] });
}, b0 = "FlightCard-module__card___udWY6", C0 = "FlightCard-module__cardBadges___vNRBb", w0 = "FlightCard-module__cardTooltipBaggage___kJy1u", T0 = "FlightCard-module__cardTooltipBaggageItem___SDJ2Z", k0 = "FlightCard-module__cardTooltipBaggageItemInactive___9tsyt", N0 = "FlightCard-module__cardLeft___wpAwV", x0 = "FlightCard-module__cardLeftPrice___gUaJq", F0 = "FlightCard-module__cardLeftBaggage___RcnKS", E0 = "FlightCard-module__cardLeftBaggageLeft___ZSIzQ", M0 = "FlightCard-module__cardLeftBaggageLeftPc___ZC8h8", S0 = "FlightCard-module__cardLeftBaggageLeftMobile___EQFoy", A0 = "FlightCard-module__cardLeftBaggageRight___3iKAx", I0 = "FlightCard-module__cardLeftButton___hKpVE", D0 = "FlightCard-module__cardLeftLast___9gDNZ", O0 = "FlightCard-module__cardRight___JquTn", L0 = "FlightCard-module__cardTop___5lNmF", R0 = "FlightCard-module__cardTopLeft___gVwY7", P0 = "FlightCard-module__cardTopRight___AohPn", B0 = "FlightCard-module__cardTopRightWrap___dDkK7", $0 = "FlightCard-module__cardBlockFlight___ywkSv", j0 = "FlightCard-module__cardBlockFlightAirCompany___4ZWcF", V0 = "FlightCard-module__cardTicketText___vXd6s", q0 = "FlightCard-module__priceDiff___PXf-Z", U0 = "FlightCard-module__share___wdU3R", Q0 = "FlightCard-module__airCompany___MUKFY", W0 = "FlightCard-module__cardTooltipBaggageLabel___gSFEH", z0 = "FlightCard-module__handbagsSize___7ifVw", H0 = "FlightCard-module__cardChips___XmSIy", G0 = "FlightCard-module__cardChipsDesktop___hJR7G", Z0 = "FlightCard-module__cardChipsMobile___-qiFM", pe = {
  card: b0,
  cardBadges: C0,
  cardTooltipBaggage: w0,
  cardTooltipBaggageItem: T0,
  cardTooltipBaggageItemInactive: k0,
  cardLeft: N0,
  cardLeftPrice: x0,
  cardLeftBaggage: F0,
  cardLeftBaggageLeft: E0,
  cardLeftBaggageLeftPc: M0,
  cardLeftBaggageLeftMobile: S0,
  cardLeftBaggageRight: A0,
  cardLeftButton: I0,
  cardLeftLast: D0,
  cardRight: O0,
  cardTop: L0,
  cardTopLeft: R0,
  cardTopRight: P0,
  cardTopRightWrap: B0,
  cardBlockFlight: $0,
  cardBlockFlightAirCompany: j0,
  cardTicketText: V0,
  priceDiff: q0,
  share: U0,
  airCompany: Q0,
  cardTooltipBaggageLabel: W0,
  handbagsSize: z0,
  cardChips: H0,
  cardChipsDesktop: G0,
  cardChipsMobile: Z0
}, K0 = ({
  isChecked: t,
  currentFare: e
}) => {
  var i, a, s, l, c, u, d, h, f, p, m, y, v, g, b, C, x, N, T, M, S, R, $;
  const { t: r } = Y(), n = (a = (i = e.value) == null ? void 0 : i.options.handbags) != null && a.height && ((l = (s = e.value) == null ? void 0 : s.options.handbags) != null && l.width) && ((u = (c = e.value) == null ? void 0 : c.options.handbags) != null && u.length) ? {
    height: (d = e.value) == null ? void 0 : d.options.handbags.height,
    width: (h = e.value) == null ? void 0 : h.options.handbags.width,
    length: (f = e.value) == null ? void 0 : f.options.handbags.length
  } : null;
  return /* @__PURE__ */ o("div", { className: pe.cardTooltipBaggage, children: [
    ((p = e.value.labels) == null ? void 0 : p.length) && /* @__PURE__ */ o("p", { className: pe.cardTooltipBaggageLabel, children: e.value.labels.join(", ") }),
    (y = (m = e.value.options) == null ? void 0 : m.handbags) != null && y.count ? /* @__PURE__ */ o("div", { className: pe.cardTooltipBaggageItem, children: [
      /* @__PURE__ */ o(er, {}),
      (g = (v = e.value.options) == null ? void 0 : v.handbags) != null && g.weight ? r("flightmatrix.carry_on", {
        count: e.value.options.handbags.count,
        weight: e.value.options.handbags.weight
      }) : r("flightmatrix.personal_item"),
      n && /* @__PURE__ */ o("span", { className: pe.handbagsSize, children: r("ticket.baggage.handbags_size", {
        height: n.height,
        width: n.width,
        length: n.length
      }) })
    ] }) : /* @__PURE__ */ o("div", { className: B([pe.cardTooltipBaggageItem]), children: [
      /* @__PURE__ */ o(er, {}),
      " ",
      r("flightmatrix.personal_item")
    ] }),
    (C = (b = e.value.options) == null ? void 0 : b.baggage) != null && C.count && t ? /* @__PURE__ */ o("div", { className: pe.cardTooltipBaggageItem, children: [
      /* @__PURE__ */ o(er, {}),
      (T = (N = (x = e.value) == null ? void 0 : x.options) == null ? void 0 : N.baggage) != null && T.weight ? /* @__PURE__ */ o("span", { children: [
        " ",
        r("flightmatrix.baggage_kg", {
          count: (S = (M = e.value.options) == null ? void 0 : M.baggage) == null ? void 0 : S.count,
          weight: ($ = (R = e.value.options) == null ? void 0 : R.baggage) == null ? void 0 : $.weight
        }),
        " "
      ] }) : r("flightmatrix.baggage_included")
    ] }) : /* @__PURE__ */ o(
      "div",
      {
        className: B([pe.cardTooltipBaggageItem, pe.cardTooltipBaggageItemInactive]),
        children: [
          /* @__PURE__ */ o(kn, {}),
          " ",
          r("flightmatrix.baggage_not_included")
        ]
      }
    )
  ] });
}, qo = ({
  item: t,
  isStale: e,
  tabIndex: r,
  updateTickets: n,
  ticketForDetail: i,
  searchId: a,
  resultUrl: s,
  isFromUrl: l,
  openUpdateModal: c
}) => {
  var me, Fe, P, E, U, Z, K, z, de;
  const { t: u, i18n: d } = Y(), { priceFormatter: h } = Ze(), f = Q(u("inputs.share")), p = d.dir(d.language) === "rtl", m = () => t == null ? void 0 : t.proposals.find((D) => {
    var ne, le;
    return !((le = (ne = D.minimum_fare) == null ? void 0 : ne.baggage) != null && le.count);
  }), y = () => t == null ? void 0 : t.proposals.find((D) => {
    var ne, le;
    return (le = (ne = D.minimum_fare) == null ? void 0 : ne.baggage) == null ? void 0 : le.count;
  }), v = Q(m()), g = Q(y()), b = Q([]), C = () => {
    var ne, le, ve, j, he;
    const D = (le = (ne = _.search) == null ? void 0 : ne.params) == null ? void 0 : le.ticketId;
    D && l && D === ((ve = i == null ? void 0 : i.value) == null ? void 0 : ve.id) && (j = i == null ? void 0 : i.value) != null && j.isLast && _.modal.updateModalContent({
      name: (he = i == null ? void 0 : i.value) == null ? void 0 : he.id,
      content: /* @__PURE__ */ o(
        ya,
        {
          ticket: i,
          isLegacyResults: W,
          onUpdateTickets: n,
          resultUrl: s,
          searchId: a,
          currentFare: T,
          onChangeFare: H,
          fareOptions: b,
          onToggleBaggage: L,
          isFromUrl: l
        }
      )
    });
  };
  re(() => {
    var D;
    (D = i.value) != null && D.proposals && (b.value = va(u, i.value.proposals)), C();
  }, [i.value]);
  const x = () => {
    var D, ne, le;
    return {
      ...xn(
        u,
        t.proposals[0],
        0,
        (le = (ne = (D = t.proposals[0]) == null ? void 0 : D.minimum_fare) == null ? void 0 : ne.baggage) != null && le.count ? u("ticket.baggage.cheap_fare_included") : u("ticket.baggage.cheap_fare")
      )
    };
  }, N = () => {
    var D, ne;
    return !!((ne = (D = T.value.options) == null ? void 0 : D.baggage) != null && ne.count);
  }, T = Q(x()), M = Q(N());
  re(() => {
    T.value = x(), v.value = m(), g.value = y(), M.value = N();
  }, [JSON.stringify(t)]);
  const S = (me = g.value) == null ? void 0 : me.price, R = st(() => {
    var D;
    return S != null && S.value ? (S == null ? void 0 : S.value) - (((D = T.value.price) == null ? void 0 : D.value) || 0) : 0;
  }), $ = (D, ne) => {
    D.stopPropagation();
    const le = ne.id, ve = _.search.getTicketLinkFromParams({ ticketId: le });
    navigator.clipboard && navigator.clipboard.writeText(ve).then(() => {
      f.value = u("inputs.link_copied"), setTimeout(() => {
        f.value = u("inputs.share");
      }, 2e3);
    }).catch((j) => {
      console.error(j);
    });
  }, V = (D, ne, le, ve) => {
    D.forEach((j) => {
      const he = j.marketing_carrier_designator.carrier;
      if (ne[he]) {
        const Je = ne[he];
        le.has(he) || (le.add(he), ve.push(Je));
      }
    });
  }, J = (D) => {
    const ne = [], le = /* @__PURE__ */ new Set();
    return V(D.flights, D.airlines, le, ne), ne;
  }, I = ((D) => {
    const ne = [], le = /* @__PURE__ */ new Set();
    return D.segments.forEach((ve) => {
      V(ve.flights, ve.airlines, le, ne);
    }), ne;
  })(t);
  re(() => {
    if (M.value) {
      if (!g.value) return;
      T.value = xn(
        u,
        g.value,
        0,
        u("ticket.baggage.cheap_fare_included")
      );
    } else {
      if (!v.value) return;
      T.value = xn(
        u,
        v.value,
        void 0,
        u("ticket.baggage.cheap_fare")
      );
    }
  }, [M.value]);
  const O = ({ baggage: D }) => R.value && !M.value ? /* @__PURE__ */ o(Ie, { children: [
    /* @__PURE__ */ o("div", { className: pe.cardLeftBaggageLeftPc, children: [
      u("filters.baggage"),
      /* @__PURE__ */ o("span", { className: pe.priceDiff, children: R.value <= 0 ? null : "+" + h.format(R.value) })
    ] }),
    /* @__PURE__ */ o("div", { className: pe.cardLeftBaggageLeftMobile, children: [
      h.format(R.value),
      D && D.count && /* @__PURE__ */ o("span", { className: pe.cardTooltipBaggageItem, children: [
        u("flightmatrix.baggage_included"),
        " ",
        D.count,
        "x",
        D.weight,
        " ",
        u("ticket.baggage.units")
      ] })
    ] })
  ] }) : /* @__PURE__ */ o(Ie, { children: [
    /* @__PURE__ */ o("div", { className: pe.cardLeftBaggageLeftPc, children: u("flightcard.baggage_included") }),
    /* @__PURE__ */ o("div", { className: pe.cardLeftBaggageLeftMobile, children: D && D.count && /* @__PURE__ */ o("div", { className: pe.cardTooltipBaggageItem, children: [
      u("flightmatrix.baggage_included"),
      " ",
      D.count,
      "x",
      D.weight,
      " ",
      u("ticket.baggage.units")
    ] }) })
  ] }), H = (D) => {
    T.value = D;
  }, W = Q(!1);
  re(() => {
    W.value = !!e;
  }, [e]), re(() => {
    var D, ne, le;
    ((ne = (D = _.search) == null ? void 0 : D.params) == null ? void 0 : ne.ticketId) === ((le = i == null ? void 0 : i.value) == null ? void 0 : le.id) && l && (se(), _.search.setIsParamsFromUrl(!1));
  }, [(P = (Fe = _.search) == null ? void 0 : Fe.params) == null ? void 0 : P.ticketId]);
  const se = () => {
    var D;
    _.modal.openModal({
      content: /* @__PURE__ */ o(
        ya,
        {
          ticket: i,
          isLegacyResults: W,
          onUpdateTickets: n,
          resultUrl: s,
          searchId: a,
          currentFare: T,
          onChangeFare: H,
          fareOptions: b,
          onToggleBaggage: L,
          isFromUrl: l,
          seatsAvailable: t.seats_available
        }
      ),
      variant: "fullHeight",
      name: (D = i.value) == null ? void 0 : D.id
    });
  }, L = (D) => {
    M.value = D;
  }, X = (D) => {
    D.stopPropagation(), e ? n() : se();
  }, Me = () => {
    e ? c == null || c() : se();
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: pe.card,
      onClick: Me,
      "data-testid": `flight-card-${(E = i.value) == null ? void 0 : E.id}`,
      "data-role": "flight-card",
      children: [
        t.badges && /* @__PURE__ */ o(
          "div",
          {
            className: pe.cardBadges,
            style: `background-color: ${t.badges.meta.colors.light}`,
            "data-role": "flight-card-badge",
            children: t.badges.meta.name[d.language]
          }
        ),
        /* @__PURE__ */ o("div", { className: pe.cardLeft, children: [
          /* @__PURE__ */ o(
            "div",
            {
              className: pe.cardLeftPrice,
              "data-testid": `flight-card-price-${(U = i.value) == null ? void 0 : U.id}`,
              children: h.format(((K = (Z = T.value) == null ? void 0 : Z.price) == null ? void 0 : K.value) ?? 0)
            }
          ),
          /* @__PURE__ */ o("div", { className: pe.cardLeftBaggage, onClick: (D) => D.stopPropagation(), children: [
            /* @__PURE__ */ o("div", { className: pe.cardLeftBaggageLeft, children: g.value ? O(g.value.minimum_fare) : u("flightmatrix.baggage_not_included") }),
            g.value ? /* @__PURE__ */ o(
              He,
              {
                text: /* @__PURE__ */ o(
                  K0,
                  {
                    currentFare: T,
                    isChecked: !(g.value && R.value) || M.value
                  }
                ),
                direction: p ? "right" : "left",
                children: /* @__PURE__ */ o(
                  gt,
                  {
                    value: M,
                    tabIndex: parseInt(`${r}1`),
                    disabled: M.value && !v.value,
                    "data-role": "flight-card-toggle-baggage"
                  }
                )
              }
            ) : /* @__PURE__ */ o("div", { className: pe.cardLeftBaggageRight, children: /* @__PURE__ */ o(
              He,
              {
                text: /* @__PURE__ */ o("span", { children: u("flightmatrix.checked_baggage_can_be_added") }),
                direction: p ? "right" : "left",
                children: /* @__PURE__ */ o(St, {})
              }
            ) })
          ] }),
          Object.values(((z = T.value) == null ? void 0 : z.flight_terms) || {}).some((D) => D.is_charter) && /* @__PURE__ */ o("div", { className: B(pe.cardChips, pe.cardChipsMobile), children: u("ticket.charter_ticket") }),
          /* @__PURE__ */ o(
            Ge,
            {
              className: pe.cardLeftButton,
              tabIndex: parseInt(`${r}2`),
              onClick: X,
              children: /* @__PURE__ */ o("span", { children: e ? u("ticket.update") : /* @__PURE__ */ o(Ie, { children: [
                u("inputs.select"),
                " ",
                /* @__PURE__ */ o("span", { className: pe.cardTicketText, children: u("flightcard.ticket") })
              ] }) })
            }
          ),
          t.seats_available && /* @__PURE__ */ o("div", { className: pe.cardLeftLast, children: [
            /* @__PURE__ */ o(ap, {}),
            /* @__PURE__ */ o(al, { i18nKey: "flightcard.only_seats_remaining_for", count: t.seats_available })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: pe.cardRight, children: [
          /* @__PURE__ */ o("div", { className: pe.cardTop, children: [
            /* @__PURE__ */ o("div", { className: pe.cardTopLeft, children: I.map((D) => /* @__PURE__ */ o(Vo, { air: D, oneAirline: I.length }, D.iata)) }),
            /* @__PURE__ */ o("div", { className: pe.cardTopRight, children: [
              Object.values(((de = T.value) == null ? void 0 : de.flight_terms) || {}).some((D) => D.is_charter) && /* @__PURE__ */ o("div", { className: B([pe.cardChips, pe.cardChipsDesktop]), children: u("ticket.charter_ticket") }),
              (t.tags.airport_change || t.tags.night_transfer || t.tags.long_layover || t.tags.airport_different || t.tags.need_visa) && /* @__PURE__ */ o("div", { className: pe.cardTopRightWrap, children: [
                t.tags.airport_change && /* @__PURE__ */ o(pn, { name: "change" }),
                t.tags.night_transfer && /* @__PURE__ */ o(pn, { name: "night" }),
                t.tags.long_layover && /* @__PURE__ */ o(pn, { name: "long" }),
                t.tags.airport_different && /* @__PURE__ */ o(pn, { name: "noLine" }),
                t.tags.need_visa && /* @__PURE__ */ o(pn, { name: "visa" })
              ] }),
              /* @__PURE__ */ o(He, { text: f.value, direction: "bottom", children: /* @__PURE__ */ o(
                "button",
                {
                  className: pe.share,
                  onClick: (D) => $(D, t),
                  tabIndex: parseInt(`${r}3`),
                  children: /* @__PURE__ */ o(ma, {})
                }
              ) })
            ] })
          ] }),
          t.segments.map((D, ne) => /* @__PURE__ */ o("div", { className: pe.cardBlockFlight, children: [
            /* @__PURE__ */ o("div", { className: pe.cardBlockFlightAirCompany, children: J(D).map((le, ve) => /* @__PURE__ */ o("div", { className: pe.airCompany, children: /* @__PURE__ */ o(Vo, { air: le, oneAirline: 2 }, le.iata) }, `${ve}${le}`)) }),
            /* @__PURE__ */ o(y0, { segment: D }, t.id)
          ] }, ne))
        ] })
      ]
    }
  );
}, Y0 = (t, e) => /* @__PURE__ */ w("svg", { width: 48, height: 49, viewBox: "0 0 48 49", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M23.8546 45.4026C35.4225 45.4026 44.8001 36.025 44.8001 24.4572C44.8001 12.8893 35.4225 3.51172 23.8546 3.51172C12.2868 3.51172 2.90918 12.8893 2.90918 24.4572C2.90918 36.025 12.2868 45.4026 23.8546 45.4026Z", fill: "url(#paint0_radial_441_61996)" }), /* @__PURE__ */ w("path", { opacity: 0.5, d: "M23.8546 45.4026C35.4225 45.4026 44.8001 36.025 44.8001 24.4572C44.8001 12.8893 35.4225 3.51172 23.8546 3.51172C12.2868 3.51172 2.90918 12.8893 2.90918 24.4572C2.90918 36.025 12.2868 45.4026 23.8546 45.4026Z", fill: "url(#paint1_radial_441_61996)" }), /* @__PURE__ */ w("path", { d: "M19.3244 14.4969C19.272 13.4889 18.3295 12.9129 16.7717 12.9915C15.4495 13.07 12.5826 14.1042 10.7498 17.2984C10.4095 17.8875 10.9986 18.1755 11.3389 17.7828C12.504 16.4606 15.7113 14.6671 18.3033 14.8635C19.3506 14.942 19.3244 14.4969 19.3244 14.4969Z", fill: "url(#paint2_linear_441_61996)" }), /* @__PURE__ */ w("path", { d: "M17.0219 25.3621C18.1353 25.3621 19.0379 23.9965 19.0379 22.3119C19.0379 20.6273 18.1353 19.2617 17.0219 19.2617C15.9084 19.2617 15.0059 20.6273 15.0059 22.3119C15.0059 23.9965 15.9084 25.3621 17.0219 25.3621Z", fill: "url(#paint3_radial_441_61996)" }), /* @__PURE__ */ w("path", { d: "M17.0219 20.295C17.8859 20.295 18.6451 21.0542 19.0379 22.167C19.0117 20.5175 18.1215 19.1953 17.0219 19.1953C15.9222 19.1953 15.032 20.5175 15.0059 22.167C15.3986 21.0411 16.1448 20.295 17.0219 20.295Z", fill: "url(#paint4_linear_441_61996)" }), /* @__PURE__ */ w("path", { d: "M30.6879 25.3621C31.8013 25.3621 32.7039 23.9965 32.7039 22.3119C32.7039 20.6273 31.8013 19.2617 30.6879 19.2617C29.5745 19.2617 28.6719 20.6273 28.6719 22.3119C28.6719 23.9965 29.5745 25.3621 30.6879 25.3621Z", fill: "url(#paint5_radial_441_61996)" }), /* @__PURE__ */ w("path", { d: "M28.3838 14.5594C28.4362 13.5514 29.3788 12.9754 30.9366 13.054C32.2588 13.1325 35.1257 14.1667 36.9584 17.3609C37.2987 17.95 36.7097 18.238 36.3693 17.8453C35.2042 16.5231 31.9969 14.7296 29.4049 14.926C28.3577 15.0176 28.3838 14.5594 28.3838 14.5594Z", fill: "url(#paint6_linear_441_61996)" }), /* @__PURE__ */ w("path", { d: "M30.6879 20.3614C29.8239 20.3614 29.0646 21.1206 28.6719 22.2334C28.6981 20.5839 29.5882 19.2617 30.6879 19.2617C31.7875 19.2617 32.6777 20.5839 32.7039 22.2334C32.3111 21.1206 31.565 20.3614 30.6879 20.3614Z", fill: "url(#paint7_linear_441_61996)" }), /* @__PURE__ */ w("path", { d: "M33.0965 36.5C33.5023 36.1727 33.5809 35.5705 33.2667 35.1516C31.4209 32.6643 28.4754 30.4258 23.8543 30.4258C19.2332 30.4258 16.2878 32.6643 14.4419 35.1516C14.1278 35.5705 14.2063 36.1727 14.6121 36.5C15.0441 36.8534 15.6987 36.7749 16.0259 36.3167C17.6099 34.2221 20.0318 32.468 23.8412 32.468C27.6507 32.468 30.0856 34.2221 31.6565 36.3167C32.0099 36.7749 32.6514 36.8534 33.0965 36.5Z", fill: "url(#paint8_radial_441_61996)" }), /* @__PURE__ */ w("path", { d: "M33.4506 35.8454C33.4768 35.6098 33.4245 35.3611 33.2674 35.1516C31.4215 32.6643 28.4761 30.4258 23.855 30.4258C19.2339 30.4258 16.2884 32.6643 14.4426 35.1516C14.2855 35.3611 14.2332 35.6098 14.2594 35.8454C16.2623 33.4105 19.2994 31.3552 23.855 31.3552C28.4106 31.3552 31.4608 33.4105 33.4506 35.8454Z", fill: "url(#paint9_linear_441_61996)" }), /* @__PURE__ */ w("defs", null, /* @__PURE__ */ w("radialGradient", { id: "paint0_radial_441_61996", cx: 0, cy: 0, r: 1, gradientUnits: "userSpaceOnUse", gradientTransform: "translate(19.7336 15.973) scale(25.268)" }, /* @__PURE__ */ w("stop", { stopColor: "#FFE030" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#FFB92E" })), /* @__PURE__ */ w("radialGradient", { id: "paint1_radial_441_61996", cx: 0, cy: 0, r: 1, gradientUnits: "userSpaceOnUse", gradientTransform: "translate(19.7336 15.973) scale(19.8794)" }, /* @__PURE__ */ w("stop", { stopColor: "#FFEA5F" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#FFBC47", stopOpacity: 0 })), /* @__PURE__ */ w("linearGradient", { id: "paint2_linear_441_61996", x1: 15.0087, y1: 16.4109, x2: 14.8631, y2: 13.7671, gradientUnits: "userSpaceOnUse" }, /* @__PURE__ */ w("stop", { offset: 132565e-8, stopColor: "#3C2200" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#7A4400" })), /* @__PURE__ */ w("radialGradient", { id: "paint3_radial_441_61996", cx: 0, cy: 0, r: 1, gradientUnits: "userSpaceOnUse", gradientTransform: "translate(16.407 22.3879) rotate(73.8539) scale(2.95944 1.91471)" }, /* @__PURE__ */ w("stop", { offset: 132565e-8, stopColor: "#7A4400" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#643800" })), /* @__PURE__ */ w("linearGradient", { id: "paint4_linear_441_61996", x1: 17.0169, y1: 19.2402, x2: 17.0169, y2: 22.0828, gradientUnits: "userSpaceOnUse" }, /* @__PURE__ */ w("stop", { offset: 132565e-8, stopColor: "#3C2200" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#512D00" })), /* @__PURE__ */ w("radialGradient", { id: "paint5_radial_441_61996", cx: 0, cy: 0, r: 1, gradientUnits: "userSpaceOnUse", gradientTransform: "translate(30.0835 22.3884) rotate(73.854) scale(2.95944 1.9147)" }, /* @__PURE__ */ w("stop", { offset: 132565e-8, stopColor: "#7A4400" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#643800" })), /* @__PURE__ */ w("linearGradient", { id: "paint6_linear_441_61996", x1: 32.712, y1: 16.4834, x2: 32.8576, y2: 13.8396, gradientUnits: "userSpaceOnUse" }, /* @__PURE__ */ w("stop", { offset: 132565e-8, stopColor: "#3C2200" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#7A4400" })), /* @__PURE__ */ w("linearGradient", { id: "paint7_linear_441_61996", x1: 30.6929, y1: 19.3159, x2: 30.6929, y2: 22.1585, gradientUnits: "userSpaceOnUse" }, /* @__PURE__ */ w("stop", { offset: 132565e-8, stopColor: "#3C2200" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#512D00" })), /* @__PURE__ */ w("radialGradient", { id: "paint8_radial_441_61996", cx: 0, cy: 0, r: 1, gradientUnits: "userSpaceOnUse", gradientTransform: "translate(28.0496 30.8424) scale(8.13807 9.17896)" }, /* @__PURE__ */ w("stop", { offset: 132565e-8, stopColor: "#7A4400" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#643800" })), /* @__PURE__ */ w("linearGradient", { id: "paint9_linear_441_61996", x1: 14.2469, y1: 33.1353, x2: 33.4631, y2: 33.1353, gradientUnits: "userSpaceOnUse" }, /* @__PURE__ */ w("stop", { offset: 132565e-8, stopColor: "#3C2200" }), /* @__PURE__ */ w("stop", { offset: 1, stopColor: "#512D00" })))), Fi = Ce(Y0), J0 = "NoFlightsModal-module__root___-ijMo", X0 = "NoFlightsModal-module__icon___BPlu1", ev = "NoFlightsModal-module__title___CSI3d", tv = "NoFlightsModal-module__content___MrLoE", rv = "NoFlightsModal-module__description___8f5N0", nv = "NoFlightsModal-module__list___w9UQA", Mr = {
  root: J0,
  icon: X0,
  title: ev,
  content: tv,
  description: rv,
  list: nv
}, iv = () => {
  const { t } = Y();
  return /* @__PURE__ */ o("div", { className: Mr.root, children: [
    /* @__PURE__ */ o("div", { className: Mr.icon, children: /* @__PURE__ */ o(Fi, {}) }),
    /* @__PURE__ */ o("h1", { className: Mr.title, children: t("noflightsmodal.no_flights_found") }),
    /* @__PURE__ */ o("div", { className: Mr.content, children: [
      /* @__PURE__ */ o("p", { className: Mr.description, children: t("noflightsmodal.the_reasons_could_be") }),
      /* @__PURE__ */ o("ul", { className: Mr.list, children: [
        /* @__PURE__ */ o("li", { children: t("noflightsmodal.there_are_no_flights_this_airport") }),
        /* @__PURE__ */ o("li", { children: t("noflightsmodal.your_dates_are_too_distant_check_the_year") })
      ] })
    ] })
  ] });
}, av = "NoTicketModal-module__root___fBpte", ov = "NoTicketModal-module__close___4F5ZV", sv = "NoTicketModal-module__icon___DDSzJ", lv = "NoTicketModal-module__title___b6yDj", cv = "NoTicketModal-module__text___OXWcM", uv = "NoTicketModal-module__button___rnRu-", Sr = {
  root: av,
  close: ov,
  icon: sv,
  title: lv,
  text: cv,
  button: uv
}, Xa = () => {
  const t = () => {
    _.modal.closeLastModal();
  }, { t: e } = Y();
  return /* @__PURE__ */ o("div", { className: Sr.root, children: [
    /* @__PURE__ */ o("button", { className: Sr.close, type: "button", onClick: t, children: /* @__PURE__ */ o(Tt, {}) }),
    /* @__PURE__ */ o("div", { className: Sr.icon, children: /* @__PURE__ */ o(ol, {}) }),
    /* @__PURE__ */ o("h3", { className: Sr.title, children: e("no_ticket_modal.ticket_was_sold_out") }),
    /* @__PURE__ */ o("p", { className: Sr.text, children: e("no_ticket_modal.look_for_another_ticket") }),
    /* @__PURE__ */ o(Ge, { className: Sr.button, onClick: t, children: e("no_ticket_modal.find_another_ticket") })
  ] });
}, dv = "SoftTicketsNotice-module__root___SmepW", hv = "SoftTicketsNotice-module__text___Xfgqo", Uo = {
  root: dv,
  text: hv
}, fv = () => {
  const { t } = Y();
  return /* @__PURE__ */ o("div", { className: Uo.root, "data-testid": "soft-tickets-notice", children: /* @__PURE__ */ o("p", { className: Uo.text, children: t("ticketswidget.soft_tickets_notice") }) });
}, pv = "StrictFiltersModal-module__root___pkiTk", _v = "StrictFiltersModal-module__icon___S6LlP", gv = "StrictFiltersModal-module__title___qWkhf", mv = "StrictFiltersModal-module__content___RcDMu", vv = "StrictFiltersModal-module__description___81ciW", yv = "StrictFiltersModal-module__button___ekPAs", Ar = {
  root: pv,
  icon: _v,
  title: gv,
  content: mv,
  description: vv,
  button: yv
}, bv = ({
  totalTicketsCount: t,
  onWeakenFilters: e
}) => {
  const { t: r, i18n: n } = Y();
  return /* @__PURE__ */ o("div", { className: Ar.root, children: [
    /* @__PURE__ */ o("div", { className: Ar.icon, children: /* @__PURE__ */ o(Fi, {}) }),
    /* @__PURE__ */ o("h1", { className: Ar.title, children: r("strictfiltersmodal.filters_are_too_strict") }),
    /* @__PURE__ */ o("div", { className: Ar.content, children: /* @__PURE__ */ o("p", { className: Ar.description, children: r("strictfiltersmodal.we_found_tickets_but_none_them_meet_the", {
      totalTicketsCount: new Intl.NumberFormat(n.language).format(t)
    }) }) }),
    /* @__PURE__ */ o(Ge, { className: Ar.button, onClick: e, children: r("strictfiltersmodal.adjust_the_filters") })
  ] });
}, cl = (t, e, r) => ({
  ...t,
  marketing_carrier_designator: e,
  operating_carrier_designator: r
}), ul = (t, e) => {
  const r = {
    id: t.id,
    proposals: [],
    segments: [],
    badges: t.badges,
    signature: t.signature,
    position: t.position,
    isLast: e.isLast
  };
  return r.proposals = t.proposals.map((n) => (n.agent = e.agents[n.agent_id], n)), t.segments.forEach((n) => {
    const i = {
      flights: [],
      transfers: n.transfers,
      airports: {},
      cities: {},
      airlines: {}
    };
    n.flights.forEach((a) => {
      const s = e.flight_legs[a], l = t.proposals[0].flight_terms[a].marketing_carrier_designator, c = s.operating_carrier_designator, u = cl(
        s,
        l,
        c
      );
      u.id = a, i.airlines[u.marketing_carrier_designator.carrier] = e.airlines[u.marketing_carrier_designator.carrier], i.airlines[u.operating_carrier_designator.carrier] = e.airlines[u.operating_carrier_designator.carrier], i.flights.push(u);
    }), i.flights.forEach((a) => {
      i.airports[a.origin] = e.places.airports[a.origin], i.airports[a.destination] = e.places.airports[a.destination], a.technical_stops.forEach(
        (s) => i.airports[s.airport_code] = e.places.airports[s.airport_code]
      );
    }), Object.values(i.airports).forEach((a) => {
      a != null && a.city_code && (i.cities[a.city_code] = e.places.cities[a.city_code]);
    }), r.segments.push(i);
  }), r;
}, dl = function(t, e) {
  if (!t || !e) return null;
  const r = e.tickets.find((n) => n.id === t);
  return r ? ul(r, e) : null;
}, Cv = function(t, e) {
  var r, n, i;
  if (t && e) {
    const a = {
      id: t.id,
      price: {
        value: t.proposals[0].price.value,
        code: t.proposals[0].price.currency_code
      },
      airlineList: [],
      airlineTickets: {
        departure: [],
        arrival: []
      },
      flights: {
        departure: t.segments[0].flights,
        arrival: ((r = t.segments[1]) == null ? void 0 : r.flights) || []
      },
      flight_legs: {
        departure: [],
        arrival: []
      },
      airports: {
        departure: [],
        arrival: []
      },
      cities: {
        departure: [],
        arrival: []
      },
      segments: [],
      seats_available: null,
      badges: null,
      transfers: {
        departure: null,
        arrival: null
      },
      proposals: t.proposals,
      tags: {}
    };
    return t.proposals && t.proposals.length > 0 && t.proposals[0].flight_terms && Object.entries(t.proposals[0].flight_terms).forEach((l) => {
      var c;
      (c = l == null ? void 0 : l[1]) != null && c.seats_available && (a.seats_available = l[1].seats_available), a.airlineList.push(e == null ? void 0 : e.airlines[l == null ? void 0 : l[1].marketing_carrier_designator.carrier]);
    }), a.flights.departure.forEach(
      (s) => a.flight_legs.departure.push(e.flight_legs[s])
    ), a.flights.arrival.forEach(
      (s) => a.flight_legs.arrival.push(e.flight_legs[s])
    ), a.flight_legs.departure.forEach((s) => {
      a.airports.departure.push(e.places.airports[s.origin]), a.airports.departure.push(e.places.airports[s.destination]);
    }), a.flight_legs.arrival.forEach((s) => {
      a.airports.arrival.push(e.places.airports[s.origin]), a.airports.arrival.push(e.places.airports[s.destination]);
    }), a.flight_legs.departure.forEach((s) => {
      a.airlineTickets.departure.push(
        e.airlines[s.operating_carrier_designator.carrier]
      );
    }), a.flight_legs.arrival.forEach((s) => {
      a.airlineTickets.arrival.push(
        e.airlines[s.operating_carrier_designator.carrier]
      );
    }), a.airports.departure.forEach((s) => {
      s != null && s.city_code && a.cities.departure.push(e.places.cities[s.city_code]);
    }), a.airports.arrival.forEach((s) => {
      s != null && s.city_code && a.cities.arrival.push(e.places.cities[s.city_code]);
    }), t.segments.forEach((s) => {
      const l = {
        flights: [],
        transfers: s.transfers,
        airports: {},
        cities: {},
        airlines: {}
      };
      s.flights.forEach((c) => {
        const u = e.flight_legs[c], d = t.proposals[0].flight_terms[c].marketing_carrier_designator, h = u.operating_carrier_designator, f = cl(
          u,
          d,
          h
        );
        l.airlines[f.marketing_carrier_designator.carrier] = e.airlines[f.marketing_carrier_designator.carrier], l.airlines[f.operating_carrier_designator.carrier] = e.airlines[f.operating_carrier_designator.carrier], l.flights.push(f);
      }), l.flights.forEach((c) => {
        l.airports[c.origin] = e.places.airports[c.origin], l.airports[c.destination] = e.places.airports[c.destination], c.technical_stops.forEach(
          (u) => l.airports[u.airport_code] = e.places.airports[u.airport_code]
        );
      }), Object.values(l.airports).forEach((c) => {
        c != null && c.city_code && (l.cities[c.city_code] = e.places.cities[c.city_code]);
      }), a.segments.push(l);
    }), a.badges = t.badges ? t.badges[0] : null, a.transfers.departure = (n = t.segments[0]) == null ? void 0 : n.transfers, a.transfers.arrival = (i = t.segments[1]) == null ? void 0 : i.transfers, a.tags = Object.fromEntries(t.tags.map((s) => [s, !0])), a;
  }
}, eo = () => Math.floor(Date.now() / 1e3), hl = () => {
  const t = eo();
  xo(On.FetchTime, t, sessionStorage);
  const e = t + 15 * 60;
  xo(On.RefreshTime, e, sessionStorage);
}, Qo = (t, e = On.RefreshTime) => {
  const r = eo(), n = Gc(e, sessionStorage), i = n && r >= parseInt(n);
  return t(!!i);
}, wv = (t) => {
  let e = 0, r;
  const n = () => {
    t(e), e += 0.5, e === 100 && clearTimeout(r), r = setTimeout(n, 500);
  };
  return n(), () => {
    clearTimeout(r);
  };
}, Tv = 90, kv = () => {
  const [t, e] = Pe(!1), r = Q(t), n = Q(0), i = (l) => {
    n.value = Math.min(n.value + l, Tv);
  }, a = () => {
    n.value = 0, wv(i);
  }, s = (l) => {
    e(l), r.value = l;
  };
  return re(() => {
    Qo(e, On.RefreshTime);
    const l = setInterval(() => {
      Qo(e, On.RefreshTime);
    }, 3e4);
    return () => clearInterval(l);
  }, []), re(() => {
    r.value = t;
  }, [t]), {
    progress: n.value,
    resetTimer: a,
    showRefreshButton: t,
    updateShowRefreshButton: s
  };
}, Nv = /^(\d{4}-\d{2}-\d{2}) 24:00$/, Wo = (t) => {
  const e = t.match(Nv);
  if (!e) return t;
  const r = br(Zc(e[1], "yyyy-MM-dd", /* @__PURE__ */ new Date()), 1);
  return `${$e(r, "yyyy-MM-dd")} 00:00`;
}, vi = (t) => t == null ? void 0 : t.map((e) => ({
  min: Wo(e.min),
  max: Wo(e.max)
})), xv = (t) => Number.isSafeInteger(t) && t >= 0, fl = (t) => {
  const e = t.filter((r) => r.trim() !== "").map(Number).filter(xv);
  return e.length ? e : void 0;
}, Fv = (t) => t && typeof t == "object" ? Object.keys(t).length > 0 : !!t, tt = (t) => Fv(t) ? t : void 0, zo = (t) => (t == null ? void 0 : t.min) === "00:00" && (t == null ? void 0 : t.max) === "24:00", Ev = (t) => {
  var n;
  const e = ((n = _.search.params) == null ? void 0 : n.directions.length) || 1;
  let r = Object.entries(
    t.segments
  ).reduce(
    (i, [a, s]) => {
      var l, c, u, d;
      return {
        [a]: {
          departure_time: zo((l = s == null ? void 0 : s.departureTime) == null ? void 0 : l[0]) ? void 0 : vi(s.departureTime),
          arrival_time: zo((c = s == null ? void 0 : s.arrivalTime) == null ? void 0 : c[0]) ? void 0 : vi(s.arrivalTime),
          arrival_date: tt(s == null ? void 0 : s.arrivalDate),
          trip_duration: t.travelTime == null ? void 0 : [{ min: 0, max: t.travelTime }],
          airports_departure: ((u = s == null ? void 0 : s.directionAirports) == null ? void 0 : u.length) > 0 ? s.directionAirports : void 0,
          airports_arrival: ((d = s == null ? void 0 : s.airportsArrival) == null ? void 0 : d.length) > 0 ? s.airportsArrival : void 0
        },
        ...i
      };
    },
    {}
  );
  return e && Object.keys(r).length < e && t.travelTime && (r = Array.from({ length: e }).reduce(
    (a, s, l) => ({
      ...typeof a == "object" && a !== null ? a : {},
      [l]: (r == null ? void 0 : r[l]) || {
        trip_duration: [{ min: 0, max: t.travelTime }]
      }
    }),
    {}
  )), {
    transfers_without_airport_change: tt(t.isNoAirportChanges),
    without_night_transfers: tt(t.isNoOvernightLayovers),
    transfers_count: tt(t.layoversCounts),
    agents: tt(t.agents),
    airlines: tt(t.airlines),
    alliances: fl(t.alliances),
    transfers_airports: tt(t.connectingAirports),
    baggage: tt(t.baggage),
    transfers_without_visa: tt(t.isNoLayoversWithVisa),
    with_same_departure_arrival_airport: tt(t.sameAirportsDepartureAndArrival),
    transfers_without_virtual_interline: tt(t.isNoRepeatCheckIn),
    without_lowcosts: tt(t.isNoLowcost),
    price: t.priceMin && t.priceMax ? [{ min: t.priceMin, max: t.priceMax }] : void 0,
    transfers_duration: !(t.layoverDurationMin === 0 && t.layoverDurationMax === 24 * 60) && t.layoverDurationMin >= 0 && t.layoverDurationMax >= 0 ? [{ min: t.layoverDurationMin, max: t.layoverDurationMax }] : void 0,
    segments: tt(r),
    equipments: tt(t.equipments)
  };
}, Mv = ({ onTicketsRefetch: t }) => {
  var b, C, x, N, T, M, S, R, $, V, J;
  const e = Q(!1), r = Q(!1), n = Q(0), { i18n: i } = Y(), a = [
    _.search.requestRes,
    i.language,
    _.currency.currentCurrency.code
  ];
  re(() => {
    r.value = !1;
  }, [JSON.stringify(a)]);
  const s = Q((b = _.search.requestRes) == null ? void 0 : b.search_id), l = Ev(_.filters.values), { data: c, resetQuery: u } = Kc({
    enabled: !!((C = _.search.requestRes) != null && C.search_id) && (!r.value || s.value !== ((x = _.search.requestRes) == null ? void 0 : x.search_id)),
    key: [
      n.value,
      (N = _.search.requestRes) == null ? void 0 : N.search_id,
      (T = _.search.requestRes) == null ? void 0 : T.results_url,
      JSON.stringify(_.filters.values)
    ],
    queryFn: () => {
      var F, I, O, H, W;
      return Ka.getSearchResults({
        resultUrl: ((F = _.search.requestRes) == null ? void 0 : F.results_url) || "",
        searchId: ((I = _.search.requestRes) == null ? void 0 : I.search_id) || "",
        filters: l,
        order: _.filters.values.order,
        ...((O = _.search.params) == null ? void 0 : O.ticketId) && {
          highlighted_ticket: (H = _.search.params) == null ? void 0 : H.ticketId
        },
        marker: _.base.marker || "",
        searchByAirport: (W = _.search.requestRes) == null ? void 0 : W.searchByAirport
      });
    },
    onRefetch: t,
    onComplete: (F) => {
      const I = Yc(), O = Ya();
      if (!O) return;
      const H = (O == null ? void 0 : O.flightSearch) || "";
      if (!H) return;
      const W = I.find((se) => se.key === H);
      W && (W.price = F.cheapest_ticket.proposals[0].price, Jc(I));
    }
  });
  re(() => {
    u(), Xs(() => {
      r.value = !1, n.value = 0;
    });
  }, [JSON.stringify(_.search.requestRes)]), re(() => {
    !r.value && _.search.isLoadingRequestRes && (e.value = !0), r.value && (e.value = !1);
  }, [r.value, _.search.isLoadingRequestRes]), re(() => {
    r.value = !1, n.value = 0;
  }, [(M = _.search.requestRes) == null ? void 0 : M.results_url]);
  const d = (F) => {
    let I = 1 / 0;
    return F.forEach((O) => {
      const H = O.proposals.find(
        (se) => {
          var L, X;
          return !((X = (L = se.minimum_fare) == null ? void 0 : L.baggage) != null && X.count);
        }
      ), W = O.proposals.find(
        (se) => {
          var L, X;
          return (X = (L = se.minimum_fare) == null ? void 0 : L.baggage) == null ? void 0 : X.count;
        }
      );
      if (H && W) {
        const se = W.price.value - H.price.value;
        se > 0 && se < I && (I = se);
      }
    }), I === 1 / 0 ? void 0 : Math.ceil(I);
  }, [h, f] = Pe([]);
  re(() => {
    var F, I, O, H;
    if (!(!c || !c.searchId || h.includes(c.searchId)) && (r.value = !!(c != null && c.isLast), r.value)) {
      const W = d(c.tickets);
      Xc({
        ticket_count: c.meta.total_tickets_count,
        direct_ticket_count: c.meta.direct_tickets_count,
        min_price: (I = (F = c == null ? void 0 : c.cheapest_ticket) == null ? void 0 : F.proposals[0]) == null ? void 0 : I.price.value,
        currency: (H = (O = c == null ? void 0 : c.cheapest_ticket) == null ? void 0 : O.proposals[0]) == null ? void 0 : H.price.currency_code,
        min_price_baggage: W
      }), f([...h, c.searchId]);
    }
  }, [c]);
  const p = eu(
    fa(() => {
      n.value++;
    }, 3e3),
    []
  );
  re(() => {
    var F;
    s.value = c == null ? void 0 : c.searchId, !(!c || c != null && c.isLast && c.searchId === ((F = _.search.requestRes) == null ? void 0 : F.search_id)) && p();
  }, [c]);
  const m = fa(tu, 100);
  re(() => {
    r.value = !1, _.filters.isUserInteraction && m();
  }, [JSON.stringify(_.filters.values)]);
  const y = () => {
    r.value = !1, n.value = 0;
  }, v = !!(c && ((S = c.tickets) == null ? void 0 : S.length) === 0 && (($ = (R = c.soft_tickets) == null ? void 0 : R.tickets) != null && $.length)), g = v && (c != null && c.soft_tickets) ? {
    ...c,
    tickets: c.soft_tickets.tickets
  } : c;
  return {
    ticketsRes: _.search.isLoadingRequestRes ? void 0 : g,
    isLoading: e.value,
    refetchTickets: y,
    appliedFilters: l,
    resultUrl: (V = _.search.requestRes) == null ? void 0 : V.results_url,
    searchId: (J = _.search.requestRes) == null ? void 0 : J.search_id,
    isDone: r.value,
    isOnlySoftTickets: v
  };
}, To = class To {
};
To.getTicket = async ({
  datacenter: e,
  searchId: r,
  locale: n,
  directFlightGroupKey: i,
  signature: a,
  filters: s
}) => {
  const l = await ru(n);
  return (await fetch(`https://tickets-api.${e}.aviasales.ru/blet/wl/query`, {
    method: "POST",
    body: JSON.stringify({
      operationName: null,
      query: "query GetTicket($searchId: String! $locale: Language! $market: String $filters: FiltersStateInput $signature: String! $directFlightGroupKey: String $withDirectSchedule: Boolean!) { search(searchId: $searchId, locale: $locale, market: $market, filters: $filters) { ticket(signature: $signature directFlightGroupKey: $directFlightGroupKey) { directFlightsSchedule @include(if: $withDirectSchedule) { departures { datetime priceDiff { currencyCode value } signature isAvailable isCurrent } returns { datetime priceDiff { currencyCode value } signature isAvailable isCurrent } } signature groupCarriers } } }",
      variables: {
        searchId: r,
        locale: n,
        market: l.toUpperCase(),
        signature: a,
        filters: s,
        directFlightGroupKey: i,
        withDirectSchedule: !0
      }
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })).json();
};
let ba = To;
const Sv = (t) => t && typeof t == "object" ? Object.keys(t).length > 0 : !!t, rt = (t) => Sv(t) ? t : void 0, Av = (t) => ({
  transfers_without_airport_change: rt(t.isNoAirportChanges),
  without_night_transfers: rt(t.isNoOvernightLayovers),
  transfers_count: rt(t.layoversCounts),
  agents: rt(t.agents),
  airlines: rt(t.airlines),
  alliances: fl(t.alliances),
  transfers_airports: rt(t.connectingAirports),
  baggage: rt(t.baggage),
  transfers_without_visa: rt(t.isNoLayoversWithVisa),
  with_same_departure_arrival_airport: rt(t.sameAirportsDepartureAndArrival),
  transfers_without_virtual_interline: rt(t.isNoRepeatCheckIn),
  without_lowcosts: rt(t.isNoLowcost),
  price: t.priceMin && t.priceMax ? [{ min: t.priceMin, max: t.priceMax }] : void 0,
  transfers_duration: !(t.layoverDurationMin === 0 && t.layoverDurationMax === 24 * 60) && t.layoverDurationMin >= 0 && t.layoverDurationMax >= 0 ? [{ min: t.layoverDurationMin, max: t.layoverDurationMax }] : void 0,
  segments: rt(
    Object.entries(t.segments).reduce(
      (e, [r, n]) => {
        var i, a, s, l, c, u, d, h;
        return {
          [r]: {
            departure_time: ((a = (i = n == null ? void 0 : n.departureTime) == null ? void 0 : i[0]) == null ? void 0 : a.min) === "00:00" && ((l = (s = n == null ? void 0 : n.departureTime) == null ? void 0 : s[0]) == null ? void 0 : l.max) === "24:00" ? void 0 : vi(n.departureTime),
            arrival_time: ((u = (c = n == null ? void 0 : n.arrivalTime) == null ? void 0 : c[0]) == null ? void 0 : u.min) === "00:00" && ((h = (d = n == null ? void 0 : n.arrivalTime) == null ? void 0 : d[0]) == null ? void 0 : h.max) === "24:00" ? void 0 : vi(n.arrivalTime),
            arrival_date: rt(n == null ? void 0 : n.arrivalDate)
          },
          ...e
        };
      },
      {}
    )
  ),
  equipments: rt(t.equipments)
}), Iv = "DirectFlights-module__root___IuvBA", Dv = "DirectFlights-module__allFlights___BU9w6", Ov = "DirectFlights-module__title___ca12T", Lv = "DirectFlights-module__list___ZM4aW", Rv = "DirectFlights-module__moreBox___-FRtI", Pv = "DirectFlights-module__more___A4Sad", gr = {
  root: Iv,
  allFlights: Dv,
  title: Ov,
  list: Lv,
  moreBox: Rv,
  more: Pv
}, Bv = (t, e) => /* @__PURE__ */ w("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M5.92891 14C6.18768 14 6.39336 13.9068 6.57251 13.7338L11.6616 8.74875C11.8872 8.52246 11.9934 8.28952 12 8.00333C12 7.71714 11.8938 7.47754 11.6616 7.2579L6.57251 2.26622C6.39336 2.09318 6.18104 2 5.92891 2C5.41137 2 5 2.41265 5 2.92512C5 3.17804 5.10616 3.41764 5.29194 3.60399L9.80379 8.00333L5.29194 12.396C5.10616 12.5824 5 12.822 5 13.0749C5 13.5874 5.41137 14 5.92891 14Z", fill: "currentColor" })), $v = Ce(Bv), jv = "DirectFlightsItem-module__root___v4-G-", Vv = "DirectFlightsItem-module__head___NUv8Q", qv = "DirectFlightsItem-module__logo___4V-KF", Uv = "DirectFlightsItem-module__box___BZv8C", Qv = "DirectFlightsItem-module__airline___ns36G", Wv = "DirectFlightsItem-module__price___U-UB-", zv = "DirectFlightsItem-module__airlinePicture___myOs8", Hv = "DirectFlightsItem-module__body___ce88u", Gv = "DirectFlightsItem-module__dates___had6v", Zv = "DirectFlightsItem-module__date___qqZla", Kv = "DirectFlightsItem-module__times___GXhg3", Yv = "DirectFlightsItem-module__tableBox___SfXPr", Jv = "DirectFlightsItem-module__table___z9kbJ", Xv = "DirectFlightsItem-module__tableRow___Qihyx", e2 = "DirectFlightsItem-module__tableCell___Ir8bv", t2 = "DirectFlightsItem-module__scroller___7zKWm", r2 = "DirectFlightsItem-module__prev___xD1CU", n2 = "DirectFlightsItem-module__next___1jDOB", i2 = "DirectFlightsItem-module__show___q9vko", a2 = "DirectFlightsItem-module__message___kpiKs", o2 = "DirectFlightsItem-module__airlineImage___4IPTX", s2 = "DirectFlightsItem-module__more___pHNK4", Ne = {
  root: jv,
  head: Vv,
  logo: qv,
  box: Uv,
  airline: Qv,
  price: Wv,
  airlinePicture: zv,
  body: Hv,
  dates: Gv,
  date: Zv,
  times: Kv,
  tableBox: Yv,
  table: Jv,
  tableRow: Xv,
  tableCell: e2,
  scroller: t2,
  prev: r2,
  next: n2,
  show: i2,
  message: a2,
  airlineImage: o2,
  more: s2
}, l2 = ({
  directFlight: t,
  onClick: e
}) => {
  var V, J, F, I, O, H, W, se, L, X, Me, me, Fe, P, E, U, Z, K;
  const { i18n: r } = Y(), { priceFormatter: n } = Ze(), { timeFormatter: i } = xi(), a = Zr(r.language), { formatShortDate: s } = Ti(), l = It(null), c = It(null), u = Q(!1), d = Q(!1), h = Q(!1), f = r.dir(r.language) === "rtl", p = (F = (J = (V = t.flight) == null ? void 0 : V.schedule) == null ? void 0 : J.departure) != null && F.length ? (O = (I = t.flight) == null ? void 0 : I.schedule) == null ? void 0 : O.departure[0].datetime : null, m = (se = (W = (H = t.flight) == null ? void 0 : H.schedule) == null ? void 0 : W.returns) != null && se.length ? (X = (L = t.flight) == null ? void 0 : L.schedule) == null ? void 0 : X.returns[0].datetime : null, y = t.flight.airlines.map(
    (z) => {
      var de;
      return t.airlinesList[z] == null ? `[not-found - ${z}]` : (de = t.airlinesList[z].name[ye()]) == null ? void 0 : de.default;
    }
  ).join(", "), v = () => {
    if (!l.current) return;
    const { scrollLeft: z, scrollWidth: de, clientWidth: D } = l.current;
    f ? (d.value = z < 0, h.value = z > -(de - D)) : (d.value = z > 0, h.value = z < de - D);
  }, g = () => {
    l.current && (u.value = l.current.scrollWidth > l.current.clientWidth, v());
  }, b = () => {
    l.current && (l.current.scrollLeft = f ? l.current.scrollWidth : 0, v());
  }, C = (z) => {
    if (l.current && c.current) {
      const de = c.current.getBoundingClientRect(), D = z.clientX - de.left, ne = de.width, le = D / ne, ve = l.current.scrollWidth - l.current.clientWidth;
      f ? l.current.scrollLeft = -(ve * le) : l.current.scrollLeft = ve * le, v();
    }
  }, x = Q(null), N = Q(0), T = (z) => {
    x.value = z.touches[0].clientX;
  }, M = (z) => {
    if (x.value !== null && l.current) {
      const de = z.touches[0].clientX - x.value;
      f ? l.current.scrollLeft += de : l.current.scrollLeft -= de, x.value = z.touches[0].clientX, v();
    }
  }, S = () => {
    x.value = null, N.value = 0;
  };
  re(() => {
    g();
  }, [t]), re(() => (g(), window.addEventListener("resize", g), () => {
    window.removeEventListener("resize", g);
  }), []);
  const R = t.flight.group_key, $ = (z) => t.airlinesList[z] == null ? "[not-iata-img]" : t.airlinesList[z].iata;
  return /* @__PURE__ */ o("div", { className: Ne.root, onClick: e, children: [
    /* @__PURE__ */ o("div", { className: Ne.head, children: [
      /* @__PURE__ */ o("div", { className: B(Ne.logo), children: [
        t.flight.airlines.slice(0, t.flight.airlines.length > 3 ? 2 : void 0).map((z, de) => /* @__PURE__ */ o("picture", { className: Ne.airlinePicture, children: [
          /* @__PURE__ */ o(
            "source",
            {
              src: `https://img.avs.io/pics/al_square/${$(z)}@avif?rs=fit:48:48`
            }
          ),
          /* @__PURE__ */ o(
            "img",
            {
              className: Ne.airlineImage,
              src: `https://img.avs.io/pics/al_square/${$(z)}@png?rs=fit:48:48`,
              alt: ""
            }
          )
        ] }, de)),
        t.flight.airlines.length > 3 && /* @__PURE__ */ o("span", { className: Ne.more, children: [
          "+",
          t.flight.airlines.length - 2
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: Ne.box, children: [
        /* @__PURE__ */ o("div", { className: Ne.airline, children: y }),
        /* @__PURE__ */ o("span", { className: Ne.price, tabIndex: 0, children: [
          n.format((Me = t.flight.cheapest_ticket) == null ? void 0 : Me.proposals[0].price.value),
          /* @__PURE__ */ o($v, {})
        ] })
      ] })
    ] }),
    R && /* @__PURE__ */ o("div", { className: Ne.body, children: [
      /* @__PURE__ */ o("div", { className: Ne.dates, children: p && m && /* @__PURE__ */ o(Ie, { children: [
        /* @__PURE__ */ o("span", { className: Ne.date, children: s(p, a) }),
        /* @__PURE__ */ o("span", { className: Ne.date, children: s(m, a) })
      ] }) }),
      /* @__PURE__ */ o("div", { className: Ne.times, children: [
        /* @__PURE__ */ o(
          "div",
          {
            className: Ne.tableBox,
            ref: l,
            onTouchStart: T,
            onTouchMove: M,
            onTouchEnd: S,
            children: [
              /* @__PURE__ */ o(
                "span",
                {
                  className: B(Ne.prev, {
                    [Ne.show]: d.value
                  })
                }
              ),
              /* @__PURE__ */ o("table", { className: Ne.table, children: /* @__PURE__ */ o("tbody", { className: Ne.tableBody, children: [
                ((P = (Fe = (me = t.flight) == null ? void 0 : me.schedule) == null ? void 0 : Fe.departure) == null ? void 0 : P.length) && /* @__PURE__ */ o("tr", { className: Ne.tableRow, children: t.flight.schedule.departure.map((z) => /* @__PURE__ */ o("td", { className: Ne.tableCell, children: i.format(z.datetime) }, z.datetime)) }),
                ((Z = (U = (E = t.flight) == null ? void 0 : E.schedule) == null ? void 0 : U.returns) == null ? void 0 : Z.length) && /* @__PURE__ */ o("tr", { className: Ne.tableRow, children: t.flight.schedule.returns.map((z) => /* @__PURE__ */ o("td", { className: Ne.tableCell, children: i.format(z.datetime) }, z.datetime)) })
              ] }) }),
              /* @__PURE__ */ o(
                "span",
                {
                  className: B(Ne.next, {
                    [Ne.show]: h.value
                  })
                }
              )
            ]
          }
        ),
        u.value && /* @__PURE__ */ o(
          "div",
          {
            className: Ne.scroller,
            ref: c,
            onMouseMove: C,
            onMouseLeave: b
          }
        )
      ] })
    ] }),
    !R && /* @__PURE__ */ o("span", { className: Ne.message, children: (K = t.flight) == null ? void 0 : K.exception_message })
  ] });
}, ii = 2, c2 = ({
  flights: t,
  ticketsRes: e,
  updateTickets: r,
  isStale: n,
  openUpdateModal: i
}) => {
  var X, Me, me, Fe, P;
  const { t: a, i18n: s } = Y(), l = Q(a("hotel_page.advantages.unfold")), c = Q(!1), u = c.value ? t : t.slice(0, ii), d = () => {
    c.value = !c.value, l.value = c.value ? a("hotel_page.advantages.fold") : a("hotel_page.advantages.unfold");
  }, h = Q(""), f = Q(""), p = Q(!1);
  re(() => {
    p.value = !!n;
  }, [n]);
  const m = Q(null), y = Q(null), v = Q(!1), g = Q([]), b = Q(null), C = Q([]), x = ((Me = (X = _.search.requestRes) == null ? void 0 : X.results_url.split("tickets-api.")[1]) == null ? void 0 : Me.split(".")[0]) || "", N = (E) => {
    y.value = E;
  }, T = Q(!1), M = Q(!1), S = Q(null), R = async (E, U = {}) => {
    var Z, K, z, de, D, ne, le, ve;
    if (!(!h.value || !f.value || !x || !((Z = _.search.requestRes) != null && Z.search_id) || !s.language) && (E && (M.value = !0), !!((K = _.search.requestRes) != null && K.search_id)))
      try {
        const j = await ba.getTicket({
          datacenter: x,
          searchId: _.search.requestRes.search_id,
          locale: s.language,
          directFlightGroupKey: f.value,
          signature: h.value,
          filters: U
        });
        C.value = (D = (de = (z = j == null ? void 0 : j.data) == null ? void 0 : z.search) == null ? void 0 : de.ticket) == null ? void 0 : D.groupCarriers, M.value = !1, b.value = (ve = (le = (ne = j == null ? void 0 : j.data) == null ? void 0 : ne.search) == null ? void 0 : le.ticket) == null ? void 0 : ve.directFlightsSchedule;
      } catch (j) {
        console.error(j);
      }
  }, $ = async () => {
    var U, Z, K;
    if (!((U = _.search.requestRes) != null && U.search_id) || !((Z = _.search.requestRes) != null && Z.results_url)) return;
    const E = Av(_.filters.values);
    (K = E == null ? void 0 : E.airlines) != null && K.length ? E.airlines.includes(f.value) || E.airlines.push(f.value) : E.airlines = C.value;
    try {
      T.value = !0;
      const z = await Ka.getSearchResults({
        resultUrl: _.search.requestRes.results_url,
        searchId: _.search.requestRes.search_id,
        order: _.filters.values.order,
        filters: E,
        required_tickets: [h.value],
        marker: _.base.marker || "",
        searchByAirport: _.search.requestRes.searchByAirport
      });
      T.value = !1, m.value = dl(h.value, z), J();
    } catch (z) {
      console.error(z);
    }
  }, V = () => {
    if (v.value) {
      const E = g.value.find((U) => {
        var Z, K;
        return (K = (Z = U.options) == null ? void 0 : Z.baggage) == null ? void 0 : K.count;
      });
      y.value = E || g.value[0];
    } else {
      const E = g.value.find(
        (U) => {
          var Z, K;
          return !((K = (Z = U.options) == null ? void 0 : Z.baggage) != null && K.count);
        }
      );
      y.value = E || g.value[0];
    }
  }, J = () => {
    var E;
    g.value = va(a, ((E = m.value) == null ? void 0 : E.proposals) || []), V();
  }, F = async (E) => {
    var Z, K, z;
    S.value = E, h.value = E.signature;
    const U = (z = (K = (Z = y.value) == null ? void 0 : Z.options) == null ? void 0 : K.baggage) != null && z.count ? { baggage: ["full_baggage"] } : {};
    R(!1, U), $();
  }, O = fa(async (E) => {
    v.value = E, H.value ? (R(!1, E ? { baggage: ["full_baggage"] } : {}), $()) : V();
  }, 300), H = Q(!1), W = async (E) => {
    var U, Z, K, z, de, D, ne, le, ve, j, he, Je, Le, lt;
    e && (m.value = ul(E.flight.cheapest_ticket, e), y.value = xn(
      a,
      E.flight.cheapest_ticket.proposals[0],
      0,
      (z = (K = (Z = (U = E.flight.cheapest_ticket) == null ? void 0 : U.proposals[0]) == null ? void 0 : Z.minimum_fare) == null ? void 0 : K.baggage) != null && z.count ? a("ticket.baggage.cheap_fare_included") : a("ticket.baggage.cheap_fare")
    ), g.value = va(
      a,
      E.flight.cheapest_ticket.proposals
    ), v.value = !!((le = (ne = (D = (de = E.flight.cheapest_ticket) == null ? void 0 : de.proposals[0]) == null ? void 0 : D.minimum_fare) == null ? void 0 : ne.baggage) != null && le.count), ((he = (j = (ve = E.flight) == null ? void 0 : ve.schedule) == null ? void 0 : j.departure) == null ? void 0 : he.length) !== 1 && E.flight.group_key ? (h.value = (Le = (Je = E.flight) == null ? void 0 : Je.cheapest_ticket) == null ? void 0 : Le.signature, f.value = (lt = E == null ? void 0 : E.flight) == null ? void 0 : lt.group_key, R(!0), H.value = !0) : (H.value = !1, b.value = null), L());
  }, se = Q((P = (Fe = (me = _.search) == null ? void 0 : me.params) == null ? void 0 : Fe.ticketId) == null ? void 0 : P.includes("direct"));
  re(() => {
    if (!se.value) return;
    const E = t.find((U) => {
      var Z, K;
      return U.flight.cheapest_ticket.id === ((K = (Z = _.search) == null ? void 0 : Z.params) == null ? void 0 : K.ticketId);
    });
    E ? (W(E), se.value = !1) : e != null && e.isLast && (_.modal.openModal({
      content: /* @__PURE__ */ o(Xa, {})
    }), se.value = !1);
  }, [t, e]);
  const L = async () => {
    _.modal.openModal({
      content: /* @__PURE__ */ o(
        ya,
        {
          ticket: m,
          isLegacyResults: p,
          onUpdateTickets: r,
          currentFare: y,
          onChangeFare: N,
          fareOptions: g,
          onToggleBaggage: O,
          directFlightSchedule: b,
          onClickScheduleItem: (E) => {
            F(E);
          },
          isLoadingPrices: T,
          isDirectFlight: H,
          isStartLoading: M
        }
      ),
      variant: "fullHeight"
    });
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: B(gr.root, {
        [gr.allFlights]: t.length > ii
      }),
      children: [
        /* @__PURE__ */ o("h2", { className: gr.title, children: a("directflights.direct_flights") }),
        /* @__PURE__ */ o(
          "div",
          {
            className: B(gr.list, {
              [gr.allList]: t.length > ii
            }),
            children: u.map((E, U) => {
              var Z, K, z, de;
              return /* @__PURE__ */ o(
                l2,
                {
                  directFlight: E,
                  onClick: n ? i : () => W(E)
                },
                (K = (Z = E.flight) == null ? void 0 : Z.cheapest_ticket) != null && K.id ? `${(de = (z = E.flight) == null ? void 0 : z.cheapest_ticket) == null ? void 0 : de.id}-${U}` : U
              );
            })
          }
        ),
        t.length > ii && /* @__PURE__ */ o("div", { className: gr.moreBox, children: /* @__PURE__ */ o("button", { className: gr.more, type: "button", onClick: d, children: l.value }) })
      ]
    }
  );
}, u2 = (t, e) => /* @__PURE__ */ w("svg", { width: 44, height: 44, viewBox: "0 0 44 44", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M22 9.16667C19.5402 9.1673 17.1325 9.87482 15.0634 11.205C12.9943 12.5352 11.3511 14.4319 10.3294 16.6695C9.30769 18.907 8.95055 21.3911 9.3005 23.8258C9.65046 26.2605 10.6928 28.5434 12.3033 30.4026C13.9138 32.2618 16.0247 33.619 18.3847 34.3126C20.7447 35.0062 23.2542 35.0069 25.6146 34.3147C27.975 33.6226 30.0867 32.2666 31.6983 30.4084C33.31 28.5501 34.3536 26.2679 34.705 23.8333H38.3992C37.9257 28.0207 35.8682 31.8682 32.6486 34.5871C29.429 37.3059 25.2912 38.69 21.0837 38.4555C16.8762 38.2211 12.9178 36.3858 10.0202 33.3261C7.12255 30.2664 5.50529 26.214 5.5 22C5.50007 18.8148 6.42205 15.6978 8.15466 13.025C9.88726 10.3523 12.3564 8.23823 15.2641 6.93793C18.1717 5.63762 21.3936 5.2067 24.5408 5.69717C27.688 6.18765 30.6259 7.57855 33 9.702V5.5H36.6667V14.6667L34.8333 16.5H25.6667V12.8333H30.9815C28.5853 10.4792 25.3592 9.16213 22 9.16667Z", fill: "#9EA9B7" })), d2 = Ce(u2), h2 = "UpdateModal-module__root___u2Uv9", f2 = "UpdateModal-module__container___8J78m", p2 = "UpdateModal-module__content___O4le5", _2 = "UpdateModal-module__icon___fWtu1", g2 = "UpdateModal-module__title___GndfN", m2 = "UpdateModal-module__text___fE17O", v2 = "UpdateModal-module__buttons___mMeXs", y2 = "UpdateModal-module__later___rg31M", b2 = "UpdateModal-module__update___-9-pF", Et = {
  root: h2,
  container: f2,
  content: p2,
  icon: _2,
  title: g2,
  text: m2,
  buttons: v2,
  later: y2,
  update: b2
}, C2 = ({ onClose: t, onUpdate: e }) => {
  const { t: r } = Y();
  return /* @__PURE__ */ o("div", { className: Et.root, children: /* @__PURE__ */ o("div", { className: Et.container, children: /* @__PURE__ */ o("div", { className: Et.content, children: [
    /* @__PURE__ */ o(d2, { className: Et.icon }),
    /* @__PURE__ */ o("h3", { className: Et.title, children: r("updatemodal.search_results_may_be_outdated") }),
    /* @__PURE__ */ o("p", { className: Et.text, children: r("updatemodal.ticket_prices_change_several_times_a_day_update") }),
    /* @__PURE__ */ o("div", { className: Et.buttons, children: [
      /* @__PURE__ */ o(Ge, { className: Et.later, onClick: t, variant: "secondary", children: r("updatemodal.later") }),
      /* @__PURE__ */ o(Ge, { className: Et.update, onClick: e, children: r("informer.update_results") })
    ] })
  ] }) }) });
}, w2 = "TicketsWidget-module__root___MFb2o", T2 = "TicketsWidget-module__filtersLoader___GGJDN", k2 = "TicketsWidget-module__progressBar___VBYDl", N2 = "TicketsWidget-module__filtersDesktop___kAruW", x2 = "TicketsWidget-module__filtersMobileMenu___DAKfO", F2 = "TicketsWidget-module__moreTickets___3NkVK", E2 = "TicketsWidget-module__wrapper___3tGSl", M2 = "TicketsWidget-module__hideCard___7U0ce", S2 = "TicketsWidget-module__header___-bi3p", A2 = "TicketsWidget-module__headerFixed___-Gfwz", I2 = "TicketsWidget-module__hidden___-5cIr", D2 = "TicketsWidget-module__visible___lwxct", ut = {
  root: w2,
  filtersLoader: T2,
  progressBar: k2,
  filtersDesktop: N2,
  filtersMobileMenu: x2,
  moreTickets: F2,
  wrapper: E2,
  hideCard: M2,
  header: S2,
  headerFixed: A2,
  hidden: I2,
  visible: D2
}, O2 = function(t, e) {
  var n;
  const r = {
    flight: { ...t },
    airlinesList: {}
  };
  return (n = t == null ? void 0 : t.airlines) == null || n.forEach((i) => {
    r.airlinesList[i] = e == null ? void 0 : e.airlines[i];
  }), r;
}, L2 = "NoConnectionModal-module__root___0KEKi", R2 = "NoConnectionModal-module__icon___AeLVE", P2 = "NoConnectionModal-module__title___ZzuWv", B2 = "NoConnectionModal-module__content___0Ytsw", $2 = "NoConnectionModal-module__description___-n2t6", _n = {
  root: L2,
  icon: R2,
  title: P2,
  content: B2,
  description: $2
}, j2 = () => {
  const { t } = Y();
  return /* @__PURE__ */ o("div", { className: _n.root, children: [
    /* @__PURE__ */ o("div", { className: _n.icon, children: /* @__PURE__ */ o(Fi, {}) }),
    /* @__PURE__ */ o("h1", { className: _n.title, children: t("noconnectionmodal.the_connection_has_disappeared_were_sure_this_is") }),
    /* @__PURE__ */ o("div", { className: _n.content, children: /* @__PURE__ */ o("p", { className: _n.description, children: t("noconnectionmodal.check_the_connection_and_try_if_you_have") }) })
  ] });
}, V2 = "BadSearchModal-module__root___gSFWr", q2 = "BadSearchModal-module__icon___pvZfT", U2 = "BadSearchModal-module__title___Ozv9Y", Q2 = "BadSearchModal-module__content___NCKEU", W2 = "BadSearchModal-module__description___xj8fo", gn = {
  root: V2,
  icon: q2,
  title: U2,
  content: Q2,
  description: W2
}, z2 = () => {
  const { t } = Y();
  return /* @__PURE__ */ o("div", { className: gn.root, children: [
    /* @__PURE__ */ o("div", { className: gn.icon, children: /* @__PURE__ */ o(Fi, {}) }),
    /* @__PURE__ */ o("h1", { className: gn.title, children: t("errors.bad_search_params.message") }),
    /* @__PURE__ */ o("div", { className: gn.content, children: /* @__PURE__ */ o("p", { className: gn.description, children: /* @__PURE__ */ o(al, { i18nKey: "errors.bad_search_params.description", components: { br: /* @__PURE__ */ o("br", {}) } }) }) })
  ] });
}, H2 = (t) => typeof t == "object" && t !== null && "status" in t, G2 = () => {
  var d;
  const { i18n: t } = Y(), [e, r] = Pe(t.language), [n, i] = Pe((d = _.currency.currentCurrency) == null ? void 0 : d.code), a = async (h) => {
    var f;
    try {
      return _.search.setIsLoadingRequestRes(!0), (f = _.currency.currentCurrency) != null && f.code ? await Ka.createSearchRequest({
        language: t.language,
        currencyCode: _.currency.currentCurrency.code,
        searchParams: {
          directions: h,
          passengers: {
            adults: _.search.params.adults,
            children: _.search.params.children,
            infants: _.search.params.infants
          },
          tripClass: _.search.params.tripClass
        },
        marker: _.base.marker || ""
      }) || null : void 0;
    } catch (p) {
      H2(p) && ((p == null ? void 0 : p.status) === 400 ? _.modal.openModal({ content: /* @__PURE__ */ o(z2, {}) }) : _.search.isParamsFromUrl || _.search.isUrlError ? (_.search.setUrlError(!0), _.modal.closeAllModals(), _.modal.openModal({ content: /* @__PURE__ */ o(Xa, {}) })) : (_.modal.closeAllModals(), _.modal.openModal({ content: /* @__PURE__ */ o(j2, {}) })), _.resultsWidget.hide());
    } finally {
      _.search.setIsLoadingRequestRes(!1);
    }
  }, s = async () => {
    var p, m;
    const h = (m = (p = _.search.params) == null ? void 0 : p.directions) == null ? void 0 : m.filter(
      (y) => y.date && y.origin && y.destination
    );
    if (!(h != null && h.length)) return;
    _.search.setRequestRes(null);
    const f = await a(h);
    f && (_.search.setRequestRes(f), _.resultsWidget.show(), hl());
  }, l = () => {
    _.search.requestRes && _.filters.reset();
  }, c = async () => {
    _.filters.isChanged() ? _.filters.setIsSavedFromPrevSearch(!1) : _.filters.setIsSavedFromPrevSearch(null), l(), await s(), Fo();
  }, u = async () => {
    _.filters.isChanged() ? _.filters.setIsSavedFromPrevSearch(!0) : _.filters.setIsSavedFromPrevSearch(null), await s(), Fo();
  };
  return re(() => {
    n !== _.currency.currentCurrency.code && (i(_.currency.currentCurrency.code), c());
  }, [_.currency.currentCurrency.code]), re(() => {
    e !== t.language && (r(t.language), u());
  }, [t.language]), {
    searchTickets: c,
    startSearchTickets: s,
    searchTicketsWithoutResetFilters: u
  };
}, Z2 = (t, e) => /* @__PURE__ */ w("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", ref: e, ...t }, /* @__PURE__ */ w("mask", { id: "mask0_5629_9045", style: {
  maskType: "alpha"
}, maskUnits: "userSpaceOnUse", x: 1, y: 1, width: 18, height: 18 }, /* @__PURE__ */ w("rect", { x: 19, y: 19, width: 18, height: 18, transform: "rotate(-180 19 19)", fill: "url(#pattern0_5629_9045)" })), /* @__PURE__ */ w("g", { mask: "url(#mask0_5629_9045)" }, /* @__PURE__ */ w("rect", { x: 20, y: 20, width: 20, height: 20, transform: "rotate(-180 20 20)" })), /* @__PURE__ */ w("defs", null, /* @__PURE__ */ w("pattern", { id: "pattern0_5629_9045", patternContentUnits: "objectBoundingBox", width: 1, height: 1 }, /* @__PURE__ */ w("use", { xlinkHref: "#image0_5629_9045", transform: "scale(0.01)" })), /* @__PURE__ */ w("image", { id: "image0_5629_9045", width: 100, height: 100, xlinkHref: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAZKADAAQAAAABAAAAZAAAAAAvu95BAAAG8ElEQVR4Ae1dW4gXVRi3LS0z8sEMClsygnKNimy7Qm1vBvaiUr0VUhJCVkoP9dDNMPRJAuslKIzCh0CqFbquEtHFBMusTINdzLxE2UUrRct+P9gjZ+c/Z+bMnPPN/GfnO/AxM98557v8vjlzrv/dCRM0KQKKgCKgCCgCioAioAjER+C0+CJPSZyIu1WgBaAzQQdBe0EHRq/f47oJtB+kqQIE1kLHyRw6hvwVoB6QJmEE+ObnBcTkrxa2RcUDgd0FAvIfyt6pqMkisKZAQNhSDoP6ZE1qt/RZcJ9vvvks+Vx3ofzUdsMm6/1miPcJhF3mTdSRHP3Jehwo/fTA+nnVj6LAwrxCifzL8Mx6Hyf4+hgBgUmQwXmH3QJ87v9FnbkR9KuIFARWgucThGSZX1FvZoo8ZQUi0Iv6J0BJwH2et6He5ED9Wj0FgUHwfAKQVmZdijxlBSIwLyAgDNJ9gfq1egIBrlUNg9JagA+Po67+hEx9DETgcdT3Ad9VZg/qTw+0QatbCBBMvukuwH34H6L+GZbMcXcrPTG0AfsbD1eMks0vcs9hMOc2DIymCAgMQIZPS8gqw/WxorP/CKaPXxE7IgRFV4Yjvh9LIwSELWgn6NyIdrVWFJfXj4CyPku+eRsgZ1ytDFfZqZs3kPvol4CuMYyA6+Woy+B+EiCj66peDIs+AP0D4pvJoemXoGUgnhaRSHMg1LcV5JU7DlkDEkbWJZPBcDm9EXlSn4QtGXpd9rj4PGI0AzQuEkcsLkfJlzp8sChHb5ZNaXmfQh7nKI1P38CDNAcNjwfaJGbHXFbnnofRE+P6IuQ1OrFTvxF0ZYYX05A3DGK/EjNxj+RC0A0RhV4LWT+CuI/S2PQILM97O0dQRqKD5yip6MmUPFs5OOGgobHpFlie5yTzlwh5OOSp38dGU2YEMs8Tsldc7DnQwEMFxhnXdR/KnC1gDQcNLp0h/Pcht455VhSI2HH7OP9oFG1jhfCU/E+e+n1stMusGKuqOU+vewLyC8pJrB8966nfBtvnnv3TfFDj0nJY7OMgyzwl4F0vZHLU5WtDkXK/Qe6lAjaLiry1ABicSJ4vYM1bBWwoEhCW3Q6aImBzdJFmWYQd+++gxnaC0ZGJJ/APiPoZxAn4JtAbIA6QctPXKFH0zdPyxTHjp/kVECfFHanH4nxh3eutHAL8Ct0D4sh2cVKN/Ym6AJnzkgX0WQyBSZB8B4hzu1OHNuyA8PPTETHwNMkicDPEc2L+EdWYTp33nKD9CTqLD5oqRYDzpdtB79l9CHfeYq/oVupVg5UxDs+DJtqfLPpzFeh63miqHAEuhv6QDMg0MOdXbooqNAhMsfsQMvn7Pp530lQPAofsPqQeE1SrjcDJZEDm2Ll6XzkCW5MB4Z60pvoQeC0ZkOvqs6X1mrmUst4OCEdcV7celnoA4MTwQdBxOyB9YDRiz6AezES1PgHpPAMw5g+HaYcuirlT+CrkrDS59onEfsPUayUIHIaWZaCXXNo+R4ZuOMljcAw4vwzidkdHMjN1rs1zpVfidGKH0pYxuDV+ELQdNAh6G8SDF5mJ8w/f1sGmpoccMuEMz3ygQECeDFfXIeEicKSOAbHl8wxxoxI7Fp8WogflKgrrV54BadpR0mcqwi+qGm6yc7cwr4XsQxmWjZ30sHUC0ZvwnBcM5i9J1Iv1OOSp38dGU2YEMrkD18j0EKw2jriuIygjMSTWH+ykvDKvegTk3pR6MVhrPHS7XhIXf1EMw+qU8W0OKN8hP7n3HsNe9keHcnS7QHfxG/+jTwKb90tYdroSiW+yC9gy/M8gT+KzKuF7psx3MoB5F3lmeSVTSInMLRl6iwaESxMzStjQlVXoyEbQXyACwcWvPaAXQFNBEolL/UVBd5XnkP02CSPbJNN3ZcAVBJu/vE3ASfjKVncEZINa9n4D5Eh9UiV870qZSyMFgwf6JH6A2pWgSRq1I0JAuAXQJ2lkW2QPwNGynydTjyc0FrYFMGk/10cIyHPSRrZF/nQ4ejQwIPzpl30woy3Yifipf2pcBNZyQntQbRhk+oGiV7as/nKqtVYaAvx1b9Eg2OXvTxOqvPIIDAYEZF15tVozDYFeME+A7Dfe934b6k1OE6q88gjw3KpvAOxy3BaYWV6t1kxDgCciD4BsoH3u+UP6uWkClReGwN2o7hOAZJnHwtRqbRcCm5GRBDvvudX/etUFZAz+LAjhulNeAOz8XSgvtSkWw6dGyyh6ooQruLMb7XGXG78b9vHtZyvxaSl3dbk/jTdvPzywP0dZ96sb720DHFjrERCuUT0N0m3Y0YBKLmU/DB08wbIAxPNSPKqzF8R5Ca87QUMg8jUpAoqAIqAIKAKKgCKgCCgCggj8D5a+B+MSft8CAAAAAElFTkSuQmCC" }))), Ho = Ce(Z2), K2 = "FlightMatrix-module__flightMatrixModal___6q6KO", Y2 = "FlightMatrix-module__flightMatrix___fnPuY", J2 = "FlightMatrix-module__flightMatrixHeader___mt1zm", X2 = "FlightMatrix-module__flightMatrixAction___dh0BA", e3 = "FlightMatrix-module__flightMatrixCalendar___OaqAi", t3 = "FlightMatrix-module__flightMatrixCalendarHeader___ktZH8", r3 = "FlightMatrix-module__toggleWrap___HnVpK", n3 = "FlightMatrix-module__toggleLabel___RVuib", i3 = "FlightMatrix-module__labelText___SquBY", a3 = "FlightMatrix-module__departControls___oyFMB", o3 = "FlightMatrix-module__controlWrapCol___u4lVs", s3 = "FlightMatrix-module__controlLabel___3zCzP", l3 = "FlightMatrix-module__rotate___Q-dTv", c3 = "FlightMatrix-module__calendarArrowIcon___8LzUO", u3 = "FlightMatrix-module__calendarArrowButton___yv0Hi", d3 = "FlightMatrix-module__flightMatrixCalendarWrap___TPY74", h3 = "FlightMatrix-module__flightMatrixCalendarNav___ulfkG", f3 = "FlightMatrix-module__row___YYfwW", p3 = "FlightMatrix-module__dateCell___fMaq2", _3 = "FlightMatrix-module__dateCellDayWeek___pk03q", g3 = "FlightMatrix-module__dateCellDayOff___Ukkmk", m3 = "FlightMatrix-module__dateCellDay___39l46", v3 = "FlightMatrix-module__itemCell___sOQeB", y3 = "FlightMatrix-module__isSelected___YR5Mp", b3 = "FlightMatrix-module__isTarget___COrkv", C3 = "FlightMatrix-module__flightMatrixTop20___xnDIv", w3 = "FlightMatrix-module__buttonDisabled___rg7xL", T3 = "FlightMatrix-module__flightMatrixFooter___CeF0P", k3 = "FlightMatrix-module__flightMatrixInfo___Gzl0Z", N3 = "FlightMatrix-module__subtitle___aZqdf", x3 = "FlightMatrix-module__iconLeft___rJp39", F3 = "FlightMatrix-module__iconRight___1-IGj", E3 = "FlightMatrix-module__iconTop___ZK7ZN", M3 = "FlightMatrix-module__iconButton___dgxPY", oe = {
  flightMatrixModal: K2,
  flightMatrix: Y2,
  flightMatrixHeader: J2,
  flightMatrixAction: X2,
  flightMatrixCalendar: e3,
  flightMatrixCalendarHeader: t3,
  toggleWrap: r3,
  toggleLabel: n3,
  labelText: i3,
  departControls: a3,
  controlWrapCol: o3,
  controlLabel: s3,
  rotate: l3,
  calendarArrowIcon: c3,
  calendarArrowButton: u3,
  flightMatrixCalendarWrap: d3,
  flightMatrixCalendarNav: h3,
  row: f3,
  dateCell: p3,
  dateCellDayWeek: _3,
  dateCellDayOff: g3,
  dateCellDay: m3,
  itemCell: v3,
  isSelected: y3,
  isTarget: b3,
  flightMatrixTop20: C3,
  buttonDisabled: w3,
  flightMatrixFooter: T3,
  flightMatrixInfo: k3,
  subtitle: N3,
  iconLeft: x3,
  iconRight: F3,
  iconTop: E3,
  iconButton: M3
}, S3 = ({
  load: t,
  prices: e,
  initialDepartureStartDate: r,
  initialReturnStartDate: n,
  daysRange: i = 3,
  direct: a,
  withBaggage: s,
  onDatesChange: l,
  onClose: c,
  onSelectDate: u
}) => {
  const d = ["Sat", "Sun"], { t: h, i18n: f } = Y(), p = Zr(f.language), m = nu(f.language), { priceFormatter: y } = Ze(), [v, g] = Pe(null), [b, C] = Pe(null), [x, N] = Pe(r), [T, M] = Pe(n), [S, R] = Pe(r), [$, V] = Pe(null), [J, F] = Pe(null), I = Go(x, i);
  let O = null;
  T && (O = Go(T, i));
  const H = Q(a), W = Q(s), se = (j) => {
    g(j);
  }, L = () => {
    g(null);
  }, X = (j, he) => {
    C(j), g(he);
  }, Me = () => {
    C(null);
  }, me = (j, he) => b === null || v === null ? !1 : he === v && j <= b || j === b && he >= v, Fe = (j, he) => S == null ? !1 : he == null ? Mt(j, S) === 0 : Rr(
    () => Mt(j, S) === 0 && Mt(he, $) === 0,
    [S, $, j, he]
  );
  re(() => {
    n && V(n);
  }, []);
  const P = (j, he, Je, Le, lt, q) => {
    const G = j instanceof Date ? j : new Date(j), ue = Je === "prev" ? pa(G, 1) : br(G, 1);
    he(ue), q && q(he === N ? {
      departureDate: ue,
      returnDate: lt,
      direct: H.value,
      withBaggage: W.value
    } : {
      departureDate: Le,
      returnDate: ue,
      direct: H.value,
      withBaggage: W.value
    });
  }, E = Rr(
    () => A3(e, I, O),
    [e, I, O]
  ), U = Y3(E), Z = (j) => j !== null && j !== -1 && U.has(j), K = (j) => {
    j.price !== -1 && (R(j.departure), j.return && V(j.return), j.price !== null ? F(j.price) : F(-1));
  };
  re(() => {
  }, [JSON.stringify(_.search.params)]);
  const z = Rr(() => O == null ? !1 : Mt(O[0], I[0]) <= 0, [I, O]), de = Rr(() => x == null ? !1 : Mt(x, /* @__PURE__ */ new Date()) <= i, [x]), D = (j) => j == null ? "-" : y.format(j, !1, !0);
  re(() => {
    l && l({
      departureDate: x,
      returnDate: T,
      direct: H.value,
      withBaggage: W.value
    });
  }, [H.value, W.value]);
  const ne = () => {
    c != null && c();
  }, le = (j) => {
    j.stopPropagation();
  }, ve = () => {
    J != null && S != null && (ne(), u(S, $));
  };
  return /* @__PURE__ */ o("div", { className: oe.flightMatrixModal, onClick: ne, children: /* @__PURE__ */ o("div", { className: oe.flightMatrix, onClick: le, children: [
    /* @__PURE__ */ o("div", { className: oe.flightMatrixHeader, children: [
      /* @__PURE__ */ o("h3", { children: h("flightmatrix.price_grid") }),
      /* @__PURE__ */ o("button", { className: oe.closeButton, onClick: c, children: /* @__PURE__ */ o(el, {}) })
    ] }),
    /* @__PURE__ */ o("div", { className: oe.flightMatrixCalendar, children: [
      /* @__PURE__ */ o("div", { className: oe.flightMatrixCalendarHeader, children: [
        /* @__PURE__ */ o("div", { className: oe.toggleWrap, children: [
          /* @__PURE__ */ o("label", { className: oe.toggleLabel, children: [
            /* @__PURE__ */ o("span", { className: oe.labelText, children: h("flightmatrix.only_direct_flights") }),
            /* @__PURE__ */ o(gt, { value: H, size: "large" })
          ] }),
          /* @__PURE__ */ o("label", { className: oe.toggleLabel, children: [
            /* @__PURE__ */ o("span", { className: oe.labelText, children: h("flightmatrix.baggage_included") }),
            /* @__PURE__ */ o(gt, { value: W, size: "large" })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: oe.departControls, children: [
          /* @__PURE__ */ o("span", { className: oe.controlLabel, children: [
            h("flights.depart"),
            /* @__PURE__ */ o(Ho, { className: oe.rotate })
          ] }),
          /* @__PURE__ */ o(
            "button",
            {
              className: B(
                oe.calendarArrowButton,
                de ? oe.buttonDisabled : ""
              ),
              disabled: de,
              onClick: () => P(
                x,
                N,
                "prev",
                x,
                T,
                l
              ),
              children: /* @__PURE__ */ o(Tn, { className: B(oe.calendarArrowIcon, oe.iconLeft) })
            }
          ),
          /* @__PURE__ */ o(
            "button",
            {
              className: B(
                oe.calendarArrowButton,
                z ? oe.buttonDisabled : ""
              ),
              onClick: () => P(
                x,
                N,
                "next",
                x,
                T,
                l
              ),
              disabled: z,
              children: /* @__PURE__ */ o(Tn, { className: B(oe.calendarArrowIcon, oe.iconRight) })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: oe.flightMatrixCalendarWrap, children: [
        /* @__PURE__ */ o("div", { className: oe.row, children: I.map((j, he) => /* @__PURE__ */ o(
          "div",
          {
            className: `${oe.dateCell} ${he === v ? oe.isSelected : ""}`,
            onMouseEnter: () => se(he),
            onMouseLeave: L,
            children: [
              /* @__PURE__ */ o(
                "div",
                {
                  className: B(
                    oe.dateCellDayWeek,
                    d.includes($e(j instanceof Date ? j : new Date(j), "EE")) ? oe.dateCellDayOff : ""
                  ),
                  children: $e(j instanceof Date ? j : new Date(j), m(), {
                    locale: p
                  })
                }
              ),
              /* @__PURE__ */ o("div", { className: oe.dateCellDay, children: $e(j instanceof Date ? j : new Date(j), "dd MMM", {
                locale: p
              }) })
            ]
          },
          he
        )) }),
        /* @__PURE__ */ o("div", { className: oe.flightMatrixCalendarNav, children: [
          /* @__PURE__ */ o("div", { className: "", children: (O ?? [null]).map((j, he) => /* @__PURE__ */ o("div", { className: oe.row, children: [
            I.map((Je, Le) => {
              const lt = me(he, Le), q = Fe(Je, j);
              return /* @__PURE__ */ o(
                "div",
                {
                  className: B(
                    oe.itemCell,
                    lt ? oe.isSelected : "",
                    q ? oe.isTarget : "",
                    S ? "" : oe.isTarget,
                    Z(E[he][Le]) ? oe.flightMatrixTop20 : ""
                  ),
                  onClick: () => K({
                    departure: Je,
                    return: j,
                    price: E[he][Le]
                  }),
                  onMouseEnter: () => X(he, Le),
                  onMouseLeave: Me,
                  children: E[he][Le] === -1 ? "—" : E[he][Le] !== null ? D(E[he][Le]) : t ? /* @__PURE__ */ o(Ae, { height: "1.2rem", margin: "10px" }) : /* @__PURE__ */ o(rl, {})
                },
                he + "-" + Le
              );
            }),
            j ? /* @__PURE__ */ o(
              "div",
              {
                className: `${oe.dateCell} ${he === b ? oe.isSelected : ""}`,
                children: [
                  /* @__PURE__ */ o(
                    "div",
                    {
                      className: B(
                        oe.dateCellDayWeek,
                        d.includes(
                          $e(
                            j instanceof Date ? j : new Date(j),
                            "EE"
                          )
                        ) ? oe.dateCellDayOff : ""
                      ),
                      children: $e(
                        j instanceof Date ? j : new Date(j),
                        m(),
                        {
                          locale: p
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ o("div", { className: oe.dateCellDay, children: $e(
                    j instanceof Date ? j : new Date(j),
                    "dd MMM",
                    { locale: p }
                  ) })
                ]
              }
            ) : null
          ] }, he)) }),
          O ? /* @__PURE__ */ o("div", { className: oe.controlWrapCol, children: [
            /* @__PURE__ */ o(
              "button",
              {
                className: B(
                  oe.calendarArrowButton,
                  z ? oe.buttonDisabled : ""
                ),
                onClick: () => P(
                  T,
                  M,
                  "prev",
                  x,
                  T,
                  l
                ),
                disabled: z,
                children: /* @__PURE__ */ o(
                  Tn,
                  {
                    className: B(oe.calendarArrowIcon, oe.iconTop)
                  }
                )
              }
            ),
            /* @__PURE__ */ o(
              "button",
              {
                className: oe.calendarArrowButton,
                onClick: () => P(
                  T,
                  M,
                  "next",
                  x,
                  T,
                  l
                ),
                children: /* @__PURE__ */ o(
                  Tn,
                  {
                    className: B(oe.calendarArrowIcon, oe.iconButton)
                  }
                )
              }
            ),
            /* @__PURE__ */ o("span", { className: oe.controlLabel, children: [
              h("flights.return"),
              /* @__PURE__ */ o(Ho, {})
            ] })
          ] }) : null
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: oe.flightMatrixFooter, children: [
      /* @__PURE__ */ o(Ge, { onClick: ve, children: h("defaultsearch.search_flights") }),
      /* @__PURE__ */ o("div", { className: oe.flightMatrixInfo, children: J ? /* @__PURE__ */ o(Ie, { children: [
        /* @__PURE__ */ o("span", { children: [
          $e(
            S instanceof Date ? S : new Date(S),
            "EEE, MMM dd",
            {
              locale: p
            }
          ),
          " ",
          $ ? " - " + $e(
            $ instanceof Date ? $ : new Date($),
            "EEE, MMM dd",
            {
              locale: p
            }
          ) : null
        ] }),
        J != -1 ? /* @__PURE__ */ o("span", { className: oe.subtitle, children: D(J) }) : null
      ] }) : /* @__PURE__ */ o("span", { children: h("flightmatrix.select_a_flight") }) })
    ] })
  ] }) });
}, A3 = (t, e, r) => {
  const n = Array.from(
    { length: r == null ? 1 : r.length },
    () => Array(e.length).fill(null)
  );
  if (r) {
    for (let i = 0; i < e.length; i++) {
      const a = e[i];
      for (let s = 0; s < r.length; s++) {
        const l = r[s];
        Mt(a, l) > 0 && (n[s][i] = -1);
      }
    }
    t.forEach((i) => {
      const a = new Date(i.depart_date), s = new Date(i.return_date), l = Mt(a, e[0]), c = Mt(s, r[0]);
      l >= 0 && c >= 0 && l < e.length && c < r.length && (n[c][l] = i.value);
    });
  } else
    t.forEach((i) => {
      const a = new Date(i.depart_date), s = Mt(a, e[0]);
      s >= 0 && s < e.length && (n[0][s] = i.value);
    });
  return n;
}, pl = (t, e, r, n, i, a) => {
  const { i18n: s, t: l } = Y(), c = Zr(a), u = [];
  for (let d = -n; d <= i; d++) {
    const h = br(_t(t), d), f = e == null ? null : br(_t(e), d), p = $e(_t(h), "yyyy-MM-dd"), m = f == null ? null : $e(_t(f), "yyyy-MM-dd");
    let y = null;
    e != null ? y = r.find(
      (g) => g.depart_date === p && g.return_date === m
    ) : y = r.find((g) => g.depart_date === p);
    const v = (g, b) => {
      if (!g) return "";
      const C = s.language === "en" ? "MMM" : "M", x = g ? $e(_t(g), C, {
        locale: b
      }) : "";
      return s.language != "en" ? l(`datepicker.short_months.${x}`) : x;
    };
    u.push({
      dateStart: h,
      dateEnd: f,
      start: h.getDate(),
      monthStart: v(h, c),
      end: f == null ? null : f.getDate(),
      monthEnd: f == null ? null : v(f, c),
      price: y ? y.value : null
    });
  }
  return u;
}, I3 = "FlightMatrixMobile-module__flightMatrixMobile___lRgkf", D3 = "FlightMatrixMobile-module__dateCell___9iO2K", O3 = "FlightMatrixMobile-module__dateCellDay___OvUUg", L3 = "FlightMatrixMobile-module__dateCellPrice___6nmqi", ai = {
  flightMatrixMobile: I3,
  dateCell: D3,
  dateCellDay: O3,
  dateCellPrice: L3
}, R3 = ({
  prices: t,
  start: e,
  end: r,
  onSelectDate: n
}) => {
  const { i18n: i } = Y(), a = pl(e, r, t, 1, 1, i.language), { priceFormatter: s } = Ze(), l = (c) => c == null ? "-" : s.format(c);
  return /* @__PURE__ */ o("div", { className: ai.flightMatrixMobile, children: a.map((c, u) => /* @__PURE__ */ o(
    "div",
    {
      className: ai.dateCell,
      onClick: () => n(c.dateStart, c.dateEnd),
      children: [
        /* @__PURE__ */ o("div", { className: ai.dateCellDay, children: [
          c.monthStart,
          ", ",
          c.start,
          " ",
          c.monthEnd != null ? "-" : "",
          c.monthEnd != null ? c.monthStart == c.monthEnd ? "" : `${c.monthEnd},` : "",
          " ",
          c.end
        ] }),
        /* @__PURE__ */ o("div", { className: ai.dateCellPrice, children: l(c.price) })
      ]
    },
    u
  )) });
}, P3 = "FlightMatrixDesktop-module__root___JW4SL", B3 = "FlightMatrixDesktop-module__flightMatrixButton___hopnG", $3 = "FlightMatrixDesktop-module__dateCellList___ekB31", j3 = "FlightMatrixDesktop-module__dateCell___57Rjb", V3 = "FlightMatrixDesktop-module__dateCellCurrent___ryXRC", q3 = "FlightMatrixDesktop-module__dateCellPrice___64gXk", U3 = "FlightMatrixDesktop-module__dateCellDay___d7tMF", Q3 = "FlightMatrixDesktop-module__flightMatrixShowIcon___QvJ57", W3 = "FlightMatrixDesktop-module__noPriceIcon___kTy7n", z3 = "FlightMatrixDesktop-module__buttonBox___UhtII", H3 = "FlightMatrixDesktop-module__showButton___fwthE", ht = {
  root: P3,
  flightMatrixButton: B3,
  dateCellList: $3,
  dateCell: j3,
  dateCellCurrent: V3,
  dateCellPrice: q3,
  dateCellDay: U3,
  flightMatrixShowIcon: Q3,
  noPriceIcon: W3,
  buttonBox: z3,
  showButton: H3
}, G3 = (t, e) => /* @__PURE__ */ w("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: e, ...t }, /* @__PURE__ */ w("path", { d: "M6 3C4.34315 3 3 4.34315 3 6V7H21V6C21 4.34315 19.6569 3 18 3H6Z" }), /* @__PURE__ */ w("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M21 8.5H3V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V8.5ZM13 14C13 13.4477 13.4477 13 14 13H16C16.5523 13 17 13.4477 17 14V16C17 16.5523 16.5523 17 16 17H14C13.4477 17 13 16.5523 13 16V14Z" })), Z3 = Ce(G3), K3 = ({
  prices: t,
  start: e,
  end: r,
  onSelectDate: n,
  onClickButton: i
}) => {
  const { i18n: a } = Y(), { t: s } = Y(), l = pl(e, r, t, 2, 4, a.language), { priceFormatter: c } = Ze(), u = (d) => d == null ? /* @__PURE__ */ o(rl, { className: ht.noPriceIcon }) : c.format(d);
  return /* @__PURE__ */ o("div", { className: ht.root, children: [
    /* @__PURE__ */ o("div", { className: ht.flightMatrixButton, children: [
      /* @__PURE__ */ o(Z3, { className: ht.flightMatrixShowIcon }),
      s("flightfilters.prices_for_nearby_dates")
    ] }),
    /* @__PURE__ */ o("div", { className: ht.dateCellList, children: l.map((d, h) => /* @__PURE__ */ o(
      "div",
      {
        className: `${ht.dateCell} ${h === 2 ? ht.dateCellCurrent : ""}`,
        onClick: () => n(d.dateStart, d.dateEnd),
        children: [
          /* @__PURE__ */ o("div", { className: ht.dateCellPrice, children: u(d.price) }),
          /* @__PURE__ */ o("div", { className: ht.dateCellDay, children: [
            d.monthStart,
            ", ",
            d.start,
            " ",
            d.monthEnd != null ? "-" : "",
            d.monthEnd != null ? d.monthStart == d.monthEnd ? "" : `${d.monthEnd},` : "",
            " ",
            d.end
          ] })
        ]
      },
      h
    )) }),
    /* @__PURE__ */ o("div", { className: ht.buttonBox, children: /* @__PURE__ */ o(Ge, { className: ht.showButton, variant: "secondary", onClick: i, children: s("flightmatrix.show") }) })
  ] });
}, Go = (t, e) => {
  const r = e * 2 + 1;
  return Array.from(
    { length: r },
    (n, i) => br(t instanceof Date ? t : new Date(t), i - e)
  );
}, Y3 = (t) => {
  const r = t.flat().filter((a) => a !== null && a !== -1).sort((a, s) => a - s), n = Math.ceil(r.length * 0.2), i = r[n - 1];
  return new Set(r.filter((a) => a <= i));
};
var Yi = "Invariant Violation", Zo = Object.setPrototypeOf, J3 = Zo === void 0 ? function(t, e) {
  return t.__proto__ = e, t;
} : Zo, _l = (
  /** @class */
  function(t) {
    Ct(e, t);
    function e(r) {
      r === void 0 && (r = Yi);
      var n = t.call(this, typeof r == "number" ? Yi + ": " + r + " (see https://github.com/apollographql/invariant-packages)" : r) || this;
      return n.framesToPop = 1, n.name = Yi, J3(n, e.prototype), n;
    }
    return e;
  }(Error)
);
function yr(t, e) {
  if (!t)
    throw new _l(e);
}
var gl = ["debug", "log", "warn", "error", "silent"], X3 = gl.indexOf("log");
function oi(t) {
  return function() {
    if (gl.indexOf(t) >= X3) {
      var e = console[t] || console.log;
      return e.apply(console, arguments);
    }
  };
}
(function(t) {
  t.debug = oi("debug"), t.log = oi("log"), t.warn = oi("warn"), t.error = oi("error");
})(yr || (yr = {}));
var to = "3.11.9";
function pt(t) {
  try {
    return t();
  } catch {
  }
}
const Ca = pt(function() {
  return globalThis;
}) || pt(function() {
  return window;
}) || pt(function() {
  return self;
}) || pt(function() {
  return global;
}) || // We don't expect the Function constructor ever to be invoked at runtime, as
// long as at least one of globalThis, window, self, or global is defined, so
// we are under no obligation to make it easy for static analysis tools to
// detect syntactic usage of the Function constructor. If you think you can
// improve your static analysis to detect this obfuscation, think again. This
// is an arms race you cannot win, at least not in JavaScript.
pt(function() {
  return pt.constructor("return this")();
});
var Ko = /* @__PURE__ */ new Map();
function wa(t) {
  var e = Ko.get(t) || 1;
  return Ko.set(t, e + 1), "".concat(t, ":").concat(e, ":").concat(Math.random().toString(36).slice(2));
}
function ml(t, e) {
  e === void 0 && (e = 0);
  var r = wa("stringifyForDisplay");
  return JSON.stringify(t, function(n, i) {
    return i === void 0 ? r : i;
  }, e).split(JSON.stringify(r)).join("<undefined>");
}
function si(t) {
  return function(e) {
    for (var r = [], n = 1; n < arguments.length; n++)
      r[n - 1] = arguments[n];
    if (typeof e == "number") {
      var i = e;
      e = ro(i), e || (e = no(i, r), r = []);
    }
    t.apply(void 0, [e].concat(r));
  };
}
var ce = Object.assign(function(e, r) {
  for (var n = [], i = 2; i < arguments.length; i++)
    n[i - 2] = arguments[i];
  e || yr(e, ro(r, n) || no(r, n));
}, {
  debug: si(yr.debug),
  log: si(yr.log),
  warn: si(yr.warn),
  error: si(yr.error)
});
function Ye(t) {
  for (var e = [], r = 1; r < arguments.length; r++)
    e[r - 1] = arguments[r];
  return new _l(ro(t, e) || no(t, e));
}
var Yo = Symbol.for("ApolloErrorMessageHandler_" + to);
function vl(t) {
  if (typeof t == "string")
    return t;
  try {
    return ml(t, 2).slice(0, 1e3);
  } catch {
    return "<non-serializable>";
  }
}
function ro(t, e) {
  if (e === void 0 && (e = []), !!t)
    return Ca[Yo] && Ca[Yo](t, e.map(vl));
}
function no(t, e) {
  if (e === void 0 && (e = []), !!t)
    return "An error occurred! For more details, see the full error text at https://go.apollo.dev/c/err#".concat(encodeURIComponent(JSON.stringify({
      version: to,
      message: t,
      args: e.map(vl)
    })));
}
function ui(t, e) {
  if (!!!t)
    throw new Error(e);
}
function ey(t) {
  return typeof t == "object" && t !== null;
}
function ty(t, e) {
  if (!!!t)
    throw new Error(
      "Unexpected invariant triggered."
    );
}
const ry = /\r\n|[\n\r]/g;
function Ta(t, e) {
  let r = 0, n = 1;
  for (const i of t.body.matchAll(ry)) {
    if (typeof i.index == "number" || ty(!1), i.index >= e)
      break;
    r = i.index + i[0].length, n += 1;
  }
  return {
    line: n,
    column: e + 1 - r
  };
}
function ny(t) {
  return yl(
    t.source,
    Ta(t.source, t.start)
  );
}
function yl(t, e) {
  const r = t.locationOffset.column - 1, n = "".padStart(r) + t.body, i = e.line - 1, a = t.locationOffset.line - 1, s = e.line + a, l = e.line === 1 ? r : 0, c = e.column + l, u = `${t.name}:${s}:${c}
`, d = n.split(/\r\n|[\n\r]/g), h = d[i];
  if (h.length > 120) {
    const f = Math.floor(c / 80), p = c % 80, m = [];
    for (let y = 0; y < h.length; y += 80)
      m.push(h.slice(y, y + 80));
    return u + Jo([
      [`${s} |`, m[0]],
      ...m.slice(1, f + 1).map((y) => ["|", y]),
      ["|", "^".padStart(p)],
      ["|", m[f + 1]]
    ]);
  }
  return u + Jo([
    // Lines specified like this: ["prefix", "string"],
    [`${s - 1} |`, d[i - 1]],
    [`${s} |`, h],
    ["|", "^".padStart(c)],
    [`${s + 1} |`, d[i + 1]]
  ]);
}
function Jo(t) {
  const e = t.filter(([n, i]) => i !== void 0), r = Math.max(...e.map(([n]) => n.length));
  return e.map(([n, i]) => n.padStart(r) + (i ? " " + i : "")).join(`
`);
}
function iy(t) {
  const e = t[0];
  return e == null || "kind" in e || "length" in e ? {
    nodes: e,
    source: t[1],
    positions: t[2],
    path: t[3],
    originalError: t[4],
    extensions: t[5]
  } : e;
}
class io extends Error {
  /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */
  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */
  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */
  /**
   * The original error thrown from a field resolver during execution.
   */
  /**
   * Extension fields to add to the formatted error.
   */
  /**
   * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
   */
  constructor(e, ...r) {
    var n, i, a;
    const { nodes: s, source: l, positions: c, path: u, originalError: d, extensions: h } = iy(r);
    super(e), this.name = "GraphQLError", this.path = u ?? void 0, this.originalError = d ?? void 0, this.nodes = Xo(
      Array.isArray(s) ? s : s ? [s] : void 0
    );
    const f = Xo(
      (n = this.nodes) === null || n === void 0 ? void 0 : n.map((m) => m.loc).filter((m) => m != null)
    );
    this.source = l ?? (f == null || (i = f[0]) === null || i === void 0 ? void 0 : i.source), this.positions = c ?? (f == null ? void 0 : f.map((m) => m.start)), this.locations = c && l ? c.map((m) => Ta(l, m)) : f == null ? void 0 : f.map((m) => Ta(m.source, m.start));
    const p = ey(
      d == null ? void 0 : d.extensions
    ) ? d == null ? void 0 : d.extensions : void 0;
    this.extensions = (a = h ?? p) !== null && a !== void 0 ? a : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
      message: {
        writable: !0,
        enumerable: !0
      },
      name: {
        enumerable: !1
      },
      nodes: {
        enumerable: !1
      },
      source: {
        enumerable: !1
      },
      positions: {
        enumerable: !1
      },
      originalError: {
        enumerable: !1
      }
    }), d != null && d.stack ? Object.defineProperty(this, "stack", {
      value: d.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, io) : Object.defineProperty(this, "stack", {
      value: Error().stack,
      writable: !0,
      configurable: !0
    });
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
  toString() {
    let e = this.message;
    if (this.nodes)
      for (const r of this.nodes)
        r.loc && (e += `

` + ny(r.loc));
    else if (this.source && this.locations)
      for (const r of this.locations)
        e += `

` + yl(this.source, r);
    return e;
  }
  toJSON() {
    const e = {
      message: this.message
    };
    return this.locations != null && (e.locations = this.locations), this.path != null && (e.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (e.extensions = this.extensions), e;
  }
}
function Xo(t) {
  return t === void 0 || t.length === 0 ? void 0 : t;
}
function je(t, e, r) {
  return new io(`Syntax Error: ${r}`, {
    source: t,
    positions: [e]
  });
}
class ay {
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The Token at which this Node begins.
   */
  /**
   * The Token at which this Node ends.
   */
  /**
   * The Source document the AST represents.
   */
  constructor(e, r, n) {
    this.start = e.start, this.end = r.end, this.startToken = e, this.endToken = r, this.source = n;
  }
  get [Symbol.toStringTag]() {
    return "Location";
  }
  toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  }
}
class bl {
  /**
   * The kind of Token.
   */
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The 1-indexed line number on which this Token appears.
   */
  /**
   * The 1-indexed column number at which this Token begins.
   */
  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */
  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  constructor(e, r, n, i, a, s) {
    this.kind = e, this.start = r, this.end = n, this.line = i, this.column = a, this.value = s, this.prev = null, this.next = null;
  }
  get [Symbol.toStringTag]() {
    return "Token";
  }
  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  }
}
const Cl = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: [
    "name",
    "variableDefinitions",
    "directives",
    "selectionSet"
  ],
  VariableDefinition: ["variable", "type", "defaultValue", "directives"],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "name",
    // Note: fragment variable definitions are deprecated and will removed in v17.0.0
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: [
    "description",
    "name",
    "type",
    "defaultValue",
    "directives"
  ],
  InterfaceTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"]
}, oy = new Set(Object.keys(Cl));
function es(t) {
  const e = t == null ? void 0 : t.kind;
  return typeof e == "string" && oy.has(e);
}
var Br;
(function(t) {
  t.QUERY = "query", t.MUTATION = "mutation", t.SUBSCRIPTION = "subscription";
})(Br || (Br = {}));
var ka;
(function(t) {
  t.QUERY = "QUERY", t.MUTATION = "MUTATION", t.SUBSCRIPTION = "SUBSCRIPTION", t.FIELD = "FIELD", t.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", t.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", t.INLINE_FRAGMENT = "INLINE_FRAGMENT", t.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", t.SCHEMA = "SCHEMA", t.SCALAR = "SCALAR", t.OBJECT = "OBJECT", t.FIELD_DEFINITION = "FIELD_DEFINITION", t.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", t.INTERFACE = "INTERFACE", t.UNION = "UNION", t.ENUM = "ENUM", t.ENUM_VALUE = "ENUM_VALUE", t.INPUT_OBJECT = "INPUT_OBJECT", t.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(ka || (ka = {}));
var ee;
(function(t) {
  t.NAME = "Name", t.DOCUMENT = "Document", t.OPERATION_DEFINITION = "OperationDefinition", t.VARIABLE_DEFINITION = "VariableDefinition", t.SELECTION_SET = "SelectionSet", t.FIELD = "Field", t.ARGUMENT = "Argument", t.FRAGMENT_SPREAD = "FragmentSpread", t.INLINE_FRAGMENT = "InlineFragment", t.FRAGMENT_DEFINITION = "FragmentDefinition", t.VARIABLE = "Variable", t.INT = "IntValue", t.FLOAT = "FloatValue", t.STRING = "StringValue", t.BOOLEAN = "BooleanValue", t.NULL = "NullValue", t.ENUM = "EnumValue", t.LIST = "ListValue", t.OBJECT = "ObjectValue", t.OBJECT_FIELD = "ObjectField", t.DIRECTIVE = "Directive", t.NAMED_TYPE = "NamedType", t.LIST_TYPE = "ListType", t.NON_NULL_TYPE = "NonNullType", t.SCHEMA_DEFINITION = "SchemaDefinition", t.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", t.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", t.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", t.FIELD_DEFINITION = "FieldDefinition", t.INPUT_VALUE_DEFINITION = "InputValueDefinition", t.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", t.UNION_TYPE_DEFINITION = "UnionTypeDefinition", t.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", t.ENUM_VALUE_DEFINITION = "EnumValueDefinition", t.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", t.DIRECTIVE_DEFINITION = "DirectiveDefinition", t.SCHEMA_EXTENSION = "SchemaExtension", t.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", t.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", t.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", t.UNION_TYPE_EXTENSION = "UnionTypeExtension", t.ENUM_TYPE_EXTENSION = "EnumTypeExtension", t.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ee || (ee = {}));
function Na(t) {
  return t === 9 || t === 32;
}
function Rn(t) {
  return t >= 48 && t <= 57;
}
function wl(t) {
  return t >= 97 && t <= 122 || // A-Z
  t >= 65 && t <= 90;
}
function Tl(t) {
  return wl(t) || t === 95;
}
function sy(t) {
  return wl(t) || Rn(t) || t === 95;
}
function ly(t) {
  var e;
  let r = Number.MAX_SAFE_INTEGER, n = null, i = -1;
  for (let s = 0; s < t.length; ++s) {
    var a;
    const l = t[s], c = cy(l);
    c !== l.length && (n = (a = n) !== null && a !== void 0 ? a : s, i = s, s !== 0 && c < r && (r = c));
  }
  return t.map((s, l) => l === 0 ? s : s.slice(r)).slice(
    (e = n) !== null && e !== void 0 ? e : 0,
    i + 1
  );
}
function cy(t) {
  let e = 0;
  for (; e < t.length && Na(t.charCodeAt(e)); )
    ++e;
  return e;
}
function uy(t, e) {
  const r = t.replace(/"""/g, '\\"""'), n = r.split(/\r\n|[\n\r]/g), i = n.length === 1, a = n.length > 1 && n.slice(1).every((p) => p.length === 0 || Na(p.charCodeAt(0))), s = r.endsWith('\\"""'), l = t.endsWith('"') && !s, c = t.endsWith("\\"), u = l || c, d = (
    // add leading and trailing new lines only if it improves readability
    !i || t.length > 70 || u || a || s
  );
  let h = "";
  const f = i && Na(t.charCodeAt(0));
  return (d && !f || a) && (h += `
`), h += r, (d || u) && (h += `
`), '"""' + h + '"""';
}
var A;
(function(t) {
  t.SOF = "<SOF>", t.EOF = "<EOF>", t.BANG = "!", t.DOLLAR = "$", t.AMP = "&", t.PAREN_L = "(", t.PAREN_R = ")", t.SPREAD = "...", t.COLON = ":", t.EQUALS = "=", t.AT = "@", t.BRACKET_L = "[", t.BRACKET_R = "]", t.BRACE_L = "{", t.PIPE = "|", t.BRACE_R = "}", t.NAME = "Name", t.INT = "Int", t.FLOAT = "Float", t.STRING = "String", t.BLOCK_STRING = "BlockString", t.COMMENT = "Comment";
})(A || (A = {}));
class dy {
  /**
   * The previously focused non-ignored token.
   */
  /**
   * The currently focused non-ignored token.
   */
  /**
   * The (1-indexed) line containing the current token.
   */
  /**
   * The character offset at which the current line begins.
   */
  constructor(e) {
    const r = new bl(A.SOF, 0, 0, 0, 0);
    this.source = e, this.lastToken = r, this.token = r, this.line = 1, this.lineStart = 0;
  }
  get [Symbol.toStringTag]() {
    return "Lexer";
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */
  advance() {
    return this.lastToken = this.token, this.token = this.lookahead();
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */
  lookahead() {
    let e = this.token;
    if (e.kind !== A.EOF)
      do
        if (e.next)
          e = e.next;
        else {
          const r = fy(this, e.end);
          e.next = r, r.prev = e, e = r;
        }
      while (e.kind === A.COMMENT);
    return e;
  }
}
function hy(t) {
  return t === A.BANG || t === A.DOLLAR || t === A.AMP || t === A.PAREN_L || t === A.PAREN_R || t === A.SPREAD || t === A.COLON || t === A.EQUALS || t === A.AT || t === A.BRACKET_L || t === A.BRACKET_R || t === A.BRACE_L || t === A.PIPE || t === A.BRACE_R;
}
function Kr(t) {
  return t >= 0 && t <= 55295 || t >= 57344 && t <= 1114111;
}
function Ei(t, e) {
  return kl(t.charCodeAt(e)) && Nl(t.charCodeAt(e + 1));
}
function kl(t) {
  return t >= 55296 && t <= 56319;
}
function Nl(t) {
  return t >= 56320 && t <= 57343;
}
function wr(t, e) {
  const r = t.source.body.codePointAt(e);
  if (r === void 0)
    return A.EOF;
  if (r >= 32 && r <= 126) {
    const n = String.fromCodePoint(r);
    return n === '"' ? `'"'` : `"${n}"`;
  }
  return "U+" + r.toString(16).toUpperCase().padStart(4, "0");
}
function Re(t, e, r, n, i) {
  const a = t.line, s = 1 + r - t.lineStart;
  return new bl(e, r, n, a, s, i);
}
function fy(t, e) {
  const r = t.source.body, n = r.length;
  let i = e;
  for (; i < n; ) {
    const a = r.charCodeAt(i);
    switch (a) {
      case 65279:
      case 9:
      case 32:
      case 44:
        ++i;
        continue;
      case 10:
        ++i, ++t.line, t.lineStart = i;
        continue;
      case 13:
        r.charCodeAt(i + 1) === 10 ? i += 2 : ++i, ++t.line, t.lineStart = i;
        continue;
      case 35:
        return py(t, i);
      case 33:
        return Re(t, A.BANG, i, i + 1);
      case 36:
        return Re(t, A.DOLLAR, i, i + 1);
      case 38:
        return Re(t, A.AMP, i, i + 1);
      case 40:
        return Re(t, A.PAREN_L, i, i + 1);
      case 41:
        return Re(t, A.PAREN_R, i, i + 1);
      case 46:
        if (r.charCodeAt(i + 1) === 46 && r.charCodeAt(i + 2) === 46)
          return Re(t, A.SPREAD, i, i + 3);
        break;
      case 58:
        return Re(t, A.COLON, i, i + 1);
      case 61:
        return Re(t, A.EQUALS, i, i + 1);
      case 64:
        return Re(t, A.AT, i, i + 1);
      case 91:
        return Re(t, A.BRACKET_L, i, i + 1);
      case 93:
        return Re(t, A.BRACKET_R, i, i + 1);
      case 123:
        return Re(t, A.BRACE_L, i, i + 1);
      case 124:
        return Re(t, A.PIPE, i, i + 1);
      case 125:
        return Re(t, A.BRACE_R, i, i + 1);
      case 34:
        return r.charCodeAt(i + 1) === 34 && r.charCodeAt(i + 2) === 34 ? by(t, i) : gy(t, i);
    }
    if (Rn(a) || a === 45)
      return _y(t, i, a);
    if (Tl(a))
      return Cy(t, i);
    throw je(
      t.source,
      i,
      a === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : Kr(a) || Ei(r, i) ? `Unexpected character: ${wr(t, i)}.` : `Invalid character: ${wr(t, i)}.`
    );
  }
  return Re(t, A.EOF, n, n);
}
function py(t, e) {
  const r = t.source.body, n = r.length;
  let i = e + 1;
  for (; i < n; ) {
    const a = r.charCodeAt(i);
    if (a === 10 || a === 13)
      break;
    if (Kr(a))
      ++i;
    else if (Ei(r, i))
      i += 2;
    else
      break;
  }
  return Re(
    t,
    A.COMMENT,
    e,
    i,
    r.slice(e + 1, i)
  );
}
function _y(t, e, r) {
  const n = t.source.body;
  let i = e, a = r, s = !1;
  if (a === 45 && (a = n.charCodeAt(++i)), a === 48) {
    if (a = n.charCodeAt(++i), Rn(a))
      throw je(
        t.source,
        i,
        `Invalid number, unexpected digit after 0: ${wr(
          t,
          i
        )}.`
      );
  } else
    i = Ji(t, i, a), a = n.charCodeAt(i);
  if (a === 46 && (s = !0, a = n.charCodeAt(++i), i = Ji(t, i, a), a = n.charCodeAt(i)), (a === 69 || a === 101) && (s = !0, a = n.charCodeAt(++i), (a === 43 || a === 45) && (a = n.charCodeAt(++i)), i = Ji(t, i, a), a = n.charCodeAt(i)), a === 46 || Tl(a))
    throw je(
      t.source,
      i,
      `Invalid number, expected digit but got: ${wr(
        t,
        i
      )}.`
    );
  return Re(
    t,
    s ? A.FLOAT : A.INT,
    e,
    i,
    n.slice(e, i)
  );
}
function Ji(t, e, r) {
  if (!Rn(r))
    throw je(
      t.source,
      e,
      `Invalid number, expected digit but got: ${wr(
        t,
        e
      )}.`
    );
  const n = t.source.body;
  let i = e + 1;
  for (; Rn(n.charCodeAt(i)); )
    ++i;
  return i;
}
function gy(t, e) {
  const r = t.source.body, n = r.length;
  let i = e + 1, a = i, s = "";
  for (; i < n; ) {
    const l = r.charCodeAt(i);
    if (l === 34)
      return s += r.slice(a, i), Re(t, A.STRING, e, i + 1, s);
    if (l === 92) {
      s += r.slice(a, i);
      const c = r.charCodeAt(i + 1) === 117 ? r.charCodeAt(i + 2) === 123 ? my(t, i) : vy(t, i) : yy(t, i);
      s += c.value, i += c.size, a = i;
      continue;
    }
    if (l === 10 || l === 13)
      break;
    if (Kr(l))
      ++i;
    else if (Ei(r, i))
      i += 2;
    else
      throw je(
        t.source,
        i,
        `Invalid character within String: ${wr(
          t,
          i
        )}.`
      );
  }
  throw je(t.source, i, "Unterminated string.");
}
function my(t, e) {
  const r = t.source.body;
  let n = 0, i = 3;
  for (; i < 12; ) {
    const a = r.charCodeAt(e + i++);
    if (a === 125) {
      if (i < 5 || !Kr(n))
        break;
      return {
        value: String.fromCodePoint(n),
        size: i
      };
    }
    if (n = n << 4 | Nn(a), n < 0)
      break;
  }
  throw je(
    t.source,
    e,
    `Invalid Unicode escape sequence: "${r.slice(
      e,
      e + i
    )}".`
  );
}
function vy(t, e) {
  const r = t.source.body, n = ts(r, e + 2);
  if (Kr(n))
    return {
      value: String.fromCodePoint(n),
      size: 6
    };
  if (kl(n) && r.charCodeAt(e + 6) === 92 && r.charCodeAt(e + 7) === 117) {
    const i = ts(r, e + 8);
    if (Nl(i))
      return {
        value: String.fromCodePoint(n, i),
        size: 12
      };
  }
  throw je(
    t.source,
    e,
    `Invalid Unicode escape sequence: "${r.slice(e, e + 6)}".`
  );
}
function ts(t, e) {
  return Nn(t.charCodeAt(e)) << 12 | Nn(t.charCodeAt(e + 1)) << 8 | Nn(t.charCodeAt(e + 2)) << 4 | Nn(t.charCodeAt(e + 3));
}
function Nn(t) {
  return t >= 48 && t <= 57 ? t - 48 : t >= 65 && t <= 70 ? t - 55 : t >= 97 && t <= 102 ? t - 87 : -1;
}
function yy(t, e) {
  const r = t.source.body;
  switch (r.charCodeAt(e + 1)) {
    case 34:
      return {
        value: '"',
        size: 2
      };
    case 92:
      return {
        value: "\\",
        size: 2
      };
    case 47:
      return {
        value: "/",
        size: 2
      };
    case 98:
      return {
        value: "\b",
        size: 2
      };
    case 102:
      return {
        value: "\f",
        size: 2
      };
    case 110:
      return {
        value: `
`,
        size: 2
      };
    case 114:
      return {
        value: "\r",
        size: 2
      };
    case 116:
      return {
        value: "	",
        size: 2
      };
  }
  throw je(
    t.source,
    e,
    `Invalid character escape sequence: "${r.slice(
      e,
      e + 2
    )}".`
  );
}
function by(t, e) {
  const r = t.source.body, n = r.length;
  let i = t.lineStart, a = e + 3, s = a, l = "";
  const c = [];
  for (; a < n; ) {
    const u = r.charCodeAt(a);
    if (u === 34 && r.charCodeAt(a + 1) === 34 && r.charCodeAt(a + 2) === 34) {
      l += r.slice(s, a), c.push(l);
      const d = Re(
        t,
        A.BLOCK_STRING,
        e,
        a + 3,
        // Return a string of the lines joined with U+000A.
        ly(c).join(`
`)
      );
      return t.line += c.length - 1, t.lineStart = i, d;
    }
    if (u === 92 && r.charCodeAt(a + 1) === 34 && r.charCodeAt(a + 2) === 34 && r.charCodeAt(a + 3) === 34) {
      l += r.slice(s, a), s = a + 1, a += 4;
      continue;
    }
    if (u === 10 || u === 13) {
      l += r.slice(s, a), c.push(l), u === 13 && r.charCodeAt(a + 1) === 10 ? a += 2 : ++a, l = "", s = a, i = a;
      continue;
    }
    if (Kr(u))
      ++a;
    else if (Ei(r, a))
      a += 2;
    else
      throw je(
        t.source,
        a,
        `Invalid character within String: ${wr(
          t,
          a
        )}.`
      );
  }
  throw je(t.source, a, "Unterminated string.");
}
function Cy(t, e) {
  const r = t.source.body, n = r.length;
  let i = e + 1;
  for (; i < n; ) {
    const a = r.charCodeAt(i);
    if (sy(a))
      ++i;
    else
      break;
  }
  return Re(
    t,
    A.NAME,
    e,
    i,
    r.slice(e, i)
  );
}
const wy = 10, xl = 2;
function ao(t) {
  return Mi(t, []);
}
function Mi(t, e) {
  switch (typeof t) {
    case "string":
      return JSON.stringify(t);
    case "function":
      return t.name ? `[function ${t.name}]` : "[function]";
    case "object":
      return Ty(t, e);
    default:
      return String(t);
  }
}
function Ty(t, e) {
  if (t === null)
    return "null";
  if (e.includes(t))
    return "[Circular]";
  const r = [...e, t];
  if (ky(t)) {
    const n = t.toJSON();
    if (n !== t)
      return typeof n == "string" ? n : Mi(n, r);
  } else if (Array.isArray(t))
    return xy(t, r);
  return Ny(t, r);
}
function ky(t) {
  return typeof t.toJSON == "function";
}
function Ny(t, e) {
  const r = Object.entries(t);
  return r.length === 0 ? "{}" : e.length > xl ? "[" + Fy(t) + "]" : "{ " + r.map(
    ([i, a]) => i + ": " + Mi(a, e)
  ).join(", ") + " }";
}
function xy(t, e) {
  if (t.length === 0)
    return "[]";
  if (e.length > xl)
    return "[Array]";
  const r = Math.min(wy, t.length), n = t.length - r, i = [];
  for (let a = 0; a < r; ++a)
    i.push(Mi(t[a], e));
  return n === 1 ? i.push("... 1 more item") : n > 1 && i.push(`... ${n} more items`), "[" + i.join(", ") + "]";
}
function Fy(t) {
  const e = Object.prototype.toString.call(t).replace(/^\[object /, "").replace(/]$/, "");
  if (e === "Object" && typeof t.constructor == "function") {
    const r = t.constructor.name;
    if (typeof r == "string" && r !== "")
      return r;
  }
  return e;
}
const Ey = globalThis.process && // eslint-disable-next-line no-undef
process.env.NODE_ENV === "production", My = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  Ey ? function(e, r) {
    return e instanceof r;
  } : function(e, r) {
    if (e instanceof r)
      return !0;
    if (typeof e == "object" && e !== null) {
      var n;
      const i = r.prototype[Symbol.toStringTag], a = (
        // We still need to support constructor's name to detect conflicts with older versions of this library.
        Symbol.toStringTag in e ? e[Symbol.toStringTag] : (n = e.constructor) === null || n === void 0 ? void 0 : n.name
      );
      if (i === a) {
        const s = ao(e);
        throw new Error(`Cannot use ${i} "${s}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
      }
    }
    return !1;
  }
);
class Fl {
  constructor(e, r = "GraphQL request", n = {
    line: 1,
    column: 1
  }) {
    typeof e == "string" || ui(!1, `Body must be a string. Received: ${ao(e)}.`), this.body = e, this.name = r, this.locationOffset = n, this.locationOffset.line > 0 || ui(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || ui(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function Sy(t) {
  return My(t, Fl);
}
function Ay(t, e) {
  return new Iy(t, e).parseDocument();
}
class Iy {
  constructor(e, r = {}) {
    const n = Sy(e) ? e : new Fl(e);
    this._lexer = new dy(n), this._options = r, this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const e = this.expectToken(A.NAME);
    return this.node(e, {
      kind: ee.NAME,
      value: e.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: ee.DOCUMENT,
      definitions: this.many(
        A.SOF,
        this.parseDefinition,
        A.EOF
      )
    });
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   *
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */
  parseDefinition() {
    if (this.peek(A.BRACE_L))
      return this.parseOperationDefinition();
    const e = this.peekDescription(), r = e ? this._lexer.lookahead() : this._lexer.token;
    if (r.kind === A.NAME) {
      switch (r.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
      if (e)
        throw je(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, descriptions are supported only on type definitions."
        );
      switch (r.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
        case "extend":
          return this.parseTypeSystemExtension();
      }
    }
    throw this.unexpected(r);
  }
  // Implements the parsing rules in the Operations section.
  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */
  parseOperationDefinition() {
    const e = this._lexer.token;
    if (this.peek(A.BRACE_L))
      return this.node(e, {
        kind: ee.OPERATION_DEFINITION,
        operation: Br.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const r = this.parseOperationType();
    let n;
    return this.peek(A.NAME) && (n = this.parseName()), this.node(e, {
      kind: ee.OPERATION_DEFINITION,
      operation: r,
      name: n,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * OperationType : one of query mutation subscription
   */
  parseOperationType() {
    const e = this.expectToken(A.NAME);
    switch (e.value) {
      case "query":
        return Br.QUERY;
      case "mutation":
        return Br.MUTATION;
      case "subscription":
        return Br.SUBSCRIPTION;
    }
    throw this.unexpected(e);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      A.PAREN_L,
      this.parseVariableDefinition,
      A.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: ee.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(A.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(A.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const e = this._lexer.token;
    return this.expectToken(A.DOLLAR), this.node(e, {
      kind: ee.VARIABLE,
      name: this.parseName()
    });
  }
  /**
   * ```
   * SelectionSet : { Selection+ }
   * ```
   */
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: ee.SELECTION_SET,
      selections: this.many(
        A.BRACE_L,
        this.parseSelection,
        A.BRACE_R
      )
    });
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */
  parseSelection() {
    return this.peek(A.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const e = this._lexer.token, r = this.parseName();
    let n, i;
    return this.expectOptionalToken(A.COLON) ? (n = r, i = this.parseName()) : i = r, this.node(e, {
      kind: ee.FIELD,
      alias: n,
      name: i,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(A.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(e) {
    const r = e ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(A.PAREN_L, r, A.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(e = !1) {
    const r = this._lexer.token, n = this.parseName();
    return this.expectToken(A.COLON), this.node(r, {
      kind: ee.ARGUMENT,
      name: n,
      value: this.parseValueLiteral(e)
    });
  }
  parseConstArgument() {
    return this.parseArgument(!0);
  }
  // Implements the parsing rules in the Fragments section.
  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */
  parseFragment() {
    const e = this._lexer.token;
    this.expectToken(A.SPREAD);
    const r = this.expectOptionalKeyword("on");
    return !r && this.peek(A.NAME) ? this.node(e, {
      kind: ee.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(e, {
      kind: ee.INLINE_FRAGMENT,
      typeCondition: r ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */
  parseFragmentDefinition() {
    const e = this._lexer.token;
    return this.expectKeyword("fragment"), this._options.allowLegacyFragmentVariables === !0 ? this.node(e, {
      kind: ee.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(e, {
      kind: ee.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentName : Name but not `on`
   */
  parseFragmentName() {
    if (this._lexer.token.value === "on")
      throw this.unexpected();
    return this.parseName();
  }
  // Implements the parsing rules in the Values section.
  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseValueLiteral(e) {
    const r = this._lexer.token;
    switch (r.kind) {
      case A.BRACKET_L:
        return this.parseList(e);
      case A.BRACE_L:
        return this.parseObject(e);
      case A.INT:
        return this.advanceLexer(), this.node(r, {
          kind: ee.INT,
          value: r.value
        });
      case A.FLOAT:
        return this.advanceLexer(), this.node(r, {
          kind: ee.FLOAT,
          value: r.value
        });
      case A.STRING:
      case A.BLOCK_STRING:
        return this.parseStringLiteral();
      case A.NAME:
        switch (this.advanceLexer(), r.value) {
          case "true":
            return this.node(r, {
              kind: ee.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(r, {
              kind: ee.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(r, {
              kind: ee.NULL
            });
          default:
            return this.node(r, {
              kind: ee.ENUM,
              value: r.value
            });
        }
      case A.DOLLAR:
        if (e)
          if (this.expectToken(A.DOLLAR), this._lexer.token.kind === A.NAME) {
            const n = this._lexer.token.value;
            throw je(
              this._lexer.source,
              r.start,
              `Unexpected variable "$${n}" in constant value.`
            );
          } else
            throw this.unexpected(r);
        return this.parseVariable();
      default:
        throw this.unexpected();
    }
  }
  parseConstValueLiteral() {
    return this.parseValueLiteral(!0);
  }
  parseStringLiteral() {
    const e = this._lexer.token;
    return this.advanceLexer(), this.node(e, {
      kind: ee.STRING,
      value: e.value,
      block: e.kind === A.BLOCK_STRING
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */
  parseList(e) {
    const r = () => this.parseValueLiteral(e);
    return this.node(this._lexer.token, {
      kind: ee.LIST,
      values: this.any(A.BRACKET_L, r, A.BRACKET_R)
    });
  }
  /**
   * ```
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   * ```
   */
  parseObject(e) {
    const r = () => this.parseObjectField(e);
    return this.node(this._lexer.token, {
      kind: ee.OBJECT,
      fields: this.any(A.BRACE_L, r, A.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(e) {
    const r = this._lexer.token, n = this.parseName();
    return this.expectToken(A.COLON), this.node(r, {
      kind: ee.OBJECT_FIELD,
      name: n,
      value: this.parseValueLiteral(e)
    });
  }
  // Implements the parsing rules in the Directives section.
  /**
   * Directives[Const] : Directive[?Const]+
   */
  parseDirectives(e) {
    const r = [];
    for (; this.peek(A.AT); )
      r.push(this.parseDirective(e));
    return r;
  }
  parseConstDirectives() {
    return this.parseDirectives(!0);
  }
  /**
   * ```
   * Directive[Const] : @ Name Arguments[?Const]?
   * ```
   */
  parseDirective(e) {
    const r = this._lexer.token;
    return this.expectToken(A.AT), this.node(r, {
      kind: ee.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(e)
    });
  }
  // Implements the parsing rules in the Types section.
  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */
  parseTypeReference() {
    const e = this._lexer.token;
    let r;
    if (this.expectOptionalToken(A.BRACKET_L)) {
      const n = this.parseTypeReference();
      this.expectToken(A.BRACKET_R), r = this.node(e, {
        kind: ee.LIST_TYPE,
        type: n
      });
    } else
      r = this.parseNamedType();
    return this.expectOptionalToken(A.BANG) ? this.node(e, {
      kind: ee.NON_NULL_TYPE,
      type: r
    }) : r;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: ee.NAMED_TYPE,
      name: this.parseName()
    });
  }
  // Implements the parsing rules in the Type Definition section.
  peekDescription() {
    return this.peek(A.STRING) || this.peek(A.BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */
  parseDescription() {
    if (this.peekDescription())
      return this.parseStringLiteral();
  }
  /**
   * ```
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   * ```
   */
  parseSchemaDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("schema");
    const n = this.parseConstDirectives(), i = this.many(
      A.BRACE_L,
      this.parseOperationTypeDefinition,
      A.BRACE_R
    );
    return this.node(e, {
      kind: ee.SCHEMA_DEFINITION,
      description: r,
      directives: n,
      operationTypes: i
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */
  parseOperationTypeDefinition() {
    const e = this._lexer.token, r = this.parseOperationType();
    this.expectToken(A.COLON);
    const n = this.parseNamedType();
    return this.node(e, {
      kind: ee.OPERATION_TYPE_DEFINITION,
      operation: r,
      type: n
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */
  parseScalarTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("scalar");
    const n = this.parseName(), i = this.parseConstDirectives();
    return this.node(e, {
      kind: ee.SCALAR_TYPE_DEFINITION,
      description: r,
      name: n,
      directives: i
    });
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */
  parseObjectTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("type");
    const n = this.parseName(), i = this.parseImplementsInterfaces(), a = this.parseConstDirectives(), s = this.parseFieldsDefinition();
    return this.node(e, {
      kind: ee.OBJECT_TYPE_DEFINITION,
      description: r,
      name: n,
      interfaces: i,
      directives: a,
      fields: s
    });
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(A.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      A.BRACE_L,
      this.parseFieldDefinition,
      A.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const e = this._lexer.token, r = this.parseDescription(), n = this.parseName(), i = this.parseArgumentDefs();
    this.expectToken(A.COLON);
    const a = this.parseTypeReference(), s = this.parseConstDirectives();
    return this.node(e, {
      kind: ee.FIELD_DEFINITION,
      description: r,
      name: n,
      arguments: i,
      type: a,
      directives: s
    });
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */
  parseArgumentDefs() {
    return this.optionalMany(
      A.PAREN_L,
      this.parseInputValueDef,
      A.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const e = this._lexer.token, r = this.parseDescription(), n = this.parseName();
    this.expectToken(A.COLON);
    const i = this.parseTypeReference();
    let a;
    this.expectOptionalToken(A.EQUALS) && (a = this.parseConstValueLiteral());
    const s = this.parseConstDirectives();
    return this.node(e, {
      kind: ee.INPUT_VALUE_DEFINITION,
      description: r,
      name: n,
      type: i,
      defaultValue: a,
      directives: s
    });
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */
  parseInterfaceTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("interface");
    const n = this.parseName(), i = this.parseImplementsInterfaces(), a = this.parseConstDirectives(), s = this.parseFieldsDefinition();
    return this.node(e, {
      kind: ee.INTERFACE_TYPE_DEFINITION,
      description: r,
      name: n,
      interfaces: i,
      directives: a,
      fields: s
    });
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */
  parseUnionTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("union");
    const n = this.parseName(), i = this.parseConstDirectives(), a = this.parseUnionMemberTypes();
    return this.node(e, {
      kind: ee.UNION_TYPE_DEFINITION,
      description: r,
      name: n,
      directives: i,
      types: a
    });
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */
  parseUnionMemberTypes() {
    return this.expectOptionalToken(A.EQUALS) ? this.delimitedMany(A.PIPE, this.parseNamedType) : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */
  parseEnumTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("enum");
    const n = this.parseName(), i = this.parseConstDirectives(), a = this.parseEnumValuesDefinition();
    return this.node(e, {
      kind: ee.ENUM_TYPE_DEFINITION,
      description: r,
      name: n,
      directives: i,
      values: a
    });
  }
  /**
   * ```
   * EnumValuesDefinition : { EnumValueDefinition+ }
   * ```
   */
  parseEnumValuesDefinition() {
    return this.optionalMany(
      A.BRACE_L,
      this.parseEnumValueDefinition,
      A.BRACE_R
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */
  parseEnumValueDefinition() {
    const e = this._lexer.token, r = this.parseDescription(), n = this.parseEnumValueName(), i = this.parseConstDirectives();
    return this.node(e, {
      kind: ee.ENUM_VALUE_DEFINITION,
      description: r,
      name: n,
      directives: i
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseEnumValueName() {
    if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null")
      throw je(
        this._lexer.source,
        this._lexer.token.start,
        `${li(
          this._lexer.token
        )} is reserved and cannot be used for an enum value.`
      );
    return this.parseName();
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */
  parseInputObjectTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("input");
    const n = this.parseName(), i = this.parseConstDirectives(), a = this.parseInputFieldsDefinition();
    return this.node(e, {
      kind: ee.INPUT_OBJECT_TYPE_DEFINITION,
      description: r,
      name: n,
      directives: i,
      fields: a
    });
  }
  /**
   * ```
   * InputFieldsDefinition : { InputValueDefinition+ }
   * ```
   */
  parseInputFieldsDefinition() {
    return this.optionalMany(
      A.BRACE_L,
      this.parseInputValueDef,
      A.BRACE_R
    );
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */
  parseTypeSystemExtension() {
    const e = this._lexer.lookahead();
    if (e.kind === A.NAME)
      switch (e.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    throw this.unexpected(e);
  }
  /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */
  parseSchemaExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("schema");
    const r = this.parseConstDirectives(), n = this.optionalMany(
      A.BRACE_L,
      this.parseOperationTypeDefinition,
      A.BRACE_R
    );
    if (r.length === 0 && n.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: ee.SCHEMA_EXTENSION,
      directives: r,
      operationTypes: n
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */
  parseScalarTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("scalar");
    const r = this.parseName(), n = this.parseConstDirectives();
    if (n.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: ee.SCALAR_TYPE_EXTENSION,
      name: r,
      directives: n
    });
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */
  parseObjectTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("type");
    const r = this.parseName(), n = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), a = this.parseFieldsDefinition();
    if (n.length === 0 && i.length === 0 && a.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: ee.OBJECT_TYPE_EXTENSION,
      name: r,
      interfaces: n,
      directives: i,
      fields: a
    });
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */
  parseInterfaceTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("interface");
    const r = this.parseName(), n = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), a = this.parseFieldsDefinition();
    if (n.length === 0 && i.length === 0 && a.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: ee.INTERFACE_TYPE_EXTENSION,
      name: r,
      interfaces: n,
      directives: i,
      fields: a
    });
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */
  parseUnionTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("union");
    const r = this.parseName(), n = this.parseConstDirectives(), i = this.parseUnionMemberTypes();
    if (n.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: ee.UNION_TYPE_EXTENSION,
      name: r,
      directives: n,
      types: i
    });
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */
  parseEnumTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("enum");
    const r = this.parseName(), n = this.parseConstDirectives(), i = this.parseEnumValuesDefinition();
    if (n.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: ee.ENUM_TYPE_EXTENSION,
      name: r,
      directives: n,
      values: i
    });
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */
  parseInputObjectTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("input");
    const r = this.parseName(), n = this.parseConstDirectives(), i = this.parseInputFieldsDefinition();
    if (n.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: ee.INPUT_OBJECT_TYPE_EXTENSION,
      name: r,
      directives: n,
      fields: i
    });
  }
  /**
   * ```
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   * ```
   */
  parseDirectiveDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("directive"), this.expectToken(A.AT);
    const n = this.parseName(), i = this.parseArgumentDefs(), a = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const s = this.parseDirectiveLocations();
    return this.node(e, {
      kind: ee.DIRECTIVE_DEFINITION,
      description: r,
      name: n,
      arguments: i,
      repeatable: a,
      locations: s
    });
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */
  parseDirectiveLocations() {
    return this.delimitedMany(A.PIPE, this.parseDirectiveLocation);
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */
  parseDirectiveLocation() {
    const e = this._lexer.token, r = this.parseName();
    if (Object.prototype.hasOwnProperty.call(ka, r.value))
      return r;
    throw this.unexpected(e);
  }
  // Core parsing utility functions
  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */
  node(e, r) {
    return this._options.noLocation !== !0 && (r.loc = new ay(
      e,
      this._lexer.lastToken,
      this._lexer.source
    )), r;
  }
  /**
   * Determines if the next token is of a given kind
   */
  peek(e) {
    return this._lexer.token.kind === e;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectToken(e) {
    const r = this._lexer.token;
    if (r.kind === e)
      return this.advanceLexer(), r;
    throw je(
      this._lexer.source,
      r.start,
      `Expected ${El(e)}, found ${li(r)}.`
    );
  }
  /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalToken(e) {
    return this._lexer.token.kind === e ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectKeyword(e) {
    const r = this._lexer.token;
    if (r.kind === A.NAME && r.value === e)
      this.advanceLexer();
    else
      throw je(
        this._lexer.source,
        r.start,
        `Expected "${e}", found ${li(r)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(e) {
    const r = this._lexer.token;
    return r.kind === A.NAME && r.value === e ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(e) {
    const r = e ?? this._lexer.token;
    return je(
      this._lexer.source,
      r.start,
      `Unexpected ${li(r)}.`
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  any(e, r, n) {
    this.expectToken(e);
    const i = [];
    for (; !this.expectOptionalToken(n); )
      i.push(r.call(this));
    return i;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  optionalMany(e, r, n) {
    if (this.expectOptionalToken(e)) {
      const i = [];
      do
        i.push(r.call(this));
      while (!this.expectOptionalToken(n));
      return i;
    }
    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  many(e, r, n) {
    this.expectToken(e);
    const i = [];
    do
      i.push(r.call(this));
    while (!this.expectOptionalToken(n));
    return i;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */
  delimitedMany(e, r) {
    this.expectOptionalToken(e);
    const n = [];
    do
      n.push(r.call(this));
    while (this.expectOptionalToken(e));
    return n;
  }
  advanceLexer() {
    const { maxTokens: e } = this._options, r = this._lexer.advance();
    if (e !== void 0 && r.kind !== A.EOF && (++this._tokenCounter, this._tokenCounter > e))
      throw je(
        this._lexer.source,
        r.start,
        `Document contains more that ${e} tokens. Parsing aborted.`
      );
  }
}
function li(t) {
  const e = t.value;
  return El(t.kind) + (e != null ? ` "${e}"` : "");
}
function El(t) {
  return hy(t) ? `"${t}"` : t;
}
function Dy(t) {
  return `"${t.replace(Oy, Ly)}"`;
}
const Oy = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function Ly(t) {
  return Ry[t.charCodeAt(0)];
}
const Ry = [
  "\\u0000",
  "\\u0001",
  "\\u0002",
  "\\u0003",
  "\\u0004",
  "\\u0005",
  "\\u0006",
  "\\u0007",
  "\\b",
  "\\t",
  "\\n",
  "\\u000B",
  "\\f",
  "\\r",
  "\\u000E",
  "\\u000F",
  "\\u0010",
  "\\u0011",
  "\\u0012",
  "\\u0013",
  "\\u0014",
  "\\u0015",
  "\\u0016",
  "\\u0017",
  "\\u0018",
  "\\u0019",
  "\\u001A",
  "\\u001B",
  "\\u001C",
  "\\u001D",
  "\\u001E",
  "\\u001F",
  "",
  "",
  '\\"',
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 2F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 3F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 4F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\\\",
  "",
  "",
  "",
  // 5F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 6F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\u007F",
  "\\u0080",
  "\\u0081",
  "\\u0082",
  "\\u0083",
  "\\u0084",
  "\\u0085",
  "\\u0086",
  "\\u0087",
  "\\u0088",
  "\\u0089",
  "\\u008A",
  "\\u008B",
  "\\u008C",
  "\\u008D",
  "\\u008E",
  "\\u008F",
  "\\u0090",
  "\\u0091",
  "\\u0092",
  "\\u0093",
  "\\u0094",
  "\\u0095",
  "\\u0096",
  "\\u0097",
  "\\u0098",
  "\\u0099",
  "\\u009A",
  "\\u009B",
  "\\u009C",
  "\\u009D",
  "\\u009E",
  "\\u009F"
], oo = Object.freeze({});
function Ot(t, e, r = Cl) {
  const n = /* @__PURE__ */ new Map();
  for (const g of Object.values(ee))
    n.set(g, Py(e, g));
  let i, a = Array.isArray(t), s = [t], l = -1, c = [], u = t, d, h;
  const f = [], p = [];
  do {
    l++;
    const g = l === s.length, b = g && c.length !== 0;
    if (g) {
      if (d = p.length === 0 ? void 0 : f[f.length - 1], u = h, h = p.pop(), b)
        if (a) {
          u = u.slice();
          let x = 0;
          for (const [N, T] of c) {
            const M = N - x;
            T === null ? (u.splice(M, 1), x++) : u[M] = T;
          }
        } else {
          u = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(u)
          );
          for (const [x, N] of c)
            u[x] = N;
        }
      l = i.index, s = i.keys, c = i.edits, a = i.inArray, i = i.prev;
    } else if (h) {
      if (d = a ? l : s[l], u = h[d], u == null)
        continue;
      f.push(d);
    }
    let C;
    if (!Array.isArray(u)) {
      var m, y;
      es(u) || ui(!1, `Invalid AST Node: ${ao(u)}.`);
      const x = g ? (m = n.get(u.kind)) === null || m === void 0 ? void 0 : m.leave : (y = n.get(u.kind)) === null || y === void 0 ? void 0 : y.enter;
      if (C = x == null ? void 0 : x.call(e, u, d, h, f, p), C === oo)
        break;
      if (C === !1) {
        if (!g) {
          f.pop();
          continue;
        }
      } else if (C !== void 0 && (c.push([d, C]), !g))
        if (es(C))
          u = C;
        else {
          f.pop();
          continue;
        }
    }
    if (C === void 0 && b && c.push([d, u]), g)
      f.pop();
    else {
      var v;
      i = {
        inArray: a,
        index: l,
        keys: s,
        edits: c,
        prev: i
      }, a = Array.isArray(u), s = a ? u : (v = r[u.kind]) !== null && v !== void 0 ? v : [], l = -1, c = [], h && p.push(h), h = u;
    }
  } while (i !== void 0);
  return c.length !== 0 ? c[c.length - 1][1] : t;
}
function Py(t, e) {
  const r = t[e];
  return typeof r == "object" ? r : typeof r == "function" ? {
    enter: r,
    leave: void 0
  } : {
    enter: t.enter,
    leave: t.leave
  };
}
function By(t) {
  return Ot(t, jy);
}
const $y = 80, jy = {
  Name: {
    leave: (t) => t.value
  },
  Variable: {
    leave: (t) => "$" + t.name
  },
  // Document
  Document: {
    leave: (t) => te(t.definitions, `

`)
  },
  OperationDefinition: {
    leave(t) {
      const e = _e("(", te(t.variableDefinitions, ", "), ")"), r = te(
        [
          t.operation,
          te([t.name, e]),
          te(t.directives, " ")
        ],
        " "
      );
      return (r === "query" ? "" : r + " ") + t.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: t, type: e, defaultValue: r, directives: n }) => t + ": " + e + _e(" = ", r) + _e(" ", te(n, " "))
  },
  SelectionSet: {
    leave: ({ selections: t }) => ft(t)
  },
  Field: {
    leave({ alias: t, name: e, arguments: r, directives: n, selectionSet: i }) {
      const a = _e("", t, ": ") + e;
      let s = a + _e("(", te(r, ", "), ")");
      return s.length > $y && (s = a + _e(`(
`, di(te(r, `
`)), `
)`)), te([s, te(n, " "), i], " ");
    }
  },
  Argument: {
    leave: ({ name: t, value: e }) => t + ": " + e
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: t, directives: e }) => "..." + t + _e(" ", te(e, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: t, directives: e, selectionSet: r }) => te(
      [
        "...",
        _e("on ", t),
        te(e, " "),
        r
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: t, typeCondition: e, variableDefinitions: r, directives: n, selectionSet: i }) => (
      // or removed in the future.
      `fragment ${t}${_e("(", te(r, ", "), ")")} on ${e} ${_e("", te(n, " "), " ")}` + i
    )
  },
  // Value
  IntValue: {
    leave: ({ value: t }) => t
  },
  FloatValue: {
    leave: ({ value: t }) => t
  },
  StringValue: {
    leave: ({ value: t, block: e }) => e ? uy(t) : Dy(t)
  },
  BooleanValue: {
    leave: ({ value: t }) => t ? "true" : "false"
  },
  NullValue: {
    leave: () => "null"
  },
  EnumValue: {
    leave: ({ value: t }) => t
  },
  ListValue: {
    leave: ({ values: t }) => "[" + te(t, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: t }) => "{" + te(t, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: t, value: e }) => t + ": " + e
  },
  // Directive
  Directive: {
    leave: ({ name: t, arguments: e }) => "@" + t + _e("(", te(e, ", "), ")")
  },
  // Type
  NamedType: {
    leave: ({ name: t }) => t
  },
  ListType: {
    leave: ({ type: t }) => "[" + t + "]"
  },
  NonNullType: {
    leave: ({ type: t }) => t + "!"
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ description: t, directives: e, operationTypes: r }) => _e("", t, `
`) + te(["schema", te(e, " "), ft(r)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: t, type: e }) => t + ": " + e
  },
  ScalarTypeDefinition: {
    leave: ({ description: t, name: e, directives: r }) => _e("", t, `
`) + te(["scalar", e, te(r, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: t, name: e, interfaces: r, directives: n, fields: i }) => _e("", t, `
`) + te(
      [
        "type",
        e,
        _e("implements ", te(r, " & ")),
        te(n, " "),
        ft(i)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: t, name: e, arguments: r, type: n, directives: i }) => _e("", t, `
`) + e + (rs(r) ? _e(`(
`, di(te(r, `
`)), `
)`) : _e("(", te(r, ", "), ")")) + ": " + n + _e(" ", te(i, " "))
  },
  InputValueDefinition: {
    leave: ({ description: t, name: e, type: r, defaultValue: n, directives: i }) => _e("", t, `
`) + te(
      [e + ": " + r, _e("= ", n), te(i, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: t, name: e, interfaces: r, directives: n, fields: i }) => _e("", t, `
`) + te(
      [
        "interface",
        e,
        _e("implements ", te(r, " & ")),
        te(n, " "),
        ft(i)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: t, name: e, directives: r, types: n }) => _e("", t, `
`) + te(
      ["union", e, te(r, " "), _e("= ", te(n, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: t, name: e, directives: r, values: n }) => _e("", t, `
`) + te(["enum", e, te(r, " "), ft(n)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: t, name: e, directives: r }) => _e("", t, `
`) + te([e, te(r, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: t, name: e, directives: r, fields: n }) => _e("", t, `
`) + te(["input", e, te(r, " "), ft(n)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: t, name: e, arguments: r, repeatable: n, locations: i }) => _e("", t, `
`) + "directive @" + e + (rs(r) ? _e(`(
`, di(te(r, `
`)), `
)`) : _e("(", te(r, ", "), ")")) + (n ? " repeatable" : "") + " on " + te(i, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: t, operationTypes: e }) => te(
      ["extend schema", te(t, " "), ft(e)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: t, directives: e }) => te(["extend scalar", t, te(e, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: t, interfaces: e, directives: r, fields: n }) => te(
      [
        "extend type",
        t,
        _e("implements ", te(e, " & ")),
        te(r, " "),
        ft(n)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: t, interfaces: e, directives: r, fields: n }) => te(
      [
        "extend interface",
        t,
        _e("implements ", te(e, " & ")),
        te(r, " "),
        ft(n)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: t, directives: e, types: r }) => te(
      [
        "extend union",
        t,
        te(e, " "),
        _e("= ", te(r, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: t, directives: e, values: r }) => te(["extend enum", t, te(e, " "), ft(r)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: t, directives: e, fields: r }) => te(["extend input", t, te(e, " "), ft(r)], " ")
  }
};
function te(t, e = "") {
  var r;
  return (r = t == null ? void 0 : t.filter((n) => n).join(e)) !== null && r !== void 0 ? r : "";
}
function ft(t) {
  return _e(`{
`, di(te(t, `
`)), `
}`);
}
function _e(t, e, r = "") {
  return e != null && e !== "" ? t + e + r : "";
}
function di(t) {
  return _e("  ", t.replace(/\n/g, `
  `));
}
function rs(t) {
  var e;
  return (e = t == null ? void 0 : t.some((r) => r.includes(`
`))) !== null && e !== void 0 ? e : !1;
}
function ns(t) {
  return t.kind === ee.FIELD || t.kind === ee.FRAGMENT_SPREAD || t.kind === ee.INLINE_FRAGMENT;
}
function Qn(t, e) {
  var r = t.directives;
  return !r || !r.length ? !0 : Uy(r).every(function(n) {
    var i = n.directive, a = n.ifArgument, s = !1;
    return a.value.kind === "Variable" ? (s = e && e[a.value.name.value], ce(s !== void 0, 70, i.name.value)) : s = a.value.value, i.name.value === "skip" ? !s : s;
  });
}
function Pn(t, e, r) {
  var n = new Set(t), i = n.size;
  return Ot(e, {
    Directive: function(a) {
      if (n.delete(a.name.value) && (!r || !n.size))
        return oo;
    }
  }), r ? !n.size : n.size < i;
}
function Vy(t) {
  return t && Pn(["client", "export"], t, !0);
}
function qy(t) {
  var e = t.name.value;
  return e === "skip" || e === "include";
}
function Uy(t) {
  var e = [];
  return t && t.length && t.forEach(function(r) {
    if (qy(r)) {
      var n = r.arguments, i = r.name.value;
      ce(n && n.length === 1, 71, i);
      var a = n[0];
      ce(a.name && a.name.value === "if", 72, i);
      var s = a.value;
      ce(s && (s.kind === "Variable" || s.kind === "BooleanValue"), 73, i), e.push({ directive: r, ifArgument: a });
    }
  }), e;
}
const Qy = () => /* @__PURE__ */ Object.create(null), { forEach: Wy, slice: is } = Array.prototype, { hasOwnProperty: zy } = Object.prototype;
let Yr = class Ml {
  constructor(e = !0, r = Qy) {
    this.weakness = e, this.makeData = r;
  }
  lookup() {
    return this.lookupArray(arguments);
  }
  lookupArray(e) {
    let r = this;
    return Wy.call(e, (n) => r = r.getChildTrie(n)), zy.call(r, "data") ? r.data : r.data = this.makeData(is.call(e));
  }
  peek() {
    return this.peekArray(arguments);
  }
  peekArray(e) {
    let r = this;
    for (let n = 0, i = e.length; r && n < i; ++n) {
      const a = r.mapFor(e[n], !1);
      r = a && a.get(e[n]);
    }
    return r && r.data;
  }
  remove() {
    return this.removeArray(arguments);
  }
  removeArray(e) {
    let r;
    if (e.length) {
      const n = e[0], i = this.mapFor(n, !1), a = i && i.get(n);
      a && (r = a.removeArray(is.call(e, 1)), !a.data && !a.weak && !(a.strong && a.strong.size) && i.delete(n));
    } else
      r = this.data, delete this.data;
    return r;
  }
  getChildTrie(e) {
    const r = this.mapFor(e, !0);
    let n = r.get(e);
    return n || r.set(e, n = new Ml(this.weakness, this.makeData)), n;
  }
  mapFor(e, r) {
    return this.weakness && Hy(e) ? this.weak || (r ? this.weak = /* @__PURE__ */ new WeakMap() : void 0) : this.strong || (r ? this.strong = /* @__PURE__ */ new Map() : void 0);
  }
};
function Hy(t) {
  switch (typeof t) {
    case "object":
      if (t === null)
        break;
    case "function":
      return !0;
  }
  return !1;
}
var Gy = pt(function() {
  return navigator.product;
}) == "ReactNative", Jr = typeof WeakMap == "function" && !(Gy && !global.HermesInternal), Sl = typeof WeakSet == "function", Al = typeof Symbol == "function" && typeof Symbol.for == "function", Si = Al && Symbol.asyncIterator;
pt(function() {
  return window.document.createElement;
});
pt(function() {
  return navigator.userAgent.indexOf("jsdom") >= 0;
});
function De(t) {
  return t !== null && typeof t == "object";
}
function Zy(t, e) {
  var r = e, n = [];
  t.definitions.forEach(function(a) {
    if (a.kind === "OperationDefinition")
      throw Ye(
        74,
        a.operation,
        a.name ? " named '".concat(a.name.value, "'") : ""
      );
    a.kind === "FragmentDefinition" && n.push(a);
  }), typeof r > "u" && (ce(n.length === 1, 75, n.length), r = n[0].name.value);
  var i = k(k({}, t), { definitions: nt([
    {
      kind: "OperationDefinition",
      // OperationTypeNode is an enum
      operation: "query",
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: {
              kind: "Name",
              value: r
            }
          }
        ]
      }
    }
  ], t.definitions, !0) });
  return i;
}
function Ai(t) {
  t === void 0 && (t = []);
  var e = {};
  return t.forEach(function(r) {
    e[r.name.value] = r;
  }), e;
}
function Ii(t, e) {
  switch (t.kind) {
    case "InlineFragment":
      return t;
    case "FragmentSpread": {
      var r = t.name.value;
      if (typeof e == "function")
        return e(r);
      var n = e && e[r];
      return ce(n, 76, r), n || null;
    }
    default:
      return null;
  }
}
function Ky() {
}
class xa {
  constructor(e = 1 / 0, r = Ky) {
    this.max = e, this.dispose = r, this.map = /* @__PURE__ */ new Map(), this.newest = null, this.oldest = null;
  }
  has(e) {
    return this.map.has(e);
  }
  get(e) {
    const r = this.getNode(e);
    return r && r.value;
  }
  get size() {
    return this.map.size;
  }
  getNode(e) {
    const r = this.map.get(e);
    if (r && r !== this.newest) {
      const { older: n, newer: i } = r;
      i && (i.older = n), n && (n.newer = i), r.older = this.newest, r.older.newer = r, r.newer = null, this.newest = r, r === this.oldest && (this.oldest = i);
    }
    return r;
  }
  set(e, r) {
    let n = this.getNode(e);
    return n ? n.value = r : (n = {
      key: e,
      value: r,
      newer: null,
      older: this.newest
    }, this.newest && (this.newest.newer = n), this.newest = n, this.oldest = this.oldest || n, this.map.set(e, n), n.value);
  }
  clean() {
    for (; this.oldest && this.map.size > this.max; )
      this.delete(this.oldest.key);
  }
  delete(e) {
    const r = this.map.get(e);
    return r ? (r === this.newest && (this.newest = r.older), r === this.oldest && (this.oldest = r.newer), r.newer && (r.newer.older = r.older), r.older && (r.older.newer = r.newer), this.map.delete(e), this.dispose(r.value, e), !0) : !1;
  }
}
function Fa() {
}
const Yy = Fa, Jy = typeof WeakRef < "u" ? WeakRef : function(t) {
  return { deref: () => t };
}, Xy = typeof WeakMap < "u" ? WeakMap : Map, e4 = typeof FinalizationRegistry < "u" ? FinalizationRegistry : function() {
  return {
    register: Fa,
    unregister: Fa
  };
}, t4 = 10024;
class yi {
  constructor(e = 1 / 0, r = Yy) {
    this.max = e, this.dispose = r, this.map = new Xy(), this.newest = null, this.oldest = null, this.unfinalizedNodes = /* @__PURE__ */ new Set(), this.finalizationScheduled = !1, this.size = 0, this.finalize = () => {
      const n = this.unfinalizedNodes.values();
      for (let i = 0; i < t4; i++) {
        const a = n.next().value;
        if (!a)
          break;
        this.unfinalizedNodes.delete(a);
        const s = a.key;
        delete a.key, a.keyRef = new Jy(s), this.registry.register(s, a, a);
      }
      this.unfinalizedNodes.size > 0 ? queueMicrotask(this.finalize) : this.finalizationScheduled = !1;
    }, this.registry = new e4(this.deleteNode.bind(this));
  }
  has(e) {
    return this.map.has(e);
  }
  get(e) {
    const r = this.getNode(e);
    return r && r.value;
  }
  getNode(e) {
    const r = this.map.get(e);
    if (r && r !== this.newest) {
      const { older: n, newer: i } = r;
      i && (i.older = n), n && (n.newer = i), r.older = this.newest, r.older.newer = r, r.newer = null, this.newest = r, r === this.oldest && (this.oldest = i);
    }
    return r;
  }
  set(e, r) {
    let n = this.getNode(e);
    return n ? n.value = r : (n = {
      key: e,
      value: r,
      newer: null,
      older: this.newest
    }, this.newest && (this.newest.newer = n), this.newest = n, this.oldest = this.oldest || n, this.scheduleFinalization(n), this.map.set(e, n), this.size++, n.value);
  }
  clean() {
    for (; this.oldest && this.size > this.max; )
      this.deleteNode(this.oldest);
  }
  deleteNode(e) {
    e === this.newest && (this.newest = e.older), e === this.oldest && (this.oldest = e.newer), e.newer && (e.newer.older = e.older), e.older && (e.older.newer = e.newer), this.size--;
    const r = e.key || e.keyRef && e.keyRef.deref();
    this.dispose(e.value, r), e.keyRef ? this.registry.unregister(e) : this.unfinalizedNodes.delete(e), r && this.map.delete(r);
  }
  delete(e) {
    const r = this.map.get(e);
    return r ? (this.deleteNode(r), !0) : !1;
  }
  scheduleFinalization(e) {
    this.unfinalizedNodes.add(e), this.finalizationScheduled || (this.finalizationScheduled = !0, queueMicrotask(this.finalize));
  }
}
var Xi = /* @__PURE__ */ new WeakSet();
function Il(t) {
  t.size <= (t.max || -1) || Xi.has(t) || (Xi.add(t), setTimeout(function() {
    t.clean(), Xi.delete(t);
  }, 100));
}
var Dl = function(t, e) {
  var r = new yi(t, e);
  return r.set = function(n, i) {
    var a = yi.prototype.set.call(this, n, i);
    return Il(this), a;
  }, r;
}, r4 = function(t, e) {
  var r = new xa(t, e);
  return r.set = function(n, i) {
    var a = xa.prototype.set.call(this, n, i);
    return Il(this), a;
  }, r;
}, n4 = Symbol.for("apollo.cacheSize"), Lt = k({}, Ca[n4]), mr = {};
function Ol(t, e) {
  mr[t] = e;
}
var i4 = globalThis.__DEV__ !== !1 ? l4 : void 0, a4 = globalThis.__DEV__ !== !1 ? c4 : void 0, o4 = globalThis.__DEV__ !== !1 ? Ll : void 0;
function s4() {
  var t = {
    parser: 1e3,
    canonicalStringify: 1e3,
    print: 2e3,
    "documentTransform.cache": 2e3,
    "queryManager.getDocumentInfo": 2e3,
    "PersistedQueryLink.persistedQueryHashes": 2e3,
    "fragmentRegistry.transform": 2e3,
    "fragmentRegistry.lookup": 1e3,
    "fragmentRegistry.findFragmentSpreads": 4e3,
    "cache.fragmentQueryDocuments": 1e3,
    "removeTypenameFromVariables.getVariableDefinitions": 2e3,
    "inMemoryCache.maybeBroadcastWatch": 5e3,
    "inMemoryCache.executeSelectionSet": 5e4,
    "inMemoryCache.executeSubSelectedArray": 1e4
  };
  return Object.fromEntries(Object.entries(t).map(function(e) {
    var r = e[0], n = e[1];
    return [
      r,
      Lt[r] || n
    ];
  }));
}
function l4() {
  var t, e, r, n, i;
  if (globalThis.__DEV__ === !1)
    throw new Error("only supported in development mode");
  return {
    limits: s4(),
    sizes: k({ print: (t = mr.print) === null || t === void 0 ? void 0 : t.call(mr), parser: (e = mr.parser) === null || e === void 0 ? void 0 : e.call(mr), canonicalStringify: (r = mr.canonicalStringify) === null || r === void 0 ? void 0 : r.call(mr), links: Ma(this.link), queryManager: {
      getDocumentInfo: this.queryManager.transformCache.size,
      documentTransforms: Pl(this.queryManager.documentTransform)
    } }, (i = (n = this.cache).getMemoryInternals) === null || i === void 0 ? void 0 : i.call(n))
  };
}
function Ll() {
  return {
    cache: {
      fragmentQueryDocuments: Xt(this.getFragmentDoc)
    }
  };
}
function c4() {
  var t = this.config.fragments;
  return k(k({}, Ll.apply(this)), { addTypenameDocumentTransform: Pl(this.addTypenameTransform), inMemoryCache: {
    executeSelectionSet: Xt(this.storeReader.executeSelectionSet),
    executeSubSelectedArray: Xt(this.storeReader.executeSubSelectedArray),
    maybeBroadcastWatch: Xt(this.maybeBroadcastWatch)
  }, fragmentRegistry: {
    findFragmentSpreads: Xt(t == null ? void 0 : t.findFragmentSpreads),
    lookup: Xt(t == null ? void 0 : t.lookup),
    transform: Xt(t == null ? void 0 : t.transform)
  } });
}
function u4(t) {
  return !!t && "dirtyKey" in t;
}
function Xt(t) {
  return u4(t) ? t.size : void 0;
}
function Rl(t) {
  return t != null;
}
function Pl(t) {
  return Ea(t).map(function(e) {
    return { cache: e };
  });
}
function Ea(t) {
  return t ? nt(nt([
    Xt(t == null ? void 0 : t.performWork)
  ], Ea(t == null ? void 0 : t.left), !0), Ea(t == null ? void 0 : t.right), !0).filter(Rl) : [];
}
function Ma(t) {
  var e;
  return t ? nt(nt([
    (e = t == null ? void 0 : t.getMemoryInternals) === null || e === void 0 ? void 0 : e.call(t)
  ], Ma(t == null ? void 0 : t.left), !0), Ma(t == null ? void 0 : t.right), !0).filter(Rl) : [];
}
var tr = Object.assign(function(e) {
  return JSON.stringify(e, d4);
}, {
  reset: function() {
    $r = new r4(
      Lt.canonicalStringify || 1e3
      /* defaultCacheSizes.canonicalStringify */
    );
  }
});
globalThis.__DEV__ !== !1 && Ol("canonicalStringify", function() {
  return $r.size;
});
var $r;
tr.reset();
function d4(t, e) {
  if (e && typeof e == "object") {
    var r = Object.getPrototypeOf(e);
    if (r === Object.prototype || r === null) {
      var n = Object.keys(e);
      if (n.every(h4))
        return e;
      var i = JSON.stringify(n), a = $r.get(i);
      if (!a) {
        n.sort();
        var s = JSON.stringify(n);
        a = $r.get(s) || n, $r.set(i, a), $r.set(s, a);
      }
      var l = Object.create(r);
      return a.forEach(function(c) {
        l[c] = e[c];
      }), l;
    }
  }
  return e;
}
function h4(t, e, r) {
  return e === 0 || r[e - 1] <= t;
}
function qr(t) {
  return { __ref: String(t) };
}
function be(t) {
  return !!(t && typeof t == "object" && typeof t.__ref == "string");
}
function f4(t) {
  return De(t) && t.kind === "Document" && Array.isArray(t.definitions);
}
function p4(t) {
  return t.kind === "StringValue";
}
function _4(t) {
  return t.kind === "BooleanValue";
}
function g4(t) {
  return t.kind === "IntValue";
}
function m4(t) {
  return t.kind === "FloatValue";
}
function v4(t) {
  return t.kind === "Variable";
}
function y4(t) {
  return t.kind === "ObjectValue";
}
function b4(t) {
  return t.kind === "ListValue";
}
function C4(t) {
  return t.kind === "EnumValue";
}
function w4(t) {
  return t.kind === "NullValue";
}
function Wr(t, e, r, n) {
  if (g4(r) || m4(r))
    t[e.value] = Number(r.value);
  else if (_4(r) || p4(r))
    t[e.value] = r.value;
  else if (y4(r)) {
    var i = {};
    r.fields.map(function(s) {
      return Wr(i, s.name, s.value, n);
    }), t[e.value] = i;
  } else if (v4(r)) {
    var a = (n || {})[r.name.value];
    t[e.value] = a;
  } else if (b4(r))
    t[e.value] = r.values.map(function(s) {
      var l = {};
      return Wr(l, e, s, n), l[e.value];
    });
  else if (C4(r))
    t[e.value] = r.value;
  else if (w4(r))
    t[e.value] = null;
  else
    throw Ye(85, e.value, r.kind);
}
function T4(t, e) {
  var r = null;
  t.directives && (r = {}, t.directives.forEach(function(i) {
    r[i.name.value] = {}, i.arguments && i.arguments.forEach(function(a) {
      var s = a.name, l = a.value;
      return Wr(r[i.name.value], s, l, e);
    });
  }));
  var n = null;
  return t.arguments && t.arguments.length && (n = {}, t.arguments.forEach(function(i) {
    var a = i.name, s = i.value;
    return Wr(n, a, s, e);
  })), Bl(t.name.value, n, r);
}
var k4 = [
  "connection",
  "include",
  "skip",
  "client",
  "rest",
  "export",
  "nonreactive"
], mn = tr, Bl = Object.assign(function(t, e, r) {
  if (e && r && r.connection && r.connection.key)
    if (r.connection.filter && r.connection.filter.length > 0) {
      var n = r.connection.filter ? r.connection.filter : [];
      n.sort();
      var i = {};
      return n.forEach(function(l) {
        i[l] = e[l];
      }), "".concat(r.connection.key, "(").concat(mn(i), ")");
    } else
      return r.connection.key;
  var a = t;
  if (e) {
    var s = mn(e);
    a += "(".concat(s, ")");
  }
  return r && Object.keys(r).forEach(function(l) {
    k4.indexOf(l) === -1 && (r[l] && Object.keys(r[l]).length ? a += "@".concat(l, "(").concat(mn(r[l]), ")") : a += "@".concat(l));
  }), a;
}, {
  setStringify: function(t) {
    var e = mn;
    return mn = t, e;
  }
});
function Di(t, e) {
  if (t.arguments && t.arguments.length) {
    var r = {};
    return t.arguments.forEach(function(n) {
      var i = n.name, a = n.value;
      return Wr(r, i, a, e);
    }), r;
  }
  return null;
}
function nr(t) {
  return t.alias ? t.alias.value : t.name.value;
}
function Sa(t, e, r) {
  for (var n, i = 0, a = e.selections; i < a.length; i++) {
    var s = a[i];
    if (ir(s)) {
      if (s.name.value === "__typename")
        return t[nr(s)];
    } else n ? n.push(s) : n = [s];
  }
  if (typeof t.__typename == "string")
    return t.__typename;
  if (n)
    for (var l = 0, c = n; l < c.length; l++) {
      var s = c[l], u = Sa(t, Ii(s, r).selectionSet, r);
      if (typeof u == "string")
        return u;
    }
}
function ir(t) {
  return t.kind === "Field";
}
function N4(t) {
  return t.kind === "InlineFragment";
}
function Wn(t) {
  ce(t && t.kind === "Document", 77);
  var e = t.definitions.filter(function(r) {
    return r.kind !== "FragmentDefinition";
  }).map(function(r) {
    if (r.kind !== "OperationDefinition")
      throw Ye(78, r.kind);
    return r;
  });
  return ce(e.length <= 1, 79, e.length), t;
}
function zn(t) {
  return Wn(t), t.definitions.filter(function(e) {
    return e.kind === "OperationDefinition";
  })[0];
}
function Aa(t) {
  return t.definitions.filter(function(e) {
    return e.kind === "OperationDefinition" && !!e.name;
  }).map(function(e) {
    return e.name.value;
  })[0] || null;
}
function Oi(t) {
  return t.definitions.filter(function(e) {
    return e.kind === "FragmentDefinition";
  });
}
function $l(t) {
  var e = zn(t);
  return ce(e && e.operation === "query", 80), e;
}
function x4(t) {
  ce(t.kind === "Document", 81), ce(t.definitions.length <= 1, 82);
  var e = t.definitions[0];
  return ce(e.kind === "FragmentDefinition", 83), e;
}
function Hn(t) {
  Wn(t);
  for (var e, r = 0, n = t.definitions; r < n.length; r++) {
    var i = n[r];
    if (i.kind === "OperationDefinition") {
      var a = i.operation;
      if (a === "query" || a === "mutation" || a === "subscription")
        return i;
    }
    i.kind === "FragmentDefinition" && !e && (e = i);
  }
  if (e)
    return e;
  throw Ye(84);
}
function so(t) {
  var e = /* @__PURE__ */ Object.create(null), r = t && t.variableDefinitions;
  return r && r.length && r.forEach(function(n) {
    n.defaultValue && Wr(e, n.variable.name, n.defaultValue);
  }), e;
}
const F4 = () => /* @__PURE__ */ Object.create(null), { forEach: E4, slice: M4 } = Array.prototype, { hasOwnProperty: S4 } = Object.prototype;
class lo {
  constructor(e = !0, r = F4) {
    this.weakness = e, this.makeData = r;
  }
  lookup(...e) {
    return this.lookupArray(e);
  }
  lookupArray(e) {
    let r = this;
    return E4.call(e, (n) => r = r.getChildTrie(n)), S4.call(r, "data") ? r.data : r.data = this.makeData(M4.call(e));
  }
  peek(...e) {
    return this.peekArray(e);
  }
  peekArray(e) {
    let r = this;
    for (let n = 0, i = e.length; r && n < i; ++n) {
      const a = this.weakness && as(e[n]) ? r.weak : r.strong;
      r = a && a.get(e[n]);
    }
    return r && r.data;
  }
  getChildTrie(e) {
    const r = this.weakness && as(e) ? this.weak || (this.weak = /* @__PURE__ */ new WeakMap()) : this.strong || (this.strong = /* @__PURE__ */ new Map());
    let n = r.get(e);
    return n || r.set(e, n = new lo(this.weakness, this.makeData)), n;
  }
}
function as(t) {
  switch (typeof t) {
    case "object":
      if (t === null)
        break;
    case "function":
      return !0;
  }
  return !1;
}
let Qe = null;
const os = {};
let A4 = 1;
const I4 = () => class {
  constructor() {
    this.id = [
      "slot",
      A4++,
      Date.now(),
      Math.random().toString(36).slice(2)
    ].join(":");
  }
  hasValue() {
    for (let e = Qe; e; e = e.parent)
      if (this.id in e.slots) {
        const r = e.slots[this.id];
        if (r === os)
          break;
        return e !== Qe && (Qe.slots[this.id] = r), !0;
      }
    return Qe && (Qe.slots[this.id] = os), !1;
  }
  getValue() {
    if (this.hasValue())
      return Qe.slots[this.id];
  }
  withValue(e, r, n, i) {
    const a = {
      __proto__: null,
      [this.id]: e
    }, s = Qe;
    Qe = { parent: s, slots: a };
    try {
      return r.apply(i, n);
    } finally {
      Qe = s;
    }
  }
  // Capture the current context and wrap a callback function so that it
  // reestablishes the captured context when called.
  static bind(e) {
    const r = Qe;
    return function() {
      const n = Qe;
      try {
        return Qe = r, e.apply(this, arguments);
      } finally {
        Qe = n;
      }
    };
  }
  // Immediately run a callback function without any captured context.
  static noContext(e, r, n) {
    if (Qe) {
      const i = Qe;
      try {
        return Qe = null, e.apply(n, r);
      } finally {
        Qe = i;
      }
    } else
      return e.apply(n, r);
  }
};
function ss(t) {
  try {
    return t();
  } catch {
  }
}
const ea = "@wry/context:Slot", D4 = (
  // Prefer globalThis when available.
  // https://github.com/benjamn/wryware/issues/347
  ss(() => globalThis) || // Fall back to global, which works in Node.js and may be converted by some
  // bundlers to the appropriate identifier (window, self, ...) depending on the
  // bundling target. https://github.com/endojs/endo/issues/576#issuecomment-1178515224
  ss(() => global) || // Otherwise, use a dummy host that's local to this module. We used to fall
  // back to using the Array constructor as a namespace, but that was flagged in
  // https://github.com/benjamn/wryware/issues/347, and can be avoided.
  /* @__PURE__ */ Object.create(null)
), ls = D4, jl = ls[ea] || // Earlier versions of this package stored the globalKey property on the Array
// constructor, so we check there as well, to prevent Slot class duplication.
Array[ea] || function(t) {
  try {
    Object.defineProperty(ls, ea, {
      value: t,
      enumerable: !1,
      writable: !1,
      // When it was possible for globalHost to be the Array constructor (a
      // legacy Slot dedup strategy), it was important for the property to be
      // configurable:true so it could be deleted. That does not seem to be as
      // important when globalHost is the global object, but I don't want to
      // cause similar problems again, and configurable:true seems safest.
      // https://github.com/endojs/endo/issues/576#issuecomment-1178274008
      configurable: !0
    });
  } finally {
    return t;
  }
}(I4()), Li = new jl(), { hasOwnProperty: O4 } = Object.prototype, co = Array.from || function(t) {
  const e = [];
  return t.forEach((r) => e.push(r)), e;
};
function uo(t) {
  const { unsubscribe: e } = t;
  typeof e == "function" && (t.unsubscribe = void 0, e());
}
const Bn = [], L4 = 100;
function zr(t, e) {
  if (!t)
    throw new Error(e || "assertion failure");
}
function Vl(t, e) {
  const r = t.length;
  return (
    // Unknown values are not equal to each other.
    r > 0 && // Both values must be ordinary (or both exceptional) to be equal.
    r === e.length && // The underlying value or exception must be the same.
    t[r - 1] === e[r - 1]
  );
}
function ql(t) {
  switch (t.length) {
    case 0:
      throw new Error("unknown value");
    case 1:
      return t[0];
    case 2:
      throw t[1];
  }
}
function Ul(t) {
  return t.slice(0);
}
class Ri {
  constructor(e) {
    this.fn = e, this.parents = /* @__PURE__ */ new Set(), this.childValues = /* @__PURE__ */ new Map(), this.dirtyChildren = null, this.dirty = !0, this.recomputing = !1, this.value = [], this.deps = null, ++Ri.count;
  }
  peek() {
    if (this.value.length === 1 && !ar(this))
      return cs(this), this.value[0];
  }
  // This is the most important method of the Entry API, because it
  // determines whether the cached this.value can be returned immediately,
  // or must be recomputed. The overall performance of the caching system
  // depends on the truth of the following observations: (1) this.dirty is
  // usually false, (2) this.dirtyChildren is usually null/empty, and thus
  // (3) valueGet(this.value) is usually returned without recomputation.
  recompute(e) {
    return zr(!this.recomputing, "already recomputing"), cs(this), ar(this) ? R4(this, e) : ql(this.value);
  }
  setDirty() {
    this.dirty || (this.dirty = !0, Ql(this), uo(this));
  }
  dispose() {
    this.setDirty(), Zl(this), ho(this, (e, r) => {
      e.setDirty(), Kl(e, this);
    });
  }
  forget() {
    this.dispose();
  }
  dependOn(e) {
    e.add(this), this.deps || (this.deps = Bn.pop() || /* @__PURE__ */ new Set()), this.deps.add(e);
  }
  forgetDeps() {
    this.deps && (co(this.deps).forEach((e) => e.delete(this)), this.deps.clear(), Bn.push(this.deps), this.deps = null);
  }
}
Ri.count = 0;
function cs(t) {
  const e = Li.getValue();
  if (e)
    return t.parents.add(e), e.childValues.has(t) || e.childValues.set(t, []), ar(t) ? zl(e, t) : Hl(e, t), e;
}
function R4(t, e) {
  return Zl(t), Li.withValue(t, P4, [t, e]), $4(t, e) && B4(t), ql(t.value);
}
function P4(t, e) {
  t.recomputing = !0;
  const { normalizeResult: r } = t;
  let n;
  r && t.value.length === 1 && (n = Ul(t.value)), t.value.length = 0;
  try {
    if (t.value[0] = t.fn.apply(null, e), r && n && !Vl(n, t.value))
      try {
        t.value[0] = r(t.value[0], n[0]);
      } catch {
      }
  } catch (i) {
    t.value[1] = i;
  }
  t.recomputing = !1;
}
function ar(t) {
  return t.dirty || !!(t.dirtyChildren && t.dirtyChildren.size);
}
function B4(t) {
  t.dirty = !1, !ar(t) && Wl(t);
}
function Ql(t) {
  ho(t, zl);
}
function Wl(t) {
  ho(t, Hl);
}
function ho(t, e) {
  const r = t.parents.size;
  if (r) {
    const n = co(t.parents);
    for (let i = 0; i < r; ++i)
      e(n[i], t);
  }
}
function zl(t, e) {
  zr(t.childValues.has(e)), zr(ar(e));
  const r = !ar(t);
  if (!t.dirtyChildren)
    t.dirtyChildren = Bn.pop() || /* @__PURE__ */ new Set();
  else if (t.dirtyChildren.has(e))
    return;
  t.dirtyChildren.add(e), r && Ql(t);
}
function Hl(t, e) {
  zr(t.childValues.has(e)), zr(!ar(e));
  const r = t.childValues.get(e);
  r.length === 0 ? t.childValues.set(e, Ul(e.value)) : Vl(r, e.value) || t.setDirty(), Gl(t, e), !ar(t) && Wl(t);
}
function Gl(t, e) {
  const r = t.dirtyChildren;
  r && (r.delete(e), r.size === 0 && (Bn.length < L4 && Bn.push(r), t.dirtyChildren = null));
}
function Zl(t) {
  t.childValues.size > 0 && t.childValues.forEach((e, r) => {
    Kl(t, r);
  }), t.forgetDeps(), zr(t.dirtyChildren === null);
}
function Kl(t, e) {
  e.parents.delete(t), t.childValues.delete(e), Gl(t, e);
}
function $4(t, e) {
  if (typeof t.subscribe == "function")
    try {
      uo(t), t.unsubscribe = t.subscribe.apply(null, e);
    } catch {
      return t.setDirty(), !1;
    }
  return !0;
}
const j4 = {
  setDirty: !0,
  dispose: !0,
  forget: !0
  // Fully remove parent Entry from LRU cache and computation graph
};
function Yl(t) {
  const e = /* @__PURE__ */ new Map();
  function r(n) {
    const i = Li.getValue();
    if (i) {
      let a = e.get(n);
      a || e.set(n, a = /* @__PURE__ */ new Set()), i.dependOn(a);
    }
  }
  return r.dirty = function(i, a) {
    const s = e.get(i);
    if (s) {
      const l = a && O4.call(j4, a) ? a : "setDirty";
      co(s).forEach((c) => c[l]()), e.delete(i), uo(s);
    }
  }, r;
}
let us;
function V4(...t) {
  return (us || (us = new lo(typeof WeakMap == "function"))).lookupArray(t);
}
const ta = /* @__PURE__ */ new Set();
function $n(t, { max: e = Math.pow(2, 16), keyArgs: r, makeCacheKey: n = V4, normalizeResult: i, subscribe: a, cache: s = xa } = /* @__PURE__ */ Object.create(null)) {
  const l = typeof s == "function" ? new s(e, (f) => f.dispose()) : s, c = function() {
    const f = n.apply(null, r ? r.apply(null, arguments) : arguments);
    if (f === void 0)
      return t.apply(null, arguments);
    let p = l.get(f);
    p || (l.set(f, p = new Ri(t)), p.normalizeResult = i, p.subscribe = a, p.forget = () => l.delete(f));
    const m = p.recompute(Array.prototype.slice.call(arguments));
    return l.set(f, p), ta.add(l), Li.hasValue() || (ta.forEach((y) => y.clean()), ta.clear()), m;
  };
  Object.defineProperty(c, "size", {
    get: () => l.size,
    configurable: !1,
    enumerable: !1
  }), Object.freeze(c.options = {
    max: e,
    keyArgs: r,
    makeCacheKey: n,
    normalizeResult: i,
    subscribe: a,
    cache: l
  });
  function u(f) {
    const p = f && l.get(f);
    p && p.setDirty();
  }
  c.dirtyKey = u, c.dirty = function() {
    u(n.apply(null, arguments));
  };
  function d(f) {
    const p = f && l.get(f);
    if (p)
      return p.peek();
  }
  c.peekKey = d, c.peek = function() {
    return d(n.apply(null, arguments));
  };
  function h(f) {
    return f ? l.delete(f) : !1;
  }
  return c.forgetKey = h, c.forget = function() {
    return h(n.apply(null, arguments));
  }, c.makeCacheKey = n, c.getKey = r ? function() {
    return n.apply(null, r.apply(null, arguments));
  } : n, Object.freeze(c);
}
function q4(t) {
  return t;
}
var Jl = (
  /** @class */
  function() {
    function t(e, r) {
      r === void 0 && (r = /* @__PURE__ */ Object.create(null)), this.resultCache = Sl ? /* @__PURE__ */ new WeakSet() : /* @__PURE__ */ new Set(), this.transform = e, r.getCacheKey && (this.getCacheKey = r.getCacheKey), this.cached = r.cache !== !1, this.resetCache();
    }
    return t.prototype.getCacheKey = function(e) {
      return [e];
    }, t.identity = function() {
      return new t(q4, { cache: !1 });
    }, t.split = function(e, r, n) {
      return n === void 0 && (n = t.identity()), Object.assign(new t(
        function(i) {
          var a = e(i) ? r : n;
          return a.transformDocument(i);
        },
        // Reasonably assume both `left` and `right` transforms handle their own caching
        { cache: !1 }
      ), { left: r, right: n });
    }, t.prototype.resetCache = function() {
      var e = this;
      if (this.cached) {
        var r = new Yr(Jr);
        this.performWork = $n(t.prototype.performWork.bind(this), {
          makeCacheKey: function(n) {
            var i = e.getCacheKey(n);
            if (i)
              return ce(Array.isArray(i), 69), r.lookupArray(i);
          },
          max: Lt["documentTransform.cache"],
          cache: yi
        });
      }
    }, t.prototype.performWork = function(e) {
      return Wn(e), this.transform(e);
    }, t.prototype.transformDocument = function(e) {
      if (this.resultCache.has(e))
        return e;
      var r = this.performWork(e);
      return this.resultCache.add(r), r;
    }, t.prototype.concat = function(e) {
      var r = this;
      return Object.assign(new t(
        function(n) {
          return e.transformDocument(r.transformDocument(n));
        },
        // Reasonably assume both transforms handle their own caching
        { cache: !1 }
      ), {
        left: this,
        right: e
      });
    }, t;
  }()
), En, Pi = Object.assign(function(t) {
  var e = En.get(t);
  return e || (e = By(t), En.set(t, e)), e;
}, {
  reset: function() {
    En = new Dl(
      Lt.print || 2e3
      /* defaultCacheSizes.print */
    );
  }
});
Pi.reset();
globalThis.__DEV__ !== !1 && Ol("print", function() {
  return En ? En.size : 0;
});
var Oe = Array.isArray;
function bt(t) {
  return Array.isArray(t) && t.length > 0;
}
var ds = {
  kind: ee.FIELD,
  name: {
    kind: ee.NAME,
    value: "__typename"
  }
};
function Xl(t, e) {
  return !t || t.selectionSet.selections.every(function(r) {
    return r.kind === ee.FRAGMENT_SPREAD && Xl(e[r.name.value], e);
  });
}
function U4(t) {
  return Xl(zn(t) || x4(t), Ai(Oi(t))) ? null : t;
}
function Q4(t) {
  var e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return t.forEach(function(n) {
    n && (n.name ? e.set(n.name, n) : n.test && r.set(n.test, n));
  }), function(n) {
    var i = e.get(n.name.value);
    return !i && r.size && r.forEach(function(a, s) {
      s(n) && (i = a);
    }), i;
  };
}
function hs(t) {
  var e = /* @__PURE__ */ new Map();
  return function(n) {
    n === void 0 && (n = t);
    var i = e.get(n);
    return i || e.set(n, i = {
      // Variable and fragment spread names used directly within this
      // operation or fragment definition, as identified by key. These sets
      // will be populated during the first traversal of the document in
      // removeDirectivesFromDocument below.
      variables: /* @__PURE__ */ new Set(),
      fragmentSpreads: /* @__PURE__ */ new Set()
    }), i;
  };
}
function ec(t, e) {
  Wn(e);
  for (var r = hs(""), n = hs(""), i = function(g) {
    for (var b = 0, C = void 0; b < g.length && (C = g[b]); ++b)
      if (!Oe(C)) {
        if (C.kind === ee.OPERATION_DEFINITION)
          return r(C.name && C.name.value);
        if (C.kind === ee.FRAGMENT_DEFINITION)
          return n(C.name.value);
      }
    return globalThis.__DEV__ !== !1 && ce.error(86), null;
  }, a = 0, s = e.definitions.length - 1; s >= 0; --s)
    e.definitions[s].kind === ee.OPERATION_DEFINITION && ++a;
  var l = Q4(t), c = function(g) {
    return bt(g) && g.map(l).some(function(b) {
      return b && b.remove;
    });
  }, u = /* @__PURE__ */ new Map(), d = !1, h = {
    enter: function(g) {
      if (c(g.directives))
        return d = !0, null;
    }
  }, f = Ot(e, {
    // These two AST node types share the same implementation, defined above.
    Field: h,
    InlineFragment: h,
    VariableDefinition: {
      enter: function() {
        return !1;
      }
    },
    Variable: {
      enter: function(g, b, C, x, N) {
        var T = i(N);
        T && T.variables.add(g.name.value);
      }
    },
    FragmentSpread: {
      enter: function(g, b, C, x, N) {
        if (c(g.directives))
          return d = !0, null;
        var T = i(N);
        T && T.fragmentSpreads.add(g.name.value);
      }
    },
    FragmentDefinition: {
      enter: function(g, b, C, x) {
        u.set(JSON.stringify(x), g);
      },
      leave: function(g, b, C, x) {
        var N = u.get(JSON.stringify(x));
        if (g === N)
          return g;
        if (
          // This logic applies only if the document contains one or more
          // operations, since removing all fragments from a document containing
          // only fragments makes the document useless.
          a > 0 && g.selectionSet.selections.every(function(T) {
            return T.kind === ee.FIELD && T.name.value === "__typename";
          })
        )
          return n(g.name.value).removed = !0, d = !0, null;
      }
    },
    Directive: {
      leave: function(g) {
        if (l(g))
          return d = !0, null;
      }
    }
  });
  if (!d)
    return e;
  var p = function(g) {
    return g.transitiveVars || (g.transitiveVars = new Set(g.variables), g.removed || g.fragmentSpreads.forEach(function(b) {
      p(n(b)).transitiveVars.forEach(function(C) {
        g.transitiveVars.add(C);
      });
    })), g;
  }, m = /* @__PURE__ */ new Set();
  f.definitions.forEach(function(g) {
    g.kind === ee.OPERATION_DEFINITION ? p(r(g.name && g.name.value)).fragmentSpreads.forEach(function(b) {
      m.add(b);
    }) : g.kind === ee.FRAGMENT_DEFINITION && // If there are no operations in the document, then all fragment
    // definitions count as usages of their own fragment names. This heuristic
    // prevents accidentally removing all fragment definitions from the
    // document just because it contains no operations that use the fragments.
    a === 0 && !n(g.name.value).removed && m.add(g.name.value);
  }), m.forEach(function(g) {
    p(n(g)).fragmentSpreads.forEach(function(b) {
      m.add(b);
    });
  });
  var y = function(g) {
    return !!// A fragment definition will be removed if there are no spreads that refer
    // to it, or the fragment was explicitly removed because it had no fields
    // other than __typename.
    (!m.has(g) || n(g).removed);
  }, v = {
    enter: function(g) {
      if (y(g.name.value))
        return null;
    }
  };
  return U4(Ot(f, {
    // If the fragment is going to be removed, then leaving any dangling
    // FragmentSpread nodes with the same name would be a mistake.
    FragmentSpread: v,
    // This is where the fragment definition is actually removed.
    FragmentDefinition: v,
    OperationDefinition: {
      leave: function(g) {
        if (g.variableDefinitions) {
          var b = p(
            // If an operation is anonymous, we use the empty string as its key.
            r(g.name && g.name.value)
          ).transitiveVars;
          if (b.size < g.variableDefinitions.length)
            return k(k({}, g), { variableDefinitions: g.variableDefinitions.filter(function(C) {
              return b.has(C.variable.name.value);
            }) });
        }
      }
    }
  }));
}
var fo = Object.assign(function(t) {
  return Ot(t, {
    SelectionSet: {
      enter: function(e, r, n) {
        if (!(n && n.kind === ee.OPERATION_DEFINITION)) {
          var i = e.selections;
          if (i) {
            var a = i.some(function(l) {
              return ir(l) && (l.name.value === "__typename" || l.name.value.lastIndexOf("__", 0) === 0);
            });
            if (!a) {
              var s = n;
              if (!(ir(s) && s.directives && s.directives.some(function(l) {
                return l.name.value === "export";
              })))
                return k(k({}, e), { selections: nt(nt([], i, !0), [ds], !1) });
            }
          }
        }
      }
    }
  });
}, {
  added: function(t) {
    return t === ds;
  }
});
function W4(t) {
  var e = Hn(t), r = e.operation;
  if (r === "query")
    return t;
  var n = Ot(t, {
    OperationDefinition: {
      enter: function(i) {
        return k(k({}, i), { operation: "query" });
      }
    }
  });
  return n;
}
function tc(t) {
  Wn(t);
  var e = ec([
    {
      test: function(r) {
        return r.name.value === "client";
      },
      remove: !0
    }
  ], t);
  return e;
}
var z4 = Object.prototype.hasOwnProperty;
function fs() {
  for (var t = [], e = 0; e < arguments.length; e++)
    t[e] = arguments[e];
  return Bi(t);
}
function Bi(t) {
  var e = t[0] || {}, r = t.length;
  if (r > 1)
    for (var n = new or(), i = 1; i < r; ++i)
      e = n.merge(e, t[i]);
  return e;
}
var H4 = function(t, e, r) {
  return this.merge(t[r], e[r]);
}, or = (
  /** @class */
  function() {
    function t(e) {
      e === void 0 && (e = H4), this.reconciler = e, this.isObject = De, this.pastCopies = /* @__PURE__ */ new Set();
    }
    return t.prototype.merge = function(e, r) {
      for (var n = this, i = [], a = 2; a < arguments.length; a++)
        i[a - 2] = arguments[a];
      return De(r) && De(e) ? (Object.keys(r).forEach(function(s) {
        if (z4.call(e, s)) {
          var l = e[s];
          if (r[s] !== l) {
            var c = n.reconciler.apply(n, nt([
              e,
              r,
              s
            ], i, !1));
            c !== l && (e = n.shallowCopyForMerge(e), e[s] = c);
          }
        } else
          e = n.shallowCopyForMerge(e), e[s] = r[s];
      }), e) : r;
    }, t.prototype.shallowCopyForMerge = function(e) {
      return De(e) && (this.pastCopies.has(e) || (Array.isArray(e) ? e = e.slice(0) : e = k({ __proto__: Object.getPrototypeOf(e) }, e), this.pastCopies.add(e))), e;
    }, t;
  }()
);
function G4(t, e) {
  var r = typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r) return (r = r.call(t)).next.bind(r);
  if (Array.isArray(t) || (r = Z4(t)) || e) {
    r && (t = r);
    var n = 0;
    return function() {
      return n >= t.length ? { done: !0 } : { done: !1, value: t[n++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Z4(t, e) {
  if (t) {
    if (typeof t == "string") return ps(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ps(t, e);
  }
}
function ps(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function _s(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function po(t, e, r) {
  return e && _s(t.prototype, e), r && _s(t, r), Object.defineProperty(t, "prototype", { writable: !1 }), t;
}
var _o = function() {
  return typeof Symbol == "function";
}, go = function(t) {
  return _o() && !!Symbol[t];
}, mo = function(t) {
  return go(t) ? Symbol[t] : "@@" + t;
};
_o() && !go("observable") && (Symbol.observable = Symbol("observable"));
var K4 = mo("iterator"), Ia = mo("observable"), rc = mo("species");
function bi(t, e) {
  var r = t[e];
  if (r != null) {
    if (typeof r != "function") throw new TypeError(r + " is not a function");
    return r;
  }
}
function vn(t) {
  var e = t.constructor;
  return e !== void 0 && (e = e[rc], e === null && (e = void 0)), e !== void 0 ? e : xe;
}
function Y4(t) {
  return t instanceof xe;
}
function Hr(t) {
  Hr.log ? Hr.log(t) : setTimeout(function() {
    throw t;
  });
}
function hi(t) {
  Promise.resolve().then(function() {
    try {
      t();
    } catch (e) {
      Hr(e);
    }
  });
}
function nc(t) {
  var e = t._cleanup;
  if (e !== void 0 && (t._cleanup = void 0, !!e))
    try {
      if (typeof e == "function")
        e();
      else {
        var r = bi(e, "unsubscribe");
        r && r.call(e);
      }
    } catch (n) {
      Hr(n);
    }
}
function Da(t) {
  t._observer = void 0, t._queue = void 0, t._state = "closed";
}
function J4(t) {
  var e = t._queue;
  if (e) {
    t._queue = void 0, t._state = "ready";
    for (var r = 0; r < e.length && (ic(t, e[r].type, e[r].value), t._state !== "closed"); ++r)
      ;
  }
}
function ic(t, e, r) {
  t._state = "running";
  var n = t._observer;
  try {
    var i = bi(n, e);
    switch (e) {
      case "next":
        i && i.call(n, r);
        break;
      case "error":
        if (Da(t), i) i.call(n, r);
        else throw r;
        break;
      case "complete":
        Da(t), i && i.call(n);
        break;
    }
  } catch (a) {
    Hr(a);
  }
  t._state === "closed" ? nc(t) : t._state === "running" && (t._state = "ready");
}
function ra(t, e, r) {
  if (t._state !== "closed") {
    if (t._state === "buffering") {
      t._queue.push({
        type: e,
        value: r
      });
      return;
    }
    if (t._state !== "ready") {
      t._state = "buffering", t._queue = [{
        type: e,
        value: r
      }], hi(function() {
        return J4(t);
      });
      return;
    }
    ic(t, e, r);
  }
}
var X4 = /* @__PURE__ */ function() {
  function t(r, n) {
    this._cleanup = void 0, this._observer = r, this._queue = void 0, this._state = "initializing";
    var i = new e6(this);
    try {
      this._cleanup = n.call(void 0, i);
    } catch (a) {
      i.error(a);
    }
    this._state === "initializing" && (this._state = "ready");
  }
  var e = t.prototype;
  return e.unsubscribe = function() {
    this._state !== "closed" && (Da(this), nc(this));
  }, po(t, [{
    key: "closed",
    get: function() {
      return this._state === "closed";
    }
  }]), t;
}(), e6 = /* @__PURE__ */ function() {
  function t(r) {
    this._subscription = r;
  }
  var e = t.prototype;
  return e.next = function(n) {
    ra(this._subscription, "next", n);
  }, e.error = function(n) {
    ra(this._subscription, "error", n);
  }, e.complete = function() {
    ra(this._subscription, "complete");
  }, po(t, [{
    key: "closed",
    get: function() {
      return this._subscription._state === "closed";
    }
  }]), t;
}(), xe = /* @__PURE__ */ function() {
  function t(r) {
    if (!(this instanceof t)) throw new TypeError("Observable cannot be called as a function");
    if (typeof r != "function") throw new TypeError("Observable initializer must be a function");
    this._subscriber = r;
  }
  var e = t.prototype;
  return e.subscribe = function(n) {
    return (typeof n != "object" || n === null) && (n = {
      next: n,
      error: arguments[1],
      complete: arguments[2]
    }), new X4(n, this._subscriber);
  }, e.forEach = function(n) {
    var i = this;
    return new Promise(function(a, s) {
      if (typeof n != "function") {
        s(new TypeError(n + " is not a function"));
        return;
      }
      function l() {
        c.unsubscribe(), a();
      }
      var c = i.subscribe({
        next: function(u) {
          try {
            n(u, l);
          } catch (d) {
            s(d), c.unsubscribe();
          }
        },
        error: s,
        complete: a
      });
    });
  }, e.map = function(n) {
    var i = this;
    if (typeof n != "function") throw new TypeError(n + " is not a function");
    var a = vn(this);
    return new a(function(s) {
      return i.subscribe({
        next: function(l) {
          try {
            l = n(l);
          } catch (c) {
            return s.error(c);
          }
          s.next(l);
        },
        error: function(l) {
          s.error(l);
        },
        complete: function() {
          s.complete();
        }
      });
    });
  }, e.filter = function(n) {
    var i = this;
    if (typeof n != "function") throw new TypeError(n + " is not a function");
    var a = vn(this);
    return new a(function(s) {
      return i.subscribe({
        next: function(l) {
          try {
            if (!n(l)) return;
          } catch (c) {
            return s.error(c);
          }
          s.next(l);
        },
        error: function(l) {
          s.error(l);
        },
        complete: function() {
          s.complete();
        }
      });
    });
  }, e.reduce = function(n) {
    var i = this;
    if (typeof n != "function") throw new TypeError(n + " is not a function");
    var a = vn(this), s = arguments.length > 1, l = !1, c = arguments[1], u = c;
    return new a(function(d) {
      return i.subscribe({
        next: function(h) {
          var f = !l;
          if (l = !0, !f || s)
            try {
              u = n(u, h);
            } catch (p) {
              return d.error(p);
            }
          else
            u = h;
        },
        error: function(h) {
          d.error(h);
        },
        complete: function() {
          if (!l && !s) return d.error(new TypeError("Cannot reduce an empty sequence"));
          d.next(u), d.complete();
        }
      });
    });
  }, e.concat = function() {
    for (var n = this, i = arguments.length, a = new Array(i), s = 0; s < i; s++)
      a[s] = arguments[s];
    var l = vn(this);
    return new l(function(c) {
      var u, d = 0;
      function h(f) {
        u = f.subscribe({
          next: function(p) {
            c.next(p);
          },
          error: function(p) {
            c.error(p);
          },
          complete: function() {
            d === a.length ? (u = void 0, c.complete()) : h(l.from(a[d++]));
          }
        });
      }
      return h(n), function() {
        u && (u.unsubscribe(), u = void 0);
      };
    });
  }, e.flatMap = function(n) {
    var i = this;
    if (typeof n != "function") throw new TypeError(n + " is not a function");
    var a = vn(this);
    return new a(function(s) {
      var l = [], c = i.subscribe({
        next: function(d) {
          if (n)
            try {
              d = n(d);
            } catch (f) {
              return s.error(f);
            }
          var h = a.from(d).subscribe({
            next: function(f) {
              s.next(f);
            },
            error: function(f) {
              s.error(f);
            },
            complete: function() {
              var f = l.indexOf(h);
              f >= 0 && l.splice(f, 1), u();
            }
          });
          l.push(h);
        },
        error: function(d) {
          s.error(d);
        },
        complete: function() {
          u();
        }
      });
      function u() {
        c.closed && l.length === 0 && s.complete();
      }
      return function() {
        l.forEach(function(d) {
          return d.unsubscribe();
        }), c.unsubscribe();
      };
    });
  }, e[Ia] = function() {
    return this;
  }, t.from = function(n) {
    var i = typeof this == "function" ? this : t;
    if (n == null) throw new TypeError(n + " is not an object");
    var a = bi(n, Ia);
    if (a) {
      var s = a.call(n);
      if (Object(s) !== s) throw new TypeError(s + " is not an object");
      return Y4(s) && s.constructor === i ? s : new i(function(l) {
        return s.subscribe(l);
      });
    }
    if (go("iterator") && (a = bi(n, K4), a))
      return new i(function(l) {
        hi(function() {
          if (!l.closed) {
            for (var c = G4(a.call(n)), u; !(u = c()).done; ) {
              var d = u.value;
              if (l.next(d), l.closed) return;
            }
            l.complete();
          }
        });
      });
    if (Array.isArray(n))
      return new i(function(l) {
        hi(function() {
          if (!l.closed) {
            for (var c = 0; c < n.length; ++c)
              if (l.next(n[c]), l.closed) return;
            l.complete();
          }
        });
      });
    throw new TypeError(n + " is not observable");
  }, t.of = function() {
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a];
    var s = typeof this == "function" ? this : t;
    return new s(function(l) {
      hi(function() {
        if (!l.closed) {
          for (var c = 0; c < i.length; ++c)
            if (l.next(i[c]), l.closed) return;
          l.complete();
        }
      });
    });
  }, po(t, null, [{
    key: rc,
    get: function() {
      return this;
    }
  }]), t;
}();
_o() && Object.defineProperty(xe, Symbol("extensions"), {
  value: {
    symbol: Ia,
    hostReportError: Hr
  },
  configurable: !0
});
function t6(t) {
  var e, r = t.Symbol;
  if (typeof r == "function")
    if (r.observable)
      e = r.observable;
    else {
      typeof r.for == "function" ? e = r.for("https://github.com/benlesh/symbol-observable") : e = r("https://github.com/benlesh/symbol-observable");
      try {
        r.observable = e;
      } catch {
      }
    }
  else
    e = "@@observable";
  return e;
}
var Or;
typeof self < "u" ? Or = self : typeof window < "u" ? Or = window : typeof global < "u" ? Or = global : typeof module < "u" ? Or = module : Or = Function("return this")();
t6(Or);
var gs = xe.prototype, ms = "@@observable";
gs[ms] || (gs[ms] = function() {
  return this;
});
var r6 = Object.prototype.toString;
function ac(t) {
  return Oa(t);
}
function Oa(t, e) {
  switch (r6.call(t)) {
    case "[object Array]": {
      if (e = e || /* @__PURE__ */ new Map(), e.has(t))
        return e.get(t);
      var r = t.slice(0);
      return e.set(t, r), r.forEach(function(i, a) {
        r[a] = Oa(i, e);
      }), r;
    }
    case "[object Object]": {
      if (e = e || /* @__PURE__ */ new Map(), e.has(t))
        return e.get(t);
      var n = Object.create(Object.getPrototypeOf(t));
      return e.set(t, n), Object.keys(t).forEach(function(i) {
        n[i] = Oa(t[i], e);
      }), n;
    }
    default:
      return t;
  }
}
function n6(t) {
  var e = /* @__PURE__ */ new Set([t]);
  return e.forEach(function(r) {
    De(r) && i6(r) === r && Object.getOwnPropertyNames(r).forEach(function(n) {
      De(r[n]) && e.add(r[n]);
    });
  }), t;
}
function i6(t) {
  if (globalThis.__DEV__ !== !1 && !Object.isFrozen(t))
    try {
      Object.freeze(t);
    } catch (e) {
      if (e instanceof TypeError)
        return null;
      throw e;
    }
  return t;
}
function La(t) {
  return globalThis.__DEV__ !== !1 && n6(t), t;
}
function Mn(t, e, r) {
  var n = [];
  t.forEach(function(i) {
    return i[e] && n.push(i);
  }), n.forEach(function(i) {
    return i[e](r);
  });
}
function na(t, e, r) {
  return new xe(function(n) {
    var i = {
      // Normally we would initialize promiseQueue to Promise.resolve(), but
      // in this case, for backwards compatibility, we need to be careful to
      // invoke the first callback synchronously.
      then: function(c) {
        return new Promise(function(u) {
          return u(c());
        });
      }
    };
    function a(c, u) {
      return function(d) {
        if (c) {
          var h = function() {
            return n.closed ? (
              /* will be swallowed */
              0
            ) : c(d);
          };
          i = i.then(h, h).then(function(f) {
            return n.next(f);
          }, function(f) {
            return n.error(f);
          });
        } else
          n[u](d);
      };
    }
    var s = {
      next: a(e, "next"),
      error: a(r, "error"),
      complete: function() {
        i.then(function() {
          return n.complete();
        });
      }
    }, l = t.subscribe(s);
    return function() {
      return l.unsubscribe();
    };
  });
}
function oc(t) {
  function e(r) {
    Object.defineProperty(t, r, { value: xe });
  }
  return Al && Symbol.species && e(Symbol.species), e("@@species"), t;
}
function vs(t) {
  return t && typeof t.then == "function";
}
var Lr = (
  /** @class */
  function(t) {
    Ct(e, t);
    function e(r) {
      var n = t.call(this, function(i) {
        return n.addObserver(i), function() {
          return n.removeObserver(i);
        };
      }) || this;
      return n.observers = /* @__PURE__ */ new Set(), n.promise = new Promise(function(i, a) {
        n.resolve = i, n.reject = a;
      }), n.handlers = {
        next: function(i) {
          n.sub !== null && (n.latest = ["next", i], n.notify("next", i), Mn(n.observers, "next", i));
        },
        error: function(i) {
          var a = n.sub;
          a !== null && (a && setTimeout(function() {
            return a.unsubscribe();
          }), n.sub = null, n.latest = ["error", i], n.reject(i), n.notify("error", i), Mn(n.observers, "error", i));
        },
        complete: function() {
          var i = n, a = i.sub, s = i.sources, l = s === void 0 ? [] : s;
          if (a !== null) {
            var c = l.shift();
            c ? vs(c) ? c.then(function(u) {
              return n.sub = u.subscribe(n.handlers);
            }, n.handlers.error) : n.sub = c.subscribe(n.handlers) : (a && setTimeout(function() {
              return a.unsubscribe();
            }), n.sub = null, n.latest && n.latest[0] === "next" ? n.resolve(n.latest[1]) : n.resolve(), n.notify("complete"), Mn(n.observers, "complete"));
          }
        }
      }, n.nextResultListeners = /* @__PURE__ */ new Set(), n.cancel = function(i) {
        n.reject(i), n.sources = [], n.handlers.error(i);
      }, n.promise.catch(function(i) {
      }), typeof r == "function" && (r = [new xe(r)]), vs(r) ? r.then(function(i) {
        return n.start(i);
      }, n.handlers.error) : n.start(r), n;
    }
    return e.prototype.start = function(r) {
      this.sub === void 0 && (this.sources = Array.from(r), this.handlers.complete());
    }, e.prototype.deliverLastMessage = function(r) {
      if (this.latest) {
        var n = this.latest[0], i = r[n];
        i && i.call(r, this.latest[1]), this.sub === null && n === "next" && r.complete && r.complete();
      }
    }, e.prototype.addObserver = function(r) {
      this.observers.has(r) || (this.deliverLastMessage(r), this.observers.add(r));
    }, e.prototype.removeObserver = function(r) {
      this.observers.delete(r) && this.observers.size < 1 && this.handlers.complete();
    }, e.prototype.notify = function(r, n) {
      var i = this.nextResultListeners;
      i.size && (this.nextResultListeners = /* @__PURE__ */ new Set(), i.forEach(function(a) {
        return a(r, n);
      }));
    }, e.prototype.beforeNext = function(r) {
      var n = !1;
      this.nextResultListeners.add(function(i, a) {
        n || (n = !0, r(i, a));
      });
    }, e;
  }(xe)
);
oc(Lr);
function Ur(t) {
  return "incremental" in t;
}
function a6(t) {
  return "hasNext" in t && "data" in t;
}
function o6(t) {
  return Ur(t) || a6(t);
}
function s6(t) {
  return De(t) && "payload" in t;
}
function sc(t, e) {
  var r = t, n = new or();
  return Ur(e) && bt(e.incremental) && e.incremental.forEach(function(i) {
    for (var a = i.data, s = i.path, l = s.length - 1; l >= 0; --l) {
      var c = s[l], u = !isNaN(+c), d = u ? [] : {};
      d[c] = a, a = d;
    }
    r = n.merge(r, a);
  }), r;
}
function fi(t) {
  var e = Ra(t);
  return bt(e);
}
function Ra(t) {
  var e = bt(t.errors) ? t.errors.slice(0) : [];
  return Ur(t) && bt(t.incremental) && t.incremental.forEach(function(r) {
    r.errors && e.push.apply(e, r.errors);
  }), e;
}
function Gr() {
  for (var t = [], e = 0; e < arguments.length; e++)
    t[e] = arguments[e];
  var r = /* @__PURE__ */ Object.create(null);
  return t.forEach(function(n) {
    n && Object.keys(n).forEach(function(i) {
      var a = n[i];
      a !== void 0 && (r[i] = a);
    });
  }), r;
}
function ia(t, e) {
  return Gr(t, e, e.variables && {
    variables: Gr(k(k({}, t && t.variables), e.variables))
  });
}
function aa(t) {
  return new xe(function(e) {
    e.error(t);
  });
}
var lc = function(t, e, r) {
  var n = new Error(r);
  throw n.name = "ServerError", n.response = t, n.statusCode = t.status, n.result = e, n;
};
function l6(t) {
  for (var e = [
    "query",
    "operationName",
    "variables",
    "extensions",
    "context"
  ], r = 0, n = Object.keys(t); r < n.length; r++) {
    var i = n[r];
    if (e.indexOf(i) < 0)
      throw Ye(44, i);
  }
  return t;
}
function c6(t, e) {
  var r = k({}, t), n = function(a) {
    typeof a == "function" ? r = k(k({}, r), a(r)) : r = k(k({}, r), a);
  }, i = function() {
    return k({}, r);
  };
  return Object.defineProperty(e, "setContext", {
    enumerable: !1,
    value: n
  }), Object.defineProperty(e, "getContext", {
    enumerable: !1,
    value: i
  }), e;
}
function u6(t) {
  var e = {
    variables: t.variables || {},
    extensions: t.extensions || {},
    operationName: t.operationName,
    query: t.query
  };
  return e.operationName || (e.operationName = typeof e.query != "string" ? Aa(e.query) || void 0 : ""), e;
}
function d6(t, e) {
  var r = k({}, t), n = new Set(Object.keys(t));
  return Ot(e, {
    Variable: function(i, a, s) {
      s && s.kind !== "VariableDefinition" && n.delete(i.name.value);
    }
  }), n.forEach(function(i) {
    delete r[i];
  }), r;
}
function ys(t, e) {
  return e ? e(t) : xe.of();
}
function yn(t) {
  return typeof t == "function" ? new Gn(t) : t;
}
function ci(t) {
  return t.request.length <= 1;
}
var Gn = (
  /** @class */
  function() {
    function t(e) {
      e && (this.request = e);
    }
    return t.empty = function() {
      return new t(function() {
        return xe.of();
      });
    }, t.from = function(e) {
      return e.length === 0 ? t.empty() : e.map(yn).reduce(function(r, n) {
        return r.concat(n);
      });
    }, t.split = function(e, r, n) {
      var i = yn(r), a = yn(n || new t(ys)), s;
      return ci(i) && ci(a) ? s = new t(function(l) {
        return e(l) ? i.request(l) || xe.of() : a.request(l) || xe.of();
      }) : s = new t(function(l, c) {
        return e(l) ? i.request(l, c) || xe.of() : a.request(l, c) || xe.of();
      }), Object.assign(s, { left: i, right: a });
    }, t.execute = function(e, r) {
      return e.request(c6(r.context, u6(l6(r)))) || xe.of();
    }, t.concat = function(e, r) {
      var n = yn(e);
      if (ci(n))
        return globalThis.__DEV__ !== !1 && ce.warn(36, n), n;
      var i = yn(r), a;
      return ci(i) ? a = new t(function(s) {
        return n.request(s, function(l) {
          return i.request(l) || xe.of();
        }) || xe.of();
      }) : a = new t(function(s, l) {
        return n.request(s, function(c) {
          return i.request(c, l) || xe.of();
        }) || xe.of();
      }), Object.assign(a, { left: n, right: i });
    }, t.prototype.split = function(e, r, n) {
      return this.concat(t.split(e, r, n || new t(ys)));
    }, t.prototype.concat = function(e) {
      return t.concat(this, e);
    }, t.prototype.request = function(e, r) {
      throw Ye(37);
    }, t.prototype.onError = function(e, r) {
      if (r && r.error)
        return r.error(e), !1;
      throw e;
    }, t.prototype.setOnError = function(e) {
      return this.onError = e, this;
    }, t;
  }()
), Pa = Gn.execute;
function h6(t) {
  var e, r = t[Symbol.asyncIterator]();
  return e = {
    next: function() {
      return r.next();
    }
  }, e[Symbol.asyncIterator] = function() {
    return this;
  }, e;
}
function f6(t) {
  var e = null, r = null, n = !1, i = [], a = [];
  function s(h) {
    if (!r) {
      if (a.length) {
        var f = a.shift();
        if (Array.isArray(f) && f[0])
          return f[0]({ value: h, done: !1 });
      }
      i.push(h);
    }
  }
  function l(h) {
    r = h;
    var f = a.slice();
    f.forEach(function(p) {
      p[1](h);
    }), !e || e();
  }
  function c() {
    n = !0;
    var h = a.slice();
    h.forEach(function(f) {
      f[0]({ value: void 0, done: !0 });
    }), !e || e();
  }
  e = function() {
    e = null, t.removeListener("data", s), t.removeListener("error", l), t.removeListener("end", c), t.removeListener("finish", c), t.removeListener("close", c);
  }, t.on("data", s), t.on("error", l), t.on("end", c), t.on("finish", c), t.on("close", c);
  function u() {
    return new Promise(function(h, f) {
      if (r)
        return f(r);
      if (i.length)
        return h({ value: i.shift(), done: !1 });
      if (n)
        return h({ value: void 0, done: !0 });
      a.push([h, f]);
    });
  }
  var d = {
    next: function() {
      return u();
    }
  };
  return Si && (d[Symbol.asyncIterator] = function() {
    return this;
  }), d;
}
function p6(t) {
  var e = !1, r = {
    next: function() {
      return e ? Promise.resolve({
        value: void 0,
        done: !0
      }) : (e = !0, new Promise(function(n, i) {
        t.then(function(a) {
          n({ value: a, done: !1 });
        }).catch(i);
      }));
    }
  };
  return Si && (r[Symbol.asyncIterator] = function() {
    return this;
  }), r;
}
function bs(t) {
  var e = {
    next: function() {
      return t.read();
    }
  };
  return Si && (e[Symbol.asyncIterator] = function() {
    return this;
  }), e;
}
function _6(t) {
  return !!t.body;
}
function g6(t) {
  return !!t.getReader;
}
function m6(t) {
  return !!(Si && t[Symbol.asyncIterator]);
}
function v6(t) {
  return !!t.stream;
}
function y6(t) {
  return !!t.arrayBuffer;
}
function b6(t) {
  return !!t.pipe;
}
function C6(t) {
  var e = t;
  if (_6(t) && (e = t.body), m6(e))
    return h6(e);
  if (g6(e))
    return bs(e.getReader());
  if (v6(e))
    return bs(e.stream().getReader());
  if (y6(e))
    return p6(e.arrayBuffer());
  if (b6(e))
    return f6(e);
  throw new Error("Unknown body type for responseIterator. Please pass a streamable response.");
}
var vo = Symbol();
function w6(t) {
  return t.extensions ? Array.isArray(t.extensions[vo]) : !1;
}
function cc(t) {
  return t.hasOwnProperty("graphQLErrors");
}
var T6 = function(t) {
  var e = nt(nt(nt([], t.graphQLErrors, !0), t.clientErrors, !0), t.protocolErrors, !0);
  return t.networkError && e.push(t.networkError), e.map(function(r) {
    return De(r) && r.message || "Error message not found.";
  }).join(`
`);
}, vr = (
  /** @class */
  function(t) {
    Ct(e, t);
    function e(r) {
      var n = r.graphQLErrors, i = r.protocolErrors, a = r.clientErrors, s = r.networkError, l = r.errorMessage, c = r.extraInfo, u = t.call(this, l) || this;
      return u.name = "ApolloError", u.graphQLErrors = n || [], u.protocolErrors = i || [], u.clientErrors = a || [], u.networkError = s || null, u.message = l || T6(u), u.extraInfo = c, u.cause = nt(nt(nt([
        s
      ], n || [], !0), i || [], !0), a || [], !0).find(function(d) {
        return !!d;
      }) || null, u.__proto__ = e.prototype, u;
    }
    return e;
  }(Error)
), Cs = Object.prototype.hasOwnProperty;
function k6(t, e) {
  return Yt(this, void 0, void 0, function() {
    var r, n, i, a, s, l, c, u, d, h, f, p, m, y, v, g, b, C, x, N, T, M, S, R;
    return Jt(this, function($) {
      switch ($.label) {
        case 0:
          if (TextDecoder === void 0)
            throw new Error("TextDecoder must be defined in the environment: please import a polyfill.");
          r = new TextDecoder("utf-8"), n = (R = t.headers) === null || R === void 0 ? void 0 : R.get("content-type"), i = "boundary=", a = n != null && n.includes(i) ? n == null ? void 0 : n.substring((n == null ? void 0 : n.indexOf(i)) + i.length).replace(/['"]/g, "").replace(/\;(.*)/gm, "").trim() : "-", s = `\r
--`.concat(a), l = "", c = C6(t), u = !0, $.label = 1;
        case 1:
          return u ? [4, c.next()] : [3, 3];
        case 2:
          for (d = $.sent(), h = d.value, f = d.done, p = typeof h == "string" ? h : r.decode(h), m = l.length - s.length + 1, u = !f, l += p, y = l.indexOf(s, m); y > -1; ) {
            if (v = void 0, M = [
              l.slice(0, y),
              l.slice(y + s.length)
            ], v = M[0], l = M[1], g = v.indexOf(`\r
\r
`), b = N6(v.slice(0, g)), C = b["content-type"], C && C.toLowerCase().indexOf("application/json") === -1)
              throw new Error("Unsupported patch content type: application/json is required.");
            if (x = v.slice(g), x) {
              if (N = uc(t, x), Object.keys(N).length > 1 || "data" in N || "incremental" in N || "errors" in N || "payload" in N)
                if (s6(N)) {
                  if (T = {}, "payload" in N) {
                    if (Object.keys(N).length === 1 && N.payload === null)
                      return [
                        2
                        /*return*/
                      ];
                    T = k({}, N.payload);
                  }
                  "errors" in N && (T = k(k({}, T), { extensions: k(k({}, "extensions" in T ? T.extensions : null), (S = {}, S[vo] = N.errors, S)) })), e(T);
                } else
                  e(N);
              else if (
                // If the chunk contains only a "hasNext: false", we can call
                // observer.complete() immediately.
                Object.keys(N).length === 1 && "hasNext" in N && !N.hasNext
              )
                return [
                  2
                  /*return*/
                ];
            }
            y = l.indexOf(s);
          }
          return [3, 1];
        case 3:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function N6(t) {
  var e = {};
  return t.split(`
`).forEach(function(r) {
    var n = r.indexOf(":");
    if (n > -1) {
      var i = r.slice(0, n).trim().toLowerCase(), a = r.slice(n + 1).trim();
      e[i] = a;
    }
  }), e;
}
function uc(t, e) {
  if (t.status >= 300) {
    var r = function() {
      try {
        return JSON.parse(e);
      } catch {
        return e;
      }
    };
    lc(t, r(), "Response not successful: Received status code ".concat(t.status));
  }
  try {
    return JSON.parse(e);
  } catch (i) {
    var n = i;
    throw n.name = "ServerParseError", n.response = t, n.statusCode = t.status, n.bodyText = e, n;
  }
}
function x6(t, e) {
  t.result && t.result.errors && t.result.data && e.next(t.result), e.error(t);
}
function F6(t) {
  return function(e) {
    return e.text().then(function(r) {
      return uc(e, r);
    }).then(function(r) {
      return !Array.isArray(r) && !Cs.call(r, "data") && !Cs.call(r, "errors") && lc(e, r, "Server response was missing for query '".concat(Array.isArray(t) ? t.map(function(n) {
        return n.operationName;
      }) : t.operationName, "'.")), r;
    });
  };
}
var Ba = function(t, e) {
  var r;
  try {
    r = JSON.stringify(t);
  } catch (i) {
    var n = Ye(40, e, i.message);
    throw n.parseError = i, n;
  }
  return r;
}, E6 = {
  includeQuery: !0,
  includeExtensions: !1,
  preserveHeaderCase: !1
}, M6 = {
  // headers are case insensitive (https://stackoverflow.com/a/5259004)
  accept: "*/*",
  // The content-type header describes the type of the body of the request, and
  // so it typically only is sent with requests that actually have bodies. One
  // could imagine that Apollo Client would remove this header when constructing
  // a GET request (which has no body), but we historically have not done that.
  // This means that browsers will preflight all Apollo Client requests (even
  // GET requests). Apollo Server's CSRF prevention feature (introduced in
  // AS3.7) takes advantage of this fact and does not block requests with this
  // header. If you want to drop this header from GET requests, then you should
  // probably replace it with a `apollo-require-preflight` header, or servers
  // with CSRF prevention enabled might block your GET request. See
  // https://www.apollographql.com/docs/apollo-server/security/cors/#preventing-cross-site-request-forgery-csrf
  // for more details.
  "content-type": "application/json"
}, S6 = {
  method: "POST"
}, A6 = {
  http: E6,
  headers: M6,
  options: S6
}, I6 = function(t, e) {
  return e(t);
};
function D6(t, e) {
  for (var r = [], n = 2; n < arguments.length; n++)
    r[n - 2] = arguments[n];
  var i = {}, a = {};
  r.forEach(function(h) {
    i = k(k(k({}, i), h.options), { headers: k(k({}, i.headers), h.headers) }), h.credentials && (i.credentials = h.credentials), a = k(k({}, a), h.http);
  }), i.headers && (i.headers = O6(i.headers, a.preserveHeaderCase));
  var s = t.operationName, l = t.extensions, c = t.variables, u = t.query, d = { operationName: s, variables: c };
  return a.includeExtensions && (d.extensions = l), a.includeQuery && (d.query = e(u, Pi)), {
    options: i,
    body: d
  };
}
function O6(t, e) {
  if (!e) {
    var r = {};
    return Object.keys(Object(t)).forEach(function(a) {
      r[a.toLowerCase()] = t[a];
    }), r;
  }
  var n = {};
  Object.keys(Object(t)).forEach(function(a) {
    n[a.toLowerCase()] = {
      originalName: a,
      value: t[a]
    };
  });
  var i = {};
  return Object.keys(n).forEach(function(a) {
    i[n[a].originalName] = n[a].value;
  }), i;
}
var L6 = function(t) {
  if (!t && typeof fetch > "u")
    throw Ye(38);
}, R6 = function(t, e) {
  var r = t.getContext(), n = r.uri;
  return n || (typeof e == "function" ? e(t) : e || "/graphql");
};
function P6(t, e) {
  var r = [], n = function(h, f) {
    r.push("".concat(h, "=").concat(encodeURIComponent(f)));
  };
  if ("query" in e && n("query", e.query), e.operationName && n("operationName", e.operationName), e.variables) {
    var i = void 0;
    try {
      i = Ba(e.variables, "Variables map");
    } catch (h) {
      return { parseError: h };
    }
    n("variables", i);
  }
  if (e.extensions) {
    var a = void 0;
    try {
      a = Ba(e.extensions, "Extensions map");
    } catch (h) {
      return { parseError: h };
    }
    n("extensions", a);
  }
  var s = "", l = t, c = t.indexOf("#");
  c !== -1 && (s = t.substr(c), l = t.substr(0, c));
  var u = l.indexOf("?") === -1 ? "?" : "&", d = l + u + r.join("&") + s;
  return { newURI: d };
}
var ws = pt(function() {
  return fetch;
}), B6 = function(t) {
  t === void 0 && (t = {});
  var e = t.uri, r = e === void 0 ? "/graphql" : e, n = t.fetch, i = t.print, a = i === void 0 ? I6 : i, s = t.includeExtensions, l = t.preserveHeaderCase, c = t.useGETForQueries, u = t.includeUnusedVariables, d = u === void 0 ? !1 : u, h = At(t, ["uri", "fetch", "print", "includeExtensions", "preserveHeaderCase", "useGETForQueries", "includeUnusedVariables"]);
  globalThis.__DEV__ !== !1 && L6(n || ws);
  var f = {
    http: { includeExtensions: s, preserveHeaderCase: l },
    options: h.fetchOptions,
    credentials: h.credentials,
    headers: h.headers
  };
  return new Gn(function(p) {
    var m = R6(p, r), y = p.getContext(), v = {};
    if (y.clientAwareness) {
      var g = y.clientAwareness, b = g.name, C = g.version;
      b && (v["apollographql-client-name"] = b), C && (v["apollographql-client-version"] = C);
    }
    var x = k(k({}, v), y.headers), N = {
      http: y.http,
      options: y.fetchOptions,
      credentials: y.credentials,
      headers: x
    };
    if (Pn(["client"], p.query)) {
      var T = tc(p.query);
      if (!T)
        return aa(new Error("HttpLink: Trying to send a client-only query to the server. To send to the server, ensure a non-client field is added to the query or set the `transformOptions.removeClientFields` option to `true`."));
      p.query = T;
    }
    var M = D6(p, a, A6, f, N), S = M.options, R = M.body;
    R.variables && !d && (R.variables = d6(R.variables, p.query));
    var $;
    !S.signal && typeof AbortController < "u" && ($ = new AbortController(), S.signal = $.signal);
    var V = function(L) {
      return L.kind === "OperationDefinition" && L.operation === "mutation";
    }, J = function(L) {
      return L.kind === "OperationDefinition" && L.operation === "subscription";
    }, F = J(Hn(p.query)), I = Pn(["defer"], p.query);
    if (c && !p.query.definitions.some(V) && (S.method = "GET"), I || F) {
      S.headers = S.headers || {};
      var O = "multipart/mixed;";
      F && I && globalThis.__DEV__ !== !1 && ce.warn(39), F ? O += "boundary=graphql;subscriptionSpec=1.0,application/json" : I && (O += "deferSpec=20220824,application/json"), S.headers.accept = O;
    }
    if (S.method === "GET") {
      var H = P6(m, R), W = H.newURI, se = H.parseError;
      if (se)
        return aa(se);
      m = W;
    } else
      try {
        S.body = Ba(R, "Payload");
      } catch (L) {
        return aa(L);
      }
    return new xe(function(L) {
      var X = n || pt(function() {
        return fetch;
      }) || ws, Me = L.next.bind(L);
      return X(m, S).then(function(me) {
        var Fe;
        p.setContext({ response: me });
        var P = (Fe = me.headers) === null || Fe === void 0 ? void 0 : Fe.get("content-type");
        return P !== null && /^multipart\/mixed/i.test(P) ? k6(me, Me) : F6(p)(me).then(Me);
      }).then(function() {
        $ = void 0, L.complete();
      }).catch(function(me) {
        $ = void 0, x6(me, L);
      }), function() {
        $ && $.abort();
      };
    });
  });
}, $6 = (
  /** @class */
  function(t) {
    Ct(e, t);
    function e(r) {
      r === void 0 && (r = {});
      var n = t.call(this, B6(r).request) || this;
      return n.options = r, n;
    }
    return e;
  }(Gn)
);
const { toString: Ts, hasOwnProperty: j6 } = Object.prototype, ks = Function.prototype.toString, $a = /* @__PURE__ */ new Map();
function Ee(t, e) {
  try {
    return ja(t, e);
  } finally {
    $a.clear();
  }
}
function ja(t, e) {
  if (t === e)
    return !0;
  const r = Ts.call(t), n = Ts.call(e);
  if (r !== n)
    return !1;
  switch (r) {
    case "[object Array]":
      if (t.length !== e.length)
        return !1;
    case "[object Object]": {
      if (xs(t, e))
        return !0;
      const i = Ns(t), a = Ns(e), s = i.length;
      if (s !== a.length)
        return !1;
      for (let l = 0; l < s; ++l)
        if (!j6.call(e, i[l]))
          return !1;
      for (let l = 0; l < s; ++l) {
        const c = i[l];
        if (!ja(t[c], e[c]))
          return !1;
      }
      return !0;
    }
    case "[object Error]":
      return t.name === e.name && t.message === e.message;
    case "[object Number]":
      if (t !== t)
        return e !== e;
    case "[object Boolean]":
    case "[object Date]":
      return +t == +e;
    case "[object RegExp]":
    case "[object String]":
      return t == `${e}`;
    case "[object Map]":
    case "[object Set]": {
      if (t.size !== e.size)
        return !1;
      if (xs(t, e))
        return !0;
      const i = t.entries(), a = r === "[object Map]";
      for (; ; ) {
        const s = i.next();
        if (s.done)
          break;
        const [l, c] = s.value;
        if (!e.has(l) || a && !ja(c, e.get(l)))
          return !1;
      }
      return !0;
    }
    case "[object Uint16Array]":
    case "[object Uint8Array]":
    case "[object Uint32Array]":
    case "[object Int32Array]":
    case "[object Int8Array]":
    case "[object Int16Array]":
    case "[object ArrayBuffer]":
      t = new Uint8Array(t), e = new Uint8Array(e);
    case "[object DataView]": {
      let i = t.byteLength;
      if (i === e.byteLength)
        for (; i-- && t[i] === e[i]; )
          ;
      return i === -1;
    }
    case "[object AsyncFunction]":
    case "[object GeneratorFunction]":
    case "[object AsyncGeneratorFunction]":
    case "[object Function]": {
      const i = ks.call(t);
      return i !== ks.call(e) ? !1 : !U6(i, q6);
    }
  }
  return !1;
}
function Ns(t) {
  return Object.keys(t).filter(V6, t);
}
function V6(t) {
  return this[t] !== void 0;
}
const q6 = "{ [native code] }";
function U6(t, e) {
  const r = t.length - e.length;
  return r >= 0 && t.indexOf(e, r) === r;
}
function xs(t, e) {
  let r = $a.get(t);
  if (r) {
    if (r.has(e))
      return !0;
  } else
    $a.set(t, r = /* @__PURE__ */ new Set());
  return r.add(e), !1;
}
function dc(t, e, r, n) {
  var i = e.data, a = At(e, ["data"]), s = r.data, l = At(r, ["data"]);
  return Ee(a, l) && pi(Hn(t).selectionSet, i, s, {
    fragmentMap: Ai(Oi(t)),
    variables: n
  });
}
function pi(t, e, r, n) {
  if (e === r)
    return !0;
  var i = /* @__PURE__ */ new Set();
  return t.selections.every(function(a) {
    if (i.has(a) || (i.add(a), !Qn(a, n.variables)) || Fs(a))
      return !0;
    if (ir(a)) {
      var s = nr(a), l = e && e[s], c = r && r[s], u = a.selectionSet;
      if (!u)
        return Ee(l, c);
      var d = Array.isArray(l), h = Array.isArray(c);
      if (d !== h)
        return !1;
      if (d && h) {
        var f = l.length;
        if (c.length !== f)
          return !1;
        for (var p = 0; p < f; ++p)
          if (!pi(u, l[p], c[p], n))
            return !1;
        return !0;
      }
      return pi(u, l, c, n);
    } else {
      var m = Ii(a, n.fragmentMap);
      if (m)
        return Fs(m) ? !0 : pi(
          m.selectionSet,
          // Notice that we reuse the same aResult and bResult values here,
          // since the fragment ...spread does not specify a field name, but
          // consists of multiple fields (within the fragment's selection set)
          // that should be applied to the current result value(s).
          e,
          r,
          n
        );
    }
  });
}
function Fs(t) {
  return !!t.directives && t.directives.some(Q6);
}
function Q6(t) {
  return t.name.value === "nonreactive";
}
var hc = (
  /** @class */
  function() {
    function t() {
      this.assumeImmutableResults = !1, this.getFragmentDoc = $n(Zy, {
        max: Lt["cache.fragmentQueryDocuments"] || 1e3,
        cache: yi
      });
    }
    return t.prototype.batch = function(e) {
      var r = this, n = typeof e.optimistic == "string" ? e.optimistic : e.optimistic === !1 ? null : void 0, i;
      return this.performTransaction(function() {
        return i = e.update(r);
      }, n), i;
    }, t.prototype.recordOptimisticTransaction = function(e, r) {
      this.performTransaction(e, r);
    }, t.prototype.transformDocument = function(e) {
      return e;
    }, t.prototype.transformForLink = function(e) {
      return e;
    }, t.prototype.identify = function(e) {
    }, t.prototype.gc = function() {
      return [];
    }, t.prototype.modify = function(e) {
      return !1;
    }, t.prototype.readQuery = function(e, r) {
      return r === void 0 && (r = !!e.optimistic), this.read(k(k({}, e), { rootId: e.id || "ROOT_QUERY", optimistic: r }));
    }, t.prototype.watchFragment = function(e) {
      var r = this, n = e.fragment, i = e.fragmentName, a = e.from, s = e.optimistic, l = s === void 0 ? !0 : s, c = At(e, ["fragment", "fragmentName", "from", "optimistic"]), u = this.getFragmentDoc(n, i), d = k(k({}, c), { returnPartialData: !0, id: (
        // While our TypeScript types do not allow for `undefined` as a valid
        // `from`, its possible `useFragment` gives us an `undefined` since it
        // calls` cache.identify` and provides that value to `from`. We are
        // adding this fix here however to ensure those using plain JavaScript
        // and using `cache.identify` themselves will avoid seeing the obscure
        // warning.
        typeof a > "u" || typeof a == "string" ? a : this.identify(a)
      ), query: u, optimistic: l }), h;
      return new xe(function(f) {
        return r.watch(k(k({}, d), { immediate: !0, callback: function(p) {
          if (
            // Always ensure we deliver the first result
            !(h && dc(u, { data: h == null ? void 0 : h.result }, { data: p.result }))
          ) {
            var m = {
              data: p.result,
              complete: !!p.complete
            };
            p.missing && (m.missing = Bi(p.missing.map(function(y) {
              return y.missing;
            }))), h = p, f.next(m);
          }
        } }));
      });
    }, t.prototype.readFragment = function(e, r) {
      return r === void 0 && (r = !!e.optimistic), this.read(k(k({}, e), { query: this.getFragmentDoc(e.fragment, e.fragmentName), rootId: e.id, optimistic: r }));
    }, t.prototype.writeQuery = function(e) {
      var r = e.id, n = e.data, i = At(e, ["id", "data"]);
      return this.write(Object.assign(i, {
        dataId: r || "ROOT_QUERY",
        result: n
      }));
    }, t.prototype.writeFragment = function(e) {
      var r = e.id, n = e.data, i = e.fragment, a = e.fragmentName, s = At(e, ["id", "data", "fragment", "fragmentName"]);
      return this.write(Object.assign(s, {
        query: this.getFragmentDoc(i, a),
        dataId: r,
        result: n
      }));
    }, t.prototype.updateQuery = function(e, r) {
      return this.batch({
        update: function(n) {
          var i = n.readQuery(e), a = r(i);
          return a == null ? i : (n.writeQuery(k(k({}, e), { data: a })), a);
        }
      });
    }, t.prototype.updateFragment = function(e, r) {
      return this.batch({
        update: function(n) {
          var i = n.readFragment(e), a = r(i);
          return a == null ? i : (n.writeFragment(k(k({}, e), { data: a })), a);
        }
      });
    }, t;
  }()
);
globalThis.__DEV__ !== !1 && (hc.prototype.getMemoryInternals = o4);
var fc = (
  /** @class */
  function(t) {
    Ct(e, t);
    function e(r, n, i, a) {
      var s, l = t.call(this, r) || this;
      if (l.message = r, l.path = n, l.query = i, l.variables = a, Array.isArray(l.path)) {
        l.missing = l.message;
        for (var c = l.path.length - 1; c >= 0; --c)
          l.missing = (s = {}, s[l.path[c]] = l.missing, s);
      } else
        l.missing = l.path;
      return l.__proto__ = e.prototype, l;
    }
    return e;
  }(Error)
), Be = Object.prototype.hasOwnProperty;
function bn(t) {
  return t == null;
}
function pc(t, e) {
  var r = t.__typename, n = t.id, i = t._id;
  if (typeof r == "string" && (e && (e.keyObject = bn(n) ? bn(i) ? void 0 : { _id: i } : { id: n }), bn(n) && !bn(i) && (n = i), !bn(n)))
    return "".concat(r, ":").concat(typeof n == "number" || typeof n == "string" ? n : JSON.stringify(n));
}
var _c = {
  dataIdFromObject: pc,
  addTypename: !0,
  resultCaching: !0,
  // Thanks to the shouldCanonizeResults helper, this should be the only line
  // you have to change to reenable canonization by default in the future.
  canonizeResults: !1
};
function W6(t) {
  return Gr(_c, t);
}
function gc(t) {
  var e = t.canonizeResults;
  return e === void 0 ? _c.canonizeResults : e;
}
function z6(t, e) {
  return be(e) ? t.get(e.__ref, "__typename") : e && e.__typename;
}
var mc = /^[_a-z][_0-9a-z]*/i;
function sr(t) {
  var e = t.match(mc);
  return e ? e[0] : t;
}
function Va(t, e, r) {
  return De(e) ? Oe(e) ? e.every(function(n) {
    return Va(t, n, r);
  }) : t.selections.every(function(n) {
    if (ir(n) && Qn(n, r)) {
      var i = nr(n);
      return Be.call(e, i) && (!n.selectionSet || Va(n.selectionSet, e[i], r));
    }
    return !0;
  }) : !1;
}
function jr(t) {
  return De(t) && !be(t) && !Oe(t);
}
function H6() {
  return new or();
}
function vc(t, e) {
  var r = Ai(Oi(t));
  return {
    fragmentMap: r,
    lookupFragment: function(n) {
      var i = r[n];
      return !i && e && (i = e.lookup(n)), i || null;
    }
  };
}
var _i = /* @__PURE__ */ Object.create(null), oa = function() {
  return _i;
}, Es = /* @__PURE__ */ Object.create(null), jn = (
  /** @class */
  function() {
    function t(e, r) {
      var n = this;
      this.policies = e, this.group = r, this.data = /* @__PURE__ */ Object.create(null), this.rootIds = /* @__PURE__ */ Object.create(null), this.refs = /* @__PURE__ */ Object.create(null), this.getFieldValue = function(i, a) {
        return La(be(i) ? n.get(i.__ref, a) : i && i[a]);
      }, this.canRead = function(i) {
        return be(i) ? n.has(i.__ref) : typeof i == "object";
      }, this.toReference = function(i, a) {
        if (typeof i == "string")
          return qr(i);
        if (be(i))
          return i;
        var s = n.policies.identify(i)[0];
        if (s) {
          var l = qr(s);
          return a && n.merge(s, i), l;
        }
      };
    }
    return t.prototype.toObject = function() {
      return k({}, this.data);
    }, t.prototype.has = function(e) {
      return this.lookup(e, !0) !== void 0;
    }, t.prototype.get = function(e, r) {
      if (this.group.depend(e, r), Be.call(this.data, e)) {
        var n = this.data[e];
        if (n && Be.call(n, r))
          return n[r];
      }
      if (r === "__typename" && Be.call(this.policies.rootTypenamesById, e))
        return this.policies.rootTypenamesById[e];
      if (this instanceof Kt)
        return this.parent.get(e, r);
    }, t.prototype.lookup = function(e, r) {
      if (r && this.group.depend(e, "__exists"), Be.call(this.data, e))
        return this.data[e];
      if (this instanceof Kt)
        return this.parent.lookup(e, r);
      if (this.policies.rootTypenamesById[e])
        return /* @__PURE__ */ Object.create(null);
    }, t.prototype.merge = function(e, r) {
      var n = this, i;
      be(e) && (e = e.__ref), be(r) && (r = r.__ref);
      var a = typeof e == "string" ? this.lookup(i = e) : e, s = typeof r == "string" ? this.lookup(i = r) : r;
      if (s) {
        ce(typeof i == "string", 1);
        var l = new or(Z6).merge(a, s);
        if (this.data[i] = l, l !== a && (delete this.refs[i], this.group.caching)) {
          var c = /* @__PURE__ */ Object.create(null);
          a || (c.__exists = 1), Object.keys(s).forEach(function(u) {
            if (!a || a[u] !== l[u]) {
              c[u] = 1;
              var d = sr(u);
              d !== u && !n.policies.hasKeyArgs(l.__typename, d) && (c[d] = 1), l[u] === void 0 && !(n instanceof Kt) && delete l[u];
            }
          }), c.__typename && !(a && a.__typename) && // Since we return default root __typename strings
          // automatically from store.get, we don't need to dirty the
          // ROOT_QUERY.__typename field if merged.__typename is equal
          // to the default string (usually "Query").
          this.policies.rootTypenamesById[i] === l.__typename && delete c.__typename, Object.keys(c).forEach(function(u) {
            return n.group.dirty(i, u);
          });
        }
      }
    }, t.prototype.modify = function(e, r) {
      var n = this, i = this.lookup(e);
      if (i) {
        var a = /* @__PURE__ */ Object.create(null), s = !1, l = !0, c = {
          DELETE: _i,
          INVALIDATE: Es,
          isReference: be,
          toReference: this.toReference,
          canRead: this.canRead,
          readField: function(u, d) {
            return n.policies.readField(typeof u == "string" ? {
              fieldName: u,
              from: d || qr(e)
            } : u, { store: n });
          }
        };
        if (Object.keys(i).forEach(function(u) {
          var d = sr(u), h = i[u];
          if (h !== void 0) {
            var f = typeof r == "function" ? r : r[u] || r[d];
            if (f) {
              var p = f === oa ? _i : f(La(h), k(k({}, c), { fieldName: d, storeFieldName: u, storage: n.getStorage(e, u) }));
              if (p === Es)
                n.group.dirty(e, u);
              else if (p === _i && (p = void 0), p !== h && (a[u] = p, s = !0, h = p, globalThis.__DEV__ !== !1)) {
                var m = function(N) {
                  if (n.lookup(N.__ref) === void 0)
                    return globalThis.__DEV__ !== !1 && ce.warn(2, N), !0;
                };
                if (be(p))
                  m(p);
                else if (Array.isArray(p))
                  for (var y = !1, v = void 0, g = 0, b = p; g < b.length; g++) {
                    var C = b[g];
                    if (be(C)) {
                      if (y = !0, m(C))
                        break;
                    } else if (typeof C == "object" && C) {
                      var x = n.policies.identify(C)[0];
                      x && (v = C);
                    }
                    if (y && v !== void 0) {
                      globalThis.__DEV__ !== !1 && ce.warn(3, v);
                      break;
                    }
                  }
              }
            }
            h !== void 0 && (l = !1);
          }
        }), s)
          return this.merge(e, a), l && (this instanceof Kt ? this.data[e] = void 0 : delete this.data[e], this.group.dirty(e, "__exists")), !0;
      }
      return !1;
    }, t.prototype.delete = function(e, r, n) {
      var i, a = this.lookup(e);
      if (a) {
        var s = this.getFieldValue(a, "__typename"), l = r && n ? this.policies.getStoreFieldName({ typename: s, fieldName: r, args: n }) : r;
        return this.modify(e, l ? (i = {}, i[l] = oa, i) : oa);
      }
      return !1;
    }, t.prototype.evict = function(e, r) {
      var n = !1;
      return e.id && (Be.call(this.data, e.id) && (n = this.delete(e.id, e.fieldName, e.args)), this instanceof Kt && this !== r && (n = this.parent.evict(e, r) || n), (e.fieldName || n) && this.group.dirty(e.id, e.fieldName || "__exists")), n;
    }, t.prototype.clear = function() {
      this.replace(null);
    }, t.prototype.extract = function() {
      var e = this, r = this.toObject(), n = [];
      return this.getRootIdSet().forEach(function(i) {
        Be.call(e.policies.rootTypenamesById, i) || n.push(i);
      }), n.length && (r.__META = { extraRootIds: n.sort() }), r;
    }, t.prototype.replace = function(e) {
      var r = this;
      if (Object.keys(this.data).forEach(function(a) {
        e && Be.call(e, a) || r.delete(a);
      }), e) {
        var n = e.__META, i = At(e, ["__META"]);
        Object.keys(i).forEach(function(a) {
          r.merge(a, i[a]);
        }), n && n.extraRootIds.forEach(this.retain, this);
      }
    }, t.prototype.retain = function(e) {
      return this.rootIds[e] = (this.rootIds[e] || 0) + 1;
    }, t.prototype.release = function(e) {
      if (this.rootIds[e] > 0) {
        var r = --this.rootIds[e];
        return r || delete this.rootIds[e], r;
      }
      return 0;
    }, t.prototype.getRootIdSet = function(e) {
      return e === void 0 && (e = /* @__PURE__ */ new Set()), Object.keys(this.rootIds).forEach(e.add, e), this instanceof Kt ? this.parent.getRootIdSet(e) : Object.keys(this.policies.rootTypenamesById).forEach(e.add, e), e;
    }, t.prototype.gc = function() {
      var e = this, r = this.getRootIdSet(), n = this.toObject();
      r.forEach(function(s) {
        Be.call(n, s) && (Object.keys(e.findChildRefIds(s)).forEach(r.add, r), delete n[s]);
      });
      var i = Object.keys(n);
      if (i.length) {
        for (var a = this; a instanceof Kt; )
          a = a.parent;
        i.forEach(function(s) {
          return a.delete(s);
        });
      }
      return i;
    }, t.prototype.findChildRefIds = function(e) {
      if (!Be.call(this.refs, e)) {
        var r = this.refs[e] = /* @__PURE__ */ Object.create(null), n = this.data[e];
        if (!n)
          return r;
        var i = /* @__PURE__ */ new Set([n]);
        i.forEach(function(a) {
          be(a) && (r[a.__ref] = !0), De(a) && Object.keys(a).forEach(function(s) {
            var l = a[s];
            De(l) && i.add(l);
          });
        });
      }
      return this.refs[e];
    }, t.prototype.makeCacheKey = function() {
      return this.group.keyMaker.lookupArray(arguments);
    }, t;
  }()
), yc = (
  /** @class */
  function() {
    function t(e, r) {
      r === void 0 && (r = null), this.caching = e, this.parent = r, this.d = null, this.resetCaching();
    }
    return t.prototype.resetCaching = function() {
      this.d = this.caching ? Yl() : null, this.keyMaker = new Yr(Jr);
    }, t.prototype.depend = function(e, r) {
      if (this.d) {
        this.d(sa(e, r));
        var n = sr(r);
        n !== r && this.d(sa(e, n)), this.parent && this.parent.depend(e, r);
      }
    }, t.prototype.dirty = function(e, r) {
      this.d && this.d.dirty(
        sa(e, r),
        // When storeFieldName === "__exists", that means the entity identified
        // by dataId has either disappeared from the cache or was newly added,
        // so the result caching system would do well to "forget everything it
        // knows" about that object. To achieve that kind of invalidation, we
        // not only dirty the associated result cache entry, but also remove it
        // completely from the dependency graph. For the optimism implementation
        // details, see https://github.com/benjamn/optimism/pull/195.
        r === "__exists" ? "forget" : "setDirty"
      );
    }, t;
  }()
);
function sa(t, e) {
  return e + "#" + t;
}
function Ms(t, e) {
  Sn(t) && t.group.depend(e, "__exists");
}
(function(t) {
  var e = (
    /** @class */
    function(r) {
      Ct(n, r);
      function n(i) {
        var a = i.policies, s = i.resultCaching, l = s === void 0 ? !0 : s, c = i.seed, u = r.call(this, a, new yc(l)) || this;
        return u.stump = new G6(u), u.storageTrie = new Yr(Jr), c && u.replace(c), u;
      }
      return n.prototype.addLayer = function(i, a) {
        return this.stump.addLayer(i, a);
      }, n.prototype.removeLayer = function() {
        return this;
      }, n.prototype.getStorage = function() {
        return this.storageTrie.lookupArray(arguments);
      }, n;
    }(t)
  );
  t.Root = e;
})(jn || (jn = {}));
var Kt = (
  /** @class */
  function(t) {
    Ct(e, t);
    function e(r, n, i, a) {
      var s = t.call(this, n.policies, a) || this;
      return s.id = r, s.parent = n, s.replay = i, s.group = a, i(s), s;
    }
    return e.prototype.addLayer = function(r, n) {
      return new e(r, this, n, this.group);
    }, e.prototype.removeLayer = function(r) {
      var n = this, i = this.parent.removeLayer(r);
      return r === this.id ? (this.group.caching && Object.keys(this.data).forEach(function(a) {
        var s = n.data[a], l = i.lookup(a);
        l ? s ? s !== l && Object.keys(s).forEach(function(c) {
          Ee(s[c], l[c]) || n.group.dirty(a, c);
        }) : (n.group.dirty(a, "__exists"), Object.keys(l).forEach(function(c) {
          n.group.dirty(a, c);
        })) : n.delete(a);
      }), i) : i === this.parent ? this : i.addLayer(this.id, this.replay);
    }, e.prototype.toObject = function() {
      return k(k({}, this.parent.toObject()), this.data);
    }, e.prototype.findChildRefIds = function(r) {
      var n = this.parent.findChildRefIds(r);
      return Be.call(this.data, r) ? k(k({}, n), t.prototype.findChildRefIds.call(this, r)) : n;
    }, e.prototype.getStorage = function() {
      for (var r = this.parent; r.parent; )
        r = r.parent;
      return r.getStorage.apply(
        r,
        // @ts-expect-error
        arguments
      );
    }, e;
  }(jn)
), G6 = (
  /** @class */
  function(t) {
    Ct(e, t);
    function e(r) {
      return t.call(this, "EntityStore.Stump", r, function() {
      }, new yc(r.group.caching, r.group)) || this;
    }
    return e.prototype.removeLayer = function() {
      return this;
    }, e.prototype.merge = function(r, n) {
      return this.parent.merge(r, n);
    }, e;
  }(Kt)
);
function Z6(t, e, r) {
  var n = t[r], i = e[r];
  return Ee(n, i) ? n : i;
}
function Sn(t) {
  return !!(t instanceof jn && t.group.caching);
}
function K6(t) {
  return De(t) ? Oe(t) ? t.slice(0) : k({ __proto__: Object.getPrototypeOf(t) }, t) : t;
}
var Ss = (
  /** @class */
  function() {
    function t() {
      this.known = new (Sl ? WeakSet : Set)(), this.pool = new Yr(Jr), this.passes = /* @__PURE__ */ new WeakMap(), this.keysByJSON = /* @__PURE__ */ new Map(), this.empty = this.admit({});
    }
    return t.prototype.isKnown = function(e) {
      return De(e) && this.known.has(e);
    }, t.prototype.pass = function(e) {
      if (De(e)) {
        var r = K6(e);
        return this.passes.set(r, e), r;
      }
      return e;
    }, t.prototype.admit = function(e) {
      var r = this;
      if (De(e)) {
        var n = this.passes.get(e);
        if (n)
          return n;
        var i = Object.getPrototypeOf(e);
        switch (i) {
          case Array.prototype: {
            if (this.known.has(e))
              return e;
            var a = e.map(this.admit, this), s = this.pool.lookupArray(a);
            return s.array || (this.known.add(s.array = a), globalThis.__DEV__ !== !1 && Object.freeze(a)), s.array;
          }
          case null:
          case Object.prototype: {
            if (this.known.has(e))
              return e;
            var l = Object.getPrototypeOf(e), c = [l], u = this.sortedKeys(e);
            c.push(u.json);
            var d = c.length;
            u.sorted.forEach(function(p) {
              c.push(r.admit(e[p]));
            });
            var s = this.pool.lookupArray(c);
            if (!s.object) {
              var h = s.object = Object.create(l);
              this.known.add(h), u.sorted.forEach(function(p, m) {
                h[p] = c[d + m];
              }), globalThis.__DEV__ !== !1 && Object.freeze(h);
            }
            return s.object;
          }
        }
      }
      return e;
    }, t.prototype.sortedKeys = function(e) {
      var r = Object.keys(e), n = this.pool.lookupArray(r);
      if (!n.keys) {
        r.sort();
        var i = JSON.stringify(r);
        (n.keys = this.keysByJSON.get(i)) || this.keysByJSON.set(i, n.keys = { sorted: r, json: i });
      }
      return n.keys;
    }, t;
  }()
);
function As(t) {
  return [
    t.selectionSet,
    t.objectOrReference,
    t.context,
    // We split out this property so we can pass different values
    // independently without modifying options.context itself.
    t.context.canonizeResults
  ];
}
var Y6 = (
  /** @class */
  function() {
    function t(e) {
      var r = this;
      this.knownResults = new (Jr ? WeakMap : Map)(), this.config = Gr(e, {
        addTypename: e.addTypename !== !1,
        canonizeResults: gc(e)
      }), this.canon = e.canon || new Ss(), this.executeSelectionSet = $n(function(n) {
        var i, a = n.context.canonizeResults, s = As(n);
        s[3] = !a;
        var l = (i = r.executeSelectionSet).peek.apply(i, s);
        return l ? a ? k(k({}, l), {
          // If we previously read this result without canonizing it, we can
          // reuse that result simply by canonizing it now.
          result: r.canon.admit(l.result)
        }) : l : (Ms(n.context.store, n.enclosingRef.__ref), r.execSelectionSetImpl(n));
      }, {
        max: this.config.resultCacheMaxSize || Lt["inMemoryCache.executeSelectionSet"] || 5e4,
        keyArgs: As,
        // Note that the parameters of makeCacheKey are determined by the
        // array returned by keyArgs.
        makeCacheKey: function(n, i, a, s) {
          if (Sn(a.store))
            return a.store.makeCacheKey(n, be(i) ? i.__ref : i, a.varString, s);
        }
      }), this.executeSubSelectedArray = $n(function(n) {
        return Ms(n.context.store, n.enclosingRef.__ref), r.execSubSelectedArrayImpl(n);
      }, {
        max: this.config.resultCacheMaxSize || Lt["inMemoryCache.executeSubSelectedArray"] || 1e4,
        makeCacheKey: function(n) {
          var i = n.field, a = n.array, s = n.context;
          if (Sn(s.store))
            return s.store.makeCacheKey(i, a, s.varString);
        }
      });
    }
    return t.prototype.resetCanon = function() {
      this.canon = new Ss();
    }, t.prototype.diffQueryAgainstStore = function(e) {
      var r = e.store, n = e.query, i = e.rootId, a = i === void 0 ? "ROOT_QUERY" : i, s = e.variables, l = e.returnPartialData, c = l === void 0 ? !0 : l, u = e.canonizeResults, d = u === void 0 ? this.config.canonizeResults : u, h = this.config.cache.policies;
      s = k(k({}, so($l(n))), s);
      var f = qr(a), p = this.executeSelectionSet({
        selectionSet: Hn(n).selectionSet,
        objectOrReference: f,
        enclosingRef: f,
        context: k({ store: r, query: n, policies: h, variables: s, varString: tr(s), canonizeResults: d }, vc(n, this.config.fragments))
      }), m;
      if (p.missing && (m = [
        new fc(J6(p.missing), p.missing, n, s)
      ], !c))
        throw m[0];
      return {
        result: p.result,
        complete: !m,
        missing: m
      };
    }, t.prototype.isFresh = function(e, r, n, i) {
      if (Sn(i.store) && this.knownResults.get(e) === n) {
        var a = this.executeSelectionSet.peek(
          n,
          r,
          i,
          // If result is canonical, then it could only have been previously
          // cached by the canonizing version of executeSelectionSet, so we can
          // avoid checking both possibilities here.
          this.canon.isKnown(e)
        );
        if (a && e === a.result)
          return !0;
      }
      return !1;
    }, t.prototype.execSelectionSetImpl = function(e) {
      var r = this, n = e.selectionSet, i = e.objectOrReference, a = e.enclosingRef, s = e.context;
      if (be(i) && !s.policies.rootTypenamesById[i.__ref] && !s.store.has(i.__ref))
        return {
          result: this.canon.empty,
          missing: "Dangling reference to missing ".concat(i.__ref, " object")
        };
      var l = s.variables, c = s.policies, u = s.store, d = u.getFieldValue(i, "__typename"), h = [], f, p = new or();
      this.config.addTypename && typeof d == "string" && !c.rootIdsByTypename[d] && h.push({ __typename: d });
      function m(C, x) {
        var N;
        return C.missing && (f = p.merge(f, (N = {}, N[x] = C.missing, N))), C.result;
      }
      var y = new Set(n.selections);
      y.forEach(function(C) {
        var x, N;
        if (Qn(C, l))
          if (ir(C)) {
            var T = c.readField({
              fieldName: C.name.value,
              field: C,
              variables: s.variables,
              from: i
            }, s), M = nr(C);
            T === void 0 ? fo.added(C) || (f = p.merge(f, (x = {}, x[M] = "Can't find field '".concat(C.name.value, "' on ").concat(be(i) ? i.__ref + " object" : "object " + JSON.stringify(i, null, 2)), x))) : Oe(T) ? T.length > 0 && (T = m(r.executeSubSelectedArray({
              field: C,
              array: T,
              enclosingRef: a,
              context: s
            }), M)) : C.selectionSet ? T != null && (T = m(r.executeSelectionSet({
              selectionSet: C.selectionSet,
              objectOrReference: T,
              enclosingRef: be(T) ? T : a,
              context: s
            }), M)) : s.canonizeResults && (T = r.canon.pass(T)), T !== void 0 && h.push((N = {}, N[M] = T, N));
          } else {
            var S = Ii(C, s.lookupFragment);
            if (!S && C.kind === ee.FRAGMENT_SPREAD)
              throw Ye(9, C.name.value);
            S && c.fragmentMatches(S, d) && S.selectionSet.selections.forEach(y.add, y);
          }
      });
      var v = Bi(h), g = { result: v, missing: f }, b = s.canonizeResults ? this.canon.admit(g) : La(g);
      return b.result && this.knownResults.set(b.result, n), b;
    }, t.prototype.execSubSelectedArrayImpl = function(e) {
      var r = this, n = e.field, i = e.array, a = e.enclosingRef, s = e.context, l, c = new or();
      function u(d, h) {
        var f;
        return d.missing && (l = c.merge(l, (f = {}, f[h] = d.missing, f))), d.result;
      }
      return n.selectionSet && (i = i.filter(s.store.canRead)), i = i.map(function(d, h) {
        return d === null ? null : Oe(d) ? u(r.executeSubSelectedArray({
          field: n,
          array: d,
          enclosingRef: a,
          context: s
        }), h) : n.selectionSet ? u(r.executeSelectionSet({
          selectionSet: n.selectionSet,
          objectOrReference: d,
          enclosingRef: be(d) ? d : a,
          context: s
        }), h) : (globalThis.__DEV__ !== !1 && X6(s.store, n, d), d);
      }), {
        result: s.canonizeResults ? this.canon.admit(i) : i,
        missing: l
      };
    }, t;
  }()
);
function J6(t) {
  try {
    JSON.stringify(t, function(e, r) {
      if (typeof r == "string")
        throw r;
      return r;
    });
  } catch (e) {
    return e;
  }
}
function X6(t, e, r) {
  if (!e.selectionSet) {
    var n = /* @__PURE__ */ new Set([r]);
    n.forEach(function(i) {
      De(i) && (ce(
        !be(i),
        10,
        z6(t, i),
        e.name.value
      ), Object.values(i).forEach(n.add, n));
    });
  }
}
var yo = new jl(), Is = /* @__PURE__ */ new WeakMap();
function An(t) {
  var e = Is.get(t);
  return e || Is.set(t, e = {
    vars: /* @__PURE__ */ new Set(),
    dep: Yl()
  }), e;
}
function Ds(t) {
  An(t).vars.forEach(function(e) {
    return e.forgetCache(t);
  });
}
function e5(t) {
  An(t).vars.forEach(function(e) {
    return e.attachCache(t);
  });
}
function t5(t) {
  var e = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), n = function(a) {
    if (arguments.length > 0) {
      if (t !== a) {
        t = a, e.forEach(function(c) {
          An(c).dep.dirty(n), r5(c);
        });
        var s = Array.from(r);
        r.clear(), s.forEach(function(c) {
          return c(t);
        });
      }
    } else {
      var l = yo.getValue();
      l && (i(l), An(l).dep(n));
    }
    return t;
  };
  n.onNextChange = function(a) {
    return r.add(a), function() {
      r.delete(a);
    };
  };
  var i = n.attachCache = function(a) {
    return e.add(a), An(a).vars.add(n), n;
  };
  return n.forgetCache = function(a) {
    return e.delete(a);
  }, n;
}
function r5(t) {
  t.broadcastWatches && t.broadcastWatches();
}
var Os = /* @__PURE__ */ Object.create(null);
function bo(t) {
  var e = JSON.stringify(t);
  return Os[e] || (Os[e] = /* @__PURE__ */ Object.create(null));
}
function Ls(t) {
  var e = bo(t);
  return e.keyFieldsFn || (e.keyFieldsFn = function(r, n) {
    var i = function(s, l) {
      return n.readField(l, s);
    }, a = n.keyObject = Co(t, function(s) {
      var l = Qr(
        n.storeObject,
        s,
        // Using context.readField to extract paths from context.storeObject
        // allows the extraction to see through Reference objects and respect
        // custom read functions.
        i
      );
      return l === void 0 && r !== n.storeObject && Be.call(r, s[0]) && (l = Qr(r, s, Cc)), ce(l !== void 0, 4, s.join("."), r), l;
    });
    return "".concat(n.typename, ":").concat(JSON.stringify(a));
  });
}
function Rs(t) {
  var e = bo(t);
  return e.keyArgsFn || (e.keyArgsFn = function(r, n) {
    var i = n.field, a = n.variables, s = n.fieldName, l = Co(t, function(u) {
      var d = u[0], h = d.charAt(0);
      if (h === "@") {
        if (i && bt(i.directives)) {
          var f = d.slice(1), p = i.directives.find(function(g) {
            return g.name.value === f;
          }), m = p && Di(p, a);
          return m && Qr(
            m,
            // If keyPath.length === 1, this code calls extractKeyPath with an
            // empty path, which works because it uses directiveArgs as the
            // extracted value.
            u.slice(1)
          );
        }
        return;
      }
      if (h === "$") {
        var y = d.slice(1);
        if (a && Be.call(a, y)) {
          var v = u.slice(0);
          return v[0] = y, Qr(a, v);
        }
        return;
      }
      if (r)
        return Qr(r, u);
    }), c = JSON.stringify(l);
    return (r || c !== "{}") && (s += ":" + c), s;
  });
}
function Co(t, e) {
  var r = new or();
  return bc(t).reduce(function(n, i) {
    var a, s = e(i);
    if (s !== void 0) {
      for (var l = i.length - 1; l >= 0; --l)
        s = (a = {}, a[i[l]] = s, a);
      n = r.merge(n, s);
    }
    return n;
  }, /* @__PURE__ */ Object.create(null));
}
function bc(t) {
  var e = bo(t);
  if (!e.paths) {
    var r = e.paths = [], n = [];
    t.forEach(function(i, a) {
      Oe(i) ? (bc(i).forEach(function(s) {
        return r.push(n.concat(s));
      }), n.length = 0) : (n.push(i), Oe(t[a + 1]) || (r.push(n.slice(0)), n.length = 0));
    });
  }
  return e.paths;
}
function Cc(t, e) {
  return t[e];
}
function Qr(t, e, r) {
  return r = r || Cc, wc(e.reduce(function n(i, a) {
    return Oe(i) ? i.map(function(s) {
      return n(s, a);
    }) : i && r(i, a);
  }, t));
}
function wc(t) {
  return De(t) ? Oe(t) ? t.map(wc) : Co(Object.keys(t).sort(), function(e) {
    return Qr(t, e);
  }) : t;
}
function qa(t) {
  return t.args !== void 0 ? t.args : t.field ? Di(t.field, t.variables) : null;
}
var n5 = function() {
}, Ps = function(t, e) {
  return e.fieldName;
}, Bs = function(t, e, r) {
  var n = r.mergeObjects;
  return n(t, e);
}, $s = function(t, e) {
  return e;
}, i5 = (
  /** @class */
  function() {
    function t(e) {
      this.config = e, this.typePolicies = /* @__PURE__ */ Object.create(null), this.toBeAdded = /* @__PURE__ */ Object.create(null), this.supertypeMap = /* @__PURE__ */ new Map(), this.fuzzySubtypes = /* @__PURE__ */ new Map(), this.rootIdsByTypename = /* @__PURE__ */ Object.create(null), this.rootTypenamesById = /* @__PURE__ */ Object.create(null), this.usingPossibleTypes = !1, this.config = k({ dataIdFromObject: pc }, e), this.cache = this.config.cache, this.setRootTypename("Query"), this.setRootTypename("Mutation"), this.setRootTypename("Subscription"), e.possibleTypes && this.addPossibleTypes(e.possibleTypes), e.typePolicies && this.addTypePolicies(e.typePolicies);
    }
    return t.prototype.identify = function(e, r) {
      var n, i = this, a = r && (r.typename || ((n = r.storeObject) === null || n === void 0 ? void 0 : n.__typename)) || e.__typename;
      if (a === this.rootTypenamesById.ROOT_QUERY)
        return ["ROOT_QUERY"];
      for (var s = r && r.storeObject || e, l = k(k({}, r), { typename: a, storeObject: s, readField: r && r.readField || function() {
        var f = wo(arguments, s);
        return i.readField(f, {
          store: i.cache.data,
          variables: f.variables
        });
      } }), c, u = a && this.getTypePolicy(a), d = u && u.keyFn || this.config.dataIdFromObject; d; ) {
        var h = d(k(k({}, e), s), l);
        if (Oe(h))
          d = Ls(h);
        else {
          c = h;
          break;
        }
      }
      return c = c ? String(c) : void 0, l.keyObject ? [c, l.keyObject] : [c];
    }, t.prototype.addTypePolicies = function(e) {
      var r = this;
      Object.keys(e).forEach(function(n) {
        var i = e[n], a = i.queryType, s = i.mutationType, l = i.subscriptionType, c = At(i, ["queryType", "mutationType", "subscriptionType"]);
        a && r.setRootTypename("Query", n), s && r.setRootTypename("Mutation", n), l && r.setRootTypename("Subscription", n), Be.call(r.toBeAdded, n) ? r.toBeAdded[n].push(c) : r.toBeAdded[n] = [c];
      });
    }, t.prototype.updateTypePolicy = function(e, r) {
      var n = this, i = this.getTypePolicy(e), a = r.keyFields, s = r.fields;
      function l(c, u) {
        c.merge = typeof u == "function" ? u : u === !0 ? Bs : u === !1 ? $s : c.merge;
      }
      l(i, r.merge), i.keyFn = // Pass false to disable normalization for this typename.
      a === !1 ? n5 : Oe(a) ? Ls(a) : typeof a == "function" ? a : i.keyFn, s && Object.keys(s).forEach(function(c) {
        var u = n.getFieldPolicy(e, c, !0), d = s[c];
        if (typeof d == "function")
          u.read = d;
        else {
          var h = d.keyArgs, f = d.read, p = d.merge;
          u.keyFn = // Pass false to disable argument-based differentiation of
          // field identities.
          h === !1 ? Ps : Oe(h) ? Rs(h) : typeof h == "function" ? h : u.keyFn, typeof f == "function" && (u.read = f), l(u, p);
        }
        u.read && u.merge && (u.keyFn = u.keyFn || Ps);
      });
    }, t.prototype.setRootTypename = function(e, r) {
      r === void 0 && (r = e);
      var n = "ROOT_" + e.toUpperCase(), i = this.rootTypenamesById[n];
      r !== i && (ce(!i || i === e, 5, e), i && delete this.rootIdsByTypename[i], this.rootIdsByTypename[r] = n, this.rootTypenamesById[n] = r);
    }, t.prototype.addPossibleTypes = function(e) {
      var r = this;
      this.usingPossibleTypes = !0, Object.keys(e).forEach(function(n) {
        r.getSupertypeSet(n, !0), e[n].forEach(function(i) {
          r.getSupertypeSet(i, !0).add(n);
          var a = i.match(mc);
          (!a || a[0] !== i) && r.fuzzySubtypes.set(i, new RegExp(i));
        });
      });
    }, t.prototype.getTypePolicy = function(e) {
      var r = this;
      if (!Be.call(this.typePolicies, e)) {
        var n = this.typePolicies[e] = /* @__PURE__ */ Object.create(null);
        n.fields = /* @__PURE__ */ Object.create(null);
        var i = this.supertypeMap.get(e);
        !i && this.fuzzySubtypes.size && (i = this.getSupertypeSet(e, !0), this.fuzzySubtypes.forEach(function(s, l) {
          if (s.test(e)) {
            var c = r.supertypeMap.get(l);
            c && c.forEach(function(u) {
              return i.add(u);
            });
          }
        })), i && i.size && i.forEach(function(s) {
          var l = r.getTypePolicy(s), c = l.fields, u = At(l, ["fields"]);
          Object.assign(n, u), Object.assign(n.fields, c);
        });
      }
      var a = this.toBeAdded[e];
      return a && a.length && a.splice(0).forEach(function(s) {
        r.updateTypePolicy(e, s);
      }), this.typePolicies[e];
    }, t.prototype.getFieldPolicy = function(e, r, n) {
      if (e) {
        var i = this.getTypePolicy(e).fields;
        return i[r] || n && (i[r] = /* @__PURE__ */ Object.create(null));
      }
    }, t.prototype.getSupertypeSet = function(e, r) {
      var n = this.supertypeMap.get(e);
      return !n && r && this.supertypeMap.set(e, n = /* @__PURE__ */ new Set()), n;
    }, t.prototype.fragmentMatches = function(e, r, n, i) {
      var a = this;
      if (!e.typeCondition)
        return !0;
      if (!r)
        return !1;
      var s = e.typeCondition.name.value;
      if (r === s)
        return !0;
      if (this.usingPossibleTypes && this.supertypeMap.has(s))
        for (var l = this.getSupertypeSet(r, !0), c = [l], u = function(m) {
          var y = a.getSupertypeSet(m, !1);
          y && y.size && c.indexOf(y) < 0 && c.push(y);
        }, d = !!(n && this.fuzzySubtypes.size), h = !1, f = 0; f < c.length; ++f) {
          var p = c[f];
          if (p.has(s))
            return l.has(s) || (h && globalThis.__DEV__ !== !1 && ce.warn(6, r, s), l.add(s)), !0;
          p.forEach(u), d && // Start checking fuzzy subtypes only after exhausting all
          // non-fuzzy subtypes (after the final iteration of the loop).
          f === c.length - 1 && // We could wait to compare fragment.selectionSet to result
          // after we verify the supertype, but this check is often less
          // expensive than that search, and we will have to do the
          // comparison anyway whenever we find a potential match.
          Va(e.selectionSet, n, i) && (d = !1, h = !0, this.fuzzySubtypes.forEach(function(m, y) {
            var v = r.match(m);
            v && v[0] === r && u(y);
          }));
        }
      return !1;
    }, t.prototype.hasKeyArgs = function(e, r) {
      var n = this.getFieldPolicy(e, r, !1);
      return !!(n && n.keyFn);
    }, t.prototype.getStoreFieldName = function(e) {
      var r = e.typename, n = e.fieldName, i = this.getFieldPolicy(r, n, !1), a, s = i && i.keyFn;
      if (s && r)
        for (var l = {
          typename: r,
          fieldName: n,
          field: e.field || null,
          variables: e.variables
        }, c = qa(e); s; ) {
          var u = s(c, l);
          if (Oe(u))
            s = Rs(u);
          else {
            a = u || n;
            break;
          }
        }
      return a === void 0 && (a = e.field ? T4(e.field, e.variables) : Bl(n, qa(e))), a === !1 ? n : n === sr(a) ? a : n + ":" + a;
    }, t.prototype.readField = function(e, r) {
      var n = e.from;
      if (n) {
        var i = e.field || e.fieldName;
        if (i) {
          if (e.typename === void 0) {
            var a = r.store.getFieldValue(n, "__typename");
            a && (e.typename = a);
          }
          var s = this.getStoreFieldName(e), l = sr(s), c = r.store.getFieldValue(n, s), u = this.getFieldPolicy(e.typename, l, !1), d = u && u.read;
          if (d) {
            var h = js(this, n, e, r, r.store.getStorage(be(n) ? n.__ref : n, s));
            return yo.withValue(this.cache, d, [
              c,
              h
            ]);
          }
          return c;
        }
      }
    }, t.prototype.getReadFunction = function(e, r) {
      var n = this.getFieldPolicy(e, r, !1);
      return n && n.read;
    }, t.prototype.getMergeFunction = function(e, r, n) {
      var i = this.getFieldPolicy(e, r, !1), a = i && i.merge;
      return !a && n && (i = this.getTypePolicy(n), a = i && i.merge), a;
    }, t.prototype.runMergeFunction = function(e, r, n, i, a) {
      var s = n.field, l = n.typename, c = n.merge;
      return c === Bs ? Tc(i.store)(e, r) : c === $s ? r : (i.overwrite && (e = void 0), c(e, r, js(
        this,
        // Unlike options.readField for read functions, we do not fall
        // back to the current object if no foreignObjOrRef is provided,
        // because it's not clear what the current object should be for
        // merge functions: the (possibly undefined) existing object, or
        // the incoming object? If you think your merge function needs
        // to read sibling fields in order to produce a new value for
        // the current field, you might want to rethink your strategy,
        // because that's a recipe for making merge behavior sensitive
        // to the order in which fields are written into the cache.
        // However, readField(name, ref) is useful for merge functions
        // that need to deduplicate child objects and references.
        void 0,
        {
          typename: l,
          fieldName: s.name.value,
          field: s,
          variables: i.variables
        },
        i,
        a || /* @__PURE__ */ Object.create(null)
      )));
    }, t;
  }()
);
function js(t, e, r, n, i) {
  var a = t.getStoreFieldName(r), s = sr(a), l = r.variables || n.variables, c = n.store, u = c.toReference, d = c.canRead;
  return {
    args: qa(r),
    field: r.field || null,
    fieldName: s,
    storeFieldName: a,
    variables: l,
    isReference: be,
    toReference: u,
    storage: i,
    cache: t.cache,
    canRead: d,
    readField: function() {
      return t.readField(wo(arguments, e, l), n);
    },
    mergeObjects: Tc(n.store)
  };
}
function wo(t, e, r) {
  var n = t[0], i = t[1], a = t.length, s;
  return typeof n == "string" ? s = {
    fieldName: n,
    // Default to objectOrReference only when no second argument was
    // passed for the from parameter, not when undefined is explicitly
    // passed as the second argument.
    from: a > 1 ? i : e
  } : (s = k({}, n), Be.call(s, "from") || (s.from = e)), globalThis.__DEV__ !== !1 && s.from === void 0 && globalThis.__DEV__ !== !1 && ce.warn(7, ml(Array.from(t))), s.variables === void 0 && (s.variables = r), s;
}
function Tc(t) {
  return function(r, n) {
    if (Oe(r) || Oe(n))
      throw Ye(8);
    if (De(r) && De(n)) {
      var i = t.getFieldValue(r, "__typename"), a = t.getFieldValue(n, "__typename"), s = i && a && i !== a;
      if (s)
        return n;
      if (be(r) && jr(n))
        return t.merge(r.__ref, n), r;
      if (jr(r) && be(n))
        return t.merge(r, n.__ref), n;
      if (jr(r) && jr(n))
        return k(k({}, r), n);
    }
    return n;
  };
}
function la(t, e, r) {
  var n = "".concat(e).concat(r), i = t.flavors.get(n);
  return i || t.flavors.set(n, i = t.clientOnly === e && t.deferred === r ? t : k(k({}, t), { clientOnly: e, deferred: r })), i;
}
var a5 = (
  /** @class */
  function() {
    function t(e, r, n) {
      this.cache = e, this.reader = r, this.fragments = n;
    }
    return t.prototype.writeToStore = function(e, r) {
      var n = this, i = r.query, a = r.result, s = r.dataId, l = r.variables, c = r.overwrite, u = zn(i), d = H6();
      l = k(k({}, so(u)), l);
      var h = k(k({ store: e, written: /* @__PURE__ */ Object.create(null), merge: function(p, m) {
        return d.merge(p, m);
      }, variables: l, varString: tr(l) }, vc(i, this.fragments)), { overwrite: !!c, incomingById: /* @__PURE__ */ new Map(), clientOnly: !1, deferred: !1, flavors: /* @__PURE__ */ new Map() }), f = this.processSelectionSet({
        result: a || /* @__PURE__ */ Object.create(null),
        dataId: s,
        selectionSet: u.selectionSet,
        mergeTree: { map: /* @__PURE__ */ new Map() },
        context: h
      });
      if (!be(f))
        throw Ye(11, a);
      return h.incomingById.forEach(function(p, m) {
        var y = p.storeObject, v = p.mergeTree, g = p.fieldNodeSet, b = qr(m);
        if (v && v.map.size) {
          var C = n.applyMerges(v, b, y, h);
          if (be(C))
            return;
          y = C;
        }
        if (globalThis.__DEV__ !== !1 && !h.overwrite) {
          var x = /* @__PURE__ */ Object.create(null);
          g.forEach(function(M) {
            M.selectionSet && (x[M.name.value] = !0);
          });
          var N = function(M) {
            return x[sr(M)] === !0;
          }, T = function(M) {
            var S = v && v.map.get(M);
            return !!(S && S.info && S.info.merge);
          };
          Object.keys(y).forEach(function(M) {
            N(M) && !T(M) && o5(b, y, M, h.store);
          });
        }
        e.merge(m, y);
      }), e.retain(f.__ref), f;
    }, t.prototype.processSelectionSet = function(e) {
      var r = this, n = e.dataId, i = e.result, a = e.selectionSet, s = e.context, l = e.mergeTree, c = this.cache.policies, u = /* @__PURE__ */ Object.create(null), d = n && c.rootTypenamesById[n] || Sa(i, a, s.fragmentMap) || n && s.store.get(n, "__typename");
      typeof d == "string" && (u.__typename = d);
      var h = function() {
        var C = wo(arguments, u, s.variables);
        if (be(C.from)) {
          var x = s.incomingById.get(C.from.__ref);
          if (x) {
            var N = c.readField(k(k({}, C), { from: x.storeObject }), s);
            if (N !== void 0)
              return N;
          }
        }
        return c.readField(C, s);
      }, f = /* @__PURE__ */ new Set();
      this.flattenFields(
        a,
        i,
        // This WriteContext will be the default context value for fields returned
        // by the flattenFields method, but some fields may be assigned a modified
        // context, depending on the presence of @client and other directives.
        s,
        d
      ).forEach(function(C, x) {
        var N, T = nr(x), M = i[T];
        if (f.add(x), M !== void 0) {
          var S = c.getStoreFieldName({
            typename: d,
            fieldName: x.name.value,
            field: x,
            variables: C.variables
          }), R = Vs(l, S), $ = r.processFieldValue(
            M,
            x,
            // Reset context.clientOnly and context.deferred to their default
            // values before processing nested selection sets.
            x.selectionSet ? la(C, !1, !1) : C,
            R
          ), V = void 0;
          x.selectionSet && (be($) || jr($)) && (V = h("__typename", $));
          var J = c.getMergeFunction(d, x.name.value, V);
          J ? R.info = {
            // TODO Check compatibility against any existing childTree.field?
            field: x,
            typename: d,
            merge: J
          } : qs(l, S), u = C.merge(u, (N = {}, N[S] = $, N));
        } else globalThis.__DEV__ !== !1 && !C.clientOnly && !C.deferred && !fo.added(x) && // If the field has a read function, it may be a synthetic field or
        // provide a default value, so its absence from the written data should
        // not be cause for alarm.
        !c.getReadFunction(d, x.name.value) && globalThis.__DEV__ !== !1 && ce.error(12, nr(x), i);
      });
      try {
        var p = c.identify(i, {
          typename: d,
          selectionSet: a,
          fragmentMap: s.fragmentMap,
          storeObject: u,
          readField: h
        }), m = p[0], y = p[1];
        n = n || m, y && (u = s.merge(u, y));
      } catch (C) {
        if (!n)
          throw C;
      }
      if (typeof n == "string") {
        var v = qr(n), g = s.written[n] || (s.written[n] = []);
        if (g.indexOf(a) >= 0 || (g.push(a), this.reader && this.reader.isFresh(i, v, a, s)))
          return v;
        var b = s.incomingById.get(n);
        return b ? (b.storeObject = s.merge(b.storeObject, u), b.mergeTree = Ua(b.mergeTree, l), f.forEach(function(C) {
          return b.fieldNodeSet.add(C);
        })) : s.incomingById.set(n, {
          storeObject: u,
          // Save a reference to mergeTree only if it is not empty, because
          // empty MergeTrees may be recycled by maybeRecycleChildMergeTree and
          // reused for entirely different parts of the result tree.
          mergeTree: Ci(l) ? void 0 : l,
          fieldNodeSet: f
        }), v;
      }
      return u;
    }, t.prototype.processFieldValue = function(e, r, n, i) {
      var a = this;
      return !r.selectionSet || e === null ? globalThis.__DEV__ !== !1 ? ac(e) : e : Oe(e) ? e.map(function(s, l) {
        var c = a.processFieldValue(s, r, n, Vs(i, l));
        return qs(i, l), c;
      }) : this.processSelectionSet({
        result: e,
        selectionSet: r.selectionSet,
        context: n,
        mergeTree: i
      });
    }, t.prototype.flattenFields = function(e, r, n, i) {
      i === void 0 && (i = Sa(r, e, n.fragmentMap));
      var a = /* @__PURE__ */ new Map(), s = this.cache.policies, l = new Yr(!1);
      return function c(u, d) {
        var h = l.lookup(
          u,
          // Because we take inheritedClientOnly and inheritedDeferred into
          // consideration here (in addition to selectionSet), it's possible for
          // the same selection set to be flattened more than once, if it appears
          // in the query with different @client and/or @directive configurations.
          d.clientOnly,
          d.deferred
        );
        h.visited || (h.visited = !0, u.selections.forEach(function(f) {
          if (Qn(f, n.variables)) {
            var p = d.clientOnly, m = d.deferred;
            if (
              // Since the presence of @client or @defer on this field can only
              // cause clientOnly or deferred to become true, we can skip the
              // forEach loop if both clientOnly and deferred are already true.
              !(p && m) && bt(f.directives) && f.directives.forEach(function(g) {
                var b = g.name.value;
                if (b === "client" && (p = !0), b === "defer") {
                  var C = Di(g, n.variables);
                  (!C || C.if !== !1) && (m = !0);
                }
              }), ir(f)
            ) {
              var y = a.get(f);
              y && (p = p && y.clientOnly, m = m && y.deferred), a.set(f, la(n, p, m));
            } else {
              var v = Ii(f, n.lookupFragment);
              if (!v && f.kind === ee.FRAGMENT_SPREAD)
                throw Ye(13, f.name.value);
              v && s.fragmentMatches(v, i, r, n.variables) && c(v.selectionSet, la(n, p, m));
            }
          }
        }));
      }(e, n), a;
    }, t.prototype.applyMerges = function(e, r, n, i, a) {
      var s, l = this;
      if (e.map.size && !be(n)) {
        var c = (
          // Items in the same position in different arrays are not
          // necessarily related to each other, so when incoming is an array
          // we process its elements as if there was no existing data.
          !Oe(n) && // Likewise, existing must be either a Reference or a StoreObject
          // in order for its fields to be safe to merge with the fields of
          // the incoming object.
          (be(r) || jr(r)) ? r : void 0
        ), u = n;
        c && !a && (a = [be(c) ? c.__ref : c]);
        var d, h = function(f, p) {
          return Oe(f) ? typeof p == "number" ? f[p] : void 0 : i.store.getFieldValue(f, String(p));
        };
        e.map.forEach(function(f, p) {
          var m = h(c, p), y = h(u, p);
          if (y !== void 0) {
            a && a.push(p);
            var v = l.applyMerges(f, m, y, i, a);
            v !== y && (d = d || /* @__PURE__ */ new Map(), d.set(p, v)), a && ce(a.pop() === p);
          }
        }), d && (n = Oe(u) ? u.slice(0) : k({}, u), d.forEach(function(f, p) {
          n[p] = f;
        }));
      }
      return e.info ? this.cache.policies.runMergeFunction(r, n, e.info, i, a && (s = i.store).getStorage.apply(s, a)) : n;
    }, t;
  }()
), kc = [];
function Vs(t, e) {
  var r = t.map;
  return r.has(e) || r.set(e, kc.pop() || { map: /* @__PURE__ */ new Map() }), r.get(e);
}
function Ua(t, e) {
  if (t === e || !e || Ci(e))
    return t;
  if (!t || Ci(t))
    return e;
  var r = t.info && e.info ? k(k({}, t.info), e.info) : t.info || e.info, n = t.map.size && e.map.size, i = n ? /* @__PURE__ */ new Map() : t.map.size ? t.map : e.map, a = { info: r, map: i };
  if (n) {
    var s = new Set(e.map.keys());
    t.map.forEach(function(l, c) {
      a.map.set(c, Ua(l, e.map.get(c))), s.delete(c);
    }), s.forEach(function(l) {
      a.map.set(l, Ua(e.map.get(l), t.map.get(l)));
    });
  }
  return a;
}
function Ci(t) {
  return !t || !(t.info || t.map.size);
}
function qs(t, e) {
  var r = t.map, n = r.get(e);
  n && Ci(n) && (kc.push(n), r.delete(e));
}
var Us = /* @__PURE__ */ new Set();
function o5(t, e, r, n) {
  var i = function(h) {
    var f = n.getFieldValue(h, r);
    return typeof f == "object" && f;
  }, a = i(t);
  if (a) {
    var s = i(e);
    if (s && !be(a) && !Ee(a, s) && !Object.keys(a).every(function(h) {
      return n.getFieldValue(s, h) !== void 0;
    })) {
      var l = n.getFieldValue(t, "__typename") || n.getFieldValue(e, "__typename"), c = sr(r), u = "".concat(l, ".").concat(c);
      if (!Us.has(u)) {
        Us.add(u);
        var d = [];
        !Oe(a) && !Oe(s) && [a, s].forEach(function(h) {
          var f = n.getFieldValue(h, "__typename");
          typeof f == "string" && !d.includes(f) && d.push(f);
        }), globalThis.__DEV__ !== !1 && ce.warn(14, c, l, d.length ? "either ensure all objects of type " + d.join(" and ") + " have an ID or a custom merge function, or " : "", u, k({}, a), k({}, s));
      }
    }
  }
}
var Nc = (
  /** @class */
  function(t) {
    Ct(e, t);
    function e(r) {
      r === void 0 && (r = {});
      var n = t.call(this) || this;
      return n.watches = /* @__PURE__ */ new Set(), n.addTypenameTransform = new Jl(fo), n.assumeImmutableResults = !0, n.makeVar = t5, n.txCount = 0, n.config = W6(r), n.addTypename = !!n.config.addTypename, n.policies = new i5({
        cache: n,
        dataIdFromObject: n.config.dataIdFromObject,
        possibleTypes: n.config.possibleTypes,
        typePolicies: n.config.typePolicies
      }), n.init(), n;
    }
    return e.prototype.init = function() {
      var r = this.data = new jn.Root({
        policies: this.policies,
        resultCaching: this.config.resultCaching
      });
      this.optimisticData = r.stump, this.resetResultCache();
    }, e.prototype.resetResultCache = function(r) {
      var n = this, i = this.storeReader, a = this.config.fragments;
      this.storeWriter = new a5(this, this.storeReader = new Y6({
        cache: this,
        addTypename: this.addTypename,
        resultCacheMaxSize: this.config.resultCacheMaxSize,
        canonizeResults: gc(this.config),
        canon: r ? void 0 : i && i.canon,
        fragments: a
      }), a), this.maybeBroadcastWatch = $n(function(s, l) {
        return n.broadcastWatch(s, l);
      }, {
        max: this.config.resultCacheMaxSize || Lt["inMemoryCache.maybeBroadcastWatch"] || 5e3,
        makeCacheKey: function(s) {
          var l = s.optimistic ? n.optimisticData : n.data;
          if (Sn(l)) {
            var c = s.optimistic, u = s.id, d = s.variables;
            return l.makeCacheKey(
              s.query,
              // Different watches can have the same query, optimistic
              // status, rootId, and variables, but if their callbacks are
              // different, the (identical) result needs to be delivered to
              // each distinct callback. The easiest way to achieve that
              // separation is to include c.callback in the cache key for
              // maybeBroadcastWatch calls. See issue #5733.
              s.callback,
              tr({ optimistic: c, id: u, variables: d })
            );
          }
        }
      }), (/* @__PURE__ */ new Set([this.data.group, this.optimisticData.group])).forEach(function(s) {
        return s.resetCaching();
      });
    }, e.prototype.restore = function(r) {
      return this.init(), r && this.data.replace(r), this;
    }, e.prototype.extract = function(r) {
      return r === void 0 && (r = !1), (r ? this.optimisticData : this.data).extract();
    }, e.prototype.read = function(r) {
      var n = r.returnPartialData, i = n === void 0 ? !1 : n;
      try {
        return this.storeReader.diffQueryAgainstStore(k(k({}, r), { store: r.optimistic ? this.optimisticData : this.data, config: this.config, returnPartialData: i })).result || null;
      } catch (a) {
        if (a instanceof fc)
          return null;
        throw a;
      }
    }, e.prototype.write = function(r) {
      try {
        return ++this.txCount, this.storeWriter.writeToStore(this.data, r);
      } finally {
        !--this.txCount && r.broadcast !== !1 && this.broadcastWatches();
      }
    }, e.prototype.modify = function(r) {
      if (Be.call(r, "id") && !r.id)
        return !1;
      var n = r.optimistic ? this.optimisticData : this.data;
      try {
        return ++this.txCount, n.modify(r.id || "ROOT_QUERY", r.fields);
      } finally {
        !--this.txCount && r.broadcast !== !1 && this.broadcastWatches();
      }
    }, e.prototype.diff = function(r) {
      return this.storeReader.diffQueryAgainstStore(k(k({}, r), { store: r.optimistic ? this.optimisticData : this.data, rootId: r.id || "ROOT_QUERY", config: this.config }));
    }, e.prototype.watch = function(r) {
      var n = this;
      return this.watches.size || e5(this), this.watches.add(r), r.immediate && this.maybeBroadcastWatch(r), function() {
        n.watches.delete(r) && !n.watches.size && Ds(n), n.maybeBroadcastWatch.forget(r);
      };
    }, e.prototype.gc = function(r) {
      var n;
      tr.reset(), Pi.reset(), this.addTypenameTransform.resetCache(), (n = this.config.fragments) === null || n === void 0 || n.resetCaches();
      var i = this.optimisticData.gc();
      return r && !this.txCount && (r.resetResultCache ? this.resetResultCache(r.resetResultIdentities) : r.resetResultIdentities && this.storeReader.resetCanon()), i;
    }, e.prototype.retain = function(r, n) {
      return (n ? this.optimisticData : this.data).retain(r);
    }, e.prototype.release = function(r, n) {
      return (n ? this.optimisticData : this.data).release(r);
    }, e.prototype.identify = function(r) {
      if (be(r))
        return r.__ref;
      try {
        return this.policies.identify(r)[0];
      } catch (n) {
        globalThis.__DEV__ !== !1 && ce.warn(n);
      }
    }, e.prototype.evict = function(r) {
      if (!r.id) {
        if (Be.call(r, "id"))
          return !1;
        r = k(k({}, r), { id: "ROOT_QUERY" });
      }
      try {
        return ++this.txCount, this.optimisticData.evict(r, this.data);
      } finally {
        !--this.txCount && r.broadcast !== !1 && this.broadcastWatches();
      }
    }, e.prototype.reset = function(r) {
      var n = this;
      return this.init(), tr.reset(), r && r.discardWatches ? (this.watches.forEach(function(i) {
        return n.maybeBroadcastWatch.forget(i);
      }), this.watches.clear(), Ds(this)) : this.broadcastWatches(), Promise.resolve();
    }, e.prototype.removeOptimistic = function(r) {
      var n = this.optimisticData.removeLayer(r);
      n !== this.optimisticData && (this.optimisticData = n, this.broadcastWatches());
    }, e.prototype.batch = function(r) {
      var n = this, i = r.update, a = r.optimistic, s = a === void 0 ? !0 : a, l = r.removeOptimistic, c = r.onWatchUpdated, u, d = function(f) {
        var p = n, m = p.data, y = p.optimisticData;
        ++n.txCount, f && (n.data = n.optimisticData = f);
        try {
          return u = i(n);
        } finally {
          --n.txCount, n.data = m, n.optimisticData = y;
        }
      }, h = /* @__PURE__ */ new Set();
      return c && !this.txCount && this.broadcastWatches(k(k({}, r), { onWatchUpdated: function(f) {
        return h.add(f), !1;
      } })), typeof s == "string" ? this.optimisticData = this.optimisticData.addLayer(s, d) : s === !1 ? d(this.data) : d(), typeof l == "string" && (this.optimisticData = this.optimisticData.removeLayer(l)), c && h.size ? (this.broadcastWatches(k(k({}, r), { onWatchUpdated: function(f, p) {
        var m = c.call(this, f, p);
        return m !== !1 && h.delete(f), m;
      } })), h.size && h.forEach(function(f) {
        return n.maybeBroadcastWatch.dirty(f);
      })) : this.broadcastWatches(r), u;
    }, e.prototype.performTransaction = function(r, n) {
      return this.batch({
        update: r,
        optimistic: n || n !== null
      });
    }, e.prototype.transformDocument = function(r) {
      return this.addTypenameToDocument(this.addFragmentsToDocument(r));
    }, e.prototype.broadcastWatches = function(r) {
      var n = this;
      this.txCount || this.watches.forEach(function(i) {
        return n.maybeBroadcastWatch(i, r);
      });
    }, e.prototype.addFragmentsToDocument = function(r) {
      var n = this.config.fragments;
      return n ? n.transform(r) : r;
    }, e.prototype.addTypenameToDocument = function(r) {
      return this.addTypename ? this.addTypenameTransform.transformDocument(r) : r;
    }, e.prototype.broadcastWatch = function(r, n) {
      var i = r.lastDiff, a = this.diff(r);
      n && (r.optimistic && typeof n.optimistic == "string" && (a.fromOptimisticTransaction = !0), n.onWatchUpdated && n.onWatchUpdated.call(this, r, a, i) === !1) || (!i || !Ee(i.result, a.result)) && r.callback(r.lastDiff = a, i);
    }, e;
  }(hc)
);
globalThis.__DEV__ !== !1 && (Nc.prototype.getMemoryInternals = a4);
var Te;
(function(t) {
  t[t.loading = 1] = "loading", t[t.setVariables = 2] = "setVariables", t[t.fetchMore = 3] = "fetchMore", t[t.refetch = 4] = "refetch", t[t.poll = 6] = "poll", t[t.ready = 7] = "ready", t[t.error = 8] = "error";
})(Te || (Te = {}));
function Vn(t) {
  return t ? t < 7 : !1;
}
var Qs = Object.assign, s5 = Object.hasOwnProperty, Qa = (
  /** @class */
  function(t) {
    Ct(e, t);
    function e(r) {
      var n = r.queryManager, i = r.queryInfo, a = r.options, s = t.call(this, function(v) {
        try {
          var g = v._subscription._observer;
          g && !g.error && (g.error = l5);
        } catch {
        }
        var b = !s.observers.size;
        s.observers.add(v);
        var C = s.last;
        return C && C.error ? v.error && v.error(C.error) : C && C.result && v.next && v.next(C.result), b && s.reobserve().catch(function() {
        }), function() {
          s.observers.delete(v) && !s.observers.size && s.tearDownQuery();
        };
      }) || this;
      s.observers = /* @__PURE__ */ new Set(), s.subscriptions = /* @__PURE__ */ new Set(), s.queryInfo = i, s.queryManager = n, s.waitForOwnResult = ca(a.fetchPolicy), s.isTornDown = !1, s.subscribeToMore = s.subscribeToMore.bind(s);
      var l = n.defaultOptions.watchQuery, c = l === void 0 ? {} : l, u = c.fetchPolicy, d = u === void 0 ? "cache-first" : u, h = a.fetchPolicy, f = h === void 0 ? d : h, p = a.initialFetchPolicy, m = p === void 0 ? f === "standby" ? d : f : p;
      s.options = k(k({}, a), {
        // Remember the initial options.fetchPolicy so we can revert back to this
        // policy when variables change. This information can also be specified
        // (or overridden) by providing options.initialFetchPolicy explicitly.
        initialFetchPolicy: m,
        // This ensures this.options.fetchPolicy always has a string value, in
        // case options.fetchPolicy was not provided.
        fetchPolicy: f
      }), s.queryId = i.queryId || n.generateQueryId();
      var y = zn(s.query);
      return s.queryName = y && y.name && y.name.value, s;
    }
    return Object.defineProperty(e.prototype, "query", {
      // The `query` computed property will always reflect the document transformed
      // by the last run query. `this.options.query` will always reflect the raw
      // untransformed query to ensure document transforms with runtime conditionals
      // are run on the original document.
      get: function() {
        return this.lastQuery || this.options.query;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "variables", {
      // Computed shorthand for this.options.variables, preserved for
      // backwards compatibility.
      /**
       * An object containing the variables that were provided for the query.
       */
      get: function() {
        return this.options.variables;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.result = function() {
      var r = this;
      return new Promise(function(n, i) {
        var a = {
          next: function(l) {
            n(l), r.observers.delete(a), r.observers.size || r.queryManager.removeQuery(r.queryId), setTimeout(function() {
              s.unsubscribe();
            }, 0);
          },
          error: i
        }, s = r.subscribe(a);
      });
    }, e.prototype.resetDiff = function() {
      this.queryInfo.resetDiff();
    }, e.prototype.getCurrentResult = function(r) {
      r === void 0 && (r = !0);
      var n = this.getLastResult(!0), i = this.queryInfo.networkStatus || n && n.networkStatus || Te.ready, a = k(k({}, n), { loading: Vn(i), networkStatus: i }), s = this.options.fetchPolicy, l = s === void 0 ? "cache-first" : s;
      if (
        // These fetch policies should never deliver data from the cache, unless
        // redelivering a previously delivered result.
        !(ca(l) || // If this.options.query has @client(always: true) fields, we cannot
        // trust diff.result, since it was read from the cache without running
        // local resolvers (and it's too late to run resolvers now, since we must
        // return a result synchronously).
        this.queryManager.getDocumentInfo(this.query).hasForcedResolvers)
      ) if (this.waitForOwnResult)
        this.queryInfo.updateWatch();
      else {
        var c = this.queryInfo.getDiff();
        (c.complete || this.options.returnPartialData) && (a.data = c.result), Ee(a.data, {}) && (a.data = void 0), c.complete ? (delete a.partial, c.complete && a.networkStatus === Te.loading && (l === "cache-first" || l === "cache-only") && (a.networkStatus = Te.ready, a.loading = !1)) : a.partial = !0, globalThis.__DEV__ !== !1 && !c.complete && !this.options.partialRefetch && !a.loading && !a.data && !a.error && Fc(c.missing);
      }
      return r && this.updateLastResult(a), a;
    }, e.prototype.isDifferentFromLastResult = function(r, n) {
      if (!this.last)
        return !0;
      var i = this.queryManager.getDocumentInfo(this.query).hasNonreactiveDirective ? !dc(this.query, this.last.result, r, this.variables) : !Ee(this.last.result, r);
      return i || n && !Ee(this.last.variables, n);
    }, e.prototype.getLast = function(r, n) {
      var i = this.last;
      if (i && i[r] && (!n || Ee(i.variables, this.variables)))
        return i[r];
    }, e.prototype.getLastResult = function(r) {
      return this.getLast("result", r);
    }, e.prototype.getLastError = function(r) {
      return this.getLast("error", r);
    }, e.prototype.resetLastResults = function() {
      delete this.last, this.isTornDown = !1;
    }, e.prototype.resetQueryStoreErrors = function() {
      this.queryManager.resetErrors(this.queryId);
    }, e.prototype.refetch = function(r) {
      var n, i = {
        // Always disable polling for refetches.
        pollInterval: 0
      }, a = this.options.fetchPolicy;
      if (a === "cache-and-network" ? i.fetchPolicy = a : a === "no-cache" ? i.fetchPolicy = "no-cache" : i.fetchPolicy = "network-only", globalThis.__DEV__ !== !1 && r && s5.call(r, "variables")) {
        var s = $l(this.query), l = s.variableDefinitions;
        (!l || !l.some(function(c) {
          return c.variable.name.value === "variables";
        })) && globalThis.__DEV__ !== !1 && ce.warn(
          20,
          r,
          ((n = s.name) === null || n === void 0 ? void 0 : n.value) || s
        );
      }
      return r && !Ee(this.options.variables, r) && (i.variables = this.options.variables = k(k({}, this.options.variables), r)), this.queryInfo.resetLastWrite(), this.reobserve(i, Te.refetch);
    }, e.prototype.fetchMore = function(r) {
      var n = this, i = k(k({}, r.query ? r : k(k(k(k({}, this.options), { query: this.options.query }), r), { variables: k(k({}, this.options.variables), r.variables) })), {
        // The fetchMore request goes immediately to the network and does
        // not automatically write its result to the cache (hence no-cache
        // instead of network-only), because we allow the caller of
        // fetchMore to provide an updateQuery callback that determines how
        // the data gets written to the cache.
        fetchPolicy: "no-cache"
      });
      i.query = this.transformDocument(i.query);
      var a = this.queryManager.generateQueryId();
      this.lastQuery = r.query ? this.transformDocument(this.options.query) : i.query;
      var s = this.queryInfo, l = s.networkStatus;
      s.networkStatus = Te.fetchMore, i.notifyOnNetworkStatusChange && this.observe();
      var c = /* @__PURE__ */ new Set(), u = r == null ? void 0 : r.updateQuery, d = this.options.fetchPolicy !== "no-cache";
      return d || ce(u, 21), this.queryManager.fetchQuery(a, i, Te.fetchMore).then(function(h) {
        if (n.queryManager.removeQuery(a), s.networkStatus === Te.fetchMore && (s.networkStatus = l), d)
          n.queryManager.cache.batch({
            update: function(m) {
              var y = r.updateQuery;
              y ? m.updateQuery({
                query: n.query,
                variables: n.variables,
                returnPartialData: !0,
                optimistic: !1
              }, function(v) {
                return y(v, {
                  fetchMoreResult: h.data,
                  variables: i.variables
                });
              }) : m.writeQuery({
                query: i.query,
                variables: i.variables,
                data: h.data
              });
            },
            onWatchUpdated: function(m) {
              c.add(m.query);
            }
          });
        else {
          var f = n.getLast("result"), p = u(f.data, {
            fetchMoreResult: h.data,
            variables: i.variables
          });
          n.reportResult(k(k({}, f), { data: p }), n.variables);
        }
        return h;
      }).finally(function() {
        d && !c.has(n.query) && xc(n);
      });
    }, e.prototype.subscribeToMore = function(r) {
      var n = this, i = this.queryManager.startGraphQLSubscription({
        query: r.document,
        variables: r.variables,
        context: r.context
      }).subscribe({
        next: function(a) {
          var s = r.updateQuery;
          s && n.updateQuery(function(l, c) {
            var u = c.variables;
            return s(l, {
              subscriptionData: a,
              variables: u
            });
          });
        },
        error: function(a) {
          if (r.onError) {
            r.onError(a);
            return;
          }
          globalThis.__DEV__ !== !1 && ce.error(22, a);
        }
      });
      return this.subscriptions.add(i), function() {
        n.subscriptions.delete(i) && i.unsubscribe();
      };
    }, e.prototype.setOptions = function(r) {
      return this.reobserve(r);
    }, e.prototype.silentSetOptions = function(r) {
      var n = Gr(this.options, r || {});
      Qs(this.options, n);
    }, e.prototype.setVariables = function(r) {
      return Ee(this.variables, r) ? this.observers.size ? this.result() : Promise.resolve() : (this.options.variables = r, this.observers.size ? this.reobserve({
        // Reset options.fetchPolicy to its original value.
        fetchPolicy: this.options.initialFetchPolicy,
        variables: r
      }, Te.setVariables) : Promise.resolve());
    }, e.prototype.updateQuery = function(r) {
      var n = this.queryManager, i = n.cache.diff({
        query: this.options.query,
        variables: this.variables,
        returnPartialData: !0,
        optimistic: !1
      }).result, a = r(i, {
        variables: this.variables
      });
      a && (n.cache.writeQuery({
        query: this.options.query,
        data: a,
        variables: this.variables
      }), n.broadcastQueries());
    }, e.prototype.startPolling = function(r) {
      this.options.pollInterval = r, this.updatePolling();
    }, e.prototype.stopPolling = function() {
      this.options.pollInterval = 0, this.updatePolling();
    }, e.prototype.applyNextFetchPolicy = function(r, n) {
      if (n.nextFetchPolicy) {
        var i = n.fetchPolicy, a = i === void 0 ? "cache-first" : i, s = n.initialFetchPolicy, l = s === void 0 ? a : s;
        a === "standby" || (typeof n.nextFetchPolicy == "function" ? n.fetchPolicy = n.nextFetchPolicy(a, {
          reason: r,
          options: n,
          observable: this,
          initialFetchPolicy: l
        }) : r === "variables-changed" ? n.fetchPolicy = l : n.fetchPolicy = n.nextFetchPolicy);
      }
      return n.fetchPolicy;
    }, e.prototype.fetch = function(r, n, i) {
      return this.queryManager.setObservableQuery(this), this.queryManager.fetchConcastWithInfo(this.queryId, r, n, i);
    }, e.prototype.updatePolling = function() {
      var r = this;
      if (!this.queryManager.ssrMode) {
        var n = this, i = n.pollingInfo, a = n.options.pollInterval;
        if (!a || !this.hasObservers()) {
          i && (clearTimeout(i.timeout), delete this.pollingInfo);
          return;
        }
        if (!(i && i.interval === a)) {
          ce(a, 23);
          var s = i || (this.pollingInfo = {});
          s.interval = a;
          var l = function() {
            var u, d;
            r.pollingInfo && (!Vn(r.queryInfo.networkStatus) && !(!((d = (u = r.options).skipPollAttempt) === null || d === void 0) && d.call(u)) ? r.reobserve({
              // Most fetchPolicy options don't make sense to use in a polling context, as
              // users wouldn't want to be polling the cache directly. However, network-only and
              // no-cache are both useful for when the user wants to control whether or not the
              // polled results are written to the cache.
              fetchPolicy: r.options.initialFetchPolicy === "no-cache" ? "no-cache" : "network-only"
            }, Te.poll).then(c, c) : c());
          }, c = function() {
            var u = r.pollingInfo;
            u && (clearTimeout(u.timeout), u.timeout = setTimeout(l, u.interval));
          };
          c();
        }
      }
    }, e.prototype.updateLastResult = function(r, n) {
      n === void 0 && (n = this.variables);
      var i = this.getLastError();
      return i && this.last && !Ee(n, this.last.variables) && (i = void 0), this.last = k({ result: this.queryManager.assumeImmutableResults ? r : ac(r), variables: n }, i ? { error: i } : null);
    }, e.prototype.reobserveAsConcast = function(r, n) {
      var i = this;
      this.isTornDown = !1;
      var a = (
        // Refetching uses a disposable Concast to allow refetches using different
        // options/variables, without permanently altering the options of the
        // original ObservableQuery.
        n === Te.refetch || // The fetchMore method does not actually call the reobserve method, but,
        // if it did, it would definitely use a disposable Concast.
        n === Te.fetchMore || // Polling uses a disposable Concast so the polling options (which force
        // fetchPolicy to be "network-only" or "no-cache") won't override the original options.
        n === Te.poll
      ), s = this.options.variables, l = this.options.fetchPolicy, c = Gr(this.options, r || {}), u = a ? (
        // Disposable Concast fetches receive a shallow copy of this.options
        // (merged with newOptions), leaving this.options unmodified.
        c
      ) : Qs(this.options, c), d = this.transformDocument(u.query);
      this.lastQuery = d, a || (this.updatePolling(), r && r.variables && !Ee(r.variables, s) && // Don't mess with the fetchPolicy if it's currently "standby".
      u.fetchPolicy !== "standby" && // If we're changing the fetchPolicy anyway, don't try to change it here
      // using applyNextFetchPolicy. The explicit options.fetchPolicy wins.
      (u.fetchPolicy === l || // A `nextFetchPolicy` function has even higher priority, though,
      // so in that case `applyNextFetchPolicy` must be called.
      typeof u.nextFetchPolicy == "function") && (this.applyNextFetchPolicy("variables-changed", u), n === void 0 && (n = Te.setVariables))), this.waitForOwnResult && (this.waitForOwnResult = ca(u.fetchPolicy));
      var h = function() {
        i.concast === m && (i.waitForOwnResult = !1);
      }, f = u.variables && k({}, u.variables), p = this.fetch(u, n, d), m = p.concast, y = p.fromLink, v = {
        next: function(g) {
          Ee(i.variables, f) && (h(), i.reportResult(g, f));
        },
        error: function(g) {
          Ee(i.variables, f) && (cc(g) || (g = new vr({ networkError: g })), h(), i.reportError(g, f));
        }
      };
      return !a && (y || !this.concast) && (this.concast && this.observer && this.concast.removeObserver(this.observer), this.concast = m, this.observer = v), m.addObserver(v), m;
    }, e.prototype.reobserve = function(r, n) {
      return this.reobserveAsConcast(r, n).promise;
    }, e.prototype.resubscribeAfterError = function() {
      for (var r = [], n = 0; n < arguments.length; n++)
        r[n] = arguments[n];
      var i = this.last;
      this.resetLastResults();
      var a = this.subscribe.apply(this, r);
      return this.last = i, a;
    }, e.prototype.observe = function() {
      this.reportResult(
        // Passing false is important so that this.getCurrentResult doesn't
        // save the fetchMore result as this.lastResult, causing it to be
        // ignored due to the this.isDifferentFromLastResult check in
        // this.reportResult.
        this.getCurrentResult(!1),
        this.variables
      );
    }, e.prototype.reportResult = function(r, n) {
      var i = this.getLastError(), a = this.isDifferentFromLastResult(r, n);
      (i || !r.partial || this.options.returnPartialData) && this.updateLastResult(r, n), (i || a) && Mn(this.observers, "next", r);
    }, e.prototype.reportError = function(r, n) {
      var i = k(k({}, this.getLastResult()), { error: r, errors: r.graphQLErrors, networkStatus: Te.error, loading: !1 });
      this.updateLastResult(i, n), Mn(this.observers, "error", this.last.error = r);
    }, e.prototype.hasObservers = function() {
      return this.observers.size > 0;
    }, e.prototype.tearDownQuery = function() {
      this.isTornDown || (this.concast && this.observer && (this.concast.removeObserver(this.observer), delete this.concast, delete this.observer), this.stopPolling(), this.subscriptions.forEach(function(r) {
        return r.unsubscribe();
      }), this.subscriptions.clear(), this.queryManager.stopQuery(this.queryId), this.observers.clear(), this.isTornDown = !0);
    }, e.prototype.transformDocument = function(r) {
      return this.queryManager.transform(r);
    }, e;
  }(xe)
);
oc(Qa);
function xc(t) {
  var e = t.options, r = e.fetchPolicy, n = e.nextFetchPolicy;
  return r === "cache-and-network" || r === "network-only" ? t.reobserve({
    fetchPolicy: "cache-first",
    // Use a temporary nextFetchPolicy function that replaces itself with the
    // previous nextFetchPolicy value and returns the original fetchPolicy.
    nextFetchPolicy: function(i, a) {
      return this.nextFetchPolicy = n, typeof this.nextFetchPolicy == "function" ? this.nextFetchPolicy(i, a) : r;
    }
  }) : t.reobserve();
}
function l5(t) {
  globalThis.__DEV__ !== !1 && ce.error(24, t.message, t.stack);
}
function Fc(t) {
  globalThis.__DEV__ !== !1 && t && globalThis.__DEV__ !== !1 && ce.debug(25, t);
}
function ca(t) {
  return t === "network-only" || t === "no-cache" || t === "standby";
}
var Vr = new (Jr ? WeakMap : Map)();
function ua(t, e) {
  var r = t[e];
  typeof r == "function" && (t[e] = function() {
    return Vr.set(
      t,
      // The %1e15 allows the count to wrap around to 0 safely every
      // quadrillion evictions, so there's no risk of overflow. To be
      // clear, this is more of a pedantic principle than something
      // that matters in any conceivable practical scenario.
      (Vr.get(t) + 1) % 1e15
    ), r.apply(this, arguments);
  });
}
function Ws(t) {
  t.notifyTimeout && (clearTimeout(t.notifyTimeout), t.notifyTimeout = void 0);
}
var da = (
  /** @class */
  function() {
    function t(e, r) {
      r === void 0 && (r = e.generateQueryId()), this.queryId = r, this.listeners = /* @__PURE__ */ new Set(), this.document = null, this.lastRequestId = 1, this.stopped = !1, this.dirty = !1, this.observableQuery = null;
      var n = this.cache = e.cache;
      Vr.has(n) || (Vr.set(n, 0), ua(n, "evict"), ua(n, "modify"), ua(n, "reset"));
    }
    return t.prototype.init = function(e) {
      var r = e.networkStatus || Te.loading;
      return this.variables && this.networkStatus !== Te.loading && !Ee(this.variables, e.variables) && (r = Te.setVariables), Ee(e.variables, this.variables) || (this.lastDiff = void 0), Object.assign(this, {
        document: e.document,
        variables: e.variables,
        networkError: null,
        graphQLErrors: this.graphQLErrors || [],
        networkStatus: r
      }), e.observableQuery && this.setObservableQuery(e.observableQuery), e.lastRequestId && (this.lastRequestId = e.lastRequestId), this;
    }, t.prototype.reset = function() {
      Ws(this), this.dirty = !1;
    }, t.prototype.resetDiff = function() {
      this.lastDiff = void 0;
    }, t.prototype.getDiff = function() {
      var e = this.getDiffOptions();
      if (this.lastDiff && Ee(e, this.lastDiff.options))
        return this.lastDiff.diff;
      this.updateWatch(this.variables);
      var r = this.observableQuery;
      if (r && r.options.fetchPolicy === "no-cache")
        return { complete: !1 };
      var n = this.cache.diff(e);
      return this.updateLastDiff(n, e), n;
    }, t.prototype.updateLastDiff = function(e, r) {
      this.lastDiff = e ? {
        diff: e,
        options: r || this.getDiffOptions()
      } : void 0;
    }, t.prototype.getDiffOptions = function(e) {
      var r;
      return e === void 0 && (e = this.variables), {
        query: this.document,
        variables: e,
        returnPartialData: !0,
        optimistic: !0,
        canonizeResults: (r = this.observableQuery) === null || r === void 0 ? void 0 : r.options.canonizeResults
      };
    }, t.prototype.setDiff = function(e) {
      var r = this, n, i = this.lastDiff && this.lastDiff.diff;
      e && !e.complete && (!((n = this.observableQuery) === null || n === void 0) && n.getLastError()) || (this.updateLastDiff(e), !this.dirty && !Ee(i && i.result, e && e.result) && (this.dirty = !0, this.notifyTimeout || (this.notifyTimeout = setTimeout(function() {
        return r.notify();
      }, 0))));
    }, t.prototype.setObservableQuery = function(e) {
      var r = this;
      e !== this.observableQuery && (this.oqListener && this.listeners.delete(this.oqListener), this.observableQuery = e, e ? (e.queryInfo = this, this.listeners.add(this.oqListener = function() {
        var n = r.getDiff();
        n.fromOptimisticTransaction ? e.observe() : xc(e);
      })) : delete this.oqListener);
    }, t.prototype.notify = function() {
      var e = this;
      Ws(this), this.shouldNotify() && this.listeners.forEach(function(r) {
        return r(e);
      }), this.dirty = !1;
    }, t.prototype.shouldNotify = function() {
      if (!this.dirty || !this.listeners.size)
        return !1;
      if (Vn(this.networkStatus) && this.observableQuery) {
        var e = this.observableQuery.options.fetchPolicy;
        if (e !== "cache-only" && e !== "cache-and-network")
          return !1;
      }
      return !0;
    }, t.prototype.stop = function() {
      if (!this.stopped) {
        this.stopped = !0, this.reset(), this.cancel(), this.cancel = t.prototype.cancel;
        var e = this.observableQuery;
        e && e.stopPolling();
      }
    }, t.prototype.cancel = function() {
    }, t.prototype.updateWatch = function(e) {
      var r = this;
      e === void 0 && (e = this.variables);
      var n = this.observableQuery;
      if (!(n && n.options.fetchPolicy === "no-cache")) {
        var i = k(k({}, this.getDiffOptions(e)), { watcher: this, callback: function(a) {
          return r.setDiff(a);
        } });
        (!this.lastWatch || !Ee(i, this.lastWatch)) && (this.cancel(), this.cancel = this.cache.watch(this.lastWatch = i));
      }
    }, t.prototype.resetLastWrite = function() {
      this.lastWrite = void 0;
    }, t.prototype.shouldWrite = function(e, r) {
      var n = this.lastWrite;
      return !(n && // If cache.evict has been called since the last time we wrote this
      // data into the cache, there's a chance writing this result into
      // the cache will repair what was evicted.
      n.dmCount === Vr.get(this.cache) && Ee(r, n.variables) && Ee(e.data, n.result.data));
    }, t.prototype.markResult = function(e, r, n, i) {
      var a = this, s = new or(), l = bt(e.errors) ? e.errors.slice(0) : [];
      if (this.reset(), "incremental" in e && bt(e.incremental)) {
        var c = sc(this.getDiff().result, e);
        e.data = c;
      } else if ("hasNext" in e && e.hasNext) {
        var u = this.getDiff();
        e.data = s.merge(u.result, e.data);
      }
      this.graphQLErrors = l, n.fetchPolicy === "no-cache" ? this.updateLastDiff({ result: e.data, complete: !0 }, this.getDiffOptions(n.variables)) : i !== 0 && (Wa(e, n.errorPolicy) ? this.cache.performTransaction(function(d) {
        if (a.shouldWrite(e, n.variables))
          d.writeQuery({
            query: r,
            data: e.data,
            variables: n.variables,
            overwrite: i === 1
          }), a.lastWrite = {
            result: e,
            variables: n.variables,
            dmCount: Vr.get(a.cache)
          };
        else if (a.lastDiff && a.lastDiff.diff.complete) {
          e.data = a.lastDiff.diff.result;
          return;
        }
        var h = a.getDiffOptions(n.variables), f = d.diff(h);
        !a.stopped && Ee(a.variables, n.variables) && a.updateWatch(n.variables), a.updateLastDiff(f, h), f.complete && (e.data = f.result);
      }) : this.lastWrite = void 0);
    }, t.prototype.markReady = function() {
      return this.networkError = null, this.networkStatus = Te.ready;
    }, t.prototype.markError = function(e) {
      return this.networkStatus = Te.error, this.lastWrite = void 0, this.reset(), e.graphQLErrors && (this.graphQLErrors = e.graphQLErrors), e.networkError && (this.networkError = e.networkError), e;
    }, t;
  }()
);
function Wa(t, e) {
  e === void 0 && (e = "none");
  var r = e === "ignore" || e === "all", n = !fi(t);
  return !n && r && t.data && (n = !0), n;
}
var c5 = Object.prototype.hasOwnProperty, zs = /* @__PURE__ */ Object.create(null), u5 = (
  /** @class */
  function() {
    function t(e) {
      var r = this;
      this.clientAwareness = {}, this.queries = /* @__PURE__ */ new Map(), this.fetchCancelFns = /* @__PURE__ */ new Map(), this.transformCache = new Dl(
        Lt["queryManager.getDocumentInfo"] || 2e3
        /* defaultCacheSizes["queryManager.getDocumentInfo"] */
      ), this.queryIdCounter = 1, this.requestIdCounter = 1, this.mutationIdCounter = 1, this.inFlightLinkObservables = new Yr(!1);
      var n = new Jl(
        function(a) {
          return r.cache.transformDocument(a);
        },
        // Allow the apollo cache to manage its own transform caches
        { cache: !1 }
      );
      this.cache = e.cache, this.link = e.link, this.defaultOptions = e.defaultOptions, this.queryDeduplication = e.queryDeduplication, this.clientAwareness = e.clientAwareness, this.localState = e.localState, this.ssrMode = e.ssrMode, this.assumeImmutableResults = e.assumeImmutableResults;
      var i = e.documentTransform;
      this.documentTransform = i ? n.concat(i).concat(n) : n, this.defaultContext = e.defaultContext || /* @__PURE__ */ Object.create(null), (this.onBroadcast = e.onBroadcast) && (this.mutationStore = /* @__PURE__ */ Object.create(null));
    }
    return t.prototype.stop = function() {
      var e = this;
      this.queries.forEach(function(r, n) {
        e.stopQueryNoBroadcast(n);
      }), this.cancelPendingFetches(Ye(26));
    }, t.prototype.cancelPendingFetches = function(e) {
      this.fetchCancelFns.forEach(function(r) {
        return r(e);
      }), this.fetchCancelFns.clear();
    }, t.prototype.mutate = function(e) {
      return Yt(this, arguments, void 0, function(r) {
        var n, i, a, s, l, c, u, d = r.mutation, h = r.variables, f = r.optimisticResponse, p = r.updateQueries, m = r.refetchQueries, y = m === void 0 ? [] : m, v = r.awaitRefetchQueries, g = v === void 0 ? !1 : v, b = r.update, C = r.onQueryUpdated, x = r.fetchPolicy, N = x === void 0 ? ((c = this.defaultOptions.mutate) === null || c === void 0 ? void 0 : c.fetchPolicy) || "network-only" : x, T = r.errorPolicy, M = T === void 0 ? ((u = this.defaultOptions.mutate) === null || u === void 0 ? void 0 : u.errorPolicy) || "none" : T, S = r.keepRootFields, R = r.context;
        return Jt(this, function($) {
          switch ($.label) {
            case 0:
              return ce(d, 27), ce(N === "network-only" || N === "no-cache", 28), n = this.generateMutationId(), d = this.cache.transformForLink(this.transform(d)), i = this.getDocumentInfo(d).hasClientExports, h = this.getVariables(d, h), i ? [4, this.localState.addExportedVariables(d, h, R)] : [3, 2];
            case 1:
              h = $.sent(), $.label = 2;
            case 2:
              return a = this.mutationStore && (this.mutationStore[n] = {
                mutation: d,
                variables: h,
                loading: !0,
                error: null
              }), s = f && this.markMutationOptimistic(f, {
                mutationId: n,
                document: d,
                variables: h,
                fetchPolicy: N,
                errorPolicy: M,
                context: R,
                updateQueries: p,
                update: b,
                keepRootFields: S
              }), this.broadcastQueries(), l = this, [2, new Promise(function(V, J) {
                return na(l.getObservableFromLink(d, k(k({}, R), { optimisticResponse: s ? f : void 0 }), h, {}, !1), function(F) {
                  if (fi(F) && M === "none")
                    throw new vr({
                      graphQLErrors: Ra(F)
                    });
                  a && (a.loading = !1, a.error = null);
                  var I = k({}, F);
                  return typeof y == "function" && (y = y(I)), M === "ignore" && fi(I) && delete I.errors, l.markMutationResult({
                    mutationId: n,
                    result: I,
                    document: d,
                    variables: h,
                    fetchPolicy: N,
                    errorPolicy: M,
                    context: R,
                    update: b,
                    updateQueries: p,
                    awaitRefetchQueries: g,
                    refetchQueries: y,
                    removeOptimistic: s ? n : void 0,
                    onQueryUpdated: C,
                    keepRootFields: S
                  });
                }).subscribe({
                  next: function(F) {
                    l.broadcastQueries(), (!("hasNext" in F) || F.hasNext === !1) && V(F);
                  },
                  error: function(F) {
                    a && (a.loading = !1, a.error = F), s && l.cache.removeOptimistic(n), l.broadcastQueries(), J(F instanceof vr ? F : new vr({
                      networkError: F
                    }));
                  }
                });
              })];
          }
        });
      });
    }, t.prototype.markMutationResult = function(e, r) {
      var n = this;
      r === void 0 && (r = this.cache);
      var i = e.result, a = [], s = e.fetchPolicy === "no-cache";
      if (!s && Wa(i, e.errorPolicy)) {
        if (Ur(i) || a.push({
          result: i.data,
          dataId: "ROOT_MUTATION",
          query: e.document,
          variables: e.variables
        }), Ur(i) && bt(i.incremental)) {
          var l = r.diff({
            id: "ROOT_MUTATION",
            // The cache complains if passed a mutation where it expects a
            // query, so we transform mutations and subscriptions to queries
            // (only once, thanks to this.transformCache).
            query: this.getDocumentInfo(e.document).asQuery,
            variables: e.variables,
            optimistic: !1,
            returnPartialData: !0
          }), c = void 0;
          l.result && (c = sc(l.result, i)), typeof c < "u" && (i.data = c, a.push({
            result: c,
            dataId: "ROOT_MUTATION",
            query: e.document,
            variables: e.variables
          }));
        }
        var u = e.updateQueries;
        u && this.queries.forEach(function(h, f) {
          var p = h.observableQuery, m = p && p.queryName;
          if (!(!m || !c5.call(u, m))) {
            var y = u[m], v = n.queries.get(f), g = v.document, b = v.variables, C = r.diff({
              query: g,
              variables: b,
              returnPartialData: !0,
              optimistic: !1
            }), x = C.result, N = C.complete;
            if (N && x) {
              var T = y(x, {
                mutationResult: i,
                queryName: g && Aa(g) || void 0,
                queryVariables: b
              });
              T && a.push({
                result: T,
                dataId: "ROOT_QUERY",
                query: g,
                variables: b
              });
            }
          }
        });
      }
      if (a.length > 0 || (e.refetchQueries || "").length > 0 || e.update || e.onQueryUpdated || e.removeOptimistic) {
        var d = [];
        if (this.refetchQueries({
          updateCache: function(h) {
            s || a.forEach(function(y) {
              return h.write(y);
            });
            var f = e.update, p = !o6(i) || Ur(i) && !i.hasNext;
            if (f) {
              if (!s) {
                var m = h.diff({
                  id: "ROOT_MUTATION",
                  // The cache complains if passed a mutation where it expects a
                  // query, so we transform mutations and subscriptions to queries
                  // (only once, thanks to this.transformCache).
                  query: n.getDocumentInfo(e.document).asQuery,
                  variables: e.variables,
                  optimistic: !1,
                  returnPartialData: !0
                });
                m.complete && (i = k(k({}, i), { data: m.result }), "incremental" in i && delete i.incremental, "hasNext" in i && delete i.hasNext);
              }
              p && f(h, i, {
                context: e.context,
                variables: e.variables
              });
            }
            !s && !e.keepRootFields && p && h.modify({
              id: "ROOT_MUTATION",
              fields: function(y, v) {
                var g = v.fieldName, b = v.DELETE;
                return g === "__typename" ? y : b;
              }
            });
          },
          include: e.refetchQueries,
          // Write the final mutation.result to the root layer of the cache.
          optimistic: !1,
          // Remove the corresponding optimistic layer at the same time as we
          // write the final non-optimistic result.
          removeOptimistic: e.removeOptimistic,
          // Let the caller of client.mutate optionally determine the refetching
          // behavior for watched queries after the mutation.update function runs.
          // If no onQueryUpdated function was provided for this mutation, pass
          // null instead of undefined to disable the default refetching behavior.
          onQueryUpdated: e.onQueryUpdated || null
        }).forEach(function(h) {
          return d.push(h);
        }), e.awaitRefetchQueries || e.onQueryUpdated)
          return Promise.all(d).then(function() {
            return i;
          });
      }
      return Promise.resolve(i);
    }, t.prototype.markMutationOptimistic = function(e, r) {
      var n = this, i = typeof e == "function" ? e(r.variables, { IGNORE: zs }) : e;
      return i === zs ? !1 : (this.cache.recordOptimisticTransaction(function(a) {
        try {
          n.markMutationResult(k(k({}, r), { result: { data: i } }), a);
        } catch (s) {
          globalThis.__DEV__ !== !1 && ce.error(s);
        }
      }, r.mutationId), !0);
    }, t.prototype.fetchQuery = function(e, r, n) {
      return this.fetchConcastWithInfo(e, r, n).concast.promise;
    }, t.prototype.getQueryStore = function() {
      var e = /* @__PURE__ */ Object.create(null);
      return this.queries.forEach(function(r, n) {
        e[n] = {
          variables: r.variables,
          networkStatus: r.networkStatus,
          networkError: r.networkError,
          graphQLErrors: r.graphQLErrors
        };
      }), e;
    }, t.prototype.resetErrors = function(e) {
      var r = this.queries.get(e);
      r && (r.networkError = void 0, r.graphQLErrors = []);
    }, t.prototype.transform = function(e) {
      return this.documentTransform.transformDocument(e);
    }, t.prototype.getDocumentInfo = function(e) {
      var r = this.transformCache;
      if (!r.has(e)) {
        var n = {
          // TODO These three calls (hasClientExports, shouldForceResolvers, and
          // usesNonreactiveDirective) are performing independent full traversals
          // of the transformed document. We should consider merging these
          // traversals into a single pass in the future, though the work is
          // cached after the first time.
          hasClientExports: Vy(e),
          hasForcedResolvers: this.localState.shouldForceResolvers(e),
          hasNonreactiveDirective: Pn(["nonreactive"], e),
          clientQuery: this.localState.clientQuery(e),
          serverQuery: ec([
            { name: "client", remove: !0 },
            { name: "connection" },
            { name: "nonreactive" }
          ], e),
          defaultVars: so(zn(e)),
          // Transform any mutation or subscription operations to query operations
          // so we can read/write them from/to the cache.
          asQuery: k(k({}, e), { definitions: e.definitions.map(function(i) {
            return i.kind === "OperationDefinition" && i.operation !== "query" ? k(k({}, i), { operation: "query" }) : i;
          }) })
        };
        r.set(e, n);
      }
      return r.get(e);
    }, t.prototype.getVariables = function(e, r) {
      return k(k({}, this.getDocumentInfo(e).defaultVars), r);
    }, t.prototype.watchQuery = function(e) {
      var r = this.transform(e.query);
      e = k(k({}, e), { variables: this.getVariables(r, e.variables) }), typeof e.notifyOnNetworkStatusChange > "u" && (e.notifyOnNetworkStatusChange = !1);
      var n = new da(this), i = new Qa({
        queryManager: this,
        queryInfo: n,
        options: e
      });
      return i.lastQuery = r, this.queries.set(i.queryId, n), n.init({
        document: r,
        observableQuery: i,
        variables: i.variables
      }), i;
    }, t.prototype.query = function(e, r) {
      var n = this;
      return r === void 0 && (r = this.generateQueryId()), ce(e.query, 29), ce(e.query.kind === "Document", 30), ce(!e.returnPartialData, 31), ce(!e.pollInterval, 32), this.fetchQuery(r, k(k({}, e), { query: this.transform(e.query) })).finally(function() {
        return n.stopQuery(r);
      });
    }, t.prototype.generateQueryId = function() {
      return String(this.queryIdCounter++);
    }, t.prototype.generateRequestId = function() {
      return this.requestIdCounter++;
    }, t.prototype.generateMutationId = function() {
      return String(this.mutationIdCounter++);
    }, t.prototype.stopQueryInStore = function(e) {
      this.stopQueryInStoreNoBroadcast(e), this.broadcastQueries();
    }, t.prototype.stopQueryInStoreNoBroadcast = function(e) {
      var r = this.queries.get(e);
      r && r.stop();
    }, t.prototype.clearStore = function(e) {
      return e === void 0 && (e = {
        discardWatches: !0
      }), this.cancelPendingFetches(Ye(33)), this.queries.forEach(function(r) {
        r.observableQuery ? r.networkStatus = Te.loading : r.stop();
      }), this.mutationStore && (this.mutationStore = /* @__PURE__ */ Object.create(null)), this.cache.reset(e);
    }, t.prototype.getObservableQueries = function(e) {
      var r = this;
      e === void 0 && (e = "active");
      var n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
      return Array.isArray(e) && e.forEach(function(s) {
        typeof s == "string" ? i.set(s, !1) : f4(s) ? i.set(r.transform(s), !1) : De(s) && s.query && a.add(s);
      }), this.queries.forEach(function(s, l) {
        var c = s.observableQuery, u = s.document;
        if (c) {
          if (e === "all") {
            n.set(l, c);
            return;
          }
          var d = c.queryName, h = c.options.fetchPolicy;
          if (h === "standby" || e === "active" && !c.hasObservers())
            return;
          (e === "active" || d && i.has(d) || u && i.has(u)) && (n.set(l, c), d && i.set(d, !0), u && i.set(u, !0));
        }
      }), a.size && a.forEach(function(s) {
        var l = wa("legacyOneTimeQuery"), c = r.getQuery(l).init({
          document: s.query,
          variables: s.variables
        }), u = new Qa({
          queryManager: r,
          queryInfo: c,
          options: k(k({}, s), { fetchPolicy: "network-only" })
        });
        ce(u.queryId === l), c.setObservableQuery(u), n.set(l, u);
      }), globalThis.__DEV__ !== !1 && i.size && i.forEach(function(s, l) {
        s || globalThis.__DEV__ !== !1 && ce.warn(typeof l == "string" ? 34 : 35, l);
      }), n;
    }, t.prototype.reFetchObservableQueries = function(e) {
      var r = this;
      e === void 0 && (e = !1);
      var n = [];
      return this.getObservableQueries(e ? "all" : "active").forEach(function(i, a) {
        var s = i.options.fetchPolicy;
        i.resetLastResults(), (e || s !== "standby" && s !== "cache-only") && n.push(i.refetch()), r.getQuery(a).setDiff(null);
      }), this.broadcastQueries(), Promise.all(n);
    }, t.prototype.setObservableQuery = function(e) {
      this.getQuery(e.queryId).setObservableQuery(e);
    }, t.prototype.startGraphQLSubscription = function(e) {
      var r = this, n = e.query, i = e.fetchPolicy, a = e.errorPolicy, s = a === void 0 ? "none" : a, l = e.variables, c = e.context, u = c === void 0 ? {} : c, d = e.extensions, h = d === void 0 ? {} : d;
      n = this.transform(n), l = this.getVariables(n, l);
      var f = function(m) {
        return r.getObservableFromLink(n, u, m, h).map(function(y) {
          i !== "no-cache" && (Wa(y, s) && r.cache.write({
            query: n,
            result: y.data,
            dataId: "ROOT_SUBSCRIPTION",
            variables: m
          }), r.broadcastQueries());
          var v = fi(y), g = w6(y);
          if (v || g) {
            var b = {};
            if (v && (b.graphQLErrors = y.errors), g && (b.protocolErrors = y.extensions[vo]), s === "none" || g)
              throw new vr(b);
          }
          return s === "ignore" && delete y.errors, y;
        });
      };
      if (this.getDocumentInfo(n).hasClientExports) {
        var p = this.localState.addExportedVariables(n, l, u).then(f);
        return new xe(function(m) {
          var y = null;
          return p.then(function(v) {
            return y = v.subscribe(m);
          }, m.error), function() {
            return y && y.unsubscribe();
          };
        });
      }
      return f(l);
    }, t.prototype.stopQuery = function(e) {
      this.stopQueryNoBroadcast(e), this.broadcastQueries();
    }, t.prototype.stopQueryNoBroadcast = function(e) {
      this.stopQueryInStoreNoBroadcast(e), this.removeQuery(e);
    }, t.prototype.removeQuery = function(e) {
      this.fetchCancelFns.delete(e), this.queries.has(e) && (this.getQuery(e).stop(), this.queries.delete(e));
    }, t.prototype.broadcastQueries = function() {
      this.onBroadcast && this.onBroadcast(), this.queries.forEach(function(e) {
        return e.notify();
      });
    }, t.prototype.getLocalState = function() {
      return this.localState;
    }, t.prototype.getObservableFromLink = function(e, r, n, i, a) {
      var s = this, l;
      a === void 0 && (a = (l = r == null ? void 0 : r.queryDeduplication) !== null && l !== void 0 ? l : this.queryDeduplication);
      var c, u = this.getDocumentInfo(e), d = u.serverQuery, h = u.clientQuery;
      if (d) {
        var f = this, p = f.inFlightLinkObservables, m = f.link, y = {
          query: d,
          variables: n,
          operationName: Aa(d) || void 0,
          context: this.prepareContext(k(k({}, r), { forceFetch: !a })),
          extensions: i
        };
        if (r = y.context, a) {
          var v = Pi(d), g = tr(n), b = p.lookup(v, g);
          if (c = b.observable, !c) {
            var C = new Lr([
              Pa(m, y)
            ]);
            c = b.observable = C, C.beforeNext(function() {
              p.remove(v, g);
            });
          }
        } else
          c = new Lr([
            Pa(m, y)
          ]);
      } else
        c = new Lr([xe.of({ data: {} })]), r = this.prepareContext(r);
      return h && (c = na(c, function(x) {
        return s.localState.runResolvers({
          document: h,
          remoteResult: x,
          context: r,
          variables: n
        });
      })), c;
    }, t.prototype.getResultsFromLink = function(e, r, n) {
      var i = e.lastRequestId = this.generateRequestId(), a = this.cache.transformForLink(n.query);
      return na(this.getObservableFromLink(a, n.context, n.variables), function(s) {
        var l = Ra(s), c = l.length > 0, u = n.errorPolicy;
        if (i >= e.lastRequestId) {
          if (c && u === "none")
            throw e.markError(new vr({
              graphQLErrors: l
            }));
          e.markResult(s, a, n, r), e.markReady();
        }
        var d = {
          data: s.data,
          loading: !1,
          networkStatus: Te.ready
        };
        return c && u === "none" && (d.data = void 0), c && u !== "ignore" && (d.errors = l, d.networkStatus = Te.error), d;
      }, function(s) {
        var l = cc(s) ? s : new vr({ networkError: s });
        throw i >= e.lastRequestId && e.markError(l), l;
      });
    }, t.prototype.fetchConcastWithInfo = function(e, r, n, i) {
      var a = this;
      n === void 0 && (n = Te.loading), i === void 0 && (i = r.query);
      var s = this.getVariables(i, r.variables), l = this.getQuery(e), c = this.defaultOptions.watchQuery, u = r.fetchPolicy, d = u === void 0 ? c && c.fetchPolicy || "cache-first" : u, h = r.errorPolicy, f = h === void 0 ? c && c.errorPolicy || "none" : h, p = r.returnPartialData, m = p === void 0 ? !1 : p, y = r.notifyOnNetworkStatusChange, v = y === void 0 ? !1 : y, g = r.context, b = g === void 0 ? {} : g, C = Object.assign({}, r, {
        query: i,
        variables: s,
        fetchPolicy: d,
        errorPolicy: f,
        returnPartialData: m,
        notifyOnNetworkStatusChange: v,
        context: b
      }), x = function(R) {
        C.variables = R;
        var $ = a.fetchQueryByPolicy(l, C, n);
        return (
          // If we're in standby, postpone advancing options.fetchPolicy using
          // applyNextFetchPolicy.
          C.fetchPolicy !== "standby" && // The "standby" policy currently returns [] from fetchQueryByPolicy, so
          // this is another way to detect when nothing was done/fetched.
          $.sources.length > 0 && l.observableQuery && l.observableQuery.applyNextFetchPolicy("after-fetch", r), $
        );
      }, N = function() {
        return a.fetchCancelFns.delete(e);
      };
      this.fetchCancelFns.set(e, function(R) {
        N(), setTimeout(function() {
          return T.cancel(R);
        });
      });
      var T, M;
      if (this.getDocumentInfo(C.query).hasClientExports)
        T = new Lr(this.localState.addExportedVariables(C.query, C.variables, C.context).then(x).then(function(R) {
          return R.sources;
        })), M = !0;
      else {
        var S = x(C.variables);
        M = S.fromLink, T = new Lr(S.sources);
      }
      return T.promise.then(N, N), {
        concast: T,
        fromLink: M
      };
    }, t.prototype.refetchQueries = function(e) {
      var r = this, n = e.updateCache, i = e.include, a = e.optimistic, s = a === void 0 ? !1 : a, l = e.removeOptimistic, c = l === void 0 ? s ? wa("refetchQueries") : void 0 : l, u = e.onQueryUpdated, d = /* @__PURE__ */ new Map();
      i && this.getObservableQueries(i).forEach(function(f, p) {
        d.set(p, {
          oq: f,
          lastDiff: r.getQuery(p).getDiff()
        });
      });
      var h = /* @__PURE__ */ new Map();
      return n && this.cache.batch({
        update: n,
        // Since you can perform any combination of cache reads and/or writes in
        // the cache.batch update function, its optimistic option can be either
        // a boolean or a string, representing three distinct modes of
        // operation:
        //
        // * false: read/write only the root layer
        // * true: read/write the topmost layer
        // * string: read/write a fresh optimistic layer with that ID string
        //
        // When typeof optimistic === "string", a new optimistic layer will be
        // temporarily created within cache.batch with that string as its ID. If
        // we then pass that same string as the removeOptimistic option, we can
        // make cache.batch immediately remove the optimistic layer after
        // running the updateCache function, triggering only one broadcast.
        //
        // However, the refetchQueries method accepts only true or false for its
        // optimistic option (not string). We interpret true to mean a temporary
        // optimistic layer should be created, to allow efficiently rolling back
        // the effect of the updateCache function, which involves passing a
        // string instead of true as the optimistic option to cache.batch, when
        // refetchQueries receives optimistic: true.
        //
        // In other words, we are deliberately not supporting the use case of
        // writing to an *existing* optimistic layer (using the refetchQueries
        // updateCache function), since that would potentially interfere with
        // other optimistic updates in progress. Instead, you can read/write
        // only the root layer by passing optimistic: false to refetchQueries,
        // or you can read/write a brand new optimistic layer that will be
        // automatically removed by passing optimistic: true.
        optimistic: s && c || !1,
        // The removeOptimistic option can also be provided by itself, even if
        // optimistic === false, to remove some previously-added optimistic
        // layer safely and efficiently, like we do in markMutationResult.
        //
        // If an explicit removeOptimistic string is provided with optimistic:
        // true, the removeOptimistic string will determine the ID of the
        // temporary optimistic layer, in case that ever matters.
        removeOptimistic: c,
        onWatchUpdated: function(f, p, m) {
          var y = f.watcher instanceof da && f.watcher.observableQuery;
          if (y) {
            if (u) {
              d.delete(y.queryId);
              var v = u(y, p, m);
              return v === !0 && (v = y.refetch()), v !== !1 && h.set(y, v), v;
            }
            u !== null && d.set(y.queryId, { oq: y, lastDiff: m, diff: p });
          }
        }
      }), d.size && d.forEach(function(f, p) {
        var m = f.oq, y = f.lastDiff, v = f.diff, g;
        if (u) {
          if (!v) {
            var b = m.queryInfo;
            b.reset(), v = b.getDiff();
          }
          g = u(m, v, y);
        }
        (!u || g === !0) && (g = m.refetch()), g !== !1 && h.set(m, g), p.indexOf("legacyOneTimeQuery") >= 0 && r.stopQueryNoBroadcast(p);
      }), c && this.cache.removeOptimistic(c), h;
    }, t.prototype.fetchQueryByPolicy = function(e, r, n) {
      var i = this, a = r.query, s = r.variables, l = r.fetchPolicy, c = r.refetchWritePolicy, u = r.errorPolicy, d = r.returnPartialData, h = r.context, f = r.notifyOnNetworkStatusChange, p = e.networkStatus;
      e.init({
        document: a,
        variables: s,
        networkStatus: n
      });
      var m = function() {
        return e.getDiff();
      }, y = function(x, N) {
        N === void 0 && (N = e.networkStatus || Te.loading);
        var T = x.result;
        globalThis.__DEV__ !== !1 && !d && !Ee(T, {}) && Fc(x.missing);
        var M = function(S) {
          return xe.of(k({ data: S, loading: Vn(N), networkStatus: N }, x.complete ? null : { partial: !0 }));
        };
        return T && i.getDocumentInfo(a).hasForcedResolvers ? i.localState.runResolvers({
          document: a,
          remoteResult: { data: T },
          context: h,
          variables: s,
          onlyRunForcedResolvers: !0
        }).then(function(S) {
          return M(S.data || void 0);
        }) : u === "none" && N === Te.refetch && Array.isArray(x.missing) ? M(void 0) : M(T);
      }, v = l === "no-cache" ? 0 : n === Te.refetch && c !== "merge" ? 1 : 2, g = function() {
        return i.getResultsFromLink(e, v, {
          query: a,
          variables: s,
          context: h,
          fetchPolicy: l,
          errorPolicy: u
        });
      }, b = f && typeof p == "number" && p !== n && Vn(n);
      switch (l) {
        default:
        case "cache-first": {
          var C = m();
          return C.complete ? {
            fromLink: !1,
            sources: [y(C, e.markReady())]
          } : d || b ? {
            fromLink: !0,
            sources: [y(C), g()]
          } : { fromLink: !0, sources: [g()] };
        }
        case "cache-and-network": {
          var C = m();
          return C.complete || d || b ? {
            fromLink: !0,
            sources: [y(C), g()]
          } : { fromLink: !0, sources: [g()] };
        }
        case "cache-only":
          return {
            fromLink: !1,
            sources: [y(m(), e.markReady())]
          };
        case "network-only":
          return b ? {
            fromLink: !0,
            sources: [y(m()), g()]
          } : { fromLink: !0, sources: [g()] };
        case "no-cache":
          return b ? {
            fromLink: !0,
            // Note that queryInfo.getDiff() for no-cache queries does not call
            // cache.diff, but instead returns a { complete: false } stub result
            // when there is no queryInfo.diff already defined.
            sources: [y(e.getDiff()), g()]
          } : { fromLink: !0, sources: [g()] };
        case "standby":
          return { fromLink: !1, sources: [] };
      }
    }, t.prototype.getQuery = function(e) {
      return e && !this.queries.has(e) && this.queries.set(e, new da(this, e)), this.queries.get(e);
    }, t.prototype.prepareContext = function(e) {
      e === void 0 && (e = {});
      var r = this.localState.prepareContext(e);
      return k(k(k({}, this.defaultContext), r), { clientAwareness: this.clientAwareness });
    }, t;
  }()
), d5 = (
  /** @class */
  function() {
    function t(e) {
      var r = e.cache, n = e.client, i = e.resolvers, a = e.fragmentMatcher;
      this.selectionsToResolveCache = /* @__PURE__ */ new WeakMap(), this.cache = r, n && (this.client = n), i && this.addResolvers(i), a && this.setFragmentMatcher(a);
    }
    return t.prototype.addResolvers = function(e) {
      var r = this;
      this.resolvers = this.resolvers || {}, Array.isArray(e) ? e.forEach(function(n) {
        r.resolvers = fs(r.resolvers, n);
      }) : this.resolvers = fs(this.resolvers, e);
    }, t.prototype.setResolvers = function(e) {
      this.resolvers = {}, this.addResolvers(e);
    }, t.prototype.getResolvers = function() {
      return this.resolvers || {};
    }, t.prototype.runResolvers = function(e) {
      return Yt(this, arguments, void 0, function(r) {
        var n = r.document, i = r.remoteResult, a = r.context, s = r.variables, l = r.onlyRunForcedResolvers, c = l === void 0 ? !1 : l;
        return Jt(this, function(u) {
          return n ? [2, this.resolveDocument(n, i.data, a, s, this.fragmentMatcher, c).then(function(d) {
            return k(k({}, i), { data: d.result });
          })] : [2, i];
        });
      });
    }, t.prototype.setFragmentMatcher = function(e) {
      this.fragmentMatcher = e;
    }, t.prototype.getFragmentMatcher = function() {
      return this.fragmentMatcher;
    }, t.prototype.clientQuery = function(e) {
      return Pn(["client"], e) && this.resolvers ? e : null;
    }, t.prototype.serverQuery = function(e) {
      return tc(e);
    }, t.prototype.prepareContext = function(e) {
      var r = this.cache;
      return k(k({}, e), {
        cache: r,
        // Getting an entry's cache key is useful for local state resolvers.
        getCacheKey: function(n) {
          return r.identify(n);
        }
      });
    }, t.prototype.addExportedVariables = function(e) {
      return Yt(this, arguments, void 0, function(r, n, i) {
        return n === void 0 && (n = {}), i === void 0 && (i = {}), Jt(this, function(a) {
          return r ? [2, this.resolveDocument(r, this.buildRootValueFromCache(r, n) || {}, this.prepareContext(i), n).then(function(s) {
            return k(k({}, n), s.exportedVariables);
          })] : [2, k({}, n)];
        });
      });
    }, t.prototype.shouldForceResolvers = function(e) {
      var r = !1;
      return Ot(e, {
        Directive: {
          enter: function(n) {
            if (n.name.value === "client" && n.arguments && (r = n.arguments.some(function(i) {
              return i.name.value === "always" && i.value.kind === "BooleanValue" && i.value.value === !0;
            }), r))
              return oo;
          }
        }
      }), r;
    }, t.prototype.buildRootValueFromCache = function(e, r) {
      return this.cache.diff({
        query: W4(e),
        variables: r,
        returnPartialData: !0,
        optimistic: !1
      }).result;
    }, t.prototype.resolveDocument = function(e, r) {
      return Yt(this, arguments, void 0, function(n, i, a, s, l, c) {
        var u, d, h, f, p, m, y, v, g, b, C;
        return a === void 0 && (a = {}), s === void 0 && (s = {}), l === void 0 && (l = function() {
          return !0;
        }), c === void 0 && (c = !1), Jt(this, function(x) {
          return u = Hn(n), d = Oi(n), h = Ai(d), f = this.collectSelectionsToResolve(u, h), p = u.operation, m = p ? p.charAt(0).toUpperCase() + p.slice(1) : "Query", y = this, v = y.cache, g = y.client, b = {
            fragmentMap: h,
            context: k(k({}, a), { cache: v, client: g }),
            variables: s,
            fragmentMatcher: l,
            defaultOperationType: m,
            exportedVariables: {},
            selectionsToResolve: f,
            onlyRunForcedResolvers: c
          }, C = !1, [2, this.resolveSelectionSet(u.selectionSet, C, i, b).then(function(N) {
            return {
              result: N,
              exportedVariables: b.exportedVariables
            };
          })];
        });
      });
    }, t.prototype.resolveSelectionSet = function(e, r, n, i) {
      return Yt(this, void 0, void 0, function() {
        var a, s, l, c, u, d = this;
        return Jt(this, function(h) {
          return a = i.fragmentMap, s = i.context, l = i.variables, c = [n], u = function(f) {
            return Yt(d, void 0, void 0, function() {
              var p, m;
              return Jt(this, function(y) {
                return !r && !i.selectionsToResolve.has(f) ? [
                  2
                  /*return*/
                ] : Qn(f, l) ? ir(f) ? [2, this.resolveField(f, r, n, i).then(function(v) {
                  var g;
                  typeof v < "u" && c.push((g = {}, g[nr(f)] = v, g));
                })] : (N4(f) ? p = f : (p = a[f.name.value], ce(p, 18, f.name.value)), p && p.typeCondition && (m = p.typeCondition.name.value, i.fragmentMatcher(n, m, s)) ? [2, this.resolveSelectionSet(p.selectionSet, r, n, i).then(function(v) {
                  c.push(v);
                })] : [
                  2
                  /*return*/
                ]) : [
                  2
                  /*return*/
                ];
              });
            });
          }, [2, Promise.all(e.selections.map(u)).then(function() {
            return Bi(c);
          })];
        });
      });
    }, t.prototype.resolveField = function(e, r, n, i) {
      return Yt(this, void 0, void 0, function() {
        var a, s, l, c, u, d, h, f, p, m = this;
        return Jt(this, function(y) {
          return n ? (a = i.variables, s = e.name.value, l = nr(e), c = s !== l, u = n[l] || n[s], d = Promise.resolve(u), (!i.onlyRunForcedResolvers || this.shouldForceResolvers(e)) && (h = n.__typename || i.defaultOperationType, f = this.resolvers && this.resolvers[h], f && (p = f[c ? s : l], p && (d = Promise.resolve(
            // In case the resolve function accesses reactive variables,
            // set cacheSlot to the current cache instance.
            yo.withValue(this.cache, p, [
              n,
              Di(e, a),
              i.context,
              { field: e, fragmentMap: i.fragmentMap }
            ])
          )))), [2, d.then(function(v) {
            var g, b;
            if (v === void 0 && (v = u), e.directives && e.directives.forEach(function(x) {
              x.name.value === "export" && x.arguments && x.arguments.forEach(function(N) {
                N.name.value === "as" && N.value.kind === "StringValue" && (i.exportedVariables[N.value.value] = v);
              });
            }), !e.selectionSet || v == null)
              return v;
            var C = (b = (g = e.directives) === null || g === void 0 ? void 0 : g.some(function(x) {
              return x.name.value === "client";
            })) !== null && b !== void 0 ? b : !1;
            if (Array.isArray(v))
              return m.resolveSubSelectedArray(e, r || C, v, i);
            if (e.selectionSet)
              return m.resolveSelectionSet(e.selectionSet, r || C, v, i);
          })]) : [2, null];
        });
      });
    }, t.prototype.resolveSubSelectedArray = function(e, r, n, i) {
      var a = this;
      return Promise.all(n.map(function(s) {
        if (s === null)
          return null;
        if (Array.isArray(s))
          return a.resolveSubSelectedArray(e, r, s, i);
        if (e.selectionSet)
          return a.resolveSelectionSet(e.selectionSet, r, s, i);
      }));
    }, t.prototype.collectSelectionsToResolve = function(e, r) {
      var n = function(s) {
        return !Array.isArray(s);
      }, i = this.selectionsToResolveCache;
      function a(s) {
        if (!i.has(s)) {
          var l = /* @__PURE__ */ new Set();
          i.set(s, l), Ot(s, {
            Directive: function(c, u, d, h, f) {
              c.name.value === "client" && f.forEach(function(p) {
                n(p) && ns(p) && l.add(p);
              });
            },
            FragmentSpread: function(c, u, d, h, f) {
              var p = r[c.name.value];
              ce(p, 19, c.name.value);
              var m = a(p);
              m.size > 0 && (f.forEach(function(y) {
                n(y) && ns(y) && l.add(y);
              }), l.add(c), m.forEach(function(y) {
                l.add(y);
              }));
            }
          });
        }
        return i.get(s);
      }
      return a(e);
    }, t;
  }()
), Hs = !1, Ec = (
  /** @class */
  function() {
    function t(e) {
      var r = this;
      if (this.resetStoreCallbacks = [], this.clearStoreCallbacks = [], !e.cache)
        throw Ye(15);
      var n = e.uri, i = e.credentials, a = e.headers, s = e.cache, l = e.documentTransform, c = e.ssrMode, u = c === void 0 ? !1 : c, d = e.ssrForceFetchDelay, h = d === void 0 ? 0 : d, f = e.connectToDevTools, p = e.queryDeduplication, m = p === void 0 ? !0 : p, y = e.defaultOptions, v = e.defaultContext, g = e.assumeImmutableResults, b = g === void 0 ? s.assumeImmutableResults : g, C = e.resolvers, x = e.typeDefs, N = e.fragmentMatcher, T = e.name, M = e.version, S = e.devtools, R = e.link;
      R || (R = n ? new $6({ uri: n, credentials: i, headers: a }) : Gn.empty()), this.link = R, this.cache = s, this.disableNetworkFetches = u || h > 0, this.queryDeduplication = m, this.defaultOptions = y || /* @__PURE__ */ Object.create(null), this.typeDefs = x, this.devtoolsConfig = k(k({}, S), { enabled: (S == null ? void 0 : S.enabled) || f }), this.devtoolsConfig.enabled === void 0 && (this.devtoolsConfig.enabled = globalThis.__DEV__ !== !1), h && setTimeout(function() {
        return r.disableNetworkFetches = !1;
      }, h), this.watchQuery = this.watchQuery.bind(this), this.query = this.query.bind(this), this.mutate = this.mutate.bind(this), this.watchFragment = this.watchFragment.bind(this), this.resetStore = this.resetStore.bind(this), this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this), this.version = to, this.localState = new d5({
        cache: s,
        client: this,
        resolvers: C,
        fragmentMatcher: N
      }), this.queryManager = new u5({
        cache: this.cache,
        link: this.link,
        defaultOptions: this.defaultOptions,
        defaultContext: v,
        documentTransform: l,
        queryDeduplication: m,
        ssrMode: u,
        clientAwareness: {
          name: T,
          version: M
        },
        localState: this.localState,
        assumeImmutableResults: b,
        onBroadcast: this.devtoolsConfig.enabled ? function() {
          r.devToolsHookCb && r.devToolsHookCb({
            action: {},
            state: {
              queries: r.queryManager.getQueryStore(),
              mutations: r.queryManager.mutationStore || {}
            },
            dataWithOptimisticResults: r.cache.extract(!0)
          });
        } : void 0
      }), this.devtoolsConfig.enabled && this.connectToDevTools();
    }
    return t.prototype.connectToDevTools = function() {
      if (!(typeof window > "u")) {
        var e = window, r = Symbol.for("apollo.devtools");
        (e[r] = e[r] || []).push(this), e.__APOLLO_CLIENT__ = this, !Hs && globalThis.__DEV__ !== !1 && (Hs = !0, window.document && window.top === window.self && /^(https?|file):$/.test(window.location.protocol) && setTimeout(function() {
          if (!window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__) {
            var n = window.navigator, i = n && n.userAgent, a = void 0;
            typeof i == "string" && (i.indexOf("Chrome/") > -1 ? a = "https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm" : i.indexOf("Firefox/") > -1 && (a = "https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/")), a && globalThis.__DEV__ !== !1 && ce.log("Download the Apollo DevTools for a better development experience: %s", a);
          }
        }, 1e4));
      }
    }, Object.defineProperty(t.prototype, "documentTransform", {
      /**
       * The `DocumentTransform` used to modify GraphQL documents before a request
       * is made. If a custom `DocumentTransform` is not provided, this will be the
       * default document transform.
       */
      get: function() {
        return this.queryManager.documentTransform;
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype.stop = function() {
      this.queryManager.stop();
    }, t.prototype.watchQuery = function(e) {
      return this.defaultOptions.watchQuery && (e = ia(this.defaultOptions.watchQuery, e)), this.disableNetworkFetches && (e.fetchPolicy === "network-only" || e.fetchPolicy === "cache-and-network") && (e = k(k({}, e), { fetchPolicy: "cache-first" })), this.queryManager.watchQuery(e);
    }, t.prototype.query = function(e) {
      return this.defaultOptions.query && (e = ia(this.defaultOptions.query, e)), ce(e.fetchPolicy !== "cache-and-network", 16), this.disableNetworkFetches && e.fetchPolicy === "network-only" && (e = k(k({}, e), { fetchPolicy: "cache-first" })), this.queryManager.query(e);
    }, t.prototype.mutate = function(e) {
      return this.defaultOptions.mutate && (e = ia(this.defaultOptions.mutate, e)), this.queryManager.mutate(e);
    }, t.prototype.subscribe = function(e) {
      return this.queryManager.startGraphQLSubscription(e);
    }, t.prototype.readQuery = function(e, r) {
      return r === void 0 && (r = !1), this.cache.readQuery(e, r);
    }, t.prototype.watchFragment = function(e) {
      return this.cache.watchFragment(e);
    }, t.prototype.readFragment = function(e, r) {
      return r === void 0 && (r = !1), this.cache.readFragment(e, r);
    }, t.prototype.writeQuery = function(e) {
      var r = this.cache.writeQuery(e);
      return e.broadcast !== !1 && this.queryManager.broadcastQueries(), r;
    }, t.prototype.writeFragment = function(e) {
      var r = this.cache.writeFragment(e);
      return e.broadcast !== !1 && this.queryManager.broadcastQueries(), r;
    }, t.prototype.__actionHookForDevTools = function(e) {
      this.devToolsHookCb = e;
    }, t.prototype.__requestRaw = function(e) {
      return Pa(this.link, e);
    }, t.prototype.resetStore = function() {
      var e = this;
      return Promise.resolve().then(function() {
        return e.queryManager.clearStore({
          discardWatches: !1
        });
      }).then(function() {
        return Promise.all(e.resetStoreCallbacks.map(function(r) {
          return r();
        }));
      }).then(function() {
        return e.reFetchObservableQueries();
      });
    }, t.prototype.clearStore = function() {
      var e = this;
      return Promise.resolve().then(function() {
        return e.queryManager.clearStore({
          discardWatches: !0
        });
      }).then(function() {
        return Promise.all(e.clearStoreCallbacks.map(function(r) {
          return r();
        }));
      });
    }, t.prototype.onResetStore = function(e) {
      var r = this;
      return this.resetStoreCallbacks.push(e), function() {
        r.resetStoreCallbacks = r.resetStoreCallbacks.filter(function(n) {
          return n !== e;
        });
      };
    }, t.prototype.onClearStore = function(e) {
      var r = this;
      return this.clearStoreCallbacks.push(e), function() {
        r.clearStoreCallbacks = r.clearStoreCallbacks.filter(function(n) {
          return n !== e;
        });
      };
    }, t.prototype.reFetchObservableQueries = function(e) {
      return this.queryManager.reFetchObservableQueries(e);
    }, t.prototype.refetchQueries = function(e) {
      var r = this.queryManager.refetchQueries(e), n = [], i = [];
      r.forEach(function(s, l) {
        n.push(l), i.push(s);
      });
      var a = Promise.all(i);
      return a.queries = n, a.results = i, a.catch(function(s) {
        globalThis.__DEV__ !== !1 && ce.debug(17, s);
      }), a;
    }, t.prototype.getObservableQueries = function(e) {
      return e === void 0 && (e = "active"), this.queryManager.getObservableQueries(e);
    }, t.prototype.extract = function(e) {
      return this.cache.extract(e);
    }, t.prototype.restore = function(e) {
      return this.cache.restore(e);
    }, t.prototype.addResolvers = function(e) {
      this.localState.addResolvers(e);
    }, t.prototype.setResolvers = function(e) {
      this.localState.setResolvers(e);
    }, t.prototype.getResolvers = function() {
      return this.localState.getResolvers();
    }, t.prototype.setLocalStateFragmentMatcher = function(e) {
      this.localState.setFragmentMatcher(e);
    }, t.prototype.setLink = function(e) {
      this.link = this.queryManager.link = e;
    }, Object.defineProperty(t.prototype, "defaultContext", {
      get: function() {
        return this.queryManager.defaultContext;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }()
);
globalThis.__DEV__ !== !1 && (Ec.prototype.getMemoryInternals = i4);
var gi = /* @__PURE__ */ new Map(), za = /* @__PURE__ */ new Map(), Mc = !0, wi = !1;
function Sc(t) {
  return t.replace(/[\s,]+/g, " ").trim();
}
function h5(t) {
  return Sc(t.source.body.substring(t.start, t.end));
}
function f5(t) {
  var e = /* @__PURE__ */ new Set(), r = [];
  return t.definitions.forEach(function(n) {
    if (n.kind === "FragmentDefinition") {
      var i = n.name.value, a = h5(n.loc), s = za.get(i);
      s && !s.has(a) ? Mc && console.warn("Warning: fragment with name " + i + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : s || za.set(i, s = /* @__PURE__ */ new Set()), s.add(a), e.has(a) || (e.add(a), r.push(n));
    } else
      r.push(n);
  }), k(k({}, t), { definitions: r });
}
function p5(t) {
  var e = new Set(t.definitions);
  e.forEach(function(n) {
    n.loc && delete n.loc, Object.keys(n).forEach(function(i) {
      var a = n[i];
      a && typeof a == "object" && e.add(a);
    });
  });
  var r = t.loc;
  return r && (delete r.startToken, delete r.endToken), t;
}
function _5(t) {
  var e = Sc(t);
  if (!gi.has(e)) {
    var r = Ay(t, {
      experimentalFragmentVariables: wi,
      allowLegacyFragmentVariables: wi
    });
    if (!r || r.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    gi.set(e, p5(f5(r)));
  }
  return gi.get(e);
}
function Tr(t) {
  for (var e = [], r = 1; r < arguments.length; r++)
    e[r - 1] = arguments[r];
  typeof t == "string" && (t = [t]);
  var n = t[0];
  return e.forEach(function(i, a) {
    i && i.kind === "Document" ? n += i.loc.source.body : n += i, n += t[a + 1];
  }), _5(n);
}
function g5() {
  gi.clear(), za.clear();
}
function m5() {
  Mc = !1;
}
function v5() {
  wi = !0;
}
function y5() {
  wi = !1;
}
var Cn = {
  gql: Tr,
  resetCaches: g5,
  disableFragmentWarnings: m5,
  enableExperimentalFragmentVariables: v5,
  disableExperimentalFragmentVariables: y5
};
(function(t) {
  t.gql = Cn.gql, t.resetCaches = Cn.resetCaches, t.disableFragmentWarnings = Cn.disableFragmentWarnings, t.enableExperimentalFragmentVariables = Cn.enableExperimentalFragmentVariables, t.disableExperimentalFragmentVariables = Cn.disableExperimentalFragmentVariables;
})(Tr || (Tr = {}));
Tr.default = Tr;
const b5 = Tr`
  query PricesChartRoundTrip(
    $origin: String!
    $destination: String!
    $limit: Int!
    $offset: Int!
    $minDepartStart: Date!
    $maxDepartStart: Date!
    $minReturnStart: Date!
    $maxReturnStart: Date!
    $currency: String!
    $withBaggage: Boolean
    $directOnly: Boolean
    $tripClass: TripClass
  ) {
    prices_round_trip(
      paging: { offset: $offset, limit: $limit }
      params: {
        origin: $origin
        destination: $destination
        depart_date_min: $minDepartStart
        depart_date_max: $maxDepartStart
        return_date_min: $minReturnStart
        return_date_max: $maxReturnStart
        with_baggage: $withBaggage
        direct: $directOnly
        trip_class: $tripClass
      }
      currency: $currency
    ) {
      ...PriceDetails
    }
  }

  fragment PriceDetails on Price {
    departure_at
    return_at
    value
  }
`, C5 = Tr`
  query PricesChartRoundTrip(
    $origin: String!
    $destination: String!
    $limit: Int!
    $offset: Int!
    $minDepartStart: Date!
    $maxDepartStart: Date!
    $currency: String!
    $withBaggage: Boolean
    $directOnly: Boolean
    $tripClass: TripClass
  ) {
    prices_one_way(
      paging: { offset: $offset, limit: $limit }
      params: {
        origin: $origin
        destination: $destination
        depart_date_min: $minDepartStart
        depart_date_max: $maxDepartStart
        with_baggage: $withBaggage
        direct: $directOnly
        trip_class: $tripClass
      }
      currency: $currency
    ) {
      ...PriceDetails
    }
  }

  fragment PriceDetails on Price {
    departure_at
    value
  }
`, In = class In {
};
In.apiUrl = "https://api.apistp.com/", In.getPriceMatrix = async ({
  originIata: e,
  destinationIata: r,
  departStart: n,
  returnStart: i,
  range: a,
  withBaggage: s,
  direct: l,
  currency: c,
  tripClass: u,
  marker: d
}) => {
  const h = new Ec({
    uri: In.apiUrl + "whitelabels/web/flights/v1/prices/graphql/query",
    headers: {
      "Affiliate-Marker": d,
      "Content-Type": "application/json"
    },
    cache: new Nc()
  });
  if (!n) return { prices: [], errors: {} };
  const { data: f } = await h.query({
    query: i ? b5 : C5,
    variables: {
      origin: e,
      destination: r,
      limit: 50,
      offset: 0,
      minDepartStart: $e(pa(_t(n), a), "yyyy-MM-dd"),
      maxDepartStart: $e(br(_t(n), a), "yyyy-MM-dd"),
      minReturnStart: i ? $e(pa(_t(i), a), "yyyy-MM-dd") : void 0,
      maxReturnStart: i ? $e(br(_t(i), a), "yyyy-MM-dd") : void 0,
      currency: c,
      directOnly: l,
      withBaggage: s,
      tripClass: u === "business" ? "C" : "Y"
    }
  });
  return {
    prices: f[i ? "prices_round_trip" : "prices_one_way"].map(
      (m) => i ? {
        value: m.value,
        return_date: m.return_at.split("T")[0],
        depart_date: m.departure_at.split("T")[0]
      } : {
        value: m.value,
        depart_date: m.departure_at.split("T")[0]
      }
    )
  };
};
let Ha = In;
hl();
const w5 = (t, e) => t.reduce((r, n) => e(n) < r ? e(n) : r, 1 / 0), T5 = (t, e) => t.reduce((r, n) => e(n) > r ? e(n) : r, -1 / 0), Gs = () => {
  _.filters.reset(), _.modal.closeLastModal();
}, Zs = () => {
  _.search.params && (_.search.setParams({
    ..._.search.params,
    tripClass: "economy"
  }), _.modal.closeLastModal());
};
let Ks = !0;
const ha = Ya(), k5 = !!(ha != null && ha.flightSearch), F5 = () => {
  var ze, qe, mt, Rt, Pt, Bt, $t;
  if (!_.langs.defaultLang || !_.currency.currentCurrency.code || !_.langs.isLoadedLang)
    return null;
  k5 && Ks && (_.resultsWidget.show(), Ks = !1);
  const t = st(() => !!_.resultsWidget.isShowing), e = Q(!0), r = _.filters.values.isSingleAirline, n = Q(-1 / 0), i = Q(1 / 0), a = () => {
    n.value = -1 / 0, i.value = 1 / 0;
  }, s = () => {
    const ie = w5(T, (ke) => ke.price.value), ae = T5(T, (ke) => ke.price.value);
    n.value = n.value === -1 / 0 ? ie : Math.min(ie, n.value), i.value = i.value === 1 / 0 ? ae : Math.max(ae, i.value);
  }, l = () => {
    Zs(), Eo(_.search.params);
  }, { ticketsRes: c, isLoading: u, appliedFilters: d, searchId: h, resultUrl: f, isDone: p, isOnlySoftTickets: m } = Mv({
    onTicketsRefetch: s
  }), { t: y } = Y(), v = Q(null), g = Q(10), b = Q(!1), { searchTickets: C, startSearchTickets: x, searchTicketsWithoutResetFilters: N } = G2(), T = ((mt = (qe = (ze = c == null ? void 0 : c.tickets) == null ? void 0 : ze.map((ie) => Cv(ie, c))) == null ? void 0 : qe.filter(Boolean)) == null ? void 0 : mt.filter(
    (ie) => r ? ki(ie.airlineList, (ae, ke) => ae.iata === ke.iata).length <= 1 : !0
  )) ?? [], { progress: M, resetTimer: S, showRefreshButton: R, updateShowRefreshButton: $ } = kv();
  let V = null;
  const J = _.search.params, F = "modalFilterMatrix", [I, O] = Pe(!1), [H, W] = Pe(!1), [se, L] = Pe([]), [X, Me] = Pe(null), [me, Fe] = Pe(null), [P, E] = Pe(!1), U = () => _.modal.isModalOpen({ name: F }) ? /* @__PURE__ */ o(
    S3,
    {
      prices: se,
      load: P,
      initialDepartureStartDate: X,
      initialReturnStartDate: me,
      daysRange: 3,
      onClose: () => {
        _.modal.closeAllModals();
      },
      onSelectDate: Ve,
      direct: I,
      withBaggage: H,
      onDatesChange: (ae) => {
        if (Me(ae.departureDate), Fe((ae == null ? void 0 : ae.returnDate) || null), _.search.params.directions == null) throw new Error("No directions");
        const ke = _.search.params.directions[0], Ue = _.search.params.directions[1];
        O(ae.direct), W(ae.withBaggage), Z({
          startDate: ae.departureDate,
          originIata: ke.origin,
          returnDate: Ue == null ? void 0 : ae.returnDate,
          destinationIata: Ue == null ? ke.destination : Ue.origin,
          direct: ae.direct,
          withBaggage: ae.withBaggage
        });
      }
    }
  ) : /* @__PURE__ */ o(Ie, {}), Z = async (ie) => {
    try {
      E(!0);
      const ae = await Ha.getPriceMatrix({
        originIata: ie.originIata,
        destinationIata: ie.destinationIata,
        departStart: ie.startDate,
        returnStart: ie.returnDate ? ie.returnDate : void 0,
        range: 3,
        direct: ie.direct,
        withBaggage: ie.withBaggage,
        currency: _.currency.currentCurrency.code,
        tripClass: _.search.params.tripClass,
        marker: _.base.marker || ""
      });
      L(ae.prices), _.modal.updateModalContent({
        name: F,
        content: U()
      });
    } catch (ae) {
      console.error(ae);
    } finally {
      E(!1);
    }
  }, K = () => {
    if (!V) return;
    const ie = V.directions[0], ae = V.directions[1];
    Me(ie.date), Fe((ae == null ? void 0 : ae.date) || null), Z({
      startDate: ie.date,
      originIata: ie.origin,
      returnDate: ae == null ? void 0 : ae.date,
      destinationIata: ae == null ? ie.destination : ae.origin,
      direct: I,
      withBaggage: H
    });
  }, z = Q(""), de = () => {
    var Vt;
    const ie = Ya();
    if (!ie) return;
    const ae = (ie == null ? void 0 : ie.flightSearch) || "";
    if (!ae) return;
    const ke = uu(ae, {
      destinationAirports: ie.destinationAirports,
      originAirports: ie.originAirports
    });
    if (!ke) {
      _.resultsWidget.hide();
      return;
    }
    V = {
      directions: ke == null ? void 0 : ke.segments.map((Xe) => {
        var qt, Ut, Qt, Xr;
        return {
          origin: ((qt = Xe.origin) == null ? void 0 : qt.iata) || "",
          originType: (Ut = Xe.origin) == null ? void 0 : Ut.type,
          destination: ((Qt = Xe.destination) == null ? void 0 : Qt.iata) || "",
          destinationType: (Xr = Xe.destination) == null ? void 0 : Xr.type,
          date: Xe.date
        };
      }),
      adults: ke.passengers.adults || 1,
      children: ke.passengers.children || 0,
      infants: ke.passengers.infants || 0,
      tripClass: du(hu, ke.tripClass) || "economy",
      ...ie.ticketId && { ticketId: ie.ticketId }
    }, _.filters.setIsUserInteraction(!1), _.search.setParams(V);
    const Ue = (Vt = V.directions) == null ? void 0 : Vt.filter(
      (Xe) => Xe.origin && Xe.destination && Xe.date
    );
    Ue != null && Ue.length || _.resultsWidget.hide(), S();
    const jt = tl(Ue);
    (jt.type === "oneway" || jt.type === "roundtrip") && fu({
      params: { ...V },
      key: ae
    }), g.value = 10, a(), _.search.isInMultiRouteMode || K(), Ue != null && Ue.length && (b.value = !1, $(!1), z.value && z.value === ae ? N() : C(), z.value = ae);
  };
  if (re(() => (de(), window.addEventListener("urlchange", de), () => {
    window.removeEventListener("urlchange", de);
  }), []), !t.value) return null;
  re(() => {
    var ae;
    if (!(c != null && c.isLast) || !t.value || u || !(c != null && c.tickets) || c.tickets.length || (c == null ? void 0 : c.searchId) !== ((ae = _.search.requestRes) == null ? void 0 : ae.search_id) || !c.isLast) return;
    Object.keys(d).length > 0 && c.meta.total_tickets_count ? _.modal.openModal({
      content: /* @__PURE__ */ o(
        bv,
        {
          totalTicketsCount: c.meta.total_tickets_count ?? 0,
          onWeakenFilters: Gs
        }
      ),
      onClose: Gs
    }) : _.search.params.tripClass === "business" ? _.modal.openModal({
      content: /* @__PURE__ */ o(rp, { onChangeClass: l }),
      onClose: Zs
    }) : (e.value = !1, _.modal.openModal({
      content: /* @__PURE__ */ o(iv, {}),
      onClose: () => {
        _.resultsWidget.hide(), e.value = !0;
      }
    }));
  }, [p, u, c]);
  const D = () => {
    $(!1), he(), x(), setTimeout(() => $(!0), eo() + 30);
  }, ne = () => {
    g.value = T.length;
  }, le = ((Rt = c == null ? void 0 : c.direct_flights_v2) == null ? void 0 : Rt.map((ie) => O2(ie, c))) || [], ve = Q(!1);
  re(() => {
    var ie, ae, ke, Ue, jt;
    if (!((ke = (ae = (ie = _.search) == null ? void 0 : ie.params) == null ? void 0 : ae.ticketId) != null && ke.includes("direct")) && T.length)
      if ((jt = (Ue = _.search) == null ? void 0 : Ue.params) != null && jt.ticketId) {
        const Vt = T.find((Xe) => {
          var qt, Ut, Qt;
          return Xe.id === ((Qt = (Ut = (qt = _) == null ? void 0 : qt.search) == null ? void 0 : Ut.params) == null ? void 0 : Qt.ticketId);
        }) || null;
        Vt && !ve.value ? (v.value = Vt, ve.value = !0) : p && !ve.value && (_.modal.openModal({
          content: /* @__PURE__ */ o(Xa, {})
        }), v.value = null, ve.value = !0);
      } else
        v.value = null;
  }, [(Bt = (Pt = _.search) == null ? void 0 : Pt.params) == null ? void 0 : Bt.ticketId, T, p]);
  const j = (($t = _.search.params) == null ? void 0 : $t.directions.flatMap((ie) => [ie.origin, ie.destination])) ?? [], he = () => {
    _.modal.closeLastModal();
  }, Je = () => {
    _.modal.closeAllModals(), D();
  }, Le = () => {
    _.modal.openModal({
      content: /* @__PURE__ */ o(C2, { onClose: he, onUpdate: Je }),
      variant: "popup"
    });
  };
  re(() => {
    R && !u && Le();
  }, [R]);
  const lt = (ie, ae) => Js(dl(ie, ae));
  re(() => {
    var ie, ae;
    b.value = !!((c == null ? void 0 : c.searchId) === ((ie = _.search.requestRes) == null ? void 0 : ie.search_id) && ((ae = c == null ? void 0 : c.tickets) != null && ae.length));
  }, [c]);
  const q = () => {
    Eo(_.search.params);
  }, { pathname: G, search: ue } = iu();
  re(() => {
    document.getElementById(lu.search) || cu();
  }, [G, ue]), re(() => {
    u || _.search.isInMultiRouteMode || K();
  }, [u]);
  const we = (ie, ae) => {
    J.directions[0].date = ie, ae && (J.directions[J.directions.length - 1].date = ae), q();
  }, Ve = (ie, ae) => {
    we(ie, ae), q && q();
  }, Ke = async () => {
    if (_.search.params.directions == null) throw new Error("No directions");
    K(), _.modal.openModal({
      name: F,
      content: U(),
      variant: "popup"
    });
  };
  return _.modal.updateModalContent({
    name: F,
    content: U()
  }), /* @__PURE__ */ o("div", { className: ut.root, children: e.value && /* @__PURE__ */ o(Ie, { children: [
    (u || !b.value) && /* @__PURE__ */ o(au, { progress: M, className: ut.progressBar }),
    !u && b.value && _.search.isInMultiRouteMode == !1 ? /* @__PURE__ */ o(Ie, { children: [
      /* @__PURE__ */ o(
        R3,
        {
          prices: se,
          start: X,
          end: me,
          onSelectDate: we
        }
      ),
      /* @__PURE__ */ o(
        K3,
        {
          prices: se,
          start: X,
          end: me,
          onSelectDate: we,
          onClickButton: Ke
        }
      )
    ] }) : /* @__PURE__ */ o(Ie, {}),
    b.value && c ? /* @__PURE__ */ o(
      Kf,
      {
        initialInfo: {
          selectedIatas: j,
          agencies: c == null ? void 0 : c.agents,
          places: c == null ? void 0 : c.places,
          alliances: c == null ? void 0 : c.alliances,
          airlines: c == null ? void 0 : c.airlines,
          tickets: T,
          prices: {
            min: n.value,
            max: i.value
          },
          flightLegs: c != null && c.flight_legs ? Object.values(c.flight_legs) : [],
          filter_boundaries: c == null ? void 0 : c.filter_boundaries,
          equipments: c == null ? void 0 : c.equipments
        },
        classNames: {
          contentDesktop: ut.filtersDesktop,
          mobileMenu: ut.filtersMobileMenu,
          filtersMobileView: ut.filtersMobileView
        },
        isStale: R,
        openUpdateModal: Le
      }
    ) : /* @__PURE__ */ o(ou, { progress: M, className: ut.filtersLoader }),
    /* @__PURE__ */ o("div", { className: ut.wrapper, children: [
      b.value && !!le.length && /* @__PURE__ */ o(
        c2,
        {
          flights: le,
          ticketsRes: c,
          isStale: R,
          updateTickets: D,
          openUpdateModal: Le
        }
      ),
      b.value && /* @__PURE__ */ o("div", { className: ut.cards, children: [
        m && /* @__PURE__ */ o(fv, {}),
        T.slice(0, g.value).map((ie, ae) => /* @__PURE__ */ o(
          qo,
          {
            item: ie,
            isStale: R,
            tabIndex: ae + 1,
            updateTickets: D,
            ticketForDetail: lt(ie.id, c),
            searchId: h,
            resultUrl: f,
            openUpdateModal: Le
          },
          ie.id
        )),
        T.length > 10 && g.value < T.length && /* @__PURE__ */ o(
          "button",
          {
            className: ut.moreTickets,
            onClick: R ? D : ne,
            children: R ? /* @__PURE__ */ o(Ie, { children: [
              "Update search ",
              /* @__PURE__ */ o("span", { children: y("ticketswidget.prices_may_be_outdated") })
            ] }) : y("inputs.show_more_options")
          }
        ),
        v.value && /* @__PURE__ */ o("div", { className: ut.hideCard, children: /* @__PURE__ */ o(
          qo,
          {
            isFromUrl: !0,
            item: v.value,
            isStale: R,
            tabIndex: -1,
            updateTickets: D,
            ticketForDetail: lt(v.value.id, c),
            searchId: h,
            resultUrl: f
          }
        ) })
      ] }),
      /* @__PURE__ */ o(su, { className: b.value ? ut.hidden : ut.visible })
    ] })
  ] }) });
};
export {
  F5 as TicketsWidget
};
