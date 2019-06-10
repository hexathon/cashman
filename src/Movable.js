function Movable (options) {
    this.x = options.x;
    this.y = options.y;
    this.container = options.container;
    this.ticker = null;
    this.animateInterval = null;
    this.direction = null;
}

Movable.prototype.calculateCssProperties = function () {
    let centerX = labyrinth.positionToPixel(this.x) - (28 / 2);
    let centerY = labyrinth.positionToPixel(this.y) - (31 / 2);
    let style = [
        'position:absolute',
        'left: ' + centerX + 'px',
        'top: ' + centerY + 'px'
    ];
    return style.join(';');
};

Movable.prototype.render = function(){
    this.elementInstance = document.createElement('div');
    this.elementInstance.style = this.calculateCssProperties();

    this.icon = document.createElement('img');
    this.icon.src = 'images/character-ghost-blue.png';
    this.icon.style.width = '28px';
    this.icon.style.height = '31px';

    this.elementInstance.appendChild(this.icon);

    this.container.appendChild(this.elementInstance);

    this.initMove();
};

Movable.prototype.getOppositeDirection = function(direction) {
    var strReturn = direction;

    switch (direction){
        case 'left':
            strReturn = 'right';

            break;
        case 'right':
            strReturn = 'left';

            break;
        case 'up':
            strReturn = 'down';

            break;
        case 'down':
            strReturn = 'up';

            break;
    }

    return strReturn;
};

Movable.prototype.directionToCoordinates = function (direction) {
    switch (direction) {
        case 'up':
            return {x: this.x, y:(this.y - 1)};
        case 'down':
            return {x: this.x, y: (this.y + 1)};
        case 'left':
            return {x: (this.x - 1), y: this.y};
        case 'right':
            return {x: (this.x + 1), y: this.y};
    }
};

Movable.prototype.getRandomDirection = function() {
    var movements = ["left", "right", "up", "down"];

    var pos = Math.floor((Math.random() * movements.length));
    return movements[pos];
};

Movable.prototype.initMove = function(){
    var self = this;
    this.ticker = setInterval(function(){
        clearInterval(self.animateInterval);
        self.move();
    }, 200);
    this.direction = this.getRandomDirection();

    this.move();
};

Movable.prototype.move = function(){
    var self = this;

    var direction = this.getNewDirection();
    var newPosition = this.directionToCoordinates(direction);

    var nextPosition = labyrinth.canIGoThere(newPosition.x, newPosition.y);
    if (nextPosition) {
        this.direction = direction;
        this.x = nextPosition.x;
        this.y = nextPosition.y;

        this.animateInterval = setInterval(function(){
            self.animate();
        }, 7);
    } else {
        this.move();
    }
};

Movable.prototype.animate = function(){
    var centerX = labyrinth.positionToPixel(this.x) - (28 / 2);
    let centerY = labyrinth.positionToPixel(this.y) - (31 / 2);
    var leftDiff = parseInt(this.elementInstance.style.left) - centerX;
    var topDiff = parseInt(this.elementInstance.style.top) - centerY;

    if (leftDiff !== 0) {
        if (leftDiff < 0) {
            centerX = parseInt(this.elementInstance.style.left) + 1;
        } else {
            centerX = parseInt(this.elementInstance.style.left) - 1;
        }
    }

    if (topDiff !== 0) {
        if (topDiff < 0) {
            centerY = parseInt(this.elementInstance.style.top) + 1;
        } else {
            centerY = parseInt(this.elementInstance.style.top) - 1;
        }
    }

    this.elementInstance.style.left = centerX + "px";
    this.elementInstance.style.top = centerY + "px";
};

Movable.prototype.getNewDirection = function(){
    var newDirection = this.getRandomDirection();
    var oppositeDirection = this.getOppositeDirection(this.direction);
    if (newDirection === oppositeDirection) {
        newDirection = this.getNewDirection();
    }

    return newDirection;
};