var canvas = document.getElementById('my-canvas');
var ctx = canvas.getContext('2d');

var racecarX = Math.floor(Math.random() * (canvas.width - 100));
var racecarY = Math.floor(Math.random() * 100);
var racecarXVelocity = 0;
var racecarYVelocity = 0;
var image = new Image();
image.src = "racecar.png";
var image2 = new Image();
image2.src = "racingflag.png"

var check1 = false;
var check2 = false;
var score = 0;
var scoreAdded = false;

var x_coords = [];
var y_coords = [];

var xTrue = false; 
var yTrue = false; 

document.addEventListener('keydown', keyListener);
document.addEventListener("keyup", keyUpHandler);


function drawRacer() {
    ctx.beginPath();
    ctx.drawImage(image, racecarX, racecarY, 50, 50)
    //ctx.rect(racecarX, racecarY, 20, 20);
    ctx.fillStyle = '#FF2233';
    ctx.fill();
    ctx.closePath();
}

function drawFlags() {
    //needs to only happen once currently bugged
    for (i = 0; i < 5; i++) {
        var flagX = Math.floor(Math.random() * (canvas.width - 100));
        var flagY = Math.floor(Math.random() * (canvas.height - 100));
        x_coords.push(flagX);
        y_coords.push(flagY);

        ctx.beginPath();
        ctx.drawImage(image2, x_coords[i], y_coords[i], 50, 50)
        ctx.fill();
        ctx.closePath();
    }


}

function moveCar() {
    if (racecarX <= 0 || (racecarX + 50) >= canvas.width) {
        racecarXVelocity *= -1;
    }
    if ((racecarY + 50) > canvas.height || (racecarY) < 0) {
        racecarYVelocity *= -1;
    }
    racecarX = racecarX + racecarXVelocity;
    racecarY = racecarY + racecarYVelocity;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRacer();
    moveCar();
    scoring();
    drawCourse();
    requestAnimationFrame(draw);
}

function scoring() {
    for (let i = 0; i < x_coords.length; i++) 
    {
        if (racecarX + 50 > x_coords[i] && racecarX < x_coords[i] + 50) 
        {
            xTrue = true;
        }

        if (racecarY + 50 > y_coords[i] && racecarY < y_coords[i] + 50) 
        {
            yTrue = true;
        }

        if(xTrue && yTrue)
        {
            score += 50; 
        }
        xTrue = false;
        yTrue = false;
    }

    document.getElementById("score").innerHTML = "Score: " + score;

}

function drawCourse() {
    ctx.beginPath();
}

function keyListener(e) {

    if (e.keyCode == 38) {
        racecarYVelocity = -10;
    }
    if (e.keyCode == 40) {
        racecarYVelocity = 10;
    }
    if (e.keyCode == 37) {
        racecarXVelocity = -10;
    }

    if (e.keyCode == 39) {
        racecarXVelocity = 10;
    }
    // Down arrow: 40
    // Right arrow: 39
    // Left arrow: 37
    // Up arrow: 38
}


function keyUpHandler(e) {
    if (e.keyCode == 38) {
        racecarYVelocity = 0;
    }
    if (e.keyCode == 40) {
        racecarYVelocity = 0;
    }
    if (e.keyCode == 39) {
        racecarXVelocity = 0;
    }
    if (e.keyCode == 37) {
        racecarXVelocity = 0;
    }
}
draw();
// setInterval(draw, 50);


