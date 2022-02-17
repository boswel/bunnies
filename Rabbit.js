export class Rabbit {

  image;
  /*speed;
  visibility;
  sound;
  position = {top, left}; //maybe*/
  static container = document.getElementById("bunnyspace");  ////
  static travelTime = 5; ////

  constructor(rabbitPics) {
    let randomRabbit = Math.floor(Math.random() * rabbitPics.length);
    this.image = new Image();
    this.image.src = rabbitPics[randomRabbit];
    this.image.alt = "cute rabbit";
    this.image.classList.add("rabbit");   
  }

  delete() {

  }

  appear(scalingFactor) {
    //update height based on top - or not
    let maxHeight = Rabbit.container.offsetHeight / 100 * 50; //px  // this is actually static; and the magic 50 could be a var rabbitRelMaxHeight in the game settings/controls because it also determines difficulty
    this.image.style.height = (maxHeight * scalingFactor) + "px"; 
   
    let lowestPosition = Rabbit.container.offsetHeight - maxHeight;  // see above
    this.image.style.top = (lowestPosition * scalingFactor) + "px";

    let bunnyWidth = parseFloat(getComputedStyle(this.image).getPropertyValue("height"));
    let rightmostPosition = (container.offsetWidth - bunnyWidth) / 2;  // divisor could/should be var
    this.image.style.left = (rightmostPosition * Math.random()) + "px";
  
    this.image.style.zIndex = Math.floor(scalingFactor * lowestPosition);
    
    let blurAmount = (1 - scalingFactor) * 2;
    this.image.style.filter = `drop-shadow(${scalingFactor * -7}px ${scalingFactor * -2}px ${scalingFactor * 10}px rgba(0, 0, 0, 0.2)) blur(${blurAmount}px)`;
    
    setTimeout(                                             
      () => { this.image.remove() },  // not only remove the image but destroy the Rabbit instance
      Rabbit.travelTime * 1000
    );
  }

  disappear() {

  }

  multiply() {

  }  

  move() {

  }

  onClick() {

  }
  

}