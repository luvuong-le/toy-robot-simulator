const Robot = require('../modules/Robot');
const { Direction } = require('../constants/directions');

describe('Robot Class Testing', () => {

    let robot = null;

    beforeEach(() => {
        robot = new Robot();
    });

    it('should create a new robot with default values', () => {
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(0);
        expect(robot.direction).toBe(Direction.NORTH);
        expect(robot.placed).toBeFalsy();
    });

    it('should place the robot in the correct position based on x,y and direction', () => {
        robot.place(3,3,'EAST');
        expect(robot.x).toBe(3);
        expect(robot.y).toBe(3);
        expect(robot.direction).toBe(Direction.EAST);
    });

    it('should move the robot forward', () => {
        robot.move();
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(1);
        expect(robot.direction).toBe(Direction.NORTH);
    });

    it('should report the robot position and direction', () => {
        expect(robot.report()).toBe('0,0,NORTH');
    })
});