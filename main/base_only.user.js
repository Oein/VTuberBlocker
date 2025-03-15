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

var e=["$0"],t="$1".split("@").map((e=>Array.from(atob(e+"=="),(e=>e.charCodeAt(0).toString(16).padStart(2,"0"))).join(""))),n=["$2"];let o=!1,r=!0,s=o;const l=localStorage.getItem("vbtag");if(l){const t=l.split("\n").map((e=>e.trim())).filter((e=>e.length>0));e=e.concat(t)}const a=localStorage.getItem("vbchannel");if(a){const e=a.split("\n").map((e=>e.trim().replace("https://chzzk.naver.com/","").replace("http://chzzk.naver.com/",""))).filter((e=>32==e.length));t=t.concat(e)}const i=localStorage.getItem("vbcat");if(i){const e=i.split("\n").map((e=>e.trim())).filter((e=>e.length>0));n=n.concat(e)}(function(){"use strict";const e=(e,t)=>Array.prototype.slice.call(e,t);let t=null;"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?t=self:"undefined"!=typeof global?t=global:window&&(t=window);const n=t,o=t.document,r=["load","loadend","loadstart"],s=["progress","abort","error","timeout"],l=e=>["returnValue","totalSize","position"].includes(e),a=function(e,t){for(let n in e){if(l(n))continue;const o=e[n];try{t[n]=o}catch(e){}}return t},i=function(e,t,n){const o=e=>function(o){const r={};for(let e in o){if(l(e))continue;const s=o[e];r[e]=s===t?n:s}return n.dispatchEvent(e,r)};for(let r of Array.from(e))n._has(r)&&(t[`on${r}`]=o(r))},c=function(e){if(o&&null!=o.createEventObject){const t=o.createEventObject();return t.type=e,t}try{return new Event(e)}catch(t){return{type:e}}},d=function(t){let n={};const o=e=>n[e]||[],r={addEventListener:function(e,t,r){n[e]=o(e),n[e].indexOf(t)>=0||(r=void 0===r?n[e].length:r,n[e].splice(r,0,t))},removeEventListener:function(e,t){if(void 0===e)return void(n={});void 0===t&&(n[e]=[]);const r=o(e).indexOf(t);-1!==r&&o(e).splice(r,1)},dispatchEvent:function(){const n=e(arguments),s=n.shift();t||(n[0]=a(n[0],c(s)),Object.defineProperty(n[0],"target",{writable:!1,value:this}));const l=r[`on${s}`];l&&l.apply(r,n);const i=o(s).concat(o("*"));for(let e=0;e<i.length;e++)i[e].apply(r,n)},_has:e=>!(!n[e]&&!r[`on${e}`])};return t&&(r.listeners=t=>e(o(t)),r.on=r.addEventListener,r.off=r.removeEventListener,r.fire=r.dispatchEvent,r.once=function(e,t){var n=function(){return r.off(e,n),t.apply(null,arguments)};return r.on(e,n)},r.destroy=()=>n={}),r};var p=function(e,t){switch(typeof e){case"object":return n=e,Object.entries(n).map((([e,t])=>`${e.toLowerCase()}: ${t}`)).join("\r\n");case"string":return function(e,t){const n=e.split("\r\n");null==t&&(t={});for(let e of n)if(/([^:]+):\s*(.+)/.test(e)){const e=null!=RegExp.$1?RegExp.$1.toLowerCase():void 0,n=RegExp.$2;null==t[e]&&(t[e]=n)}return t}(e,t)}var n;return[]};const u=d(!0),f=e=>void 0===e?null:e,y=n.XMLHttpRequest,h=function(){const e=new y,t={};let n,o,l,c=null;var h=0;const v=function(){if(l.status=c||e.status,-1!==c&&(l.statusText=e.statusText),-1===c);else{const t=p(e.getAllResponseHeaders());for(let e in t){const n=t[e];if(!l.headers[e]){const t=e.toLowerCase();l.headers[t]=n}}}},m=function(){E.status=l.status,E.statusText=l.statusText},g=function(){n||E.dispatchEvent("load",{}),E.dispatchEvent("loadend",{}),n&&(E.readyState=0)},b=function(e){for(;e>h&&h<4;)E.readyState=++h,1===h&&E.dispatchEvent("loadstart",{}),2===h&&m(),4===h&&(m(),"text"in l&&(E.responseText=l.text),"xml"in l&&(E.responseXML=l.xml),"data"in l&&(E.response=l.data),"finalUrl"in l&&(E.responseURL=l.finalUrl)),E.dispatchEvent("readystatechange",{}),4===h&&(!1===t.async?g():setTimeout(g,0))},x=function(e){if(4!==e)return void b(e);const n=u.listeners("after");var o=function(){if(n.length>0){const e=n.shift();2===e.length?(e(t,l),o()):3===e.length&&t.async?e(t,l,o):o()}else b(4)};o()};var E=d();t.xhr=E,e.onreadystatechange=function(t){try{2===e.readyState&&v()}catch(e){}4===e.readyState&&(o=!1,v(),function(){if(e.responseType&&"text"!==e.responseType)"document"===e.responseType?(l.xml=e.responseXML,l.data=e.responseXML):l.data=e.response;else{l.text=e.responseText,l.data=e.responseText;try{l.xml=e.responseXML}catch(e){}}"responseURL"in e&&(l.finalUrl=e.responseURL)}()),x(e.readyState)};const C=function(){n=!0};E.addEventListener("error",C),E.addEventListener("timeout",C),E.addEventListener("abort",C),E.addEventListener("progress",(function(t){h<3?x(3):e.readyState<=3&&E.dispatchEvent("readystatechange",{})})),"withCredentials"in e&&(E.withCredentials=!1),E.status=0;for(let e of Array.from(s.concat(r)))E[`on${e}`]=null;if(E.open=function(e,r,s,a,i){h=0,n=!1,o=!1,t.headers={},t.headerNames={},t.status=0,t.method=e,t.url=r,t.async=!1!==s,t.user=a,t.pass=i,l={},l.headers={},x(1)},E.send=function(n){let c,d;for(c of["type","timeout","withCredentials"])d="type"===c?"responseType":c,d in E&&(t[c]=E[d]);t.body=n;const p=u.listeners("before");var f=function(){if(!p.length)return function(){for(c of(i(s,e,E),E.upload&&i(s.concat(r),e.upload,E.upload),o=!0,e.open(t.method,t.url,t.async,t.user,t.pass),["type","timeout","withCredentials"]))d="type"===c?"responseType":c,c in t&&(e[d]=t[c]);for(let n in t.headers){const o=t.headers[n];n&&e.setRequestHeader(n,o)}e.send(t.body)}();const n=function(e){if("object"==typeof e&&("number"==typeof e.status||"number"==typeof l.status))return a(e,l),"data"in e||(e.data=e.response||e.text),void x(4);f()};n.head=function(e){a(e,l),x(2)},n.progress=function(e){a(e,l),x(3)};const u=p.shift();1===u.length?n(u(t)):2===u.length&&t.async?u(t,n):n()};f()},E.abort=function(){c=-1,o?e.abort():E.dispatchEvent("abort",{})},E.setRequestHeader=function(e,n){const o=null!=e?e.toLowerCase():void 0,r=t.headerNames[o]=t.headerNames[o]||e;t.headers[r]&&(n=t.headers[r]+", "+n),t.headers[r]=n},E.getResponseHeader=e=>f(l.headers[e?e.toLowerCase():void 0]),E.getAllResponseHeaders=()=>f(p(l.headers)),e.overrideMimeType&&(E.overrideMimeType=function(){e.overrideMimeType.apply(e,arguments)}),e.upload){let e=d();E.upload=e,t.upload=e}return E.UNSENT=0,E.OPENED=1,E.HEADERS_RECEIVED=2,E.LOADING=3,E.DONE=4,E.response="",E.responseText="",E.responseXML=null,E.readyState=0,E.statusText="",E};h.UNSENT=0,h.OPENED=1,h.HEADERS_RECEIVED=2,h.LOADING=3,h.DONE=4;var v={patch(){y&&(n.XMLHttpRequest=h)},unpatch(){y&&(n.XMLHttpRequest=y)},Native:y,Xhook:h};const m=n.fetch;function g(e){return e instanceof Headers?b([...e.entries()]):Array.isArray(e)?b(e):e}function b(e){return e.reduce(((e,[t,n])=>(e[t]=n,e)),{})}const x=function(e,t={headers:{}}){let n=Object.assign(Object.assign({},t),{isFetch:!0});if(e instanceof Request){const o=function(e){let t={};return["method","headers","body","mode","credentials","cache","redirect","referrer","referrerPolicy","integrity","keepalive","signal","url"].forEach((n=>t[n]=e[n])),t}(e),r=Object.assign(Object.assign({},g(o.headers)),g(n.headers));n=Object.assign(Object.assign(Object.assign({},o),t),{headers:r,acceptedRequest:!0})}else n.url=e;const o=u.listeners("before"),r=u.listeners("after");return new Promise((function(t,s){let l=t;const a=function(e){if(!r.length)return l(e);const t=r.shift();return 2===t.length?(t(n,e),a(e)):3===t.length?t(n,e,a):a(e)},i=function(e){if(void 0!==e){const n=new Response(e.body||e.text,e);return t(n),void a(n)}c()},c=function(){if(!o.length)return void d();const e=o.shift();return 1===e.length?i(e(n)):2===e.length?e(n,i):void 0},d=()=>function(e,t,n,o){return new(n||(n=Promise))((function(r,s){function l(e){try{i(o.next(e))}catch(e){s(e)}}function a(e){try{i(o.throw(e))}catch(e){s(e)}}function i(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,a)}i((o=o.apply(e,t||[])).next())}))}(this,void 0,void 0,(function*(){const{url:t,isFetch:o,acceptedRequest:r}=n,i=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]])}return n}(n,["url","isFetch","acceptedRequest"]);return e instanceof Request&&i.body instanceof ReadableStream&&(i.body=yield new Response(i.body).text()),m(t,i).then((e=>a(e))).catch((function(e){return l=s,a(e),s(e)}))}));c()}))};var E={patch(){m&&(n.fetch=x)},unpatch(){m&&(n.fetch=m)},Native:m,Xhook:x};const C=u;return C.EventEmitter=d,C.before=function(e,t){if(e.length<1||e.length>2)throw"invalid hook";return C.on("before",e,t)},C.after=function(e,t){if(e.length<2||e.length>3)throw"invalid hook";return C.on("after",e,t)},C.enable=function(){v.patch(),E.patch()},C.disable=function(){v.unpatch(),E.unpatch()},C.XMLHttpRequest=v.Native,C.fetch=E.Native,C.headers=p,C.enable(),C})().after((function(n,o){const l=n.url;if(l.includes("api.chzzk.naver.com/service/v1.1/home/recommended")){const n=JSON.parse(o.text);n.content.topRecommendedLives=n.content.topRecommendedLives.filter((e=>t.includes(e.channel.channelId)?r:s)),n.content.recommendedContents=n.content.recommendedContents.map((n=>(n.lives&&(n.lives=n.lives.filter((n=>{for(const t of e)if(n.tags.includes(t))return r;return t.includes(n.channel.channelId)?r:s}))),n.videos&&(n.videos=n.videos.filter((e=>t.includes(e.channel.channelId)?r:s))),n.clips&&(n.clips=n.clips.filter((e=>t.includes(e.ownerChannel.channelId)?r:s))),n))).filter((e=>(!("videos"in e)||0!==e.videos.length)&&((!("lives"in e)||0!==e.lives.length)&&(!("clips"in e)||0!==e.clips.length)))),o.text=JSON.stringify(n)}else if(l.includes("api.chzzk.naver.com/service/v2/categories/")&&l.includes("/lives")||l.includes("api.chzzk.naver.com/service/v1/lives")||l.includes("api.chzzk.naver.com/service/v1/watch-party-lives")||l.includes("api.chzzk.naver.com/service/v1/follower-high-record-components/lives")||l.includes("api.chzzk.naver.com/service/v1/manual-components/")&&l.includes("/lives")){const n=JSON.parse(o.text);n.content.data=n.content.data.filter((n=>{if(t.includes(n.channel.channelId))return r;for(const t of e)if(n.tags.includes(t))return r;return s})),o.text=JSON.stringify(n)}else if(l.includes("api.chzzk.naver.com/service/v1/streamer-partners/recommended")){const e=JSON.parse(o.text);e.content.streamerPartners=e.content.streamerPartners.filter((e=>t.includes(e.channelId)?r:s)),o.text=JSON.stringify(e)}}));const c=(()=>{let e=null,t=null,n=!1;const o=()=>{e||(()=>{t=document.createElement("div"),t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.width="100%",t.style.height="100%",t.style.backgroundColor="rgba(0, 0, 0, 0.7)",t.style.zIndex="99998",t.style.display="none",e=document.createElement("div"),e.style.position="fixed",e.style.top="50%",e.style.left="50%",e.style.transform="translate(-50%, -50%)",e.style.width="600px",e.style.maxWidth="90%",e.style.backgroundColor="var(--color-bg-01, #1F1F21)",e.style.borderRadius="8px",e.style.padding="20px",e.style.zIndex="99999",e.style.display="none",e.style.boxShadow="0 4px 20px rgba(0, 0, 0, 0.5)",e.style.color="var(--color-text-01, #FFFFFF)";const n=document.createElement("div");n.style.display="flex",n.style.justifyContent="space-between",n.style.marginBottom="20px";const o=document.createElement("h2");o.textContent="VTuber Only Settings",o.style.margin="0",o.style.fontSize="18px";const s=document.createElement("button");s.innerHTML="✕",s.style.background="none",s.style.border="none",s.style.cursor="pointer",s.style.fontSize="20px",s.style.color="inherit",s.onclick=r,n.appendChild(o),n.appendChild(s),e.appendChild(n);const l=(e,t,n)=>{const o=document.createElement("div");o.style.marginBottom="20px";const r=document.createElement("label");r.textContent=e,r.style.display="block",r.style.marginBottom="5px",r.style.fontWeight="500";const s=document.createElement("textarea");s.id=`vb-editor-${t}`,s.style.width="100%",s.style.height="120px",s.style.padding="10px",s.style.borderRadius="4px",s.style.border="1px solid var(--color-border-02, #333333)",s.style.backgroundColor="var(--color-bg-02, #2B2B2D)",s.style.color="inherit",s.style.resize="vertical",s.style.fontFamily="monospace",s.placeholder=n;const l=localStorage.getItem(t);return l&&(s.value=l),o.appendChild(r),o.appendChild(s),o};e.appendChild(l("Allowed Tags (one per line)","vbtag","Enter tags to allow, one per line")),e.appendChild(l("Allowed Channel IDs (one per line)","vbchannel","Enter channel IDs or channel URLs to allow, one per line")),e.appendChild(l("Allowed Categories (one per line)","vbcat","Enter categories to allow, one per line"));const a=document.createElement("div");a.style.display="flex",a.style.justifyContent="flex-end",a.style.gap="10px";const i=document.createElement("button");i.textContent="Save",i.style.padding="8px 16px",i.style.borderRadius="4px",i.style.border="none",i.style.backgroundColor="#00D564",i.style.color="#000",i.style.cursor="pointer",i.style.fontWeight="bold",i.onclick=()=>{localStorage.setItem("vbtag",document.getElementById("vb-editor-vbtag").value),localStorage.setItem("vbchannel",document.getElementById("vb-editor-vbchannel").value),localStorage.setItem("vbcat",document.getElementById("vb-editor-vbcat").value);const e=document.createElement("div");e.textContent="Settings saved! Refresh the page to apply changes.",e.style.position="fixed",e.style.bottom="20px",e.style.left="50%",e.style.transform="translateX(-50%)",e.style.backgroundColor="#00D564",e.style.color="#000",e.style.padding="10px 20px",e.style.borderRadius="4px",e.style.zIndex="100000",document.body.appendChild(e),setTimeout((()=>{document.body.removeChild(e)}),3e3)};const c=document.createElement("button");c.textContent="Cancel",c.style.padding="8px 16px",c.style.borderRadius="4px",c.style.border="1px solid var(--color-border-02, #333333)",c.style.backgroundColor="transparent",c.style.color="inherit",c.style.cursor="pointer",c.onclick=r,a.appendChild(c),a.appendChild(i),e.appendChild(a),document.body.appendChild(t),document.body.appendChild(e)})(),t.style.display="block",e.style.display="block",n=!0},r=()=>{t&&e&&(t.style.display="none",e.style.display="none"),n=!1};return()=>{n?(r(),n=!1):(o(),n=!0)}})(),d=document.createElement("div");d.style.marginRight="3px",d.style.color="inherit",d.style.flex="none",d.style.position="relative",d.style.width="40px",d.style.height="40px",d.style.borderRadius="6px",d.style.display="flex",d.style.alignItems="center",d.style.justifyContent="center",d.style.cursor="pointer",d.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" class="header_icon__8SHkt"><rect width="17.001" height="1.615" x="3.681" y="7.22" fill="currentColor" rx="0.808" transform="rotate(24.95 3.681 7.22)"></rect><rect width="17.062" height="1.615" fill="currentColor" rx="0.808" transform="scale(1 -1) rotate(24.949 43.317 -.855)"></rect><path stroke="currentColor" stroke-width="1.5" d="M21.55 18.384a3.47 3.47 0 1 1-6.94 0 3.47 3.47 0 0 1 6.94 0ZM21.55 7.22a3.47 3.47 0 1 1-6.94 0 3.47 3.47 0 0 1 6.94 0Z"></path></svg>',d.onclick=c;const p=document.createElement("span");p.style.fontSize="12px",p.style.left="50%",p.style.letterSpacing="-.3px",p.style.lineHeight="14px",p.style.position="absolute",p.style.top="calc(100% + 2px)",p.style.whiteSpace="nowrap",p.style.backgroundColor="var(--color-bg-04)",p.style.borderRadius="6px",p.style.display="none",p.style.padding="5px 9px",p.style.transform="translateX(-50%)",p.innerText="VTuber Only",d.appendChild(p),d.onmouseover=()=>{d.style.backgroundColor="#69696A",p.style.display="block"},d.onmouseout=()=>{d.style.backgroundColor="transparent",p.style.display="none"},d.id="vblock-editor-open",setInterval((()=>{if(!document.getElementById("vblock-editor-open")){const e=document.querySelector("[class*=toolbar_section]");e&&e.insertBefore(d,e.firstChild)}const e=document.querySelector("[class*=search_container]");e&&(e.style.left="min(50%,250px)",e.style.transform="translateX(0px)")}),1e3);