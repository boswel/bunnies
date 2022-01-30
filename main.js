generateRabbit();

function generateRabbit() {
  let image = document.createElement("img")
  let container = document.getElementById("bunnyspace");
  container.appendChild(image);

  randomRabbit = Math.floor(Math.random() * 10);
  image.src = "./images/bunny" + randomRabbit + ".png";
  image.alt = "cute rabbit";
  image.classList.add("rabbit");
  image.addEventListener("click", generateRabbit);

  let maxBunnyHeight = container.offsetHeight / 100 * 50; //px
  let lowestPosition = container.offsetHeight - maxBunnyHeight;

  let scalingFactor = Math.random();
  image.style.height = (maxBunnyHeight * scalingFactor) + "px";
  image.style.top = (lowestPosition * scalingFactor) + "px";

  let bunnyWidth = parseFloat(getComputedStyle(image).getPropertyValue("height"));
  let rightmostPosition = container.offsetWidth - bunnyWidth;
  image.style.left = (rightmostPosition * Math.random()) + "px";
 
  image.style.zIndex = Math.floor(scalingFactor * lowestPosition);
  image.style.filter = "blur(" + ((1 - scalingFactor) * 2) + "px)";
}