var soundmanager = {
    sounds:{
        silence : {pause:function(){;},fastSeek:function(){;},loop:false},
        intro : new Audio("sounds/pacman_beginning.wav"),
        chomp : new Audio("sounds/pacman_chomp.wav")
    },
    lastplayed:"silence",
    init:function(){
        for(sound in this.sounds){
            this.sounds[sound].volume=0.1;
        }
        return this;
    },
    stop: function (soundname,letitfinish) {
        soundname = soundname ||this.lastplayed;
        this.sounds[soundname].loop=false;
        if(!letitfinish)this.sounds[soundname].pause(); 
        this.lastplayed="silence";
    },
    start: function (soundname,shouldloop) {
        if(!(this.lastplayed===soundname && this.sounds[this.lastplayed].loop)){
            this.stop();
            this.sounds[soundname].currentTime=0;
            this.sounds[soundname].loop=shouldloop;
            this.sounds[soundname].play();
            this.lastplayed=soundname;
        }
    }
}.init();

window.addEventListener('cashman.move', (event) => {
      soundmanager.start("chomp",true);
}, true);
window.addEventListener('cashman.stop', (event) => {
    soundmanager.stop("chomp",true);
}, true);
