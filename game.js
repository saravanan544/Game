// PLAYER
let player = {
  atk: 10,
  def: 5,
  stam: 50,
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

function getHP() {
  return player.def * 2 + player.atk;
}

// ITEMS
const items = {
  sword: {name:"Sword", type:"weapon", atk:10},
  gloves: {name:"Gloves", type:"gloves", atk:3},
  armor: {name:"Armor", type:"armor", def:10},
  pants: {name:"Pants", type:"pants", def:5},
  shoes: {name:"Shoes", type:"shoes", atk:5},
  helmet: {name:"Helmet", type:"helmet", def:3},
  potion: {name:"Stam Potion", type:"consumable", stam:20}
};

// MOBS
const mobs = [
  {name:"Goblin", hp:40, atk:8, def:3, drops:["sword","gloves"]},
  {name:"Orc", hp:70, atk:12, def:6, drops:["armor","pants"]},
  {name:"Wolf", hp:50, atk:10, def:4, drops:["shoes","helmet"]}
];

let enemy = null;

// UI UPDATE
function updateUI() {
  document.getElementById("atk").innerText = player.atk;
  document.getElementById("def").innerText = player.def;
  document.getElementById("stam").innerText = player.stam;
  document.getElementById("lvl").innerText = player.lvl;
  document.getElementById("pts").innerText = player.pts;
  document.getElementById("hp").innerText = getHP();

  if(enemy){
    document.getElementById("enemyName").innerText = enemy.name;
    document.getElementById("enemyHp").innerText = enemy.hp;
  }

  renderInventory();
  renderEquip();
}

// LOG
function log(msg){
  let logBox = document.getElementById("log");
  logBox.innerHTML += "<div>"+msg+"</div>";
  logBox.scrollTop = logBox.scrollHeight;
}

// ENCOUNTER
function newEnemy(){
  let m = mobs[Math.floor(Math.random()*mobs.length)];
  enemy = {...m};
  log("Encountered "+enemy.name);
  updateUI();
}

// COMBAT
function attack(mult){
  if(player.stam -= (mult === 1 ? 5 : 10);){
    log("Not enough stamina");
    return;
  }

  let dmg = Math.max(1, (player.atk * mult) - enemy.def);
  enemy.hp -= dmg;
  player.stam -= 5;

  log("You dealt "+dmg);

  if(enemy.hp <= 0){
    winFight();
    return;
  }

  let edmg = Math.max(1, enemy.atk - player.def);
  log(enemy.name+" hits "+edmg);

  updateUI();
}

// WIN
function winFight(){
  log("Enemy defeated!");

  mobsDrop();

  player.pts += 1;
  player.lvl++;

  chooseStat();

  enemy = null;
  updateUI();
}

// DROP
function mobsDrop(){
  let drops = enemy.drops;

  drops.forEach(d=>{
    if(Math.random() < 0.4){
      player.inventory.push(d);
      log("Got "+items[d].name);
    }
  });

  if(Math.random() < 0.4){
    player.inventory.push("potion");
    log("Got Potion");
  }
}

// INVENTORY
function renderInventory(){
  let inv = document.getElementById("inventory");
  inv.innerHTML="";

  player.inventory.forEach((item,i)=>{
    let btn = document.createElement("button");
    btn.innerText = items[item].name;
    btn.onclick = ()=>showPopup(item,i);
    inv.appendChild(btn);
  });
}

// POPUP
function showPopup(item,index){
  let p = document.getElementById("popup");
  p.classList.remove("hidden");

  p.innerHTML = `
    <h3>${items[item].name}</h3>
    <button onclick="useItem('${item}',${index})">Use/Equip</button>
    <button onclick="closePopup()">Cancel</button>
  `;
}

function closePopup(){
  document.getElementById("popup").classList.add("hidden");
}

// USE ITEM
function useItem(item,index){
  let it = items[item];

  if(it.type === "consumable"){
    player.stam += it.stam;
    log("Recovered stamina");
  } else {
    let slot = it.type;
    player.equip[slot] = item;

    if(it.atk) player.atk += it.atk;
    if(it.def) player.def += it.def;

    log("Equipped "+it.name);
  }

  player.inventory.splice(index,1);
  closePopup();
  updateUI();
}

// EQUIP UI
function renderEquip(){
  let eq = document.getElementById("equipment");
  eq.innerHTML="";

  for(let k in player.equip){
    eq.innerHTML += `<div>${k}: ${player.equip[k]||"None"}</div>`;
  }
}

// STATS
function chooseStat(){
  let choice = prompt("Choose stat: atk / def / stam");

  if(choice==="atk") player.atk++;
  if(choice==="def") player.def++;
  if(choice==="stam") player.stam+=5;
}

// TABS
function toggleInv(){
  document.getElementById("invPanel").classList.toggle("hidden");
}

function showTab(t){
  document.getElementById("inventory").classList.toggle("hidden", t!=="inv");
  document.getElementById("equipment").classList.toggle("hidden", t!=="equip");
}

function renderActions(){
  let act = document.getElementById("actions");

  if(!enemy){
    act.innerHTML = `<button onclick="newEnemy()">🔍 Find Enemy</button>`;
    return;
  }

  act.innerHTML = `
    <button onclick="attack(1)">⚔️ Attack (5 SP)</button>
    <button onclick="attack(1.5)">💥 Heavy (10 SP)</button>
    <button onclick="toggleInv()">🎒 Inventory</button>
  `;
}

// START
newEnemy();
updateUI();
renderActions();
