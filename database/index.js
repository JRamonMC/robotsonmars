const mongoose = require('mongoose');
const DATABASE_URI = 'mongodb://localhost/robot';

const connectDatabase = () => {
    return new Promise((resolve,reject) => {
        mongoose.connect(
            DATABASE_URI,
            {useNewUrlParser: true, useUnifiedTopology: true }
        ).then((res,err) => {
            if(err) return reject(err)
            resolve();
        })
    })
}

const close = () => {
    return mongoose.disconnect();
}

const deleteDatabase = () => {
    mongoose.connection.once("open", function() {
        console.log("*** MongoDB got connected ***");
        console.log(`Our Current Database Name : ${mongoose.connection.db.databaseName}`);
        mongoose.connection.db.dropDatabase(
        console.log(`${mongoose.connection.db.databaseName} database dropped.`)
        );
    });
}

module.exports = {
    connectDatabase,
    close,
    deleteDatabase
}