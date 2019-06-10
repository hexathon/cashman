function chasehimchasehimchasehim(){
    let newdirection = nextStepOnShortestRouteToDestination({
        end: { x: window.tomssecretcashmanref_donttellrobin.position().x, y: window.tomssecretcashmanref_donttellrobin.position().y },
        start: { x: this.x, y: this.y },
        color: this.color
    });
    if(this.eatable){
        let possibleMoves = this.getPossibleTurns(this.eatable);
        newdirection=flipdirection(newdirection);
        if(possibleMoves.findIndex(function(value){return value==newdirection})===-1){
            newdirection = possibleMoves[0]===this.facing?possibleMoves[possibleMoves.length-1]:possibleMoves[0]
        }
        return newdirection
    }
    else{
        let possibleMoves = this.getPossibleTurns(false);
        let dorandom = Math.floor(Math.random()*10)>this.stupidity
        return dorandom?possibleMoves[Math.floor(Math.random()*possibleMoves.length)]:newdirection;
    }
}


function nextStepOnShortestRouteToDestination(params) {
    var grid = labyrinth.grid;

    var beenthere = [];
    var endpoint = params.start
    for (var i = 0; i < grid.length; i++) {
        var temp = [];
        for (var j = 0; j < grid[i].length; j++) {
            temp.push(false)
        }
        beenthere.push(temp)
    }

    function makenextstep(routes) {
        var newroutes = [];
        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];
            var x = route[route.length - 1].x;
            var y = route[route.length - 1].y;
            //go right
            var newx = x + 1;
            var newy = y;
            if (newy < grid.length && newx < grid[newy].length && grid[newy][newx] && !beenthere[newy][newx]) {//step right
                if (newx == endpoint.x && newy == endpoint.y) {
                    drawroutes([route],params.color)
                    return "left"
                }
                var newroute = route.slice();
                newroute.push({ x: newx, y: newy });
                newroutes.push(newroute);
                beenthere[newy][newx]=true;;
            }
            //go keft
            var newx = x - 1
            var newy = y
            if (newy < grid.length && newx < grid[newy].length && grid[newy][newx] && !beenthere[newy][newx]) {//step right
                if (newx == endpoint.x && newy == endpoint.y) {
                    drawroutes([route], params.color)
                    return "right"
                }
                var newroute = route.slice();
                newroute.push({ x: newx, y: newy });
                newroutes.push(newroute);
                beenthere[newy][newx]=true;
            }
            //go down
            var newx = x
            var newy = y - 1
            if (newy < grid.length && newx < grid[newy].length && grid[newy][newx] && !beenthere[newy][newx]) {//step right
                if (newx == endpoint.x && newy == endpoint.y) {
                    drawroutes([route], params.color)
                    return "down"
                }
                var newroute = route.slice();
                newroute.push({ x: newx, y: newy });
                newroutes.push(newroute);
                beenthere[newy][newx]=true;;
            }
            //go up
            var newx = x
            var newy = y + 1
            if (newy < grid.length && newx < grid[newy].length && grid[newy][newx] && !beenthere[newy][newx]) {//step right
                if (newx == endpoint.x && newy == endpoint.y) {
                    drawroutes([route], params.color)
                    return "up"
                }
                var newroute = route.slice();
                newroute.push({ x: newx, y: newy });
                newroutes.push(newroute);
                beenthere[newy][newx]=true;
            }
        }
        if (newroutes.length === 0) {
            return "right";
        }
        else {
            return makenextstep(newroutes);
        }
    }
    
    if(params.start.x===params.end.x && params.start.y===params.end.y){
        return "right";   
    }
    else{
        var result = makenextstep([[params.end]]);
        return result===null?params.start:result;    
    }
}

function clearroutes(){
    for(var i=0;i<arrroutecanvases.length;i++){
        var canvas = arrroutecanvases[i];
        canvas.parentNode.removeChild(canvas);
    }
    arrroutecanvases=[];

}
var arrroutecanvases = []
function drawroutes(routes,color){
    if(document.location.search.indexOf("drawroute=true")>-1){
        var container;
        container = document.getElementById("routingcanvas"+color);
        if(!container){
            container = document.createElement("canvas");
            container.id="routingcanvas"+color;
            document.getElementById("maze").parentNode.insertBefore(container, document.getElementById("maze"));
            arrroutecanvases.push(container);
        }
        container.style = "position:absolute;left:0;top:0;z-index:100";
        container.width = 486;
        container.height = 630;
        var ctx = container.getContext("2d");
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        var pointDistance=24;
        var offsetx = 3;
        var offsety = 3;
        for(var i=0;i<routes.length;i++){
            var route = routes[i];
            for(var j=0;j<route.length-1;j++){
                var start = route[j];
                var end = route[j+1];
                ctx.beginPath();
                ctx.moveTo(start.x*pointDistance+offsetx, start.y*pointDistance+offsety);
                ctx.lineTo(end.x*pointDistance+offsetx, end.y*pointDistance+offsety);
                ctx.stroke();
            }
        }
    }
}

function flipdirection(direction){
    switch(direction){
        case "left":
            direction= "right";
        break;
        case "right":
            direction= "left";
        break;
        case "up":
            direction= "down";
        break;
        case "down":
            direction= "up";
        break;
       
    }
     return direction;
}
