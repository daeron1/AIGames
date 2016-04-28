'use strict';

require([
    'jquery',
    'app/game/params',
    'app/game/game'
], function ($, params, Game) {

    var trees = [

    ];
   /* var steps = [
        {
            object: 'warrior2',
            action: 'move',
            target: {y: 4, x: 5}
        },
        {
            object: 'warrior1',
            action: 'move',
            target: {y: 4, x: 4}
        },
        {
            object: 'warrior1',
            action: 'attack',
            target: {y: 4, x: 5}
        },
        {
            object: 'warrior2',
            action: 'attack',
            target: {y: 4, x: 4}
        },
        {
            object: 'warrior1',
            action: 'attack',
            target: {y: 4, x: 5}
        },
        {
            object: 'warrior2',
            action: 'die'
        },
        {
            object: 'archer2',
            action: 'attack',
            target: {y: 4, x: 4}
        },
        {
            object: 'warrior1',
            action: 'die'
        },
        {
            object: 'archer1',
            action: 'move',
            target: {y: 3, x: 4}
        },
        {
            object: 'archer2',
            action: 'attack',
            target: {y: 3, x: 4}
        },
        {
            object: 'archer1',
            action: 'attack',
            target: {y: 3, x: 10}
        },
        {
            object: 'archer2',
            action: 'move',
            target: {y: 2, x: 9}
        },
        {
            object: 'archer1',
            action: 'move',
            target: {y: 3, x: 6}
        },
        {
            object: 'wizard2',
            action: 'attack',
            target: {y: 3, x: 6}
        },
        {
            object: 'archer1',
            action: 'die'
        }
    ];*/


    $.get('/game/simulate').done(function (steps) {
        params.setBarriers(trees);
        params.setSteps(steps);
        var game = new Game();
        game.start();

    });
/*
    params.setBarriers(trees);
    params.setSteps(steps);
    var game = new Game();
    game.start();
*/
});