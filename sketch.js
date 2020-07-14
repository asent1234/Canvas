var gameState = 0, playerCount = 0, screenState = 0
var player, game, form, allPlayers, distance = 0
var carset = [], car1 , car2
var database 
var car1img, car2img, trackimg, groundimg
var flag = 0
var carcrosssound, gosound

function preload(){
    car1img = loadImage("images/car1.png")
    car2img = loadImage("images/car2.png")
    trackimg = loadImage("images/track.jpg")
    groundimg = loadImage("images/ground.png")
    carcrosssound = loadSound("sounds/carcross.mp3")
    gosound = loadSound("sounds/321.wav")
    accelsound = loadSound("sounds/accel.mp3")
}
function setup(){
    createCanvas(1000, 1000)
    database = firebase.database();
    game = new Game()
    game.getGS();
    game.start();
    //player = new Player
}
function draw(){

    if(playerCount === 2){
      game.updateGS(1);
    if(flag === 0){
      gosound.play();
      flag = 1
    }
    }
    if(gameState === 1){
        clear();
        //gosound.stop();
        background(groundimg)
        game.play();
        drawSprites();
    }
    if(gameState === 2){
        game.end();
    }
    
    text("Xpos: "+mouseX +"yPos: "+ mouseY,500,40);
    //if(screenState === 1){
    //    createCanvas(displayWidth, displayHeight)
    //    game.play();
   /// }
}