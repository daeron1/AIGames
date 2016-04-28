'use strict';

require([
    'jquery',
    'app/game/params',
    'app/game/game'
], function ($, params, Game) {

    var trees = [];
/*
    var steps = [{
        "object": "archer2",
        "action": "move",
        "target": {"x": 20, "y": 5}
    }, {"object": "archer2", "action": "move", "target": {"x": 20, "y": 4}}, {
        "object": "archer2",
        "action": "move",
        "target": {"x": 19, "y": 4}
    }, {"object": "archer2", "action": "move", "target": {"x": 18, "y": 4}}, {
        "object": "archer2",
        "action": "move",
        "target": {"x": 18, "y": 3}
    }, {"object": "warrior2", "action": "move", "target": {"x": 19, "y": 6}}, {
        "object": "warrior2",
        "action": "move",
        "target": {"x": 19, "y": 5}
    }, {"object": "warrior2", "action": "move", "target": {"x": 19, "y": 4}}, {
        "object": "wizard2",
        "action": "move",
        "target": {"x": 19, "y": 6}
    }]
    params.setBarriers(trees);
    params.setSteps(steps);
    var game = new Game();
    game.start();
*/

     $.get('/game/simulate').done(function (steps) {
     params.setBarriers(trees);
     params.setSteps(steps);
     var game = new Game();
     game.start();

     });
});