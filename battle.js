let player = {

    hp:20,
    maxHp:20,
    atk:10,
    def:5

};

let enemy = {

    name:"Goblin",

    hp:40,
    maxHp:40,

    atk:8,
    def:3

};

updateUI();

function updateUI(){

    playerHp.innerText = player.hp;
    playerMaxHp.innerText = player.maxHp;

    enemyHp.innerText = enemy.hp;
    enemyMaxHp.innerText = enemy.maxHp;

    playerHpBar.style.width =
        (player.hp/player.maxHp)*100 + "%";

    enemyHpBar.style.width =
        (enemy.hp/enemy.maxHp)*100 + "%";
}

function log(text){

    battleLog.innerHTML += "<p>"+text+"</p>";

    battleLog.scrollTop =
        battleLog.scrollHeight;
}

function attack(){

    let damage =
        Math.max(1,player.atk-enemy.def);

    enemy.hp-=damage;

    log("You dealt "+damage+" damage.");

    if(enemy.hp<=0){

        log("Victory!");

        setTimeout(()=>{

            location.href="tower.html";

        },1500);

        updateUI();

        return;
    }

    enemyAttack();

}

function heavyAttack(){

    let damage =
        Math.max(1,(player.atk*1.5)-enemy.def);

    enemy.hp-=Math.floor(damage);

    log("Heavy Attack dealt "+Math.floor(damage)+" damage.");

    if(enemy.hp<=0){

        log("Victory!");

        setTimeout(()=>{

            location.href="tower.html";

        },1500);

        updateUI();

        return;
    }

    enemyAttack();

}

function enemyAttack(){

    let damage =
        Math.max(1,enemy.atk-player.def);

    player.hp-=damage;

    log(enemy.name+" dealt "+damage+" damage.");

    if(player.hp<=0){

        alert("Game Over");

        location.href="tower.html";

    }

    updateUI();

}

function openInventory(){

    alert("Inventory coming in Alpha.");
}

function runAway(){

    location.href="tower.html";

}
