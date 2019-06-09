/**
 * Mr. Cash Man himself.
 *
 * Usage:
 * var cashMan = new CashMan({x: positionX, y: positionY, container: containingLayer});
 *
 * @param options
 * @constructor
 */
function CashMan(options) {
    this.type = "CashMan";
    this.facing = 'right';

    // Initialize options
    this.x = options.x;
    this.y = options.y;
    this.container = options.container;

    this.registerEventListeners();
}

/**
 * Listen to incoming movement controls from the controller
 */
CashMan.prototype.registerEventListeners = function () {
    var self = this;
    window.addEventListener('cashman.execute.move', (event) => {
        let direction = event.detail.direction;
        let nextDirection = event.detail.nextDirection;

        if (!self.move(nextDirection)) {
            self.move(direction);
        }
    }, true);
};

CashMan.prototype.move = function (direction) {
    let coordinates = this.directionToCoordinates(direction);
    let targetX = coordinates.x;
    let targetY = coordinates.y;

    let newCoordinates = window.labyrinth.canIGoThere(targetX, targetY);
    if (newCoordinates !== null) {
        if (Math.max(this.x, newCoordinates.x) - Math.min(this.x, newCoordinates.x) > 1) {
            // We're teleporting, prevent animation
            this.disableAnimation();
        } else {
            // Not teleporting. Make the movement smooth
            this.enableAnimation();
        }

        this.x = newCoordinates.x;
        this.y = newCoordinates.y;


        this.notify('cashman.move', {position: this.position(), direction: direction});
        this.facing = direction;

        this.updatePosition();

        return true;
    }

    return false;
};

CashMan.prototype.disableAnimation = function () {
    var className = this.elementInstance.className;
    if (className.indexOf('transition') > -1) {
        className = className.replace(/transition/, '');
    }

    this.elementInstance.className = className;
};

CashMan.prototype.enableAnimation = function () {
    var className = this.elementInstance.className;
    if (className.indexOf('transition') === -1) {
        className += ' transition';
    }

    this.elementInstance.className = className;
};

CashMan.prototype.directionToCoordinates = function (direction) {
    switch (direction) {
        case 'up':
            return {x: this.x, y: this.y - 1};
        case 'down':
            return {x: this.x, y: this.y + 1};
        case 'left':
            return {x: this.x - 1, y: this.y};
        case 'right':
            return {x: this.x + 1, y: this.y};
        default:
            throw new Error('Invalid direction: ' + direction);
    }
};

CashMan.prototype.position = function () {
    return {x: this.x, y: this.y};
};

CashMan.prototype.notify = function (name, data) {
    if (window.debug) {
        console.log(name, data);
    }

    let event = new CustomEvent(name, {detail: data});
    window.dispatchEvent(event);
};

CashMan.prototype.calculateCssProperties = function () {
    let centerX = labyrinth.positionToPixel(this.x) - (40 / 2);
    let centerY = labyrinth.positionToPixel(this.y) - (40 / 2);
    let style = [
        'left: ' + centerX + 'px',
        'top: ' + centerY + 'px'
    ];
    return style.join(';');
};

CashMan.prototype.render = function () {
    this.elementInstance = document.createElement('div');
    this.elementInstance.className = "cashmancontainer transition going" + this.facing;
    this.elementInstance.innerHTML = "<div class=\"cashman\"><div class=\"pants\"></div><div class=\"head\"></div></div>";
    this.elementInstance.style = this.calculateCssProperties();
    this.container.appendChild(this.elementInstance);
};

CashMan.prototype.updatePosition = function () {
    this.elementInstance.style = this.calculateCssProperties();
    this.elementInstance.className = this.elementInstance.className.replace(/going\w*/, 'going' + this.facing);
};