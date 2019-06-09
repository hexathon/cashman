var soundmanager = {
    sounds:{},
    init:function(){
        this.sounds.intro = new Audio("sounds/pacman_beginning.wav");
        this.sounds.chomp = new Audio("sounds/pacman_chomp.wav");    
        this.sounds.chomp.loop=true;
        return this;
    },
    active: null,
    stop: function (soundname) {
        this.sounds[soundname].stop(); 
    },
    start: function (soundname) {
        this.sounds[soundname].play();
    }
}.init();

/*window.addEventListener('cashman.execute.move', (event) => {
      soundmanager.start("chomp");
    }, true);
    */