import { gameConfig, gameElements } from "./config.js";
import { Controls } from "./Controls.js";
import { Rabbit } from "./Rabbit.js";


export class Game {
  // options from config
  numberRabbitsStart; 
  numberRabbitsGame;
  speed;
  duration;
  
  // other properties
  travelTime;  // time for bunnies to leave the screen
  timeLeft;
  timer;
  bunnyDelays = {}; // it's an object because in an array, either the indexing would be messed up or there would be empty slot after the removal; in the object, the keys don't hav to be in sequence
  countedClicks = 0;
  maxBunnyHeight;
  lowestBunnyPosition; 
  rightmostBunnyPosition;

  constructor() {
    for (let option of Object.keys(gameConfig)) {
      this[option] = gameConfig[option];
    }

    this.travelTime = gameElements.bunnyspace.offsetWidth / this.speed;
    gameElements.bunnyspace.setAttribute("style", "--travel-time: " + this.travelTime + "s"); 
    
    if (gameElements.bunnyspace.offsetWidth > 480) {
      this.maxBunnyHeight = gameElements.bunnyspace.offsetHeight / 100 * 50; //px  
    }
    else {
      this.maxBunnyHeight = gameElements.bunnyspace.offsetHeight / 100 * 25;
    }

    this.lowestBunnyPosition = gameElements.bunnyspace.offsetHeight - this.maxBunnyHeight;
    this.rightmostBunnyPosition = gameElements.bunnyspace.offsetWidth / 3;

    this.timeLeft = this.duration;
    gameElements.countdown.innerHTML = this.timeLeft + " s";
    gameElements.countedClicksDisplay.textContent = this.countedClicks; 

    this.makeLives();
    Controls.createHighscoreTable();
    Controls.addEventListeners();
  }

  async start() {
    gameElements.countryTable.hidden = true;
    this.timer = setInterval(async () => {
      this.timeLeft = Controls.decreaseTimer(this.timeLeft);
      
      if (this.timeLeft <= 0) {
        await this.end();
      }
    }, 1000);
  }

  async end() {
    clearInterval(this.timer);    
 
    for (let delay of Object.keys(this.bunnyDelays)) {
      clearTimeout(delay);
      delete this.bunnyDelays[delay];
    } 

    let images = document.querySelectorAll("img");
    for (let image of images) {
      image.remove();
    }
    
    let countryInfo = await getCountryInfo();
    let countryName = countryInfo.country_name;
    let countryCode = countryInfo.country_code;
    await updateHighScore(countryName, countryCode, this.countedClicks);
    let countryScore = await getCountryScore(countryCode);
  
    Controls.showFinalScore(this.countedClicks);   
    Controls.showCountryHighscore(countryScore, countryName);
    gameElements.countryTable.hidden = false;
    Controls.createHighscoreTable();
  }                                               

	addRabbits(number) {

    for (let bunny = 0; bunny < number; bunny++) { 
      let delay = setTimeout(() => {

        delete this.bunnyDelays[delay];

        let rabbit = new Rabbit();
        
        let scalingFactor = Math.random();
        let height = this.maxBunnyHeight * scalingFactor;
        let top = this.lowestBunnyPosition * scalingFactor;
        let left = this.rightmostBunnyPosition * Math.random();

        rabbit.makeSound();
        rabbit.setHeight(height);
        rabbit.setPosition(left, top)
        rabbit.setAppearance(scalingFactor);
        rabbit.attachTo(gameElements.bunnyspace);

        setTimeout(                                             
          () => { 
            rabbit.detach();
          },
          this.travelTime * 1000
        );

        rabbit.image.addEventListener("click", (event) => {
          this.addRabbits(this.numberRabbitsGame);
          rabbit.detach();
          this.countedClicks = Controls.incrementBunnyCount(this.countedClicks);
        });

      }, 200 * bunny);
      
      this.bunnyDelays[delay] = delay;
    }
  }

  makeLives() {
    let first = true;

    gameElements.lives.forEach((item) => {
      item.addEventListener("click", (event) => {
        item.remove();    
        this.addRabbits(this.numberRabbitsStart);  
        
        if (first) {
          gameElements.start.remove();
          this.start();
          first = false;
        }
      });
    });
  }
}


//these are both in Controls and in Game, at the moment -> refactor
async function getCountryScore(countryCode) { 
  return await fetch("/country?" + new URLSearchParams({country:countryCode}))
  .then(response => response.text())
}
async function getCountryInfo() {
  return await fetch("https://geolocation-db.com/json/")
  .then(response => response.json())
}

async function updateHighScore(countryName, countryCode, countedClicks) {
  let data = {
    "country": countryName,   
    "country_code": countryCode,
    "highscore": countedClicks 
  }
  await fetch("/save", {method : "POST", body : JSON.stringify(data), headers: {"content-type": "application/json"}}); 
}

async function getBestCountries() {
  return await fetch("/best")
  .then(response => response.json()) 
}


/*
let noise = 'meow'
this[noise] === this['meow'] === this.meow
*/