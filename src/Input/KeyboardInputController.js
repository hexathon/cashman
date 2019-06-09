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

    window.addEventListener('game.stop', () => {
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


