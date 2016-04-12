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
            var target = null;
            var steps = 50;
            var deltaX = null;
            var deltaY = null;
            var direction = null;
            var moveAnimation = '';
            var stayAnimation = '';
            return function () {
                self.sprite.animations.play(moveAnimation, 8, true);
                if (steps == 50) {
                    target = new Square(point.y, point.x);
                    steps = utils.getSteps(self.square, target);
                    deltaX = (target.getXCoord() - self.square.getXCoord()) / steps;
                    deltaY = (target.getYCoord() - self.square.getYCoord()) / steps;
                    direction = utils.getDirection(deltaY, deltaX);
                    moveAnimation = 'move' + direction;
                    stayAnimation = 'stayArcher' + direction;
                    self.square = target;
                }
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
            var target = null;
            var steps = 70;
            var arrowSteps = 50;
            var deltaX = null;
            var deltaY = null;
            var direction = null;
            var shootAnimation = 'shoot' + direction;
            var stayAnimation = 'stayArcher' + direction;
            var arrow = null;
            return function () {
                self.sprite.animations.play(shootAnimation, 8, false);
                if (steps == 70) {
                    target = new Square(point.y, point.x);
                    deltaX = (target.getXCoord() - self.square.getXCoord()) / arrowSteps;
                    deltaY = (target.getYCoord() - self.square.getYCoord()) / arrowSteps;
                    direction = utils.getDirection(deltaY, deltaX);
                    shootAnimation = 'shoot' + direction;
                    stayAnimation = 'stayArcher' + direction;
                }
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