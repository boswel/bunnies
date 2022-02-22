import {Game} from "./Game.js"

let myGame = new Game();

let first = true;

document.querySelectorAll("#lives img").forEach((item) => {
  item.addEventListener("click", (event) => {
    item.remove();    
    myGame.addRabbits(myGame.numberRabbitsStart);
    
    if (first) {
      document.getElementById("start").remove();
      myGame.start();
      first = false;
    }
  });
});

document.getElementById("again").addEventListener("click", (event) => {
  window.location.reload(true);    
});