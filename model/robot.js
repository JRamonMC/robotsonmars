const mongoose = require('mongoose')

const robotSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    xLimit:{
        type: Number,
        required: true
    },
    yLimit:{
        type: Number,
        required: true
    },
    startPositionX:{
        type: Number,
        required: true
    },
    startPositionY: {
        type: Number,
        required: true
    },
    startOrientation:{
        type: String,
        required: true
    },
    path : {
        type: String,
        required: true
    },
    result : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Robot',robotSchema)

