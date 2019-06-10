/**
 * Define which input controller should be used: keyboard or touch
 * @param options Object {type: 'touch|keyboard'}
 * @constructor
 */
function InputController(options) {
    this.type = options.type;

    switch(options.type) {
        case 'keyboard':
            new KeyboardInputController();
            break;
        case 'touch':
            alert('No touch support for CashMan yet!');
            break;
    }
}