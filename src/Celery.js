function Celery(x, y, container) {
    Eatable.call(this, x, y, container);
    this.type = "Celery";
    this.value = 100;
}
Celery.prototype = Object.create(Eatable.prototype);
Celery.prototype.constructor = Celery;

/**
 * Render
 */
Celery.prototype.render = function () {
    this.elementInstance = document.createElement('div');
    this.elementInstance.style = "position:absolute;width:8px;height:8px;background:orange;left:" + this.x + "px;top:" + this.y + "px;";
    this.container.appendChild(this.elementInstance);
};