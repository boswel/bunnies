export const gameConfig = {
  numberRabbitsStart: 3,
  numberRabbitsGame: 2,
  speed: 200,
  duration: 5,
  rabbitPics: [
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
  ]
}

export const gameElements = {
  bunnyspace: document.getElementById("bunnyspace"),
  countdown: document.getElementById("countdown"),
  countedClicksDiv: document.getElementById("counter"),
  countedClicksDisplay: document.getElementById("clicks1"),
  end: document.getElementById("end"),
  resultDisplay: document.getElementById("clicks2"),
  highscoreDisplay: document.getElementById("highscore-points")
}

