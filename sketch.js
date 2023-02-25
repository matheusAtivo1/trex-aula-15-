var PLAY=1;
var END=0;
var gameState = PLAY;
var restart,restartImg,gameOver,gameOverImg;
var ground,groundImg;
var trex ,trex_running,trex_collided;
var invisibleGround;
var cloud,cloudImg;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,score;
var obstaclesGroup,cloudsGroup;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
groundImg = loadImage("ground2.png");
cloudImg = loadImage("cloud.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");




}

function setup(){
  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.x =50;
  trex.addAnimation("collided",trex_collided);
  trex.scale =0.5;
ground = createSprite (200,180,400,20);
ground.addImage (groundImg);
invisibleGround = createSprite (200,190,400,10);
invisibleGround.visible = false;
restart = createSprite (300,140);
restart.addImage (restartImg);
restart.scale = 0.75;
gameOver = createSprite(300,100);
gameOver.addImage (gameOverImg);
gameOver.scale = 0.75;
score=0;
obstaclesGroup =new  Group();
cloudsGroup = new Group();
trex.debug = false;
trex.setCollider("rectangle",0,0,40,40);
}

function draw(){
  background("white");
if(gameState === PLAY){
  text("score: "+score,500,75);
  score =score +Math.round(frameCount/60);
  gameOver.visible= false;
  restart.visible= false;
    ground.velocityX= -4;
  if(ground.x<0){
  ground.x = ground.width /2;
  
  }
  if (keyDown("space")&&trex.y>=160){
    trex.velocityY =-10;
    
      }
      
    trex.velocityY +=0.5;
    spawnClouds();
    spawnObstacles();
    if (obstaclesGroup.isTouching(trex)){
      gameState = END;
      }
}else if(gameState === END){
ground.velocityX =0;
trex.velocityY =0;
obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);
trex.changeAnimation("collided",trex_collided);
obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);
gameOver.visible= true;
restart.visible= true;

}





//console.log(trex.y);
  

  





trex.collide(invisibleGround);









  drawSprites();

}
function spawnClouds(){
  if(frameCount % 70 ===0){
cloud = createSprite (600,100,40,10);
cloud.velocityX -=3;
cloud.addImage (cloudImg);
cloud.y = Math.round(random(10,40));
cloud.depth = trex.depth;
trex.depth = trex.depth+1;
cloud.lifetime = 240;
cloudsGroup.add(cloud);
}


}

function spawnObstacles(){
if(frameCount % 60 ===0){
obstacle = createSprite (600,165,10,40);
obstacle.scale =0.5;
obstacle.velocityX =-6;
var rand=Math.round(random(1,6));
switch(rand){
case 1:obstacle.addImage(obstacle1);
break;
case 2:obstacle.addImage(obstacle2);
break;
case 3:obstacle.addImage(obstacle3);
break;
case 4:obstacle.addImage(obstacle4);
break;
case 5:obstacle.addImage(obstacle5);
break;
case 6:obstacle.addImage(obstacle6);
break;
default:break;
}
obstacle.lifetime= 110;
obstaclesGroup.add(obstacle);
}


}

















