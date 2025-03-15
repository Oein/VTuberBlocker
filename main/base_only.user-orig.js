// ==UserScript==
// @name         Vtuber Only
// @namespace    https://vblock.oein.kr/
// @homepageURL  https://vblock.oein.kr/only.html
// @supportURL   https://github.com/Oein/VTuberBlocker/issues
// @version      $version
// @license      MIT
// @author       Oein
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chzzk.naver.com
// @description  Blocks VTuber content from Chzzk recommendations
// @match        https://chzzk.naver.com/*
// @match        https://chzzk.naver.com/
// @match        http://chzzk.naver.com/*
// @match        http://chzzk.naver.com/
// @updateURL    https://vblock.oein.kr/dist-only.user.js
// @downloadURL  https://vblock.oein.kr/dist-only.user.js
// @grant        none
// @run-at       document-start
// @copyright    Copyright (c) 2025 Oein
// ==/UserScript==

//XHook - v1.6.2 - https://github.com/jpillora/xhook
//Jaime Pillora <dev@jpillora.com> - MIT Copyright 2023

(function () {
  var VTuberTags = ["$0"];
  var VTuberChannels = "$1"
    .split("@")
    .map((t) =>
      Array.from(atob(t + "=="), (t) =>
        t.charCodeAt(0).toString(16).padStart(2, "0")
      ).join("")
    );
  var VTuberCats = ["$2"];

  let isVBlock = false;
  let block = !isVBlock;
  let allow = isVBlock;

  // load user custom block list from localStorage
  const tags_so = localStorage.getItem("vbtag");
  if (tags_so) {
    // split by enter
    const split = tags_so
      .split("\n")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    VTuberTags = VTuberTags.concat(split);
  }

  const channels_so = localStorage.getItem("vbchannel");
  if (channels_so) {
    // split by enter
    const split = channels_so
      .split("\n")
      .map((t) => {
        const res = t.trim();
        return res
          .replace("https://chzzk.naver.com/", "")
          .replace("http://chzzk.naver.com/", "");
      })
      .filter((t) => t.length == 32);
    VTuberChannels = VTuberChannels.concat(split);
  }

  const cats_so = localStorage.getItem("vbcat");
  if (cats_so) {
    // split by enter
    const split = cats_so
      .split("\n")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    VTuberCats = VTuberCats.concat(split);
  }

  // prettier-ignore
  var xhook=function(){"use strict";const e=(e,t)=>Array.prototype.slice.call(e,t);let t=null;"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?t=self:"undefined"!=typeof global?t=global:window&&(t=window);const n=t,o=t.document,r=["load","loadend","loadstart"],s=["progress","abort","error","timeout"],a=e=>["returnValue","totalSize","position"].includes(e),i=function(e,t){for(let n in e){if(a(n))continue;const o=e[n];try{t[n]=o}catch(e){}}return t},c=function(e,t,n){const o=e=>function(o){const r={};for(let e in o){if(a(e))continue;const s=o[e];r[e]=s===t?n:s}return n.dispatchEvent(e,r)};for(let r of Array.from(e))n._has(r)&&(t[`on${r}`]=o(r))},u=function(e){if(o&&null!=o.createEventObject){const t=o.createEventObject();return t.type=e,t}try{return new Event(e)}catch(t){return{type:e}}},l=function(t){let n={};const o=e=>n[e]||[],r={addEventListener:function(e,t,r){n[e]=o(e),n[e].indexOf(t)>=0||(r=void 0===r?n[e].length:r,n[e].splice(r,0,t))},removeEventListener:function(e,t){if(void 0===e)return void(n={});void 0===t&&(n[e]=[]);const r=o(e).indexOf(t);-1!==r&&o(e).splice(r,1)},dispatchEvent:function(){const n=e(arguments),s=n.shift();t||(n[0]=i(n[0],u(s)),Object.defineProperty(n[0],"target",{writable:!1,value:this}));const a=r[`on${s}`];a&&a.apply(r,n);const c=o(s).concat(o("*"));for(let e=0;e<c.length;e++){c[e].apply(r,n)}},_has:e=>!(!n[e]&&!r[`on${e}`])};return t&&(r.listeners=t=>e(o(t)),r.on=r.addEventListener,r.off=r.removeEventListener,r.fire=r.dispatchEvent,r.once=function(e,t){var n=function(){return r.off(e,n),t.apply(null,arguments)};return r.on(e,n)},r.destroy=()=>n={}),r};var f=function(e,t){switch(typeof e){case"object":return n=e,Object.entries(n).map((([e,t])=>`${e.toLowerCase()}: ${t}`)).join("\r\n");case"string":return function(e,t){const n=e.split("\r\n");null==t&&(t={});for(let e of n)if(/([^:]+):\s*(.+)/.test(e)){const e=null!=RegExp.$1?RegExp.$1.toLowerCase():void 0,n=RegExp.$2;null==t[e]&&(t[e]=n)}return t}(e,t)}var n;return[]};const d=l(!0),p=e=>void 0===e?null:e,h=n.XMLHttpRequest,y=function(){const e=new h,t={};let n,o,a,u=null;var y=0;const v=function(){if(a.status=u||e.status,-1!==u&&(a.statusText=e.statusText),-1===u);else{const t=f(e.getAllResponseHeaders());for(let e in t){const n=t[e];if(!a.headers[e]){const t=e.toLowerCase();a.headers[t]=n}}}},b=function(){x.status=a.status,x.statusText=a.statusText},g=function(){n||x.dispatchEvent("load",{}),x.dispatchEvent("loadend",{}),n&&(x.readyState=0)},E=function(e){for(;e>y&&y<4;)x.readyState=++y,1===y&&x.dispatchEvent("loadstart",{}),2===y&&b(),4===y&&(b(),"text"in a&&(x.responseText=a.text),"xml"in a&&(x.responseXML=a.xml),"data"in a&&(x.response=a.data),"finalUrl"in a&&(x.responseURL=a.finalUrl)),x.dispatchEvent("readystatechange",{}),4===y&&(!1===t.async?g():setTimeout(g,0))},m=function(e){if(4!==e)return void E(e);const n=d.listeners("after");var o=function(){if(n.length>0){const e=n.shift();2===e.length?(e(t,a),o()):3===e.length&&t.async?e(t,a,o):o()}else E(4)};o()};var x=l();t.xhr=x,e.onreadystatechange=function(t){try{2===e.readyState&&v()}catch(e){}4===e.readyState&&(o=!1,v(),function(){if(e.responseType&&"text"!==e.responseType)"document"===e.responseType?(a.xml=e.responseXML,a.data=e.responseXML):a.data=e.response;else{a.text=e.responseText,a.data=e.responseText;try{a.xml=e.responseXML}catch(e){}}"responseURL"in e&&(a.finalUrl=e.responseURL)}()),m(e.readyState)};const w=function(){n=!0};x.addEventListener("error",w),x.addEventListener("timeout",w),x.addEventListener("abort",w),x.addEventListener("progress",(function(t){y<3?m(3):e.readyState<=3&&x.dispatchEvent("readystatechange",{})})),"withCredentials"in e&&(x.withCredentials=!1),x.status=0;for(let e of Array.from(s.concat(r)))x[`on${e}`]=null;if(x.open=function(e,r,s,i,c){y=0,n=!1,o=!1,t.headers={},t.headerNames={},t.status=0,t.method=e,t.url=r,t.async=!1!==s,t.user=i,t.pass=c,a={},a.headers={},m(1)},x.send=function(n){let u,l;for(u of["type","timeout","withCredentials"])l="type"===u?"responseType":u,l in x&&(t[u]=x[l]);t.body=n;const f=d.listeners("before");var p=function(){if(!f.length)return function(){for(u of(c(s,e,x),x.upload&&c(s.concat(r),e.upload,x.upload),o=!0,e.open(t.method,t.url,t.async,t.user,t.pass),["type","timeout","withCredentials"]))l="type"===u?"responseType":u,u in t&&(e[l]=t[u]);for(let n in t.headers){const o=t.headers[n];n&&e.setRequestHeader(n,o)}e.send(t.body)}();const n=function(e){if("object"==typeof e&&("number"==typeof e.status||"number"==typeof a.status))return i(e,a),"data"in e||(e.data=e.response||e.text),void m(4);p()};n.head=function(e){i(e,a),m(2)},n.progress=function(e){i(e,a),m(3)};const d=f.shift();1===d.length?n(d(t)):2===d.length&&t.async?d(t,n):n()};p()},x.abort=function(){u=-1,o?e.abort():x.dispatchEvent("abort",{})},x.setRequestHeader=function(e,n){const o=null!=e?e.toLowerCase():void 0,r=t.headerNames[o]=t.headerNames[o]||e;t.headers[r]&&(n=t.headers[r]+", "+n),t.headers[r]=n},x.getResponseHeader=e=>p(a.headers[e?e.toLowerCase():void 0]),x.getAllResponseHeaders=()=>p(f(a.headers)),e.overrideMimeType&&(x.overrideMimeType=function(){e.overrideMimeType.apply(e,arguments)}),e.upload){let e=l();x.upload=e,t.upload=e}return x.UNSENT=0,x.OPENED=1,x.HEADERS_RECEIVED=2,x.LOADING=3,x.DONE=4,x.response="",x.responseText="",x.responseXML=null,x.readyState=0,x.statusText="",x};y.UNSENT=0,y.OPENED=1,y.HEADERS_RECEIVED=2,y.LOADING=3,y.DONE=4;var v={patch(){h&&(n.XMLHttpRequest=y)},unpatch(){h&&(n.XMLHttpRequest=h)},Native:h,Xhook:y};function b(e,t,n,o){return new(n||(n=Promise))((function(r,s){function a(e){try{c(o.next(e))}catch(e){s(e)}}function i(e){try{c(o.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,i)}c((o=o.apply(e,t||[])).next())}))}const g=n.fetch;function E(e){return e instanceof Headers?m([...e.entries()]):Array.isArray(e)?m(e):e}function m(e){return e.reduce(((e,[t,n])=>(e[t]=n,e)),{})}const x=function(e,t={headers:{}}){let n=Object.assign(Object.assign({},t),{isFetch:!0});if(e instanceof Request){const o=function(e){let t={};return["method","headers","body","mode","credentials","cache","redirect","referrer","referrerPolicy","integrity","keepalive","signal","url"].forEach((n=>t[n]=e[n])),t}(e),r=Object.assign(Object.assign({},E(o.headers)),E(n.headers));n=Object.assign(Object.assign(Object.assign({},o),t),{headers:r,acceptedRequest:!0})}else n.url=e;const o=d.listeners("before"),r=d.listeners("after");return new Promise((function(t,s){let a=t;const i=function(e){if(!r.length)return a(e);const t=r.shift();return 2===t.length?(t(n,e),i(e)):3===t.length?t(n,e,i):i(e)},c=function(e){if(void 0!==e){const n=new Response(e.body||e.text,e);return t(n),void i(n)}u()},u=function(){if(!o.length)return void l();const e=o.shift();return 1===e.length?c(e(n)):2===e.length?e(n,c):void 0},l=()=>b(this,void 0,void 0,(function*(){const{url:t,isFetch:o,acceptedRequest:r}=n,c=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]])}return n}(n,["url","isFetch","acceptedRequest"]);return e instanceof Request&&c.body instanceof ReadableStream&&(c.body=yield new Response(c.body).text()),g(t,c).then((e=>i(e))).catch((function(e){return a=s,i(e),s(e)}))}));u()}))};var w={patch(){g&&(n.fetch=x)},unpatch(){g&&(n.fetch=g)},Native:g,Xhook:x};const O=d;return O.EventEmitter=l,O.before=function(e,t){if(e.length<1||e.length>2)throw"invalid hook";return O.on("before",e,t)},O.after=function(e,t){if(e.length<2||e.length>3)throw"invalid hook";return O.on("after",e,t)},O.enable=function(){v.patch(),w.patch()},O.disable=function(){v.unpatch(),w.unpatch()},O.XMLHttpRequest=v.Native,O.fetch=w.Native,O.headers=f,O.enable(),O}();

  xhook.after(function (request, response) {
    const url = request.url;
    if (url.includes("api.chzzk.naver.com/service/v1.1/home/recommended")) {
      const origin = JSON.parse(response.text);
      origin.content.topRecommendedLives =
        origin.content.topRecommendedLives.filter((live) => {
          if (VTuberChannels.includes(live.channel.channelId)) return block;
          return allow;
        });
      origin.content.recommendedContents = origin.content.recommendedContents
        .map((content) => {
          if (content.lives) {
            content.lives = content.lives.filter((live) => {
              for (const tag of VTuberTags) {
                if (live.tags.includes(tag)) return block;
              }
              if (VTuberChannels.includes(live.channel.channelId)) return block;
              return allow;
            });
          }
          if (content.videos) {
            content.videos = content.videos.filter((video) => {
              if (VTuberChannels.includes(video.channel.channelId))
                return block;
              return allow;
            });
          }
          if (content.clips) {
            content.clips = content.clips.filter((clip) => {
              if (VTuberChannels.includes(clip.ownerChannel.channelId))
                return block;
              return allow;
            });
          }
          return content;
        })
        .filter((content) => {
          if (isVBlock && VTuberCats.includes(content.title)) return false;
          if ("videos" in content && content.videos.length === 0) return false;
          if ("lives" in content && content.lives.length === 0) return false;
          if ("clips" in content && content.clips.length === 0) return false;
          return true;
        });
      response.text = JSON.stringify(origin);
    } else if (
      (url.includes("api.chzzk.naver.com/service/v2/categories/") &&
        url.includes("/lives")) ||
      url.includes("api.chzzk.naver.com/service/v1/lives") ||
      url.includes("api.chzzk.naver.com/service/v1/watch-party-lives") ||
      url.includes(
        "api.chzzk.naver.com/service/v1/follower-high-record-components/lives"
      ) ||
      (url.includes("api.chzzk.naver.com/service/v1/manual-components/") &&
        url.includes("/lives"))
    ) {
      const origin = JSON.parse(response.text);
      origin.content.data = origin.content.data.filter((content) => {
        if (VTuberChannels.includes(content.channel.channelId)) return block;
        for (const tag of VTuberTags) {
          if (content.tags.includes(tag)) return block;
        }
        return allow;
      });
      response.text = JSON.stringify(origin);
    } else if (
      url.includes(
        "api.chzzk.naver.com/service/v1/streamer-partners/recommended"
      )
    ) {
      const origin = JSON.parse(response.text);
      origin.content.streamerPartners = origin.content.streamerPartners.filter(
        (content) => {
          if (VTuberChannels.includes(content.channelId)) return block;
          return allow;
        }
      );
      response.text = JSON.stringify(origin);
    }
  });

  const editor = (() => {
    let editorEl = null;
    let backdropEl = null;
    let isOpen = false;

    const createEditor = () => {
      // Create backdrop
      backdropEl = document.createElement("div");
      backdropEl.style.position = "fixed";
      backdropEl.style.top = "0";
      backdropEl.style.left = "0";
      backdropEl.style.width = "100%";
      backdropEl.style.height = "100%";
      backdropEl.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      backdropEl.style.zIndex = "99998";
      backdropEl.style.display = "none";

      // Create editor container
      editorEl = document.createElement("div");
      editorEl.style.position = "fixed";
      editorEl.style.top = "50%";
      editorEl.style.left = "50%";
      editorEl.style.transform = "translate(-50%, -50%)";
      editorEl.style.width = "600px";
      editorEl.style.maxWidth = "90%";
      editorEl.style.backgroundColor = "var(--color-bg-01, #1F1F21)";
      editorEl.style.borderRadius = "8px";
      editorEl.style.padding = "20px";
      editorEl.style.zIndex = "99999";
      editorEl.style.display = "none";
      editorEl.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.5)";
      editorEl.style.color = "var(--color-text-01, #FFFFFF)";

      const header = document.createElement("div");
      header.style.display = "flex";
      header.style.justifyContent = "space-between";
      header.style.marginBottom = "20px";

      const title = document.createElement("h2");
      title.textContent = "VTuber Only Settings";
      title.style.margin = "0";
      title.style.fontSize = "18px";

      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = "✕";
      closeBtn.style.background = "none";
      closeBtn.style.border = "none";
      closeBtn.style.cursor = "pointer";
      closeBtn.style.fontSize = "20px";
      closeBtn.style.color = "inherit";
      closeBtn.onclick = close;

      header.appendChild(title);
      header.appendChild(closeBtn);
      editorEl.appendChild(header);

      // Create sections
      const createSection = (title, storageKey, placeholder) => {
        const section = document.createElement("div");
        section.style.marginBottom = "20px";

        const label = document.createElement("label");
        label.textContent = title;
        label.style.display = "block";
        label.style.marginBottom = "5px";
        label.style.fontWeight = "500";

        const textarea = document.createElement("textarea");
        textarea.id = `vb-editor-${storageKey}`;
        textarea.style.width = "100%";
        textarea.style.height = "120px";
        textarea.style.padding = "10px";
        textarea.style.borderRadius = "4px";
        textarea.style.border = "1px solid var(--color-border-02, #333333)";
        textarea.style.backgroundColor = "var(--color-bg-02, #2B2B2D)";
        textarea.style.color = "inherit";
        textarea.style.resize = "vertical";
        textarea.style.fontFamily = "monospace";
        textarea.placeholder = placeholder;

        // Load data from localStorage
        const savedData = localStorage.getItem(storageKey);
        if (savedData) {
          textarea.value = savedData;
        }

        section.appendChild(label);
        section.appendChild(textarea);

        return section;
      };

      editorEl.appendChild(
        createSection(
          "Allowed Tags (one per line)",
          "vbtag",
          "Enter tags to allow, one per line"
        )
      );

      editorEl.appendChild(
        createSection(
          "Allowed Channel IDs (one per line)",
          "vbchannel",
          "Enter channel IDs or channel URLs to allow, one per line"
        )
      );

      editorEl.appendChild(
        createSection(
          "Allowed Categories (one per line)",
          "vbcat",
          "Enter categories to allow, one per line"
        )
      );

      // Create actions
      const actions = document.createElement("div");
      actions.style.display = "flex";
      actions.style.justifyContent = "flex-end";
      actions.style.gap = "10px";

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.style.padding = "8px 16px";
      saveBtn.style.borderRadius = "4px";
      saveBtn.style.border = "none";
      saveBtn.style.backgroundColor = "#00D564";
      saveBtn.style.color = "#000";
      saveBtn.style.cursor = "pointer";
      saveBtn.style.fontWeight = "bold";

      saveBtn.onclick = () => {
        // Save to localStorage
        localStorage.setItem(
          "vbtag",
          document.getElementById("vb-editor-vbtag").value
        );
        localStorage.setItem(
          "vbchannel",
          document.getElementById("vb-editor-vbchannel").value
        );
        localStorage.setItem(
          "vbcat",
          document.getElementById("vb-editor-vbcat").value
        );

        // Show saved notification
        const notification = document.createElement("div");
        notification.textContent =
          "Settings saved! Refresh the page to apply changes.";
        notification.style.position = "fixed";
        notification.style.bottom = "20px";
        notification.style.left = "50%";
        notification.style.transform = "translateX(-50%)";
        notification.style.backgroundColor = "#00D564";
        notification.style.color = "#000";
        notification.style.padding = "10px 20px";
        notification.style.borderRadius = "4px";
        notification.style.zIndex = "100000";
        document.body.appendChild(notification);

        setTimeout(() => {
          document.body.removeChild(notification);
        }, 3000);
      };

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.style.padding = "8px 16px";
      cancelBtn.style.borderRadius = "4px";
      cancelBtn.style.border = "1px solid var(--color-border-02, #333333)";
      cancelBtn.style.backgroundColor = "transparent";
      cancelBtn.style.color = "inherit";
      cancelBtn.style.cursor = "pointer";
      cancelBtn.onclick = close;

      actions.appendChild(cancelBtn);
      actions.appendChild(saveBtn);
      editorEl.appendChild(actions);

      // Append to body
      document.body.appendChild(backdropEl);
      document.body.appendChild(editorEl);
    };

    const open = () => {
      if (!editorEl) {
        createEditor();
      }
      backdropEl.style.display = "block";
      editorEl.style.display = "block";
      isOpen = true;
    };

    const close = () => {
      if (backdropEl && editorEl) {
        backdropEl.style.display = "none";
        editorEl.style.display = "none";
      }
      isOpen = false;
    };

    const toggle = () => {
      if (isOpen) {
        close();
        isOpen = false;
      } else {
        open();
        isOpen = true;
      }
    };

    return toggle;
  })();

  const editorOpenButton = document.createElement("div");
  editorOpenButton.style.marginRight = "3px";
  editorOpenButton.style.color = "inherit";
  editorOpenButton.style.flex = "none";
  editorOpenButton.style.position = "relative";
  editorOpenButton.style.width = "40px";
  editorOpenButton.style.height = "40px";
  editorOpenButton.style.borderRadius = "6px";
  editorOpenButton.style.display = "flex";
  editorOpenButton.style.alignItems = "center";
  editorOpenButton.style.justifyContent = "center";
  editorOpenButton.style.cursor = "pointer";

  editorOpenButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" class="header_icon__8SHkt"><rect width="17.001" height="1.615" x="3.681" y="7.22" fill="currentColor" rx="0.808" transform="rotate(24.95 3.681 7.22)"></rect><rect width="17.062" height="1.615" fill="currentColor" rx="0.808" transform="scale(1 -1) rotate(24.949 43.317 -.855)"></rect><path stroke="currentColor" stroke-width="1.5" d="M21.55 18.384a3.47 3.47 0 1 1-6.94 0 3.47 3.47 0 0 1 6.94 0ZM21.55 7.22a3.47 3.47 0 1 1-6.94 0 3.47 3.47 0 0 1 6.94 0Z"></path></svg>`;
  editorOpenButton.onclick = editor;

  const span = document.createElement("span");
  span.style.fontSize = "12px";
  span.style.left = "50%";
  span.style.letterSpacing = "-.3px";
  span.style.lineHeight = "14px";
  span.style.position = "absolute";
  span.style.top = "calc(100% + 2px)";
  span.style.whiteSpace = "nowrap";
  span.style.backgroundColor = "var(--color-bg-04)";
  span.style.borderRadius = "6px";
  span.style.display = "none";
  span.style.padding = "5px 9px";
  span.style.transform = "translateX(-50%)";
  span.innerText = "VTuber Only";
  editorOpenButton.appendChild(span);

  editorOpenButton.onmouseover = () => {
    editorOpenButton.style.backgroundColor = "#69696A";
    span.style.display = "block";
  };
  editorOpenButton.onmouseout = () => {
    editorOpenButton.style.backgroundColor = "transparent";
    span.style.display = "none";
  };

  editorOpenButton.id = "vblock-editor-open";
  setInterval(() => {
    if (!document.getElementById("vblock-editor-open")) {
      const header = document.querySelector(`[class*=toolbar_section]`);
      if (header) {
        header.insertBefore(editorOpenButton, header.firstChild);
      }
    }

    const sContainer = document.querySelector(`[class*=search_container]`);
    if (sContainer) {
      sContainer.style.left = "min(50%,250px)";
      sContainer.style.transform = "translateX(0px)";
    }
  }, 1000);
})();
