 function BaseModel(options) {
	 this.x = options.x;
	 this.y = options.y;
	 this.container = options.container;
 }

 BaseModel.prototype.getPosition = function () {
	 return {x: this.x, y: this.y};
 };

 BaseModel.prototype.move = function(x,y) {
	if (window.labyrinth.canIGoThere(x, y)) {
		this.x = x;
		this.y = y;
		return true;
	}
	return false;
 };

 BaseModel.prototype.moveUp = function() {
		this.move(this.x, (this.y--));
 };

 BaseModel.prototype.moveDown = function() {
		this.move(this.x, (this.y++));
 };

 BaseModel.prototype.moveLeft = function() {
		this.move((this.x--), this.y);
 };

 BaseModel.prototype.moveRight = function() {
		this.move((this.x++), this.y);
 };