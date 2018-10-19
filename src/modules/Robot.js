const { Direction } = require('../helpers/directions');

class Robot {
    constructor () {
        this.x = 0;
        this.y = 0;
        this.direction = Direction.UP;
        this.placed = false;
    }
}

module.exports = Robot;