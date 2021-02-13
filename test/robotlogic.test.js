const helpers = require('./../utils/helpers')

describe('User Model Test', () => {
    var fakeRobot
    beforeEach(() => {
        fakeRobot = new helpers.Robot(1,1, helpers.orientationEnum.E)
    });

    it('Rotate to left', () => {
        helpers.turnLeft(fakeRobot)
        expect(fakeRobot.orientation).toBe(helpers.orientationEnum.N);
    });

    it('Rotate to right', () => {
        helpers.turnRight(fakeRobot)
        expect(fakeRobot.orientation).toBe(helpers.orientationEnum.S);
    });

    it('Avanti', () => {
        helpers.avanti(fakeRobot, "F")
        expect(fakeRobot.x).toBe(2);
    })

    it('Solve case without recursion', () => {
        const result = helpers.problemaRobot(fakeRobot, "RFRFRFRF")
        expect(result).toBe("1 1 E");
    })

    it('Solve case with recursion', () => {
        const result = helpers.problemaRobotRecursion(fakeRobot, "RFRFRFRF")
        expect(result).toBe("1 1 E");
    })
    

})
