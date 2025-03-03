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
  // index.ts
  var VTuberTags = ["$0"];
  var VTuberChannels = "$1".split("@").map((c) => {
    return Array.from(atob(c + "=="), (char) =>
      char.charCodeAt(0).toString(16).padStart(2, "0")
    ).join("");
  });
  var VTuberCats = ["$2"];

  var oldXMLHttpRequest = XMLHttpRequest;
  const run = () => {
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
          if (actual.responseType != "") return actual.response;
          const url = actual.responseURL;
          if (
            url.includes("api.chzzk.naver.com/service/v1.1/home/recommended")
          ) {
            const origin = JSON.parse(actual.response);
            origin.content.topRecommendedLives =
              origin.content.topRecommendedLives.filter((live) => {
                if (VTuberChannels.includes(live.channel.channelId))
                  return false;
                return true;
              });
            origin.content.recommendedContents =
              origin.content.recommendedContents
                .map((content) => {
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
                  if (content.clips) {
                    content.clips = content.clips.filter((clip) => {
                      if (VTuberChannels.includes(clip.ownerChannel.channelId))
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
                  if ("clips" in content && content.clips.length === 0)
                    return false;
                  return true;
                });
            return JSON.stringify(origin);
          }
          if (
            (url.includes("api.chzzk.naver.com/service/v2/categories/") &&
              url.includes("/lives")) ||
            url.includes("api.chzzk.naver.com/service/v1/lives") ||
            url.includes("api.chzzk.naver.com/service/v1/watch-party-lives") ||
            url.includes(
              "api.chzzk.naver.com/service/v1/follower-high-record-components/lives"
            ) ||
            (url.includes(
              "api.chzzk.naver.com/service/v1/manual-components/"
            ) &&
              url.includes("/lives"))
          ) {
            const origin = JSON.parse(actual.response);
            origin.content.data = origin.content.data.filter((content) => {
              if (VTuberChannels.includes(content.channel.channelId))
                return false;
              for (const tag of VTuberTags) {
                if (content.tags.includes(tag)) return false;
              }
              return true;
            });
            return JSON.stringify(origin);
          }
          if (
            url.includes(
              "api.chzzk.naver.com/service/v1/streamer-partners/recommended"
            )
          ) {
            const origin = JSON.parse(actual.response);
            origin.content.streamerPartners =
              origin.content.streamerPartners.filter((content) => {
                if (VTuberChannels.includes(content.channelId)) return false;
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
  };

  // do not run on chzzk.naver.com/live/*
  let runned = false;
  if (!location.href.includes("chzzk.naver.com/live/")) {
    run();
    runned = true;
  }

  // observe url change
  if (runned)
    setInterval(() => {
      if (location.href.includes("chzzk.naver.com/live/")) {
        location.reload();
      }
    }, 10);
  else
    setInterval(() => {
      if (!location.href.includes("chzzk.naver.com/live/")) {
        location.reload();
      }
    }, 10);
})();
