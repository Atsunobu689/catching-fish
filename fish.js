let img1, img2, img3, img4, img5, img6, img7, img8, img9;
let x = [], y = [], dx = [], dy = [], clicked = [];
let img2Count = 0;

let squareWidth = 750;
let squareHeight = 550;
let squareX, squareY;

let typedText = '';
let showNextButton = false;

let waterSound, natureSound, splashSound;
let soundStarted = false;

function preload() {
  img1 = loadImage("img1.png"); 
  img2 = loadImage("img2.png");
  img3 = loadImage("img3.png"); 
  img4 = loadImage("img4.jpg"); 
  img5 = loadImage("img5.png");
  img6 = loadImage("img6.png");
  img7 = loadImage("img7.png");
  img8 = loadImage("img8.png");
  img9 = loadImage("img9.png");

  waterSound = loadSound("water.mp3");
  natureSound = loadSound("nature.mp3");
  splashSound = loadSound("splash.mp3"); 
}

function setup() {
  createCanvas(1500, 1800);
  centerSquare();
  noCursor();

  for (let i = 0; i < 8; i++) {
    x[i] = random(squareX, squareX + squareWidth - 200);
    y[i] = random(squareY, squareY + squareHeight - 200);
    dx[i] = random(3, 8) * (random() < 0.5 ? 1 : -1);
    dy[i] = random(3, 8) * (random() < 0.5 ? 1 : -1);
    clicked[i] = false;
  }
}

function centerSquare() {
  squareX = (width - squareWidth) / 2;
  squareY = 1000; 
}

function draw() {
  background(255, 255, 204); 
  image(img3, 150, 50, 1200, 900);

  fill(50, 60, 145);
  rect(squareX, squareY, squareWidth, squareHeight);

  for (let i = 0; i < 8; i++) {
    if (!clicked[i]) {
      image(img1, x[i], y[i], 200, 200);
      x[i] += dx[i];
      y[i] += dy[i];

      if (x[i] < squareX || x[i] > squareX + squareWidth - 200) dx[i] *= -1;
      if (y[i] < squareY || y[i] > squareY + squareHeight - 200) dy[i] *= -1;
    }
  }

  if (img2Count > 0) {
    let img2Width = width / 8;
    let img2Height = img2.height * img2Width / img2.width;
    for (let i = 0; i < img2Count; i++) {
      let xPos = (width / 8) * i;
      image(img2, xPos, height - img2Height - 60, img2Width, img2Height);
    }

    if (img2Count === 8) {
      textAlign(CENTER);
      textSize(48);
      fill(255, 100, 150);
      text("Type Feast", width / 2, squareY + 200);
    }
  }

  if (showNextButton) {
    let img4Width = 500;
    let img4Height = 200;
    image(img4, width / 2 - img4Width / 2, height * 4.7 / 8, img4Width, img4Height);
  }

  image(img6, squareX, squareY, 750, 600);
  image(img7, squareX + 230, squareY + 250, 300, 350);
  image(img5, mouseX -100, mouseY, 150, 300);
  image(img8, 0, 0, 1500, 950);
  image(img9, -100, 950, 600, 600);
}

function mousePressed() {
  if (!soundStarted) {
    waterSound.setVolume(0.1);  
    natureSound.setVolume(0.5); 
    waterSound.loop(); 
    natureSound.loop();
    soundStarted = true;
  }

  if (showNextButton) {
    let img4Width = 500;
    let img4Height = 200;
    let img4X = width / 2 - img4Width / 2;
    let img4Y = height * 4.7 / 8;

    if (mouseX > img4X && mouseX < img4X + img4Width && mouseY > img4Y && mouseY < img4Y + img4Height) {
      window.open("https://elbowman01.github.io/FoxyStartle/", "_blank");
    }
  }

  for (let i = 0; i < 8; i++) {
    if (!clicked[i] && mouseX > x[i] && mouseX < x[i] + 200 && mouseY > y[i] && mouseY < y[i] + 200) {
      clicked[i] = true;
      img2Count++;
      splashSound.setVolume(0.8); 
      splashSound.play();         
      break;
    }
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    centerSquare();
    for (let i = 0; i < 8; i++) {
      x[i] = random(squareX, squareX + squareWidth - 200);
      y[i] = random(squareY, squareY + squareHeight - 200);
      dx[i] = random(3, 8) * (random() < 0.5 ? 1 : -1);
      dy[i] = random(3, 8) * (random() < 0.5 ? 1 : -1);
      clicked[i] = false;
    }
    img2Count = 0;
    typedText = '';
    showNextButton = false;
  }

  typedText += key;
  typedText = typedText.slice(-5);

  if (typedText.toLowerCase() === "feast") {
    showNextButton = true;
  }
}
