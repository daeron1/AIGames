'use strict';

define([
    './animations',
    '../map/square',
    '../../helpers/utils'
], function (animations, Square, utils) {

    function Archer (game, square, team) {
        this.game = game;
        this.square = square;
        this.team = team;
        this.sprite = this.game.add.sprite(square.getXCoord(), square.getYCoord(), 'archer');
        for (var key in animations) {
            if (animations.hasOwnProperty(key)) {
                this.sprite.animations.add(key, animations[key]);
            }
        }

        this.sprite.animations.play(team == 1 ? 'castRight' : 'moveLeft', 8, true);
    }

    Archer.prototype = {

        move: function (point) {
            var self = this;
            var target = new Square(point.y, point.x);
            var steps = 300;
            var deltaX = (target.getXCoord() - this.square.getXCoord()) / steps;
            var deltaY = (target.getYCoord() - this.square.getYCoord()) / steps;
            this.sprite.animations.play('moveLeft', 8, true);
            this.square = target;
            return function () {
                steps--;
                if (steps == 0) {
                    self.sprite.animations.play('stayLeft', 8, false);
                    return false;
                }
                self.sprite.x += deltaX;
                self.sprite.y += deltaY;
                return true;
            }
        }

    };

    return Archer;

});