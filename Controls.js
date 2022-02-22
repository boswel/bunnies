import { gameConfig, gameElements } from "./config.js";

export class Controls {
  //options from config
  numberRabbitsStart; 
  numberRabbitsGame;
  speed;
  duration;
  rabbitPics;
  
  //calculated or set options
  travelTime;  // time for bunnies to leave the screen
  //bunnyDelay;
  maxBunnyHeight;
  lowestBunnyPosition; 
  rightmostBunnyPosition;

  constructor() { 
    for (let option of Object.keys(gameConfig)) { 
        this[option] = gameConfig[option];
      }

    this.travelTime = gameElements.bunnyspace.offsetWidth / this.speed;
    gameElements.bunnyspace.setAttribute("style", "--travel-time: " + this.travelTime + "s"); 
    
    this.maxBunnyHeight = gameElements.bunnyspace.offsetHeight / 100 * 50; //px  // the magic 50 could be a var rabbitRelMaxHeight in the game settings/controls because it also determines difficulty
    this.lowestBunnyPosition = gameElements.bunnyspace.offsetHeight - this.maxBunnyHeight;
    this.rightmostBunnyPosition = gameElements.bunnyspace.offsetWidth / 3;
    }

  setTimeLeft() {
    return this.duration;
  }

  selectRabbitPic() {
    let index = Math.floor(Math.random() * this.rabbitPics.length); 
    return this.rabbitPics[index];
  }

  setBunnyHeight(scalingFactor) {
    return this.maxBunnyHeight * scalingFactor;
  }

  setBunnyTop(scalingFactor) {
    return this.lowestBunnyPostion * scalingFactor;
  }

  setBunnyLeft(number) {
    return this.rightmostBunnyPosition * number;
  }

  setNumberRabbitsGame() {
    return this.numberRabbitsGame;
  }

}