'use strict';

define([
    '../../helpers/utils',
    './square',
    '../unit/archer',
    '../unit/tree'
], function (utils, Square, Archer, Tree) {

    function createEmptyBattlefield() {
        var battleField = [];
        utils.range(1, 7).forEach(function (y) {
            battleField[y] = [];
            utils.range(1, 10).forEach(function (x) {
                battleField[y][x] = new Square(y, x);
            });
        });
        return battleField;
    }

    function Map(game) {
        this.game = game;
        this.battleField = createEmptyBattlefield();
    }

    Map.prototype = {
        constructor: Map,

        getSquare: function (y, x) {
            return this.battleField[y][x];
        },

        reload: function (barriers) {
            this.game.add.sprite(0, 0, 'terrain');
            var self = this;
            barriers.forEach(function (barrier) {
                var y = barrier.y;
                var x = barrier.x;
                new Tree(self.game, self.getSquare(y, x));
            });

            this.units = {
                archer1: new Archer(this.game, this.getSquare(3, 1), 1),
                archer2: new Archer(this.game, this.getSquare(3, 10), 2)
            };
        },

        loadAssets: function () {
            this.game.load.image('terrain', 'assets/terrain.png');
            this.game.load.image('tree', 'assets/tree.png');
            this.game.load.spritesheet('archer', 'assets/archer.png', 64, 64);
        }
    };

    return Map;

});