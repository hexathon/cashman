var labyrinth = {
    pointDistance: 26,
    lineWidth: 6,
    getGhostInitialPosition:function(){
        return {x:10,y:10};
    },
    getCashmanInitialPosition:function(){
        return {x:10,y:10};
    },
    canIGoThere:function(x,y){
        return this.paths[y][x];
    },
    init:function(){
        this.drawGrid();
        this.placeCookies();
        this.placeGhosts();
        this.placeCashman();
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
    paths: [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,0,0,1,0],
        [0,1,0,0,0,1,0,0,0,1,0],
        [0,1,0,0,0,1,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,0,0,1,0],
        [0,1,0,0,0,1,0,0,0,1,0],
        [0,1,0,0,0,1,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
    drawGrid: function(){
        var container = document.getElementById("maze");
        container.style = "position:absolute;left:0;top:0;";
        container.width = 266;
        container.height = 266;

        var gridOffset = (this.lineWidth / 2);
        var linePatch = gridOffset;
        var ctx = container.getContext("2d");
        ctx.lineWidth = this.lineWidth;

        for (var row = 0; row < this.grid.length; row++) {
            for (var column = 0; column < this.grid[row].length; column++) {
                if (!this.grid[row][column]) {
                    var x = (column * this.pointDistance) + gridOffset;
                    var y = row * this.pointDistance + gridOffset;

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
    },
    placeCookies: function(){
        var container = document.getElementById("cookiejar");
        container.style = "position:absolute;left:0;top:0;";

        var gridOffset = (this.lineWidth / 2);

        for (var row = 0; row < this.paths.length; row++) {
            for (var column = 0; column < this.paths[row].length; column++) {
                if (this.paths[row][column]) {
                    var cookieOffset = 8 / 2;
                    var x = (column * this.pointDistance) + gridOffset - cookieOffset;
                    var y = row * this.pointDistance + gridOffset - cookieOffset;

                    // new CashDot({x: x, y: y, container: container});
                    var cookie = document.createElement("div");
                    cookie.style = "position:absolute;width:8px;height:8px;background:orange;left:" + x + "px;top:" + y + "px;";
                    container.appendChild(cookie);
                }
            }
        }
    },
    placeGhosts: function(){

    },
    placeCashman: function(){

    }
};