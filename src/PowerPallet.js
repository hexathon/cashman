function PowerPallet(options) {
    Eatable.call(this, {options});
    this.type = "Celery";
    this.value = 50;
}
PowerPallet.prototype = Object.create(Eatable.prototype);
PowerPallet.prototype.constructor = Celery;

/**
 * Render
 */
PowerPallet.prototype.render = function () {
    this.elementInstance = document.createElement('div');
    this.icon = document.createElement('img');
    this.icon.src = 'images/celery.svg';
    this.icon.style.width = '16px';
    this.icon.style.height = '16px';
    let centerX = labyrinth.positionToPixel(this.x) + this.icon.width / 2;
    let centerY = labyrinth.positionToPixel(this.y) + this.icon.height / 2;
    this.elementInstance.style.position = 'absolute';
    this.elementInstance.style.left = centerX + 'px';
    this.elementInstance.style.top = centerY + 'px';

    this.elementInstance.appendChild(this.icon);
    this.container.appendChild(this.elementInstance);
};