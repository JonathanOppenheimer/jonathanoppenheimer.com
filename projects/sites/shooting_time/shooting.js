var canvas = document.getElementById('my-canvas');
var ctx = canvas.getContext('2d');
//images
var image = new Image();
image.src = "resources/player_1.png";
var image2 = new Image();
image2.src = "resources/player_2.png"
var image3 = new Image();
image3.src = "resources/heart.png";
var image4 = new Image();
image4.src = "resources/win_screen.jpg";
var image5 = new Image();
image5.src = "resources/lose_screen.jpg";

var gravity = 1;
var score = 0;

//player 1 (you)
var manX = 20;
var manY = (canvas.height - 10) - 70;
var manXVelocity = 0;
var manYVelocity = 0;
var health = 0;

//shooting
var bulletCount = 0;
var x_coords = [];
var y_coords = [];

//player 2 (ai)
var manX_2 = 800 - 20 - 70;
var manY_2 = (canvas.height - 10) - 70;
var manX_2_Velocity = 0;
var manY_2_Velocity = 0;
var health2 = 0;
var leftCounter = 0;
var rightCounter = 0;


//shooting man2
var bulletCount2 = 0;
var x_coords2 = [];
var y_coords2 = [];

var alertCounter = 1;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keydown', keyDownHandler2);
document.addEventListener("keyup", keyUpHandler);

function drawStage() {
    ctx.beginPath();
    ctx.rect(0, (canvas.height - 10), canvas.width, 10);
    ctx.rect(100, 200, 150, 10)
    ctx.rect(325, 125, 150, 10)
    ctx.rect(550, 200, 150, 10)
    ctx.fillStyle = 'Blue';
    ctx.fill();
    ctx.closePath();
}
function drawMan() {
    ctx.beginPath();
    ctx.drawImage(image, manX, manY, 70, 70)
    ctx.fillStyle = '#FF2233';
    ctx.fill();
    ctx.closePath();
}

function moveMan() {
    if (alertCounter > 0) {
        window.alert("Instructions: Arrow keys to move, space to shoot. Kill the enemy you get 10 points, die yourself, lose 10. 50 points to beat the game, -50 points is game over. Good luck!");
        alertCounter--;
    }
    manX = manX + manXVelocity;
    manY = manY + manYVelocity;
    manYVelocity = manYVelocity + gravity;

    if (manX <= 0 || (manX + 70) >= canvas.width) {
        manXVelocity *= -1;
    }

    if ((manY + 70 + 10) >= canvas.height) {
        if (manYVelocity >= 0) {
            manYVelocity = 0;
        }
    }

    if ((manY + 70) >= 200 && (manY + 70) <= 210 && (manX + 20) >= 100 && (manX + 10) <= 250) {
        if (manYVelocity >= 0) {
            manYVelocity = 0;
        }
    }
    if ((manY + 70) >= 125 && (manY + 70) <= 135 && (manX + 20) >= 325 && (manX + 10) <= 475) {
        if (manYVelocity >= 0) {
            manYVelocity = 0;
        }
    }
    if ((manY + 70) >= 200 && (manY + 70) <= 210 && (manX + 20) >= 550 && (manX + 10) <= 700) {
        if (manYVelocity >= 0) {
            manYVelocity = 0;
        }
    }
}
function shootMan() {
    while (bulletCount > 0) {
        var bulletX = manX + 65;
        var bulletY = manY + 10;

        x_coords.push(bulletX);
        y_coords.push(bulletY);
        bulletCount = bulletCount - 1;
    }
    for (i = 0; i < x_coords.length; i++) {
        ctx.beginPath();
        ctx.drawImage(image3, x_coords[i], y_coords[i], 10, 10);
        ctx.fill();
        ctx.closePath();
    }
}
function scoring() {
    if (score == 50) {
        ctx.drawImage(image4, 0, 0, 800, 300);
        window.alert("WOW YOU DID IT CONGRATULATIONS")
    }
    if (score == -50) {
        ctx.drawImage(image5, 0, 0, 800, 300);
        window.alert("you fucking suck ass stupid idiot man.")
    }
    document.getElementById("score").innerHTML = "Score: " + score;
}

function healthBar() {
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "black";
    ctx.rect(10, 10, 150, 35);
    ctx.stroke();
    ctx.fillStyle = "green";
    //filling bit
    ctx.fillRect(13, 13, health, 29);
}

function bulletAcceleration() {
    //_______________math question generation________________//
    var randomNum1 = (Math.floor(Math.random() * 12) + 1);
    var randomNum2 = (Math.floor(Math.random() * 12) + 1);
    var answer = randomNum1 * randomNum2;
    //parsed
    var parsedNum1 = parseInt(randomNum1);
    var parsedNum2 = parseInt(randomNum2);

    //_______________________________________________________//
    for (i = 0; i < x_coords.length; i++) {
        x_coords[i] = x_coords[i] + 20;
        if (x_coords[i] > 1000) {
            x_coords.splice(i, 1)
            y_coords.splice(i, 1)
        }
        //hitbox detection
        if (x_coords[i] > manX_2 && x_coords[i] < manX_2 + 70) {
            if (y_coords[i] > manY_2 && y_coords[i] < manY_2 + 70) {
                if (health2 < 144) {
                    health2 += 2;
                }
                else {
                    var userAnswer = window.prompt("Please answer the follow math question: " + parsedNum1 + " * " + parsedNum2, " Type you answer ");
                    if (userAnswer == answer) {
                        window.alert("Correct!")
                        health2 = 0;
                        score += 10;
                    }
                    else {
                        window.alert("Incorrect! Consider ritual suicide!")
                    }
                }
            }
        }
    }
}
function drawAiMan() {
    ctx.beginPath();
    ctx.drawImage(image2, manX_2, manY_2, 70, 70)
    ctx.fillStyle = '#FF2233';
    ctx.fill();
    ctx.closePath();
}
function aiMan() {
    manX_2 = manX_2 + manX_2_Velocity;
    manY_2 = manY_2 + manY_2_Velocity;
    manY_2_Velocity = manY_2_Velocity + gravity;

    if ((manY_2 + 70 + 10) >= canvas.height) {
        if (manY_2_Velocity >= 0) {
            manY_2_Velocity = 0;
        }
    }

    if ((manY_2 + 70) >= 200 && (manY_2 + 70) <= 210 && (manX_2 + 20) >= 100 && (manX_2 + 10) <= 250) {
        if (manYVelocity >= 0) {
            manYVelocity = 0;
        }
    }
    if ((manY_2 + 70) >= 125 && (manY_2 + 70) <= 135 && (manX_2 + 20) >= 325 && (manX_2 + 10) <= 475) {
        if (manYVelocity >= 0) {
            manYVelocity = 0;
        }
    }
    if ((manY_2 + 70) >= 200 && (manY_2 + 70) <= 210 && (manX_2 + 20) >= 550 && (manX_2 + 10) <= 700) {
        if (manYVelocity >= 0) {
            manYVelocity = 0;
        }
    }

}

function moveAiMan() {
    var d = new Date();
    var currentSeconds = d.getSeconds()
    var randomNum = Math.floor(Math.random() * 99) + 1;
    if (currentSeconds % 2 == 0 || currentSeconds % 5 == 0) {
        manX_2_Velocity = -10;
        if (manX_2 <= 0) {
            manX_2_Velocity += 20;
        }
    }
    else {
        manX_2_Velocity = 10;
        if ((manX_2 + 70) >= canvas.width) {
            manX_2_Velocity -= 20;
        }

    }
    if (randomNum == 2) {
        manY_2_Velocity = -20;
    }
    if (randomNum % 15 == 0) {
        bulletCount2 += 1;
    }

}
function shootMan2() {
    while (bulletCount2 > 0) {
        var bulletX2 = manX_2 + 65;
        var bulletY2 = manY_2 + 10;

        x_coords2.push(bulletX2);
        y_coords2.push(bulletY2);
        bulletCount2 = bulletCount2 - 1;
    }
    for (i = 0; i < x_coords2.length; i++) {
        ctx.beginPath();
        ctx.drawImage(image3, x_coords2[i], y_coords2[i], 10, 10);
        ctx.fill();
        ctx.closePath();
    }
}

function bulletAcceleration2() {

    for (i = 0; i < x_coords2.length; i++) {
        x_coords2[i] = x_coords2[i] - 20;
        if (x_coords2[i] > 1000) {
            x_coords2.splice(i, 1)
            y_coords2.splice(i, 1)
        }
        //hitbox detection
        if (x_coords2[i] > manX && x_coords2[i] < manX + 70) {
            if (y_coords2[i] > manY && y_coords2[i] < manY + 70) {
                if (health < 144) {
                    health += 2;
                }
                else {
                    health = 0;
                    score -= 10;
                }
            }
        }
    }
}

function aiHealthBar() {
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "black";
    ctx.rect(640, 10, 150, 35);
    ctx.stroke();
    ctx.fillStyle = "green";
    //filling bit
    ctx.fillRect(643, 13, health2, 29);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStage();
    scoring();

    drawMan();
    moveMan();
    shootMan();
    bulletAcceleration()
    healthBar();

    aiMan();
    drawAiMan();
    moveAiMan();
    aiHealthBar();
    shootMan2();
    bulletAcceleration2();

    drawCourse();
    requestAnimationFrame(draw);
}



function drawCourse() {
    ctx.beginPath();
}

function keyDownHandler(e) {
    if (e.keyCode == 37) {
        manXVelocity = -10;
    }

    if (e.keyCode == 39) {
        manXVelocity = 10;
    }
    if (manYVelocity == 0) {
        if (manYVelocity <= 0) {
            if (e.keyCode == 38) {
                manYVelocity = -20;
            }
        }
    }


    // Down arrow: 40
    // Right arrow: 39
    // Left arrow: 37
    // Up arrow: 38
}

function keyDownHandler2(e) {
    if (e.keyCode == 32) {
        bulletCount = bulletCount + 1;
    }
}


function keyUpHandler(e) {
    if (e.keyCode == 39) {
        manXVelocity = 0;
    }
    if (e.keyCode == 37) {
        manXVelocity = 0;
    }
    if (e.keyCode == 38) {
        manYVelocity = 0;
    }
}
draw();
// setInterval(draw, 50);