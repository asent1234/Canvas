//var database ;
const db = firebase.database();
var drawing = [];
var currentPath = [];
var color, currentName


function setup(){
    //color = "black"
    color = "black"
    canvas = createCanvas(800, 800);
    canvas.mousePressed(startPath);
    canvas.parent('canvascontainer')
    savebutton = createButton("Save")
    savebutton.mousePressed(saveDrawing);
    savebutton.position(100, 100)

    clearbutton = createButton("Clear")
    clearbutton.mousePressed(clearDrawing);
    clearbutton.position(100, 150)

    blackbutton = createButton("Black")
    blackbutton.mousePressed(bc);
    blackbutton.position(100, 200)

    redbutton = createButton("Red")
    redbutton.mousePressed(rc);
    redbutton.position(100, 220)

    bluebutton = createButton("Blue")
    bluebutton.mousePressed(blc);
    bluebutton.position(100, 240)

    greenbutton = createButton("Green")
    greenbutton.mousePressed(gc);
    greenbutton.position(100, 260)

    nameBox = createInput("Enter Your Name")
    nameBox.position(100, 130)
    currentName = "Anonymous"
    //canvas.mouseReleased(endPath);
    //database = firebase.database();
    //databaseref = firebase.database().ref();
    
    var ref = db.ref('drawings')
    ref.on('value', gotData, errData)

////names.on('value', gotData, errData)
   
}
function startPath(){
currentPath = [];
drawing.push(currentPath);
}
//function endPath(){
//    
//}
function draw(){
    background("white");
    text("Xpos: "+mouseX +"yPos: "+ mouseY,500,40);
    if (mouseIsPressed){
        if(mouseX > 0 && mouseX < 800){
        if(mouseY > 0 && mouseY < 800){
        var point = {    
        x: mouseX,
        y: mouseY
        }
        currentPath.push(point);
    }   
    }
    }

    
  stroke(color);
  strokeWeight(4);
  noFill();
  for(var i = 0; i < drawing.length; i++) {
    var path = drawing[i];
    beginShape();
    for(var o = 0;  o < path.length; o++) {
    vertex(path[o].x, path[o].y);
  }
  endShape();
}
 
}
function saveDrawing(){
    var saveref = db.ref('drawings');
    currentName = nameBox.value();
    var data ={
        name: currentName,
        drawing: drawing
    }
    var result = saveref.push(data);
    console.log(result.key)
    function dataSent(err, status) {
        console.log(status)
    }
}
function gotData(data){
    var drawings = data.val();
    var keys = Object.keys(drawings);
    
    for( var i = 0; i < keys.length; i++){
        var key = keys[i];
        var namesref = db.ref("drawings/"+ key+"/name");
        var names;
        namesref.once('value', function(data){
            names = data.val();
        });
        var li = createElement('li', names);
        var ahref = createA('#',key);
        ahref.mousePressed(showDrawing);
        ahref.parent(li);
        //li.parent('Drawing Lists');
    }
}
function errData(err){
    console.log(err);
}
function showDrawing() {
    var key = this.html()
    var ref = db.ref('drawings/' + key);
    ref.on('value', oneDrawing, errData);
    function oneDrawing(data){
        var dbdrawing = data.val();
        drawing = dbdrawing.drawing;
        console.log(drawing);
    }

}
function clearDrawing(){
    drawing = []
}
function rc(){
        color = "red"
        console.log("red")
    
}
function bc(){
    color = "black"
    console.log("black")

}
function blc(){
    color = "blue"
    console.log("blue")

}
function gc(){
    color = "green"
    console.log("green")

}
