import * as Db from "./dbfunctions.js";
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
  countedClicks = 0;
  maxBunnyHeight;
  lowestBunnyPosition; 
  rightmostBunnyPosition;
  gameOn = false;

  constructor() {
    for (let option of Object.keys(gameConfig)) {
      this[option] = gameConfig[option];
    }
    
    gameElements.countries.innerHTML = "";
    Db.getBestCountries()
    .then(data => Controls.createHighscoreTable(data))
    .then(table => gameElements.countries.append(table))
    
    gameElements.ownCountry.innerHTML = "";
    
    Db.getCountryInfo()
    .then(json => {
      this.countryName = json.country_name;
      this.countryCode = json.country_code;
      return this.countryCode
    })
    .then(countryCode => Db.getCountryRecords(countryCode))
    .then(data => Controls.createHighscoreTable(data))
    .then(table => gameElements.ownCountry.append(table))
    .catch(error => Controls.displayErrorMessage())

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
  }

  async start() {
    this.gameOn = true;
    gameElements.countryTable.hidden = true;
    this.timer = setInterval(async () => {
      this.timeLeft = Controls.decreaseTimer(this.timeLeft);
      
      if (this.timeLeft <= 0) {
        await this.end();
      }
    }, 1000);
  }

  async end() {
    this.gameOn = false;
    clearInterval(this.timer);    

    let images = document.querySelectorAll("img");
    for (let image of images) {
      image.remove();
    }
    
    let oldRecords = await Db.getCountryRecords(this.countryCode);
    let oldHighScore = oldRecords.info.length ? oldRecords.info[0].highscore : 0
    Controls.showFinalCarrotsCountry(oldHighScore, this.countedClicks);
    
    await Db.updateHighScore(this.countryName, this.countryCode, this.countedClicks);
    Controls.showFinalScore(this.countedClicks);   
    
    gameElements.countryTable.hidden = false;

    gameElements.countries.innerHTML = "";
    Db.getBestCountries()
    .then(data => {
      let table = Controls.createHighscoreTable(data);
      gameElements.countries.append(table);
    })
        
    gameElements.ownCountry.innerHTML = "";
    Db.getCountryRecords(this.countryCode)
    .then(data => {
      let table = Controls.createHighscoreTable(data);
      gameElements.ownCountry.append(table);
      
    })
  }                                               

	addRabbits(number) {
    
      for (let bunny = 0; bunny < number; bunny++) { 
        setTimeout(() => {
          if (this.gameOn) {
          
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
            () => rabbit.detach(),
            this.travelTime * 1000
          );

          rabbit.image.addEventListener("mousedown", (event) => {
            this.addRabbits(this.numberRabbitsGame);
      
            let shouldFadeOut = true;
            rabbit.detach(shouldFadeOut);
            
            this.countedClicks = Controls.incrementBunnyCount(this.countedClicks);
          });
        }
      }, 200 * bunny);
    }
  }

  makeLives() {
    let first = true;

    gameElements.livesimages.forEach((item) => {
      item.addEventListener("mousedown", (event) => {
        if (first) {
          gameElements.start.remove();
          this.start();
          first = false;
        }     
        
        if (!gameElements.bunnyspace.children.length) {
          item.remove();    
          this.addRabbits(this.numberRabbitsStart);  
        }
      });
    });
  }
}



/*
let noise = 'meow'
this[noise] === this['meow'] === this.meow
*/