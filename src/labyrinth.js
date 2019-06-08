var labyrinth = {
    pointDistance: 26,
    lineWidth: 5,
    getGhostInitialPosition:function(){
        return {x:10,y:10};
    },
    getCashmanInitialPosition:function(){
        return {x:10,y:10};
    },
    canIGoThere:function(x,y){
        return this.grid[y][x];
    },
    grid: [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,0,0,1,0],
        [0,1,0,1,0,1,0,1,0,1,0],
        [0,1,0,0,0,1,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,0,0,1,0],
        [0,1,0,1,0,1,0,1,0,1,0],
        [0,1,0,0,0,1,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    drawGrid: function(){
        var offset = (this.lineWidth / 2);
        var linePatch = offset;
        var c = document.getElementById("labyrinthcanvas");
        var ctx = c.getContext("2d");
        ctx.lineWidth = this.lineWidth;

        for (var row = 0; row < this.grid.length; row++) {
            for (var column = 0; column < this.grid[row].length; column++) {
                if (!this.grid[row][column]) {
                    var x = (column * this.pointDistance) + offset;
                    var y = row * this.pointDistance + offset;

                    if (column + 1 < this.grid[row].length && !this.grid[row][column + 1]) {
                        ctx.beginPath();
                        ctx.moveTo(x - linePatch, y);
                        ctx.lineTo(x + this.pointDistance + linePatch, y);
                        ctx.stroke();
                    }

                    if (row + 1 < this.grid.length && !this.grid[row + 1][column]) {
                        ctx.beginPath();
                        ctx.moveTo(x, y - linePatch);
                        ctx.lineTo(x, y + this.pointDistance + linePatch);
                        ctx.stroke();
                    }
                }
            }
        }


    }
};