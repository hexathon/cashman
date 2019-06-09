var scoring = {
    globalScore: 0,
    init: function(){
        this.drawScoreBoard();
        this.globalScore = 0;

        window.addEventListener('eatable.eaten', (event) => {
            this.updateScore(event.detail.value);
        }, true);

        window.addEventListener('game.reset', (event) => {
            console.log("game.reset");

            this.updateLevel(game.level);
        }, true);

        var container = document.getElementById("scoreboard");
        var button = container.getElementsByClassName("soundToggle").item(0).getElementsByTagName("a").item(0);

        button.addEventListener("click", function (event){
            if (soundmanager.gestsoundstate()) {
                window.dispatchEvent(new CustomEvent("sound.off", {}));
                button.innerText = "OFF";
            } else {
                window.dispatchEvent(new CustomEvent("sound.on", {}));
                button.innerText = "ON";
            }

            event.preventDefault();
        });

        if (soundmanager.gestsoundstate()) {
            button.innerText = "ON";
        } else {
            button.innerText = "OFF";
        }
    },
    updateScore: function(score){
        this.globalScore += score;

        var container = document.getElementById("boardScore");
        container.innerText = this.globalScore;
    },
    updateLevel: function(level){
        var container = document.getElementById("boardLevel");
        container.innerText = level;
    },
    drawScoreBoard: function(){
        var container = document.getElementById("scoreboard");
        container.style = "position:absolute;left:520px;top:0;width:240px;height:630px;";

        var button = container.getElementsByClassName("die").item(0);
        button.addEventListener("click", function(){
            let event = new CustomEvent("game.over");
            window.dispatchEvent(event);
        });

        button = container.getElementsByClassName("win").item(0);
        button.addEventListener("click", function(){
            let event = new CustomEvent("game.won");
            window.dispatchEvent(event);
        });
    },
};