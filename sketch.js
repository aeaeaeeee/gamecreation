var backimg, backgr;

var play = 1;
var end = 2;

var gamestate = play;
var player, running, collided;
var ground, groundimg;

var obstaclegroup, obstacle, obsImg;

var gameover, gameoverImg;
var score=0;

var lifeTime;

function preload(){
  backImage=loadImage("ground.png");
  running = loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png", "boy5.png", "boy6.png","boy7.png","boy8.png");
  collided=loadAnimation("boy9.png");
  
  obsImg = loadImage("bear_trap.png"); 
  //gameoverImg = loadImage("");
}

function setup() {
  createCanvas(1200,500);
  
  backgr=createSprite(1200,580,1500,40);
  backgr.addImage(backImage);
  backgr.scale=2;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,440,20,50);
  player.addAnimation("running",running);
  player.addAnimation("collided",collided);
  player.scale = 1;
  
  ground = createSprite(400,450,1600,10);
  ground.x=ground.width/2;
  ground.visible=false;


  gameover = createSprite(400,100);
  //gameover.addImage(gameoverImg);



  gameover.scale = 0.8;
  
  obstaclegroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(0);
  fill("white");
  textSize(20);
  text("Score: " + score, 100, 50)

   if (gamestate===play) {

    gameover.visible = false;

  
    if(backgr.x<200){
      backgr.x=backgr.width/2;
    }
    
      if(keyDown("space") && (player.y>=370) ) {
        player.velocityY = -10;
      }
      
      backgr.velocityX = -(4+score/100);
      score = score + Math.round(frameCount/60);

      player.velocityY = player.velocityY + 1;
    
      player.collide(ground);
      spawnObstacles();
   
      if(obstaclegroup.isTouching(player)){ 
        gamestate=end;
      }
       
   }

   else if (gamestate===end){
     backgr.velocityX=0;
     player.velocityY=0;
     ground.velocityX=0;
     
     player.changeAnimation("collided",collided);

     obstaclegroup.setLifetimeEach(-1);
     obstaclegroup.setVelocityXEach(0);

      lifeTime=lifeTime-1;

      if(mousePressedOver()){
        reset();
      }
   }

   if(frameCount % 60 === 0)

    spawnObstacles();

  drawSprites();
}

function spawnObstacles()
{
  if(frameCount % 60 === 0)
  {
  obstacle = createSprite(1100, 430);
  obstacle.velocityX = -(6 + 2*score/150);
  obstacle.scale = 0.015;
  obstacle.addImage(obsImg);
  obstacle.setLifetime=170;
  obstaclegroup.add(obstacle);
  }
}