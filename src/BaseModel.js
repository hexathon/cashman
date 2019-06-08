 function BaseModel(options) {
	 this.x = options.x;
	 this.y = options.y;
	 this.container = options.container;
 }

 BaseModel.prototype.move = function(x,y) {
	if (window.labyrinth.canIGoThere(x, y)) {
		this.x = x;
		this.y = y;
		return true;
	}
	return false;
 };

 BaseModel.prototype.moveUp = function() {
 	return this.move(this.x, (this.y--));
 };

 BaseModel.prototype.moveDown = function() {
 	return this.move(this.x, (this.y++));
 };

 BaseModel.prototype.moveLeft = function() {
 	return this.move((this.x--), this.y);
 };

 BaseModel.prototype.moveRight = function() {
 	return this.move((this.x++), this.y);
 };