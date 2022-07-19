define("componentFactory", [
  "require",
  "exports",
  "htmlExtensions",
  "utility",
  "stringExtensions",
  "pageBehaviors",
], function (n, t, i, r, u, f) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var e = (function () {
    function n() {}
    return (
      (n.create = function (t) {
        for (var i, r = 0, u = t; r < u.length; r++) {
          if (((i = u[r]), !i.c && !i.component))
            throw "factoryInput should has either component or c to tell the factory what component to create.Eg.ComponentFactory.create([{ c: Carousel] or ComponentFactory.create([component: Carousel]))";
          n.createComponent(i.component || i.c, i);
        }
      }),
      (n.createComponent = function (t, r) {
        if (t) {
          var o = r && r.eventToBind ? r.eventToBind : "",
            f = r && r.selector ? r.selector : t.selector,
            s = r && r.context ? r.context : null,
            u = [],
            e = function (n, f, e) {
              var a, c, l, o, h;
              for (
                a = r.elements
                  ? r.elements
                  : f
                  ? i.selectElementsT(f, s)
                  : [document.body],
                  c = 0,
                  l = a;
                c < l.length;
                c++
              )
                (o = l[c]),
                  o
                    ? (o.mwfInstances || (o.mwfInstances = {}),
                      o.mwfInstances[n]
                        ? u.push(o.mwfInstances[n])
                        : ((h = new t(o, e)),
                          (!h.isObserving || h.isObserving()) &&
                            ((o.mwfInstances[n] = h), u.push(h))))
                    : console.error(
                        "The elements array in ComponentFactory.create() cannnot have a null element in it"
                      );
            };
          switch (o) {
            case "DOMContentLoaded":
              if (n.onDomReadyHappened) n.callBindFunction(t, f, e, r, u);
              else {
                n.domReadyFunctions.push(function () {
                  return n.callBindFunction(t, f, e, r, u);
                });
                break;
              }
              break;
            case "load":
            default:
              if (n.onDeferredHappened) n.callBindFunction(t, f, e, r, u);
              else {
                n.deferredFunctions.push(function () {
                  return n.callBindFunction(t, f, e, r, u);
                });
                break;
              }
          }
        }
      }),
      (n.callBindFunction = function (t, i, u, f, e) {
        f === void 0 && (f = null);
        var o = n.getTypeName(t),
          s = o || i || "",
          h = f && f.params ? f.params : {};
        h.mwfClass = o;
        r.createPerfMarker(s + "_Begin");
        u(o, i, h);
        r.createPerfMarker(s + "_End");
        f && f.callback && f.callback(e);
      }),
      (n.getTypeName = function (t) {
        if (t.typeName) return t.typeName;
        if (t.name) return t.name;
        var i = n.typeNameRegEx.exec(t.toString());
        if (i && i.length > 1) return i[1];
      }),
      (n.enumerateComponents = function (n, t) {
        var i, r, u;
        if (n && t) {
          i = n.mwfInstances;
          for (r in i)
            if (i.hasOwnProperty(r) && ((u = i[r]), u && !t(r, u))) break;
        }
      }),
      (n.detach = function (n, t) {
        var i = n,
          r;
        i &&
          i.mwfInstances &&
          !u.isNullOrWhiteSpace(t) &&
          i.mwfInstances.hasOwnProperty(t) &&
          ((r = i.mwfInstances[t]),
          (i.mwfInstances[t] = null),
          r && r.detach && r.detach());
      }),
      (n.typeNameRegEx = /function\s+(\S+)\s*\(/),
      (n.onLoadTimeoutMs = 6e3),
      (n.onDeferredHappened = !1),
      (n.deferredFunctions = []),
      (n.onDomReadyHappened = !1),
      (n.domReadyFunctions = []),
      n
    );
  })();
  (t.ComponentFactory = e),
    (function () {
      i.onDeferred(function () {
        var n, t, r, u;
        if (
          ((e.onDeferredHappened = !0),
          (n = e.deferredFunctions),
          !n || n.length > 0)
        )
          for (t = 0, r = n; t < r.length; t++)
            (u = r[t]),
              typeof u == "function" &&
                i.SafeBrowserApis.requestAnimationFrame.call(window, u);
        e.deferredFunctions = null;
      }, e.onLoadTimeoutMs);
      i.documentReady(function () {
        var n, t, r, u;
        if (
          ((e.onDomReadyHappened = !0),
          (n = e.domReadyFunctions),
          !n || n.length > 0)
        )
          for (t = 0, r = n; t < r.length; t++)
            (u = r[t]),
              typeof u == "function" &&
                i.SafeBrowserApis.requestAnimationFrame.call(window, u);
        e.domReadyFunctions = null;
      }, e.onLoadTimeoutMs);
      new f.PageBehaviors();
    })();
});
define("htmlExtensions", ["require", "exports", "stringExtensions"], function (
  n,
  t,
  i
) {
  "use strict";
  function e(n, t, i, f) {
    var e, o, s;
    for (f === void 0 && (f = !1), e = 0, o = u(n); e < o.length; e++)
      (s = o[e]), y(s, i, f, r[t]);
  }
  function g(n, t, r, f) {
    var e, s, l, o, h, c;
    if ((f === void 0 && (f = !1), !i.isNullOrWhiteSpace(t)))
      for (e = 0, s = u(n); e < s.length; e++)
        for (l = s[e], o = 0, h = t.split(/\s+/); o < h.length; o++)
          (c = h[o]), i.isNullOrWhiteSpace(c) || y(l, r, f, c);
  }
  function nt(n, t, r, f) {
    var e, s, l, o, h, c;
    for (f === void 0 && (f = !1), e = 0, s = u(n); e < s.length; e++)
      for (l = s[e], o = 0, h = u(t); o < h.length; o++)
        (c = h[o]), i.isNullOrWhiteSpace(c) || d(l, r, f, c);
  }
  function tt(n) {
    n = v(n);
    n && (n.preventDefault ? n.preventDefault() : (n.returnValue = !1));
  }
  function it(n, t, i, r) {
    r === void 0 && (r = 150);
    var f,
      u = 0,
      o = function (n) {
        var t = Date.now();
        f && (clearTimeout(f), (f = undefined));
        !!u && t < u + r
          ? (f = setTimeout(function () {
              u = Date.now();
              i(n);
            }, r - (t - u)))
          : ((u = t), i(n));
      };
    return e(n, t, o), o;
  }
  function rt(n, t, r, f, e) {
    function p(n) {
      var i,
        t = 0;
      return function (r) {
        var u = Date.now();
        clearTimeout(i);
        !!t && u < t + e
          ? (i = setTimeout(function () {
              t = u;
              n(r);
            }, e - (u - t)))
          : ((t = u), n(r));
      };
    }
    var o, h, a, s, c, l, v;
    if (
      (f === void 0 && (f = !1),
      e === void 0 && (e = 150),
      !i.isNullOrWhiteSpace(t))
    )
      for (o = 0, h = u(n); o < h.length; o++)
        for (a = h[o], s = 0, c = t.split(/\s+/); s < c.length; s++)
          (l = c[s]), i.isNullOrWhiteSpace(l) || ((v = p(r)), y(a, v, f, l));
  }
  function ut(n, t, i, r) {
    r === void 0 && (r = 150);
    var u,
      f = function (n) {
        window.clearTimeout(u);
        u = setTimeout(function () {
          i(n);
        }, r);
      };
    return e(n, t, f), f;
  }
  function ft(n, t) {
    if ((t === void 0 && (t = 5e3), document.readyState === "complete")) {
      n.call(null);
      return;
    }
    if (!document.attachEvent && document.readyState === "interactive") {
      n.call(null);
      return;
    }
    var o,
      i,
      u,
      f = function () {
        clearTimeout(o);
        i && c(document, r.DOMContentLoaded, i);
        u && c(document, r.onreadystatechange, u);
        l.requestAnimationFrame.call(window, n);
      };
    if (
      ((o = setTimeout(function () {
        f("timedout");
      }, t)),
      document.addEventListener)
    ) {
      i = function () {
        f("domcontentloaded");
      };
      e(document, r.DOMContentLoaded, i, !1);
      return;
    }
    document.attachEvent &&
      ((u = function () {
        document.readyState === "complete" && f("readystatecomplete");
      }),
      e(document, r.onreadystatechange, u, !1));
  }
  function et(n, t) {
    t === void 0 && (t = 5e3);
    var i,
      u = setTimeout(function () {
        clearTimeout(u);
        c(window, r.load, i);
        n.call(null);
      }, t);
    i = function () {
      clearTimeout(u);
      l.requestAnimationFrame.call(window, n);
    };
    document.readyState === "complete"
      ? (clearTimeout(u), n.call(null))
      : e(window, r.load, i);
  }
  function p(n, t) {
    !n ||
      i.isNullOrWhiteSpace(t) ||
      b(n, t) ||
      (n.classList
        ? n.classList.add(t)
        : (n.className = i.trim(n.className + " " + t)));
  }
  function w(n, t) {
    var o, e, s, r, f;
    if (!!n && !i.isNullOrWhiteSpace(t))
      for (o = " " + i.trim(t) + " ", e = 0, s = u(n); e < s.length; e++)
        if (((r = s[e]), r.classList)) r.classList.remove(t);
        else if (!i.isNullOrWhiteSpace(r.className)) {
          for (f = " " + r.className + " "; f.indexOf(o) > -1; )
            f = f.replace(o, " ");
          r.className = i.trim(f);
        }
  }
  function ot(n, t) {
    var i, r, u;
    if (t) for (i = 0, r = t; i < r.length; i++) (u = r[i]), w(n, u);
  }
  function st(n, t) {
    var i, r, u;
    if (t) for (i = 0, r = t; i < r.length; i++) (u = r[i]), p(n, u);
  }
  function ht(n, t) {
    var u, f, r;
    if (n && t)
      for (u = 0, f = t; u < f.length; u++)
        (r = f[u]),
          i.isNullOrWhiteSpace(r.name) ||
            i.isNullOrWhiteSpace(r.value) ||
            n.setAttribute(r.name, r.value);
  }
  function b(n, t) {
    return !n || i.isNullOrWhiteSpace(t)
      ? !1
      : n.classList
      ? n.classList.contains(t)
      : (" " + n.className + " ").indexOf(" " + i.trim(t) + " ") > -1;
  }
  function ct(n) {
    return n ? n.parentElement.removeChild(n) : n;
  }
  function lt(n, t) {
    return h(n, t);
  }
  function at(n, t) {
    var i = h(n, t);
    return !i || !i.length ? null : i[0];
  }
  function h(n, t) {
    var r, u;
    if (i.isNullOrWhiteSpace(n) || n === "#") return [];
    if (((r = t || document), /^[\#.]?[\w-]+$/.test(n))) {
      switch (n[0]) {
        case ".":
          return r.getElementsByClassName
            ? o(r.getElementsByClassName(n.slice(1)))
            : o(r.querySelectorAll(n));
        case "#":
          return (u = r.querySelector(n)), u ? [u] : [];
      }
      return o(r.getElementsByTagName(n));
    }
    return o(r.querySelectorAll(n));
  }
  function vt(n, t) {
    var i = h(n, t);
    return !i || !i.length ? null : i[0];
  }
  function yt(n, t) {
    var o = t || document,
      u,
      f,
      i,
      r,
      e;
    for (u = n.split(","), i = 0, r = u; i < r.length; i++)
      (e = r[i]), (f += this.selectElements(e, o));
    return f;
  }
  function o(n) {
    var i, t;
    if (!n) return [];
    for (i = [], t = 0; t < n.length; t++) i.push(n[t]);
    return i;
  }
  function pt(n) {
    for (n === void 0 && (n = document.documentElement); n !== null; ) {
      var t = n.getAttribute("dir");
      if (!t) n = n.parentElement;
      else return t === "rtl" ? s.right : s.left;
    }
    return s.left;
  }
  function a(n) {
    var i, t, r;
    if (n) {
      i = n.getBoundingClientRect();
      t = {};
      for (r in i) t[r] = i[r];
      return (
        typeof t.width == "undefined" && (t.width = n.offsetWidth),
        typeof t.height == "undefined" && (t.height = n.offsetHeight),
        t
      );
    }
  }
  function wt(n) {
    if (n)
      return {
        width:
          parseFloat(a(n).width) +
          parseFloat(f(n, "margin-left")) +
          parseFloat(f(n, "margin-right")),
        height:
          parseFloat(a(n).height) +
          parseFloat(f(n, "margin-top")) +
          parseFloat(f(n, "margin-bottom")),
      };
  }
  function f(n, t, r) {
    if (!n) return null;
    if (!r && r !== "")
      return (
        (r = n.style[t]),
        i.isNullOrWhiteSpace(r) && ((r = getComputedStyle(n)), (r = r[t])),
        r
      );
    n.style[t] = r;
  }
  function c(n, t, i, f) {
    var e, o, s;
    if (n && t && i)
      for (e = 0, o = u(n); e < o.length; e++) (s = o[e]), d(s, i, f, r[t]);
  }
  function k(n) {
    return Array.isArray
      ? Array.isArray(n)
      : {}.toString.call(n) === "[object Array]";
  }
  function u(n) {
    return n ? (k(n) ? n : typeof n == "string" ? n.split(/\s+/) : [n]) : [];
  }
  function bt(n, t) {
    return !!n && n !== t && n.contains(t);
  }
  function kt(n, t) {
    return !!n && n.contains(t);
  }
  function dt(n) {
    return !n ? "" : n.textContent || n.innerText || "";
  }
  function gt(n, t) {
    !n ||
      t === null ||
      (n.textContent ? (n.textContent = t) : (n.innerHTML = t));
  }
  function ni(n) {
    n && (n.innerHTML = "");
  }
  function ti(n) {
    return (n = v(n)), n.target || n.srcElement;
  }
  function v(n) {
    return n || window.event;
  }
  function y(n, t, i, r) {
    i === void 0 && (i = !1);
    !n ||
      (window.addEventListener
        ? n.addEventListener(r, t, i)
        : n.attachEvent("on" + r, t));
  }
  function d(n, t, i, r) {
    i === void 0 && (i = !1);
    !n ||
      (window.removeEventListener
        ? n.removeEventListener(r, t, i)
        : n.detachEvent("on" + r, t));
  }
  function ii(n, t, i) {
    if ((i === void 0 && (i = {}), !n || !t)) return null;
    var f = typeof t == "string" ? t : r[t],
      u = null;
    if (
      ((i.bubbles = typeof i.bubbles == "undefined" ? !0 : i.bubbles),
      (i.cancelable = typeof i.cancelable == "undefined" ? !0 : i.cancelable),
      window.CustomEvent && typeof CustomEvent == "function")
    )
      (u = new CustomEvent(f, i)),
        i.changedTouches &&
          i.changedTouches.length &&
          (u.changedTouches = i.changedTouches);
    else if (document.createEvent)
      (u = document.createEvent("CustomEvent")),
        u.initCustomEvent(f, i.bubbles, i.cancelable, i.detail),
        i.changedTouches &&
          i.changedTouches.length &&
          (u.changedTouches = i.changedTouches);
    else {
      u = document.createEventObject();
      try {
        n.fireEvent("on" + f, u);
      } catch (e) {
        return undefined;
      }
      return u;
    }
    return n.dispatchEvent(u), u;
  }
  function ri(n) {
    n.stopPropagation ? n.stopPropagation() : (n.returnValue = !1);
  }
  function ui(n) {
    return (
      n === void 0 && (n = window),
      n.scrollY ||
        n.pageYOffset ||
        (n.document.compatMode === "CSS1Compat"
          ? n.document.documentElement.scrollTop
          : n.document.body.scrollTop)
    );
  }
  function fi(n) {
    if (!n) return window.document.documentElement;
    for (
      var i = n.ownerDocument.documentElement, t = n.offsetParent;
      t && f(t, "position") == "static";

    )
      t = t.offsetParent;
    return t || i;
  }
  function ei(n, t) {
    if (n && t) {
      var i = t.clientHeight,
        r = t.scrollHeight;
      r > i &&
        (t.scrollTop = Math.min(
          n.offsetTop - t.firstElementChild.offsetTop,
          r - i
        ));
    }
  }
  function oi(n) {
    return typeof n.complete != "undefined" &&
      typeof n.naturalHeight != "undefined"
      ? n && n.complete && n.naturalHeight > 0
      : !0;
  }
  function si(n) {
    return n &&
      typeof n.complete != "undefined" &&
      typeof n.naturalHeight != "undefined"
      ? n && n.complete && n.naturalWidth == 0 && n.naturalHeight == 0
      : !1;
  }
  function hi(n) {
    var i = n.touches && n.touches.length ? n.touches : [n],
      t = (n.changedTouches && n.changedTouches[0]) || i[0];
    return { x: t.clientX, y: t.clientY };
  }
  function ci(n, t) {
    for (
      var i =
        n.matches ||
        n.webkitMatchesSelector ||
        n.mozMatchesSelector ||
        n.msMatchesSelector;
      n;

    ) {
      if (i.call(n, t)) break;
      n = n.parentElement;
    }
    return n;
  }
  function li(n, t) {
    t === void 0 && (t = !0);
    !!n &&
      (window.PointerEvent || window.navigator.pointerEnabled) &&
      f(n, "touchAction", t ? "pan-y pinch-zoom" : "pan-x pinch-zoom");
  }
  var l, s, r;
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (function (n) {
      n.requestAnimationFrame =
        window.requestAnimationFrame ||
        function (n) {
          typeof n == "function" && window.setTimeout(n, 16.7);
        };
    })((l = t.SafeBrowserApis || (t.SafeBrowserApis = {}))),
    (function (n) {
      n[(n.right = 0)] = "right";
      n[(n.left = 1)] = "left";
    })((s = t.Direction || (t.Direction = {}))),
    (function (n) {
      n[(n.animationend = 0)] = "animationend";
      n[(n.blur = 1)] = "blur";
      n[(n.change = 2)] = "change";
      n[(n.click = 3)] = "click";
      n[(n.DOMContentLoaded = 4)] = "DOMContentLoaded";
      n[(n.DOMNodeInserted = 5)] = "DOMNodeInserted";
      n[(n.DOMNodeRemoved = 6)] = "DOMNodeRemoved";
      n[(n.ended = 7)] = "ended";
      n[(n.error = 8)] = "error";
      n[(n.focus = 9)] = "focus";
      n[(n.focusin = 10)] = "focusin";
      n[(n.focusout = 11)] = "focusout";
      n[(n.input = 12)] = "input";
      n[(n.load = 13)] = "load";
      n[(n.keydown = 14)] = "keydown";
      n[(n.keypress = 15)] = "keypress";
      n[(n.keyup = 16)] = "keyup";
      n[(n.loadedmetadata = 17)] = "loadedmetadata";
      n[(n.mousedown = 18)] = "mousedown";
      n[(n.mousemove = 19)] = "mousemove";
      n[(n.mouseout = 20)] = "mouseout";
      n[(n.mouseover = 21)] = "mouseover";
      n[(n.mouseup = 22)] = "mouseup";
      n[(n.onreadystatechange = 23)] = "onreadystatechange";
      n[(n.resize = 24)] = "resize";
      n[(n.scroll = 25)] = "scroll";
      n[(n.submit = 26)] = "submit";
      n[(n.timeupdate = 27)] = "timeupdate";
      n[(n.touchcancel = 28)] = "touchcancel";
      n[(n.touchend = 29)] = "touchend";
      n[(n.touchmove = 30)] = "touchmove";
      n[(n.touchstart = 31)] = "touchstart";
      n[(n.transitionend = 32)] = "transitionend";
      n[(n.wheel = 33)] = "wheel";
    })((r = t.eventTypes || (t.eventTypes = {})));
  t.addEvent = e;
  t.addEvents = g;
  t.removeEvents = nt;
  t.preventDefault = tt;
  t.addThrottledEvent = it;
  t.addThrottledEvents = rt;
  t.addDebouncedEvent = ut;
  t.documentReady = ft;
  t.onDeferred = et;
  t.addClass = p;
  t.removeClass = w;
  t.removeClasses = ot;
  t.addClasses = st;
  t.addAttribute = ht;
  t.hasClass = b;
  t.removeElement = ct;
  t.selectElements = lt;
  t.selectFirstElement = at;
  t.selectElementsT = h;
  t.selectFirstElementT = vt;
  t.selectElementsFromSelectors = yt;
  t.nodeListToArray = o;
  t.getDirection = pt;
  t.getClientRect = a;
  t.getClientRectWithMargin = wt;
  t.css = f;
  t.removeEvent = c;
  t.isArray = k;
  t.toArray = u;
  t.isDescendant = bt;
  t.isDescendantOrSelf = kt;
  t.getText = dt;
  t.setText = gt;
  t.removeInnerHtml = ni;
  t.getEventTargetOrSrcElement = ti;
  t.getEvent = v;
  t.customEvent = ii;
  t.stopPropagation = ri;
  t.getScrollY = ui;
  t.getOffsetParent = fi;
  t.scrollElementIntoView = ei;
  t.isImageLoadedSuccessfully = oi;
  t.isImageLoadFailed = si;
  t.getCoordinates = hi;
  t.getParent = ci;
  t.preventDefaultSwipeAction = li;
});
define("stringExtensions", ["require", "exports"], function (n, t) {
  "use strict";
  function r(n) {
    return !n || typeof n != "string" || !i(n);
  }
  function i(n) {
    return !n || typeof n != "string"
      ? n
      : n.trim
      ? n.trim()
      : n.replace(/^\s+|\s+$/g, "");
  }
  function u(n, t, i) {
    return (i === void 0 && (i = !0), !n || !t)
      ? !1
      : (i && ((n = n.toLocaleLowerCase()), (t = t.toLocaleLowerCase())),
        n.startsWith)
      ? n.startsWith(t)
      : n.indexOf(t) === 0;
  }
  function f(n, t, i) {
    return (i === void 0 && (i = !0), !n || !t)
      ? !1
      : (i && ((n = n.toLocaleLowerCase()), (t = t.toLocaleLowerCase())),
        n.endsWith)
      ? n.endsWith(t)
      : n.lastIndexOf(t) === n.length - t.length;
  }
  function e(n, t, i) {
    if ((i === void 0 && (i = !0), !n || !t)) return 0;
    var r = 0;
    for (
      i && ((n = n.toLocaleLowerCase()), (t = t.toLocaleLowerCase()));
      n.charCodeAt(r) === t.charCodeAt(r);

    )
      r++;
    return r;
  }
  function o(n) {
    for (var i = [], t = 1; t < arguments.length; t++) i[t - 1] = arguments[t];
    return n.replace(/{(\d+)}/g, function (n, t) {
      if (t >= i.length) return n;
      var r = i[t];
      return typeof r != "number" && !r
        ? ""
        : typeof r == "string"
        ? r
        : r.toString();
    });
  }
  Object.defineProperty(t, "__esModule", { value: !0 });
  t.isNullOrWhiteSpace = r;
  t.trim = i;
  t.startsWith = u;
  t.endsWith = f;
  t.getMatchLength = e;
  t.format = o;
});
define("utility", ["require", "exports", "stringExtensions"], function (
  n,
  t,
  i
) {
  "use strict";
  function r(n) {
    return !isNaN(n) && typeof n == "number";
  }
  function f() {
    return window.innerWidth && document.documentElement.clientWidth
      ? Math.min(window.innerWidth, document.documentElement.clientWidth)
      : window.innerWidth || document.documentElement.clientWidth;
  }
  function h() {
    return window.innerHeight && document.documentElement.clientHeight
      ? Math.min(window.innerHeight, document.documentElement.clientHeight)
      : window.innerHeight || document.documentElement.clientHeight;
  }
  function c(n) {
    if (n != null) return { width: n.clientWidth, height: n.clientHeight };
  }
  function l(n) {
    var t;
    if (((n = n || window.event), !n) || ((t = n.key || n.keyIdentifier), !t))
      return t;
    switch (t) {
      case "Left":
        return "ArrowLeft";
      case "Right":
        return "ArrowRight";
      case "Up":
        return "ArrowUp";
      case "Down":
        return "ArrowDown";
      case "Esc":
        return "Escape";
      default:
        return t;
    }
  }
  function a(n) {
    return (
      (n = n || window.event),
      n == null ? null : n.which || n.keyCode || n.charCode
    );
  }
  function v(n, t, i, r, u) {
    var o = "",
      f,
      e;
    r &&
      ((f = new Date()),
      f.setTime(f.getTime() + r * 864e5),
      (o = "; expires=" + f.toUTCString()));
    e = "";
    u && (e = ";domain=" + u);
    window.document.cookie =
      n + "=" + encodeURIComponent(t) + o + ("; path=" + i + ";") + e;
  }
  function y(n) {
    var t, i;
    if (!!n)
      for (t = 0, i = document.cookie.split("; "); t < i.length; t++) {
        var r = i[t],
          f = r.indexOf("="),
          u = e(r.substring(0, f));
        if (u === n) return e(r.substring(u.length + 1));
      }
    return null;
  }
  function e(n) {
    return (
      (n = decodeURIComponent(n.replace("/+/g", " "))),
      n.indexOf('"') === 0 &&
        (n = n.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")),
      n
    );
  }
  function p(n) {
    var u;
    if (!!n && n.length === 6) {
      var t = parseInt(n.substring(0, 2), 16),
        i = parseInt(n.substring(2, 4), 16),
        r = parseInt(n.substring(4, 6), 16);
      if (!isNaN(t) && !isNaN(i) && !isNaN(r))
        return (u = (t * 299 + i * 587 + r * 114) / 255e3), u >= 0.5 ? 2 : 1;
    }
    return null;
  }
  function w(n, t, i) {
    return !i ||
      !r(n) ||
      !r(t) ||
      !r(i.left) ||
      !r(i.right) ||
      !r(i.top) ||
      !r(i.bottom)
      ? !1
      : n >= i.left && n <= i.right && t >= i.top && t <= i.bottom;
  }
  function b(n) {
    console && console.warn
      ? console.warn(n)
      : console && console.error && console.error(n);
  }
  function k(n, t) {
    if (
      (t ||
        !(o("item").toLowerCase().indexOf("perf_marker_global:true") < 0)) &&
      !i.isNullOrWhiteSpace(n) &&
      window.performance &&
      window.performance.mark
    ) {
      var r = n.split(" ").join("_");
      window.performance.mark(r);
      window.console && window.console.timeStamp && window.console.timeStamp(r);
    }
  }
  function d(n) {
    if (
      i.isNullOrWhiteSpace(n) ||
      !window.performance ||
      !window.performance.mark
    )
      return 0;
    var r = n.split(" ").join("_"),
      t = window.performance.getEntriesByName(r);
    return t && t.length ? Math.round(t[t.length - 1].startTime) : 0;
  }
  function g(n, t) {
    var f;
    if (!r(n)) return "00:00";
    f = n < 0;
    f && (n *= -1);
    var u = Math.floor(n / 3600),
      e = n % 3600,
      o = Math.floor(e / 60),
      i = "";
    return (
      (i = t ? (u > 0 ? u + ":" : "00:") : u > 0 ? u + ":" : ""),
      (n = Math.floor(e % 60)),
      (i += (o < 10 ? "0" : "") + o),
      (i += ":" + (n === 0 ? "00" : (n < 10 ? "0" : "") + n)),
      f ? "-" + i : i
    );
  }
  function nt(n) {
    if (!JSON || !JSON.parse) throw new Error("JSON.parse unsupported.");
    if (!n) throw new Error("Invalid json.");
    return JSON.parse(n);
  }
  function u() {
    for (var e, t, o, n, f, i, r = [], c = 0; c < arguments.length; c++)
      r[c] = arguments[c];
    if (!r || !r.length) return null;
    if (((e = typeof r[0] == "boolean" && r[0]), r.length < 2))
      return e ? null : r[0];
    if (e && r.length < 3) return r[1];
    for (t = e ? r[1] : r[0], o = e ? 2 : 1; o < r.length; o++)
      for (n in r[o])
        if (r[o].hasOwnProperty(n)) {
          if (((f = r[o][n]), e)) {
            var s = Array.isArray
                ? Array.isArray(f)
                : {}.toString.call(f) === "[object Array]",
              h =
                !!t[n] &&
                (Array.isArray
                  ? Array.isArray(t[n])
                  : {}.toString.call(t[n]) === "[object Array]"),
              l = !s && typeof f == "object",
              a = !h && !!t[n] && typeof t[n] == "object";
            if (s && h) {
              for (i = 0; i < f.length; i++)
                (s = Array.isArray
                  ? Array.isArray(f[i])
                  : {}.toString.call(f[i]) === "[object Array]"),
                  (h =
                    !!t[n][i] &&
                    (Array.isArray
                      ? Array.isArray(t[n][i])
                      : {}.toString.call(t[n][i]) === "[object Array]")),
                  (l = !s && typeof f[i] == "object"),
                  (a = !h && !!t[n][i] && typeof t[n][i] == "object"),
                  (t[n][i] = s
                    ? u(!0, h ? t[n][i] : [], f[i])
                    : l
                    ? u(!0, a ? t[n][i] : {}, f[i])
                    : f[i]);
              continue;
            } else if (s) {
              t[n] = u(!0, [], f);
              continue;
            } else if (l) {
              t[n] = u(!0, a ? t[n] : {}, f);
              continue;
            }
          }
          t[n] = f;
        }
    return t;
  }
  function tt(n, t, i, r, u) {
    var f = !i || i < 0 ? -1 : Number(new Date()) + i;
    (t = t || 100),
      (function e() {
        var i = n();
        if (i && r) r();
        else {
          if (i) return;
          if (f === -1 || Number(new Date()) < f) setTimeout(e, t);
          else if (u) u();
          else return;
        }
      })();
  }
  function o(n, t) {
    return t === void 0 && (t = !0), s(location.search, n, t);
  }
  function it(n, t, i) {
    return i === void 0 && (i = !0), s(n, t, i);
  }
  function s(n, t, i) {
    if ((i === void 0 && (i = !0), !t || !n)) return "";
    var r = "[\\?&]" + t.replace(/[\[\]]/g, "\\$&") + "=([^&#]*)",
      f = i ? new RegExp(r, "i") : new RegExp(r),
      u = f.exec(n);
    return u === null ? "" : decodeURIComponent(u[1].replace(/\+/g, " "));
  }
  function rt(n, t) {
    var i, r;
    if (!t) return n;
    if (n.indexOf("//") === -1)
      throw 'To avoid unexpected results in URL parsing, url must begin with "http://", "https://", or "//"';
    return (
      (i = document.createElement("a")),
      (i.href = n),
      (i.search = (i.search ? i.search + "&" : "?") + t),
      (r = i.href),
      (i = null),
      r
    );
  }
  function ut(n, t) {
    try {
      if (!window.sessionStorage || !n || !t) return;
      sessionStorage.setItem(n, t);
    } catch (i) {}
  }
  function ft(n) {
    try {
      return !window.sessionStorage || !n ? null : sessionStorage.getItem(n);
    } catch (t) {
      return null;
    }
  }
  function et(n, t) {
    try {
      if (!window.localStorage || !n || !t) return;
      localStorage.setItem(n, t);
    } catch (i) {}
  }
  function ot(n) {
    try {
      return !window.localStorage || !n ? null : localStorage.getItem(n);
    } catch (t) {
      return null;
    }
  }
  function st() {
    return (
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  }
  Object.defineProperty(t, "__esModule", { value: !0 });
  t.isNumber = r;
  t.getWindowWidth = f;
  t.getWindowHeight = h;
  t.getDimensions = c;
  t.getVirtualKey = l;
  t.getKeyCode = a;
  t.setCookie = v;
  t.getCookie = y;
  t.detectContrast = p;
  t.pointInRect = w;
  t.apiDeprecated = b;
  t.createPerfMarker = k;
  t.getPerfMarkerValue = d;
  t.toElapsedTimeString = g;
  t.parseJson = nt;
  t.extend = u;
  t.poll = tt;
  t.getQSPValue = o;
  t.getQSPFromUrl = it;
  t.addQSP = rt;
  t.saveToSessionStorage = ut;
  t.getValueFromSessionStorage = ft;
  t.saveToLocalStorage = et;
  t.getValueFromLocalStorage = ot;
  t.getScrollTop = st;
  var ht;
  (function (n) {
    function t() {
      var t;
      if (window.matchMedia) {
        for (t = 0; t < n.allWidths.length; ++t)
          if (
            !window.matchMedia("(min-width:" + n.allWidths[t] + "px)").matches
          )
            return t;
      } else
        for (t = 0; t < n.allWidths.length; ++t)
          if (!(f() >= n.allWidths[t])) return t;
      return n.allWidths.length;
    }
    n.allWidths = [320, 540, 768, 1084, 1400, 1779];
    n.vpMin = n.allWidths[0];
    n.vpMax = 2048;
    n.getViewport = t;
  })((ht = t.Viewports || (t.Viewports = {})));
});
define("publisher", [
  "require",
  "exports",
  "tslib",
  "observableComponent",
], function (n, t, i, r) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var u = (function (n) {
    function t(t, i) {
      i === void 0 && (i = null);
      var r = n.call(this, t, i) || this;
      return (r.element = t), r;
    }
    return (
      i.__extends(t, n),
      (t.prototype.subscribe = function (n) {
        if (!n) return !1;
        if (this.subscribers) {
          if (this.subscribers.indexOf(n) !== -1) return !1;
        } else this.subscribers = [];
        return this.subscribers.push(n), !0;
      }),
      (t.prototype.unsubscribe = function (n) {
        if (!n || !this.subscribers || !this.subscribers.length) return !1;
        var t = this.subscribers.indexOf(n);
        return t === -1 ? !1 : (this.subscribers.splice(t, 1), !0);
      }),
      (t.prototype.hasSubscribers = function () {
        return !!this.subscribers && this.subscribers.length > 0;
      }),
      (t.prototype.initiatePublish = function (n) {
        var t, i, r;
        if (this.hasSubscribers())
          for (t = 0, i = this.subscribers; t < i.length; t++)
            (r = i[t]), this.publish(r, n);
      }),
      (t.prototype.update = function () {}),
      (t.prototype.teardown = function () {}),
      t
    );
  })(r.ObservableComponent);
  t.Publisher = u;
});
define("observableComponent", [
  "require",
  "exports",
  "htmlExtensions",
], function (n, t, i) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var r = (function () {
    function n(t, i) {
      i === void 0 && (i = null);
      this.element = t;
      this.ignoreNextDOMChange = !1;
      this.observing = !1;
      n.shouldInitializeAsClass(t, i) && this.setObserver();
    }
    return (
      (n.prototype.detach = function () {
        this.unObserve();
        this.teardown();
      }),
      (n.prototype.isObserving = function () {
        return this.observing;
      }),
      (n.prototype.unObserve = function () {
        this.observing = !1;
        this.modernObserver && this.modernObserver.disconnect();
        i.removeEvent(
          this.element,
          i.eventTypes.DOMNodeInserted,
          this.obsoleteNodeInsertedEventHander
        );
        i.removeEvent(
          this.element,
          i.eventTypes.DOMNodeRemoved,
          this.obsoleteNodeRemovedEventHandler
        );
      }),
      (n.prototype.setObserver = function () {
        this.observing = !0;
        typeof n.mutationObserver != "undefined"
          ? this.observeModern()
          : "MutationEvent" in window && this.observeObsolete();
      }),
      (n.prototype.observeModern = function () {
        var t = this,
          i = function (n) {
            t.onModernMutations(n);
          };
        this.modernObserver = new n.mutationObserver(i);
        this.modernObserver.observe(this.element, {
          childList: !0,
          subtree: !0,
        });
      }),
      (n.prototype.onModernMutations = function (n) {
        var r, u, f, e, i, o, t, s;
        if (this.ignoreNextDOMChange) {
          this.ignoreNextDOMChange = !1;
          return;
        }
        for (r = !1, u = !1, f = 0, e = n; f < e.length; f++) {
          for (i = e[f], t = 0, o = i.addedNodes.length; t < o; t++)
            i.addedNodes[t].nodeType === Node.ELEMENT_NODE &&
              ((r = !0), (u = !0));
          for (t = 0, s = i.removedNodes.length; t < s; t++)
            i.removedNodes[t].nodeType === Node.ELEMENT_NODE &&
              ((r = !0), i.removedNodes[t] !== this.element && (u = !0));
        }
        r && this.teardown();
        u && this.update();
      }),
      (n.prototype.observeObsolete = function () {
        var n = this;
        this.obsoleteNodeInsertedEventHander = i.addDebouncedEvent(
          this.element,
          i.eventTypes.DOMNodeInserted,
          function () {
            n.onObsoleteNodeInserted();
          }
        );
        this.obsoleteNodeRemovedEventHandler = i.addDebouncedEvent(
          this.element,
          i.eventTypes.DOMNodeRemoved,
          function (t) {
            n.onObsoleteNodeRemoved(t);
          }
        );
      }),
      (n.prototype.onObsoleteNodeInserted = function () {
        this.ignoreNextDOMChange || (this.teardown(), this.update());
      }),
      (n.prototype.onObsoleteNodeRemoved = function (n) {
        this.ignoreNextDOMChange ||
          (this.teardown(),
          i.getEventTargetOrSrcElement(n) !== this.element && this.update());
      }),
      (n.shouldInitializeAsClass = function (t, i) {
        var r = t ? t.getAttribute(n.mwfClassAttribute) : null,
          u = t ? t.getAttribute(n.initializeAttribute) : null;
        return u === "false" ? !1 : !!t && (!r || (!!i && r === i.mwfClass));
      }),
      (n.mwfClassAttribute = "data-mwf-class"),
      (n.initializeAttribute = "data-js-initialize"),
      (n.mutationObserver =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver),
      n
    );
  })();
  t.ObservableComponent = r;
});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __exportStar,
  __values,
  __read,
  __spread,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault;
(function (n) {
  function t(n, t) {
    return (
      n !== i &&
        (typeof Object.create == "function"
          ? Object.defineProperty(n, "__esModule", { value: !0 })
          : (n.__esModule = !0)),
      function (i, r) {
        return (n[i] = t ? t(i, r) : r);
      }
    );
  }
  var i =
    typeof global == "object"
      ? global
      : typeof self == "object"
      ? self
      : typeof this == "object"
      ? this
      : {};
  typeof define == "function" && define.amd
    ? define("tslib", ["exports"], function (r) {
        n(t(i, t(r)));
      })
    : typeof module == "object" && typeof module.exports == "object"
    ? n(t(i, t(module.exports)))
    : n(t(i));
})(function (n) {
  var t =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function (n, t) {
        n.__proto__ = t;
      }) ||
    function (n, t) {
      for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i]);
    };
  __extends = function (n, i) {
    function r() {
      this.constructor = n;
    }
    t(n, i);
    n.prototype =
      i === null ? Object.create(i) : ((r.prototype = i.prototype), new r());
  };
  __assign =
    Object.assign ||
    function (n) {
      for (var t, r, i = 1, u = arguments.length; i < u; i++) {
        t = arguments[i];
        for (r in t)
          Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    };
  __rest = function (n, t) {
    var u = {},
      r;
    for (var i in n)
      Object.prototype.hasOwnProperty.call(n, i) &&
        t.indexOf(i) < 0 &&
        (u[i] = n[i]);
    if (n != null && typeof Object.getOwnPropertySymbols == "function")
      for (r = 0, i = Object.getOwnPropertySymbols(n); r < i.length; r++)
        t.indexOf(i[r]) < 0 && (u[i[r]] = n[i[r]]);
    return u;
  };
  __decorate = function (n, t, i, r) {
    var f = arguments.length,
      u =
        f < 3
          ? t
          : r === null
          ? (r = Object.getOwnPropertyDescriptor(t, i))
          : r,
      e,
      o;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      u = Reflect.decorate(n, t, i, r);
    else
      for (o = n.length - 1; o >= 0; o--)
        (e = n[o]) && (u = (f < 3 ? e(u) : f > 3 ? e(t, i, u) : e(t, i)) || u);
    return f > 3 && u && Object.defineProperty(t, i, u), u;
  };
  __param = function (n, t) {
    return function (i, r) {
      t(i, r, n);
    };
  };
  __metadata = function (n, t) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(n, t);
  };
  __awaiter = function (n, t, i, r) {
    return new (i || (i = Promise))(function (u, f) {
      function o(n) {
        try {
          e(r.next(n));
        } catch (t) {
          f(t);
        }
      }
      function s(n) {
        try {
          e(r["throw"](n));
        } catch (t) {
          f(t);
        }
      }
      function e(n) {
        n.done
          ? u(n.value)
          : new i(function (t) {
              t(n.value);
            }).then(o, s);
      }
      e((r = r.apply(n, t || [])).next());
    });
  };
  __generator = function (n, t) {
    function o(n) {
      return function (t) {
        return s([n, t]);
      };
    }
    function s(e) {
      if (f) throw new TypeError("Generator is already executing.");
      while (r)
        try {
          if (
            ((f = 1),
            u &&
              (i = u[e[0] & 2 ? "return" : e[0] ? "throw" : "next"]) &&
              !(i = i.call(u, e[1])).done)
          )
            return i;
          ((u = 0), i) && (e = [0, i.value]);
          switch (e[0]) {
            case 0:
            case 1:
              i = e;
              break;
            case 4:
              return r.label++, { value: e[1], done: !1 };
            case 5:
              r.label++;
              u = e[1];
              e = [0];
              continue;
            case 7:
              e = r.ops.pop();
              r.trys.pop();
              continue;
            default:
              if (
                !((i = r.trys), (i = i.length > 0 && i[i.length - 1])) &&
                (e[0] === 6 || e[0] === 2)
              ) {
                r = 0;
                continue;
              }
              if (e[0] === 3 && (!i || (e[1] > i[0] && e[1] < i[3]))) {
                r.label = e[1];
                break;
              }
              if (e[0] === 6 && r.label < i[1]) {
                r.label = i[1];
                i = e;
                break;
              }
              if (i && r.label < i[2]) {
                r.label = i[2];
                r.ops.push(e);
                break;
              }
              i[2] && r.ops.pop();
              r.trys.pop();
              continue;
          }
          e = t.call(n, r);
        } catch (o) {
          e = [6, o];
          u = 0;
        } finally {
          f = i = 0;
        }
      if (e[0] & 5) throw e[1];
      return { value: e[0] ? e[1] : void 0, done: !0 };
    }
    var r = {
        label: 0,
        sent: function () {
          if (i[0] & 1) throw i[1];
          return i[1];
        },
        trys: [],
        ops: [],
      },
      f,
      u,
      i,
      e;
    return (
      (e = { next: o(0), throw: o(1), return: o(2) }),
      typeof Symbol == "function" &&
        (e[Symbol.iterator] = function () {
          return this;
        }),
      e
    );
  };
  __exportStar = function (n, t) {
    for (var i in n) t.hasOwnProperty(i) || (t[i] = n[i]);
  };
  __values = function (n) {
    var t = typeof Symbol == "function" && n[Symbol.iterator],
      i = 0;
    return t
      ? t.call(n)
      : {
          next: function () {
            return (
              n && i >= n.length && (n = void 0),
              { value: n && n[i++], done: !n }
            );
          },
        };
  };
  __read = function (n, t) {
    var i = typeof Symbol == "function" && n[Symbol.iterator],
      r,
      u,
      f,
      e;
    if (!i) return n;
    r = i.call(n);
    f = [];
    try {
      while ((t === void 0 || t-- > 0) && !(u = r.next()).done) f.push(u.value);
    } catch (o) {
      e = { error: o };
    } finally {
      try {
        u && !u.done && (i = r["return"]) && i.call(r);
      } finally {
        if (e) throw e.error;
      }
    }
    return f;
  };
  __spread = function () {
    for (var n = [], t = 0; t < arguments.length; t++)
      n = n.concat(__read(arguments[t]));
    return n;
  };
  __await = function (n) {
    return this instanceof __await ? ((this.v = n), this) : new __await(n);
  };
  __asyncGenerator = function (n, t, i) {
    function e(n) {
      o[n] &&
        (u[n] = function (t) {
          return new Promise(function (i, u) {
            r.push([n, t, i, u]) > 1 || f(n, t);
          });
        });
    }
    function f(n, t) {
      try {
        h(o[n](t));
      } catch (i) {
        s(r[0][3], i);
      }
    }
    function h(n) {
      n.value instanceof __await
        ? Promise.resolve(n.value.v).then(c, l)
        : s(r[0][2], n);
    }
    function c(n) {
      f("next", n);
    }
    function l(n) {
      f("throw", n);
    }
    function s(n, t) {
      (n(t), r.shift(), r.length) && f(r[0][0], r[0][1]);
    }
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var o = i.apply(n, t || []),
      u,
      r = [];
    return (
      (u = {}),
      e("next"),
      e("throw"),
      e("return"),
      (u[Symbol.asyncIterator] = function () {
        return this;
      }),
      u
    );
  };
  __asyncDelegator = function (n) {
    function i(i, u) {
      n[i] &&
        (t[i] = function (t) {
          return (r = !r)
            ? { value: __await(n[i](t)), done: i === "return" }
            : u
            ? u(t)
            : t;
        });
    }
    var t, r;
    return (
      (t = {}),
      i("next"),
      i("throw", function (n) {
        throw n;
      }),
      i("return"),
      (t[Symbol.iterator] = function () {
        return this;
      }),
      t
    );
  };
  __asyncValues = function (n) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var t = n[Symbol.asyncIterator];
    return t
      ? t.call(n)
      : typeof __values == "function"
      ? __values(n)
      : n[Symbol.iterator]();
  };
  __makeTemplateObject = function (n, t) {
    return (
      Object.defineProperty
        ? Object.defineProperty(n, "raw", { value: t })
        : (n.raw = t),
      n
    );
  };
  __importStar = function (n) {
    var t, i;
    if (n && n.__esModule) return n;
    if (((t = {}), n != null))
      for (i in n) Object.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    return (t["default"] = n), t;
  };
  __importDefault = function (n) {
    return n && n.__esModule ? n : { default: n };
  };
  n("__extends", __extends);
  n("__assign", __assign);
  n("__rest", __rest);
  n("__decorate", __decorate);
  n("__param", __param);
  n("__metadata", __metadata);
  n("__awaiter", __awaiter);
  n("__generator", __generator);
  n("__exportStar", __exportStar);
  n("__values", __values);
  n("__read", __read);
  n("__spread", __spread);
  n("__await", __await);
  n("__asyncGenerator", __asyncGenerator);
  n("__asyncDelegator", __asyncDelegator);
  n("__asyncValues", __asyncValues);
  n("__makeTemplateObject", __makeTemplateObject);
  n("__importStar", __importStar);
  n("__importDefault", __importDefault);
});
define("alert", [
  "require",
  "exports",
  "tslib",
  "publisher",
  "htmlExtensions",
], function (n, t, i, r, u) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var f = (function (n) {
    function t(t) {
      var i = n.call(this, t) || this;
      return (
        (i.closeAlertAndRemoveEvent = function () {
          u.removeEvent(
            i.closeButton,
            u.eventTypes.click,
            i.closeAlertAndRemoveEvent
          );
          u.removeElement(i.element);
          i.initiatePublish();
        }),
        i.update(),
        i
      );
    }
    return (
      i.__extends(t, n),
      (t.prototype.update = function () {
        this.element &&
          ((this.closeButton = u.selectFirstElement(
            "button.c-action-trigger.glyph-cancel",
            this.element
          )),
          !this.closeButton ||
            u.addEvent(
              this.closeButton,
              u.eventTypes.click,
              this.closeAlertAndRemoveEvent,
              !1
            ));
      }),
      (t.prototype.teardown = function () {
        u.removeEvent(
          this.closeButton,
          u.eventTypes.click,
          this.closeAlertAndRemoveEvent,
          !1
        );
      }),
      (t.prototype.publish = function (n) {
        n.onAlertClosed();
      }),
      (t.selector = ".m-alert"),
      (t.typeName = "Alert"),
      t
    );
  })(r.Publisher);
  t.Alert = f;
});
require(["alert", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.Alert }]);
});
define("autosuggest", [
  "require",
  "exports",
  "tslib",
  "publisher",
  "htmlExtensions",
  "stringExtensions",
  "utility",
], function (n, t, i, r, u, f, e) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var o = (function (n) {
    function t(i, r) {
      var o, s;
      return (
        r === void 0 && (r = null),
        (o = n.call(this, i, e.isNumber(r) ? {} : r) || this),
        (o.hideNoResults = !1),
        (o.suggestionClickListeners = []),
        (o.publishInProgress = []),
        (o.updateSuggestions = function (n) {
          o.publishInProgress.length > 0 && o.publishInProgress.pop();
          var t = o.reconstructMenu(n);
          o.show();
          t && o.setFocusToInput();
        }),
        (o.handleInputKeyup = function (n) {
          o.input && o.input.value
            ? ((o.cachedInputValue = o.input.value), o.show())
            : o.hide();
          switch (e.getKeyCode(n)) {
            case 9:
              break;
            case 27:
              break;
            case 38:
              break;
            case 40:
              break;
            default:
              o.initiatePublish({
                notification: "onMatchPatternChanged",
                properties: { pattern: o.input.value },
              });
              o.publishInProgress.push(!0);
          }
        }),
        (o.handleInputKeydown = function (n) {
          switch (e.getKeyCode(n)) {
            case 9:
            case 27:
              o.hide();
              break;
            case 38:
              u.preventDefault(n);
              o.handleInputArrowKey(!0);
              break;
            case 40:
              u.preventDefault(n);
              o.handleInputArrowKey(!1);
          }
        }),
        (o.handleMenuKeydown = function (n) {
          switch (e.getKeyCode(n)) {
            case 13:
              o.selectSuggestion(o.selectedSuggestion, !0);
              break;
            case 27:
              o.hide();
              break;
            case 38:
              u.preventDefault(n);
              o.handleMenuArrowKey(!0);
              break;
            case 40:
              u.preventDefault(n);
              o.handleMenuArrowKey(!1);
          }
        }),
        (o.handleClickWhenMenuOpen = function (n) {
          o.closeMenuFromClick(u.getEventTargetOrSrcElement(n));
        }),
        (o.handleInputClick = function () {
          o.show();
        }),
        (o.selectSuggestionFromClick = function (n) {
          o.selectSuggestion(n, !0);
        }),
        (o.buildStringSuggestionHtml = function (n, t) {
          var i = document.createElement("li");
          i.setAttribute("class", "c-menu-item");
          i.setAttribute("role", "presentation");
          i.setAttribute("title", n);
          i.innerHTML =
            '<span role="option" aria-label="' +
            n +
            '" tabindex="0">' +
            o.highlight(n) +
            "</span>";
          u.addAttribute(i, t);
          o.ignoreNextDOMChange = !0;
          o.menu.appendChild(i);
        }),
        (o.buildProductSuggestionHtml = function (n, t) {
          var e = !n.category ? "" : " - " + n.category,
            r = document.createElement("li"),
            i,
            s,
            h,
            c,
            l;
          r.setAttribute("class", "c-menu-item");
          r.setAttribute("role", "presentation");
          r.setAttribute("title", n.title + e);
          o.searchable(r, !1);
          i = document.createElement("a");
          i.setAttribute("role", "option");
          i.setAttribute("aria-label", n.title + e + " - Link");
          i.setAttribute("class", "f-product");
          i.setAttribute("href", n.targetUrl);
          u.addAttribute(i, t);
          s = "";
          n.imageSrc &&
            ((h = ""),
            (c = 'class="c-image' + (n.isImageRound ? " f-round" : "") + '"'),
            f.isNullOrWhiteSpace(n.backgroundColor) ||
              n.backgroundColor.toLowerCase() === "transparent" ||
              (h = 'style="background:' + n.backgroundColor + '"'),
            (s =
              "<img " +
              c +
              ' src="' +
              n.imageSrc +
              '" ' +
              h +
              ' role="none" alt="' +
              (n.title + e) +
              '"/>'));
          l = n.category
            ? '<span class="c-meta-text">' + n.category + "</span>"
            : "";
          i.innerHTML =
            s + "<div><span>" + o.highlight(n.title) + "</span>" + l + "</div>";
          r.appendChild(i);
          o.ignoreNextDOMChange = !0;
          o.menu.appendChild(r);
        }),
        (o.setFocusToInput = function () {
          o.input && o.input.focus();
        }),
        e.isNumber(r)
          ? (s = r)
          : r &&
            (e.isNumber(r.scrollLimit) && (s = r.scrollLimit),
            r.hideNoResults && (o.hideNoResults = r.hideNoResults)),
        (o.itemScrollCount = Math.max(
          t.minimumItemScrollCount,
          s || t.defaultItemScrollCount
        )),
        o.update(),
        o
      );
    }
    return (
      i.__extends(t, n),
      (t.prototype.update = function () {
        this.element &&
          ((this.input = u.selectFirstElement(
            "[aria-controls=" + this.element.id + "]"
          )),
          this.input) &&
          (this.element.getAttribute("role") === "combobox" &&
            (this.input.setAttribute("role", "combobox"),
            this.element.setAttribute("role", "")),
          (this.menu = u.selectFirstElement(".c-menu", this.element)),
          this.menu) &&
          (this.hideNoResults ||
            ((this.noResults = u.selectFirstElement(
              ".f-auto-suggest-no-results",
              this.element
            )),
            this.noResults &&
              (this.noResultsItem = u.selectFirstElement(
                ".c-menu-item span",
                this.noResults
              )),
            this.noResultsItem &&
              (this.noResultsString = this.noResultsItem.textContent)),
          (this.form = this.element.parentElement),
          this.form) &&
          (u.addEvent(
            this.input,
            u.eventTypes.keyup,
            this.handleInputKeyup,
            !0
          ),
          u.addEvent(
            this.input,
            u.eventTypes.keydown,
            this.handleInputKeydown,
            !0
          ),
          u.addEvent(this.input, u.eventTypes.click, this.handleInputClick, !0),
          this.reconstructMenu(null, !0));
      }),
      (t.prototype.teardown = function () {
        u.removeEvent(
          this.input,
          u.eventTypes.keyup,
          this.handleInputKeyup,
          !0
        );
        u.removeEvent(
          this.input,
          u.eventTypes.keydown,
          this.handleInputKeydown,
          !0
        );
        u.removeEvent(
          this.input,
          u.eventTypes.click,
          this.handleInputClick,
          !0
        );
        u.removeEvent(
          document.body,
          u.eventTypes.click,
          this.handleClickWhenMenuOpen
        );
        for (var n = 0; n < this.suggestions.length; ++n)
          u.removeEvent(
            this.suggestions[n],
            u.eventTypes.keydown,
            this.handleMenuKeydown
          ),
            u.removeEvent(
              this.suggestions[n],
              u.eventTypes.click,
              this.suggestionClickListeners[n++]
            );
        this.form = null;
        this.input = null;
        this.menu = null;
        this.noResults = null;
        this.suggestions = null;
        this.selectedSuggestion = null;
      }),
      (t.prototype.searchable = function (n, t) {
        var i = "data-is-searchable";
        if (t === undefined) return n.getAttribute(i) !== "false";
        n.setAttribute(i, t.toString());
      }),
      (t.prototype.publish = function (n, t) {
        if (
          n.onMatchPatternChanged &&
          t.notification === "onMatchPatternChanged"
        )
          n.onMatchPatternChanged(t.properties);
        else if (
          n.onSuggestionSelected &&
          t.notification === "onSuggestionSelected"
        )
          n.onSuggestionSelected(t.properties);
      }),
      (t.prototype.handleInputArrowKey = function (n) {
        var t = this.suggestions,
          r = this.suggestions ? this.suggestions.length : 0,
          i;
        r > 0 &&
          (!this.selectedSuggestion && n
            ? this.selectSuggestion(t[r - 1])
            : this.selectedSuggestion
            ? ((i = t.indexOf(this.selectedSuggestion)),
              n && i === 0
                ? this.selectSuggestion(t[r - 1])
                : n
                ? this.selectSuggestion(t[i - 1])
                : i === r - 1
                ? this.selectSuggestion(t[0])
                : this.selectSuggestion(t[i + 1]))
            : this.selectSuggestion(t[0]));
      }),
      (t.prototype.handleMenuArrowKey = function (n) {
        var i = this.suggestions,
          r = this.suggestions ? this.suggestions.length : 0,
          t;
        r > 0 &&
          ((t = i.indexOf(this.selectedSuggestion)),
          (n && t === 0) || (!n && t === r - 1)
            ? ((this.input.value = this.cachedInputValue),
              this.setFocusToInput(),
              this.selectedSuggestion.setAttribute("data-selected", "false"),
              (this.selectedSuggestion = null))
            : n
            ? this.selectSuggestion(i[t - 1])
            : this.selectSuggestion(i[t + 1]));
      }),
      (t.prototype.selectSuggestion = function (n, t) {
        var i, r, f;
        (t === void 0 && (t = !1), n) &&
          (this.selectedSuggestion &&
            this.selectedSuggestion.setAttribute("data-selected", "false"),
          (this.selectedSuggestion = n),
          this.selectedSuggestion.setAttribute("data-selected", "true"),
          u
            .selectFirstElement("li > a, li > span", this.selectedSuggestion)
            .focus(),
          (i = "product"),
          this.searchable(this.selectedSuggestion)
            ? ((r = u.getText(this.selectedSuggestion)),
              (this.input.value = r),
              (i = "term"))
            : this.publishInProgress.length === 0 && (this.input.value = ""),
          t &&
            (this.hide(),
            (f = this.suggestions.indexOf(this.selectedSuggestion)),
            this.initiatePublish({
              notification: "onSuggestionSelected",
              properties: {
                srchq: this.cachedInputValue,
                suggestion: this.selectedSuggestion,
                suggestionType: i,
                aslinkpos: f,
                qrylngth: this.cachedInputValue.length,
                resultselected: this.selectedSuggestion.innerText,
              },
            }),
            this.searchable(this.selectedSuggestion) &&
              typeof this.form.submit == "function" &&
              this.form.submit()));
      }),
      (t.prototype.hide = function () {
        this.menu.setAttribute(t.ariaHidden, "true");
        this.noResults &&
          this.noResultsItem &&
          (this.noResults.setAttribute(t.ariaHidden, "true"),
          this.noResultsItem.removeAttribute("aria-label"),
          (this.noResultsItem.textContent = ""));
        this.form.setAttribute(t.ariaExpanded, "false");
        this.input.setAttribute(t.ariaExpanded, "false");
        u.setText(this.ariaLiveRegion, "");
        u.removeEvent(
          document.body,
          u.eventTypes.click,
          this.handleClickWhenMenuOpen
        );
      }),
      (t.prototype.show = function () {
        if (f.isNullOrWhiteSpace(this.input.value)) {
          this.hide();
          return;
        }
        if (
          (this.form.setAttribute(t.ariaExpanded, "true"),
          this.input.setAttribute(t.ariaExpanded, "true"),
          this.suggestions && this.suggestions.length)
        )
          u.setText(this.ariaLiveRegion, this.menuOpenLocString);
        else {
          !this.hideNoResults &&
            this.noResults &&
            this.noResultsItem &&
            (this.noResults.setAttribute(t.ariaHidden, "false"),
            this.noResultsItem.setAttribute("aria-label", this.noResultsString),
            (this.noResultsItem.textContent = this.noResultsString));
          this.menu.setAttribute(t.ariaHidden, "true");
          return;
        }
        !this.hideNoResults &&
          this.noResults &&
          this.noResults.setAttribute(t.ariaHidden, "true");
        this.menu.setAttribute(t.ariaHidden, "false");
        this.addMenuStateAnnouncement();
        u.hasClass(this.menu, "f-auto-suggest-scroll") &&
          u.css(
            this.menu,
            "maxHeight",
            this.suggestions[0].offsetHeight * this.itemScrollCount + "px"
          );
        u.addEvent(
          document.body,
          u.eventTypes.click,
          this.handleClickWhenMenuOpen
        );
      }),
      (t.prototype.closeMenuFromClick = function (n) {
        this.form.contains(n) || this.hide();
      }),
      (t.prototype.reconstructMenu = function (n, t) {
        var s = this,
          f,
          o,
          i,
          h,
          r,
          e;
        if (
          (t === void 0 && (t = !1),
          (this.suggestions = null),
          (this.suggestionClickListeners = []),
          !t)
        )
          for (
            this.ignoreNextDOMChange = !0,
              u.removeInnerHtml(this.menu),
              f = 0,
              o = n;
            f < o.length;
            f++
          ) {
            i = o[f];
            switch (i.type) {
              case "string":
                this.buildStringSuggestionHtml(i.value, i.attributes);
                break;
              case "product":
                this.buildProductSuggestionHtml(i.value, i.attributes);
            }
          }
        for (
          this.suggestions = u.nodeListToArray(this.menu.children),
            h = function (n) {
              u.addEvent(
                r.suggestions[n],
                u.eventTypes.keydown,
                r.handleMenuKeydown
              );
              u.addEvent(
                r.suggestions[n],
                u.eventTypes.click,
                (r.suggestionClickListeners[n] = function () {
                  s.selectSuggestionFromClick(s.suggestions[n]);
                })
              );
            },
            r = this,
            e = 0;
          e < this.suggestions.length;
          ++e
        )
          h(e);
        return !!this.selectedSuggestion;
      }),
      (t.prototype.addMenuStateAnnouncement = function () {
        this.ariaLiveRegion ||
          ((this.ariaLiveRegion = document.createElement("div")),
          u.addClass(this.ariaLiveRegion, "x-screen-reader"),
          this.ariaLiveRegion.setAttribute("aria-live", "assertive"),
          this.input.parentNode.insertBefore(
            this.ariaLiveRegion,
            this.input.previousSibling
          ),
          (this.ignoreNextDOMChange = !0),
          (this.menuOpenLocString =
            this.element.getAttribute("data-f-loc-menu-open") ||
            t.menuOpenFallbackString));
      }),
      (t.prototype.highlight = function (n) {
        var t = new RegExp(this.input.value, "ig");
        return n.replace(t, function (n) {
          return "<b>" + n + "</b>";
        });
      }),
      (t.selector = ".m-auto-suggest"),
      (t.typeName = "AutoSuggest"),
      (t.menuOpenFallbackString =
        "results are available, use up and down arrow keys to navigate."),
      (t.defaultItemScrollCount = 5),
      (t.minimumItemScrollCount = 2),
      (t.ariaHidden = "aria-hidden"),
      (t.ariaExpanded = "aria-expanded"),
      (t.telemetryCtNonProduct = "0"),
      (t.telemetryCtProduct = "4"),
      t
    );
  })(r.Publisher);
  t.AutoSuggest = o;
});
require(["autosuggest", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.AutoSuggest }]);
});
require(["contentPlacementItem", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.ContentPlacementItem }]);
});
require(["ambientVideo", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.AmbientVideo }]);
});
define("hero-item-base", [
  "require",
  "exports",
  "tslib",
  "observableComponent",
  "publisher",
  "htmlExtensions",
  "stringExtensions",
], function (n, t, i, r, u, f, e) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var o = (function (n) {
    function t(t, i) {
      var u = n.call(this, t, i) || this;
      return ((u.heroItemBaseElement = t),
      (u.initialized = !1),
      (u.handleMouseAndTouchStart = function (n) {
        u.startCoordinates = f.getCoordinates(n);
      }),
      (u.handleMouseAndTouchEnd = function (n) {
        var t = u.startCoordinates,
          i = f.getCoordinates(n),
          r = n.which || n.button;
        r === 1 &&
          t &&
          i &&
          !u.isSwipe(t, i) &&
          u.handleValidUserInteraction(n, f.getEventTargetOrSrcElement(n));
      }),
      (u.verifyPreciseInteraction = function () {
        return f.hasClass(u.heroItemBaseElement, "f-precise-click") ? !0 : !1;
      }),
      !r.ObservableComponent.shouldInitializeAsClass(t, i))
        ? u
        : (f.SafeBrowserApis.requestAnimationFrame.call(window, function () {
            return u.update();
          }),
          u);
    }
    return (
      i.__extends(t, n),
      (t.prototype.update = function () {
        var r, n, i, u;
        if (!this.heroItemBaseElement) return !1;
        for (
          this.callsToAction = f.selectElementsT(
            this.constructor.callToActionSelector,
            this.heroItemBaseElement
          ),
            this.videoItem = f.selectFirstElement(
              t.videoSelector,
              this.heroItemBaseElement
            ),
            r = f.selectElementsT(".hiddenCTAlink", this.heroItemBaseElement),
            n = 0,
            i = r;
          n < i.length;
          n++
        )
          (u = i[n]), this.callsToAction.push(u);
        return this.addEventListeners(), (this.initialized = !0), !0;
      }),
      (t.prototype.teardown = function () {
        this.removeEventListeners();
        this.initialized = !1;
      }),
      (t.prototype.publish = function (n, t) {
        if (n.onHeroItemClicked) {
          n.onHeroItemClicked(t);
          this.preventDefaultClickAction =
            this.preventDefaultClickAction || t.preventDefault;
        }
      }),
      (t.prototype.addEventListeners = function () {
        !this.verifyPreciseInteraction() &&
          this.verifyCallToAction() &&
          (f.addEvent(
            this.heroItemBaseElement,
            f.eventTypes.mousedown,
            this.handleMouseAndTouchStart
          ),
          f.addEvent(
            this.heroItemBaseElement,
            f.eventTypes.mouseup,
            this.handleMouseAndTouchEnd
          ));
      }),
      (t.prototype.removeEventListeners = function () {
        f.removeEvent(
          this.heroItemBaseElement,
          f.eventTypes.mousedown,
          this.handleMouseAndTouchStart
        );
        f.removeEvent(
          this.heroItemBaseElement,
          f.eventTypes.mouseup,
          this.handleMouseAndTouchEnd
        );
      }),
      (t.prototype.handleValidUserInteraction = function (n, t) {
        if (
          !t ||
          this.isCallToActionOrDescendant(t) ||
          f.isDescendantOrSelf(this.videoItem, t) ||
          (e.isNullOrWhiteSpace(
            this.callsToAction[0].getAttribute("data-js-dialog-show")
          ) || this.callsToAction[0].click(),
          !this.verifyCallToAction())
        )
          return !1;
        var i = {
          preventDefault: !1,
          event: n,
          targetElement: t,
          targetUri: this.callsToAction[0].href,
        };
        return (
          (this.preventDefaultClickAction = !1),
          this.initiatePublish(i),
          this.preventDefaultClickAction
            ? (this.preventDefaultClickAction = !1)
            : (n && f.stopPropagation(n),
              this.navigateToUrl(
                this.callsToAction[0].href,
                n.ctrlKey ? "_blank" : this.callsToAction[0].target
              )),
          !0
        );
      }),
      (t.prototype.isCallToActionOrDescendant = function (n) {
        for (var r, t = 0, i = this.callsToAction; t < i.length; t++)
          if (((r = i[t]), r === n || f.isDescendant(r, n))) return !0;
        return !1;
      }),
      (t.prototype.isSwipe = function (n, i) {
        if (!n || !i) return !1;
        var r = Math.abs(i.y - n.y),
          u = Math.abs(i.x - n.x);
        return u > t.minimumSwipeDistance || r > t.minimumSwipeDistance;
      }),
      (t.prototype.navigateToUrl = function (n, t) {
        e.isNullOrWhiteSpace(n) ||
          window.open(n, e.isNullOrWhiteSpace(t) ? "_self" : t);
      }),
      (t.prototype.verifyCallToAction = function () {
        var n =
          this.callsToAction &&
          this.callsToAction.length &&
          !e.isNullOrWhiteSpace(this.callsToAction[0].href);
        return (
          n
            ? this.heroItemBaseElement.setAttribute(
                t.dataJsHref,
                this.callsToAction[0].href
              )
            : this.heroItemBaseElement.removeAttribute(t.dataJsHref),
          n
        );
      }),
      (t.prototype.onCollectionItemHidden = function () {}),
      (t.prototype.onCollectionItemShown = function () {}),
      (t.prototype.triggerItem = function () {
        return this.callsToAction && this.callsToAction.length
          ? this.handleValidUserInteraction(null, this.callsToAction[0])
          : !1;
      }),
      (t.dataJsHref = "data-js-href"),
      (t.minimumSwipeDistance = 30),
      (t.callToActionSelector = "a.c-call-to-action"),
      (t.videoSelector = ".c-video-player,.c-lightbox-video"),
      t
    );
  })(u.Publisher);
  t.HeroItemBase = o;
});
require(["tooltip", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.Tooltip }]);
});
define("choiceSummary", [
  "require",
  "exports",
  "tslib",
  "observableComponent",
  "htmlExtensions",
  "utility",
], function (n, t, i, r, u, f) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var e = (function (n) {
    function t(i) {
      var r = n.call(this, i) || this;
      return (
        (r.closeSummaryAndRemoveEvent = function () {
          u.removeEvent(
            r.closeSummaryButton,
            u.eventTypes.click,
            r.closeSummaryAndRemoveEvent
          );
          u.removeElement(r.element);
        }),
        (r.onDropdownClicked = function (n) {
          u.preventDefault(n);
          r.toggleVisibility();
          r.choiceOptions &&
            r.choiceOptions.length > 0 &&
            r.choiceOptions[0].focus();
        }),
        (r.onNonDropdownClick = function (n) {
          var t = u.getEventTargetOrSrcElement(n);
          r.isVisible || r.element.contains(t) || r.toggleVisibility();
        }),
        (r.replaceText = function (n) {
          var i, f;
          r.checkedChoiceOption = n.target;
          i = r.checkedChoiceOption.parentNode;
          r.label = u.selectFirstElement(t.spanSelector, i);
          f = r.labelText + r.separator + " " + u.getText(r.label);
          u.setText(r.dropdownText, f);
        }),
        (r.toggleVisibility = function () {
          var n, i, u;
          for (
            r.isVisible = !r.isVisible, n = 0, i = r.choiceOptions;
            n < i.length;
            n++
          )
            (u = i[n]),
              r.isVisible
                ? u.setAttribute("tabindex", "-1")
                : u.setAttribute("tabindex", "0");
          r.dropdownMenu.setAttribute(t.ariaHidden, "" + r.isVisible);
          r.dropdownMenu.setAttribute(t.ariaExpanded, "" + !r.isVisible);
          r.dropdownButton.setAttribute(t.ariaExpanded, "" + !r.isVisible);
          r.element.setAttribute(t.ariaExpanded, "" + !r.isVisible);
        }),
        (r.onControlKeyboard = function (n) {
          n = u.getEvent(n);
          var e = f.getKeyCode(n),
            i = u.selectFirstElement(t.dropdownButtonSelector, r.element),
            o = u.selectFirstElement(".c-menu", r.element);
          switch (e) {
            case 27:
              o.setAttribute("aria-hidden", "true");
              i.setAttribute("aria-expanded", "false");
              setTimeout(function () {
                i.focus();
              }, 0);
          }
        }),
        r.update(),
        r
      );
    }
    return (
      i.__extends(t, n),
      (t.prototype.update = function () {
        var n, i, r;
        if (
          ((this.dropdownButton = u.selectFirstElement(
            t.dropdownButtonSelector,
            this.element
          )),
          (this.dropdownMenu = u.selectFirstElement(
            t.dropdownMenuSelector,
            this.element
          )),
          (this.dropdownText = u.selectFirstElement(
            t.separatorSpanSelector,
            this.element
          )),
          (this.separator = this.dropdownText.getAttribute(
            t.separatorSelector
          )),
          (this.closeSummaryButton = u.selectFirstElement(
            "button.c-action-trigger.c-glyph.glyph-cancel",
            this.element
          )),
          (this.labelText = u.getText(this.dropdownText)),
          this.dropdownButton &&
            this.separator &&
            this.dropdownMenu &&
            this.dropdownText &&
            this.labelText)
        )
          for (
            this.choiceOptions = u.selectElementsT(
              t.choiceOptionSelector,
              this.element
            ),
              this.isVisible =
                this.dropdownMenu.getAttribute(t.ariaHidden) === "true",
              this.dropdownMenu.setAttribute(
                t.ariaExpanded,
                "" + !this.isVisible
              ),
              u.addEvent(
                this.dropdownButton,
                u.eventTypes.click,
                this.onDropdownClicked
              ),
              u.addEvent(document, u.eventTypes.click, this.onNonDropdownClick),
              u.addEvent(
                this.choiceOptions,
                u.eventTypes.click,
                this.replaceText
              ),
              u.addEvent(
                this.choiceOptions,
                u.eventTypes.keydown,
                this.onControlKeyboard
              ),
              n = 0,
              i = this.choiceOptions;
            n < i.length;
            n++
          )
            if (((r = i[n]), r.checked)) {
              this.checkedChoiceOption = r;
              break;
            }
        !this.closeSummaryButton ||
          u.addEvent(
            this.closeSummaryButton,
            u.eventTypes.click,
            this.closeSummaryAndRemoveEvent,
            !1
          );
      }),
      (t.prototype.teardown = function () {
        u.removeEvent(
          this.dropdownButton,
          u.eventTypes.click,
          this.onDropdownClicked
        );
        u.removeEvent(document, u.eventTypes.click, this.onNonDropdownClick);
        u.removeEvent(this.choiceOptions, u.eventTypes.click, this.replaceText);
        u.removeEvent(
          this.choiceOptions,
          u.eventTypes.keydown,
          this.onControlKeyboard
        );
      }),
      (t.selector = ".c-choice-summary"),
      (t.typeName = "ChoiceSummary"),
      (t.dropdownButtonSelector = ".c-action-trigger.glyph-chevron-down"),
      (t.dropdownMenuSelector = "ul"),
      (t.ariaHidden = "aria-hidden"),
      (t.ariaLabel = "aria-label"),
      (t.ariaExpanded = "aria-expanded"),
      (t.separatorSpanSelector = ".c-choice-summary > span"),
      (t.spanSelector = "span"),
      (t.separatorSelector = "data-js-separator"),
      (t.labelSelector = "label"),
      (t.choiceOptionSelector = 'input[type="radio"]'),
      t
    );
  })(r.ObservableComponent);
  t.ChoiceSummary = e;
});
require(["choiceSummary", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.ChoiceSummary }]);
});
define("ambientVideo", [
  "require",
  "exports",
  "tslib",
  "htmlExtensions",
  "observableComponent",
], function (n, t, i, r, u) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var f = (function (n) {
    function t(t) {
      var i = n.call(this, t) || this;
      return ((i.observer =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver),
      !t)
        ? i
        : (i.update(), i);
    }
    return (
      i.__extends(t, n),
      (t.prototype.update = function () {
        var t = this,
          n;
        this.htmlRoot = r.selectFirstElement("html");
        this.videoElement = r.selectFirstElement("video", this.element);
        n = { attributes: !0, childList: !0, characterData: !0 };
        typeof MutationObserver != "undefined"
          ? ((this.observer = new MutationObserver(function (n) {
              n.forEach(function () {
                t.checkReduceMotion();
              });
            })),
            this.observer.observe(this.htmlRoot, n))
          : r.addEvent(
              document,
              r.eventTypes.DOMNodeInserted,
              this.reduceMotion
            );
        this.checkReduceMotion();
      }),
      (t.prototype.checkReduceMotion = function () {
        r.hasClass(this.htmlRoot, "context-set-motion-limited") &&
          this.reduceMotion();
      }),
      (t.prototype.reduceMotion = function () {
        this.videoElement.hasAttribute("autoplay") &&
          this.videoElement.removeAttribute("autoplay");
        this.videoElement.hasAttribute("loop") &&
          this.videoElement.removeAttribute("loop");
        this.videoElement.pause();
      }),
      (t.prototype.teardown = function () {
        typeof MutationObserver != "undefined"
          ? this.observer.disconnect()
          : r.removeEvent(
              document,
              r.eventTypes.DOMNodeInserted,
              this.reduceMotion
            );
      }),
      (t.selector = ".m-ambient-video"),
      (t.typeName = "AmbientVideo"),
      t
    );
  })(u.ObservableComponent);
  t.AmbientVideo = f;
});
require(["ambientVideo", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.AmbientVideo }]);
});
define("rating", [
  "require",
  "exports",
  "tslib",
  "observableComponent",
  "htmlExtensions",
  "utility",
], function (n, t, i, r, u, f) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var e = (function (n) {
    function t(t) {
      var i = n.call(this, t) || this;
      return (
        (i.onRatingSelect = function (n) {
          i.handleRatingSelect(u.getEventTargetOrSrcElement(n));
          u.preventDefault(n);
        }),
        (i.onKeydown = function (n) {
          var t = f.getKeyCode(n);
          switch (t) {
            case 13:
            case 32:
              i.handleRatingSelect(u.getEventTargetOrSrcElement(n));
          }
        }),
        i.update(),
        i
      );
    }
    return (
      i.__extends(t, n),
      (t.prototype.update = function () {
        this.element &&
          ((this.buttons = u.selectElements("button", this.element)),
          (this.buttonClasses = this.getButtonClasses()),
          (this.userRated = u.hasClass(this.element, t.userRatedSelector)),
          (this.communityRated = u.hasClass(
            this.element,
            t.communityRatedSelector
          )),
          u.addEvent(this.buttons, u.eventTypes.keydown, this.onKeydown),
          u.addEvent(this.buttons, u.eventTypes.click, this.onRatingSelect));
      }),
      (t.prototype.teardown = function () {
        u.removeEvent(this.buttons, u.eventTypes.keydown, this.onKeydown);
        u.removeEvent(this.buttons, u.eventTypes.click, this.onRatingSelect);
      }),
      (t.prototype.handleRatingSelect = function (n) {
        u.addClasses(this.element, [
          t.userRatedSelector,
          t.communityRatedSelector,
        ]);
        this.removeButtonClasses();
        this.setButtonStyle(n);
        for (var i = 0; i < this.buttons.length; i++)
          if (n === this.buttons[i]) {
            this.selectedRating = i + 1;
            break;
          }
      }),
      (t.prototype.getButtonClasses = function () {
        for (var n = [], i = 0, r = this.buttons.length; i < r; i++)
          u.hasClass(this.buttons[i], t.fullClass)
            ? n.push(t.fullClass)
            : u.hasClass(this.buttons[i], t.halfClass)
            ? n.push(t.halfClass)
            : u.hasClass(this.buttons[i], t.noneClass)
            ? n.push(t.noneClass)
            : n.push("");
        return n;
      }),
      (t.prototype.removeButtonClasses = function () {
        for (var n = 0, t = this.buttons.length; n < t; n++)
          u.removeClass(this.buttons[n], this.buttonClasses[n]);
      }),
      (t.prototype.resetButtonClasses = function () {
        for (var n = 0, i = this.buttonClasses.length; n < i; n++)
          u.addClasses(this.buttons[n], [this.buttonClasses[n]]),
            u.hasClass(this.buttons[n], t.fullClass) &&
              this.buttonClasses[n] !== t.fullClass &&
              u.removeClass(this.buttons[n], t.fullClass);
      }),
      (t.prototype.setButtonStyle = function (n) {
        for (var r = !0, i = 0, f = this.buttons.length; i < f; i++)
          r === !0
            ? (u.addClasses(this.buttons[i], [t.fullClass]),
              this.buttons[i].setAttribute("aria-pressed", "true"))
            : (u.removeClass(this.buttons[i], t.fullClass),
              this.buttons[i].setAttribute("aria-pressed", "false")),
            this.buttons[i] === n && (r = !1);
      }),
      (t.selector = ".c-rating.f-interactive"),
      (t.typeName = "Rating"),
      (t.userRatedSelector = "f-user-rated"),
      (t.communityRatedSelector = "f-community-rated"),
      (t.fullClass = "f-full"),
      (t.halfClass = "f-half"),
      (t.noneClass = "f-none"),
      t
    );
  })(r.ObservableComponent);
  t.Rating = e;
});
require(["rating", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ c: n.Rating }]);
});
define("contentPlacementItem", [
  "require",
  "exports",
  "tslib",
  "hero-item-base",
], function (n, t, i, r) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var u = (function (n) {
    function t(t, i) {
      i === void 0 && (i = null);
      var r = n.call(this, t, i) || this;
      return (r.contentPlacementItemElement = t), r;
    }
    return (
      i.__extends(t, n),
      (t.selector = ".m-content-placement-item"),
      (t.typeName = "ContentPlacementItem"),
      (t.callToActionSelector = "a"),
      t
    );
  })(r.HeroItemBase);
  t.ContentPlacementItem = u;
});
require(["contentPlacementItem", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.ContentPlacementItem }]);
});
define("actionMenu", [
  "require",
  "exports",
  "tslib",
  "publisher",
  "utility",
  "htmlExtensions",
], function (n, t, i, r, u, f) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var e = (function (n) {
    function t(t) {
      var i = n.call(this, t) || this;
      return (
        (i.onTriggerClick = function (n) {
          if (((n = f.getEvent(n)), f.preventDefault(n), !i.disabled)) {
            i.onTriggerToggled();
            var t = i.items[0];
            t.setAttribute("tabindex", "0");
            t.focus();
          }
        }),
        (i.onTouchMove = function (n) {
          n = f.getEvent(n);
          f.preventDefault(n);
          i.isExpanded() ? i.collapse() : i.expand();
        }),
        (i.onItemClick = function (n) {
          n = f.getEvent(n);
          var t = n.currentTarget;
          if (!t.hasAttribute("aria-disabled")) {
            i.onItemSelected(t);
            i.collapse();
          }
        }),
        (i.onNonActionMenuClick = function (n) {
          if (((n = f.getEvent(n)), !!i.element && !!i.menu)) {
            var t = f.getEventTargetOrSrcElement(n);
            i.element.contains(t) ||
              (t !== i.menu && t.parentElement !== i.menu && i.collapse());
          }
        }),
        (i.onTriggerKeyPress = function (n) {
          var r, t;
          n = f.getEvent(n);
          r = u.getKeyCode(n);
          switch (r) {
            case 13:
            case 32:
              f.preventDefault(n);
              i.disabled ||
                ((t = i.items[0]),
                i.onTriggerToggled(),
                t.setAttribute("tabindex", "0"),
                t.focus());
          }
        }),
        (i.handleMenuKeydownEvent = function (n) {
          n = f.getEvent(n);
          var t = u.getKeyCode(n);
          (t !== 9 || i.isExpanded()) && f.preventDefault(n);
          i.handleMenuKeydown(f.getEventTargetOrSrcElement(n), t);
        }),
        i.update(),
        i
      );
    }
    return (
      i.__extends(t, n),
      (t.prototype.update = function () {
        if (
          ((this.trigger = f.selectFirstElement(
            t.triggerSelector,
            this.element
          )),
          (this.menu = f.selectFirstElement(t.menuSelector, this.element)),
          (this.items = f.selectElementsT(
            'li[class^="f-context-"]',
            this.element
          )),
          (this.disabled = this.trigger.hasAttribute("disabled")),
          !!this.trigger && !!this.menu && !!this.items && !!this.items.length)
        ) {
          var n = this.isExpanded();
          this.addEventListeners();
          n && this.expand();
        }
      }),
      (t.prototype.teardown = function () {
        !this.trigger ||
          !this.menu ||
          !this.items ||
          !this.items.length ||
          this.removeEventListeners();
        this.trigger = null;
        this.menu = null;
        this.items = null;
        this.selectedItem = null;
      }),
      (t.prototype.isExpanded = function () {
        return this.trigger.getAttribute(t.ariaExpanded) === "true";
      }),
      (t.prototype.expand = function () {
        f.removeClass(this.trigger, "x-hidden-focus");
        f.addClass(this.trigger, "f-active");
        this.trigger.setAttribute(t.ariaExpanded, "true");
      }),
      (t.prototype.collapse = function () {
        f.removeClass(this.trigger, "f-active");
        this.trigger.setAttribute(t.ariaExpanded, "false");
      }),
      (t.prototype.addEventListeners = function () {
        var n, t, i;
        for (
          f.addEvent(this.trigger, f.eventTypes.click, this.onTriggerClick),
            f.addEvent(
              this.trigger,
              f.eventTypes.keydown,
              this.onTriggerKeyPress
            ),
            f.addEvent(
              this.menu,
              f.eventTypes.keydown,
              this.handleMenuKeydownEvent,
              !0
            ),
            f.addEvent(this.trigger, f.eventTypes.touchmove, this.onTouchMove),
            n = 0,
            t = this.items;
          n < t.length;
          n++
        )
          (i = t[n]), f.addEvent(i, f.eventTypes.click, this.onItemClick);
        f.addEvent(document, f.eventTypes.click, this.onNonActionMenuClick);
      }),
      (t.prototype.removeEventListeners = function () {
        var n, t, i;
        for (
          f.removeEvent(this.trigger, f.eventTypes.click, this.onTriggerClick),
            f.removeEvent(
              this.trigger,
              f.eventTypes.keydown,
              this.onTriggerKeyPress
            ),
            f.removeEvent(
              this.menu,
              f.eventTypes.keydown,
              this.handleMenuKeydownEvent,
              !0
            ),
            f.removeEvent(
              this.trigger,
              f.eventTypes.touchmove,
              this.onTouchMove
            ),
            n = 0,
            t = this.items;
          n < t.length;
          n++
        )
          (i = t[n]), f.removeEvent(i, f.eventTypes.click, this.onItemClick);
        f.removeEvent(document, f.eventTypes.click, this.onNonActionMenuClick);
      }),
      (t.prototype.onTriggerToggled = function () {
        this.isExpanded() ? this.collapse() : this.expand();
      }),
      (t.prototype.onItemSelected = function (n) {
        var r, i;
        this.selectedItem = n;
        r = this.selectedItem.getAttribute("role") === "menuitemcheckbox";
        r
          ? ((i = this.selectedItem.getAttribute(t.ariaChecked) === "true"),
            i
              ? this.selectedItem.setAttribute(t.ariaChecked, "false")
              : this.selectedItem.setAttribute(t.ariaChecked, "true"),
            this.initiatePublish({ id: this.selectedItem.id, checked: !i }))
          : this.initiatePublish({ id: this.selectedItem.id });
      }),
      (t.prototype.publish = function (n, t) {
        if (!!this.selectedItem) n.onSelection(t);
      }),
      (t.prototype.handleMenuKeydown = function (n, t) {
        switch (t) {
          case 13:
            n.hasAttribute("aria-disabled") ||
              (this.handleMenuEnterKey(n),
              this.trigger.focus(),
              this.collapse());
            break;
          case 32:
            n.hasAttribute("aria-disabled") ||
              (this.handleMenuEnterKey(n),
              n.getAttribute("role") !== "menuitemcheckbox" &&
                (this.collapse(), this.trigger.focus()));
            break;
          case 27:
          case 196:
            this.trigger.focus();
            this.collapse();
            break;
          case 38:
          case 203:
          case 211:
            this.handleMenuArrowKey(!0, n);
            break;
          case 40:
          case 204:
          case 212:
            this.handleMenuArrowKey(!1, n);
            break;
          case 9:
            this.isExpanded() && (this.trigger.focus(), this.collapse());
        }
      }),
      (t.prototype.handleMenuArrowKey = function (n, t) {
        var r = this.items.indexOf(t),
          i;
        r !== -1 &&
          ((i = n ? r - 1 : r + 1),
          i < 0
            ? (i = this.items.length - 1)
            : i >= this.items.length && (i = 0),
          this.items[r].removeAttribute("tabindex"),
          this.items[i].setAttribute("tabindex", "0"),
          this.items[i].focus());
      }),
      (t.prototype.handleMenuEnterKey = function (n) {
        this.onItemSelected(n);
      }),
      (t.selector = ".c-action-menu"),
      (t.typeName = "ActionMenu"),
      (t.ariaExpanded = "aria-expanded"),
      (t.ariaChecked = "aria-checked"),
      (t.triggerSelector = t.selector + " > button.c-action-trigger"),
      (t.menuSelector = t.triggerSelector + ' + ul[role="menu"]'),
      t
    );
  })(r.Publisher);
  t.ActionMenu = e;
});
require(["actionMenu", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.ActionMenu }]);
});
require(["actionToggle", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.ActionToggle }]);
});
require(["carousel", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.Carousel }]);
});
require(["heroItem", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.HeroItem }]);
});
define("tooltip", [
  "require",
  "exports",
  "tslib",
  "observableComponent",
  "htmlExtensions",
  "utility",
], function (n, t, i, r, u, f) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var e = (function (n) {
    function t(t) {
      var i = n.call(this, t) || this;
      return (
        (i.isVisible = !1),
        (i.timer = 0),
        (i.exposeToScreenReaders = !0),
        (i.onFocus = function (n) {
          n = u.getEvent(n);
          n && n.type !== "mouseover" && i.actOnFocus();
        }),
        (i.handleKeydownWhenFocused = function (n) {
          if (i.isVisible) {
            n = u.getEvent(n);
            var t = f.getKeyCode(n);
            switch (t) {
              case 27:
                i.hide();
                break;
              case 38:
              case 40:
                u.preventDefault(n);
            }
          }
        }),
        (i.onBlur = function () {
          i.hide();
          u.addEvent(i.controller, u.eventTypes.focus, i.onFocus);
          u.removeEvent(i.controller, u.eventTypes.blur, i.onBlur);
          u.removeEvent(
            i.controller,
            u.eventTypes.keydown,
            i.handleKeydownWhenFocused
          );
        }),
        (i.onMouseOver = function (n) {
          i.isVisible ||
            ((n = u.getEvent(n)),
            (i.tooltipXPosition = n.clientX),
            (i.tooltipYPosition = n.clientY),
            i.actOnMouseOver());
        }),
        (i.onMouseOut = function () {
          i.timer > 0 && (window.clearTimeout(i.timer), (i.timer = 0));
          i.hide();
          u.removeEvent(i.controller, u.eventTypes.mouseout, i.onMouseOut);
          u.addEvent(i.controller, u.eventTypes.mouseover, i.onMouseOver);
        }),
        (i.showForMouse = function () {
          i.show();
          u.removeEvent(i.controller, u.eventTypes.mouseover, i.onMouseOver);
        }),
        (i.onScroll = function () {
          i.isVisible &&
            !i.animationFrameRequested &&
            ((i.animationFrameRequested = !0),
            u.SafeBrowserApis.requestAnimationFrame.call(window, function () {
              return i.handleScroll();
            }));
        }),
        i.update(),
        i
      );
    }
    return (
      i.__extends(t, n),
      (t.prototype.update = function () {
        if (this.element) {
          var n = this.element.getAttribute("id");
          this.controller = u.selectFirstElement(
            "[" + t.ariaDescribedByAttribute + '="' + n + '"]'
          );
          this.controller ||
            ((this.controller = u.selectFirstElement(
              "[" + t.dataDescribedByAttribute + '="' + n + '"]'
            )),
            (this.exposeToScreenReaders = !this.controller ? !0 : !1));
          this.element.setAttribute(t.ariaHidden, "true");
          this.exposeToScreenReaders ||
            u.addClass(this.element, t.hiddenFromScreenReadersClass);
          this.exposeToScreenReaders &&
            this.element.setAttribute(t.ariaHidden, "false");
          !this.controller ||
            (u.addEvent(
              this.controller,
              u.eventTypes.mouseover,
              this.onMouseOver
            ),
            u.addEvent(this.controller, u.eventTypes.focus, this.onFocus),
            u.addEvent(window, u.eventTypes.scroll, this.onScroll));
        }
      }),
      (t.prototype.teardown = function () {
        u.removeEvent(
          this.controller,
          u.eventTypes.mouseover,
          this.onMouseOver
        );
        u.removeEvent(this.controller, u.eventTypes.mouseout, this.onMouseOut);
        u.removeEvent(this.controller, u.eventTypes.focus, this.onFocus);
        u.removeEvent(this.controller, u.eventTypes.blur, this.onBlur);
        u.removeEvent(window, u.eventTypes.scroll, this.onScroll);
        this.controller = null;
        this.isVisible = !1;
        this.tooltipXPosition = 0;
        this.tooltipYPosition = 0;
        this.timer > 0 && (window.clearTimeout(this.timer), (this.timer = 0));
      }),
      (t.prototype.actOnFocus = function () {
        var n = u.getClientRect(this.controller);
        this.tooltipXPosition = n.left;
        this.tooltipYPosition = n.bottom;
        this.show();
        u.addEvent(this.controller, u.eventTypes.blur, this.onBlur);
        u.addEvent(
          this.controller,
          u.eventTypes.keydown,
          this.handleKeydownWhenFocused
        );
        u.removeEvent(this.controller, u.eventTypes.focus, this.onFocus);
      }),
      (t.prototype.actOnMouseOver = function () {
        this.timer = window.setTimeout(this.showForMouse, t.timerDelay);
        u.addEvent(this.controller, u.eventTypes.mouseout, this.onMouseOut);
      }),
      (t.prototype.handleScroll = function () {
        this.animationFrameRequested = !1;
        var n = u.getScrollY(),
          t = this.scrollYOnShow - n;
      }),
      (t.prototype.show = function () {
        this.isVisible = !0;
        this.scrollYOnShow = u.getScrollY();
      }),
      (t.prototype.hide = function () {
        !!this.element &&
          this.isVisible &&
          ((this.isVisible = !1),
          this.exposeToScreenReaders &&
            this.element.setAttribute(t.ariaHidden, "true"));
      }),
      (t.prototype.setContent = function (n) {
        !this.element || u.setText(this.element, n);
      }),
      (t.prototype.setPosition = function (n) {
        n &&
          (!n.left || u.css(this.element, "left", n.left + "px"),
          !n.top || u.css(this.element, "top", n.top + "px"));
      }),
      (t.selector = ".c-tooltip"),
      (t.typeName = "Tooltip"),
      (t.ariaHidden = "aria-hidden"),
      (t.hiddenClass = "x-hidden"),
      (t.timerDelay = 800),
      (t.hookFocus = "hook-focus"),
      (t.hookHover = "hook-hover"),
      (t.ariaDescribedByAttribute = "aria-describedby"),
      (t.dataDescribedByAttribute = "data-f-describedby"),
      (t.hiddenFromScreenReadersClass = "f-hidden-from-screen-readers"),
      t
    );
  })(r.ObservableComponent);
  t.Tooltip = e;
});
require(["tooltip", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.Tooltip }]);
});
require(["single-slide-carousel", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.SingleSlideCarousel }]);
});
require(["actionToggle", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.ActionToggle }]);
});
define("productPlacementItem", [
  "require",
  "exports",
  "tslib",
  "observableComponent",
  "htmlExtensions",
], function (n, t, i, r, u) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var f = (function (n) {
    function t(t) {
      var i = n.call(this, t) || this;
      return t ? (i.update(), i) : i;
    }
    return (
      i.__extends(t, n),
      (t.prototype.update = function () {
        this.explicit = u.selectFirstElement(t.explicitSelector, this.element);
        this.heading = u.selectFirstElement(t.headingSelector, this.element);
        this.explicit && this.heading && this.setExplicitPosition();
      }),
      (t.prototype.teardown = function () {}),
      (t.prototype.setExplicitPosition = function () {
        var n = u.getClientRect(this.heading).height;
        n < t.headingLineHeight * 3 &&
          (u.css(this.explicit, "position", "relative"),
          u.css(this.explicit, "bottom", "inherit"));
      }),
      (t.selector = ".m-product-placement-item"),
      (t.typeName = "ProductPlacementItem"),
      (t.explicitSelector = ".c-explicit"),
      (t.headingSelector = ".c-heading"),
      (t.headingLineHeight = 20),
      t
    );
  })(r.ObservableComponent);
  t.ProductPlacementItem = f;
});
require(["productPlacementItem", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.ProductPlacementItem }]);
});
define("carousel", [
  "require",
  "exports",
  "tslib",
  "componentFactory",
  "multi-slide-carousel",
  "single-slide-carousel",
  "publisher",
  "htmlExtensions",
  "utility",
], function (n, t, i, r, u, f, e, o, s) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var h = (function (n) {
    function t(i, e) {
      var c, h;
      return (
        e === void 0 && (e = null),
        (c = n.call(this, i, e) || this),
        s.apiDeprecated(
          "Carousel is deprecated, please use either MultiSlideCarousel or SingleSlideCarousel instead."
        ),
        (h = null),
        !i ||
          r.ComponentFactory.create([
            {
              elements: [i],
              component: o.hasClass(i, t.multiSlideClass)
                ? u.MultiSlideCarousel
                : f.SingleSlideCarousel,
              callback: function (n) {
                h = n && n.length ? n[0] : null;
              },
              eventToBind: "DOMContentLoaded",
            },
          ]),
        h
      );
    }
    return (
      i.__extends(t, n),
      (t.prototype.publish = function () {
        s.apiDeprecated(
          "Carousel is deprecated, please use either MultiSlideCarousel or SingleSlideCarousel instead."
        );
      }),
      (t.selector = ".c-carousel"),
      (t.multiSlideClass = "f-multi-slide"),
      t
    );
  })(e.Publisher);
  t.Carousel = h;
});
require(["carousel", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.Carousel }]);
});
require(["heroItem", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.HeroItem }]);
});
define("multi-slide-carousel", [
  "require",
  "exports",
  "tslib",
  "carousel-base",
  "componentFactory",
  "sequenceIndicator",
  "actionToggle",
  "htmlExtensions",
  "utility",
  "viewportCollision",
], function (n, t, i, r, u, f, e, o, s, h) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var c = (function (n) {
    function t(t, i) {
      i === void 0 && (i = null);
      var r = n.call(this, t, i) || this;
      return (
        (r.carouselElement = t),
        (r.isAutoPlayPaused = !0),
        (r.autoPlayTimer = -1),
        (r.hasContentFocus = !1),
        (r.isMouseOver = !1),
        (r.hasViewportCollisions = !1),
        (r.onActionToggled = function (n) {
          if (!!n) {
            r.playPauseButton.removeAttribute(
              e.ActionToggle.ariaPressedAttribute
            );
            var t = r.playPauseButton.getAttribute("aria-label"),
              i = r.playPauseButton.getAttribute("data-toggled-label");
            r.playPauseButton.setAttribute("data-toggled-label", t);
            r.playPauseButton.setAttribute("aria-label", i);
            n.toggled ? r.startAutoPlay() : r.pauseAutoPlay();
          }
        }),
        (r.onMouseOver = function () {
          r.isMouseOver = !0;
          r.suspendAutoPlay();
        }),
        (r.onMouseOut = function () {
          r.isMouseOver = !1;
          r.resumeAutoPlay();
        }),
        (r.onContentFocusIn = function () {
          r.hasContentFocus = !0;
          var n = r.playPauseButton.getAttribute("aria-label");
          n = n === "Paused" ? "Play" : n === "Playing" ? "Pause" : n;
          r.playPauseButton.setAttribute("aria-label", n);
          r.suspendAutoPlay();
        }),
        (r.onContentFocusOut = function () {
          r.hasContentFocus = !1;
          r.resumeAutoPlay();
        }),
        (r.onWindowScrolled = function () {
          r.carouselElement &&
            ((r.hasViewportCollisions = !!h.collidesWith(r.carouselElement)),
            r.hasViewportCollisions ? r.suspendAutoPlay() : r.resumeAutoPlay());
        }),
        r
      );
    }
    return (
      i.__extends(t, n),
      (t.prototype.update = function () {
        var i = this;
        return !this.isObserving() || !n.prototype.update.call(this)
          ? !1
          : ((this.playPauseButton = o.selectFirstElement(
              e.ActionToggle.selector,
              this.carouselElement
            )),
            !this.playPauseButton ||
              (this.playPauseButton.setAttribute(
                "aria-hidden",
                this.slides.length > 1 ? "false" : "true"
              ),
              u.ComponentFactory.create([
                {
                  component: e.ActionToggle,
                  elements: [this.playPauseButton],
                  callback: function (n) {
                    if (
                      n.length > 0 &&
                      ((i.autoPlayActionToggle = n[0]),
                      !!i.autoPlayActionToggle)
                    ) {
                      i.autoPlayActionToggle.subscribe(i);
                      i.playPauseButton.removeAttribute(
                        e.ActionToggle.ariaPressedAttribute
                      );
                      var r = i.playPauseButton.getAttribute("aria-label"),
                        u =
                          i.playPauseButton.getAttribute("data-toggled-label"),
                        a = i.playPauseButton.getAttribute(
                          "data-telemetry-default-label"
                        ),
                        v =
                          i.playPauseButton.getAttribute("data-toggled-glyph"),
                        f = r && r.toLowerCase(),
                        y = a && a.toLowerCase(),
                        p = v && v.toLowerCase(),
                        w = f && y && f === y,
                        b = f && p && p.search(f),
                        c = "",
                        l = "";
                      a
                        ? ((l = w ? u : r), (c = w ? r : u))
                        : v
                        ? ((c = b !== -1 ? r : u), (l = b !== -1 ? u : r))
                        : ((c = r), (l = u));
                      i.playPauseButton.setAttribute("data-toggled-label", l);
                      i.playPauseButton.setAttribute("aria-label", c);
                      o.addEvent(
                        i.carouselElement,
                        o.eventTypes.mouseover,
                        i.onMouseOver
                      );
                      o.addEvent(
                        i.carouselElement,
                        o.eventTypes.mouseout,
                        i.onMouseOut
                      );
                      i.scrollThrottledEventHandler = o.addThrottledEvent(
                        window,
                        o.eventTypes.scroll,
                        i.onWindowScrolled
                      );
                      i.hasViewportCollisions = !!h.collidesWith(
                        i.carouselElement
                      );
                      i.hasContentFocus = o.isDescendantOrSelf(
                        i.carouselElement,
                        document.activeElement
                      );
                      o.addEvent(
                        i.carouselElement,
                        o.eventTypes.focusin,
                        i.onContentFocusIn
                      );
                      o.addEvent(
                        i.carouselElement,
                        o.eventTypes.focusout,
                        i.onContentFocusOut
                      );
                      i.autoPlayIntervalDuration = Math.max(
                        t.autoPlayMinimumInterval,
                        parseInt(
                          i.carouselElement.getAttribute(
                            t.autoPlayIntervalAttribute
                          ),
                          10
                        ) || t.autoPlayDefaultInterval
                      );
                      o.hasClass(i.carouselElement, t.autoPlayClass) &&
                        i.slides.length > 1 &&
                        i.autoPlayActionToggle.isToggled() &&
                        s.getQSPValue("mwfrun").toLowerCase() !==
                          "formwfvdiff" &&
                        i.startAutoPlay();
                    }
                  },
                  eventToBind: "DOMContentLoaded",
                },
              ])),
            this.loadMultiSlideController(),
            !0);
      }),
      (t.prototype.teardown = function () {
        n.prototype.teardown.call(this);
        !this.autoPlayActionToggle ||
          (this.autoPlayActionToggle.unsubscribe(this),
          o.removeEvent(
            this.carouselElement,
            o.eventTypes.mouseover,
            this.onMouseOver
          ),
          o.removeEvent(
            this.carouselElement,
            o.eventTypes.mouseout,
            this.onMouseOut
          ),
          this.scrollThrottledEventHandler &&
            (o.removeEvent(
              window,
              o.eventTypes.scroll,
              this.scrollThrottledEventHandler
            ),
            (this.scrollThrottledEventHandler = null)),
          o.removeEvent(
            this.carouselElement,
            o.eventTypes.focusin,
            this.onContentFocusIn
          ),
          o.removeEvent(
            this.carouselElement,
            o.eventTypes.focusout,
            this.onContentFocusOut
          ),
          this.clearAutoPlayTimers());
        this.hasContentFocus = !1;
        this.isMouseOver = !1;
        this.hasViewportCollisions = !1;
        this.isAutoPlayPaused = !0;
        this.hasContentFocus = !1;
        this.playPauseButton = null;
        !this.sequenceIndicator || this.sequenceIndicator.unsubscribe(this);
      }),
      (t.prototype.getSlides = function () {
        return o.selectElements(
          r.CarouselBase.allChildSelectors,
          this.carouselElement
        );
      }),
      (t.prototype.getFirstActiveIndex = function () {
        if (!this.slides) return 0;
        for (var n = 0; n < this.slides.length; n++)
          if (o.hasClass(this.slides[n], r.CarouselBase.activeClass)) return n;
        return 0;
      }),
      (t.prototype.isScrollablePrevious = function () {
        return !!this.slides && this.slides.length > 1;
      }),
      (t.prototype.isScrollableNext = function () {
        return !!this.slides && this.slides.length > 1;
      }),
      (t.prototype.previousSlide = function () {
        this.setActiveSlide(this.activeIndex - 1);
      }),
      (t.prototype.nextSlide = function () {
        this.setActiveSlide(this.activeIndex + 1);
      }),
      (t.prototype.setActiveSlide = function (i, u) {
        var f, h, c, e, s;
        if ((u === void 0 && (u = !0), !this.slides)) return !1;
        ((f = this.activeIndex),
        (h = i),
        i < 0
          ? (i = this.slides.length - 1)
          : i >= this.slides.length && (i = 0),
        n.prototype.setActiveSlide.call(this, i, u)) &&
          (f !== -1 &&
            (o.removeClasses(this.slides[f], [
              r.CarouselBase.activeClass,
              t.animateNextClass,
              t.animatePreviousClass,
            ]),
            (c = f < h ? t.animateNextClass : t.animatePreviousClass),
            o.addClass(this.slides[this.activeIndex], c)),
          this.resumeAutoPlay(),
          this.sequenceIndicator &&
            this.sequenceIndicator.setControllerIndex(i, !1),
          (e =
            f === -1
              ? null
              : n.prototype.getCollectionItem.call(this, this.slides[f])),
          (s = n.prototype.getCollectionItem.call(
            this,
            this.slides[this.activeIndex]
          )),
          e && e.onCollectionItemHidden(),
          s && s.onCollectionItemShown(),
          n.prototype.initiatePublish.call(this, {
            fullyVisibleItemRange: [i, i],
            partiallyVisibleItemRange: [i, i],
            userInitiated: u,
          }));
      }),
      (t.prototype.startAutoPlay = function () {
        this.isAutoPlayPaused = !1;
        this.isMouseOver = !1;
        this.resumeAutoPlay();
      }),
      (t.prototype.pauseAutoPlay = function () {
        this.isAutoPlayPaused = !0;
        this.clearAutoPlayTimers();
      }),
      (t.prototype.suspendAutoPlay = function () {
        this.clearAutoPlayTimers();
      }),
      (t.prototype.resumeAutoPlay = function () {
        this.isAutoPlayPaused ||
          this.isMouseOver ||
          this.hasViewportCollisions ||
          (this.hasContentFocus &&
            this.playPauseButton !== document.activeElement) ||
          this.setAutoPlayInterval();
      }),
      (t.prototype.setAutoPlayInterval = function () {
        var n = this;
        this.clearAutoPlayTimers();
        this.autoPlayTimer = setTimeout(function () {
          n.setActiveSlide(n.activeIndex + 1, !1);
        }, this.autoPlayIntervalDuration);
      }),
      (t.prototype.clearAutoPlayTimers = function () {
        this.autoPlayTimer !== -1 &&
          (clearTimeout(this.autoPlayTimer), (this.autoPlayTimer = -1));
      }),
      (t.prototype.loadMultiSlideController = function () {
        var n = this,
          t = o.selectFirstElement(
            f.SequenceIndicator.selector,
            this.carouselElement
          );
        !t ||
          u.ComponentFactory.create([
            {
              component: f.SequenceIndicator,
              elements: [t],
              callback: function (t) {
                t &&
                  t.length &&
                  ((n.sequenceIndicator = t[0]),
                  !n.sequenceIndicator ||
                    (n.slides.length > 1
                      ? n.sequenceIndicator.show()
                      : n.sequenceIndicator.hide(),
                    n.sequenceIndicator.subscribe(n),
                    n.sequenceIndicator.setControllerIndex(n.activeIndex, !1)));
              },
              eventToBind: "DOMContentLoaded",
            },
          ]);
      }),
      (t.prototype.onControllerIndexChanged = function (n) {
        !n || this.setActiveSlide(n.currentIndex);
      }),
      (t.selector = ".c-carousel[class*=f-multi-slide]"),
      (t.typeName = "MultiSlideCarousel"),
      (t.animateNextClass = "f-animate-next"),
      (t.animatePreviousClass = "f-animate-previous"),
      (t.focusContentSelector = ".c-call-to-action"),
      (t.autoPlayClass = "f-auto-play"),
      (t.autoPlayIntervalAttribute = "data-js-interval"),
      (t.autoPlayDefaultInterval = 6e3),
      (t.autoPlayMinimumInterval = 5e3),
      t
    );
  })(r.CarouselBase);
  t.MultiSlideCarousel = c;
});
require(["multi-slide-carousel", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.MultiSlideCarousel }]);
});
define("viewportCollision", ["require", "exports", "htmlExtensions"], function (
  n,
  t,
  i
) {
  "use strict";
  function r(n, t) {
    var r = i.getClientRect(n),
      u,
      f,
      e,
      o;
    return ((r.left = Math.round(r.left)),
    (r.top = Math.round(r.top)),
    (r.right = Math.round(r.right)),
    (r.bottom = Math.round(r.bottom)),
    r.width !== 0 &&
      ((u = !1),
      (f = { top: !1, bottom: !1, left: !1, right: !1 }),
      t ||
        ((e = Math.min(
          window.innerWidth,
          document.documentElement.clientWidth
        )),
        (o = Math.min(
          window.innerHeight,
          document.documentElement.clientHeight
        )),
        (t = { left: 0, top: 0, right: e, bottom: o, width: e, height: o })),
      r.left < t.left && ((u = !0), (f.left = !0)),
      r.top < t.top && ((u = !0), (f.top = !0)),
      r.right > t.right && ((u = !0), (f.right = !0)),
      r.bottom > t.bottom && ((u = !0), (f.bottom = !0)),
      u))
      ? f
      : !1;
  }
  function u(n, t) {
    var r = i.getClientRect(n),
      u,
      f;
    if (r.width === 0) return null;
    t ||
      ((u = Math.min(window.innerWidth, document.documentElement.clientWidth)),
      (f = Math.min(window.innerHeight, document.documentElement.clientHeight)),
      (t = { top: 0, right: u, bottom: f, left: 0, height: f, width: u }));
    var e = Math.round(r.top - t.top),
      o = Math.round(t.right - r.right),
      s = Math.round(t.bottom - r.bottom),
      h = Math.round(r.left - t.left);
    return e >= 0 && o >= 0 && s >= 0 && h >= 0
      ? null
      : { top: e, right: o, bottom: s, left: h, clientRect: r, viewport: t };
  }
  Object.defineProperty(t, "__esModule", { value: !0 });
  t.collidesWith = r;
  t.getCollisionExtents = u;
});
define("sequenceIndicator", [
  "require",
  "exports",
  "tslib",
  "observableComponent",
  "publisher",
  "htmlExtensions",
  "utility",
  "componentFactory",
  "tooltip",
], function (n, t, i, r, u, f, e, o, s) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var h = (function (n) {
    function t(i, u) {
      u === void 0 && (u = null);
      var o = n.call(this, i, u) || this;
      return (
        (o.sequenceIndicatorElement = i),
        (o.selectedAttribute = t.ariaSelected),
        (o.setActiveIndex = function (n) {
          return (
            e.apiDeprecated(
              "SequenceIndicator.setActiveIndex() is deprecated, please use SequenceIndicator.setControllerIndex() instead."
            ),
            o.setControllerIndex(n)
          );
        }),
        (o.setControllerIndex = function (n, t, i) {
          if (
            (t === void 0 && (t = !1),
            i === void 0 && (i = !1),
            n < 0 || n > o.items.length - 1 || n === o.activeIndex)
          )
            return !1;
          var f = o.activeIndex,
            r = o.items[o.activeIndex],
            u = o.items[n],
            e = document.activeElement === r;
          return (
            o.deselectItem(r),
            o.selectItem(u, i),
            (o.activeIndex = n),
            (t || e) && u.focus(),
            o.initiatePublish({ previousIindex: f, currentIndex: n, index: n }),
            !0
          );
        }),
        (o.handleClickEvent = function (n) {
          var t, i;
          f.preventDefault(n);
          t = f.getEventTargetOrSrcElement(n);
          t &&
            ((i = t.getAttribute("role")),
            !i &&
              t.parentElement &&
              (t =
                t.parentElement.getAttribute("role") === "tab"
                  ? t.parentElement
                  : null),
            o.setControllerIndex(o.items.indexOf(t), !1, !0));
        }),
        (o.onKeydown = function (n) {
          var t = !1,
            i = !1;
          switch (e.getKeyCode(n)) {
            case 39:
            case 206:
            case 213:
              i = !0;
              break;
            case 37:
            case 205:
            case 214:
              t = !0;
              break;
            default:
              switch (e.getVirtualKey(n)) {
                case "ArrowRight":
                  i = !0;
                  break;
                case "ArrowLeft":
                  t = !0;
              }
          }
          (t || i) &&
            (f.stopPropagation(n),
            f.preventDefault(n),
            (t && !o.isLtr) || (i && o.isLtr)
              ? o.next()
              : ((t && o.isLtr) || (i && !o.isLtr)) && o.previous());
        }),
        r.ObservableComponent.shouldInitializeAsClass(i, u) && o.update(),
        o
      );
    }
    return (
      i.__extends(t, n),
      (t.prototype.update = function () {
        var r,
          e = this.element.getAttribute(s.Tooltip.dataDescribedByAttribute),
          i,
          u,
          n;
        if (
          (!e ||
            o.ComponentFactory.create([
              {
                component: s.Tooltip,
                eventToBind: "DOMContentLoaded",
                elements: [document.getElementById(e)],
              },
            ]),
          !this.sequenceIndicatorElement) ||
          (this.sequenceIndicatorElement.getAttribute("role") ===
            "radiogroup" && (this.selectedAttribute = t.ariaChecked),
          (this.isInteractive = !f.hasClass(
            this.sequenceIndicatorElement,
            "f-noninteractive"
          )),
          (this.items = f.selectElements(
            this.constructor.itemSelector,
            this.sequenceIndicatorElement
          )),
          !this.items.length)
        )
          return !1;
        for (i = 0, u = this.items; i < u.length; i++)
          (n = u[i]),
            n.getAttribute(this.selectedAttribute) === t.selectedValue &&
              (r = this.items.indexOf(n)),
            this.deselectItem(n),
            this.isInteractive ||
              (n.setAttribute("tabIndex", "-1"),
              n.setAttribute("disabled", ""));
        return (
          this.selectItem(this.items[r || 0]),
          this.setControllerIndex(r || 0),
          this.isInteractive &&
            ((this.isLtr =
              f.getDirection(this.sequenceIndicatorElement) ===
              f.Direction.left),
            f.addEvent(
              this.sequenceIndicatorElement,
              f.eventTypes.click,
              this.handleClickEvent
            ),
            f.addEvent(
              this.sequenceIndicatorElement,
              f.eventTypes.keydown,
              this.onKeydown,
              !0
            )),
          !0
        );
      }),
      (t.prototype.teardown = function () {
        this.isInteractive &&
          (f.removeEvent(
            this.sequenceIndicatorElement,
            f.eventTypes.click,
            this.handleClickEvent
          ),
          f.removeEvent(
            this.sequenceIndicatorElement,
            f.eventTypes.keydown,
            this.onKeydown
          ));
      }),
      (t.prototype.publish = function (n, t) {
        var i = n,
          r = n;
        if (i.onIndexChanged) i.onIndexChanged(t);
        if (r.onControllerIndexChanged) r.onControllerIndexChanged(t);
      }),
      (t.prototype.selectItem = function (n, i) {
        i === void 0 && (i = !1);
        !n ||
          (n.setAttribute(this.selectedAttribute, t.selectedValue),
          this.isInteractive && n.setAttribute("tabindex", "0"),
          f.addClass(n, t.activeItemClass),
          i &&
            n.getAttribute("role") === "tab" &&
            f.addClass(n, "x-hidden-focus"));
      }),
      (t.prototype.deselectItem = function (n) {
        !n ||
          (n.setAttribute(this.selectedAttribute, t.deselectedValue),
          this.isInteractive && n.setAttribute("tabindex", "-1"),
          f.removeClass(n, t.activeItemClass),
          n.getAttribute("role") === "tab" &&
            f.removeClass(n, "x-hidden-focus"));
      }),
      (t.prototype.show = function () {
        this.sequenceIndicatorElement &&
          this.sequenceIndicatorElement.setAttribute("aria-hidden", "false");
      }),
      (t.prototype.hide = function () {
        this.sequenceIndicatorElement &&
          this.sequenceIndicatorElement.setAttribute("aria-hidden", "true");
      }),
      (t.prototype.next = function () {
        var n;
        n =
          this.activeIndex === this.items.length - 1 ? 0 : this.activeIndex + 1;
        this.setControllerIndex(n);
      }),
      (t.prototype.previous = function () {
        var n;
        n =
          this.activeIndex === 0 ? this.items.length - 1 : this.activeIndex - 1;
        this.setControllerIndex(n);
      }),
      (t.selector = ".c-sequence-indicator"),
      (t.typeName = "SequenceIndicator"),
      (t.itemSelector = "button"),
      (t.selectedValue = "true"),
      (t.deselectedValue = "false"),
      (t.ariaSelected = "aria-selected"),
      (t.ariaChecked = "aria-checked"),
      (t.activeItemClass = "f-active"),
      t
    );
  })(u.Publisher);
  t.SequenceIndicator = h;
});
define("actionToggle", [
  "require",
  "exports",
  "tslib",
  "publisher",
  "componentFactory",
  "tooltip",
  "htmlExtensions",
  "utility",
], function (n, t, i, r, u, f, e, o) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var s = (function (n) {
    function t(i) {
      var r = n.call(this, i) || this;
      return (
        (r.element = i),
        (r.toggleText = function (n) {
          e.setText(r.element, n.innerText);
        }),
        (r.toggleLabel = function (n) {
          e.setText(r.element, n.label);
        }),
        (r.updateActionToggleState = function (n) {
          n !== r.isToggled() &&
            (r.skipAriaPressed
              ? n
                ? (e.addClass(r.element, t.initializeToggledClassName),
                  r.element.setAttribute(t.dataIsPressedAttribute, "true"),
                  r.toggleStateProperties(r.toggledState, r.initialState))
                : (e.removeClass(r.element, t.initializeToggledClassName),
                  r.element.setAttribute(t.dataIsPressedAttribute, "false"),
                  r.toggleStateProperties(r.initialState, r.toggledState))
              : n
              ? (e.addClass(r.element, t.initializeToggledClassName),
                r.element.setAttribute(t.ariaPressedAttribute, "true"),
                r.toggleStateProperties(r.toggledState, r.initialState))
              : (e.removeClass(r.element, t.initializeToggledClassName),
                r.element.setAttribute(t.ariaPressedAttribute, "false"),
                r.toggleStateProperties(r.initialState, r.toggledState)),
            r.initiatePublish({ toggled: n }));
        }),
        (r.toggleStateProperties = function (n, t) {
          e.removeClass(r.element, t.glyph);
          e.addClass(r.element, n.glyph);
          r.textArialLabelToggleFunction(n);
          !r.tooltip || r.tooltip.setContent(n.label);
        }),
        (r.onActionToggleChange = function () {
          r.updateActionToggleState(!r.isToggled());
        }),
        (r.handleKeydownEvent = function (n) {
          switch (o.getKeyCode(n)) {
            case 13:
            case 32:
              e.preventDefault(n);
              r.updateActionToggleState(!r.isToggled());
              break;
            case 27:
              e.preventDefault(n);
              r.updateActionToggleState(!1);
          }
        }),
        r.update(),
        r
      );
    }
    return (
      i.__extends(t, n),
      (t.prototype.update = function () {
        var i = this,
          n,
          r;
        this.element &&
          (this.initializeStates(),
          (n = e.hasClass(this.element, t.initializeToggledClassName)),
          (this.skipAriaPressed = e.hasClass(
            this.element,
            t.skipAriaPressedAttributeClassName
          )),
          (r = this.element.getAttribute(f.Tooltip.dataDescribedByAttribute)),
          !r ||
            u.ComponentFactory.create([
              {
                component: f.Tooltip,
                eventToBind: "DOMContentLoaded",
                elements: [document.getElementById(r)],
                callback: function (t) {
                  (!t && !t.length) ||
                    ((i.tooltip = t[0]),
                    i.tooltip.setContent(
                      n ? i.toggledState.label : i.initialState.label
                    ));
                },
              },
            ]),
          n && e.removeClass(this.element, t.initializeToggledClassName),
          this.updateActionToggleState(n),
          this.skipAriaPressed
            ? n
              ? this.element.setAttribute(t.dataIsPressedAttribute, "true")
              : this.element.setAttribute(t.dataIsPressedAttribute, "false")
            : n
            ? this.element.setAttribute(t.ariaPressedAttribute, "true")
            : this.element.setAttribute(t.ariaPressedAttribute, "false"),
          e.addEvent(
            this.element,
            e.eventTypes.click,
            this.onActionToggleChange
          ),
          e.addEvent(
            this.element,
            e.eventTypes.keydown,
            this.handleKeydownEvent
          ));
      }),
      (t.prototype.teardown = function () {
        e.removeEvent(
          this.element,
          e.eventTypes.click,
          this.onActionToggleChange
        );
        e.removeEvent(
          this.element,
          e.eventTypes.keydown,
          this.handleKeydownEvent
        );
      }),
      (t.prototype.publish = function (n, t) {
        if (n.onActionToggled) n.onActionToggled(t);
      }),
      (t.prototype.isToggled = function () {
        return e.hasClass(this.element, t.initializeToggledClassName);
      }),
      (t.prototype.initializeStates = function () {
        var n, i, r, u;
        for (
          this.initialState = { label: null, innerText: null, glyph: null },
            this.toggledState = {
              label: this.element.getAttribute(
                t.localizedToggledLabelAttribute
              ),
              innerText: this.element.getAttribute(
                t.localizedToggledTextAttribute
              ),
              glyph: this.element.getAttribute(t.toggledGlyphAttribute),
            },
            n = e.getText(this.element),
            this.element.getAttribute(t.ariaLabelAttribute)
              ? ((this.initialState.label = this.element.getAttribute(
                  t.ariaLabelAttribute
                )),
                this.toggledState.innerText &&
                  n &&
                  (this.initialState.innerText = n),
                (this.textArialLabelToggleFunction = this.toggleText))
              : n &&
                ((this.initialState.label = n),
                (this.textArialLabelToggleFunction = this.toggleLabel)),
            i = 0,
            r = this.element.className.split(" ");
          i < r.length;
          i++
        )
          if (((u = r[i]), u.indexOf("glyph-") >= 0)) {
            this.initialState.glyph = u;
            break;
          }
      }),
      (t.selector = ".c-action-toggle"),
      (t.typeName = "ActionToggle"),
      (t.ariaPressedAttribute = "aria-pressed"),
      (t.dataIsPressedAttribute = "data-ispressed"),
      (t.ariaLabelAttribute = "aria-label"),
      (t.initializeToggledClassName = "f-toggle"),
      (t.skipAriaPressedAttributeClassName = "f-skip-ariapressed"),
      (t.toggledGlyphAttribute = "data-toggled-glyph"),
      (t.localizedToggledLabelAttribute = "data-toggled-label"),
      (t.localizedToggledTextAttribute = "data-toggled-text"),
      t
    );
  })(r.Publisher);
  t.ActionToggle = s;
});
require(["actionToggle", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.ActionToggle }]);
});
define("carousel-base", [
  "require",
  "exports",
  "tslib",
  "observableComponent",
  "componentFactory",
  "publisher",
  "swipe",
  "stringExtensions",
  "htmlExtensions",
  "utility",
], function (n, t, i, r, u, f, e, o, s, h) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var c = (function (n) {
    function t(t, i) {
      var u = n.call(this, t, i) || this;
      return ((u.carouselElement = t),
      (u.activeIndex = -1),
      (u.onFlipperClicked = function (n) {
        s.getEventTargetOrSrcElement(n) === u.previousButton
          ? u.previousSlide()
          : u.nextSlide();
      }),
      (u.swipeHandler = function (n) {
        if (
          n.direction === e.SwipeDirection.Right ||
          n.direction === e.SwipeDirection.Left
        ) {
          var t =
            n.direction === e.SwipeDirection.Right
              ? u.direction === s.Direction.left
              : u.direction !== s.Direction.left;
          t && u.isScrollableNext()
            ? u.nextSlide()
            : !t && u.isScrollablePrevious() && u.previousSlide();
        }
      }),
      !r.ObservableComponent.shouldInitializeAsClass(t, i))
        ? u
        : ((u.direction = s.getDirection()),
          (u.directionValue = s.Direction[u.direction]),
          (u.requestAnimationFrame = s.SafeBrowserApis.requestAnimationFrame),
          s.preventDefaultSwipeAction(u.element),
          u.requestAnimationFrame.call(window, function () {
            return u.update();
          }),
          u);
    }
    return (
      i.__extends(t, n),
      (t.prototype.update = function () {
        var n = this;
        return !this.carouselElement || !this.hasSlides()
          ? !1
          : (this.requestAnimationFrame.call(window, function () {
              return n.setActiveSlide(n.getFirstActiveIndex(), !1);
            }),
            (this.previousButton = s.selectFirstElement(
              t.previousButtonSelector,
              this.carouselElement
            )),
            (this.nextButton = s.selectFirstElement(
              t.nextButtonSelector,
              this.carouselElement
            )),
            !this.previousButton ||
              !this.nextButton ||
              (s.addEvent(
                this.previousButton,
                s.eventTypes.click,
                this.onFlipperClicked
              ),
              s.addEvent(
                this.nextButton,
                s.eventTypes.click,
                this.onFlipperClicked
              )),
            (this.swipe = new e.Swipe(
              [this.carouselElement],
              { end: this.swipeHandler },
              e.SwipeOrientation.Horizontal
            )),
            !0);
      }),
      (t.prototype.teardown = function () {
        !this.previousButton ||
          !this.nextButton ||
          (s.removeEvent(
            this.previousButton,
            s.eventTypes.click,
            this.onFlipperClicked
          ),
          s.removeEvent(
            this.nextButton,
            s.eventTypes.click,
            this.onFlipperClicked
          ));
        this.swipe && this.swipe.tearDown();
        this.slides = null;
        this.previousButton = null;
        this.nextButton = null;
      }),
      (t.prototype.hasSlides = function () {
        return (
          (this.slides = this.getSlides()),
          !!this.slides && !!this.slides.length
        );
      }),
      (t.prototype.getCollectionItem = function (n) {
        var t;
        return (
          !n ||
            !n.firstElementChild ||
            u.ComponentFactory.enumerateComponents(
              n.firstElementChild,
              function (n, i) {
                return (
                  i.onCollectionItemHidden &&
                    i.onCollectionItemShown &&
                    i.triggerItem &&
                    (t = i),
                  !t
                );
              }
            ),
          t
        );
      }),
      (t.prototype.setActiveSlide = function (n, i) {
        return (i === void 0 && (i = !0),
        !this.slides ||
          !h.isNumber(n) ||
          n < 0 ||
          n >= this.slides.length ||
          n === this.activeIndex)
          ? !1
          : (this.activeIndex >= 0 &&
              this.activeIndex < this.slides.length &&
              s.removeClass(this.slides[this.activeIndex], t.activeClass),
            (this.activeIndex = n),
            s.addClass(this.slides[n], t.activeClass),
            this.updateTheme(),
            this.updateFlippers(),
            !0);
      }),
      (t.prototype.updateTheme = function () {
        s.removeClasses(this.carouselElement, [
          t.themeDarkClass,
          t.themeLightClass,
        ]);
        var n = this.slides[this.activeIndex].getAttribute(
          t.slideThemeAttribute
        );
        o.isNullOrWhiteSpace(n) ||
          s.addClass(this.carouselElement, t.themePrefix + n);
      }),
      (t.prototype.updateFlippers = function () {
        this.isScrollableNext()
          ? s.addClass(this.carouselElement, t.nextFlipperClass)
          : s.removeClass(this.carouselElement, t.nextFlipperClass);
        this.isScrollablePrevious()
          ? s.addClass(this.carouselElement, t.previousFlipperClass)
          : s.removeClass(this.carouselElement, t.previousFlipperClass);
      }),
      (t.prototype.publish = function (n, t) {
        n.onSlideRangeChanged(t);
      }),
      (t.prototype.triggerSlide = function () {
        if (!this.slides || !this.slides.length || !(this.activeIndex >= 0))
          return !1;
        var n = this.getCollectionItem(this.slides[this.activeIndex]);
        return n && n.triggerItem();
      }),
      (t.selector = ".c-carousel"),
      (t.activeClass = "f-active"),
      (t.allChildSelectors = t.selector + " > * > ul > li"),
      (t.slideThemeAttribute = "data-f-theme"),
      (t.themePrefix = "theme-"),
      (t.previousFlipperClass = "f-scrollable-previous"),
      (t.nextFlipperClass = "f-scrollable-next"),
      (t.themeLightClass = "theme-light"),
      (t.themeDarkClass = "theme-dark"),
      (t.previousButtonSelector = ".c-flipper.f-previous, .c-flipper.f-left"),
      (t.nextButtonSelector = ".c-flipper.f-next, .c-flipper.f-right"),
      t
    );
  })(f.Publisher);
  t.CarouselBase = c;
});
define("swipe", ["require", "exports", "htmlExtensions"], function (n, t, i) {
  "use strict";
  var f, r, u;
  Object.defineProperty(t, "__esModule", { value: !0 });
  f = (function () {
    function n(n, t, f, e, o) {
      f === void 0 && (f = u.All);
      var s = this;
      ((this.targets = n),
      (this.swipeEventHandlers = t),
      (this.active = !1),
      (this.orientation = u.All),
      (this.pointerEvents = {
        mouse: { start: "mousedown", move: "mousemove", end: "mouseup" },
        touch: {
          start: "touchstart",
          move: "touchmove",
          end: "touchend",
          cancel: "touchcancel",
        },
        pointer: {
          start: "pointerdown",
          move: "pointermove",
          end: "pointerup",
          cancel: "pointercancel",
        },
      }),
      (this.minimumDirectionalDistance = 30),
      (this.maximumAntiDirectionalDistance = 200),
      (this.minimumDirectionalRatio = 0.6),
      (this.minimumMoveDistance = 10),
      (this.startHandler = function (n) {
        s.active = !0;
        s.startCoordinate = i.getCoordinates(n);
        s.lastMoveCoordinate = s.startCoordinate;
        s.swipeEventHandlers.start &&
          s.swipeEventHandlers.start({
            event: n,
            target: s.getEventTarget(n),
            coordinate: s.startCoordinate,
          });
      }),
      (this.moveHandler = function (n) {
        var o;
        if (s.active && s.startCoordinate) {
          var t = i.getCoordinates(n),
            f = Math.abs(t.x - s.lastMoveCoordinate.x),
            e = Math.abs(t.y - s.lastMoveCoordinate.y);
          (f < s.minimumMoveDistance && e < s.minimumMoveDistance) ||
            ((o =
              f > e
                ? t.x > s.lastMoveCoordinate.x
                  ? r.Left
                  : r.Right
                : t.y > s.lastMoveCoordinate.y
                ? r.Up
                : r.Down),
            (s.lastMoveCoordinate = t),
            (f = Math.abs(t.x - s.startCoordinate.x)),
            (e = Math.abs(t.y - s.startCoordinate.y)),
            ((f > e && s.orientation !== u.Vertical) ||
              (f < e && s.orientation !== u.Horizontal)) &&
              i.preventDefault(n),
            s.swipeEventHandlers.move &&
              s.swipeEventHandlers.move({
                event: n,
                target: s.getEventTarget(n),
                coordinate: t,
                direction: o,
              }));
        }
      }),
      (this.endHandler = function (n) {
        if (s.active && ((s.active = !1), s.swipeEventHandlers.end)) {
          var t = i.getCoordinates(n),
            r = s.getSwipeDirection(t);
          s.swipeEventHandlers.end({
            event: n,
            target: s.getEventTarget(n),
            coordinate: t,
            direction: r,
          });
        }
      }),
      (this.cancelHandler = function (n) {
        s.active &&
          ((s.active = !1),
          s.swipeEventHandlers.cancel &&
            s.swipeEventHandlers.cancel({
              event: n,
              target: s.getEventTarget(n),
            }));
      }),
      this.targets && this.targets.length && t) &&
        ((this.pointerTypes = e || ["touch", "pointer", "mouse"]),
        (this.minimumMoveDistance = o || this.minimumMoveDistance),
        (this.orientation = f),
        i.addEvents(
          this.targets,
          this.getEvents(this.pointerTypes, "start"),
          this.startHandler
        ),
        i.addEvents(
          this.targets,
          this.getEvents(this.pointerTypes, "move"),
          this.moveHandler
        ),
        i.addEvents(
          this.targets,
          this.getEvents(this.pointerTypes, "end"),
          this.endHandler
        ),
        i.addEvents(
          this.targets,
          this.getEvents(this.pointerTypes, "cancel"),
          this.cancelHandler
        ));
    }
    return (
      (n.prototype.tearDown = function () {
        i.removeEvents(
          this.targets,
          this.getEvents(this.pointerTypes, "start"),
          this.startHandler
        );
        i.removeEvents(
          this.targets,
          this.getEvents(this.pointerTypes, "move"),
          this.moveHandler
        );
        i.removeEvents(
          this.targets,
          this.getEvents(this.pointerTypes, "end"),
          this.endHandler
        );
        i.removeEvents(
          this.targets,
          this.getEvents(this.pointerTypes, "cancel"),
          this.cancelHandler
        );
      }),
      (n.prototype.getEvents = function (n, t) {
        for (var e, r, u = [], i = 0, f = n; i < f.length; i++)
          (e = f[i]), (r = this.pointerEvents[e][t]), r && u.push(r);
        return u.join(" ");
      }),
      (n.prototype.getEventTarget = function (n) {
        var f, t, r, u;
        if (!n || !this.targets) return null;
        if (this.targets.length === 1) return this.targets[0];
        for (
          f = i.getEventTargetOrSrcElement(n), t = 0, r = this.targets;
          t < r.length;
          t++
        )
          if (((u = r[t]), i.isDescendantOrSelf(u, f))) return u;
        return null;
      }),
      (n.prototype.getSwipeDirection = function (n) {
        if (!!this.startCoordinate) {
          var t = Math.abs(n.y - this.startCoordinate.y),
            i = Math.abs(n.x - this.startCoordinate.x);
          if (
            t < this.maximumAntiDirectionalDistance &&
            i > this.minimumDirectionalDistance &&
            t / i <= this.minimumDirectionalRatio
          )
            return n.x > this.startCoordinate.x ? r.Left : r.Right;
          if (
            i < this.maximumAntiDirectionalDistance &&
            t > this.minimumDirectionalDistance &&
            i / t <= this.minimumDirectionalRatio
          )
            return n.y > this.startCoordinate.y ? r.Up : r.Down;
        }
        return undefined;
      }),
      n
    );
  })();
  (t.Swipe = f),
    (function (n) {
      n[(n.Left = 0)] = "Left";
      n[(n.Right = 1)] = "Right";
      n[(n.Up = 2)] = "Up";
      n[(n.Down = 3)] = "Down";
    })((r = t.SwipeDirection || (t.SwipeDirection = {}))),
    (function (n) {
      n[(n.Horizontal = 0)] = "Horizontal";
      n[(n.Vertical = 1)] = "Vertical";
      n[(n.All = 2)] = "All";
    })((u = t.SwipeOrientation || (t.SwipeOrientation = {})));
});
define("heroItem", ["require", "exports", "tslib", "hero-item-base"], function (
  n,
  t,
  i,
  r
) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var u = (function (n) {
    function t(t, i) {
      i === void 0 && (i = null);
      var r = n.call(this, t, i) || this;
      return (r.heroItemElement = t), r;
    }
    return (
      i.__extends(t, n),
      (t.selector = ".c-hero, .m-hero-item"),
      (t.typeName = "HeroItem"),
      (t.callToActionSelector = "a"),
      t
    );
  })(r.HeroItemBase);
  t.HeroItem = u;
});
require(["heroItem", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.HeroItem }]);
});
define("mosaicPlacement", [
  "require",
  "exports",
  "tslib",
  "observableComponent",
  "breakpointTracker",
  "utility",
  "htmlExtensions",
], function (n, t, i, r, u, f, e) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var o = (function (n) {
    function t(t) {
      var i = n.call(this, t) || this;
      return (
        (i.cssClassNames = {
          width: { large: "f-width-large", small: "f-width-small" },
          height: {
            large: "f-height-large",
            medium: "f-height-medium",
            small: "f-height-small",
          },
        }),
        (i.mappings = [
          [
            [300, 0],
            [150, 320],
            [0, 160],
          ],
          [
            [300, 540],
            [150, 270],
            [0, 135],
          ],
          [
            [400, 768],
            [200, 384],
            [0, 0],
          ],
          [
            [400, 542],
            [200, 271],
            [0, 135],
          ],
          [
            [400, 542],
            [200, 271],
            [0, 135],
          ],
          [
            [400, 542],
            [200, 271],
            [0, 135],
          ],
        ]),
        i.update(),
        u.BreakpointTracker.getBreakpointTracker().subscribe({
          onBreakpointChanged: function (n) {
            i.onBreakpointChanged(n);
          },
        }),
        i
      );
    }
    return (
      i.__extends(t, n),
      (t.prototype.update = function () {
        this.onBreakpointChanged({
          breakpoint:
            u.BreakpointTracker.getBreakpointTracker().getBreakpoint(),
          width: 0,
        });
      }),
      (t.prototype.teardown = function () {}),
      (t.prototype.removeClasses = function (n) {
        n != null &&
          e.removeClasses(n, this.concatenateCssClasses(this.cssClassNames));
      }),
      (t.prototype.applySizeClasses = function (n, t) {
        var i = f.getDimensions(n),
          r,
          u;
        i != null &&
          f.isNumber(i.height) &&
          f.isNumber(i.width) &&
          ((r = []),
          i.height >= this.mappings[t][0][0]
            ? (r.push(this.cssClassNames.height.large),
              (u =
                i.width >= this.mappings[t][0][1]
                  ? this.cssClassNames.width.large
                  : this.cssClassNames.width.small),
              r.push(u))
            : i.height >= this.mappings[t][1][0]
            ? (r.push(this.cssClassNames.height.medium),
              (u =
                i.width >= this.mappings[t][1][1]
                  ? this.cssClassNames.width.large
                  : this.cssClassNames.width.small),
              r.push(u))
            : (r.push(this.cssClassNames.height.small),
              (u =
                i.width >= this.mappings[t][2][1]
                  ? this.cssClassNames.width.large
                  : this.cssClassNames.width.small),
              r.push(u)),
          e.addClasses(this.element, r));
      }),
      (t.prototype.onBreakpointChanged = function (n) {
        this.removeClasses(this.element);
        this.applySizeClasses(this.element, n.breakpoint);
      }),
      (t.prototype.concatenateCssClasses = function (n) {
        var i, r, f, t, u;
        if (n != null) {
          i = [];
          for (r in n)
            if (
              n.hasOwnProperty(r) &&
              ((f = n), (t = f[r]), typeof t == "object")
            )
              for (u in t) t.hasOwnProperty(u) && i.push(t[u]);
          return i;
        }
      }),
      (t.selector = ".c-mosaic-placement"),
      (t.typeName = "MosaicPlacement"),
      t
    );
  })(r.ObservableComponent);
  t.MosaicPlacement = o;
});
require(["mosaicPlacement", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.MosaicPlacement }]);
});
define("breakpointTracker", [
  "require",
  "exports",
  "tslib",
  "publisher",
  "htmlExtensions",
  "utility",
], function (n, t, i, r, u, f) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var e = (function (n) {
    function t() {
      var i = n.call(this, null) || this;
      return (
        (i.onWindowResized = function () {
          var r = t.getWindowWidth(),
            n = t.identifyBreakpoint(r);
          i.breakpoint !== n &&
            ((i.breakpoint = n),
            i.initiatePublish({ breakpoint: n, width: r }));
        }),
        (i.windowWidth = t.getWindowWidth()),
        (i.breakpoint = t.identifyBreakpoint(i.windowWidth)),
        u.addDebouncedEvent(window, u.eventTypes.resize, i.onWindowResized),
        i
      );
    }
    return (
      i.__extends(t, n),
      (t.getBreakpointTracker = function () {
        return (
          document.body.breakpointTracker ||
            (document.body.breakpointTracker = new t()),
          document.body.breakpointTracker
        );
      }),
      (t.prototype.getBreakpoint = function () {
        return this.breakpoint;
      }),
      (t.identifyBreakpoint = function (n) {
        f.isNumber(n) || (n = t.getWindowWidth());
        for (var i = t.breakpoints.length - 1; i >= 0; i--)
          if (n >= t.breakpoints[i]) return i;
      }),
      (t.getWindowWidth = function () {
        return window.innerWidth || document.documentElement.clientWidth;
      }),
      (t.prototype.publish = function (n, t) {
        if (n.onBreakpointChanged) n.onBreakpointChanged(t);
      }),
      (t.breakpoints = [0, 540, 768, 1084, 1400, 1779]),
      t
    );
  })(r.Publisher);
  t.BreakpointTracker = e;
});
define("pageBehaviors", ["require", "exports", "htmlExtensions"], function (
  n,
  t,
  i
) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var r = (function () {
    function n() {
      i.removeClass(document.documentElement, "no-js");
      i.addClass(document.documentElement, "js");
      i.hasClass(document.body, "c_native") &&
        window.navigator &&
        typeof window.navigator.gamepadInputEmulation == "string" &&
        (window.navigator.gamepadInputEmulation = "keyboard");
    }
    return (n.typeName = "PageBehaviors"), n;
  })();
  t.PageBehaviors = r;
});
define("single-slide-carousel", [
  "require",
  "exports",
  "tslib",
  "carousel-base",
  "htmlExtensions",
  "utility",
  "utility",
], function (n, t, i, r, u, f, e) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var o = (function (n) {
    function t(t, i) {
      i === void 0 && (i = null);
      var r = n.call(this, t, i) || this;
      return (
        (r.carouselElement = t),
        (r.nextFocusIndex = function (n) {
          return n >= r.focusElements.length - 1 ? -1 : n + 1;
        }),
        (r.previousFocusIndex = function (n) {
          return n <= 0 ? -1 : n - 1;
        }),
        (r.scrollFocusItemLI = function (n) {
          while (n.tagName !== "LI")
            if (!n.parentElement || n.parentElement === n) break;
            else n = n.parentElement;
          n.tagName === "LI" && r.scrollItemIntoView(n);
        }),
        (r.onFocus = function () {
          var n = u.getEventTargetOrSrcElement(event);
          n && r.focusElements.indexOf(n) > -1 && r.scrollFocusItemLI(n);
        }),
        (r.onKeydown = function (n) {
          var o = u.getEventTargetOrSrcElement(n),
            f,
            i;
          if (o) {
            var t = e.getKeyCode(n),
              s =
                (t === 9 && n.shiftKey) ||
                ((t === 205 || t === 214) && r.directionValue === "left") ||
                ((t === 206 || t === 213) && r.directionValue === "right"),
              h =
                t === 9 ||
                ((t === 205 || t === 214) && r.directionValue === "right") ||
                ((t === 206 || t === 213) && r.directionValue === "left");
            s
              ? ((f = r.focusElements.indexOf(o)),
                (i = r.previousFocusIndex(f)),
                i > -1 && r.scrollFocusItemLI(r.focusElements[i]))
              : h &&
                ((f = r.focusElements.indexOf(o)),
                (i = r.nextFocusIndex(f)),
                i > -1 && r.scrollFocusItemLI(r.focusElements[i]));
          }
        }),
        (r.onResized = function () {
          r.onCarouselResized();
        }),
        r
      );
    }
    return (
      i.__extends(t, n),
      (t.prototype.update = function () {
        if (!n.prototype.update.call(this)) return !1;
        this.resizeThrottledEventHandler = u.addThrottledEvent(
          window,
          u.eventTypes.resize,
          this.onResized
        );
        var i = u.hasClass(this.slides[0], "f-gallery")
          ? t.focusGalleryItemSelector
          : t.focusItemSelector;
        return (
          (this.focusElements = u.selectElements(i, this.carouselElement)),
          u.addEvent(this.focusElements, u.eventTypes.keydown, this.onKeydown),
          u.addEvent(this.focusElements, u.eventTypes.focus, this.onFocus),
          !0
        );
      }),
      (t.prototype.teardown = function () {
        n.prototype.teardown.call(this);
        u.removeEvent(
          window,
          u.eventTypes.resize,
          this.resizeThrottledEventHandler
        );
        u.removeEvent(this.focusElements, u.eventTypes.focus, this.onFocus);
        u.removeEvent(this.focusElements, u.eventTypes.keydown, this.onKeydown);
      }),
      (t.prototype.getSlides = function () {
        var n = u.selectElements(t.singleSlideSelector, this.carouselElement);
        return n && n.length && u.selectFirstElement("li", n[0])
          ? ((this.singleSlideWidth = f.getDimensions(n[0]).width), n)
          : null;
      }),
      (t.prototype.getFirstActiveIndex = function () {
        return 0;
      }),
      (t.prototype.isScrollablePrevious = function () {
        var n = parseInt(
          u.css(this.slides[this.activeIndex], this.directionValue),
          10
        );
        return !isNaN(n) && n !== 0;
      }),
      (t.prototype.isScrollableNext = function () {
        var n = parseInt(
            u.css(this.slides[this.activeIndex], this.directionValue),
            10
          ),
          t = f.getDimensions(this.carouselElement).width,
          i = this.getCurrentSlideSize();
        return (f.isNumber(n) || (n = 0),
        t + Math.abs(n) + i.gutter >= this.singleSlideWidth)
          ? !1
          : !0;
      }),
      (t.prototype.previousSlide = function () {
        this.changeSingleSlide(!1);
      }),
      (t.prototype.nextSlide = function () {
        this.changeSingleSlide(!0);
      }),
      (t.prototype.changeSingleSlide = function (t) {
        var l = this.slides[this.activeIndex],
          e = parseInt(u.css(l, this.directionValue), 10),
          i = this.getCurrentSlideSize(),
          o = f.getDimensions(this.carouselElement).width,
          r = Math.floor(o / (i.width + i.gutter)),
          s,
          a = t ? -1 : 1,
          v = t ? i.gutter : 0,
          h,
          c;
        f.isNumber(e) || (e = 0);
        r === 0 && (r = 1);
        r = o % (i.width + i.gutter) == 0 ? r - 1 : r;
        r = Math.max(r, 1);
        s = r * (i.width + i.gutter);
        h = t ? this.singleSlideWidth - o + e : Math.abs(e);
        c = s <= h ? s * a + e : h * a + e + v;
        u.css(l, this.directionValue, c + "px");
        n.prototype.updateFlippers.call(this);
        this.fireSingleSlideChangedNotification(c, o, i);
      }),
      (t.prototype.fireSingleSlideChangedNotification = function (t, i, f) {
        for (
          var h,
            c,
            v = u.selectElements(
              r.CarouselBase.allChildSelectors,
              this.carouselElement
            ),
            y = f.width,
            p = f.width + f.gutter,
            l = -1,
            o = -1,
            s = -1,
            a = -1,
            e = 0;
          e < v.length;
          e++
        )
          if (
            ((h = e * p + t), (c = h + y), !(c < 0)) &&
            (h < 0 && c > 0 && (l = e),
            s === -1 && h >= 0 && ((s = e), l === -1 && (l = s)),
            s !== -1 && c <= i && (a = e),
            a !== -1 && o === -1 && h < i && c > i)
          ) {
            o = e;
            break;
          }
        o === -1 && (o = a);
        n.prototype.initiatePublish.call(this, {
          fullyVisibleItemRange: [s, a],
          partiallyVisibleItemRange: [l, o],
          userInitiated: !0,
        });
      }),
      (t.prototype.getCurrentSlideSize = function () {
        var n = u.selectFirstElement(
            r.CarouselBase.allChildSelectors,
            this.carouselElement
          ),
          t;
        return !n
          ? { width: 0, gutter: 0 }
          : ((t =
              this.direction === u.Direction.left
                ? parseInt(u.css(n, "marginRight"), 10)
                : parseInt(u.css(n, "marginLeft"), 10)),
            { width: n.offsetWidth, gutter: isNaN(t) ? 0 : t });
      }),
      (t.prototype.onCarouselResized = function () {
        var i = this.slides[0],
          t = parseInt(u.css(i, this.directionValue), 10),
          r = f.getDimensions(this.carouselElement).width;
        this.singleSlideWidth = f.getDimensions(this.slides[0]).width;
        !isNaN(t) &&
          t < 0 &&
          this.singleSlideWidth + t < r &&
          u.css(
            i,
            this.directionValue,
            Math.min(0, r - this.singleSlideWidth) + "px"
          );
        n.prototype.updateFlippers.call(this);
      }),
      (t.prototype.scrollItemIntoView = function (t) {
        var l = this,
          o = f.getDimensions(this.carouselElement).width,
          e = this.slides[0],
          i = t.offsetLeft,
          r = this.getCurrentSlideSize(),
          s = !1,
          h,
          c;
        this.direction === u.Direction.left
          ? ((h = parseInt(u.css(e, "left"), 10) || 0),
            h < 0 && -h > i
              ? (i !== 0 && (i = -i + 1), (s = !0))
              : h + i > o - r.width && ((i = o - r.width - i - 1), (s = !0)))
          : ((c = f.getDimensions(e).width),
            i + r.width + r.gutter + e.offsetLeft > o
              ? ((i = -(c - i - r.width - r.gutter) + 1), (s = !0))
              : i + e.offsetLeft < 0 &&
                ((i = o - (c - i - r.gutter) - 1), (s = !0)));
        s &&
          (u.css(e, this.directionValue, i + "px"),
          n.prototype.updateFlippers.call(this),
          setTimeout(function () {
            e.parentElement.scrollLeft = 0;
            l.fireSingleSlideChangedNotification(i, o, r);
          }, 0));
      }),
      (t.selector = ".c-carousel[class*=f-single-slide]"),
      (t.typeName = "SingleSlideCarousel"),
      (t.singleSlideSelector = r.CarouselBase.selector + " > * > ul"),
      (t.focusItemSelector =
        r.CarouselBase.selector +
        " > * > ul > li > section a, * > ul > li > section button, * > ul > li > div a"),
      (t.focusGalleryItemSelector =
        r.CarouselBase.selector + " > * > ul > li a"),
      t
    );
  })(r.CarouselBase);
  t.SingleSlideCarousel = o;
});
require(["single-slide-carousel", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.SingleSlideCarousel }]);
});
define("backToTop", [
  "require",
  "exports",
  "tslib",
  "htmlExtensions",
  "utility",
  "observableComponent",
], function (n, t, i, r, u, f) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  var e = (function (n) {
    function t(t) {
      var i = n.call(this, t) || this;
      return ((i.toggleBackToTop = function () {
        var n = window.pageYOffset || document.body.scrollTop,
          t = u.getWindowHeight(),
          r = n >= 2 * t ? "false" : "true";
        i.element.setAttribute("aria-disabled", r);
      }),
      !t)
        ? i
        : (i.update(), i);
    }
    return (
      i.__extends(t, n),
      (t.prototype.update = function () {
        this.scrollThrottledEventHandler = r.addThrottledEvent(
          window,
          r.eventTypes.scroll,
          this.toggleBackToTop
        );
      }),
      (t.prototype.teardown = function () {
        r.removeEvent(
          window,
          r.eventTypes.scroll,
          this.scrollThrottledEventHandler
        );
      }),
      (t.selector = ".m-back-to-top"),
      (t.typeName = "BackToTop"),
      t
    );
  })(f.ObservableComponent);
  t.BackToTop = e;
});
require(["backToTop", "componentFactory"], function (n, t) {
  t.ComponentFactory &&
    t.ComponentFactory.create &&
    t.ComponentFactory.create([{ component: n.BackToTop }]);
});