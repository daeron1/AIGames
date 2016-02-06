'use strict';

require([
    'app/game/params',
    'app/game/game'
], function (params, Game) {

    var barriers = [{y: 2, x: 5}, {y: 3, x: 6}, {y: 2, x: 6}, {y: 4, x: 3}];
    var steps = [
        {
            object: 'archer2',
            action: 'move',
            target: {y: 4, x: 4}
        },
        {
            object: 'archer2',
            action: 'move',
            target: {y: 1, x: 4}
        },
        {
            object: 'archer2',
            action: 'attack',
            target: {y: 3, x: 1}
        },
        {
            object: 'archer1',
            action: 'attack',
            target: {y: 1, x: 4}
        },
        {
            object: 'archer1',
            action: 'die'
        }
    ];

    params.setBarriers(barriers);
    params.setSteps(steps);
    var game = new Game();
    game.start();
});