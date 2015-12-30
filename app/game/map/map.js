'use strict';

define([
    '../../helpers/utils',
    './square',
    '../unit/archer'
], function (utils, Square, Archer) {

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

        reload: function () {
            this.game.add.sprite(0, 0, 'terrain');
            this.units = {
                archer1: new Archer(this.game, this.getSquare(3, 1), 1),
                archer2: new Archer(this.game, this.getSquare(3, 10), 2)
            };
        },

        loadAssets: function () {
            this.game.load.image('terrain', 'assets/terrain.png');
            this.game.load.spritesheet('archer', 'assets/archer.png', 64, 64);
        }
    };

    return Map;

});