const express = require('express')

const database = require('./database/index')
const Robot = require('./model/robot')
const robotsRouter = require('./routes/robots')
const app = express()

database.connectDatabase().then(() => console.log("Connected")).catch((err)=> console.log(err))

//database.deleteDatabase()

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

app.get('/', async (req,res) => {
    const robots = await Robot.find().sort({ createdAt: 'desc' })
    const losts = robots.filter( e => e.isLost)
    res.render('robots/index', {robots : robots, losts : losts.length})
})


app.use('/robots',robotsRouter)

app.listen(5000)

module.exports = app