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
                warrior1: new Warrior(this.game, this.getSquare(4, 2), 1),
                archer1: new Archer(this.game, this.getSquare(3, 1), 1),
                wizard1: new Wizard(this.game, this.getSquare(5, 1), 1),
                warrior2: new Warrior(this.game, this.getSquare(4, 9), 2),
                archer2: new Archer(this.game, this.getSquare(3, 10), 2),
                wizard2: new Wizard(this.game, this.getSquare(5, 10), 2)
            };
        },

        loadAssets: function () {
            this.game.load.image('terrain', 'assets/terrain.png');
            this.game.load.image('tree', 'assets/tree.png');
            this.game.load.spritesheet('warrior1', 'assets/warrior1.png', 64, 64);
            this.game.load.spritesheet('warrior2', 'assets/warrior2.png', 64, 64);
            this.game.load.spritesheet('archer1', 'assets/archer1.png', 64, 64);
            this.game.load.spritesheet('archer2', 'assets/archer2.png', 64, 64);
            this.game.load.spritesheet('wizard1', 'assets/wizard1.png', 64, 64);
            this.game.load.spritesheet('wizard2', 'assets/wizard2.png', 64, 64);
            this.game.load.spritesheet('fireball', 'assets/fireball.png', 64, 64);
            this.game.load.spritesheet('heal', 'assets/heal.png', 64, 64);
            this.game.load.image('arrowLeft', 'assets/arrow_left.png');
            this.game.load.image('arrowRight', 'assets/arrow_right.png');
            this.game.load.image('arrowDown', 'assets/arrow_down.png');
            this.game.load.image('arrowUp', 'assets/arrow_up.png');
        }
    };

    return Map;

});