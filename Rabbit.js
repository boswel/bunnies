export class Rabbit {

  image;
  top; ////
  height;
  speed;
  visibility;
  sound;
  position = {top, left}; //maybe

  constructor(image, height) {
    this.image = image;   
  }

  delete() {

  }

  appear() {
    //update height based on top
    this.image.style.height = this.height;
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