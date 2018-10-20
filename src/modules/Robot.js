const { Direction } = require('../constants/directions');

class Robot {
    constructor () {
        this.x = 0;
        this.y = 0;
        this.direction = Direction.NORTH;
        this.placed = false;
    }

    place(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = Direction[direction];
        this.placed = true;
    };

    move() {
        switch (this.direction) {
            case Direction.NORTH:
                this.y++;
                break;
            case Direction.EAST:
                this.x++;
                break;
            case Direction.SOUTH:
                this.y--;
                break;
            case Direction.WEST:
                this.x--;
                break;
        }
    };

    convertDirectionToString() {
        for (const dir in Direction) {
            if (this.direction === Direction[dir]) {
                return dir;
            }
        }
    }

    report() {
        return `${this.x},${this.y},${this.convertDirectionToString()}`
    }
};

module.exports = Robot;