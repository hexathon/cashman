function CashDot(x, y, container) {
    Eatable.call(this, x, y, container);
    this.type = "CashDot";
}
CashDot.prototype = Object.create(Eatable.prototype);
CashDot.prototype.constructor = CashDot;

/**
 * Render
 */
CashDot.prototype.render = function () {
    this.elementInstance = document.createElement('div');
    this.elementInstance.style = "position:absolute;width:8px;height:8px;background:orange;left:" + this.x + "px;top:" + this.y + "px;";
    this.container.appendChild(this.elementInstance);
};