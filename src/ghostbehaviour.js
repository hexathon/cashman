function nextStepOnShortestRouteToDestination(params) {
    /* 
    call would look like this:
    nextStepOnShortestRouteToDesination({
        end: { x: 1, y: 1 },
        start: { x: 9, y: 9 }
    });


     */
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
                if (newx == endpoint.x && newy == endpoint.y) return { x, y }
                var newroute = route.slice();
                newroute.push({ x: newx, y: newy });
                newroutes.push(newroute);
                beenthere[newy][newx]=true;;
            }
            //go keft
            var newx = x - 1
            var newy = y
            if (newy < grid.length && newx < grid[newy].length && grid[newy][newx] && !beenthere[newy][newx]) {//step right
                if (newx == endpoint.x && newy == endpoint.y) return { x, y }
                var newroute = route.slice();
                newroute.push({ x: newx, y: newy });
                newroutes.push(newroute);
                beenthere[newy][newx]=true;
            }
            //go down
            var newx = x
            var newy = y - 1
            if (newy < grid.length && newx < grid[newy].length && grid[newy][newx] && !beenthere[newy][newx]) {//step right
                if (newx == endpoint.x && newy == endpoint.y) return { x, y }
                var newroute = route.slice();
                newroute.push({ x: newx, y: newy });
                newroutes.push(newroute);
                beenthere[newy][newx]=true;;
            }
            //go up
            var newx = x
            var newy = y + 1
            if (newy < grid.length && newx < grid[newy].length && grid[newy][newx] && !beenthere[newy][newx]) {//step right
                if (newx == endpoint.x && newy == endpoint.y) return {x,y}
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


