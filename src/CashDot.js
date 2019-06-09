function CashDot(options) {
    Eatable.call(this, options);
    this.type = "CashDot";
    this.value = options.value || 10;
    this.size = options.size || 8;
}
CashDot.prototype = Object.create(Eatable.prototype);
CashDot.prototype.constructor = CashDot;

/**
 * Render the Cash Dot to the grid
 */
CashDot.prototype.render = function () {
    this.elementInstance = document.createElement('div');

    let centerX = labyrinth.positionToPixel(this.x) - (this.size / 2);
    let centerY = labyrinth.positionToPixel(this.y) - (this.size / 2);

    this.elementInstance.style.position = 'absolute';
    this.elementInstance.style.width = this.size + 'px';
    this.elementInstance.style.height = this.size + 'px';
    this.elementInstance.style.left = centerX + 'px';
    this.elementInstance.style.top = centerY + 'px';
    this.elementInstance.style.background = 'orange';
    this.elementInstance.style.borderRadius = (this.size / 2) + 'px';

    this.container.appendChild(this.elementInstance);
};