// ==UserScript==
// @name         Vtuber Blocker
// @namespace    http://tampermonkey.net/
// @version      $version
// @license		   MIT
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chzzk.naver.com
// @description  Blocks VTuber content from Chzzk recommendations
// @match        http*://chzzk.naver.com/*
// @updateURL    https://oein.github.io/VTuberBlocker/dist.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  // index.ts
  var VTuberTags = ["$0"];
  var VTuberChannels = ["$1"];
  var VTuberCats = ["$2"];

  var oldXMLHttpRequest = XMLHttpRequest;
  XMLHttpRequest = function () {
    var actual = new oldXMLHttpRequest();
    var self = this;
    this.actual = actual;
    const getter = [
      "readyState",
      "response",
      "responseType",
      "responseURL",
      "responseXML",
      "status",
      "statusText",
      "timeout",
      "upload",
      "withCredentials",
      "onload",
      "onerror",
      "onprogress",
      "onabort",
      "onloadend",
      "onloadstart",
      "ontimeout",
      "onreadystatechange",
    ];
    getter.forEach((key) => {
      Object.defineProperty(self, key, {
        get: function () {
          return actual[key];
        },
        set: function (value) {
          actual[key] = value;
        },
      });
    });
    Object.defineProperty(self, "responseText", {
      get: function () {
        console.log(actual.responseURL, actual.responseType);
        const url = actual.responseURL;
        if (url.includes("/service/v1.1/home/recommended")) {
          const origin = JSON.parse(actual.response);
          origin.content.recommendedContents =
            origin.content.recommendedContents
              .map((content) => {
                console.log(content);
                if (content.lives) {
                  content.lives = content.lives.filter((live) => {
                    for (const tag of VTuberTags) {
                      if (live.tags.includes(tag)) return false;
                    }
                    if (VTuberChannels.includes(live.channel.channelId))
                      return false;
                    return true;
                  });
                }
                if (content.videos) {
                  content.videos = content.videos.filter((video) => {
                    if (VTuberChannels.includes(video.channel.channelId))
                      return false;
                    return true;
                  });
                }
                return content;
              })
              .filter((content) => {
                if (VTuberCats.includes(content.title)) return false;
                if ("videos" in content && content.videos.length === 0)
                  return false;
                if ("lives" in content && content.lives.length === 0)
                  return false;
                return true;
              });
          return JSON.stringify(origin);
        }
        return actual.response;
      },
      set: function (value) {
        actual.responseText = value;
      },
    });
  };
  XMLHttpRequest.prototype.addEventListener = function (type, listener) {
    if (!(type in this.eventlisteners)) {
      this.eventlisteners[type] = [];
    }
    this.eventlisteners[type].push(listener);
  };
  XMLHttpRequest.prototype.open = function (method, url, async) {
    this.url = url;
    this.actual.open(method, url, async);
  };
  const actualCaller = [
    "send",
    "setRequestHeader",
    "getAllResponseHeaders",
    "getResponseHeader",
    "abort",
    "overrideMimeType",
  ];
  actualCaller.forEach((key) => {
    XMLHttpRequest.prototype[key] = function () {
      return this.actual[key].apply(this.actual, arguments);
    };
  });
  const events = [
    "abort",
    "error",
    "load",
    "loadend",
    "loadstart",
    "progress",
    "readystatechange",
    "timeout",
  ];
  events.forEach((event) => {
    Object.defineProperty(XMLHttpRequest.prototype, "on" + event, {
      set: function (value) {
        this.actual.addEventListener(event, value);
      },
    });
  });
})();
