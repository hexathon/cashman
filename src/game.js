var game = {
    level: 1,
    eatables: 192,
    eaten: 0,
    lives: 1,
    colors: {
        wall: "#454073",
        wallInvert: "#eee",
        cashDot: "orange"
    },
    getSpeed: function(){
        return 200 - (this.level * 2);
    },
    init: function(){
        this.registerEventListeners();
        this.drawIntro();

        labyrinth.init();
        scoring.init();

        var customEvent = new CustomEvent("game.init");
        window.dispatchEvent(customEvent);
    },
    registerEventListeners: function () {
        var self = this;

        window.addEventListener('eatable.eaten', (event) => {
            this.eaten++;

            if (this.eaten === this.eatables) {
                let event = new CustomEvent("game.won");
                window.dispatchEvent(event);
            }
        }, true);

        window.addEventListener('ghost.kill', (event) => {
            this.lives--;

            var customEvent = new CustomEvent("game.stop");
            window.dispatchEvent(customEvent);

            customEvent = new CustomEvent("game.killed");
            window.dispatchEvent(customEvent);

            if (this.lives <= 0) {
                customEvent = new CustomEvent("game.over");
                window.dispatchEvent(customEvent);
            } else {
                self.showNextLife();

                setTimeout(function () {
                    let event = new CustomEvent("game.restart");
                    window.dispatchEvent(event);
                }, 2000);
            }
        }, true);

        window.addEventListener('game.killed', (event) => {
            console.log("game.killed");
        }, true);

        window.addEventListener('game.start', (event) => {
            console.log("game.start");

            this.hideNextLife();
        }, true);

        window.addEventListener('game.over', (event) => {
            console.log("game.over");

            this.handleGameOver();
        }, true);

        window.addEventListener('game.won', (event) => {
            console.log("game.won");

            this.handleLevelComplete();
        }, true);

        window.addEventListener('game.stop', (event) => {
            console.log("game.stop");
        }, true);

        window.addEventListener('game.restart', (event) => {
            console.log("game.restart");

            this.start();

            event = new CustomEvent("game.reset");
            window.dispatchEvent(event);
        }, true);

        window.addEventListener('game.init', (event) => {
            console.log("game.init");

            this.start();
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
        container.style = "position:absolute;background:#fff;left:172px;top:200px;border:1px solid #000;padding:30px;";

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
    },
    showGame: function(){
        document.getElementById("intro").style.display = "none";

        labyrinth.showMessage("Get ready", "");

        setTimeout(function () {
            let event = new CustomEvent("game.start");
            window.dispatchEvent(event);
        }, 2000);
    },
    handleGameOver: function(){
        labyrinth.showMessage("Game Over", "Cya next time");

        window.setTimeout(function () {
            let event = new CustomEvent("game.restart");
            window.dispatchEvent(event);
        }, 4000);
    },
    handleLevelComplete: function () {
        this.eaten = 0;
        this.level++;

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