/**
 * Eatable base class for anything that gets eaten by Cash Man and has a score.
 * Probably with the exception for eatable Ghosts..
 * @constructor
 */
function Eatable(options) {
    this.x = options.x;
    this.y = options.y;
    this.type = 'Eatable';
    this.value = 0;
    this.container = options.container;
    this.elementInstance = null;
    this.eaten = false;

    this.registerEventListeners();
}

Eatable.prototype.registerEventListeners = function () {
    var self = this;

    // Listen to the move event of Cash Man
    window.addEventListener('cashman.move', (event) => {
        this.getEaten(event.detail.position);
    }, true);

    window.addEventListener('game.restart', (event) => {
        this.reset();
    }, true);

    window.addEventListener('game.won', (event) => {
        setTimeout(function () {
            self.reset();
        }, 1000);
    }, true);
};

Eatable.prototype.getEaten = function (data) {
    if (!this.eaten && this.detectCollision(data)) {
        this.selfDestruct();

        var event = new CustomEvent('eatable.eaten', {detail: {
            value: this.getValue(),
            type: this.getType()
        }});
        window.dispatchEvent(event);
    }
};

/**
 * Self destruct the eatable
 */
Eatable.prototype.selfDestruct = function () {
    var self = this;

    var event = new CustomEvent('eatable.selfDestruct', {detail: {instance: this}});
    window.dispatchEvent(event);

    this.eaten = true;
    window.setTimeout(function () {
        self.elementInstance.style.display = "none";
    }, 120)
};

Eatable.prototype.reset = function(){
    this.eaten = false;
    this.elementInstance.style.display = "block";
};

/**
 * Gets the value to be added to the highscore if this gets eaten
 * @returns {number}
 */
Eatable.prototype.getValue = function () {
    return this.value;
};

/**
 * Gets the value to be added to the highscore if this gets eaten
 * @returns {number}
 */
Eatable.prototype.getType = function () {
    return this.type;
};

/**
 * Returns true if received position collides with this Eatable object
 * @param position
 * @returns {boolean}
 */
Eatable.prototype.detectCollision = function (position) {
    return position.x === this.x && position.y === this.y;
};