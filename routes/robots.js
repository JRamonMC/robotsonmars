const express = require('express')
const router = express.Router({ mergeParams: true })
const helpers = require('./../utils/helpers');
const Robot = require('./../model/robot')

router.get('/exampleNoRecursive', (req, res) => {
    const result = helpers.solutionNoRecursive(5,3,1,1,"E","RFRFRFRF")
    const result2 = helpers.solutionNoRecursive(5,3,3,2,"N","FRRFLLFFRRFLL")
    const result3 = helpers.solutionNoRecursive(5,3,0,3,"W","LLFFFLFLFL")
    res.send({first: result,
              second: result2, 
              third: result3    
    })
})

router.get('/exampleRecursive', (req, res) => {
    const result4 = helpers.solutionRecursive(5,3,1,1,"E","RFRFRFRF")
    const result5 = helpers.solutionRecursive(5,3,3,2,"N","FRRFLLFFRRFLL")
    const result6 = helpers.solutionRecursive(5,3,0,3,"W","LLFFFLFLFL")
    res.send({first: result4,
              second: result5, 
              third: result6    
    })
})

router.get('/new', (req,res) =>{
    res.render('robots/newrobot', {robot : new Robot()})
})

router.get('/:id', async (req, res) => {
    const robot = await Robot.findById(req.params.id)
    if(robot != null )
        res.render('robots/detail', {robot:robot})
    else
        res.redirect('/')
})

router.post('/new', async (req,res) => {
    const auxResult = helpers.solutionNoRecursive(req.body.xlimit,req.body.ylimit,req.body.xrobot,req.body.yrobot,req.body.orobot,req.body.robotpath)
    let robot = new Robot({
        title : req.body.title,
        xLimit: req.body.xlimit,
        yLimit: req.body.ylimit,
        startPositionX: req.body.xrobot,
        startPositionY: req.body.yrobot,
        startOrientation: req.body.orobot,
        path: req.body.robotpath,
        result: auxResult
    })
    try {
        robot = await robot.save();
        res.redirect(`/robots/${robot.id}`)
    } catch (error) {
        console.log("Motivo", error)
        res.render('robots/new', {robot:robot})
    }
})

module.exports = router
