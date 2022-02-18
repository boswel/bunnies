import {Rabbit} from "./Rabbit.js"
import {Game} from "./Game.js"

let myGame = new Game();

let counter_span = document.getElementById("clicks1");
counter_span.textContent = counter; 

let first = true;

document.querySelectorAll("#lives img").forEach((item) => {
  item.addEventListener("click", (event) => {
    item.remove();
    document.getElementById("start").remove();
    myGame.addRabbits(myGame.numberRabbitsStart);
    
    if (first) {
      myGame.start();
      first = false;
    }
  });
});

document.getElementById("again").addEventListener("click", (event) => {
  window.location.reload(true);    
});