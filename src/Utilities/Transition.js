var Transition = {
    defaultSpeed: 0,
    shouldAnimate(current, next) {
        return Math.max(current, next) - Math.min(current, next) > 1;
    },

    disable(element) {
        element.style.transition = 'none';
    },

    enable(element, transitionSpeed) {
        transitionSpeed = (transitionSpeed - 50) || this.defaultSpeed;
        element.style.transition = 'left ' + transitionSpeed + 'ms linear, top ' + transitionSpeed + 'ms linear';
    }
};

window.addEventListener('game.start', function () {
    Transition.defaultSpeed = window.game.getSpeed();
});