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
    if (newCoordinates) {
        this.x = targetX;
        this.y = targetY;

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
    let centerX = labyrinth.positionToPixel(this.x) - (40 / 2);
    let centerY = labyrinth.positionToPixel(this.y) - (40 / 2);
    let style = [
        'left: ' + centerX + 'px',
        'top: ' + centerY + 'px'
    ];
    return style.join(';');
};

CashMan.prototype.render = function () {
    console.log(this.container);
    this.elementInstance = document.createElement('div');
    this.elementInstance.className = "cashmancontainer going" + this.facing;
    this.elementInstance.innerHTML = "<div class=\"cashman\"><div class=\"pants\"></div><div class=\"head\"></div></div>";
    this.elementInstance.style = this.calculateCssProperties();
    this.container.appendChild(this.elementInstance);
};

CashMan.prototype.updatePosition = function () {
    this.elementInstance.style = this.calculateCssProperties();
    this.elementInstance.className = this.elementInstance.className.replace(/going\w*/, 'going' + this.facing);
};