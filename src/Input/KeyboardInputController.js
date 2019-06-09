function KeyboardInputController() {
    this.registerEventListeners();

    this.nextDirection = 'down';
    this.currentDirection = 'down';
    this.stop = false;

    this.start();
}

KeyboardInputController.prototype.start = function () {
    var self = this;

    window.addEventListener('cashman.move', (event) => {
        this.currentDirection = event.detail.direction;
    }, true);

    window.addEventListener('game.reset', () => {
        this.nextDirection = 'down';
        this.currentDirection = 'down';
    }, true);

    window.addEventListener('game.start', () => {
        this.stop = false;
        loop();
    }, true);

    window.addEventListener('game.killed', () => {
        this.stop = true;
    }, true);

    window.addEventListener('game.won', () => {
        this.stop = true;
    }, true);

    function loop() {
        if (!self.stop) {
            self.input();
            setTimeout(loop, 100);
        }
    }
};

KeyboardInputController.prototype.registerEventListeners = function () {
    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                this.nextDirection = 'up';
                event.preventDefault();
                break;
            case 'ArrowDown':
                this.nextDirection = 'down';
                event.preventDefault();
                break;
            case 'ArrowLeft':
                this.nextDirection = 'left';
                event.preventDefault();
                break;
            case 'ArrowRight':
                this.nextDirection = 'right';
                event.preventDefault();
                break;
        }
    }, true);

    window.addEventListener('keyup', Konami.code(function () {
        console.log("KONAMI");
        window.game.lives = 20;
        window.scoring.updateLives(window.game.lives);
        labyrinth.showMessage("God Mode", "ENABLED");
        (new Audio('sounds/pacman_eatghost.wav')).play();
    }));
};

KeyboardInputController.prototype.input = function () {
    if (window.debug) {
        console.info('Received keyboard input for cashman to move: ' + this.currentDirection, this.nextDirection);
    }

    var event = new CustomEvent('game.input', {detail: {
        direction: this.currentDirection,
        nextDirection: this.nextDirection
    }});
    window.dispatchEvent(event);
};

/**
 * @license konami-js v1.0.1
 * http://mck.me/mit-license
 */
var Konami = {};

(function(Konami, window) {
    'use strict';

    /**
     * Creates an event handler responding to the specified sequence.
     * @param {...number|function()} arguments
     * @return {function(Event)}
     */
    var sequence = Konami.sequence = function() {
        var sequence = Array.prototype.slice.call(arguments),
            state = 0;

        /**
         * Event handler
         * @param {Event|number} e
         */
        return function(e) {
            // patch legacy IE
            e = (e || window.event);
            e = (e.keyCode || e.which || e);

            if (e === sequence[state] || e === sequence[(state = 0)]) {
                // move next and peek
                var action = sequence[++state];

                // sequence complete when a function is reached
                if (typeof action !== 'function') {
                    return;
                }

                // fire action
                action();

                // reset when sequence completed
                state = 0;
            }
        };
    };

    /**
     * Creates an event handler responding to the Konami Code.
     * @param {function()} action completed sequence callback
     * @return {function(Event)}
     */
    Konami.code = function(action) {
        return sequence(38, 38, 40, 40, 37, 39, 37, 39, action);
    };

})(Konami, window);
