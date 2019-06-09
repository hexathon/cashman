var labyrinth = {
    pointDistance: 24,
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
    init: function(){
        this.registerEventListeners();
        this.drawGrid(game.colors.wall);
        this.placeCookies();
        this.placePowerPallets();
        this.placeGhosts();
        this.placeCashman();
        this.hideMessage();
    },
    registerEventListeners: function () {
        window.addEventListener('game.won', (event) => {
            this.flash();
        }, true);
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
        [1,1,1,1,0,1,0,1,0,0,1,0,0,1,0,1,0,1,1,1,1],
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
    drawGrid: function(color){
        var container = document.getElementById("maze");
        container.style = "position:absolute;left:0;top:0;";
        if (document.body.className.indexOf('dark') > -1) {
            container.style = 'background: #333;'
        }
        container.width = 486;
        container.height = 630;

        var doors = [[11,9],[11,10]];
        var linePatch = this.gridOffset;
        var ctx = container.getContext("2d");
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = color;

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
    showMessage: function(topMessage, bottomMessage){
        var container = document.getElementById("mazemessage");
        container.style = "position:absolute;left:150px;top:226px;text-align:center;width:186px;";

        var topHeader = container.getElementsByTagName("h2").item(0);
        topHeader.innerText = topMessage;

        var bottomHeader = container.getElementsByTagName("h3").item(0);
        bottomHeader.innerText = bottomMessage;

        container.style.display = "block";
    },
    hideMessage: function(){
        this.showMessage("", "");

        var container = document.getElementById("mazemessage");
        container.style.display = "none";
    },
    flash: function(){
        var self = this;
        var current = game.colors.wallInvert;
        var count = 0;

        var myInterval = setInterval(function () {
            current = (current === game.colors.wall) ? game.colors.wallInvert : game.colors.wall;
            self.drawGrid(current);

            if (count >= 2000) {
                clearInterval(myInterval);

                self.drawGrid(game.colors.wall);
            }

            count += 120;
        }, 120);
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
        window.tomssecretcashmanref_donttellrobin = cashman;
    },
    positionToPixel: function(position){
        return (position * this.pointDistance) + this.gridOffset;
    }
};