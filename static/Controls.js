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
        localStorage.setItem("highscore", countedClicks);      
      }                                                       

    gameElements.highscoreDisplay.textContent = localStorage.getItem("highscore");

  }

  static showCountryHighscore(countryScore, countryName) {
    gameElements.countryHighscoreDisplay.textContent = countryScore;
    gameElements.countryDisplay.textContent = countryName;
  }


// createHighscoreTable(getBestCountries())
// insert <hr>...
// createHighscoreTable(getOwnCountry())

  static async createHighscoreTable() { //this is really 2 tables -> write more general function, call it twice with different "info"
    let table = document.createElement("table");
    let body = table.createTBody();
    
    //this will be removed here & used to create the data that act as an input to createHighscoreTable
    let info = await getBestCountries();
    
    for (let entry of info.best) {              
			let tr = body.insertRow();
      let flag = tr.insertCell();
      let country = tr.insertCell();
      let score = tr.insertCell();
      
      country.textContent = entry[0]; 
      score.textContent = entry[2]; 

      let img = document.createElement('img');
      let code = entry[1].toLowerCase();
      
      img.src = "https://flagcdn.com/16x12/" + code + ".png";
      img.srcset = "https://flagcdn.com/32x24/" + code + ".png 2x, https://flagcdn.com/48x36/" + code + ".png 3x";
      img.width = "16";
      img.height = "12";
      img.alt = "Flag of " + entry[0];   

      flag.appendChild(img);
		}
    
    gameElements.countries.innerHTML = "";
    gameElements.countries.append(table);


    let ownTable = document.createElement("table");
    let ownBody = ownTable.createTBody();
    let ownTr = ownBody.insertRow();
    let ownFlag = ownTr.insertCell();
    let ownCountry = ownTr.insertCell();
    let ownScore = ownTr.insertCell();

    let countryInfo = await getCountryInfo(); 
    ownCountry.textContent = countryInfo.country_name;
    ownScore.textContent = await getCountryScore(countryInfo.country_code); 

    let ownImg = document.createElement('img');
    let ownCode = countryInfo.country_code.toLowerCase();
    
    ownImg.src = "https://flagcdn.com/16x12/" + ownCode + ".png";
    ownImg.srcset = "https://flagcdn.com/32x24/" + ownCode + ".png 2x, https://flagcdn.com/48x36/" + ownCode + ".png 3x";
    ownImg.width = "16";
    ownImg.height = "12";
    ownImg.alt = "Flag of " + countryInfo.country_name;   

    ownFlag.appendChild(ownImg);

    gameElements.ownCountry.innerHTML = "";
    gameElements.ownCountry.append(ownTable);
  }

  static addEventListeners() {
    gameElements.again.addEventListener("click", (event) => {
      window.location.reload(true);  
    });
  }  
}

async function getCountryScore(countryCode) { 
  return await fetch("/country?" + new URLSearchParams({country:countryCode}))
  .then(response => response.text())
}

async function getCountryInfo() {
  return await fetch("https://geolocation-db.com/json/")
  .then(response => response.json())
}

async function updateHighScore(countryName, countryCode, countedClicks) {
  let data = {
    "country": countryName,   
    "country_code": countryCode,
    "highscore": countedClicks 
  }
  await fetch("/save", {method : "POST", body : JSON.stringify(data), headers: {"content-type": "application/json"}}); 
}

async function getBestCountries() {
  return await fetch("/best")
  .then(response => response.json()) 
}




