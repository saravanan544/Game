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
    // EXP

let neededExp = player.level * 50;

document.getElementById("playerExpText").innerText =
"EXP " + player.exp + " / " + neededExp;

document.getElementById("playerExpBar").style.width =
(player.exp / neededExp) * 100 + "%";
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
/* ==========================================
   PART 2
   COMBAT SYSTEM
========================================== */

// ===============================
// ATTACK BUTTON
// ===============================

document.getElementById("attackBtn").addEventListener("click", attack);

document.getElementById("heavyBtn").addEventListener("click", heavyAttack);

document.getElementById("runBtn").addEventListener("click", runAway);

// ===============================
// NORMAL ATTACK
// ===============================

function attack(){

    let damage =
    Math.max(1, player.atk - enemy.def);

    enemy.hp -= damage;

    addLog("You dealt " + damage + " damage!");

    if(enemy.hp <= 0){

        victory();

        return;

    }

    enemyAttack();

    updateUI();

}

// ===============================
// HEAVY ATTACK
// ===============================

function heavyAttack(){

    let damage =
    Math.max(1, (player.atk * 2) - enemy.def);

    enemy.hp -= damage;

    addLog("Heavy Attack dealt " + damage + " damage!");

    if(enemy.hp <= 0){

        victory();

        return;

    }

    enemyAttack();

    updateUI();

}

// ===============================
// ENEMY TURN
// ===============================

function enemyAttack(){

    let damage =
    Math.max(1, enemy.atk - player.def);

    player.hp -= damage;

    addLog(enemy.name + " dealt " + damage + " damage!");

    if(player.hp <= 0){

        defeat();

        return;

    }

}

// ===============================
// RUN AWAY
// ===============================

function runAway(){

    addLog("You escaped.");

    setTimeout(function(){

        location.href = "tower.html";

    },1000);

}
/* ==========================================
   PART 3
   VICTORY • DEFEAT • LEVEL UP
========================================== */

// ===============================
// VICTORY
// ===============================

function victory(){

    addLog("You defeated " + enemy.name + "!");

    player.exp += enemy.exp;

    player.gold += enemy.gold;

    addLog("+" + enemy.exp + " EXP");

    addLog("+" + enemy.gold + " Gold");

    levelUp();

    updateUI();

    setTimeout(function(){

        spawnEnemy();

    },1500);

}

// ===============================
// DEFEAT
// ===============================

function defeat(){

    player.hp = player.maxHp;

    let lostGold = Math.floor(player.gold * 0.2);

    player.gold -= lostGold;

    if(player.gold < 0){

        player.gold = 0;

    }

    updateUI();

    alert(
        "You were defeated!\n\nLost " +
        lostGold +
        " Gold."
    );

    location.href = "tower.html";

}

// ===============================
// LEVEL UP
// ===============================

function levelUp(){

    while(player.exp >= player.level * 50){

        player.exp -= player.level * 50;

        player.level++;

        player.maxHp += 10;

        player.hp = player.maxHp;

        player.atk += 2;

        player.def += 1;

        player.stamina += 5;

        addLog("⭐⭐ LEVEL UP!");

        addLog("You reached Level " + player.level);

    }

}
