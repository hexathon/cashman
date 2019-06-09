/**
 * Ghosts class to create ghosts with the objective of follow Cashman and eat it.
 * @constructor
 */
function Ghost (options) {
    this.options = options;
    this.x = options.x;
    this.y = options.y;
    this.color = options.color;
    this.container = options.container;
    this.gameOver = false;
    this.eatable = false;
    this.speed = 200;

    this.registerEventListeners();
}

Ghost.prototype.registerEventListeners = function () {

    window.addEventListener('cashman.move', (event) => {
        this.cashmanPos = event.detail.position;
        this.isCashmanMoving =  true;
    }, true);

    window.addEventListener('game.start', (event) => {
         this.moveRandomly();
        // this.keepMoving();
    }, true);

    window.addEventListener('game.reset', (event) => {
        this.reset();
    }, true);

    window.addEventListener('eatable.eaten', (event) => {

        if (event.detail.type === 'PowerPallet') {
            var self = this;
            this.eatable =  true;
            this.speed = 300;
            setTimeout(function(){
                self.eatable =  false;
                this.speed = 200;
                console.log("eatable pp");
            }, 5000);
        }
    }, true);
};


/**
 *  Move the Ghosts just to follow Cashman if it is in movement or randomly move on the labyrinth.
 */
Ghost.prototype.keepMoving = function () {
    var self = this;
    if (this.isCashmanMoving) {
        this.followCashman();
    } else {
        this.moveRandomly();
    }
    if (!this.gameOver) {
        setTimeout(function(){
            self.keepMoving();
        }, this.speed);
    }
};

Ghost.prototype.cashmanCollision = function () {

    var myPos = {x:this.x, y:this.y};

    if(this.cashmanPos) {
        if (this.cashmanPos.x === myPos.x && this.cashmanPos.y === myPos.y) {
            return true;
        }
    }

    return  false;
};

Ghost.prototype.eat = function () {

   if (this.cashmanCollision()){
       if (this.eatable){
           this.notify('ghost.killed');
       } else {
           this.notify('ghost.kill');
           this.gameOver = true;
       }
   }

};

/**
 * Follow cashman through the best route...
 */
Ghost.prototype.followCashman =  function () {

    var self = this;
    //get Next Best Step to follow cashman
    var nextPos = nextStepOnShortestRouteToDestination({ end: this.cashmanPos, start: {x:this.x, y:this.y}});

    console.log(nextPos);

    if (this.x > nextPos.x) {
        this.move('left');
    } else {
        this.move('right');
    }
    if (this.y > nextPos.y) {
        this.move('up');
    } else {
        this.move('down');
    }
}

Ghost.prototype.getOppositeDirection = function() {
    switch(this.facing){
        case 'left':
            return 'right';
        case 'right':
            return 'left';
        case 'up':
            return 'down';
        case 'down':
            return 'up';
    }
};

Ghost.prototype.getPossibleTurns = function() {
    var movements = [];

    var directions = ['left','right', 'up','down'];
    var index = directions.indexOf(this.getOppositeDirection());
    if (index > -1) {
        directions.splice(index, 1);
    }

    for (var i=0; i< directions.length; i++) {
        var coords = this.directionToCoordinates(directions[i]);
        if (window.labyrinth.canIGoThere(coords.x, coords.y) !== null) {
            movements.push(directions[i]);
        }
    }

    return movements;
};

/**
 * Move in no sence way in the labyrinth
 */
Ghost.prototype.moveRandomly = function() {
    var self = this;
    var movements = self.getPossibleTurns();
    var pos = Math.floor((Math.random() * movements.length));
    var moved = false;


    switch (movements[pos]) {
        case 'left':
            moved = this.move('left');
            break;
        case 'right':
            moved = this.move('right');
            break;
        case 'up':
            moved = this.move('up');
            break;
        case 'down':
            moved = this.move('down');
            break;
    }
    this.eat();
    if(!this.gameOver) {
        setTimeout(function(){
            self.moveRandomly();
        }, this.speed);
    }
};

/**
 * eat Cashman
 */
Ghost.prototype.eatCashman = function() {
    //kill cashman
    this.active =  false;
};

/**
 * disapear ghost
 */
Ghost.prototype.dissapear = function() {
    this.active = false;
};

Ghost.prototype.notify = function (name,data) {
    let event = new CustomEvent(name, data);
    window.dispatchEvent(event);
};

Ghost.prototype.directionToCoordinates = function (direction) {
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

Ghost.prototype.move = function (direction) {

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

        this.facing = direction;

        this.updatePosition();
        return true;
    }

    return false;
};

Ghost.prototype.calculateCssProperties = function () {
    let centerX = labyrinth.positionToPixel(this.x) - (28 / 2);
    let centerY = labyrinth.positionToPixel(this.y) - (31 / 2);
    let style = [
        'position:absolute',
        'left: ' + centerX + 'px',
        'top: ' + centerY + 'px'
    ];
    return style.join(';');
};

Ghost.prototype.updatePosition = function () {
    this.elementInstance.style = this.calculateCssProperties();
};

Ghost.prototype.reset = function () {
    this.x = this.options.x;
    this.y = this.options.y;
    this.gameOver = false;
};

Ghost.prototype.render = function () {
    this.elementInstance = document.createElement('div');
    this.elementInstance.className = 'ghost-instance transition';
    this.elementInstance.style = this.calculateCssProperties();

    this.icon = document.createElement('img');
    this.icon.src = 'images/character-ghost-'+this.color+'.png';
    this.icon.style.width = '28px';
    this.icon.style.height = '31px';

    this.elementInstance.appendChild(this.icon);

    this.container.appendChild(this.elementInstance);
};
