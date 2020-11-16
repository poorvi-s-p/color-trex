 var PLAY=1;
  var END=0;
  var gameState=PLAY;
  var backgroundImage;
  var ground,groundImage,invisibleground;
  var  trex,trexrunningImage,trexstandingImage;
  var cloudsGroup,cloudImage;
  var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6, obstacle;
  var score;
var jumpSound,collidedSound;
  var gameOverImg,restartImg;

  //function preload
  function preload(){
    backgroundImage=loadImage("backgroundImg.png");
    groundImage=loadImage("ground.png");

  trexrunningImage =loadAnimation("trex_1.png","trex_2.png","trex_3.png");
    trexstandingImage = loadAnimation("trex_collided-1.png");

  cloudImage=loadImage("cloud-1.png");

   obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");
restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");

    jumpSound=loadSound("jump.wav");
    collideSound=loadSound("collided.wav");
    
    

  }

  //function setup
  function setup(){
    createCanvas(windowWidth,windowHeight);
    ground = createSprite(width/2,height-20,width,2);
    ground.addImage("ground.png",groundImage);
    ground.scale=1;

    obstaclesGroup = createGroup();
    cloudsGroup = createGroup();

     invisibleGround =createSprite(width/2,height-10,width,130);
    invisibleGround.visible = false;


    trex = createSprite(50,height-70,20,50);
    trex.addAnimation("running", trexrunningImage);
    trex.addAnimation("collided", trexstandingImage);
  trex.scale=0.08;
    
    gameOver = createSprite(width/2,height/2-50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
    score = 0;
    trex.setCollider("rectangle",0,0,trex.width,trex.height);
  trex.debug = false 
  
  
    
  }
  //funcion draw
  function draw(){
      background(backgroundImage);
      
 text("Score: "+ score, 500,50);
if(gameState === PLAY){
  gameOver.visible = false;
    restart.visible = false;
    
  ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
  ground.velocityX=-4;
  
  
  
   if(touches.length>0||keyDown("space")&& trex.y >=70) {
        trex.velocityY = -12;
     touches=[];
     jumpSound.play();
      }
    
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
 
 trex.velocityY = trex.velocityY + 0.8
  
  if(obstaclesGroup.isTouching(trex)){
        //trex.velocityY = -12;
    collideSound.play();
 gameState = END;
    
     }
}
    
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      
      
      //change the trex animation
      trex.changeAnimation("collided", trexstandingImage);
    
      ground.velocityX = 0;
      trex.velocityY = 0
      if(mousePressedOver(restart)) {
      reset();
        
    }
       //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);    
   
      
    }
    
      
    

      obstaclesGroup.depth = trex.depth;
      trex.depth = trex.depth + 1;

    
    trex.collide(invisibleGround);
    console.log(trex.y)
    
      spawnClouds();
      spawnObstacles();
      drawSprites();
    }
function reset(){
  gameState=PLAY;
  trex.changeAnimation("running",trexrunningImage);
  

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
   
}


    function spawnObstacles(){
     if (frameCount % 60 === 0){
       obstacle = createSprite(width,height-95,10,40);
       obstacle.velocityX = -6;



        //generate random obstacles
        var rand = Math.round(random(1,6));
        switch(rand) {
          case 1: obstacle.addImage(obstacle1);
                  break;
          case 2: obstacle.addImage(obstacle2);
                  break;
          case 3: obstacle.addImage(obstacle3);
                  break;
          case 4: obstacle.addImage(obstacle4);
                  break;
          case 5: obstacle.addImage(obstacle5);
                  break;
          case 6: obstacle.addImage(obstacle6);
                  break;
          default: break;
        }

        //assign scale and lifetime to the obstacle           
        obstacle.scale = 0.5;
        obstacle.lifetime = 300;

       //add each obstacle to the group
        obstaclesGroup.add(obstacle);
     }
    }

    function spawnClouds() {
      //write code here to spawn the clouds
      if (frameCount % 60 === 0) {
        var cloud = createSprite(width,height-300,40,10);
        cloud.y = Math.round(random(10,90));
        cloud.addImage(cloudImage);
        cloud.scale = 0.5;
        cloud.velocityX = -3;

         //assign lifetime to the variable
        cloud.lifetime = 200;

        //adjust the depth
        cloud.depth = trex.depth;
        trex.depth = trex.depth + 1;

        //add each cloud to the group
        cloudsGroup.add(cloud);
      }
    }

