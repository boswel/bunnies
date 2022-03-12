export class Rabbit {

  image;
  static audio = new Audio("./pop4.ogg");
  static images = [
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
  ].map(function(imagesrc) {
      let newimage = new Image();
      newimage.src = imagesrc;
      newimage.alt = "cute rabbit";
      newimage.classList.add("rabbit"); 
      return newimage;
    }
  )

  constructor() {
    let index = Math.floor(Math.random() * this.constructor.images.length);
    this.image = this.constructor.images[index].cloneNode();
    this.image.rabbit = this;   // to have a reference to the Rabbit object (e.g. for deleting it)
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