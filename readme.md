# ChatGPT 降智避免

## 简介

**ChatGPT 降智避免** 是一个用于模拟移动设备用户代理的 Tampermonkey 脚本，旨在优化用户体验，防止在特定环境中可能出现的“降智”行为。本脚本动态修改浏览器的 `navigator` 属性，将其伪装为移动设备，从而确保 ChatGPT 的表现更加智能。

## 特性

- 模拟移动设备用户代理。
- 动态修改 `navigator.userAgent` 和相关属性。
- 支持多平台的浏览器扩展（需安装 Tampermonkey 或类似工具）。
- 轻量化、无侵入。

## 安装

### greasyfork 安装

https://greasyfork.org/zh-CN/scripts/520108-chatgpt-%E9%99%8D%E6%99%BA%E9%81%BF%E5%85%8D

### 手动安装

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 或其他脚本管理器扩展。
2. 打开 Tampermonkey 并创建一个新脚本。
3. 将以下代码复制粘贴到脚本编辑器中：

```javascript
// ==UserScript==
// @name         ChatGPT 降智避免
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  在https://chatgpt.com上模拟移动设备的用户代理避免降智
// @author       ChatGPT o1-mini
// @match        https://chatgpt.com/*
// @grant        none
// @run-at       document-start
// @icon         https://chat.openai.com/favicon.ico
// @license      MIT
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
```

4. 保存脚本并确保启用。
5. 访问 [ChatGPT 网站](https://chatgpt.com)，脚本将自动生效。

## 使用说明

安装脚本后，访问 ChatGPT 页面时，浏览器会被伪装成移动设备环境。如果需要测试效果，可以使用开发者工具检查 `navigator.userAgent`。

## 注意事项

- 本脚本仅用于个人研究和优化用户体验，不得用于任何违反相关服务条款的行为。
- 如果脚本对网站功能产生任何不良影响，请禁用脚本并刷新页面。

## 许可

本项目使用 [MIT 许可证](LICENSE)，欢迎自由使用和修改。
