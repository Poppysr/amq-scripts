// ==UserScript==
// @name         AMQ Avatar Dimmer
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  Dim avatars of players in a quiz by left/right clicking on them
// @author       Poppysr
// @match        https://animemusicquiz.com/*
// @downloadURL  https://github.com/Poppysr/amq-scripts/raw/main/amqDimAllAvatars.user.js
// @updateURL    https://github.com/Poppysr/amq-scripts/raw/main/amqDimAllAvatars.user.js
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
    const $ifSomeDim = $(".qpAvatarContainerOuter").toArray().some(avatar => parseFloat($(avatar).css("opacity")) < 1);
    dimAllAvatars($ifSomeDim);
  });

  function dimAllAvatars(isDim) {
    const isDimOpacity = isDim ? "1" : dimValue;
    $(".qpAvatarContainerOuter").css("opacity", isDimOpacity);
  }

  function toggleDimOnClickedAvatar(targetElem) {
    const $targetElemParent = $(targetElem).closest(".qpAvatarContainerOuter");
    const $currentOpacity = $targetElemParent.css("opacity");

    if ($currentOpacity < 1) {
      $targetElemParent.css("opacity", "1");
    } else if ($currentOpacity == 1) {
      $targetElemParent.css("opacity", dimValue);
    }
  };
}
