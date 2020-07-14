class Game{
    constructor(){

    }
    getGS(){
    var gsrefer = database.ref('gameState')
    gsrefer.on("value", function(data){
        gameState = data.val();  
    });
    }
    
    updateGS(state){
        var updategsref = database.ref('/')
        updategsref.update({
            gameState: state
        });
    }
    start(){
        if(gameState === 0){
            player = new Player();
            player.getPC();
            form = new Form 
            form.display(); 
        }
        car1 = createSprite(100,displayHeight,50,50)
        car1.addImage("car1img", car1img)
        car2 = createSprite(200,displayHeight,50,50)
        car2.addImage("car2img", car2img)
        carset = [car1, car2]

    }
    play(){
        form.hide();
        text("The Game will Begin in, 3 seconds", 120, 100)
        Player.getAllPlayerInfo();
        
        if(allPlayers !== undefined ){
            imageMode(CENTER)
            image(trackimg, 1000, -1.4 * displayHeight, 1000, 5 * displayHeight)
            var playersy = 800
            var boardy = 130
            var playersx = 850
            var index = 0
            
            //car + playerindex 
            for(var plr in allPlayers){
                playersy = displayHeight - allPlayers[plr].distance
                carset[index].x = playersx
                carset[index].y = playersy
                if(plr === "player" + player.index){
                    fill("red")
                    ellipse(carset[index].x, carset[index].y, 60, 60)
                    camera.position.x = displayWidth/2
                    camera.position.y = carset[index].y
                }
                else{
                    fill("black")
                    
                }
                boardy = boardy + 20
                text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 100, boardy)

            index = index + 1
            playersx = playersx + 300

            }
        }
        
        if(keyIsDown(UP_ARROW) && player.index !== null && player.distance < 5185 ){
            player.distance = player.distance + 20
            player.updatePlayerInfo();
            accelsound.play();
        }

        if(carset[0].y === carset[1].y - 20){
            carcrosssound.play();
        }
        else if(carset[0].y > carset[1].y - 200){
            carcrosssound.stop();
        }
        if(carset[1].y === carset[0].y - 20){
            carcrosssound.play();
        }
        else if(carset[1].y > carset[0].y - 200){
            carcrosssound.stop();
        }
        
        if(player.distance === 5180){
            gameState = 2;
        }


    }
    end(){
        console.log("game over!")
        this.updateGS(2)
        
    }

}