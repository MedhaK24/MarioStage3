var bgimg;
var mi;
var ms;
var iground;
var coini;
var ob1i, ob2i, ob3i;
var gstate = "play";
var coing, obstacleg
var score = 0
var bg

function preload() {
  bgimg = loadImage("backg.jpg");
  mi = loadAnimation("Capture1.png", "Capture3.png", "Capture4.png");
  coini = loadImage("coin.png");
  ob1i = loadImage("obstacle1.png");
  ob2i = loadImage("obstacle2.png");
  ob3i = loadImage("obstacle3.png");
}

function setup() {
  createCanvas(600, 200);
  bg = createSprite(0,0,600,200)
  bg.addImage(bgimg)
  bg.scale = 0.8
  ms = createSprite(50, 50, 70, 70);
  ms.addAnimation("Mario Game", mi);
  ms.scale = 0.5;
  iground = createSprite(300, 170, 600, 5);
  iground.visible = false;

  coing = new Group()
  obstacleg = new Group()
}

function draw() {
  background('white');
  drawSprites();
  stroke('black')
  text("Score: " + score, 50, 50)
  if (gstate == "play") {
    bg.velocityX = -5
    if(bg.x<0){
      bg.x=300
    }

    if (keyDown("space")) {
      ms.velocityY = -5;
    }

    ms.velocityY = ms.velocityY + 1;
    makecoins();
    makeobstacles();

    if(ms.isTouching(obstacleg)){
      gstate = "end"
    }

    
    for(var i = 0; i<coing.length; i++) {
      if(coing.get(i).isTouching(ms)) {
        score = score + 1
        coing.get(i).destroy()
      }
    }
  }

  if (gstate == "end") {
    obstacleg.setVelocityXEach(0);
    coing.setVelocityXEach(0);

    bg.velocityX = 0
  }

  ms.collide(iground);
}

function makecoins() {
  if (frameCount % 60 == 0) {
    var coinsprite = createSprite(590, 70, 50, 50);
    coinsprite.velocityX = -2;
    coinsprite.addImage(coini);
    coinsprite.scale = 0.15;
    coing.add(coinsprite);
  }
}

function makeobstacles() {
  if (frameCount % 70 == 0) {
    var obstaclesprite = createSprite(590, 150, 50, 50);
    obstaclesprite.velocityX = -3;
    obstaclesprite.scale = 0.2
    var r = Math.round(random(1, 3));
    switch (r) {
      case 1:
        obstaclesprite.addImage(ob1i);
        break;

      case 2:
        obstaclesprite.addImage(ob2i);
        break;

      case 3:
        obstaclesprite.addImage(ob3i);
        break;
    }
    obstacleg.add(obstaclesprite);
  }
}
