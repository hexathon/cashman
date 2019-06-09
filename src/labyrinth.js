var labyrinth = {
    pointDistance: 26,
    lineWidth: 6,
    doorWidth: 2,
    gridOffset: 3,
    canIGoThere:function(x, y){
        var returnObject = null;

        var teleportLeft = [13, -1];
        var teleportRight = [13, 21];

        if (teleportLeft[0] === y && teleportLeft[1] === x) {
            returnObject = {x: teleportRight[1] - 1,y: teleportRight[0]};
        } else if (teleportRight[0] === y && teleportRight[1] === x) {
            returnObject = {x: teleportLeft[1] + 1,y: teleportLeft[0]};
        } else {
            if (this.grid[y][x]) {
                returnObject = {x: x, y: y};
            }
        }

        return returnObject;
    },
    init:function(){
        this.drawGrid();
        this.drawScoreBoard();
        this.placeCookies();
        this.placePowerPallets();
        this.placeGhosts();
        this.placeCashman();

        scoring.init();
    },
    grid: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0],
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0],
        [0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0],
        [0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,0],
        [0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0],
        [1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1],
        [1,1,1,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,1,1,1],
        [0,0,0,0,0,1,0,1,0,1,1,1,0,1,0,1,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0],
        [1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1],
        [1,1,1,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,1,1,1],
        [0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0],
        [0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0],
        [0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0],
        [0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0],
        [0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,0],
        [0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ],
    cookies: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0],
        [0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0],
        [0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0],
        [0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0],
        [0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0],
        [0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0],
        [0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0],
        [0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0],
        [0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,0],
        [0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ],
    powerPallets: [[3,1],[3,19],[20,1],[20,19]],
    drawGrid: function(){
        var container = document.getElementById("maze");
        container.style = "position:absolute;left:0;top:0;";
        container.width = 526;
        container.height = 708;

        var doors = [[11,9],[11,10]];
        var linePatch = this.gridOffset;
        var ctx = container.getContext("2d");
        ctx.lineWidth = this.lineWidth;

        for (var row = 0; row < this.grid.length; row++) {
            for (var column = 0; column < this.grid[row].length; column++) {
                if (!this.grid[row][column]) {
                    var isDoor = false;
                    for (var i = 0; i < doors.length; i++) {
                        if (doors[i][1] === column && doors[i][0] === row) {
                            isDoor = true;

                            break;
                        }
                    }

                    ctx.lineWidth = (isDoor) ? this.doorWidth : this.lineWidth;

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
    drawScoreBoard: function(){
        var container = document.getElementById("scoreboard");
        container.style = "position:absolute;left:560px;top:0;width:200px;";
    },
    placeCookies: function(){
        var container = document.getElementById("cookiejar");
        container.style = "position:absolute;left:0;top:0;";

        for (var row = 0; row < this.cookies.length; row++) {
            for (var column = 0; column < this.cookies[row].length; column++) {
                if (this.cookies[row][column]) {
                    var positionTaken = false;

                    for (var i = 0; i < this.powerPallets.length; i++) {
                        var position = this.powerPallets[i];
                        if (position[0] === row && position[1] === column) {
                            positionTaken = true;

                            break;
                        }
                    }

                    if (!positionTaken) {
                        var cookie = new CashDot({x: column, y: row, container: container});
                        cookie.render();
                    }
                }
            }
        }
    },
    placePowerPallets: function(){
        var container = document.getElementById("cookiejar");
        container.style = "position:absolute;left:0;top:0;";

        for (var i = 0; i < this.powerPallets.length; i++) {
            var position = this.powerPallets[i];
            var cookie = new PowerPallet({x: position[1], y: position[0], container: container});
            cookie.render();
        }
    },
    placeGhosts: function(){
        var container = document.getElementById("killzone");
        container.style = "position:absolute;left:0;top:0;";

        var positions = [
            {column: 9, row: 12, color: "pink"},
            {column: 10, row: 12, color: "blue"},
            {column: 11, row: 12, color: "yellow"},
            {column: 9, row: 13, color: "red"}
        ];

        for (var i = 0; i < positions.length; i++) {
            var ghost = new Ghost({
                x: positions[i].column,
                y: positions[i].row,
                container: container,
                color: positions[i].color
            });
            ghost.render();
        }
    },
    placeCashman: function(){
        var container = document.getElementById("killzone");
        container.style = "position:absolute;left:0;top:0;";

        var position = {column: 10, row: 20};
        var cashman = new CashMan({x: position.column, y: position.row, container: container});
        cashman.render();
    },
    positionToPixel: function(position){
        return (position * this.pointDistance) + this.gridOffset;
    }
};