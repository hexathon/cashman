function CashDot(options) {
    Eatable.call(this, options);
    this.type = "CashDot";
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

    this.elementInstance.style = "position:absolute;width:8px;height:8px;background:orange;left:" + centerX + "px;top:" + centerY + "px;";

    this.container.appendChild(this.elementInstance);
};