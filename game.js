const text = document.getElementById("text");
const optionButtons = document.getElementById("option-buttons");
// const backpack = document.getElementById("backpack");

//BACKPACK
const backpack = {};

const getScroll = next => {
  backpack.scroll = true;
  return next;
};
const getRope = next => {
  backpack.rope = true;
  return next;
};

const itemsFunc = () => {
  if (Object.keys(backpack).length === 0) return "empty";
  if (backpack.scroll) return "mysterious scroll";
};

const items = document.getElementById("items").innerHTML = `Backpack: ${itemsFunc()}`

const backpackStatus = () => {
  if (backpack.scroll === true) return "a mysterious scroll from the golbin";
  else return "nothing in your backpack";
};
const golbinStatus = () => {
  if (backpack.takeGoblin === true) return "guided by the golbin";
  else return "without the goblins help";
};

//   ROLL
//   let d20Roll = () => {
//     let roll = Math.ceil(Math.random() * 20);
//     if (roll < 6) return pass//fail
//     else pass//pass
//   }

//CLASSES
class Player {
  constructor(name) {
    (this.name = name),
      (this.health = 100),
      (this.persuasion = Math.ceil(Math.random() * 10)),
      (this.agility = 10),
      (this.attack = Math.ceil(Math.random() * 10)),
      (this.intimidation = Math.ceil(Math.random() * 10));
  }
  attack() {
    if (!this.hitPoints > goblin.health) {
      fight(this.name, enemy); //fight not yet made
    }
  }
}
//PLAYER DECLERATION
const Connie = new Player("Connie");
const playerStats = (document.getElementById(
  "player-stats"
).innerHTML = `Health: ${Connie.health}, Attack: ${Connie.attack}, Persuasion: ${Connie.persuasion}, Intimidation: ${Connie.intimidation}`);

class Enemy {
  constructor(name) {
    this.health;
    this.hitPoints;
  }
}

//ENEMIES

let enemyTrack = {};

const goblin = {
  health: 10,
  hitPoints: 10
};

const d20Roll = () => {
  return Math.ceil(Math.random() * 20);
};

let playerTurn = true;
let damageDealt = 0;
let recievedDamage = 0;

const goblinAttack = () => {
  diceRoll = d20Roll() + Connie.attack;
  goblin.health -= diceRoll;
  damageDealt += diceRoll;
  if (goblin.health < 1) return 4;
  else return playerDefend(d20Roll);
};

const playerDefend = () => {
  diceRoll = d20Roll();
  Connie.health -= diceRoll;
  recievedDamage = diceRoll;
  // console.log(diceRoll, Connie.health);
  if (Connie.health < 1) return 404;
  return 3;
};

const takeGoblin = num => {
  backpack.takeGoblin = true;
  return num;
};

const intimidationRoll = () => {
  diceRoll = d20Roll() + Connie.intimidation;
  if (diceRoll > 20) return 10;
  else return 9;
};

const persuasionRoll = () => {
  diceRoll = d20Roll() + Connie.persuasion;
  if (diceRoll > 20) return 6;
  else return 7;
};

//GAME FUNCTIONS
function startGame() {
  console.log(Connie);
  showCurrentOption(1);
}

function showCurrentOption(index) {
  const currentText = textNodes.find(currentText => currentText.id === index);
  // console.log(currentText)
  //find index
  text.innerText = currentText.text; //set index as text
  console.log(optionButtons.firstChild);
  while (optionButtons.firstChild) {
    optionButtons.removeChild(optionButtons.firstChild);
  }
  currentText.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option.text;
    button.addEventListener("click", () => optionSelect(option));
    optionButtons.appendChild(button);
  });
}

function optionSelect(option) {
  const nextOption = option.nextText;
  showCurrentOption(nextOption);
}

//TEXT NODES
const textNodes = [
  {
    id: 1,
    text:
      "As you walk into the woods, you notice two dead horses on the path in front of you",
    options: [
      {
        text: "Approach the horses",
        nextText: 2
      },
      {
        text: "Investigate the surrounding area",
        nextText: getRope(20)
      }
    ]
  },
  {
    id: 2,
    text:
      "As you approach the horses, you notice a strange smell... goblins! A goblin stagges out of the woods ready to ambush you",
    options: [
      {
        text: "Attack! [ROLL FOR ATTACK]", //win === 4 //
        nextText: goblinAttack() //
      },
      {
        text:
          "Intimidate it to try and get information [ROLL FOR INTIMIDATION]",
        nextText: intimidationRoll() //gain scroll
      },
      {
        text:
          "Try to persuade it to change it's lifestyle choices [ROLL FOR PERSUASION]",
        nextText: persuasionRoll() //gain scroll
      }
    ]
  },
  {
    id: 3, //investigate the surrounding area
    text: `You roll ${damageDealt} - but it seems to just irritate him. He lauches himself towards you and deals ${recievedDamage} damage`,
    options: [
      {
        text: "Fight back [ROLL FOR ATTACK]", //win === 4 //
        nextText: goblinAttack()
      }
    ]
  },
  {
    id: 4,
    text: `In one massive swing, you deal the golbin ${damageDealt} of damage... Looks like he's pretty much done for now. "Please don't kill me!", he begs`,
    options: [
      {
        text: "Kill him!", //win === 4 //
        nextText: getScroll("5a")
      },
      {
        text: "Spare him",
        nextText: "5b"
      }
    ]
  },
  {
    id: "5a",
    text:
      "As the heartless adventurer you are, you don't listen to the golbins pleas. Just as he's pulling out a picture of himself holding a baby golbin you assume to be his child, you swing your sword and chop off his head. As he falls to the ground, a scroll falls out his pocket...",
    options: [
      {
        text: "Pick up the scroll and continue on your journey", //win === 4 //
        nextText: getScroll(405)
      },
      {
        text:
          "Leave the scroll (it's all sticky with golbin blood anyway) and continue on your journey",
        nextText: 405
      }
    ]
  },
  {
    id: "5b",
    text:
      '"Thank you so much for sparing me! I tell you what, I can take you down this road if you want, show  you round as a way of thanks..." Can you trust him?',
    options: [
      {
        text: "Let him take you and continue your adventure together", //win === 4 //
        nextText: takeGoblin(405)
      },
      { text: "Venture on alone", nextText: 405 }
    ]
  },
  {
    id: 6,
    text: "You're abolutely terrifying - the goblin screams and runs off",
    options: [
      {
        text: "Continue with your adventure",
        nextText: 405
      }
    ]
  },
  {
    id: 7,
    text:
      "There's a tense pause... then the golbin starts laughing 'You think that could scare me?!', he says...",
    options: [
      {
        text: "Attack! [ROLL FOR ATTACK]",
        nextText: goblinAttack()
      }
    ]
  },
  {
    id: 405,
    text: `This is the end of your adventure for now. You venture on ${takeGoblin()} with ${backpackStatus()}`
  },
  {
    id: 9,
    text:
      "You deliver an incredible and inspirational speech. The golbin, tears in his eyes, agrees that he has made some poor decisions and wants to change his life choices...He offers to be your companion and guide you through the woods...",
    options: [
      {
        text: "Accept his help and continue your adventure together",
        nextText: takeGoblin(405)
      },
      { text: "Venture on alone", nextText: 405 }
    ]
  },
  {
    id: 10,
    text:
      "You deliver a terrible speech, so bad that you might as well be speaking a different language... And the golbin doens't look convinced at all",
    options: [
      {
        text: "Attack! [ROLL FOR ATTACK]",
        nextText: goblinAttack()
      },
      { text: "Use your powers of persuasion", nextText: persuasionRoll() }
    ]
  }
];

startGame();
console.log(backpack);
