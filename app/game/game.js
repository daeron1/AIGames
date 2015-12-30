'use strict';

define([
    'phaser',
    '../helpers/utils',
    './map/map'
], function (Phaser, utils, Map) {

    function Game(barriers, steps) {
        this.barriers = utils.copy(barriers);
        this.steps = [];//utils.copy(steps);
    }

    Game.prototype = {
        constructor: Game,

        start: function() {
            this.game = new Phaser.Game(800, 556, Phaser.AUTO, '#game', {
                preload: this.preload,
                create: this.create,
                update: this.update
            });
        },

        preload: function () {
            this.map = new Map(this.game);
            this.map.loadAssets();
        },

        create: function () {
            this.map.reload();
            this.actions = [];
            var self = this;

            this.steps = [
                {
                    object: 'archer2',
                    action: 'move',
                    target: {y: 4, x: 4}
                }
            ];

            this.steps.forEach(function (step) {
                var action = self.map.units[step.object][step.action](step.target);
                self.actions.push(action);
            });

            this.do = true;
        },

        update: function () {
            var action = this.actions[0];
            if (this.do) {
                this.do = action();
            }
        }
    };

    return Game;
});