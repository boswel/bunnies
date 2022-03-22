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
  bunnyDelay;
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
    
    this.maxBunnyHeight = gameElements.bunnyspace.offsetHeight / 100 * 50; //px  // the magic 50 could be a var rabbitRelMaxHeight in the game settings/controls because it also determines difficulty
    this.lowestBunnyPosition = gameElements.bunnyspace.offsetHeight - this.maxBunnyHeight;
    this.rightmostBunnyPosition = gameElements.bunnyspace.offsetWidth / 3;

    this.timeLeft = this.duration;
    gameElements.countdown.innerHTML = this.timeLeft + " s";
    gameElements.countedClicksDisplay.textContent = this.countedClicks; 

    this.makeLives();
    Controls.addEventListeners();
  }

  async start() {
    this.timer = setInterval(async () => {
      this.timeLeft = Controls.decreaseTimer(this.timeLeft);
      
      if (this.timeLeft <= 0) {
        await this.end();
      }
    }, 1000);
  }

  async end() {
    clearInterval(this.timer);
    clearTimeout(this.bunnyDelay);

    let images = document.querySelectorAll("img");
    for (let image of images) {
      image.remove();
    }
    
    let countryName = await getCountryName();
    await updateHighScore();
    let countryScore = await getCountryScore(countryName);
  
    Controls.showFinalScore(this.countedClicks);   
    Controls.showCountryHighscore(countryScore, countryName);
  }                                               

	addRabbits(number) {

    for (let bunny = 0; bunny < number; bunny++) { 
      this.bunnyDelay = setTimeout(() => {

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

async function getCountryScore(countryName) { 
  return await fetch("/country?" + new URLSearchParams({country:countryName}))
  .then(response => response.text())
}

async function getCountryName() {
  return await fetch("https://geolocation-db.com/json/")
  .then(response => response.json())
  .then(json => json.country_name)
}

//${countryName}, ${this.countedClicks}
async function updateHighScore() {
  let data = `{
    "country": "Vatican",
    "highscore": 666 
  }`
  fetch("/save", {method : "POST", body : data, headers: {"content-type": "application/json"}}); 
}

/*
let noise = 'meow'
this[noise] === this['meow'] === this.meow
*/