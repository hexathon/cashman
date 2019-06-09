function CashDot(options) {
    Eatable.call(this, options);
    this.type = "CashDot";
    this.value = 10;
}
CashDot.prototype = Object.create(Eatable.prototype);
CashDot.prototype.constructor = CashDot;

/**
 * Render the Cash Dot to the grid
 */
CashDot.prototype.render = function () {
    this.elementInstance = document.createElement('div');

    let centerX = labyrinth.positionToPixel(this.x) - 4;
    let centerY = labyrinth.positionToPixel(this.y) - 4;

    this.elementInstance.style.position = 'absolute';
    this.elementInstance.style.width = '8px';
    this.elementInstance.style.height = '8px';
    this.elementInstance.style.left = centerX + 'px';
    this.elementInstance.style.top = centerY + 'px';
    this.elementInstance.style.background = 'orange';

    this.container.appendChild(this.elementInstance);
};