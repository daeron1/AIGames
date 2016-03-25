'use strict';

define([
    './animations',
    '../map/square',
    '../../helpers/utils'
], function (animations, Square, utils) {

    function Archer (game, square, team) {
        this.game = game;
        this.square = square;
        this.sprite = this.game.add.sprite(square.getXCoord(), square.getYCoord(), 'archer' + team);
        for (var key in animations) {
            if (animations.hasOwnProperty(key)) {
                this.sprite.animations.add(key, animations[key]);
            }
        }

        this.sprite.animations.play(team == 1 ? 'stayArcherRight' : 'stayArcherLeft', 8, true);
    }

    Archer.prototype = {

        move: function (point) {
            var self = this;
            var target = new Square(point.y, point.x);
            var steps = utils.getSteps(this.square, target);
            var deltaX = (target.getXCoord() - this.square.getXCoord()) / steps;
            var deltaY = (target.getYCoord() - this.square.getYCoord()) / steps;
            var direction = utils.getDirection(deltaY, deltaX);
            var moveAnimation = 'move' + direction;
            var stayAnimation = 'stayArcher' + direction;
            this.square = target;
            return function () {
                self.sprite.animations.play(moveAnimation, 8, true);
                steps--;
                if (steps == 0) {
                    self.sprite.animations.play(stayAnimation, 8, false);
                    return false;
                }
                self.sprite.x += deltaX;
                self.sprite.y += deltaY;
                return true;
            }
        },

        attack: function (point) {
            var self = this;
            var target = new Square(point.y, point.x);
            var steps = 70;
            var arrowSteps = 50;
            var deltaX = (target.getXCoord() - this.square.getXCoord()) / arrowSteps;
            var deltaY = (target.getYCoord() - this.square.getYCoord()) / arrowSteps;
            var direction = utils.getDirection(deltaY, deltaX);
            var shootAnimation = 'shoot' + direction;
            var stayAnimation = 'stayArcher' + direction;
            var arrow = null;
            return function () {
                self.sprite.animations.play(shootAnimation, 8, false);
                steps--;
                if (steps == 50) {
                    arrow = self.game.add.sprite(self.square.getXCoord(), self.square.getYCoord() + 32, 'arrow' + direction);
                }
                if (steps < 50) {
                    arrow.x += deltaX;
                    arrow.y += deltaY;
                }
                if (steps == 0) {
                    self.sprite.animations.play(stayAnimation, 8, false);
                    arrow.kill();
                    return false;
                }
                return true;
            }
        },

        die: function () {
            var self = this;
            var dieAnimation = 'die';
            return function () {
                self.sprite.animations.play(dieAnimation, 8, false);
            }
        }

    };

    return Archer;

});