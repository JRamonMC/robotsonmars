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
    mongoose.connection.db.dropDatabase();

}

module.exports = {
    connectDatabase,
    close,
    deleteDatabase
}