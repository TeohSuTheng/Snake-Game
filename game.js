const canvas = document.querySelector('#game-board');
const ctx = canvas.getContext('2d');

class SnakeBody{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let tileCount = 20;
let tileSize = (canvas.width/tileCount)-2

//snake
let headX = 10;
let headY = 10;
const snakeBody = [];
let tailLen = 2;

let xVelocity = 0;
let yVelocity = 0;

//apple
let appleX = 5;
let appleY = 5;

//score
let score = 0;

let gameOver = false;

let speed=7;

function drawScore()
{
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score: "+score, canvas.width-50,10);
}

function drawApple()
{
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount,appleY * tileCount, tileSize, tileSize);
}

function drawSnake()
{
    ctx.fillStyle = "green";
    ctx.fillRect(headX * tileCount,headY * tileCount, tileSize, tileSize);
    
    //Snake Body
    for(let i = 0; i < snakeBody.length; i++)
    {
        let part = snakeBody[i];
        ctx.fillRect(part.x* tileCount,part.y * tileCount, tileSize, tileSize);
    }

    //LIFO method 
    snakeBody.push(new SnakeBody(headX,headY)) //add item to the last position
    if (snakeBody.length > tailLen)
    {
        snakeBody.shift() //remove 1st item
    }

}

function checkWallCollision()
{
    if (headX > tileCount | headX < 0 | headY > tileCount | headY < 0)
    { 
        gameOver = true;
    }
}

function checkBodyCollision()
{
    if(xVelocity !=0 || yVelocity !=0){
        for(let i = 0; i < snakeBody.length; i++)
        {
            let part = snakeBody[i];
            if(part.x == headX && part.y == headY)
            {
                gameOver = true;
                break;
            }
        }
    }
}

function checkAppleCollision()
{
    if (headX == appleX && headY == appleY)
    {
        // move apple 
        appleX = Math.floor(Math.random()*tileCount);
        appleY = Math.floor(Math.random()*tileCount);
        tailLen ++;
        score ++;
    }
}

function changeSnakePosition()
{
    headX = headX + xVelocity;
    headY = headY + yVelocity;

    //check collision with apple
    checkAppleCollision();

    //check gameover
    checkWallCollision();
    if (gameOver == false)
    {
    checkBodyCollision();
    } 
}


function clearScreen()
{
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

function keyDown(event){
    //topleft (0,0): right, down -- increase

    //up
    if(event.keyCode == 38){
        if(yVelocity != 1){
        yVelocity = -1;
        xVelocity = 0;
        }
    }
    //left
    else if (event.keyCode == 37){
        if(xVelocity != 1){
        yVelocity = 0;
        xVelocity = -1;
        }
    }
    //right
    else if (event.keyCode==39){
        if(xVelocity != -1){
        yVelocity = 0;
        xVelocity = 1;
        }
    }
    //down
    else if (event.keyCode==40){
        if(yVelocity != -1){
        yVelocity = 1;
        xVelocity = 0;
        }
    }
}

/* Game loop */
//requestAnimationFrame
//setInterval
//setTimeout

function main()
{   
    //Gameover
    if (gameOver){
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over",canvas.width/6.5,canvas.tile/2);
        alert("Game Over")
        location.reload();
    }
    clearScreen();
    changeSnakePosition();
    drawScore();  
    drawApple();
    drawSnake();
    setTimeout(main, 1000/speed);
    
}

document.body.addEventListener('keydown',keyDown)
main();
