
class GameObject {
    constructor(id, name, x, y, width, height) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 5;
        this.score = 0;
    }

    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveUp() {
        this.y -= this.speed;
    }

    moveDown() {
        this.y += this.speed;
    }

    collect(collectible) {
        this.score++;
    }
}

function checkCollision(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

window.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const player = new Player(50, 50, 30, 30);

    const objects = [
        new GameObject(1, 'Object1', 100, 150, 50, 50),
        new GameObject(2, 'Object2', 300, 200, 60, 40),
        new GameObject(3, 'Object3', 500, 100, 70, 70)
    ];

    let collectibles = [
        new GameObject(1, 'Collectible1', 150, 100, 10, 10),
        new GameObject(2, 'Collectible2', 400, 300, 10, 10),
        new GameObject(3, 'Collectible3', 600, 200, 10, 10)
    ];

    function update() {
        for (let i = 0; i < collectibles.length; i++) {
            if (checkCollision(player, collectibles[i])) {
                player.collect(collectibles[i]);
                collectibles.splice(i, 1);
            }
        }

        objects.forEach(obj => {
            if (checkCollision(player, obj)) {
                player.x += player.speed;
                player.y += player.speed;
            }
        });
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        player.draw(ctx);
        objects.forEach(obj => obj.draw(ctx));
        collectibles.forEach(collectible => collectible.draw(ctx));

        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + player.score, 10, 30);

        requestAnimationFrame(render);
    }

    function gameLoop() {
        update();
        render();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();

    document.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 37: 
                player.moveLeft();
                break;
            case 38: 
                player.moveUp();
                break;
            case 39: 
                player.moveRight();
                break;
            case 40: 
                player.moveDown();
                break;
        }
    });
};
