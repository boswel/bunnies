import {Rabbit} from "./Rabbit.js"


const audio = new Audio("./pop4.ogg");
const rabbitPics = [
  "./images/bunny0.png",
  "./images/bunny1.png",
  "./images/bunny2.png",
  "./images/bunny3.png",
  "./images/bunny4.png",
  "./images/bunny5.png",
  "./images/bunny6.png",
  "./images/bunny7.png",
  "./images/bunny8.png",
  "./images/bunny9.png"
]

const numberRabbitsBunnies = 2; //maybe some dictionary "gameState"; also "controls" -> references to all things in 1 object, "control.counter", "control.lives" 
const numberRabbitsStart = 3;  
let travelTime = 5;
let gameDuration = 30;
document.getElementById("countdown").innerHTML = gameDuration + " s";
let counter = 0;
let counter_span = document.getElementById("clicks1");
counter_span.textContent = counter; 

let container = document.getElementById("bunnyspace");
container.setAttribute("style", "--travel-time: " + travelTime + "s");  

function getRabbits(numberRabbits) {
  for (let rabbit = 0; rabbit < numberRabbits; rabbit++) { 
    setTimeout(
      () => { generateRabbit(numberRabbitsBunnies) },
      200 * rabbit
    );
  }
}

function generateRabbit(numberRabbits) {
  audio.play();
  
  let rabbit = new Rabbit(rabbitPics);
  container.appendChild(rabbit.image);
  rabbit.appear(Math.random());
  
  rabbit.image.addEventListener("click", (event) => {
    getRabbits(numberRabbits);
    event.target.remove();
    counter++;
    let counter_span = document.querySelector("span");
    counter_span.textContent = counter;
  });
}

let first = true;

document.querySelectorAll("#lives img").forEach((item) => {
  item.addEventListener("click", (event) => {
    item.remove();
    getRabbits(numberRabbitsStart);
    
    if (first) {
      startGame();
      first = false;
    }
  });
});

function startGame() {
  document.getElementById("start").remove();
  
  let x = setInterval(function() {
    gameDuration--;
    document.getElementById("countdown").innerHTML = gameDuration + " s";

    if (!gameDuration) {
      clearInterval(x);
      document.getElementById("countdown").hidden = true;
      document.getElementById("counter").hidden = true;
      
      let images = document.querySelectorAll("img");
      for (let i = 0; i < images.length; i++) {
        images[i].remove();
      }
            
      document.getElementById("end").hidden = false;
      let result_span = document.getElementById("clicks2");
      result_span.textContent = counter; 
      
      if (counter > localStorage.getItem("highscore")) {
          localStorage.setItem('highscore', counter);  
        }

      document.getElementById("highscore-points").innerText = localStorage.getItem('highscore');
    }
  }, 1000);
}

document.getElementById("again").addEventListener("click", (event) => {
  
  
  
  window.location.reload(true);    
});