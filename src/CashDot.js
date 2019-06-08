function CashDot() {
    Eatable.call(this);
    this.type = "CashDot";
}
CashDot.prototype = Object.create(Eatable.prototype);
CashDot.prototype.constructor = CashDot;