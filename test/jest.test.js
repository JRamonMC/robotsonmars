const Robot = require('./../model/robot')
const mongoose = require('mongoose')
const fakeDataRobot = { title : "testJest",
        xLimit: 6,
        yLimit: 3,
        startPositionX: 2,
        startPositionY: 2,
        startOrientation: "E",
        path: "L",
        result: "NONE",
        isLost: true }

describe('Robot MongoDB Test', () => {
  beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('Create and save robot case succesfully' , async () => {
        const valirRobot = new Robot(fakeDataRobot);
        const savedRobot = await valirRobot.save();

        expect(savedRobot._id).toBeDefined();
        expect(savedRobot.xLimit).toBe(valirRobot.xLimit);
        expect(savedRobot.yLimit).toBe(valirRobot.yLimit);
        expect(savedRobot.startPositionX).toBe(valirRobot.startPositionX)
        expect(savedRobot.startPositionY).toBe(valirRobot.startPositionY)
        expect(savedRobot.startOrientation).toBe(valirRobot.startOrientation)
        expect(savedRobot.path).toBe(valirRobot.path)
        expect(savedRobot.result).toBe(valirRobot.result)
    });

    it('Insert robot successfully, but the field does not defined in schema should be undefined', async () => {
        const robotWithoutRequiredField = new Robot({ title: 'ItsGonnaFail' });
        let err;
        try {
            const savedrobotWithoutRequiredField = await robotWithoutRequiredField.save();
            error = savedrobotWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.path).toBeDefined();
    });
})