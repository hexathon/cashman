function Direction (x, y) {
	this.x = x;
	this.y = y;
}

class BaseModel {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	move(direction) {
		if (window.labyrinth.canIGoThere(direction.x, direction.y)) {
	  	this.x = direction.x;
	  	this.y = direction.y;
		}
	}

	moveUp() {
		let direction = new Direction(this.x, (this.y--));
		this.move(direction);
	}

	moveDown() {
		let direction = new Direction(this.x, (this.y++));``
		this.move(direction);
	}

	moveLeft() {
		let direction = new Direction((this.x--), this.y);
		this.move(direction);
	}

	moveRight() {
		let direction = new Direction((this.x++), this.y);
		this.move(direction);
	}

}

export default BaseModel;
