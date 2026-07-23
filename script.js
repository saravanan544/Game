/* ==========================================
   CHAOS TOWER
   SCRIPT.JS
   Handles page navigation
========================================== */

// =========================
// Enter Tower Button
// =========================

const enterBtn = document.getElementById("enterBtn");

if (enterBtn) {

    enterBtn.addEventListener("click", function () {

        location.href = "tower.html";

    });

}

// =========================
// Floor 1 Button
// =========================

const floor1 = document.getElementById("floor1");

if (floor1) {

    floor1.addEventListener("click", function () {

        location.href = "battle.html";

    });

}

// =========================
// Return to Town Button
// =========================

const backBtn = document.getElementById("backBtn");

if (backBtn) {

    backBtn.addEventListener("click", function () {

        location.href = "index.html";

    });

}
