 function BaseModel(x, y, icon, container){
	this.x = x;
	this.y = y;
	this.icon = icon;
	this.container = container;
	let getPosition= function() {
		return {x:this.x, y:this.y};
	};

	let move = function(x,y) {
		if (window.labyrinth.canIGoThere(x, y)) {
			this.x = x;
			this.y = y;
			return true;
		}
		return false;
	};

	let moveUp = function() {
		move(this.x, (this.y--));
	};

	let moveDown = function() {
		move(this.x, (this.y++));
	};

	let moveLeft = function() {
		move((this.x--), this.y);
	};

	let moveRight = function() {
		move((this.x++), this.y);
	};

	let render = function() {
	};

	return {moveUp:moveUp,moveDown:moveDown, moveLeft:moveLeft, moveRight:moveRight, render:render};

}
