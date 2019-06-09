var game = {
    level: 1,
    eatables: 192,
    eaten: 0,
    lives: 1,
    getSpeed: function(){
        return 200 - (this.level * 2);
    },
    init: function(){
        this.registerEventListeners();
        this.drawIntro();

        labyrinth.init();
        scoring.init();

        this.start();
    },
    registerEventListeners: function () {
        window.addEventListener('eatable.eaten', (event) => {
            this.eaten++;

            if (this.eaten === this.eatables) {
                let event = new CustomEvent("game.won");
                window.dispatchEvent(event);
            }
        }, true);

        window.addEventListener('ghost.kill', (event) => {
            this.lives--;

            if (this.lives > 0) {
                let event = new CustomEvent("game.killed");
                window.dispatchEvent(event);
            } else {
                let event = new CustomEvent("game.over");
                window.dispatchEvent(event);
            }
        }, true);

        window.addEventListener('game.killed', (event) => {
            this.showNextLife();

            setTimeout(function () {
                let event = new CustomEvent("game.start");
                window.dispatchEvent(event);
            }, 2000);
        }, true);

        window.addEventListener('game.start', (event) => {
            this.hideNextLife();
        }, true);

        window.addEventListener('game.over', (event) => {
            this.handleGameOver();
        }, true);

        window.addEventListener('game.won', (event) => {
            this.handleLevelComplete();
        }, true);

        window.addEventListener('game.restart', (event) => {
            this.start();

            event = new CustomEvent("game.reset");
            window.dispatchEvent(event);
        }, true);
    },
    showNextLife: function(){
        labyrinth.showMessage("Get ready", "Keep in munching");
    },
    hideNextLife: function(){
        labyrinth.hideMessage();
    },
    drawIntro: function(){
        var self = this;
        var container = document.getElementById("intro");
        var button = container.getElementsByTagName("a").item(0);

        button.addEventListener("click", function (event){
            self.showGame();
            event.preventDefault();
        });
    },
    start: function(){
        this.level = 1;
        this.eaten = 0;

        document.getElementById("intro").style.display = "block";
        document.getElementById("scoreboard").style.display = "none";
        document.getElementById("cookiejar").style.display = "none";
        document.getElementById("killzone").style.display = "none";
        document.getElementById("maze").style.display = "none";
        document.getElementById("mazemessage").style.display = "none";
    },
    showGame: function(){
        document.getElementById("intro").style.display = "none";
        document.getElementById("scoreboard").style.display = "block";
        document.getElementById("cookiejar").style.display = "block";
        document.getElementById("killzone").style.display = "block";
        document.getElementById("maze").style.display = "block";

        labyrinth.showMessage("Get ready", "");

        setTimeout(function () {
            let event = new CustomEvent("game.start");
            window.dispatchEvent(event);
        }, 2000);
    },
    handleGameOver: function(){
        labyrinth.showMessage("Game Over", "Cya next time");

        let event = new CustomEvent("game.stop");
        window.dispatchEvent(event);

        window.setTimeout(function () {
            let event = new CustomEvent("game.restart");
            window.dispatchEvent(event);
        }, 4000);
    },
    handleLevelComplete: function () {
        this.eaten = 0;
        this.level++;

        var event = new CustomEvent('game.stop');
        window.dispatchEvent(event);

        setTimeout(function () {
            event = new CustomEvent('game.reset');
            window.dispatchEvent(event);
        }, 500);

        setTimeout(function () {
            event = new CustomEvent("game.start");
            window.dispatchEvent(event);
        }, 5000);

        labyrinth.showMessage("Good job!", "Get ready...");
    }
};