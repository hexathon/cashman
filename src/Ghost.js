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
    this.stupidity = Math.floor(Math.random()*8)//1 is going for it directly and 10 is going completely random

    this.registerEventListeners();
}

Ghost.prototype.registerEventListeners = function () {

    window.addEventListener('cashman.move', (event) => {
        this.cashmanPos = event.detail.position;
        this.isCashmanMoving =  true;
    }, true);


    window.addEventListener('game.start', (event) => {
        this.gameOver = false;
        this.speed = window.game.getSpeed();
        this.moveRandomly();
    }, true);

    window.addEventListener('game.over', (event) => {
        this.gameOver = true;
    }, true);

    window.addEventListener('game.won', (event) => {
        this.gameOver = true;
}, true);

    window.addEventListener('game.killed', (event) => {
        this.gameOver = true;
    }, true);

    window.addEventListener('game.reset', (event) => {
        this.show();
        this.reset();
    }, true);

    window.addEventListener('eatable.eaten', (event) => {

        if (event.detail.type === 'PowerPallet') {
            var self = this;
            this.eatable =  true;
            this.speed = window.game.getSpeed() + (window.game.getSpeed() * 0.35);
            Transition.enable(this.elementInstance, this.speed);
            self.icon.src = 'images/character-ghost-killable.png';

            window.clearTimeout(this.powerPalletTimer);
            this.powerPalletTimer = window.setTimeout(function(){
                 self.eatable =  false;
                 self.icon.src = 'images/character-ghost-' + self.color + '.png';
                self.speed = window.game.getSpeed();
            }, 7000);
        }
    }, true);

    window.addEventListener('ghost.kill', (event) => {
        this.hide();
    }, true);
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

    var cashmanWidth = 20;
    var cashmanHeight = 20;
    var ghostWidth = 20;
    var ghostHeight = 20;

    let offsetX = labyrinth.positionToPixel(this.x) + ((28 / 2) - ( ghostWidth/2));
    let offsetY = labyrinth.positionToPixel(this.y) + ((31 / 2) - ( ghostHeight/2));
    var myPos = {
        x:offsetX,
        y:offsetY};

    let offsetCashX = labyrinth.positionToPixel(this.cashmanPos.x) + ((40 / 2) - ( cashmanWidth/2));
    let offsetCashY = labyrinth.positionToPixel(this.cashmanPos.y) + ((40 / 2) - ( cashmanHeight/2));

    var pixelCashmanPos = {
        x:offsetCashX,
        y:offsetCashY
    };

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
           this.notify('ghost.killed',{value:200});
           this.alive = false;
           // this.reset();

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
    if ( this.options.x === this.x && this.options.y === this.y )
    {
        this.alive = true;
        this.icon.src = 'images/character-ghost-'+this.color+'.png';
        this.eatable = false;
        return this.moveRandomly();
    }

    this.move(nextPos);

    var self = this;

    window.clearTimeout(this.backToCageTimer);
    this.backToCageTimer = window.setTimeout(function(){
        self.goBackToTheCage();
    }, window.game.getSpeed()/4);
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

Ghost.prototype.getPossibleTurns = function(oppsitedirectionAllowed) {
    var movements = [];

    var directions = ['left','right', 'up','down'];
    if(!oppsitedirectionAllowed){
        var index = directions.indexOf(this.getOppositeDirection());
        if (index > -1) {
            directions.splice(index, 1);
        }
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
    if(!this.eatable){
        movements[pos] = chasehimchasehimchasehim.apply(this,arguments)
    }
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
    if(!this.gameOver) {
        window.clearTimeout(this.moveTimer);
        this.moveTimer = window.setTimeout(function(){
             if (self.alive) {
                self.moveRandomly();
            } else {
                self.goBackToTheCage();
            }
        }, window.game.getSpeed());
    }
};

Ghost.prototype.notify = function (name,data) {
    let event = new CustomEvent(name, {detail: data});
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
        this.eat();
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

Ghost.prototype.hide = function () {
    this.elementInstance.style.display = "none";
}
Ghost.prototype.show = function () {
    this.elementInstance.style.display = "block";
}

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

