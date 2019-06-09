var Transition = {
    shouldAnimate(current, next) {
        return Math.max(current, next) - Math.min(current, next) > 1;
    },

    disable(element) {
        var className = element.className;
        if (className.indexOf('transition') > -1) {
            className = className.replace(/transition/, '');
        }

        element.className = className;
    },

    enable(element) {
        var className = element.className;
        if (className.indexOf('transition') === -1) {
            className += ' transition';
        }

        element.className = className;
    }
};