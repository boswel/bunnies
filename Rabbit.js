export class Rabbit {

  image;
  static audio = new Audio("./pop4.ogg");

  constructor(rabbitPic) {
    this.image = new Image();
    this.image.src = rabbitPic;
    this.image.alt = "cute rabbit";
    this.image.rabbit = this;   // to have a reference to the Rabbit object (e.g. for deleting it)
    this.image.classList.add("rabbit");   
  }

  makeSound() {
    this.constructor.audio.play();  //this.constructor refers to the class itself and gives access to static properties
  }

  setHeight(height) { //width sets itself
    this.image.style.height = height + "px";
  }

  setPosition(left, top) {
    this.image.style.left = left + "px";
    this.image.style.top = top + "px";
  }

  attachTo(element) {
    element.appendChild(this.image);
  }

  detach() {  
    this.image.remove();
  }

  setAppearance(scalingFactor) {

    this.image.style.zIndex = Math.floor(scalingFactor * 1000);
    
    let blurAmount = (1 - scalingFactor) * 2;
    this.image.style.filter = `drop-shadow(${scalingFactor * -7}px ${scalingFactor * -2}px ${scalingFactor * 10}px rgba(0, 0, 0, 0.2)) blur(${blurAmount}px)`;
  }

}