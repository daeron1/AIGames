'use strict';

define([
    'phaser',
    'app/helpers/utils'
], function (Phaser, utils) {

    function Game() {
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
            this.game.load.image('terrain', 'assets/terrain.png');
            this.game.load.spritesheet('archer', 'assets/archer.png', 64, 64);
        },

        create: function () {
            this.game.add.sprite(0, 0, 'terrain');
            this.archer = this.game.add.sprite(100, 100, 'archer');
            this.archer.animations.add('shoot', utils.range(221, 233));
            this.archer.animations.play('shoot', 10, true);
        },

        update: function () {

        }
    };

    return Game;
});