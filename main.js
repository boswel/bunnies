import { Controls } from "./Controls.js";
import {Game} from "./Game.js"

let myGame = new Game();

let first = true;

document.querySelectorAll("#lives img").forEach((item) => {
  item.addEventListener("click", (event) => {
    item.remove();    
    myGame.addRabbits(myGame.numberRabbitsStart);  //refers to myGame, so it can't be in Controls
    
    if (first) {
      document.getElementById("start").remove();
      myGame.start();
      first = false;
    }
  });
});

Controls.restart();
