function chasehimchasehimchasehim(){
    let newdirection = nextStepOnShortestRouteToDestination({
        end: { x: window.tomssecretcashmanref_donttellrobin.position().x, y: window.tomssecretcashmanref_donttellrobin.position().y },
        start: { x: this.x, y: this.y }
    });
    this.move(newdirection);
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
                    drawroutes([route])
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
                    drawroutes([route])
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
                    drawroutes([route])
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
                    drawroutes([route])
                    return "up"
                }
                var newroute = route.slice();
                newroute.push({ x: newx, y: newy });
                newroutes.push(newroute);
                beenthere[newy][newx]=true;
            }
        }
        if (newroutes.length === 0) {
            return null;
        }
        else {
            return makenextstep(newroutes);
        }
    }
    
    if(params.start.x===params.end.x && params.start.y===params.end.y){
        return params.start;   
    }
    else{
        var result = makenextstep([[params.end]]);
        return result===null?params.start:result;    
    }
}


function drawroutes(routes){
    if(window.drawroute){
        var container;
        container = document.getElementById("routingcanvas");
        if(!container){
            container = document.createElement("canvas");
            container.id="routingcanvas";
            document.getElementById("maze").parentNode.insertBefore(container, document.getElementById("maze"));
        }
        container.style = "position:absolute;left:0;top:0;z-index:100";
        container.width = 486;
        container.height = 630;
        var ctx = container.getContext("2d");
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#FF0000";
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

