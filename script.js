function Player(elem, dotSize) {
    this.dotSize = dotSize;
    this.dashSize = this.dotSize * 3;
    this.spaceSize = this.dotSize * 7;
    this.queue = [];
    this.queueCounter = 0;
    this.queueSymbolCounter = 0;

    this.elem = elem;
}

Player.prototype.play = function() {
    this.elem.play();
};

Player.prototype.pause = function() {
    this.elem.pause();
};

Player.prototype.reset = function() {
    this.elem.currentTime = 0;
};

Player.prototype.symbolToTime = function(symbol) {
    symbol = symbol.split('');
    var time = [];

    for (var i = 0; i < symbol.length; i++) {
        if (symbol[i] == '.') {
            time.push(this.dotSize);
        } else if (symbol[i] == '-') {
            time.push(this.dashSize);
        }
    }

    return time;
};

Player.prototype.addSymbolToQueue = function(symbol) {
    if (symbol == ' ') {
        this.queue.push({
            type: 's',
            time: [this.spaceSize]
        });
    } else {
        this.queue.push({
            type: 'l',
            time: this.symbolToTime(symbol)
        });
    }
};

Player.prototype.run = function() {
    if (this.queue[this.queueCounter] == undefined) {
        this.queueCounter = 0;
        this.queue = [];
        return;
    }

    var self = this;

    var type = this.queue[this.queueCounter].type;
    var time = this.queue[this.queueCounter].time;
    var currentTime = 0;

    if (type == 's') {
        this.pause();
        this.queueCounter++;
        currentTime = time[0];
    } else if (type == 'l') {
        if (time[this.queueSymbolCounter] == undefined) {
            this.queueCounter++;

            this.queueSymbolCounter = 0;
            setTimeout(function() {
                self.run();
            }, this.dashSize);

            return;
        }

        currentTime = time[this.queueSymbolCounter++];
        console.log(currentTime);
        this.play();
    }

    setTimeout(function() {
        if (type == 's') {
            self.run();
        } else if (type == 'l') {
            self.pause();
            setTimeout(function() {
                self.run();
            }, self.dotSize);
        }

        self.reset();
    }, currentTime);
};

function Morse(player, field, button, form) {
    this.player = player;
    this.field = field;
    this.button = button;
    this.form = form;
    this.msg = '';
    this.codeList = [
        {'.': '......'},
        {1: '.----'},
        {2: '..---'},
        {3: '...--'},
        {4: '....-'},
        {5: '....'},
        {6: '-....'},
        {7: '--...'},
        {8: '---..'},
        {9: '----.'},
        {0: '-----'},
        {',': '.-.-.-'},
        {';': '-.-.-'},
        {':': '---...'},
        {'?': '..--..'},
        {'№': '-..-.'},
        {'"': '.-..-.'},
        {"'": '.----.'},
        {'(': '-.--.-'},
        {')': '-.--.-'},
        {'!': '--..--'},
        {'а': '.-'},
        {'б': '-...'},
        {'в': '.--'},
        {'г': '--.'},
        {'д': '-..'},
        {'е': '.'},
        {'ж': '...-'},
        {'з': '--..'},
        {'и': '..'},
        {'й': '.---'},
        {'к': '-.-'},
        {'л': '.-..'},
        {'м': '--'},
        {'н': '-.'},
        {'о': '---'},
        {'п': '.--.'},
        {'р': '.-.'},
        {'с': '...'},
        {'т': '-'},
        {'у': '..-'},
        {'ф': '..-.'},
        {'х': '....'},
        {'ц': '-.-.'},
        {'ч': '---.'},
        {'ш': '----'},
        {'щ': '--.-'},
        {'ы': ''},
        {'ь': '-.--'},
        {'э': '..-..'},
        {'ю': '..--'},
        {'я': '.-.-'}
    ];

    this.events();
}

Morse.prototype.fillList = function() {

};

Morse.prototype.events = function() {
    var self = this;
    this.form.onsubmit = function(e) {
        e.preventDefault();
    };

    this.button.onclick = function(e) {
        self.run();
    };
};

Morse.prototype.run = function() {
    this.msg = this.field.value;
    if (this.msg.length === 0) {
        alert('Введите сообщение!');
        return this;
    }

    this.msg = this.msg.toLowerCase();

    var currentChar = '';
    var encodedChar = '';
    for (var msgCounter = 0; msgCounter < this.msg.length; msgCounter++) {
        currentChar = this.msg.charAt(msgCounter);

        for (var i = 0; i < this.codeList.length; i++) {
            if (currentChar == ' ') {
                encodedChar = currentChar;
                break;
            }

            for (var key in this.codeList[i]) {
                if (currentChar == key) {
                    encodedChar = key.replace(key, this.codeList[i][key]);
                    break;
                }
            }
        }

        this.player.addSymbolToQueue(encodedChar);
    }

    this.player.run();

    return this;
};

var player = new Player(document.getElementById('player'), 130);

new Morse(
    player,
    document.getElementById('field'),
    document.getElementById('button'),
    document.getElementById('form')
);