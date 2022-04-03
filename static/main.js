import {Game} from "./Game.js"

let myGame = new Game();
myGame.createHighscoreTable();


addEventListener("load", function(){
  document.getElementById("app-container").classList.remove("hidden");
});