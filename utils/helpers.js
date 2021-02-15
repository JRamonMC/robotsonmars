const LOWER_LIMIT_X = 0;
const LOWER_LIMIT_Y = 0;
var UPPER_LIMIT_X = 5;
var UPPER_LIMIT_Y = 3;

const orientationEnum = { N: "N" , W: "W", S:"S", E:"E"};
Object.freeze(orientationEnum);

var deadPositions = [];
var lastPosition;
var lastCharacter;

const setUpperLimitX = (x) => {
    UPPER_LIMIT_X = x;
}

const setUpperLimitY = (y) => {
    UPPER_LIMIT_Y = y;
}

function Robot (x,y,e) {
  this.x = x;
  this.y = y;
  this.orientation = e
}

const isInMart = (robot) => {
    if( robot.x <= UPPER_LIMIT_X && 
        robot.y <= UPPER_LIMIT_Y && 
        robot.x >= LOWER_LIMIT_X && 
        robot.y >= LOWER_LIMIT_Y)
    {
        return true
    }
    else{
        return false
    }
}

const turnLeft = (robot) => {
    if(robot.orientation === orientationEnum.N)
        return robot.orientation = orientationEnum.W;
    else if(robot.orientation === orientationEnum.W)
        return robot.orientation = orientationEnum.S;
    else if(robot.orientation === orientationEnum.S)
        return robot.orientation = orientationEnum.E;
    else(robot.orientation === orientationEnum.E)
        return robot.orientation = orientationEnum.N;
}

const turnRight = (robot) => {
    if(robot.orientation === orientationEnum.N)
        return robot.orientation = orientationEnum.E;
    else if(robot.orientation === orientationEnum.E)
        return robot.orientation = orientationEnum.S;
    else if(robot.orientation === orientationEnum.S)
        return robot.orientation = orientationEnum.W;
    else(robot.orientation === orientationEnum.W)
        return robot.orientation = orientationEnum.N;
}

const avanti = (robot) => {
    switch(robot.orientation) {
        case orientationEnum.N: 
            robot.y++;
            break;
        case orientationEnum.W: 
            robot.x--;
            break;
        case orientationEnum.S:
            robot.y--;
            break;
        case orientationEnum.E:
            robot.x++;
            break;
    }
}

const rotate = (robot, direction) => {
    switch (direction){
        case "L" :
            turnLeft(robot);
            break;
        case "R" :
            turnRight(robot);
            break;
        case "F" : 
            avanti(robot);
            break;
    }
}

const saveDead = (position,direction) => {
    deadPositions.push({position, direction})
}

const robotIsGonnaDie =  (p,direction) => {
    if(deadPositions.filter(e => 
        e.position.x == p.x && 
        e.position.y == p.y &&
        e.position.orientation == p.orientation &&
        e.direction == direction
        ).length > 0){
            return true;
    }else{
        return false;
    }     
}

const problemaRobot = (robot, cadena) => {
    if(cadena.length == 1 && robotIsGonnaDie(robot,cadena)){
        return `${robot.x} ${robot.y} ${robot.orientation}`;
    }
    for(var i=0; i<cadena.length; i++){
        if(robotIsGonnaDie(robot, cadena[i])){
                i++;
        }
        lastPosition = Object.assign({}, robot)
        if(i<cadena.length){
            rotate(robot, cadena[i])
            if(!isInMart(robot)){
                saveDead(lastPosition,cadena[i])
                return `${lastPosition.x} ${lastPosition.y} ${lastPosition.orientation} LOST`;
            }
        }
    }
    return `${robot.x} ${robot.y} ${robot.orientation}`;
}

const problemaRobotRecursion = (robot, cadena) =>  {
    if(!isInMart(robot)){
        saveDead(lastPosition, lastCharacter)
        return `${lastPosition.x} ${lastPosition.y} ${lastPosition.orientation} LOST`;
    }
    else{
        if(cadena.length == 1){
            lastPosition = Object.assign({}, robot)
            rotate(robot, cadena)
            if(isInMart(robot))
                    return `${robot.x} ${robot.y} ${robot.orientation}`;
                else{
                    saveDead(lastPosition, cadena)
                    return `${lastPosition.x} ${lastPosition.y} ${lastPosition.orientation} LOST`;
                }
        }else{
            lastPosition = Object.assign({}, robot)
            if(robotIsGonnaDie(robot, cadena[0])){
                cadena = cadena.substring(1, cadena.length)
            }
            rotate(robot, cadena[0])
            lastCharacter = cadena[0]
            return problemaRobotRecursion(robot, cadena.substring(cadena.length,1))
        } 
    }
}

const setParameters = ( upper_limit_x, upper_limit_y) => {
    setUpperLimitX(upper_limit_x)
    setUpperLimitY(upper_limit_y)
}

const populateDead = (lost) => {
   lost.forEach(element => {
       var splittedString = element.result.split(" ");
       var auxRobot = new Robot(parseInt(splittedString[0]),parseInt(splittedString[1]),splittedString[2]);
       saveDead(Object.assign({}, auxRobot), "F");
    });
}

module.exports = {
  solutionNoRecursive: function (upper_limit_x, upper_limit_y,robot_x, robot_y, robot_o, path,losts) {
        if(losts && losts.length >0){
            populateDead(losts);
        }
        setParameters(upper_limit_x, upper_limit_y);
        var r = new Robot(robot_x, robot_y, robot_o);
        return problemaRobot(r, path);
},

  solutionRecursive: function (upper_limit_x, upper_limit_y,robot_x, robot_y, robot_o, path,losts) {
        if(losts && losts.length >0){
            populateDead(losts);
        }
        setParameters(upper_limit_x, upper_limit_y);
        var r = new Robot(robot_x, robot_y, robot_o);
        return problemaRobotRecursion(r, path);
  },
  orientationEnum,
  turnRight,
  turnLeft,
  Robot,
  avanti,
  problemaRobot,
  problemaRobotRecursion
};

