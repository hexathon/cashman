var scoring = {
    globalScore: 0,
    init: function(){
        window.addEventListener('eatable.eaten', (event) => {
            this.updateScore(event.detail.value);
        }, true);
    },
    updateScore: function(score){
        this.globalScore += score;

        var container = document.getElementById("boardScore");
        container.innerText = this.globalScore;
    }
};