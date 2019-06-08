import BaseModel from './BaseModel';

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

export class CashMan extends BaseModel {
    constructor() {
        let position = labyrinth.getCashmanInitialPosition();
        super(position);

        this.registerEventListeners();
    }

    registerEventListeners() {
        window.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case KEY_UP:
                    this.moveUp();
                    break;
                case KEY_DOWN:
                    this.moveDown();
                    break;
                case KEY_RIGHT:
                    this.moveRight();
                    break;
                case KEY_LEFT:
                    this.moveLeft();
                    break;
            }
        }, true);
    }

    moveUp() {
        this.notify('cashman.move.up', super.getPosition());
        console.log('CashMan is moving up.');
        super.moveUp()
    }

    moveDown() {
        this.notify('cashman.move.down', super.getPosition());
        console.log('CashMan is moving down.');
        super.moveUp()
    }

    moveLeft() {
        this.notify('cashman.move.left', super.getPosition());
        console.log('CashMan is moving left.');
        super.moveUp()
    }

    moveRight() {
        this.notify('cashman.move.right', super.getPosition());
        console.log('CashMan is moving right.');
        super.moveUp()
    }

    notify(name) {
        let event = new CustomEvent(name, data);
        window.dispatchEvent(event);

        if (name.indexOf('move') > -1) {
            // This is a move event
            let event = new CustomEvent('cashman.move', super.getPosition());
            window.dispatchEvent(event);
        }
    }
}