var backimg, backgr;

var play = 1;
var end = 2;

var gamestate = play;
var player, running, collided;
var ground, groundimg;

var obstaclegroup, obstacle, obsImg;

var gameover, gameoverImg;
var score=0;


function preload(){
  backImage=loadImage("ground.png");
  running = loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png", "boy5.png", "boy6.png","boy7.png","boy8.png");
  collided=loadAnimation("boy9.png","boy10.png");
  
  obsImg = loadImage("bear_trap.png"); 
  //gameoverImg = loadImage("");
}

function setup() {
  createCanvas(1200,500);
  
  backgr=createSprite(1200,450,1500,40);
  backgr.addImage(backImage);
  backgr.scale=2;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,290,20,50);
  player.addAnimation("running",running);
  player.addAnimation("collided",collided);
  player.scale = 1;
  
  ground = createSprite(400,300,1600,10);
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
  
   if (gamestate===play) {

    gameover.visible = false;

    
    if(backgr.x<500){
      backgr.x=backgr.width/2;
    }
    
      if(keyDown("space") && (player.y>=200) ) {
        player.velocityY = -10;
      }

      player.velocityY = player.velocityY + 0.9;
    
      player.collide(ground);
      //spawnObstacles();
   
      /*if(obstaclegroup.isTouching(player)){ 
          player.scale=0.2;
        score = score - 2;
        gamestate=end;
      }
       */
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

  drawSprites();
}