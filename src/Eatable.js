/**
 * Eatable base class for anything that gets eaten by Cash Man and has a score.
 * Probably with the exception for eatable Ghosts..
 * @constructor
 */
function Eatable(type, x, y) {
    this.x = x;
    this.y = y;
    this.type = 'eatable';
    this.value = 10;

    this.registerEventListeners();
}

Eatable.prototype.registerEventListeners = function () {
    // Listen to the move event of Cash Man
    window.addEventListener('cashman.move', (event) => {
        this.getEaten(event.dataset);
    }, true);
};

Eatable.prototype.getEaten = function (data) {
    if (this.detectCollision(data)) {
        var event = new CustomEvent('eatable.eaten', {
            value: this.getValue(),
            type: this.getType()
        });
        window.dispatchEvent(event);

        this.selfDestruct();
    }
};

/**
 * Self destruct the eatable
 */
Eatable.prototype.selfDestruct = function () {
    var event = new CustomEvent('eatable.selfDestruct', {instance: this});
    window.dispatchEvent(event);
};

/**
 * If CashMan's current position === eatable position, inform that it is beeing eaten and self destruct.
 * @param event
 */
Eatable.prototype.detectCollision = function (event) {
    return event.dataset.x === this.x && event.dataset.y === this.y;
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
    return this.value;
};

/**
 * Returns true if received position collides with this Eatable object
 * @param position
 * @returns {boolean}
 */
Eatable.prototype.detectCollision = function (position) {
    return position.x === this.x && position.y === this.y;
};