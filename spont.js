function font() {
    var alphabetRuSprite = {};
    var letterWidth = 37;
    "абвгдеёжзийклмнопрстуфхцчшщьыъэюя".split("").map(function(letter, index) {
        alphabetRuSprite[letter] = index * letterWidth;
    });

    var fontImage = new Image();
    fontImage.onload = function() {
        var canvas = document.getElementById("myText");
        var context = canvas.getContext("2d");
        var word = "пизда";
        for (var i = 0; i < word.length; i++) {
            var letter = word[i];
            context.drawImage(fontImage, alphabetRuSprite[letter.toLowerCase()], 0, letterWidth, fontImage.height, i * letterWidth, 0, letterWidth, fontImage.height);
        }

    };
    fontImage.src = "font.jpg";
}

var canvas = document.getElementById("myText");
var context = canvas.getContext("2d");

function handleInputChange(inputElement) {

    if (!inputElement.value) {
    context.fillStyle = "rgba(255, 255, 255, 1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    }
    fontSmart(inputElement.value);
}

function fontSmart(text) {
    var alphabetRuSprite = {};
    var letterWidths = [44, 44, 41, 34, 42, 36, 34, 56, 34, 36, 35, 36, 34, 38, 30, 36, 34, 34, 30, 30, 33, 33, 31, 41, 31, 36, 56, 36, 42, 40, 39, 48, 38];
    var spaceWidth = 1280 - letterWidths.reduce(function(a,b) {return a + b});
    letterWidths.push(spaceWidth);
    var letters = "абвгдеёжзийклмнопрстуфхцчшщьыъэюя ".split("");
    var offset = 0;
    for (var i = 0; i < letters.length; i++) {
        var letter = letters[i];
        alphabetRuSprite[letter] = {offset : offset, width : letterWidths[i]};
        offset += letterWidths[i];
    }

    var fontImage = new Image();
    fontImage.onload = function () {
        var cursor = 0;
        for (var i = 0; i < text.length; i++) {
            var letter = alphabetRuSprite[text[i].toLowerCase()];
            context.drawImage(fontImage, letter.offset, 0, letter.width, fontImage.height, cursor, 0, letter.width, fontImage.height);
            cursor += letter.width;
        }

    };
    fontImage.src = "font.jpg";
}