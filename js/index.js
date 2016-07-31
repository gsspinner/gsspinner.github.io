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

var objDate = new Date();
var color = ['#ff6600', '#333333', '#ff6600', '#333333', '#ff6600', '#333333'];
var label = ['Func Check', 'Front Counter', 'Call Logs', "Clean Workspace", "Shipping", "Free pick!"];
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

if (objDate.getHours() < 12) {
    document.getElementById('header').innerHTML = ("Here are the morning duties!");
    color = ['#ff917a', '#bc2100', '#ff7e63', '#931900', '#ff7e63', '#ff2c00'];
    label = ['Complete SCMR', 'Front Counter', 'Clean Workspace', 'Contact Client', 'Func Checks', 'Verify Check In'];
} else if (objDate.getHours() > 12 && objDate.getHours() < 18) {
    document.getElementById('header').innerHTML = ("Ahhh, the mid shift...");
    color = ['#6989D4', '#0A2D7C', '#446BC6', '#0E3AA0', '#446BC6', '#0E3AA0'];
    label = ['Func Checks', 'Clean Workspace', 'Call logs, ACI', 'Front Counter', 'Daily Goals Check', 'TVs need testing, bro'];
} else if (objDate.getHours() > 18 && objDate.getHours() < 23) {
    document.getElementById('header').innerHTML = ("It's almost closing time!");
    color = ['#D25BD2', '#780078', '#C234C2', '#780078', '#C234C2', '#9B009B'];
    label = ['Func Checks', 'Dispose trash', 'Clean Booths & Front', 'ARA Notes/EMail', 'Closing duties, HUB?', 'Manager Check Out'];
}

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
            slowDownRand = rand(0.975, 0.999);
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
