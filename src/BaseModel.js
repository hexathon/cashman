class BaseModel {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	getPosition() {
		return {x:this.x, y:this.y};
	}

	move(x,y) {
		if (window.labyrinth.canIGoThere(direction.x, direction.y)) {
			this.x = x;
			this.y = y;
			return true;
		}
		return false;
	}

	moveUp() {
		this.move(this.x, (this.y--));
	}

	moveDown() {
		this.move(this.x, (this.y++));
	}

	moveLeft() {
		this.move((this.x--), this.y);
	}

	moveRight() {
		this.move((this.x++), this.y);
	}

}

export default BaseModel;
