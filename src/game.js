var game = {
    resetTimer: null,
    level: 1,
    eatables: 192,
    eaten: 0,
    getSpeed: function(){
        return 200 - (this.level * 10);
    },
    init: function(){
        this.registerEventListeners();
        this.drawIntro();
        this.drawGameOver();

        labyrinth.init();
        scoring.init();

        this.start();
    },
    registerEventListeners: function () {
        window.addEventListener('eatable.eaten', (event) => {
            this.eaten++;

            if (this.eaten === this.eatables) {
                this.handleLevelComplete();
            }
        }, true);
    },
    drawIntro: function(){
        var self = this;
        var container = document.getElementById("intro");
        var button = container.getElementsByTagName("button").item(0);

        button.addEventListener("click", function(){
            self.showGame();
        });
    },
    drawGameOver: function() {
        var container = document.getElementById("gameover");
        container.style = "position:absolute;left:148px;top:238px;width:228px;height:200px;";
    },
    start: function(){
        this.level = 1;
        this.eaten = 0;

        document.getElementById("intro").style.display = "block";
        document.getElementById("scoreboard").style.display = "none";
        document.getElementById("cookiejar").style.display = "none";
        document.getElementById("killzone").style.display = "none";
        document.getElementById("maze").style.display = "none";
        document.getElementById("gameover").style.display = "none";
    },
    showGame: function(){
        document.getElementById("intro").style.display = "none";
        document.getElementById("scoreboard").style.display = "block";
        document.getElementById("cookiejar").style.display = "block";
        document.getElementById("killzone").style.display = "block";
        document.getElementById("maze").style.display = "block";

        let event = new CustomEvent("game.start");
        window.dispatchEvent(event);
    },
    handleGameOver: function(){
        var self = this;

        document.getElementById("gameover").style.display = "block";
        document.getElementById("gameover").getElementsByClassName("counter").item(0).innerHTML = "5";

        window.setTimeout(function () {
            window.clearInterval(self.resetTimer);

            let event = new CustomEvent("game.reset");
            window.dispatchEvent(event);

            self.start();
        }, 5000);

        this.resetTimer = window.setInterval(function () {
            var elmt = document.getElementById("gameover").getElementsByClassName("counter").item(0);
            elmt.innerHTML = parseInt(elmt.innerHTML) - 1;
        }, 1000);
    },
    handleLevelComplete: function () {
        this.eaten = 0;
        this.level++;

        var event = new CustomEvent('game.stop');
        window.dispatchEvent(event);

        setTimeout(function () {
            event = new CustomEvent('game.reset');
            window.dispatchEvent(event);

            event = new CustomEvent("game.start");
            window.dispatchEvent(event);
        }, 1000);
    }
};