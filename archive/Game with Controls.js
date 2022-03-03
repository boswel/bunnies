import { gameElements } from "./config.js";
import { Controls } from "./Controls.js";
import { Rabbit } from "./Rabbit.js";


export class Game {
  
  controls;
  timeLeft;
  timer;  
  countedClicks = 0;
  bunnyDelay; //is created by addRabbits() -> must be property of Game?
  
  constructor() {
    this.controls = new Controls();  
    this.timeLeft = controls.setTimeLeft(); ////
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

        let rabbit = new Rabbit(controls.selectRabbitPics()); ////
        
        let scalingFactor = Math.random();
        let height = controls.setBunnyHeight(scalingFactor); ////
        let top = controls.setLowestBunnyPosition(scalingFactor); ////
        let left = controls.setRightmostBunnyPosition(Math.random()); ////

        rabbit.makeSound();
        rabbit.setHeight(height);
        rabbit.setPosition(left, top);
        rabbit.setAppearance(scalingFactor);
        rabbit.attachTo(gameElements.bunnyspace);

        setTimeout(                                             
          () => { 
            rabbit.detach();
          },
          this.travelTime * 1000
        );

        rabbit.image.addEventListener("click", (event) => {
          this.addRabbits(controls.setNumberRabbitsGame());///////////////
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