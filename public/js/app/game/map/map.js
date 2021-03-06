'use strict';

define([
    '../../helpers/utils',
    './square',
    '../unit/warrior',
    '../unit/archer',
    '../unit/wizard',
    '../unit/tree'
], function (utils, Square, Warrior, Archer, Wizard, Tree) {

    function createEmptyBattlefield() {
        var battleField = [];
        utils.range(1, 13).forEach(function (y) {
            battleField[y] = [];
            utils.range(1, 20).forEach(function (x) {
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
                warrior1: new Warrior(this.game, this.getSquare(6, 2), 1),
                archer1: new Archer(this.game, this.getSquare(5, 1), 1),
                wizard1: new Wizard(this.game, this.getSquare(7, 1), 1),
                warrior2: new Warrior(this.game, this.getSquare(6, 19), 2),
                archer2: new Archer(this.game, this.getSquare(5, 20), 2),
                wizard2: new Wizard(this.game, this.getSquare(7, 20), 2)
            };
        },

        loadAssets: function () {
            this.game.load.image('terrain', 'assets/img/map.png');
            this.game.load.image('tree', 'assets/img/tree.png');
            this.game.load.spritesheet('warrior1', 'assets/img/warrior1.png', 64, 64);
            this.game.load.spritesheet('warrior2', 'assets/img/warrior2.png', 64, 64);
            this.game.load.spritesheet('archer1', 'assets/img/archer1.png', 64, 64);
            this.game.load.spritesheet('archer2', 'assets/img/archer2.png', 64, 64);
            this.game.load.spritesheet('wizard1', 'assets/img/wizard1.png', 64, 64);
            this.game.load.spritesheet('wizard2', 'assets/img/wizard2.png', 64, 64);
            this.game.load.spritesheet('fireball', 'assets/img/fireball.png', 64, 64);
            this.game.load.spritesheet('heal', 'assets/img/heal.png', 64, 64);
            this.game.load.image('arrowLeft', 'assets/img/arrow_left.png');
            this.game.load.image('arrowRight', 'assets/img/arrow_right.png');
            this.game.load.image('arrowDown', 'assets/img/arrow_down.png');
            this.game.load.image('arrowUp', 'assets/img/arrow_up.png');
        }
    };

    return Map;

});