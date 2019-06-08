function InputController(options) {
    this.type = options.type;

    switch(options.type) {
        case 'keyboard':
            new KeyboardInputController();
            break;
    }
}