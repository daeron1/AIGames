'use strict';

require([
    'app/game/params',
    'app/game/game'
], function (params, Game) {

    var trees = [
        {y: 1, x: 4},
        {y: 2, x: 3},
        {y: 1, x: 7},
        {y: 2, x: 8},
        {y: 3, x: 5},
        {y: 5, x: 5},
        {y: 3, x: 6},
        {y: 5, x: 6},
        {y: 6, x: 3},
        {y: 7, x: 4},
        {y: 6, x: 8},
        {y: 7, x: 7}

    ];
    var steps = [
        //{
        //    object: 'archer2',
        //    action: 'move',
        //    target: {y: 4, x: 4}
        //},
        //{
        //    object: 'archer2',
        //    action: 'move',
        //    target: {y: 1, x: 4}
        //},
        //{
        //    object: 'archer2',
        //    action: 'attack',
        //    target: {y: 3, x: 1}
        //},
        //{
        //    object: 'archer1',
        //    action: 'attack',
        //    target: {y: 1, x: 4}
        //},
        //{
        //    object: 'wizard1',
        //    action: 'attack',
        //    target: {y: 1, x: 4}
        //},
        //{
        //    object: 'wizard1',
        //    action: 'heal',
        //    target: {y: 3, x: 1}
        //},
        //{
        //    object: 'archer1',
        //    action: 'die'
        //}
    ];

    params.setBarriers(trees);
    params.setSteps(steps);
    var game = new Game();
    game.start();
});