/**
 * Eatable base class for anything that gets eaten by Cash Man and has a score.
 * Probably with the exception for eatable Ghosts..
 */
class Eatable {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = 'eatable';
        this.value = 10;

        if (this.type === 'eatable') {
            throw new Error('Eatable should not be instantiated by itself.');
        }

        this.registerEventListeners();
    }

    registerEventListeners() {
        window.addEventListener('cashman.move', (event) => {
            this.getEaten(event.dataset);
        }, true);
    }

    getEaten(data) {
        if (this.detectCollision(data)) {
            let event = new CustomEvent('eatable.eaten', {score: this.score, type: this.type});
            window.dispatchEvent(event);

            this.selfDestruct();
        }
    }

    /**
     * Gets the value to be added to the highscore if this gets eaten
     * @returns {number}
     */
    get score() {
        return this.value;
    }

    /**
     * If CashMan's current position === eatable position, inform that it is beeing eaten and self destruct.
     * @param event
     */
    detectCollision(event) {
        return event.dataset.x === this.x && event.dataset.y === this.y;
    }

    selfDestruct() {
        let event = new CustomEvent('eatable.selfDestruct', {instance: this});
        window.dispatchEvent(event);
    }
}