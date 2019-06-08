function KeyboardInputController() {
    this.registerEventListeners();
}

KeyboardInputController.prototype.registerEventListeners = function () {
    var self = this;
    window.addEventListener('keydown', function (event) {
        switch (event.key) {
            case "ArrowUp":
                self.move('up');
                break;
            case "ArrowDown":
                self.move('down');
                break;
            case "ArrowLeft":
                self.move('left');
                break;
            case "ArrowRight":
                self.move('right');
                break;
        }
    }, true);
};

KeyboardInputController.prototype.move = function (direction) {
    if (window.debug) {
        console.info('Received keyboard input for cashman to move: ' + direction);
    }

    var event = new CustomEvent('cashman.execute.move', {direction: direction});
    window.dispatchEvent(event);
};