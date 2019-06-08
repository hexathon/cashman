var labyrinth = {
    pointDistance: 26,
    lineWidth: 6,
    gridOffset: 3,
    canIGoThere:function(x,y){
        return this.paths[y][x];
    },
    init:function(){
        this.drawGrid();
        this.placeCookies();
        var ghostPosition = this.placeGhosts();
        this.placeCashman(ghostPosition);
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

        var linePatch = this.gridOffset;
        var ctx = container.getContext("2d");
        ctx.lineWidth = this.lineWidth;

        for (var row = 0; row < this.grid.length; row++) {
            for (var column = 0; column < this.grid[row].length; column++) {
                if (!this.grid[row][column]) {
                    var x = this.positionToPixel(column);
                    var y = this.positionToPixel(row);

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

        for (var row = 0; row < this.paths.length; row++) {
            for (var column = 0; column < this.paths[row].length; column++) {
                if (this.paths[row][column]) {
                    var cookie = new CashDot({x: column, y: row, container: container});
                    cookie.render();
                }
            }
        }
    },
    placeGhosts: function(){
        var container = document.getElementById("killzone");
        var randomPosition = this.getRandomPosition();
        var x = (randomPosition.column * this.pointDistance) - (31 / 2) + this.gridOffset;
        var y = (randomPosition.row * this.pointDistance) - (28 / 2) + this.gridOffset;

        for (var i = 0; i < 4; i++) {
            var cookie = new PowerPallet({x: randomPosition.column, y: randomPosition.row, container: container});
            cookie.render();
            // var cashman = document.createElement("div");
            // cashman.style = "position:absolute;background:url(cashman-tiny.png) no-repeat;height:28px;width:31px;left:" + x + "px;top:" + y + "px;";
            // container.appendChild(cashman);
        }

        return {x: x, y: y};
    },
    placeCashman: function(ghostPosition){
        var container = document.getElementById("killzone");

        var randomPosition = this.getRandomPosition(ghostPosition);
        var x = (randomPosition.column * this.pointDistance) - (31 / 2) + this.gridOffset;
        var y = (randomPosition.row * this.pointDistance) - (28 / 2) + this.gridOffset;

        var cashman = document.createElement("div");
        cashman.style = "position:absolute;background:url(cashman-tiny.png) no-repeat;height:28px;width:31px;left:" + x + "px;top:" + y + "px;";
        container.appendChild(cashman);
    },
    getRandomPosition: function(blackList){
        var row = Math.floor(Math.random() * this.paths.length);
        var column = Math.floor(Math.random() * this.paths[row].length);

        if (!this.canIGoThere(column, row)) {
            var position = this.getRandomPosition();
            row = position.row;
            column = position.column;
        }

        return {row: row, column: column};
    },
    positionToPixel: function(position){
        return (position * this.pointDistance) + this.gridOffset;
    }
};