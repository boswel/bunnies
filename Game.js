import { gameConfig, gameElements } from "./config.js";
import { Rabbit } from "./Rabbit.js";


export class Game {
  // options from config
  numberRabbitsStart; 
  numberRabbitsGame;
  speed;
  duration;
  counter = 0;
  rabbitPics;

  // other properties
  bunnyspace;
  travelTime;  // time for bunnies to leave the screen
  timeLeft;
  timer;
  maxBunnyHeight;
  lowestBunnyPosition; 
  rightmostBunnyPosition;

  constructor() {
    for (let option of Object.keys(gameConfig)) {
      this[option] = gameConfig[option];
    }

    this.timeLeft = this.duration;
    
    document.getElementById("countdown").innerHTML = this.timeLeft + " s";
    this.bunnyspace = document.getElementById("bunnyspace");
    this.travelTime = this.bunnyspace.offsetWidth / this.speed;
    this.bunnyspace.setAttribute("style", "--travel-time: " + this.travelTime + "s"); 
    
    this.maxBunnyHeight = this.bunnyspace.offsetHeight / 100 * 50; //px  // the magic 50 could be a var rabbitRelMaxHeight in the game settings/controls because it also determines difficulty
    this.lowestBunnyPosition = this.bunnyspace.offsetHeight - this.maxBunnyHeight;  // see above
    this.rightmostBunnyPosition = this.bunnyspace.offsetWidth / 3;
  }

  start() {
    this.timer = setInterval(() => {
      this.timeLeft--;
      document.getElementById("countdown").innerHTML = this.timeLeft + " s";

      if (this.timeLeft <= 0) {
        this.end();
      }
    }, 1000);
  }

  end() {
    clearInterval(this.timer);

    gameElements.countdown.hidden = true;
    gameElements.counter.hidden = true;

    //we actually want to remove the Rabbits, not only the imgs //having an array of rabbits might be useful
    let images = document.querySelectorAll("img");
    for (let image of images) {
      if (image.hasOwnProperty("rabbit")) {
        image.rabbit.delete();
      }
      else {
        image.remove();
      }
    }
          
    document.getElementById("end").hidden = false;
    let result_span = document.getElementById("clicks2");
    result_span.textContent = this.counter; 
    
    if (this.counter > localStorage.getItem("highscore")) {
        localStorage.setItem('highscore', this.counter);  
      }

    document.getElementById("highscore-points").textContent = localStorage.getItem('highscore');
  }

  addRabbits(number) {

    for (let bunny = 0; bunny < number; bunny++) { 
      setTimeout(() => {

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
        rabbit.attachTo(this.bunnyspace);

        setTimeout(                                             
          () => { rabbit.delete() },
          this.travelTime * 1000
        );

        rabbit.image.addEventListener("click", (event) => {
          this.addRabbits(this.numberRabbitsGame);
          event.target.rabbit.delete();
          this.counter++;
          let counter_span = document.getElementById("clicks1");
          counter_span.textContent = this.counter;
        });

      }, 200 * bunny);
    }
  }

}

/*
let noise = 'meow'
this[noise] === this['meow'] === this.meow
*/