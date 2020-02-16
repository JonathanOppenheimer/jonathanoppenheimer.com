var canvas = document.getElementById('my-canvas');
var ctx = canvas.getContext('2d');

var skierX = Math.floor(Math.random() * (canvas.width - 100));
var skierY = Math.floor(Math.random() * 100);
var skierXVelocity = 0;
var skierYVelocity = 0;
var poleX = Math.floor(Math.random() * (canvas.width - 100)); 
var poleY = Math.floor(Math.random() * (canvas.height - 100)); 
var image = new Image();
image.src = "SkierFront.png"; 

var check1 = false;
var check2 = false;
var score = 0; 
var scoreAdded = false; 

document.addEventListener('keydown', keyListener);

function drawSkier() {
    ctx.beginPath();
    ctx.drawImage(image,skierX,skierY,50,50)
    //ctx.rect(skierX, skierY, 20, 20);
    ctx.fillStyle = '#FF2233';
    ctx.fill();
    ctx.closePath();
}

function drawPoles() {
    ctx.beginPath();
    ctx.rect(poleX, poleY, 10, 80);
    ctx.rect(poleX + 100, poleY, 10, 80);
    ctx.fillStyle = '#FF2233';
    ctx.fill();
    ctx.closePath();
}

function moveSkier() {
    if (skierX <= 0 || (skierX + 20) >= canvas.width) {
        skierXVelocity *= -1;
    }
    if ((skierY + 20) > canvas.height) {
        skierY = 0; 
        scoreAdded = false; 
    }    

    if (skierYVelocity <= 0)
    {
        skierYVelocity = 0; 
    }
    skierX = skierX + skierXVelocity;
    skierY = skierY + skierYVelocity;
    skierXVelocity *= 0.95; 
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSkier();
    drawPoles(); 
    drawSkier();
    drawCourse()
    scoring(); 
    requestAnimationFrame(draw);
}

function scoring()
{
    
    if(skierX > poleX && skierX + 50 < poleX + 100)
    {
        check1 = true; 
    }
    if(skierY > poleY && skierY + 50 < poleY + 80)
    {
        check2 = true; 
    }

    if(check1 && check2)
    {
        if(!scoreAdded)
        {
            score += 50; 
            scoreAdded = true; 
        }
        check1 = false;
        check2 = false; 
        document.getElementById("score").innerHTML = "Score: " + score;
    }
}

function drawCourse()
{
    ctx.beginPath();

}

function keyListener(e) {
    if (e.keyCode == 38) {
        skierYVelocity -= 1;
    }
    if (e.keyCode == 40) {
        skierYVelocity += 1;
        if(skierYVelocity >= 10)
        {
            skierYVelocity -= 1; 
        }
    }
    if (e.keyCode == 37)
    {
        skierXVelocity -= 3;
    }

    if (e.keyCode == 39) {
        skierXVelocity += 3;
    }
    // Down arrow: 40
    // Right arrow: 39
    // Left arrow: 37
    // Up arrow: 38
}

draw();
// setInterval(draw, 50);