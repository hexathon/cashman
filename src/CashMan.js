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
    this.speed = window.game.getSpeed();
    this.moving = false;
    this.stopped = true; // Previous 'moving' state.

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
    window.addEventListener('game.input', throttle(function (event) {
        let direction = event.detail.direction;
        let nextDirection = event.detail.nextDirection;

        if (!self.move(nextDirection)) {
            self.move(direction);
        }
    }, 200), true);

    window.addEventListener('game.reset', () => {
        this.reset();
    }, true);

    window.addEventListener('game.start', () => {
        this.speed = window.game.getSpeed();
    }, true);

    window.addEventListener('cashman.whereAreYou', (event) => {
        if (typeof event.detail.callback === 'function') {
            event.detail.callback(this.position());
        }
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
            Transition.enable(this.elementInstance, this.speed);
        }

        this.x = newCoordinates.x;
        this.y = newCoordinates.y;
        this.moving = true;
        this.stopped = false;

        this.notify('cashman.move', {position: this.position(), direction: direction});
        this.facing = direction;

        this.updatePosition();
        return true;
    }

    if (!this.stopped) {
        // Cashman wasn't moving before.
        this.notify('cashman.stopped', {position: this.position()});
        this.stopped = true;
    }

    this.notify('cashman.stop', {position: this.position()});
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
    if (window.debug || window.cashman.debug) {
        console.log(name, data);
    }

    let event = new CustomEvent(name, {detail: data});
    window.dispatchEvent(event);
};

CashMan.prototype.calculateCssProperties = function () {
    let centerX = labyrinth.positionToPixel(this.x) - (40 / 2);
    let centerY = labyrinth.positionToPixel(this.y) - (40 / 2);
    this.elementInstance.style.left = centerX + 'px';
    this.elementInstance.style.top = centerY + 'px';
};

CashMan.prototype.render = function () {
    this.elementInstance = document.createElement('div');
    this.elementInstance.className = "cashmancontainer transition going" + this.facing;
    this.elementInstance.innerHTML = `
        <div id="deadcashman"></div>
        <div id="cashman">
            <div class="pants">
                <img src="./images/cashman-pants.svg">
            </div>
            <div class="head">
                <img src="./images/cashman-head.svg">
            </div>
<<<<<<< Updated upstream
        </div>`;
    this.calculateCssProperties();
=======
        </div>
        `;
    this.elementInstance.style = this.calculateCssProperties();
>>>>>>> Stashed changes
    this.container.appendChild(this.elementInstance);
};

CashMan.prototype.updatePosition = function () {
    this.calculateCssProperties();
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

    this.updatePosition();
};