function Player(elem) {
    this.dotSize = 200;
    this.dashSize = this.dotSize * 3;
    this.space = this.dotSize * 7;

    this.elem = elem;
}

Player.prototype.play = function(time) {
    this.elem.play();
};

Player.prototype.pause = function(time) {
    this.elem.pause();
};

Player.prototype.reset = function() {
    this.elem.currentTime = 0;
};

Player.prototype.interval = function(action, time) {
    var self = this;

    self[action]();
    setTimeout(function() {
        if (action == 'play') {
            self.pause();
        } else {
            self.play();
        }
    }, time);
};

function Morse(player, field, button, form) {
    this.player = player;
    this.field = field;
    this.button = button;
    this.form = form;
    this.msg = '';
    this.codeList = [];

    this.events();
}

Morse.prototype.fillList = function() {
    this.codeList = [
        
    ];
};

Morse.prototype.events = function() {
    var self = this;
    this.form.onsubmit = function(e) {
        e.preventDefault();
    };

    this.button.onclick = function(e) {
        self.encode().run();
    };
};

Morse.prototype.encode = function() {
    return this;
};

Morse.prototype.run = function() {

};

var player = new Player(document.getElementById('player'));

var morse = new Morse(
    player,
    document.getElementById('field'),
    document.getElementById('button'),
    document.getElementById('form')
);