// ==UserScript==
// @name         Vtuber Blocker
// @namespace    https://vblock.oein.kr/
// @homepageURL  https://vblock.oein.kr/
// @supportURL   https://github.com/Oein/VTuberBlocker/issues
// @version      $version
// @license      MIT
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chzzk.naver.com
// @description  Blocks VTuber content from Chzzk recommendations
// @match        http*://chzzk.naver.com/*
// @updateURL    https://vblock.oein.kr/dist.user.js
// @downloadURL  https://vblock.oein.kr/dist.user.js
// @grant        none
// @run-at       document-start
// @copyright    Copyright (c) 2025 Oein
// ==/UserScript==

//XHook - v1.6.2 - https://github.com/jpillora/xhook
//Jaime Pillora <dev@jpillora.com> - MIT Copyright 2023

(function () {
  var e = ["$0"],
    t = "$1"
      .split("@")
      .map((e) =>
        Array.from(atob(e + "=="), (e) =>
          e.charCodeAt(0).toString(16).padStart(2, "0")
        ).join("")
      ),
    n = ["$2"];
  (function () {
    "use strict";
    const e = (e, t) => Array.prototype.slice.call(e, t);
    let t = null;
    "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope
      ? (t = self)
      : "undefined" != typeof global
      ? (t = global)
      : window && (t = window);
    const n = t,
      r = t.document,
      s = ["load", "loadend", "loadstart"],
      o = ["progress", "abort", "error", "timeout"],
      i = (e) => ["returnValue", "totalSize", "position"].includes(e),
      a = function (e, t) {
        for (let n in e) {
          if (i(n)) continue;
          const r = e[n];
          try {
            t[n] = r;
          } catch (e) {}
        }
        return t;
      },
      c = function (e, t, n) {
        const r = (e) =>
          function (r) {
            const s = {};
            for (let e in r) {
              if (i(e)) continue;
              const o = r[e];
              s[e] = o === t ? n : o;
            }
            return n.dispatchEvent(e, s);
          };
        for (let s of Array.from(e)) n._has(s) && (t[`on${s}`] = r(s));
      },
      l = function (e) {
        if (r && null != r.createEventObject) {
          const t = r.createEventObject();
          return (t.type = e), t;
        }
        try {
          return new Event(e);
        } catch (t) {
          return { type: e };
        }
      },
      u = function (t) {
        let n = {};
        const r = (e) => n[e] || [],
          s = {
            addEventListener: function (e, t, s) {
              (n[e] = r(e)),
                n[e].indexOf(t) >= 0 ||
                  ((s = void 0 === s ? n[e].length : s), n[e].splice(s, 0, t));
            },
            removeEventListener: function (e, t) {
              if (void 0 === e) return void (n = {});
              void 0 === t && (n[e] = []);
              const s = r(e).indexOf(t);
              -1 !== s && r(e).splice(s, 1);
            },
            dispatchEvent: function () {
              const n = e(arguments),
                o = n.shift();
              t ||
                ((n[0] = a(n[0], l(o))),
                Object.defineProperty(n[0], "target", {
                  writable: !1,
                  value: this,
                }));
              const i = s[`on${o}`];
              i && i.apply(s, n);
              const c = r(o).concat(r("*"));
              for (let e = 0; e < c.length; e++) c[e].apply(s, n);
            },
            _has: (e) => !(!n[e] && !s[`on${e}`]),
          };
        return (
          t &&
            ((s.listeners = (t) => e(r(t))),
            (s.on = s.addEventListener),
            (s.off = s.removeEventListener),
            (s.fire = s.dispatchEvent),
            (s.once = function (e, t) {
              var n = function () {
                return s.off(e, n), t.apply(null, arguments);
              };
              return s.on(e, n);
            }),
            (s.destroy = () => (n = {}))),
          s
        );
      };
    var d = function (e, t) {
      switch (typeof e) {
        case "object":
          return (
            (n = e),
            Object.entries(n)
              .map(([e, t]) => `${e.toLowerCase()}: ${t}`)
              .join("\r\n")
          );
        case "string":
          return (function (e, t) {
            const n = e.split("\r\n");
            null == t && (t = {});
            for (let e of n)
              if (/([^:]+):\s*(.+)/.test(e)) {
                const e = null != RegExp.$1 ? RegExp.$1.toLowerCase() : void 0,
                  n = RegExp.$2;
                null == t[e] && (t[e] = n);
              }
            return t;
          })(e, t);
      }
      var n;
      return [];
    };
    const f = u(!0),
      p = (e) => (void 0 === e ? null : e),
      h = n.XMLHttpRequest,
      v = function () {
        const e = new h(),
          t = {};
        let n,
          r,
          i,
          l = null;
        var v = 0;
        const y = function () {
            if (
              ((i.status = l || e.status),
              -1 !== l && (i.statusText = e.statusText),
              -1 === l)
            );
            else {
              const t = d(e.getAllResponseHeaders());
              for (let e in t) {
                const n = t[e];
                if (!i.headers[e]) {
                  const t = e.toLowerCase();
                  i.headers[t] = n;
                }
              }
            }
          },
          m = function () {
            (x.status = i.status), (x.statusText = i.statusText);
          },
          g = function () {
            n || x.dispatchEvent("load", {}),
              x.dispatchEvent("loadend", {}),
              n && (x.readyState = 0);
          },
          b = function (e) {
            for (; e > v && v < 4; )
              (x.readyState = ++v),
                1 === v && x.dispatchEvent("loadstart", {}),
                2 === v && m(),
                4 === v &&
                  (m(),
                  "text" in i && (x.responseText = i.text),
                  "xml" in i && (x.responseXML = i.xml),
                  "data" in i && (x.response = i.data),
                  "finalUrl" in i && (x.responseURL = i.finalUrl)),
                x.dispatchEvent("readystatechange", {}),
                4 === v && (!1 === t.async ? g() : setTimeout(g, 0));
          },
          E = function (e) {
            if (4 !== e) return void b(e);
            const n = f.listeners("after");
            var r = function () {
              if (n.length > 0) {
                const e = n.shift();
                2 === e.length
                  ? (e(t, i), r())
                  : 3 === e.length && t.async
                  ? e(t, i, r)
                  : r();
              } else b(4);
            };
            r();
          };
        var x = u();
        (t.xhr = x),
          (e.onreadystatechange = function (t) {
            try {
              2 === e.readyState && y();
            } catch (e) {}
            4 === e.readyState &&
              ((r = !1),
              y(),
              (function () {
                if (e.responseType && "text" !== e.responseType)
                  "document" === e.responseType
                    ? ((i.xml = e.responseXML), (i.data = e.responseXML))
                    : (i.data = e.response);
                else {
                  (i.text = e.responseText), (i.data = e.responseText);
                  try {
                    i.xml = e.responseXML;
                  } catch (e) {}
                }
                "responseURL" in e && (i.finalUrl = e.responseURL);
              })()),
              E(e.readyState);
          });
        const O = function () {
          n = !0;
        };
        x.addEventListener("error", O),
          x.addEventListener("timeout", O),
          x.addEventListener("abort", O),
          x.addEventListener("progress", function (t) {
            v < 3
              ? E(3)
              : e.readyState <= 3 && x.dispatchEvent("readystatechange", {});
          }),
          "withCredentials" in e && (x.withCredentials = !1),
          (x.status = 0);
        for (let e of Array.from(o.concat(s))) x[`on${e}`] = null;
        if (
          ((x.open = function (e, s, o, a, c) {
            (v = 0),
              (n = !1),
              (r = !1),
              (t.headers = {}),
              (t.headerNames = {}),
              (t.status = 0),
              (t.method = e),
              (t.url = s),
              (t.async = !1 !== o),
              (t.user = a),
              (t.pass = c),
              (i = {}),
              (i.headers = {}),
              E(1);
          }),
          (x.send = function (n) {
            let l, u;
            for (l of ["type", "timeout", "withCredentials"])
              (u = "type" === l ? "responseType" : l), u in x && (t[l] = x[u]);
            t.body = n;
            const d = f.listeners("before");
            var p = function () {
              if (!d.length)
                return (function () {
                  for (l of (c(o, e, x),
                  x.upload && c(o.concat(s), e.upload, x.upload),
                  (r = !0),
                  e.open(t.method, t.url, t.async, t.user, t.pass),
                  ["type", "timeout", "withCredentials"]))
                    (u = "type" === l ? "responseType" : l),
                      l in t && (e[u] = t[l]);
                  for (let n in t.headers) {
                    const r = t.headers[n];
                    n && e.setRequestHeader(n, r);
                  }
                  e.send(t.body);
                })();
              const n = function (e) {
                if (
                  "object" == typeof e &&
                  ("number" == typeof e.status || "number" == typeof i.status)
                )
                  return (
                    a(e, i),
                    "data" in e || (e.data = e.response || e.text),
                    void E(4)
                  );
                p();
              };
              (n.head = function (e) {
                a(e, i), E(2);
              }),
                (n.progress = function (e) {
                  a(e, i), E(3);
                });
              const f = d.shift();
              1 === f.length
                ? n(f(t))
                : 2 === f.length && t.async
                ? f(t, n)
                : n();
            };
            p();
          }),
          (x.abort = function () {
            (l = -1), r ? e.abort() : x.dispatchEvent("abort", {});
          }),
          (x.setRequestHeader = function (e, n) {
            const r = null != e ? e.toLowerCase() : void 0,
              s = (t.headerNames[r] = t.headerNames[r] || e);
            t.headers[s] && (n = t.headers[s] + ", " + n), (t.headers[s] = n);
          }),
          (x.getResponseHeader = (e) =>
            p(i.headers[e ? e.toLowerCase() : void 0])),
          (x.getAllResponseHeaders = () => p(d(i.headers))),
          e.overrideMimeType &&
            (x.overrideMimeType = function () {
              e.overrideMimeType.apply(e, arguments);
            }),
          e.upload)
        ) {
          let e = u();
          (x.upload = e), (t.upload = e);
        }
        return (
          (x.UNSENT = 0),
          (x.OPENED = 1),
          (x.HEADERS_RECEIVED = 2),
          (x.LOADING = 3),
          (x.DONE = 4),
          (x.response = ""),
          (x.responseText = ""),
          (x.responseXML = null),
          (x.readyState = 0),
          (x.statusText = ""),
          x
        );
      };
    (v.UNSENT = 0),
      (v.OPENED = 1),
      (v.HEADERS_RECEIVED = 2),
      (v.LOADING = 3),
      (v.DONE = 4);
    var y = {
      patch() {
        h && (n.XMLHttpRequest = v);
      },
      unpatch() {
        h && (n.XMLHttpRequest = h);
      },
      Native: h,
      Xhook: v,
    };
    const m = n.fetch;
    function g(e) {
      return e instanceof Headers
        ? b([...e.entries()])
        : Array.isArray(e)
        ? b(e)
        : e;
    }
    function b(e) {
      return e.reduce((e, [t, n]) => ((e[t] = n), e), {});
    }
    const E = function (e, t = { headers: {} }) {
      let n = Object.assign(Object.assign({}, t), { isFetch: !0 });
      if (e instanceof Request) {
        const r = (function (e) {
            let t = {};
            return (
              [
                "method",
                "headers",
                "body",
                "mode",
                "credentials",
                "cache",
                "redirect",
                "referrer",
                "referrerPolicy",
                "integrity",
                "keepalive",
                "signal",
                "url",
              ].forEach((n) => (t[n] = e[n])),
              t
            );
          })(e),
          s = Object.assign(Object.assign({}, g(r.headers)), g(n.headers));
        n = Object.assign(Object.assign(Object.assign({}, r), t), {
          headers: s,
          acceptedRequest: !0,
        });
      } else n.url = e;
      const r = f.listeners("before"),
        s = f.listeners("after");
      return new Promise(function (t, o) {
        let i = t;
        const a = function (e) {
            if (!s.length) return i(e);
            const t = s.shift();
            return 2 === t.length
              ? (t(n, e), a(e))
              : 3 === t.length
              ? t(n, e, a)
              : a(e);
          },
          c = function (e) {
            if (void 0 !== e) {
              const n = new Response(e.body || e.text, e);
              return t(n), void a(n);
            }
            l();
          },
          l = function () {
            if (!r.length) return void u();
            const e = r.shift();
            return 1 === e.length ? c(e(n)) : 2 === e.length ? e(n, c) : void 0;
          },
          u = () =>
            (function (e, t, n, r) {
              return new (n || (n = Promise))(function (s, o) {
                function i(e) {
                  try {
                    c(r.next(e));
                  } catch (e) {
                    o(e);
                  }
                }
                function a(e) {
                  try {
                    c(r.throw(e));
                  } catch (e) {
                    o(e);
                  }
                }
                function c(e) {
                  var t;
                  e.done
                    ? s(e.value)
                    : ((t = e.value),
                      t instanceof n
                        ? t
                        : new n(function (e) {
                            e(t);
                          })).then(i, a);
                }
                c((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              const { url: t, isFetch: r, acceptedRequest: s } = n,
                c = (function (e, t) {
                  var n = {};
                  for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) &&
                      t.indexOf(r) < 0 &&
                      (n[r] = e[r]);
                  if (
                    null != e &&
                    "function" == typeof Object.getOwnPropertySymbols
                  ) {
                    var s = 0;
                    for (r = Object.getOwnPropertySymbols(e); s < r.length; s++)
                      t.indexOf(r[s]) < 0 &&
                        Object.prototype.propertyIsEnumerable.call(e, r[s]) &&
                        (n[r[s]] = e[r[s]]);
                  }
                  return n;
                })(n, ["url", "isFetch", "acceptedRequest"]);
              return (
                e instanceof Request &&
                  c.body instanceof ReadableStream &&
                  (c.body = yield new Response(c.body).text()),
                m(t, c)
                  .then((e) => a(e))
                  .catch(function (e) {
                    return (i = o), a(e), o(e);
                  })
              );
            });
        l();
      });
    };
    var x = {
      patch() {
        m && (n.fetch = E);
      },
      unpatch() {
        m && (n.fetch = m);
      },
      Native: m,
      Xhook: E,
    };
    const O = f;
    return (
      (O.EventEmitter = u),
      (O.before = function (e, t) {
        if (e.length < 1 || e.length > 2) throw "invalid hook";
        return O.on("before", e, t);
      }),
      (O.after = function (e, t) {
        if (e.length < 2 || e.length > 3) throw "invalid hook";
        return O.on("after", e, t);
      }),
      (O.enable = function () {
        y.patch(), x.patch();
      }),
      (O.disable = function () {
        y.unpatch(), x.unpatch();
      }),
      (O.XMLHttpRequest = y.Native),
      (O.fetch = x.Native),
      (O.headers = d),
      O.enable(),
      O
    );
  })().after(function (r, s) {
    const o = r.url;
    if (o.includes("api.chzzk.naver.com/service/v1.1/home/recommended")) {
      const r = JSON.parse(s.text);
      (r.content.topRecommendedLives = r.content.topRecommendedLives.filter(
        (e) => !t.includes(e.channel.channelId)
      )),
        (r.content.recommendedContents = r.content.recommendedContents
          .map(
            (n) => (
              n.lives &&
                (n.lives = n.lives.filter((n) => {
                  for (const t of e) if (n.tags.includes(t)) return !1;
                  return !t.includes(n.channel.channelId);
                })),
              n.videos &&
                (n.videos = n.videos.filter(
                  (e) => !t.includes(e.channel.channelId)
                )),
              n.clips &&
                (n.clips = n.clips.filter(
                  (e) => !t.includes(e.ownerChannel.channelId)
                )),
              n
            )
          )
          .filter(
            (e) =>
              !n.includes(e.title) &&
              (!("videos" in e) || 0 !== e.videos.length) &&
              (!("lives" in e) || 0 !== e.lives.length) &&
              (!("clips" in e) || 0 !== e.clips.length)
          )),
        (s.text = JSON.stringify(r));
    } else if (
      (o.includes("api.chzzk.naver.com/service/v2/categories/") &&
        o.includes("/lives")) ||
      o.includes("api.chzzk.naver.com/service/v1/lives") ||
      o.includes("api.chzzk.naver.com/service/v1/watch-party-lives") ||
      o.includes(
        "api.chzzk.naver.com/service/v1/follower-high-record-components/lives"
      ) ||
      (o.includes("api.chzzk.naver.com/service/v1/manual-components/") &&
        o.includes("/lives"))
    ) {
      const n = JSON.parse(s.text);
      (n.content.data = n.content.data.filter((n) => {
        if (t.includes(n.channel.channelId)) return !1;
        for (const t of e) if (n.tags.includes(t)) return !1;
        return !0;
      })),
        (s.text = JSON.stringify(n));
    } else if (
      o.includes("api.chzzk.naver.com/service/v1/streamer-partners/recommended")
    ) {
      const e = JSON.parse(s.text);
      (e.content.streamerPartners = e.content.streamerPartners.filter(
        (e) => !t.includes(e.channelId)
      )),
        (s.text = JSON.stringify(e));
    }
  });
})();
