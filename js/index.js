/**
Oneal Abdulrahim

Purpose: For use in Geek Squad Precincts to determine what to do if you have free time

License: open & free for all to use

Last updated: 7/30/2016
*/

// Random function for random integers within a range (needed for speed)
function rand(min, max) {
  return Math.random() * (max - min) + min;
}


var color = ['#ff6600', '#333333', '#ff6600', '#333333', '#ff6600', '#333333'];
var label = ['Func Check', 'Front Counter', 'Call Logs', "Write up", "Hello", "Goodbye"];
var slices = color.length;
var sliceDeg = 360/slices;
var deg = rand(0, 360);
var speed = 0;
var slowDownRand = 0;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var width = canvas.width; // size
var center = width / 2;      // center
var isStopped = false;
var lock = false;

// Conversion from degrees to radians
function deg2rad(deg) {
    return deg * Math.PI / 180;
}

// Usage of canvas to create each portion of the circle
function drawSlice(deg, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(center, center);
    ctx.arc(center, center, width/2, deg2rad(deg), deg2rad(deg+sliceDeg));
    ctx.lineTo(center, center);
    ctx.fill();
}

// Usage of canvas to create text atop each slice
function drawText(deg, text) {
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(deg2rad(deg));
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.font = 'bold 25px roboto';
    ctx.fillText(text, 130, 10);
    ctx.restore();
}

// Usage of canvas to draw (attach) elements to the canvas using above methods
function drawImg() {
    ctx.clearRect(0, 0, width, width);
    for(var i=0; i<slices; i++){
        drawSlice(deg, color[i]);
        drawText(deg+sliceDeg/2, label[i]);
        deg += sliceDeg;
    }
}

// Making the entire canvas animate
(function anim() {
    deg += -speed;
    deg %= 360;

    // Increment speed
    if(!isStopped && speed < 3){
        speed = speed + 1 * 0.1;
    }
    
    // Decrement Speed
    if(isStopped){
        if (!lock){
            lock = true;
            slowDownRand = rand(0.994, 0.999);
        } 
        speed = speed > 0.2 ? speed *= slowDownRand : 0;
    }
    
    // Stopped!
    if (lock && !speed){
        var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg); // deg 2 Array Index
        ai = (slices + ai) % slices; // Fix negative index
        return Materialize.toast("You got:\n"+ label[ai], 5000);
    }

    drawImg();
    window.requestAnimationFrame( anim );
}());

// Materal button for stopping spin
document.getElementById("spin").addEventListener("mousedown", function(){
  isStopped = true;
}, false);

// Material button for refreshing DIV tag after animation is completed
document.getElementById("again").addEventListener("mousedown", function(){
  setTimeout("location.reload(true);", 500);
}, false);