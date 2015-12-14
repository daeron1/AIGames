'use strict';

require([
    'app/game'
], function (Game) {
    var game = new Game();
    game.start();
});