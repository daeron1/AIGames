'use strict';

define([
    'phaser',
    '../helpers/utils',
    './map/map',
    './params'
], function (Phaser, utils, Map, params) {

    function Game() {
    }

    Game.prototype = {
        constructor: Game,

        start: function () {
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
            this.map.reload(params.barriers);
            this.actions = [];
            var self = this;
            params.steps.forEach(function (step) {
                var action = self.map.units[step.object][step.action](step.target);
                self.actions.push(action);
            });

            this.play = true;
            this.currentAction = null;
        },

        update: function () {
            if (this.play && this.currentAction != null) {
                this.play = this.currentAction();
            } else {
                if (this.actions.length != 0) {
                    this.currentAction = this.actions.shift();
                    this.play = true;
                }
            }
        }
    };

    return Game;
});