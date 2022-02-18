import { gameConfig } from "./config.js";

export class Game {
  bunnyspace;
  numberRabbitsStart;
  numberRabbitsGame;
  travelTime;  // time for bunnies to leave the screen
  timeLeft;
  counter = 0;
  timer;
  maxBunnyHeight;
  lowestBunnyPosition; 

  constructor() {
    for (let option of Object.keys(gameConfig)) {
      this[option] = gameConfig[option];
    }

    document.getElementById("countdown").innerHTML = this.timeLeft + " s";
    this.bunnyspace.setAttribute("style", "--travel-time: " + this.travelTime + "s"); 
    this.maxBunnyHeight = this.bunnyspace.offsetHeight / 100 * 50; //px  // this is actually const/static/general whatever; and the magic 50 could be a var rabbitRelMaxHeight in the game settings/controls because it also determines difficulty
    this.lowestBunnyPosition = this.bunnyspace.offsetHeight - this.maxBunnyHeight;  // see above
  }

  start() {
    this.timer = setInterval(function() {
      this.timeLeft--;
      document.getElementById("countdown").innerHTML = this.timeLeft + " s";

      if (this.timeLeft <= 0) {
        this.end();
      }
    }, 1000);
  }

  end() {
    clearInterval(this.timer);

    document.getElementById("countdown").hidden = true;
    document.getElementById("counter").hidden = true;
    
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
    result_span.textContent = counter; 
    
    if (counter > localStorage.getItem("highscore")) {
        localStorage.setItem('highscore', counter);  
      }

    document.getElementById("highscore-points").textContent = localStorage.getItem('highscore');
  }

  addRabbits(number) {

    for (let rabbit = 0; rabbit < number; rabbit++) { 
      setTimeout(() => {

        let index = Math.floor(Math.random() * gameConfig.rabbitPics.length);
        let rabbit = new Rabbit(gameConfig.rabbitPics[index]);
        // calculate x & y coordinates for rabbit position
          // get scaling factor
          // with scaling factor, calculate y coordinate
          // select random x coordinate within boundaries
          // pass x & y & scaling factor = 1 to rabbit.appear()
        rabbit.appear(Math.random(), this.maxBunnyHeight);

        rabbit.image.addEventListener("click", (event) => {
          this.addRabbits(numberRabbitsGame);
          event.target.rabbit.delete();
          counter++;
          let counter_span = document.querySelector("span");
          counter_span.textContent = counter;
        });

      }, 200 * rabbit);
    }
  }

}

/*
let noise = 'meow'
this[noise] === this['meow'] === this.meow
*/