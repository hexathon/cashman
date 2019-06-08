/**
 * Ghosts class to create ghosts with the objective of follow Cashman and eat it.
 * @constructor
 */
function Ghost (options) {
    this.x = options.x;
    this.y = options.y;
    this.color = options.color;
    this.container = options.container;
    this.eatable = false;
}

Ghost.prototype = Object.create(Ghost.prototype);
Ghost.prototype.constructor = Ghost;

Ghost.prototype.registerEventListeners = function () {

    window.addEventListener('cashman.move', (event) => {
        this.cashmanPos = event.dataset;
    this.isCashmanMoving =  true;
    this.eat();
    this.keepMoving();
}, true);

    window.addEventListener('cashman.move.failed', (event) => {
        this.isCashmanMoving =  false;
}, true);

    window.addEventListener('labyrinth.level.end', (event) => {
        this.gameOver =  true;
}, true);

    window.addEventListener('powerpallet.activate', (event) => {
        this.eatable =  true;
}, true);

    window.addEventListener('powerpallet.deactivate', (event) => {
        this.eatable =  false;
}, true);

};


/**
 *  Move the Ghosts just to follow Cashman if it is in movement or randomly move on the labyrinth.
 */
Ghost.prototype.keepMoving = function () {
    if (this.isCashmanMoving) {
        this.followCashman();
    } else {
        this.moveRandomly();
    }
    if (!this.gameOver) {
        this.keepMoving();
    }
};


Ghost.prototype.cashmanCollision = function () {

    var myPos = this.getPosition();

    if (this.cashmanPos == myPos) {
        return true;
    }
    return  false;

}

Ghost.prototype.eat = function () {

   if (this.cashmanCollision()){
       if (this.eatable){
           this.notify('ghost.eat.me');
       } else {
           this.notify('ghost.eat.cashman');
           this.gameOver = true;
       }
   }

}

/**
 * Follow cashman through the best route...
 */
Ghost.prototype.followCashman =  function () {

    //get Next Best Step to follow cashman
    var nextPos = nextStepOnShortestRouteToDesination({ end: this.cashmanPos, start: this.getPosition()});

    if (this.getPosition().x > nextPos.x) {
        this.moveLeft();
    } else {
        this.moveRight();
    }
    if (this.getPosition().y > nextPos.y) {
        this.moveUp();
    } else {
        this.moveDown();
    }
}

/**
 * Move in no sence way in the labyrinth
 */
Ghost.prototype.moveRandomly = function() {

    var movements = [ "left", "right", "up", "down"];
    var movLength =  movements.length;
    var movement =  Math.floor((Math.random() * movLength) + 1);
    var moved = false;

    switch (movement) {
        case 'left':
            moved = this.moveLeft();

            break;
        case 'right':
            moved = this.moveRight();

            break;
        case 'up':
            moved = this.moveUp();

            break;
        case 'down':
            moved = this.moveDown();

            break;
    }

    if(!moved) {
        this.moveRandomly();
    }
}
/**
 * eat Cashman
 */
Ghost.prototype.eatCashman = function() {
    //kill cashaman
    this.active =  false;
}
/**
 * disapear ghost
 */
Ghost.prototype.dissapear = function() {
    this.active = false;
}

Ghost.prototype.notify = function (name,data) {
    let event = new CustomEvent(name, data);
    window.dispatchEvent(event);
};

Ghost.prototype.directionToCoordinates = function (direction) {
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


Ghost.prototype.move = function (direction) {
    let coordinates = this.directionToCoordinates(direction);
    let targetX = coordinates.x;
    let targetY = coordinates.y;

    let newCoordinates = window.labyrinth.canIGoThere(targetX, targetY);
    if (newCoordinates !== null) {
        this.x = newCoordinates.x;
        this.y = newCoordinates.y;

        this.facing = direction;

        this.updatePosition();

        return true;
    }

    return false;
};

Ghost.prototype.calculateCssProperties = function () {
    let centerX = labyrinth.positionToPixel(this.x) - (16 / 2);
    let centerY = labyrinth.positionToPixel(this.y) - (16 / 2);
    let style = [
        'position: absolute',
        'height: 28px',
        'width: 31px',
        'left: ' + centerX + 'px',
        'top: ' + centerY + 'px'
    ];
    style = style.join(';');

    return style;
};

Ghost.prototype.updatePosition = function () {
    this.elementInstance.style = this.calculateCssProperties();
};

Ghost.prototype.render = function () {
    this.elementInstance = document.createElement('div');
    this.elementInstance.style = this.calculateCssProperties();

    this.icon = document.createElement('img');
    this.icon.src = 'images/character-ghost-'+this.color+'.png';
    this.icon.style.width = '28px';
    this.icon.style.height = '31px';

    this.elementInstance.appendChild(this.icon);

    this.container.appendChild(this.elementInstance);
};