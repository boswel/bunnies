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
    this.createHighscoreTable();
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
    clearTimeout(this.bunnyDelay);

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
    this.createHighscoreTable();
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

  async createHighscoreTable() {
    let table = document.createElement("table");
    let body = table.createTBody();
    
    let info = await getBestCountries();
    
    for (let entry of info.best) {              
			let tr = body.insertRow();
      let flag = tr.insertCell();
      let country = tr.insertCell();
      let score = tr.insertCell();
      
      flag.textContent = getFlagEmoji(entry[1]);
      country.textContent = entry[0]; 
      score.textContent = entry[2]; 
		}
    
    gameElements.countries.innerHTML = "";
    gameElements.countries.append(table);
  }



}

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

function getFlagEmoji(countryCode) {
  return countryCode.toUpperCase().replace(/./g, char => 
      String.fromCodePoint(127397 + char.charCodeAt())
  );
}

async function getBestCountries() {
  return await fetch("/best")
  .then(response => response.json()) 
}





/*
let noise = 'meow'
this[noise] === this['meow'] === this.meow
*/