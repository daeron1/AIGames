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
            this.game = new Phaser.Game(1280, 832, Phaser.AUTO, '#game', {
                preload: this.preload,
                create: this.create,
                update: this.update
            });
        },

        preload: function () {
            //  This sets a limit on the up-scale
            this.game.scale.maxWidth = 960;
            this.game.scale.maxHeight = 624;

            //  Then we tell Phaser that we want it to scale up to whatever the browser can handle, but to do it proportionally
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.updateLayout();
            this.map = new Map(this.game);
            this.map.loadAssets();
        },

        create: function () {
            this.map.reload(params.barriers);
            this.actions = [];
            var self = this;
            params.steps.forEach(function (step) {
                var action = self.map.units[step.object][step.action](step.target, step.last);
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