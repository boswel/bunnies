export class Rabbit {

  image;
  top; ////
  height;
  speed;
  visibility;
  sound;
  position = {top, left}; //maybe
  container;

  constructor(container, rabbitPics) {
    let randomRabbit = Math.floor(Math.random() * rabbitPics.length);
    this.image = new Image();
    this.image.src = rabbitPics[randomRabbit];
    this.image.alt = "cute rabbit";
    this.image.classList.add("rabbit");   
    this.container = container;
  }

  delete() {

  }

  appear(number) {
    //update height based on top
    this.image.style.height = (maxHeight * number) + "px"; /////
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