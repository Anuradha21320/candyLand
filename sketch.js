// creating variables
var invisibleGround;
var Basket;
var candy;
var candiesGroup;
var virus;
var virusGroup;
var bg1img,bg2img;
var candy1img,candy2img,candy3img,candy4img,candy5img;
var virus1img,virus2img,virus3img;
var basketimg;
var drop1, drop2, drop3, drop4,dropimg;
var bg;
var gameoverImg,gameover
var restart,restartImg
var gameState = "start"
var score = 0;
var num = 0;




function preload(){
  // loading images for the variables

        bg1img = loadImage("bg1.png");
        bg2img = loadImage("bg2.png");
        
        virus1img = loadImage("v1.png");
        virus2img = loadImage("v2.png");
        virus3img = loadImage("v3.png");
        candy1img = loadImage("c1.png");
        candy2img = loadImage("c2.png");
        candy3img = loadImage("c3.png");
        candy4img = loadImage("c4.png");
        candy5img = loadImage("c5.png");
        gameoverImg = loadImage("gameover.png");
        
        basketImg = loadImage("basket.png");
        dropImg = loadImage("drop.png");
        restartImg = loadImage("restart.png");
  }

function setup() {
      createCanvas(1200,600);

      // groups for candies and viruses
      candiesGroup = new Group();
      virusGroup = new Group();

      //creating sprite for invisible ground

      invisibleGround = createSprite(600,600,1200,10);
      invisibleGround.visible = false;

      // sprite for bg

      bg = createSprite(600,300,1200,600);
      bg.addImage(bg1img);
      bg.scale = 2;
      bg.visible = false;

      // sprite for basket

      basket = createSprite(600,450,5,20);
      basket.addImage(basketImg);
      basket.scale = 0.2;
      basket.visible = false;

      // sprite for restart

      restart = createSprite(600,400,20,20);
      restart.addImage(restartImg);
      restart.visible = false;
      restart.scale = 0.4;

      // sprite for drops

      drop1 = createSprite(610,15,10,10);
      drop1.addImage("drop",dropImg);
      drop1.scale = 0.1;
      drop1.visible = false;
      drop2 = createSprite(620,15,10,10);
      drop2.addImage("drop",dropImg);
      drop2.scale = 0.1;
      drop2.visible = false;
      drop3 = createSprite(630,15,10,10);
      drop3.addImage("drop",dropImg);
      drop3.scale = 0.1;
      drop3.visible = false;
      drop4 = createSprite(640,15,10,10);
      drop4.addImage("drop",dropImg);
      drop4.scale = 0.1;
      drop4.visible = false;
      drop5 = createSprite(650,15,10,10);
      drop5.addImage("drop",dropImg);
      drop5.scale = 0.1;
      drop5.visible = false;

}

function draw() {


  if(gameState === "start"){
    background(bg2img);

    // text for instructions of the game
    
        textSize(20);
        fill("black");
        strokeWeight(0.9);
        stroke("black")

        text("WELCOME TO CANDYLAND !!!!!", 500, 30);
        text("Here you have to collect all the candies", 400, 60);
        text("and if you miss any candy then you will lose the game",400, 80);
        text("In candyland there are viruses too,stay away from them",400,100);
        text("Dont collect any candies along with viruses",400,120);
        text("And if you collect then you can use sanitizer which can save you only one time",400,140);
        text("use the arrow keys to move the basket",400,160);
        text("If you collect 6 viruses then you lose the game",400,180)
        text("Collect 30 candies to win the game",400,200)
        text("Press space to continue",400,220);
      
          if(keyWentDown("space")){
          
              gameState = "play";
              background("white")
          }
        }


        if(gameState === "play"){
          background("white");

         bg.visible = true;
          basket.visible = true;
         
          
        
          // making sprites visible in gamestate play
          drop1.visible = true;
          drop2.visible = true;
          drop3.visible = true;
          drop4.visible = true;
          drop5.visible = true;

          // allowing basket to move with the help of arrow keys

          if(keyWentDown("RIGHT_ARROW")){

            basket.velocityX = 5
            }
            if(keyWentDown("LEFT_ARROW")){
            
            basket.velocityX = -5
            }
          candies();
          viruses();
          drop();
          

      fill("black");
      textSize(20)
      text("candyCount: "+score, 250, 15);

      if(candiesGroup.isTouching(basket)){

      candiesGroup.destroyEach();
      score = score + 1
      }
      if(candiesGroup.isTouching(invisibleGround)){
        candiesGroup.destroyEach();
        gameState = "over"
        }

      if(virusGroup.isTouching(basket)){

        virusGroup.destroyEach();
        num = num +1
        }
        if(num === 5){
          textSize(20);
         
          text("You can use the sanitizer",300,65);
        }
 
        if(num===6){
        gameState = "over"
        }
        if(score === 30){
          gameState = "over"
          textSize(45);
          stroke("red");
          text("YOU WON !!!",500,100)
        }
        
        textSize(20);
        text("virusCount: "+num, 40, 15);

          }
          if(gameState==="over"){
            background(gameoverImg);
            basket.visible = false;
            basket.velocityX = 0;
            basket.velocityY = 0;

            candiesGroup.destroyEach();
            virusGroup.destroyEach();

            restart.visible = true;
            bg.visible = false;
            console.log(gameState);
            drop1.destroy();
            drop2.destroy();
            drop3.destroy();
            drop4.destroy();
            drop5.destroy();


            if(mousePressedOver(restart)) {
              reset();

            }
              }
            drawSprites();
          }
          // function for candies

      function candies(){

        if(frameCount % 60 === 0){
        var candy = createSprite(0,0,10,10);
        candy.x = random(10,1100);
        candy.y = random(10,100);
        candy.velocityY = 4 + score/15
        candy.lifetime = 600/4;
        //candy.scale = 0.04

        
        var rand = Math.round(random(1,5));
        switch(rand){
        
        case 1: {candy.addImage(candy1img);
        candy.scale = 0.04
        break;}
        case 2: {candy.addImage(candy2img);
        candy.scale = 0.1
        break;}
        case 3: {candy.addImage(candy3img);
        candy.scale = 0.3
        break;}
        case 4:{ candy.addImage(candy4img);
        candy.scale = 0.2
          break;}
          case 5: {candy.addImage(candy5img);
          candy.scale = 0.04
          break;}
          default: break;


          
          }
          candiesGroup.add(candy);
          }
        }

        // function for viruses

        function  viruses(){

          if(frameCount % 150 === 0){
          var virus = createSprite(0,0,10,10);
          virus.x = random(10,1200);
          virus.y = random(10,100);
          virus.velocityY =  4 + score/15;
          virus.scale = 0.3;
          virus.lifetime = 600/4;
          
          var rand = Math.round(random(1,3));
          switch(rand){
          case 1: virus.addImage(virus1img);
          break;
          case 2: virus.addImage(virus2img);
          break;
          case 3: virus.addImage(virus3img);
          break;
          }
          virusGroup.add(virus)
          }
          }

            // function for reseting the game

          function reset(){
            gameState = "play";
            console.log("reset",gameState);

            restart.visible = false;
            score = 0;
            num = 0;
          basket.changeImage(basketimg);
            }

          function drop(){
          if(mousePressedOver(drop1)){
            if(num > 0){
            num = num - 1
            }
            drop1.destroy();
          }
          if(mousePressedOver(drop2)){
            if(num > 0){
            num = num - 1
            }
            drop2.destroy();
          }
          if(mousePressedOver(drop3)){
            if(num > 0){
            num = num - 1
            }
            drop3.destroy();
          }
          if(mousePressedOver(drop4)){
            if(num > 0){
            num = num - 1
            }
            drop4.destroy();
          }
          if(mousePressedOver(drop5)){
            if(num > 0){
            num = num - 1
            }
            drop5.destroy();
          }

          }
          
          
          
          