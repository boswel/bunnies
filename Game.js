import { gameConfig, gameElements } from "./config.js";
import { Rabbit } from "./Rabbit.js";


export class Game {
  // options from config
  numberRabbitsStart; 
  numberRabbitsGame;
  speed;
  duration;
  rabbitPics;

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
  }

  start() {
    this.timer = setInterval(() => {
      this.timeLeft--;
      gameElements.countdown.innerHTML = this.timeLeft + " s";

      if (this.timeLeft <= 0) {
        this.end();
      }
    }, 1000);
  }

  end() {
    clearInterval(this.timer);
    clearTimeout(this.bunnyDelay);

    gameElements.countdown.hidden = true;
    gameElements.countedClicksDiv.hidden = true;

    //we actually want to remove the Rabbits, not only the imgs //having an array of rabbits might be useful
    let images = document.querySelectorAll("img");
    for (let image of images) {
      image.remove();
    }
    
          
    gameElements.end.hidden = false;
    gameElements.resultDisplay.textContent = this.countedClicks; 
    
    if (this.countedClicks > localStorage.getItem("highscore")) {
        localStorage.setItem("highscore", this.countedClicks);  
      }

    gameElements.highscoreDisplay.textContent = localStorage.getItem("highscore");
  }

  addRabbits(number) {

    for (let bunny = 0; bunny < number; bunny++) { 
      this.bunnyDelay = setTimeout(() => {

        let index = Math.floor(Math.random() * gameConfig.rabbitPics.length);
        let rabbit = new Rabbit(gameConfig.rabbitPics[index]);
        
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
          event.target.rabbit.detach();
          this.countedClicks++;
          gameElements.countedClicksDisplay.textContent = this.countedClicks;
        });

      }, 200 * bunny);
    }
  }

}

/*
let noise = 'meow'
this[noise] === this['meow'] === this.meow
*/