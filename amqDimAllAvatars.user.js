// ==UserScript==
// @name         AMQ Avatar Dimmer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Dim avatars of players in a quiz by clicking
// @author       Poppysr
// @match        https://animemusicquiz.com/*
// @downloadURL
// @updateURL
// ==/UserScript==

if (typeof Listener === "undefined") return;
const loadInterval = setInterval(() => {
  if (document.getElementById("loadingScreen").classList.contains("hidden")) {
    clearInterval(loadInterval);
    setup();
  }
}, 500);
