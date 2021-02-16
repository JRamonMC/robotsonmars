//Imports
const express = require('express')
const database = require('./database/index')
const mongoose = require('mongoose')
const Robot = require('./model/robot')
const robotsRouter = require('./routes/robots')
const app = express();
const morgan = require("morgan");


//environment variables
require('dotenv').config();

//database stuff
const dbConnectionURL = {
    'LOCALURL': `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
};
mongoose.connect(dbConnectionURL.LOCALURL, {useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connection Error:' + dbConnectionURL.LOCALURL));
db.once('open', () => {
     console.log('Mongodb Connection Successful');
});
//database.deleteDatabase()

//configure views
app.set('view engine','ejs');

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));



app.use('/robots',robotsRouter);

//List all robots on Database
app.get('/', async (req,res) => {
    const robots = await Robot.find().sort({ createdAt: 'desc' });
    const losts = robots.filter( e => e.isLost);
    res.render('robots/index', {robots : robots, losts : losts.length});
})

//Set port for new connections
app.listen(process.env.PORT, ()=>{
    console.log(`Server listen on port : ${process.env.PORT}`);
})

module.exports = app;