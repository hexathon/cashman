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
    BaseModel.call(this, options);
    this.type = "CashDot";

    // var KEY_LEFT = 37;
    // var KEY_UP = 38;
    // var KEY_RIGHT = 39;
    // var KEY_DOWN = 40;

    this.registerEventListeners();
}

// Extending the BaseModel object
CashMan.prototype = Object.create(BaseModel.prototype);
CashMan.prototype.constructor = CashMan;

/**
 * Listen to incoming movement controls from the controller
 */
CashMan.prototype.registerEventListeners = function () {
    window.addEventListener('cashman.execute.move', (event) => {
        switch (event.dataset.direction) {
            case 'up':
                this.moveUp();
                break;
            case 'down':
                this.moveDown();
                break;
            case 'left':
                this.moveRight();
                break;
            case 'right':
                this.moveLeft();
                break;
        }
    }, true);
};

CashMan.prototype.moveUp = function () {
    if (BaseModel.moveUp.call(this)) {
        this.notify('cashman.move.up', BaseModel.getPosition.call(this));
        console.log('CashMan is moving up.');
    }
};

CashMan.prototype.moveDown = function () {
    if (BaseModel.moveDown.call(this)) {
        this.notify('cashman.move.down', BaseModel.getPosition.call(this));
        console.log('CashMan is moving down.');
    }
};

CashMan.prototype.moveLeft = function () {
    if (BaseModel.moveLeft.call(this)) {
        this.notify('cashman.move.left', BaseModel.getPosition.call(this));
        console.log('CashMan is moving left.');
    }
};

CashMan.prototype.moveRight = function () {
    if (BaseModel.moveRight.call(this)) {
        this.notify('cashman.move.right', BaseModel.getPosition.call(this));
        console.log('CashMan is moving right.');
    }
};

CashMan.prototype.notify = function (name) {
    let event = new CustomEvent(name, data);
    window.dispatchEvent(event);

    if (name.indexOf('move') > -1) {
        // This is a move event
        let event = new CustomEvent('cashman.move', BaseModel.getPosition.call(this));
        window.dispatchEvent(event);
    }
};

CashMan.prototype.render = function () {
    this.elementInstance = document.createElement('div');
    this.icon = document.createElement('img');
    this.icon.src = 'images/celery.svg';
    this.icon.style.width = '16px';
    this.icon.style.height = '16px';
    let centerX = labyrinth.positionToPixel(this.x) - (16 / 2);
    let centerY = labyrinth.positionToPixel(this.y) - (16 / 2);
    this.elementInstance.style.position = 'absolute';
    this.elementInstance.style.left = centerX + 'px';
    this.elementInstance.style.top = centerY + 'px';

    this.elementInstance.appendChild(this.icon);
    this.container.appendChild(this.elementInstance);
};