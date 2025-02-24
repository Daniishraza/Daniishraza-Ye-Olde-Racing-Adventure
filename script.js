document.addEventListener('DOMContentLoaded', function () {
    const player = document.getElementById('player');
    const obstacles = document.getElementById('obstacles');
    const scoreElement = document.getElementById('score');
    const finalScoreElement = document.getElementById('finalScore');
    const gameOverScreen = document.getElementById('gameOver');
    const startBtn = document.getElementById('startBtn');
    const restartBtn = document.getElementById('restartBtn');
    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');

    let gameRunning = false;
    let score = 0;
    let playerPosition = 50;
    let obstacleSpeed = 3;
    let obstacleInterval;
    let scoreInterval;


    const crashSound = new Audio();
    const galloppingSound = new Audio();
    const scoreSound = new Audio();


    function startGame() {
        if (gameRunning) return;

        resetGame();
        gameRunning = true;
        startBtn.style.display = 'none';


        obstacleInterval = setInterval(createObstacle, 1500);


        scoreInterval = setInterval(() => {
            score++;
            scoreElement.textContent = score;


            if (score % 10 === 0) {
                obstacleSpeed += 0.5;
            }


            if (score % 25 === 0) {
                playSound('score');
            }
        }, 1000);


        playSound('gallop', true);
    }


    function resetGame() {
        score = 0;
        playerPosition = 50;
        obstacleSpeed = 3;
        player.style.left = `calc(${playerPosition}% - 30px)`;
        scoreElement.textContent = '0';
        gameOverScreen.style.display = 'none';


        while (obstacles.firstChild) {
            obstacles.removeChild(obstacles.firstChild);
        }
    }


    function endGame() {
        gameRunning = false;
        clearInterval(obstacleInterval);
        clearInterval(scoreInterval);
        finalScoreElement.textContent = score;
        gameOverScreen.style.display = 'flex';
        startBtn.style.display = 'block';


        playSound('crash');
        stopSound('gallop');
    }


    function createObstacle() {
        if (!gameRunning) return;

        const obstacle = document.createElement('div');
        const obstacleTypes = ['rock', 'log', 'puddle'];
        const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];

        obstacle.classList.add('obstacle', type);

        const position = Math.random() * 70 + 15;
        obstacle.style.left = `${position}%`;
        obstacle.style.top = '-50px';

        obstacles.appendChild(obstacle);

        moveObstacle(obstacle, position);
    }


    function moveObstacle(obstacle, position) {
        let posY = -50;

        function move() {
            if (!gameRunning) {
                if (obstacle.parentNode) {
                    obstacle.parentNode.removeChild(obstacle);
                }
                return;
            }

            posY += obstacleSpeed;
            obstacle.style.top = `${posY}px`;


            if (posY > 330 && posY < 400) {
                const obstacleRect = obstacle.getBoundingClientRect();
                const playerRect = player.getBoundingClientRect();

                if (
                    obstacleRect.left < playerRect.right &&
                    obstacleRect.right > playerRect.left &&
                    obstacleRect.top < playerRect.bottom &&
                    obstacleRect.bottom > playerRect.top
                ) {
                    endGame();
                    return;
                }
            }


            if (posY > 400) {
                if (obstacle.parentNode) {
                    obstacle.parentNode.removeChild(obstacle);
                }
                return;
            }

            requestAnimationFrame(move);
        }

        requestAnimationFrame(move);
    }


    function movePlayer(direction) {
        if (!gameRunning) return;

        if (direction === 'left' && playerPosition > 15) {
            playerPosition -= 5;
        } else if (direction === 'right' && playerPosition < 85) {
            playerPosition += 5;
        }

        player.style.left = `calc(${playerPosition}% - 30px)`;
    }


    function playSound(type, loop = false) {

        if (type === 'gallop') {

        } else if (type === 'crash') {

        } else if (type === 'score') {

        }
    }

    function stopSound(type) {

    }


    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);

    leftBtn.addEventListener('mousedown', () => {
        movePlayer('left');
    });

    rightBtn.addEventListener('mousedown', () => {
        movePlayer('right');
    });


    leftBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        movePlayer('left');
    });

    rightBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        movePlayer('right');
    });


    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            movePlayer('left');
        } else if (e.key === 'ArrowRight') {
            movePlayer('right');
        } else if (e.key === ' ' && !gameRunning) {
            startGame();
        }
    });


    let leftInterval, rightInterval;

    leftBtn.addEventListener('mousedown', () => {
        clearInterval(rightInterval);
        leftInterval = setInterval(() => movePlayer('left'), 100);
    });

    leftBtn.addEventListener('mouseup', () => {
        clearInterval(leftInterval);
    });

    leftBtn.addEventListener('mouseleave', () => {
        clearInterval(leftInterval);
    });

    rightBtn.addEventListener('mousedown', () => {
        clearInterval(leftInterval);
        rightInterval = setInterval(() => movePlayer('right'), 100);
    });

    rightBtn.addEventListener('mouseup', () => {
        clearInterval(rightInterval);
    });

    rightBtn.addEventListener('mouseleave', () => {
        clearInterval(rightInterval);
    });


    leftBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        clearInterval(rightInterval);
        leftInterval = setInterval(() => movePlayer('left'), 100);
    });

    leftBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        clearInterval(leftInterval);
    });

    rightBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        clearInterval(leftInterval);
        rightInterval = setInterval(() => movePlayer('right'), 100);
    });

    rightBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        clearInterval(rightInterval);
    });


    function addFunnyEvent() {
        if (!gameRunning || Math.random() > 0.1) return;

        const events = [
            { text: "Thy Horse is Frightened!", duration: 3000, effect: "fast" },
            { text: "Ye Olde Wheel is Loose!", duration: 3000, effect: "wobble" },
            { text: "A Noble Challenges Thee!", duration: 4000, effect: "race" },
            { text: "Thou Art Sleepy!", duration: 2000, effect: "slow" }
        ];

        const randomEvent = events[Math.floor(Math.random() * events.length)];


        const notification = document.createElement('div');
        notification.textContent = randomEvent.text;
        notification.style.position = 'absolute';
        notification.style.top = '100px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = '#f2e8c9';
        notification.style.color = '#8B4513';
        notification.style.padding = '10px 15px';
        notification.style.borderRadius = '5px';
        notification.style.fontFamily = '"Times New Roman", serif';
        notification.style.fontWeight = 'bold';
        notification.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        notification.style.zIndex = '50';
        notification.style.border = '2px solid #8B4513';

        document.querySelector('.game-area').appendChild(notification);


        if (randomEvent.effect === "fast") {
            document.querySelector('.track').style.animationDuration = '5s';
            setTimeout(() => {
                document.querySelector('.track').style.animationDuration = '10s';
            }, randomEvent.duration);
        } else if (randomEvent.effect === "wobble") {
            player.style.animation = 'wobble 0.5s infinite';
            setTimeout(() => {
                player.style.animation = '';
            }, randomEvent.duration);
        } else if (randomEvent.effect === "slow") {
            document.querySelector('.track').style.animationDuration = '15s';
            setTimeout(() => {
                document.querySelector('.track').style.animationDuration = '10s';
            }, randomEvent.duration);
        } else if (randomEvent.effect === "race") {

            const opponent = document.createElement('div');
            opponent.style.position = 'absolute';
            opponent.style.width = '60px';
            opponent.style.height = '100px';
            opponent.style.bottom = '20px';
            opponent.style.right = '20%';
            opponent.style.zIndex = '9';


            opponent.innerHTML = `
                <div style="position: relative; width: 100%; height: 100%;">
                    <div style="position: absolute; width: 50px; height: 30px; bottom: 15px; left: 5px; background-color: #FF0000; border-radius: 5px;"></div>
                    <div style="position: absolute; width: 15px; height: 15px; border-radius: 50%; background-color: #333; border: 2px solid #222; bottom: 5px; left: 10px;"></div>
                    <div style="position: absolute; width: 15px; height: 15px; border-radius: 50%; background-color: #333; border: 2px solid #222; bottom: 5px; right: 10px;"></div>
                </div>
            `;

            document.querySelector('.game-area').appendChild(opponent);


            let opponentPos = 20;
            const opponentInterval = setInterval(() => {
                opponentPos += (Math.random() * 2) - 0.5;
                opponent.style.right = `${opponentPos}%`;
            }, 100);

            setTimeout(() => {
                clearInterval(opponentInterval);
                if (opponent.parentNode) {
                    opponent.parentNode.removeChild(opponent);
                }
            }, randomEvent.duration);
        }


        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, randomEvent.duration);
    }


    setInterval(addFunnyEvent, 8000);


    const style = document.createElement('style');
    style.textContent = `
        @keyframes wobble {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(5deg); }
            75% { transform: rotate(-5deg); }
            100% { transform: rotate(0deg); }
        }
    `;
    document.head.appendChild(style);
});