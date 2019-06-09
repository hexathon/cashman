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
    this.moving = false;

    // Initialize options
    this.x = options.x;
    this.y = options.y;
    this.container = options.container;

    this.initialPosition = {
        x: options.x,
        y: options.y
    };

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

    window.addEventListener('game.reset', (event) => {
        this.reset();
    }, true);
};

CashMan.prototype.move = function (direction) {
    let coordinates = this.directionToCoordinates(direction);
    let targetX = coordinates.x;
    let targetY = coordinates.y;

    let newCoordinates = window.labyrinth.canIGoThere(targetX, targetY);
    if (newCoordinates !== null) {
        if (Transition.shouldAnimate(this.x, newCoordinates.x)) {
            Transition.disable(this.elementInstance);
        } else {
            Transition.enable(this.elementInstance);
        }

        this.x = newCoordinates.x;
        this.y = newCoordinates.y;
        this.moving = true;

        this.notify('cashman.move', {position: this.position(), direction: direction});
        this.facing = direction;

        this.updatePosition();

        return true;
    }

    this.moving = false;
    this.updatePosition();
    return false;
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
    this.elementInstance.innerHTML = `
        <div id="cashman">
            <div class="pants">
                <img src="/images/cashman-pants.svg">
            </div>
            <div class="head">
                <img src="/images/cashman-head.svg">
            </div>
        </div>`;
    this.elementInstance.style = this.calculateCssProperties();
    this.container.appendChild(this.elementInstance);
};

CashMan.prototype.updatePosition = function () {
    this.elementInstance.style = this.calculateCssProperties();
    var className = this.elementInstance.className;
    className = className.replace(/going\w*/, 'going' + this.facing);
    if (this.moving) {
        if (className.indexOf('moving') === -1) {
            className += ' moving';
        }
    } else {
        className = className.replace(/moving/, '');
    }

    this.elementInstance.className = className.trim();
};

CashMan.prototype.reset = function () {
    this.facing = 'right';
    this.x = this.initialPosition.x;
    this.y = this.initialPosition.y;
};