// ==UserScript==
// @name         ChatGPT 降智避免
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  在https://chatgpt.com上模拟移动设备的用户代理避免降智
// @author       ChatGPT o1-mini
// @match        https://chatgpt.com/*
// @grant        none
// @run-at       document-start
// @icon               https://chat.openai.com/favicon.ico
// @license            MIT
// ==/UserScript==

(function () {
  "use strict";

  // 使用 Proxy 动态修改 navigator 属性
  const navigatorProxy = new Proxy(navigator, {
    get(target, prop) {
      if (prop === "userAgent") {
        return "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1";
      }
      if (prop === "platform") {
        return "iPhone";
      }
      if (prop === "maxTouchPoints") {
        return 1;
      }
      return Reflect.get(target, prop);
    },
  });

  // 将 navigator 替换为 Proxy
  Object.defineProperty(window, "navigator", {
    get() {
      return navigatorProxy;
    },
    configurable: false,
  });
})();
