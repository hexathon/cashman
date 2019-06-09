function PowerPallet(options) {
    Eatable.call(this, options);
    this.type = "PowerPallet";
    this.value = 50;
}
PowerPallet.prototype = Object.create(Eatable.prototype);
PowerPallet.prototype.constructor = PowerPallet;

/**
 * Render
 */
PowerPallet.prototype.render = function () {
    this.elementInstance = document.createElement('div');

    this.icon = document.createElement('img');
    this.icon.src = 'images/celery.svg';
    this.icon.style.width = '26px';
    this.icon.style.height = '26px';

    let centerX = labyrinth.positionToPixel(this.x) - (26 / 2);
    let centerY = labyrinth.positionToPixel(this.y) - (26 / 2);

    this.elementInstance.style.position = 'absolute';
    this.elementInstance.style.left = centerX + 'px';
    this.elementInstance.style.top = centerY + 'px';

    this.elementInstance.appendChild(this.icon);
    this.container.appendChild(this.elementInstance);
};