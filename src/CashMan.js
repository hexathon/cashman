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
        switch (event.detail.direction) {
            case 'up':
                this.moveUp();
                break;
            case 'down':
                this.moveDown();
                break;
            case 'left':
                this.moveLeft();
                break;
            case 'right':
                this.moveRight();
                break;
        }
    }, true);
};

CashMan.prototype.moveUp = function () {
    if (BaseModel.moveUp.call(this)) {
        this.notify('cashman.move.up', this.getPosition());
        console.log('CashMan is moving up.');
        this.render();
    } else {
        this.notify('cashman.move.failed');
        console.log('CashMan is moving failed.');
    }
};

CashMan.prototype.moveDown = function () {
    if (BaseModel.moveDown.call(this)) {
        this.notify('cashman.move.down', this.getPosition());
        console.log('CashMan is moving down.');
        this.render();
    } else {
        this.notify('cashman.move.failed');
        console.log('CashMan is moving failed.');
    }
};

CashMan.prototype.moveLeft = function () {
    if (BaseModel.moveLeft.call(this)) {
        this.notify('cashman.move.left', this.getPosition());
        console.log('CashMan is moving left.');
        this.render();
    } else {
        this.notify('cashman.move.failed');
        console.log('CashMan is moving failed.');
    }
};

CashMan.prototype.moveRight = function () {
    if (BaseModel.moveRight.call(this)) {
        this.notify('cashman.move.right', this.getPosition());
        console.log('CashMan is moving right.');
        this.render();
    } else {
        this.notify('cashman.move.failed');
        console.log('CashMan is moving failed.');
    }
};

CashMan.prototype.notify = function (name, data) {
    let event = new CustomEvent(name, {detail: data});
    window.dispatchEvent(event);

    if (name.indexOf('move') > -1) {
        // This is a move event
        let event = new CustomEvent('cashman.move', {detail: BaseModel.getPosition.call(this)});
        window.dispatchEvent(event);
    }
};

CashMan.prototype.render = function () {
    console.log('Cashman render');
    this.elementInstance = document.createElement('div');
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
    console.log(style);
    this.elementInstance.style = style;
    this.container.appendChild(this.elementInstance);
};