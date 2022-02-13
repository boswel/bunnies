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

const numberRabbits = 3; //maybe some dictionary "gameState"; also "controls" -> references to all things in 1 object, "control.counter", "control.lives"; preload audio & bunny files, use index for bunny files "assets" 
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
      () => { generateRabbit(numberRabbits) },
      200 * rabbit
    );
  }
}

function generateRabbit(numberRabbits) {
  audio.play();
  
  let image = document.createElement("img")
  container.appendChild(image);

  randomRabbit = Math.floor(Math.random() * 10); //attached to the window object, which is not what I want ;)
  image.src = "./images/bunny" + randomRabbit + ".png";
  image.alt = "cute rabbit";
  image.classList.add("rabbit");
  
  image.addEventListener("click", (event) => {
    getRabbits(numberRabbits);
    event.target.remove();
    counter++;
    let counter_span = document.querySelector("span");
    counter_span.textContent = counter;
  });
 
  let maxBunnyHeight = container.offsetHeight / 100 * 50; //px
  let lowestPosition = container.offsetHeight - maxBunnyHeight;

  let scalingFactor = Math.random();
  image.style.height = (maxBunnyHeight * scalingFactor) + "px";
  image.style.top = (lowestPosition * scalingFactor) + "px";

  let bunnyWidth = parseFloat(getComputedStyle(image).getPropertyValue("height"));
  let rightmostPosition = (container.offsetWidth - bunnyWidth)/2;
  image.style.left = (rightmostPosition * Math.random()) + "px";
 
  image.style.zIndex = Math.floor(scalingFactor * lowestPosition);
  
  let blurAmount = (1 - scalingFactor) * 2;
  image.style.filter = `drop-shadow(${scalingFactor * -7}px ${scalingFactor * -2}px ${scalingFactor * 10}px rgba(0, 0, 0, 0.2)) blur(${blurAmount}px)`;
  
  setTimeout(                                             
      () => { image.remove() },
      travelTime * 1000
    );
}

let first = true;

document.querySelectorAll("#lives img").forEach((item) => {
  item.addEventListener("click", (event) => {
    item.remove();
    getRabbits(numberRabbits);
    
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
            
      document.getElementById('end').hidden = false;
      let result_span = document.getElementById("clicks2");
      result_span.textContent = counter; 

    }
  }, 1000);
}

