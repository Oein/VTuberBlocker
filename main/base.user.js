// ==UserScript==
// @name         Vtuber Blocker
// @namespace    https://vblock.oein.kr/
// @homepageURL  https://vblock.oein.kr/
// @supportURL   https://github.com/Oein/VTuberBlocker/issues
// @version      $version
// @license		   MIT
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chzzk.naver.com
// @description  Blocks VTuber content from Chzzk recommendations
// @match        http*://chzzk.naver.com/*
// @updateURL    https://vblock.oein.kr/dist.user.js
// @downloadURL  https://vblock.oein.kr/dist.user.js
// @grant        none
// @run-at       document-start
// @copyright    Copyright (c) 2025 Oein
// ==/UserScript==

(function () {
  var s=["$0"],o=["$1"],t=["$2"],r=XMLHttpRequest;(XMLHttpRequest=function(){var n=new r,e=this;this.actual=n,["readyState","response","responseType","responseURL","responseXML","status","statusText","timeout","upload","withCredentials","onload","onerror","onprogress","onabort","onloadend","onloadstart","ontimeout","onreadystatechange"].forEach(t=>{Object.defineProperty(e,t,{get:function(){return n[t]},set:function(e){n[t]=e}})}),Object.defineProperty(e,"responseText",{get:function(){var e;return n.responseURL.includes("/service/v1.1/home/recommended")?((e=JSON.parse(n.response)).content.recommendedContents=e.content.recommendedContents.map(e=>(e.lives&&(e.lives=e.lives.filter(e=>{for(const t of s)if(e.tags.includes(t))return!1;return!o.includes(e.channel.channelId)})),e.videos&&(e.videos=e.videos.filter(e=>!o.includes(e.channel.channelId))),e)).filter(e=>!(t.includes(e.title)||"videos"in e&&0===e.videos.length||"lives"in e&&0===e.lives.length)),JSON.stringify(e)):n.response},set:function(e){n.responseText=e}})}).prototype.addEventListener=function(e,t){e in this.eventlisteners||(this.eventlisteners[e]=[]),this.eventlisteners[e].push(t)},XMLHttpRequest.prototype.open=function(e,t,n){this.url=t,this.actual.open(e,t,n)};const e=["send","setRequestHeader","getAllResponseHeaders","getResponseHeader","abort","overrideMimeType"],n=(e.forEach(e=>{XMLHttpRequest.prototype[e]=function(){return this.actual[e].apply(this.actual,arguments)}}),["abort","error","load","loadend","loadstart","progress","readystatechange","timeout"]);n.forEach(t=>{Object.defineProperty(XMLHttpRequest.prototype,"on"+t,{set:function(e){this.actual.addEventListener(t,e)}})});
})();
