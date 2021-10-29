
var trex;

var t_running;

var bourda;

var solo;
var solo2;

var S1;
var S2;

var nuv1;
var bsta1;
var bsta2;
var bsta3;
var bsta4;
var bsta5;
var bsta6;

var TrexC;
var TrexP;
var game;
var GameOver;
var res;
var Restart;

var bsta_sorteio;
var Gnuv;
var Gbsta;

var state1 = "iniciar";

var pontuacao = 0;

var dieS;
var jumpS;
var checkS;
var control = 0;

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  solo = createSprite(width/2, height - 30,600,5);
  solo.shapeColor = "green";
  solo2 = createSprite(300, height -10,600,5);
  solo2.visible = false;
  
  solo.addImage(S1);
  
  bourda = createEdgeSprites();
  
  //criar um sprite do trex
  trex = createSprite(50,height-50,20,50);
  trex.addAnimation("parado", trexP);
  trex.addAnimation("running", t_running);
  trex.scale = 0.5;
  trex.addAnimation("collided",trexC);
    
  GameOver = createSprite(width/2, height/2 ,20,20);
  GameOver.addImage("gameOver", game);
  GameOver.visible = false;
  GameOver.depth = 5;
  GameOver.scale = 1.3;
  
  Restart = createSprite(width/2, (height/2) + 50,20,20);
  Restart.addImage("restart", res);
  Restart.scale = 0.7;
  Restart.visible = false;
  Restart.depth = 5;
  
  Gnuv = new Group();
  Gbsta = new Group();
  
  dieS = createVideo("EL TIRO MESSICANO.mp4");
  dieS.hide();
}

function genuv(){
  if(frameCount%40 == 0 && state1 == "jogando"){
    var nuv = createSprite(width + 8,random(height - 125,height - 145),100,30);
    Gnuv.add(nuv);
    nuv.addImage(nuv1);
    nuv.scale = random(0.6, 1);
    nuv.velocityX =-8;
    trex.depth = nuv.depth + 1;
    nuv.lifetime = 430;
    nuv.depth = 3;
}}

function bstaluco(){
  if(frameCount%40 == 0 && state1 == "jogando"){
     bsta_sorteio = Math.round(random(1,6));
     var bstaculo1 = createSprite(width + 8,height - 40,20,20);
     Gbsta.add(bstaculo1);
     bstaculo1.scale = 0.6;
     bstaculo1.velocityX = -8;
     switch(bsta_sorteio){
       case 1 : bstaculo1.addImage(bsta1);
     break;
     
       case 2 : bstaculo1.addImage(bsta2);
     break;
         
     case 3 : bstaculo1.addImage(bsta3); 
     break;
     
     case 4 : bstaculo1.addImage(bsta4); 
     break;
     
     case 5 : bstaculo1.addImage(bsta5); 
     break;
     
     case 6 : bstaculo1.addImage(bsta6); 
     break;
     }
    bstaculo1.depth = 3;
    bstaculo1.lifetime = 430;
    }
}

function check(){
  if(pontuacao%100 == 0 && pontuacao > 0){
      checkS.play();
  }
}

function collided(){
  if(trex.isTouching(Gbsta)){
    trex.changeAnimation("collided", trexC);
    state1 = "parar";
    /*if(control == 0){
      image(dieS, width/2, height/2);
      dieS.loop();
      dieS.x = 300
    }*/
  }
}
/*
function speed(){
  if(pontuacao%10 == 0 && pontuacao > 0){
    solo.velocityX +=100;
    solo2.velocityX +=100;
    Gbsta.setVelocityXEach(100);
    Gnuv.setVelocityXEach(100);
  }
}*/

function preload(){
  t_running = loadAnimation("trex1.png" , "trex3.png" , "trex4.png");
  nuv1 = loadImage("cloud.png");  
  S1 = loadImage("ground2.png");
  bsta1 = loadImage("obstacle1.png");
  bsta2 = loadImage("obstacle2.png");
  bsta3 = loadImage("obstacle3.png");
  bsta4 = loadImage("obstacle4.png");
  bsta5 = loadImage("obstacle5.png");
  bsta6 = loadImage("obstacle6.png");
  trexC = loadAnimation("trex_collided.png");
  trexP = loadAnimation("trex1.png");
  game = loadImage("gameOver.png");
  res = loadImage("restart.png");
  jumpS = loadSound("jump.mp3");
  checkS = loadSound("checkPoint.mp3");
}

function draw(){
  background("white");
  genuv();
  bstaluco();
  collided();
  check();
  trex.velocityY++;
  if(solo.x <= 0){
     solo.x = solo.width/2;
  }
  
  trex.collide(solo2);
  if(keyDown("space") || touches.length > 0){
    if(state1 == "iniciar"){
    state1 = "jogando";
    touches = [];
  }
}
  
  if(keyDown("space") || touches.length > 0){
    if(trex.y > height-50 && state1 == "jogando"){
    trex.velocityY  = -15;
    jumpS.play();
    touches = [];
  }
}
  
  
  if(state1 == "parar"){
    solo.velocityX = 0;
    Gbsta.setVelocityXEach(0);
    Gnuv.setVelocityXEach(0);
    
    GameOver.visible = true;
    Restart.visible = true;
    Gbsta.setLifetimeEach(-1);
    Gnuv.setLifetimeEach(-1);
    control = 1;
  }
  else if(state1 == "jogando"){
    solo.velocityX = -10;
    trex.changeAnimation("running", t_running);
    pontuacao++;
  }
  
  if(keyDown("r") || mousePressedOver(Restart) || touches.lenght> 0){
    if(state1 == "parar"){
    state1 = "jogando";
    Gbsta.destroyEach();
    Gnuv.destroyEach();
    trex.changeAnimation("parado", trexP);
    pontuacao = 0;
    control = 0;
    touches = [];
    
    GameOver.visible = false;
    Restart.visible = false;
  }
}
  
  
  //console.log(dieS.depth);
  //console.log(frameCount%60);
  drawSprites();
  
  textSize(25);
  text("pontuaçaum: " + pontuacao,width/2 - 100, height*0.10);
}