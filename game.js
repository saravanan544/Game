let player = {
  hp: 100,
  atk: 10
};

function updateStats() {
  document.getElementById("hp").innerText = player.hp;
  document.getElementById("atk").innerText = player.atk;
}

function setStory(text, choices) {
  document.getElementById("story").innerText = text;

  let choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  choices.forEach(choice => {
    let btn = document.createElement("button");
    btn.innerText = choice.text;
    btn.onclick = choice.action;
    choicesDiv.appendChild(btn);
  });
}

// Scenes
function startGame() {
  updateStats();
  setStory("You wake up in a dark forest. A path splits ahead.",
    [
      { text: "Go left", action: fightGoblin },
      { text: "Go right", action: findPotion }
    ]
  );
}

function fightGoblin() {
  let damage = Math.floor(Math.random() * 15);
  player.hp -= damage;

  if (player.hp <= 0) {
    return gameOver("A goblin defeated you 💀");
  }

  setStory(`You fought a goblin! You lost ${damage} HP.`,
    [
      { text: "Continue", action: startGame }
    ]
  );

  updateStats();
}

function findPotion() {
  player.hp += 20;

  setStory("You found a potion! +20 HP",
    [
      { text: "Continue", action: startGame }
    ]
  );

  updateStats();
}

function gameOver(message) {
  setStory(message,
    [
      { text: "Restart", action: resetGame }
    ]
  );
}

function resetGame() {
  player.hp = 100;
  player.atk = 10;
  startGame();
}

// Start game
startGame();
