// ==UserScript==
// @name         AMQ Avatar Dimmer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Dim avatars of players in a quiz by clicking
// @author       Poppysr
// @match        https://animemusicquiz.com/*
// @downloadURL  https://github.com/Poppysr/amq-scripts/blob/main/amqDimAllAvatars.user.js
// @updateURL    https://github.com/Poppysr/amq-scripts/blob/main/amqDimAllAvatars.user.js
// ==/UserScript==

"use strict";
if (typeof Listener === "undefined") return;
const loadInterval = setInterval(() => {
  if (document.querySelector("#loadingScreen.hidden")) {
    clearInterval(loadInterval);
    main();
  }
}, 500);

const dimValue = "0.4"; // 0 = invisible, 1 = opaque

function main() {
  $("#qpAvatarRowAvatarContainer").click((e) => {
    if (e.target.closest(".qpAvatarInfoBarOuter")) return;
    if (!e.target.closest(".qpAvatarContainer")) return;
    const avatarContainer = e.target.closest(".qpAvatarContainerOuter");
    if (avatarContainer) {
      toggleDimOnClickedAvatar(avatarContainer);
    }
  });

  $("#qpAvatarRowAvatarContainer").on("contextmenu", (e) => {
    e.preventDefault();
    const ifSomeDim = [...document.querySelectorAll(".qpAvatarContainerOuter")].some(avatar => parseFloat(window.getComputedStyle(avatar).opacity) < 1);
    dimAllAvatars(ifSomeDim);
  });

  function dimAllAvatars(isDim) {
    const isDimOpacity = isDim ? "1" : dimValue;
    [...document.querySelectorAll(".qpAvatarContainerOuter")].forEach(elem => {
      elem.style.opacity = isDimOpacity;
    });
  }

  function toggleDimOnClickedAvatar(targetElem) {
    const targetElemParent = targetElem.closest(".qpAvatarContainerOuter");
    const currentOpacity = window.getComputedStyle(targetElemParent).opacity;

    if (currentOpacity < 1) {
      targetElemParent.style.opacity = "1";
    } else if (currentOpacity == 1) {
      targetElemParent.style.opacity = dimValue;
    }
  };
}
