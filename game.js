// ======================
// PLAYER
// ======================

let player = {
  atk: 10,
  def: 5,
  stam: 50,
  maxStam: 50,
  hp: 20,
  lvl: 1,
  pts: 0,

  inventory: [],

  equip: {
    weapon: null,
    gloves: null,
    armor: null,
    pants: null,
    shoes: null,
    helmet: null
  }
};

// ======================
// ITEMS
// ======================

const items = {
  sword: {
    name: "🗡️ Sword",
    type: "weapon",
    atk: 10
  },

  gloves: {
    name: "🧤 Gloves",
    type: "gloves",
    atk: 3
  },

  armor: {
    name: "🛡️ Armor",
    type: "armor",
    def: 10
  },

  pants: {
    name: "👖 Pants",
    type: "pants",
    def: 5
  },

  shoes: {
    name: "👢 Shoes",
    type: "shoes",
    atk: 5
  },

  helmet: {
    name: "⛑️ Helmet",
    type: "helmet",
    def: 3
  },

  potion: {
    name: "🧪 Stamina Potion",
    type: "consumable",
    stam: 20
  }
};

// ======================
// MOBS
// ======================

const mobs = [
  {
    name: "👺 Goblin",
    hp: 40,
    atk: 8,
    def: 3,
    drops: ["sword", "gloves"]
  },

  {
    name: "👹 Orc",
    hp: 70,
    atk: 12,
    def: 6,
    drops: ["armor", "pants"]
  },

  {
    name: "🐺 Wolf",
    hp: 50,
    atk: 10,
    def: 4,
    drops: ["shoes", "helmet"]
  }
];

let enemy = null;

// ======================
// UPDATE UI
// ======================

function updateUI() {

  document.getElementById("hp").innerText = player.hp;
  document.getElementById("atk").innerText = player.atk;
  document.getElementById("def").innerText = player.def;
  document.getElementById("stam").innerText =
    player.stam + "/" + player.maxStam;

  document.getElementById("lvl").innerText = player.lvl;
  document.getElementById("pts").innerText = player.pts;

  if(enemy){
    document.getElementById("enemyName").innerText = enemy.name;
    document.getElementById("enemyHp").innerText = enemy.hp;
  } else {
    document.getElementById("enemyName").innerText = "No Enemy";
    document.getElementById("enemyHp").innerText = "-";
  }

  renderInventory();
  renderEquip();
  renderActions();
}

// ======================
// LOG
// ======================

function log(msg){

  let logBox = document.getElementById("log");

  logBox.innerHTML += `<div>${msg}</div>`;

  logBox.scrollTop = logBox.scrollHeight;
}

// ======================
// NEW ENEMY
// ======================

function newEnemy(){

  let mob = mobs[Math.floor(Math.random() * mobs.length)];

  enemy = {...mob};

  log("Encountered " + enemy.name);

  updateUI();
}

// ======================
// ATTACK
// ======================

function attack(mult){

  if(!enemy){
    log("No enemy found");
    return;
  }

  let cost = (mult === 1 ? 5 : 10);

  if(player.stam < cost){
    log("Not enough stamina");
    return;
  }

  player.stam -= cost;

  let dmg =
    Math.max(1, Math.floor((player.atk * mult) - enemy.def));

  enemy.hp -= dmg;

  log("You dealt " + dmg + " damage");

  // ENEMY DEAD
  if(enemy.hp <= 0){

    winFight();
    return;
  }

  // ENEMY ATTACK

  let edmg =
    Math.max(1, enemy.atk - player.def);

  player.hp -= edmg;

  log(enemy.name + " dealt " + edmg + " damage");

  // PLAYER DEAD
  if(player.hp <= 0){

    alert("Game Over");

    location.reload();

    return;
  }

  updateUI();
}

// ======================
// WIN FIGHT
// ======================

function winFight(){

  log(enemy.name + " defeated!");

  mobDrops();

  player.lvl += 1;
  player.pts += 1;

  chooseStat();

  enemy = null;

  updateUI();
}

// ======================
// DROPS
// ======================

function mobDrops(){

  enemy.drops.forEach(drop => {

    if(Math.random() < 0.4){

      player.inventory.push(drop);

      log("Dropped: " + items[drop].name);
    }
  });

  if(Math.random() < 0.4){

    player.inventory.push("potion");

    log("Dropped: 🧪 Potion");
  }
}

// ======================
// CHOOSE STAT
// ======================

function chooseStat(){

  let stat =
    prompt("Choose stat: atk / def / stam");

  if(stat === "atk"){

    player.atk += 1;
  }

  else if(stat === "def"){

    player.def += 1;
  }

  else if(stat === "stam"){

    player.maxStam += 5;
    player.stam += 5;
  }

  player.hp = (player.def * 2) + player.atk;
}

// ======================
// INVENTORY
// ======================

function renderInventory(){

  let inv =
    document.getElementById("inventory");

  inv.innerHTML = "";

  player.inventory.forEach((item, index) => {

    let btn =
      document.createElement("button");

    btn.innerText = items[item].name;

    btn.onclick = () => {
      showPopup(item, index);
    };

    inv.appendChild(btn);
  });
}

// ======================
// POPUP
// ======================

function showPopup(item, index){

  let popup =
    document.getElementById("popup");

  popup.classList.remove("hidden");

  popup.innerHTML = `
    <h3>${items[item].name}</h3>

    <button onclick="useItem('${item}', ${index})">
      Use / Equip
    </button>

    <button onclick="closePopup()">
      Cancel
    </button>
  `;
}

function closePopup(){

  document
    .getElementById("popup")
    .classList.add("hidden");
}

// ======================
// USE ITEM
// ======================

function useItem(item, index){

  let it = items[item];

  // POTION

  if(it.type === "consumable"){

    player.stam += it.stam;

    if(player.stam > player.maxStam){
      player.stam = player.maxStam;
    }

    log("Recovered stamina");
  }

  // EQUIPMENT

  else {

    let slot = it.type;

    // REMOVE OLD EQUIP STATS

    let oldItem = player.equip[slot];

    if(oldItem){

      let old = items[oldItem];

      if(old.atk){
        player.atk -= old.atk;
      }

      if(old.def){
        player.def -= old.def;
      }
    }

    // EQUIP NEW

    player.equip[slot] = item;

    if(it.atk){
      player.atk += it.atk;
    }

    if(it.def){
      player.def += it.def;
    }

    log("Equipped " + it.name);
  }

  player.hp = (player.def * 2) + player.atk;

  player.inventory.splice(index, 1);

  closePopup();

  updateUI();
}

// ======================
// EQUIPMENT UI
// ======================

function renderEquip(){

  let eq =
    document.getElementById("equipment");

  eq.innerHTML = "";

  for(let slot in player.equip){

    let equipped =
      player.equip[slot];

    eq.innerHTML += `
      <div>
        ${slot}: 
        ${equipped ? items[equipped].name : "None"}
      </div>
    `;
  }
}

// ======================
// ACTION BUTTONS
// ======================

function renderActions(){

  let act =
    document.getElementById("actions");

  if(!enemy){

    act.innerHTML = `
      <button onclick="newEnemy()">
        🔍 Find Enemy
      </button>
    `;

    return;
  }

  act.innerHTML = `
    <button onclick="attack(1)">
      ⚔️ Attack
    </button>

    <button onclick="attack(1.5)">
      💥 Heavy
    </button>

    <button onclick="toggleInv()">
      🎒 Inventory
    </button>
  `;
}

// ======================
// TABS
// ======================

function toggleInv(){

  document
    .getElementById("invPanel")
    .classList.toggle("hidden");
}

function showTab(tab){

  document
    .getElementById("inventory")
    .classList.toggle("hidden", tab !== "inv");

  document
    .getElementById("equipment")
    .classList.toggle("hidden", tab !== "equip");
}

// ======================
// START GAME
// ======================

player.hp =
  (player.def * 2) + player.atk;

newEnemy();

updateUI();
