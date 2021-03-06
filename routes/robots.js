const express = require('express')
const router = express.Router({ mergeParams: true })
const helpers = require('./../utils/helpers');
const Robot = require('../model/robot');
//const microprofiler = require('microprofiler');


router.get('/exampleNoRecursive', (req, res) => {
    //var start = microprofiler.start();
    const result = helpers.solutionNoRecursive(5,3,1,1,"E","RFRFRFRF")
    const result2 = helpers.solutionNoRecursive(5,3,3,2,"N","FRRFLLFFRRFLL")
    const result3 = helpers.solutionNoRecursive(5,3,0,3,"W","LLFFFLFLFL")
    //var time = microprofiler.measureFrom(start);
    res.send({first: result,
              second: result2, 
              third: result3,
              //time : time   
    })
})

router.get('/exampleRecursive', (req, res) => {
   // var startRecursive = microprofiler.start();
    const result4 = helpers.solutionRecursive(5,3,1,1,"E","RFRFRFRF")
    const result5 = helpers.solutionRecursive(5,3,3,2,"N","FRRFLLFFRRFLL")
    const result6 = helpers.solutionRecursive(5,3,0,3,"W","LLFFFLFLFL")
   // var time = microprofiler.measureFrom(startRecursive);

    res.send({first: result4,
              second: result5, 
              third: result6,
            //  time: time    
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
    const robots = await Robot.find().sort({ createdAt: 'desc' })
    const allLosts = robots.filter( e => e.isLost)
    const sameMatrixLost = allLosts.filter(e => e.xLimit == req.body.xlimit && e.yLimit == req.body.ylimit)
    const auxResult = helpers.solutionNoRecursive(req.body.xlimit,req.body.ylimit,req.body.xrobot,req.body.yrobot,req.body.orobot,req.body.robotpath, sameMatrixLost)
    let robot = new Robot({
        title : req.body.title,
        xLimit: req.body.xlimit,
        yLimit: req.body.ylimit,
        startPositionX: req.body.xrobot,
        startPositionY: req.body.yrobot,
        startOrientation: req.body.orobot,
        path: req.body.robotpath,
        result: auxResult,
        isLost: auxResult.includes("LOST")
    })
    try {
        robot = await robot.save();
        res.redirect(`/robots/${robot.id}`)
    } catch (error) {
        console.log("Error: ", error)
        res.render('robots/new', {robot:robot});
    }
})

module.exports = router;
