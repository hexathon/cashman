function KeyboardInputController() {
    this.registerEventListeners();

    this.nextKeyState = 'down';
    this.currentKeyState = 'down';

    this.start();
}

KeyboardInputController.prototype.start = function () {
    var self = this;

    window.addEventListener('cashman.move', function (event) {
        self.currentKeyState = event.detail.direction;
    }, true);

    window.addEventListener('game.reset', function () {
        self.nextKeyState = 'down';
        self.currentKeyState = 'down';
    }, true);

    function loop() {
        // Arrow key is pressed
        self.move();
        setTimeout(loop, 200);
    }
    loop();
};

KeyboardInputController.prototype.registerEventListeners = function () {
    var self = this;
    window.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 'ArrowUp':
                self.nextKeyState = 'up';
                break;
            case 'ArrowDown':
                self.nextKeyState = 'down';
                break;
            case 'ArrowLeft':
                self.nextKeyState = 'left';
                break;
            case 'ArrowRight':
                self.nextKeyState = 'right';
                break;
        }
    }, true);
};

KeyboardInputController.prototype.move = function () {
    if (window.debug) {
        console.info('Received keyboard input for cashman to move: ' + this.currentKeyState, this.nextKeyState);
    }

    var event = new CustomEvent('cashman.execute.move', {detail: {
        direction: this.currentKeyState,
        nextDirection: this.nextKeyState
    }});
    window.dispatchEvent(event);
};


