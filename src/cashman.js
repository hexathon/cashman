var labyrinth  = {};
class BaseModel {
    constructor() {}
    moveUp() {}
    moveDown() {}
    moveLeft() {}
    moveRight() {}
}

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

class CashMan extends BaseModel {
    constructor() {
        let position = labyrinth.getCashmanInitialPosition();
        super(position);

        this.registerEventListeners();
    }

    registerEventListeners() {
        window.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case KEY_UP:
                    super.moveUp();
                    break;
                case KEY_DOWN:
                    super.moveDown();
                    break;
                case KEY_RIGHT:
                    super.moveRight();
                    break;
                case KEY_LEFT:
                    super.moveLeft();
                    break;
            }
        }, true);
    }

    moveUp() {
        super.moveUp(direction)
    }
}

export default CashMan;