let audio = new Audio("./pop4.ogg");
let numberRabbits = 3; //maybe some dictionary "gameState"; also "controls" -> references to all things in 1 object, "control.counter", "control.lives"; preload audio & bunny files, use index for bunny files "assets" 
let travelTime = 5;
let counter = 0;
let counter_span = document.querySelector("span");
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

  randomRabbit = Math.floor(Math.random() * 10);
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
  image.style.filter = "blur(" + ((1 - scalingFactor) * 2) + "px)";
  
  setTimeout(                                             
      () => { image.remove() },
      travelTime * 1000
    );
}


let lives = document.getElementById("lives")
lives.addEventListener("click", (event) => {
  event.target.remove();
  getRabbits(numberRabbits);
  document.getElementById("start").remove();      //would be better to check whether it exists
});



