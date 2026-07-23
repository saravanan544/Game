// ==========================
// CHAOS TOWER - battle.js
// Alpha v0.0.2
// ==========================

// ---------- PLAYER ----------

const player = {
    level: 1,
    exp: 0,
    gold: 0,

    hp: 20,
    maxHp: 20,

    stamina: 50,
    maxStamina: 50,

    attack: 10,
    defense: 5
};

// ---------- FLOOR DATA ----------

const floors = {

    1: [

        {
            name: "Goblin",
            image: "images/monsters/goblin.png",

            hp: 40,
            maxHp: 40,

            attack: 8,
            defense: 3,

            exp: 10,
            gold: 15
        },

        {
            name: "Wolf",
            image: "images/monsters/wolf.png",

            hp: 50,
            maxHp: 50,

            attack: 10,
            defense: 4,

            exp: 15,
            gold: 20
        }

    ]

};

// ---------- CURRENT FLOOR ----------

let currentFloor = 1;

let enemy = null;

// ---------- LOG ----------

function log(text){

    const logBox = document.getElementById("log");

    logBox.innerHTML += "<div>"+text+"</div>";

    logBox.scrollTop = logBox.scrollHeight;

}

// ---------- SPAWN ----------

function spawnMonster(){

    let monsters = floors[currentFloor];

    enemy = JSON.parse(
        JSON.stringify(
            monsters[Math.floor(Math.random()*monsters.length)]
        )
    );

    document.getElementById("monsterImg").src = enemy.image;

    document.getElementById("monsterName").innerText =
        enemy.name;

    log("👹 A wild "+enemy.name+" appeared!");

    updateUI();

}

// ---------- UPDATE ----------

function updateUI(){

    // PLAYER

    document.getElementById("playerHpText").innerText =
        player.hp + " / " + player.maxHp;

    document.getElementById("playerHpBar").style.width =
        (player.hp/player.maxHp)*100 + "%";

    document.getElementById("playerStats").innerHTML =
        "Lv."+player.level+
        " | ⚔ "+player.attack+
        " | 🛡 "+player.defense+
        " | 💰 "+player.gold+
        " | ⭐ "+player.exp;

    // ENEMY

    if(enemy){

        document.getElementById("enemyHpText").innerText =
            enemy.hp+" / "+enemy.maxHp;

        document.getElementById("enemyHpBar").style.width =
            (enemy.hp/enemy.maxHp)*100+"%";

    }

}

// ---------- PLAYER ATTACK ----------

function attack(){

    if(!enemy) return;

    let damage =
        Math.max(1,player.attack-enemy.defense);

    enemy.hp -= damage;

    if(enemy.hp<0)
        enemy.hp=0;

    log("⚔ You dealt "+damage+" damage.");

    updateUI();

    if(enemy.hp<=0){

        victory();

        return;
    }

    enemyAttack();

}

// ---------- HEAVY ----------

function heavyAttack(){

    if(!enemy) return;

    let damage =
        Math.floor(
            (player.attack*1.5)-enemy.defense
        );

    damage=Math.max(1,damage);

    enemy.hp-=damage;

    if(enemy.hp<0)
        enemy.hp=0;

    log("💥 Heavy Attack dealt "+damage+" damage.");

    updateUI();

    if(enemy.hp<=0){

        victory();

        return;
    }

    enemyAttack();

}

// ---------- ENEMY ----------

function enemyAttack(){

    let damage =
        Math.max(1,enemy.attack-player.defense);

    player.hp-=damage;

    if(player.hp<0)
        player.hp=0;

    log(enemy.name+" dealt "+damage+" damage.");

    updateUI();

    if(player.hp<=0){

        defeat();

    }

}

// ---------- VICTORY ----------

function victory(){

    log("🏆 Victory!");

    player.exp+=enemy.exp;

    player.gold+=enemy.gold;

    log("⭐ +"+enemy.exp+" EXP");

    log("💰 +"+enemy.gold+" Gold");

    updateUI();

    setTimeout(function(){

        spawnMonster();

    },1500);

}

// ---------- DEFEAT ----------

function defeat(){

    log("☠ You were defeated.");

    alert("Game Over");

    location.href="tower.html";

}

// ---------- RUN ----------

function run(){

    if(Math.random()<0.5){

        log("🏃 You escaped.");

        location.href="tower.html";

    }

    else{

        log("❌ Couldn't escape!");

        enemyAttack();

    }

}

// ---------- BUTTONS ----------

document.getElementById("attackBtn").onclick=attack;

document.getElementById("heavyBtn").onclick=heavyAttack;

document.getElementById("runBtn").onclick=run;

// ---------- START ----------

spawnMonster();
