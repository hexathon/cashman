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
    this.speed = window.game.getSpeed();
    this.alive = true;

    this.registerEventListeners();
}

Ghost.prototype.registerEventListeners = function () {

    window.addEventListener('cashman.move', (event) => {
        this.cashmanPos = event.detail.position;
        this.isCashmanMoving =  true;
    }, true);

    window.addEventListener('game.start', (event) => {
        this.gameOver = false;
        this.moveRandomly();
        this.speed = window.game.getSpeed();
        // this.keepMoving();
    }, true);

    window.addEventListener('game.stop', (event) => {
        this.gameOver = true;
    }, true);

    window.addEventListener('game.reset', (event) => {
        this.reset();
    }, true);

    window.addEventListener('eatable.eaten', (event) => {

        if (event.detail.type === 'PowerPallet') {
            var self = this;
            this.eatable =  true;
            console.log('old ghost speed', this.speed);
            this.speed = window.game.getSpeed() + (window.game.getSpeed() * 0.35);
            console.log('New ghost speed', this.speed);
            Transition.enable(this.elementInstance, this.speed);
            self.icon.src = 'images/character-ghost-killable.png';
            setTimeout(function(){
                 self.eatable =  false;
                 if(self.alive) {
                     self.icon.src = 'images/character-ghost-' + self.color + '.png';
                 }
                self.speed = window.game.getSpeed();
            }, 7000);
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

    var self = this;
    var yourCallback = function (position) {
        self.cashmanPos  = position;
    };
    var event = new CustomEvent('cashman.whereAreYou', {detail: {
            callback: yourCallback
        }});
    window.dispatchEvent(event);

    var cashmanWidth = 40;
    var cashmanHeight = 40;
    var ghostWidth = 28;
    var ghostHeight = 31;

    var myPos = {x:window.labyrinth.positionToPixel(this.x),
        y:window.labyrinth.positionToPixel(this.y)};

    var pixelCashmanPos = {x:window.labyrinth.positionToPixel(this.cashmanPos.x),
    y:window.labyrinth.positionToPixel(this.cashmanPos.y)};

    if(pixelCashmanPos) {
        if (pixelCashmanPos.x < myPos.x + ghostWidth &&
            pixelCashmanPos.x + cashmanWidth > myPos.x &&
            pixelCashmanPos.y < myPos.y + ghostHeight &&
            pixelCashmanPos.y + cashmanHeight > myPos.y) {
            return true;
        }
    }

    return  false;
};

Ghost.prototype.eat = function () {

   if (this.cashmanCollision()){
       if (this.eatable){
           console.log("to be killed")
           this.notify('ghost.killed');
           // this.alive = false;
           this.reset();

       } else {
           this.notify('ghost.kill');
           this.gameOver = true;
       }
   }
};

Ghost.prototype.goBackToTheCage = function () {

    var nextPos = nextStepOnShortestRouteToDestination(
        { end: {x:this.options.x, y: this.options.y},
        start: {x:this.x, y:this.y}}
        );
    console.log(nextPos, this.x, this.y, this.cashmanPos);
    if ( nextPos.x === this.x && nextPos.y === this.y )
    {
        this.alive = true;
        return this.moveRandomly();
    }

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
        var self = this;

        setTimeout(function(){
            self.goBackToTheCage();
        }, this.speed/6);
}
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
    if(this.color==="pink"){
        chasehimchasehimchasehim.apply(this,arguments)
    }
    else{
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
    }
    this.eat();
    if(!this.gameOver) {
        setTimeout(function(){
             // if (self.alive) {
                self.moveRandomly();
            // } else {
            //     self.goBackToTheCage();
            // }
        }, this.speed);
    }
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
            Transition.enable(this.elementInstance, this.speed);
        }

        this.x = newCoordinates.x;
        this.y = newCoordinates.y;

        this.facing = direction;

        this.updatePosition();
        return true;
    }

    return false;
};

Ghost.prototype.setCssPosition = function () {
    let centerX = labyrinth.positionToPixel(this.x) - (28 / 2);
    let centerY = labyrinth.positionToPixel(this.y) - (31 / 2);
    this.elementInstance.style.position = 'absolute';
    this.elementInstance.style.left = centerX + 'px';
    this.elementInstance.style.top = centerY + 'px';
};

Ghost.prototype.updatePosition = function () {
    this.setCssPosition();
};

Ghost.prototype.reset = function () {
    this.x = this.options.x;
    this.y = this.options.y;
    this.updatePosition();
};

Ghost.prototype.render = function () {
    this.elementInstance = document.createElement('div');
    this.elementInstance.className = 'ghost-instance transition';
    this.setCssPosition();

    this.icon = document.createElement('img');
    this.icon.src = 'images/character-ghost-'+this.color+'.png';
    this.icon.style.width = '28px';
    this.icon.style.height = '31px';

    this.elementInstance.appendChild(this.icon);

    this.container.appendChild(this.elementInstance);
};

function chasehimchasehimchasehim(){
    let ghostx = this.options.x;
    let ghosty = this.options.y;
    let cashmanx = window.tomssecretcashmanref_donttellrobin.position().x;
    let cashmany = window.tomssecretcashmanref_donttellrobin.position().y;
}