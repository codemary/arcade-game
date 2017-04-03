const numRows = 6;
const numCols = 5;
const tileWidth = 101;
const tileHeight = 83;
const totalWidth = tileWidth * numCols;
const totalHeight = tileHeight * numRows;
const tileHeightOffset = 88;

// Enemies our player must avoid
var Enemy = function(speed, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > totalWidth) {
        this.x = 0;
    };

    this.x = this.x + this.speed * dt;
};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x - tileWidth / 2, this.y + tileHeight / 4);
};

Enemy.prototype.tileX = function() {
    return Math.ceil(this.x / tileWidth);
}

Enemy.prototype.tileY = function() {
    return Math.ceil(this.y / tileHeight);
}

Enemy.prototype.reset = function() {
    this.x = 0;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function(dt) {
    // player has won: reset player
    if (this.y <= tileHeight / 4) {
        this.reset();
        score.win();
    };
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x - tileWidth / 2, this.y - tileHeight / 2);
};

Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'up':
            this.y = this.y - tileHeight;
            break;
        case 'down':
            if (this.y >= numRows * tileHeight - tileHeight / 2 - tileHeightOffset) {
                return;
            }
            this.y = this.y + tileHeight;
            break;
        case 'left':
            if (this.x <= tileWidth / 2) {
                return;
            }
            this.x = this.x - tileWidth;
            break;
        case 'right':
            if (this.x >= numCols * tileWidth - tileWidth / 2) {
                return;
            }
            this.x = this.x + tileWidth;
            break;

    }
};

Player.prototype.tileX = function() {
    return Math.ceil(this.x / tileWidth);
}

Player.prototype.tileY = function() {
    return Math.ceil(this.y / tileHeight);
}

Player.prototype.reset = function() {
    this.y = totalHeight - tileHeightOffset;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(tileWidth * 2, 0, 0.5 * tileHeight);
var enemy2 = new Enemy(tileWidth * 3, 0, 1.5 * tileHeight);
var enemy3 = new Enemy(tileWidth * 1, 0, 2.5 * tileHeight);
var enemy4 = new Enemy(tileWidth * 1, 0, 0.5 * tileHeight);

var allEnemies = [enemy1, enemy2, enemy3, enemy4];

// Place the player object in a variable called player

var player = new Player(totalWidth / 2, totalHeight - tileHeightOffset);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Score
var Score = function() {
    this.count = 0;
    this.label = "Score: ";
};

Score.prototype.win = function() {
    this.count++;
}

Score.prototype.render = function() {
    ctx.font = '24px serif';
    ctx.fillText(this.label + this.count, 10, totalHeight + tileHeightOffset / 2);
}

var score = new Score();
