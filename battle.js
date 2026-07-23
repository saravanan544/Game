/* ==========================================
   CHAOS TOWER
   BATTLE.JS
   Part 1
========================================== */

// ===============================
// PLAYER
// ===============================

const player = {

    level:1,

    exp:0,

    gold:0,

    maxHp:20,

    hp:20,

    atk:10,

    def:5,

    stamina:50

};

// ===============================
// FLOOR 1 MONSTERS
// ===============================

const monsters = [

{

    name:"Goblin",

    hp:40,

    maxHp:40,

    atk:6,

    def:2,

    exp:15,

    gold:10,

    image:"images/monsters/goblin.png"

},

{

    name:"Wolf",

    hp:35,

    maxHp:35,

    atk:8,

    def:1,

    exp:18,

    gold:12,

    image:"images/monsters/wolf.png"

},

{

    name:"Orc",

    hp:60,

    maxHp:60,

    atk:10,

    def:5,

    exp:25,

    gold:18,

    image:"images/monsters/orc.png"

}

];

// ===============================
// CURRENT ENEMY
// ===============================

let enemy;

// ===============================
// BATTLE LOG
// ===============================

function addLog(text){

    const log = document.getElementById("battleLog");

    log.innerHTML += "<p>" + text + "</p>";

    log.scrollTop = log.scrollHeight;

}

// ===============================
// SPAWN ENEMY
// ===============================

function spawnEnemy(){

    const random = Math.floor(Math.random()*monsters.length);

    enemy = {

        ...monsters[random]

    };

    addLog("A wild " + enemy.name + " appeared!");

    updateUI();

}

// ===============================
// UPDATE UI
// ===============================

function updateUI(){

    // Enemy

    document.getElementById("enemyName").innerText =
    enemy.name;

    document.getElementById("enemyImg").src =
    enemy.image;

    document.getElementById("enemyHpText").innerText =
    "HP " + enemy.hp + " / " + enemy.maxHp;

    // Player

    document.getElementById("playerHpText").innerText =
    "HP " + player.hp + " / " + player.maxHp;

    document.getElementById("playerLevel").innerText =
    "⭐ Lv." + player.level;

    document.getElementById("playerAtk").innerText =
    "⚔ " + player.atk;

    document.getElementById("playerDef").innerText =
    "🛡 " + player.def;

    document.getElementById("playerStam").innerText =
    "⚡ " + player.stamina;

    document.getElementById("playerGold").innerText =
    "💰 " + player.gold;

    // HP Bars

    const enemyPercent =
    (enemy.hp/enemy.maxHp)*100;

    document.getElementById("enemyHpBar").style.width =
    enemyPercent + "%";

    const playerPercent =
    (player.hp/player.maxHp)*100;

    document.getElementById("playerHpBar").style.width =
    playerPercent + "%";

}

// ===============================
// START
// ===============================

spawnEnemy();
