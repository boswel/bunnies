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
    gameElements.countedClicksDiv.hidden = true;

    gameElements.end.hidden = false;
    gameElements.resultDisplay.textContent = countedClicks; 
    
    if (countedClicks > localStorage.getItem("highscore")) { 
        gameElements.personalCarrots.hidden = false;
        localStorage.setItem("highscore", countedClicks);      
      }                                                       

    gameElements.highscoreDisplay.textContent = localStorage.getItem("highscore");

  }

  static showFinalCarrotsCountry(oldScore, countedClicks) { 
    if (countedClicks > oldScore) { 
        gameElements.countryCarrots.hidden = false; 
      }    
  }

  static createHighscoreTable(data) { 

    let table = document.createElement("table");
    let body = table.createTBody();

    for (let entry of data.info) {              
			let tr = body.insertRow();
      let flag = tr.insertCell();
      let country = tr.insertCell();
      let score = tr.insertCell();
      
      country.textContent = entry.name_en; 
      score.textContent = entry.highscore; 
      
      let img = document.createElement('img');
      let code = entry.code.toLowerCase();
      
      img.src = "https://flagcdn.com/16x12/" + code + ".png";
      img.srcset = "https://flagcdn.com/32x24/" + code + ".png 2x, https://flagcdn.com/48x36/" + code + ".png 3x";
      img.width = "16";
      img.height = "12";
      img.alt = "Flag of " + entry.name_en;   

      flag.appendChild(img);
		}

    return table;
  }
  
  static displayErrorMessage() {
    gameElements.error.hidden = false;
    gameElements.lives.hidden = true;
  }
}



