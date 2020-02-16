var canvas = document.getElementById('my-canvas');
var ctx = canvas.getContext('2d');

//global
var gravity = 1;
var score = 0;
var rotation = 1;

//player 1 (you)
var boxX = 40;
var boxY = (canvas.height - 10) - 70;
var boxXVelocity = 0;
var boxYVelocity = 0;
var inAir = false;
var image = new Image();
image.src = "box.jpg";

//obstacles
var counter = 0;
var triangles1 = [];
var triangles2 = [];
var triangles3 = [];

var rectangles1 = [];

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function drawStage() {
    ctx.beginPath();
    ctx.rect(0, (canvas.height - 10), canvas.width, 10);
    ctx.fillStyle = '#ffbd69';
    ctx.fill();
    ctx.closePath();
}

function drawTriangles() {

}

function moveBox() {
    boxY = boxY + boxYVelocity;
    boxYVelocity = boxYVelocity + gravity;


    if ((boxY + 50 + 10) >= canvas.height) {
        if (boxYVelocity >= 0) {
            boxYVelocity = 0;
            inAir = false;
            rotation = 1;
        }
    }
    else {
        inAir = true;
        rotation = rotation * 1.2;
    }
    ctx.closePath();
}

function drawBox() {
    ctx.beginPath();
    ctx.translate((boxX + 25), (boxY + 25));
    ctx.rotate(1 * (Math.PI) / -(rotation));
    ctx.translate(-(boxX + 25), -(boxY + 25));
    ctx.drawImage(image, boxX, boxY, 50, 50)
    ctx.resetTransform();
    ctx.fill();
    ctx.closePath();
}

function addTriangles() {
    var random = (Math.floor(Math.random() * 100) + 1);
    if (random < 2) {
        triangles1.push(850);
        triangles2.push(875);
        triangles3.push(825);

    }
    ctx.beginPath();

    for (i = 0; i < triangles1.length; i++) {
        triangles1[i] = triangles1[i] - 5;
        triangles2[i] = triangles2[i] - 5;
        triangles3[i] = triangles3[i] - 5;

        ctx.moveTo(triangles1[i], 250);
        ctx.lineTo(triangles2[i], 300);
        ctx.lineTo(triangles3[i], 300);

        ctx.fill();
        
    }
    ctx.closePath();
}

function addRectangles() {
    var random = (Math.floor(Math.random() * 100) + 1);
    if (random < 2) {
        rectangles1.push(850);
    }
    ctx.beginPath();

    for (i = 0; i < rectangles1.length; i++) {
        rectangles1[i] = rectangles1[i] - 5;

        ctx.rect(rectangles1[i], 220, 150, 10);
        ctx.fill();
        
    }
    ctx.closePath();
}


function scoring() {
    var d = new Date();
    var n = d.getSeconds();

    if (n > n - 1) {
        score = score + 1;
    }

    document.getElementById("score").innerHTML = "Score: " + score;
}

function keyDownHandler(e) {
    if (boxYVelocity == 0 && inAir == false) {
        if (boxYVelocity <= 0) {
            if (e.keyCode == 38) {
                boxYVelocity = -15;
            }
        }
    }
}

function keyUpHandler(e) {
    //test
}
// Down arrow: 40
// Right arrow: 39
// Left arrow: 37
// Up arrow: 38

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStage();
    scoring();

    moveBox();
    drawBox();

    addTriangles();
    addRectangles();

    requestAnimationFrame(draw);
}

draw();
