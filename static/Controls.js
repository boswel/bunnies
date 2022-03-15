import { gameElements } from "./config.js";

export class Controls {

  static incrementBunnyCount(countedClicks) {
    gameElements.countedClicksDisplay.textContent = ++countedClicks;
    return countedClicks;
  }
  
  static decreaseTimer(timeLeft) {
    gameElements.countdown.innerHTML = --timeLeft + " s";
    return timeLeft;
  }
  
  static showFinalScore(countedClicks) {

    gameElements.countdown.hidden = true;
    gameElements.countedClicksDiv.hidden = true;   //for these two, maybe just disappear the container

    gameElements.end.hidden = false;
    gameElements.resultDisplay.textContent = countedClicks; 
    
    if (countedClicks > localStorage.getItem("highscore")) {  //should this be in here or in Game? 
        localStorage.setItem("highscore", countedClicks);     //as the highscore needs to be displayed and 
      }                                                       //therefore calculated, rather here...?

    gameElements.highscoreDisplay.textContent = localStorage.getItem("highscore");

  }

  static addEventListeners() {
    gameElements.again.addEventListener("click", (event) => {
      window.location.reload(true);  
    });
  }  
}