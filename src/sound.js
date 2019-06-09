var soundmanager = {
    sounds:{
        silence : {pause:function(){;},fastSeek:function(){;},loop:false},
        intro : new Audio("sounds/pacman_beginning.wav"),
        chomp : new Audio("sounds/pacman_chomp.wav"),
        deathcashman : new Audio("sounds/pacman_death.wav"),
        deathghost : new Audio("sounds/pacman_eatghost.wav")
    },
    lastplayed:"silence",
    setvolume:function(level){
        for(sound in this.sounds){
            this.sounds[sound].volume=level;
        }
    },
    init:function(){
        this.setvolume(localStorage.getItem('cashman.volume') || 0.1);
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
    },
    gestsoundstate:function(){
        return !localStorage.getItem('cashman.volume')==="0";
    }
}.init();

window.addEventListener('game.start', (event) => {
      soundmanager.start("intro",false);
}, true);
window.addEventListener('cashman.move', (event) => {
      soundmanager.start("chomp",true);
}, true);
window.addEventListener('cashman.stopped', (event) => {
    soundmanager.stop("chomp",true);
}, true);
window.addEventListener('game.killed', (event) => {
    console.log("gamne.killed")
    soundmanager.start("deathcashman",false);
}, true);
window.addEventListener('game.over', (event) => {
    soundmanager.start("deathcashman",false);
}, true);
window.addEventListener('ghost.killed', (event) => {
    soundmanager.start("deathghost",false);
}, true);
window.addEventListener('sound.on', (event) => {
    soundmanager.setvolume(0.1);
    localStorage.setItem('cashman.volume', '0.1');
}, true);
window.addEventListener('sound.off', (event) => {
    soundmanager.setvolume(0);
    localStorage.setItem('cashman.volume', '0');
}, true);


