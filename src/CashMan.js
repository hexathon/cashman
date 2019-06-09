(function (global) {
    const STATE_MOVING = 'moving';
    const STATE_IDLE = 'idle';
    const STATE_KILLED = 'killed';

    /**
     * Mr. Cash Man himself.
     *
     * Usage:
     * var cashMan = new CashMan({x: positionX, y: positionY, container: containingLayer});
     *
     * @param options
     * @constructor
     */
    function CashMan(options) {
        this.type = "CashMan";
        this.facing = 'right';
        this.speed = global.game.getSpeed();
        this.moving = false;
        this.stopped = true; // Previous 'moving' state.

        // Initialize options
        this.x = options.x;
        this.y = options.y;
        this.container = options.container;

        this.initialPosition = {
            x: options.x,
            y: options.y
        };

        this.registerEventListeners();
    }

    /**
     * Listen to incoming movement controls from the controller
     */
    CashMan.prototype.registerEventListeners = function () {
        var self = this;
        global.addEventListener('game.input', throttle(function (event) {
            let direction = event.detail.direction;
            let nextDirection = event.detail.nextDirection;

            if (!self.move(nextDirection)) {
                self.move(direction);
            }
        }, 200), true);

        global.addEventListener('game.reset', () => {
            this.reset();
        }, true);

        global.addEventListener('game.start', () => {
            this.speed = global.game.getSpeed();
        }, true);

        global.addEventListener('cashman.whereAreYou', (event) => {
            if (typeof event.detail.callback === 'function') {
                event.detail.callback(this.position());
            }
        }, true);

        global.addEventListener('game.killed', (event) => {
            this.setState(STATE_KILLED);
        }, true);

        global.addEventListener('game.over', (event) => {
            this.setState(STATE_KILLED);
        }, true);

        global.addEventListener('cashman.move', () => {
            this.setState(STATE_MOVING);
        });

        global.addEventListener('cashman.stopped', () => {
            this.setState(STATE_IDLE);
        });
    };

    CashMan.prototype.move = function (direction) {
        let coordinates = this.directionToCoordinates(direction);
        let targetX = coordinates.x;
        let targetY = coordinates.y;
        let newCoordinates = global.labyrinth.canIGoThere(targetX, targetY);
        if (newCoordinates !== null) {
            if (Transition.shouldAnimate(this.x, newCoordinates.x)) {
                Transition.disable(this.elementInstance);
            } else {
                Transition.enable(this.elementInstance, this.speed);
            }

            this.x = newCoordinates.x;
            this.y = newCoordinates.y;
            this.moving = true;
            this.stopped = false;

            this.notify('cashman.move', {position: this.position(), direction: direction});
            this.facing = direction;

            this.updatePosition();
            return true;
        }

        if (!this.stopped) {
            // Cashman wasn't moving before.
            this.notify('cashman.stopped', {position: this.position()});
            this.stopped = true;
        }

        this.notify('cashman.stop', {position: this.position()});
        this.moving = false;
        this.updatePosition();
        return false;
    };

    CashMan.prototype.directionToCoordinates = function (direction) {
        switch (direction) {
            case 'up':
                return {x: this.x, y: this.y - 1};
            case 'down':
                return {x: this.x, y: this.y + 1};
            case 'left':
                return {x: this.x - 1, y: this.y};
            case 'right':
                return {x: this.x + 1, y: this.y};
            default:
                throw new Error('Invalid direction: ' + direction);
        }
    };

    CashMan.prototype.position = function () {
        return {x: this.x, y: this.y};
    };

    CashMan.prototype.notify = function (name, data) {
        if (global.debug || global.cashman.debug) {
            console.log(name, data);
        }

        let event = new CustomEvent(name, {detail: data});
        global.dispatchEvent(event);
    };

    CashMan.prototype.calculateCssProperties = function () {
        let centerX = labyrinth.positionToPixel(this.x) - (40 / 2);
        let centerY = labyrinth.positionToPixel(this.y) - (40 / 2);
        this.elementInstance.style.left = centerX + 'px';
        this.elementInstance.style.top = centerY + 'px';
    };

    CashMan.prototype.render = function () {
        this.elementInstance = document.createElement('div');
        this.elementInstance.className = "cashmancontainer going" + this.facing;
        this.elementInstance.innerHTML = `
            <div id="deadcashman"></div>
            <div id="cashman">
                <div class="pants">
                    <img src="./images/cashman-pants.svg">
                </div>
                <div class="head">
                    <img src="./images/cashman-head.svg">
                </div>
            </div>
        `;
        this.calculateCssProperties();
        this.container.appendChild(this.elementInstance);
        this.setState(STATE_IDLE);
    };

    CashMan.prototype.updatePosition = function () {
        this.calculateCssProperties();
        var className = this.elementInstance.className;
        className = className.replace(/going\w*/, 'going' + this.facing);
        this.elementInstance.className = className.trim();
    };

    CashMan.prototype.setState = function (state) {
        console.log('set state', state, this.elementInstance.className);
        var className = this.elementInstance.className;
        if (className.indexOf('state-') > -1) {
            // Replace the previously set state
            this.elementInstance.className = className.replace(/state-\w*/, 'state-' + state);
        } else {
            // Add state class to element
            this.elementInstance.className += ' state-' + state;
        }
    };

    CashMan.prototype.reset = function () {
        this.facing = 'right';
        this.x = this.initialPosition.x;
        this.y = this.initialPosition.y;

        Transition.disable(this.elementInstance);
        this.updatePosition();
    };

    // Register to the global scope
    global.CashMan = CashMan;
})(window);
