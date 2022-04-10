import { gameConfig, gameElements } from "./config.js";
import { Controls } from "./Controls.js";
import { Rabbit } from "./Rabbit.js";


export class Game {
  // options from config
  numberRabbitsStart; 
  numberRabbitsGame;
  speed;
  duration;

  //country info
  countryName;
  countryCode;

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
    
    gameElements.countries.innerHTML = "";
    getBestCountries()
    .then(data => Controls.createHighscoreTable(data))
    .then(table => gameElements.countries.append(table))
    
    gameElements.ownCountry.innerHTML = "";
    
    getCountryInfo()
    .then(json => {
      this.countryName = json.country_name;
      this.countryCode = json.country_code;
      return this.countryCode
    })
    .then(countryCode => getCountryScore(countryCode))
    .then(data => Controls.createHighscoreTable(data))
    .then(table => gameElements.ownCountry.append(table))

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
    
    await updateHighScore(this.countryName, this.countryCode, this.countedClicks);
    Controls.showFinalScore(this.countedClicks);   
    
    gameElements.countryTable.hidden = false;

    gameElements.countries.innerHTML = "";
    getBestCountries()
    .then(data => {
      let table = Controls.createHighscoreTable(data);
      gameElements.countries.append(table);
    })
        
    gameElements.ownCountry.innerHTML = "";
    getCountryScore(this.countryCode)
    .then(data => {
      let table = Controls.createHighscoreTable(data);
      gameElements.ownCountry.append(table);
      
    })
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
async function getCountryInfo() {
  return await fetch("https://geolocation-db.com/json/")
  .then(response => response.json())
}

async function getCountryScore(countryCode) { 
  return await fetch("/country?" + new URLSearchParams({country:countryCode}))
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