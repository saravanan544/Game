const enterBtn = document.getElementById("enterBtn");

if (enterBtn) {
    enterBtn.onclick = function () {
        location.href = "tower.html";
    };
}

const floor1 = document.querySelector(".unlocked");

if (floor1) {
    floor1.onclick = function () {
        location.href = "battle.html";
    };
}
