var scoring = {
    globalScore: 0,
    init: function(){
        this.drawScoreBoard();
        this.globalScore = 0;

        window.addEventListener('eatable.eaten', (event) => {
            this.updateScore(event.detail.value);
        }, true);

        window.addEventListener('game.reset', (event) => {
            this.updateLevel(game.level);
        }, true);

        window.addEventListener('game.restart', (event) => {
            this.globalScore = 0;
            this.updateScore(this.globalScore);
        }, true);
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
        container.style = "position:absolute;left:560px;top:0;width:200px;";

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