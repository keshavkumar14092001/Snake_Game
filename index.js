const gamingBoard = document.querySelector('.container');
let position = { x: 0, y: 0 };
let food = { x: 6, y: 6 };
let snake = [
    { x: 9, y: 9 }
];
let lastRenderedTime = 0;
let speed = 4;

// Game Logic:
window.requestAnimationFrame(main);
window.addEventListener('keydown', keyPressed);

// Game Loop:
function main(currentTime) {
    window.requestAnimationFrame(main);
    if (((currentTime - lastRenderedTime) / 1000) < 1 / speed) {
        return;
    }
    lastRenderedTime = currentTime;
    gameEngine();
}

// Game Function:

function gameEngine() {

    // When Snake gets Collided:
    if (isCollided(snake)) {
        alert("The game is Over please press any key to restart the game");
        position = { x: 0, y: 0 };
        food = { x: 6, y: 6 };
        snake = [
            { x: 9, y: 9 }
        ];
    }

    // Logic when snake eats:
    if (snake[0].y === food.y && snake[0].x === food.x) {
        snake.unshift({ x: snake[0].x + position.x, y: snake[0].y + position.y });
        let a = 2;
        let b = 15;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // logic when snake moves:
    for (let i = (snake.length - 2); i >= 0; i--) {
        snake[i + 1] = { ...snake[i] };
    }
    snake[0].x += position.x;
    snake[0].y += position.y;

    // Displaying the Food and Snake:
    gamingBoard.innerHTML = "";

    // Displaying the Food:
    let foodElement = document.createElement('div');
    foodElement.classList.add('snakeFood');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    gamingBoard.appendChild(foodElement);

    // Displaying the Snake:
    snake.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('snakeHead');
        }
        else {
            snakeElement.classList.add('snakeBody');
        }
        gamingBoard.appendChild(snakeElement);
    });
}

// Logic When key is pressed:
function keyPressed(event) {
    let press = event.key;
    position = { x: 0, y: 1 };
    switch (press) {
        case 'ArrowUp':
            position.x = 0;
            position.y = -1;
            break;
        case 'ArrowDown':
            position.x = 0;
            position.y = 1;
            break;
        case 'ArrowRight':
            position.x = 1;
            position.y = 0;
            break;
        case 'ArrowLeft':
            position.x = -1;
            position.y = 0;
            break;
        default:
            break;
    }
}

// Logic when snake gets collided:
function isCollided(snake) {
    // When collided with itself:
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // When collided with wall:
    if ((snake[0].x >= 16 || snake[0].x <= 0) || (snake[0].y >= 16 || snake[0].y <= 0)) {
        return true;
    }
}