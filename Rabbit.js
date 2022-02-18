export class Rabbit {

  image;
    static container = document.getElementById("bunnyspace");  ////
  static travelTime = 5; ////
  static audio = new Audio("./pop4.ogg");

  constructor(rabbitPic) {
    this.image = new Image();
    this.image.src = rabbitPic;
    this.image.alt = "cute rabbit";
    this.image.rabbit = this;   // to have a reference to the Rabbit object (e.g. for deleting it)
    this.image.classList.add("rabbit");   
  }

  delete() {
    this.image.remove();
    delete this;
  }

  appear(scalingFactor, maxHeight, lowestPosition) { //either send an area or x/y coordinates to position bunny
    this.constructor.audio.play();  //this.constructor refers to the class itself and gives access to static properties
    this.constructor.container.appendChild(this.image);
    
    this.image.style.height = (maxHeight * scalingFactor) + "px";     
    this.image.style.top = (lowestPosition * scalingFactor) + "px";

    let bunnyWidth = parseFloat(getComputedStyle(this.image).getPropertyValue("height"));
    let rightmostPosition = (container.offsetWidth - bunnyWidth) / 2;  // divisor could/should be var /////
    this.image.style.left = (rightmostPosition * Math.random()) + "px";
  
    this.image.style.zIndex = Math.floor(scalingFactor * lowestPosition);
    
    let blurAmount = (1 - scalingFactor) * 2;
    this.image.style.filter = `drop-shadow(${scalingFactor * -7}px ${scalingFactor * -2}px ${scalingFactor * 10}px rgba(0, 0, 0, 0.2)) blur(${blurAmount}px)`;
    
    setTimeout(                                             
      () => { this.image.remove() },  // not only remove the image but destroy the Rabbit instance
      Rabbit.travelTime * 1000
    );
  }
  
}