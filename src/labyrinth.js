var labyrinth = {
    pointDistance: 26,
    lineWidth: 6,
    gridOffset: 3,
    canIGoThere:function(x,y){
        return this.cookies[y][x];
    },
    init:function(){
        this.drawGrid();
        this.placeCookies();
        this.placePowerPallets();
        this.placeGhosts();
        this.placeCashman();
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

        for (var row = 0; row < this.cookies.length; row++) {
            for (var column = 0; column < this.cookies[row].length; column++) {
                if (this.cookies[row][column]) {
                    var cookie = new CashDot({x: column, y: row, container: container});
                    cookie.render();
                }
            }
        }
    },
    placePowerPallets: function(){

    },
    placeGhosts: function(){
        var container = document.getElementById("killzone");

        var position = {column: 9, row: 12};

        for (var i = 0; i < 4; i++) {
            var nextRow = (i < 3) ? 0 : 1;
            var columnOffset = (i < 3) ? i : i - 3;
            var x = this.positionToPixel(position.column + columnOffset) - (40 / 2);
            var y = this.positionToPixel(position.row + nextRow) - (40 / 2);

            var cashman = document.createElement("div");
            cashman.style = "position:absolute;background:url(ghost-tiny.gif) no-repeat;height:40px;width:40px;left:" + x + "px;top:" + y + "px;";
            container.appendChild(cashman);
        }
    },
    placeCashman: function(){
        var container = document.getElementById("killzone");

        var position = {column: 10, row: 20};
        var cashman = new CashMan({x: position.column, y: position.row, container: container});
        cashman.render();
    },
    positionToPixel: function(position){
        return (position * this.pointDistance) + this.gridOffset;
    }
};