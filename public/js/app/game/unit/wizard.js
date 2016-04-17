'use strict';

define([
    './animations',
    '../map/square',
    '../../helpers/utils'
], function (animations, Square, utils) {

    function Wizard (game, square, team) {
        this.game = game;
        this.square = square;
        this.sprite = this.game.add.sprite(square.getXCoord(), square.getYCoord(), 'wizard' + team);
        for (var key in animations) {
            if (animations.hasOwnProperty(key)) {
                this.sprite.animations.add(key, animations[key]);
            }
        }
        this.fireballAnimations = {
            Left: utils.range(0, 7),
            Up: utils.range(16, 23),
            Right: utils.range(32, 39),
            Down: utils.range(48, 55)
        };
        this.healAnimation = utils.range(0, 24);
        this.sprite.animations.play(team == 1 ? 'stayRight' : 'stayLeft', 8, true);
    }

    Wizard.prototype = {

        move: function (point) {
            var self = this;
            var target = new Square(point.y, point.x);
            var steps = utils.getSteps(this.square, target);
            var deltaX = (target.getXCoord() - this.square.getXCoord()) / steps;
            var deltaY = (target.getYCoord() - this.square.getYCoord()) / steps;
            var direction = utils.getDirection(deltaY, deltaX);
            var moveAnimation = 'move' + direction;
            var stayAnimation = 'stay' + direction;
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
            var steps = 80;
            var fireballSteps = 60;
            var deltaX = (target.getXCoord() - this.square.getXCoord()) / fireballSteps;
            var deltaY = (target.getYCoord() - this.square.getYCoord()) / fireballSteps;
            var direction = utils.getDirection(deltaY, deltaX);
            var castAnimation = 'cast' + direction;
            var stayAnimation = 'stay' + direction;
            var fireball = null;
            return function () {
                self.sprite.animations.play(castAnimation, 8, false);
                steps--;
                if (steps == fireballSteps) {
                    fireball = self.game.add.sprite(self.square.getXCoord(), self.square.getYCoord() + 32, 'fireball');
                    fireball.animations.add(direction, self.fireballAnimations[direction]);
                    fireball.animations.play(direction, 8, false);
                }
                if (steps < fireballSteps) {
                    fireball.x += deltaX;
                    fireball.y += deltaY;
                }
                if (steps == 0) {
                    self.sprite.animations.play(stayAnimation, 8, false);
                    fireball.kill();
                    return false;
                }
                return true;
            }
        },

        heal: function (point) {
            var self = this;
            var target = new Square(point.y, point.x);
            var steps = 40;
            var heal = null;
            return function () {
                if (steps == 40) {
                    heal = self.game.add.sprite(target.getXCoord(), target.getYCoord(), 'heal');
                    heal.animations.add('heal', self.healAnimation);
                    heal.animations.play('heal', 25, false);
                }
                steps--;
                if (steps == 0) {
                    heal.kill();
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

    return Wizard;

});