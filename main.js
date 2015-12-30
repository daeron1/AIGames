'use strict';

require([
    'app/game/game'
], function (Game) {
    var game = new Game(
        [{y: 2, x: 5}, {y: 3, x: 6}, {y: 2, x: 6}],
        [
            {
                object: 'archer1',
                action: 'move',
                target: {y: 4, x: 4}
            }
        ]
    );
    game.start();
});