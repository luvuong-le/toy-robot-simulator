const Robot = require('../modules/Robot');
const { Direction } = require('../helpers/directions');

describe('Robot Class Testing', () => {
    it('should create a new robot with default values', () => {
        const robot = new Robot();
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(0);
        expect(robot.direction).toBe(Direction.UP);
        expect(robot.placed).toBeFalsy();
    })
});