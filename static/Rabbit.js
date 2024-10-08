export class Rabbit {

  image;
  static pops = [
    "./static/pops/pop0.ogg",
    "./static/pops/pop1.ogg",
    "./static/pops/pop2.ogg",
    "./static/pops/pop3.ogg",
    "./static/pops/pop4.ogg",
    "./static/pops/pop5.ogg",
    "./static/pops/pop6.ogg",
    "./static/pops/pop7.ogg",
    "./static/pops/pop8.ogg"
  ].map(function(audiosrc) {
      let newpop = new Audio();
      newpop.src = audiosrc;
      return newpop;
    }
  )
  static images = [
    "./static/images/bunny0.png",
    "./static/images/bunny1.png",
    "./static/images/bunny2.png",
    "./static/images/bunny3.png",
    "./static/images/bunny4.png",
    "./static/images/bunny5.png",
    "./static/images/bunny6.png",
    "./static/images/bunny7.png",
    "./static/images/bunny8.png",
    "./static/images/bunny9.png"
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
    this.image.rabbit = this;   // to have a reference to the Rabbit object (not used at the moment)
  }

  makeSound() {
    let index = Math.floor(Math.random() * this.constructor.pops.length); //////
    this.constructor.pops[index].play();  //this.constructor refers to class itself, gives access to static properties
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

  detach(shouldFadeOut) {  
    if (shouldFadeOut) {
      this.image.animate(
        [{transform: 'scale(1.2, 1.2)'}, {opacity: 0}],  
        {duration: 100}
      );
      
      setTimeout(                                             
        () => this.image.remove(), 100 // depends on fade out animation duration
      );
    }
    else {
      this.image.remove();
    }
  }

  setAppearance(scalingFactor) {

    this.image.style.zIndex = Math.floor(scalingFactor * 1000);
    
    let blurAmount = (1 - scalingFactor) * 2;
    this.image.style.filter = `drop-shadow(${scalingFactor * -7}px ${scalingFactor * -2}px ${scalingFactor * 10}px rgba(0, 0, 0, 0.2)) blur(${blurAmount}px)`;
  }

}



