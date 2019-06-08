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
    this.type = "CashDot";
    this.facing = 'left';

    // Initialize options
    this.x = options.x;
    this.y = options.y;
    this.container = options.container;

    console.log(this.x, this.y);

    this.registerEventListeners();
}

/**
 * Listen to incoming movement controls from the controller
 */
CashMan.prototype.registerEventListeners = function () {
    var self = this;
    window.addEventListener('cashman.execute.move', (event) => {
        let direction = event.detail.direction.toLowerCase();
        try {
            self.move(direction);
        } catch (err) {
            console.error(err);
        }
    }, true);
};

CashMan.prototype.move = function (direction) {
    let coordinates = this.directionToCoordinates(direction);
    let targetX = coordinates.x;
    let targetY = coordinates.y;

    let newCoordinates = window.labyrinth.canIGoThere(targetX, targetY);
    if (newCoordinates !== null) {
        this.x = newCoordinates.x;
        this.y = newCoordinates.y;

        this.notify('cashman.move.' + direction, this.position());
        this.facing = direction;

        this.updatePosition();

        return true;
    }

    this.notify('cashman.move.failed');
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

    if (name.indexOf('move') > -1) {
        // This is a move event
        let event = new CustomEvent('cashman.move', {detail: this.position()});
        window.dispatchEvent(event);
    }
};

CashMan.prototype.calculateCssProperties = function () {
    let centerX = labyrinth.positionToPixel(this.x) - (16 / 2);
    let centerY = labyrinth.positionToPixel(this.y) - (16 / 2);
    let style = [
        'position: absolute',
        'background:url(cashman-tiny.png) no-repeat',
        'height: 28px',
        'width: 31px',
        'left: ' + centerX + 'px',
        'top: ' + centerY + 'px'
    ];
    style = style.join(';');

    return style;
};

CashMan.prototype.render = function () {
    this.elementInstance = document.createElement('div');
    this.elementInstance.style = this.calculateCssProperties();
    this.container.appendChild(this.elementInstance);
};

CashMan.prototype.updatePosition = function () {
    this.elementInstance.style = this.calculateCssProperties();
};