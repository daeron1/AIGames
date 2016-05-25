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

        move: function (point, last) {
            var self = this;
            var target = null;
            var steps = null;
            var init = true;
            var deltaX = null;
            var deltaY = null;
            var direction = null;
            var moveAnimation = '';
            var stayAnimation = '';
            return function () {
                if (init) {
                    init = false;
                    target = new Square(point.y, point.x);
                    steps = 30;
                    deltaX = (target.getXCoord() - self.square.getXCoord()) / steps;
                    deltaY = (target.getYCoord() - self.square.getYCoord()) / steps;
                    direction = utils.getDirection(deltaY, deltaX);
                    moveAnimation = 'move' + direction;
                    stayAnimation = 'stay' + direction;
                    self.square = target;
                    self.sprite.animations.play(moveAnimation, 8, true);
                }
                steps--;
                if (steps == 0) {
                    if (last) {
                        self.sprite.animations.play(stayAnimation, 8, false);
                    }
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
            var steps = null;
            var fireballSteps = null;
            var init = true;
            var deltaX = null;
            var deltaY = null;
            var direction = null;
            var shootAnimation = 'cast' + direction;
            var stayAnimation = 'stay' + direction;
            var fireball = null;
            return function () {
                self.sprite.animations.play(shootAnimation, 8, false);
                if (init) {
                    init = false;
                    target = new Square(point.y, point.x);
                    steps = utils.getSteps(target, self.square);
                    steps = (steps < 10) ? 30 : steps;
                    fireballSteps = steps - 20;
                    deltaX = (target.getXCoord() - self.square.getXCoord()) / fireballSteps;
                    deltaY = (target.getYCoord() - self.square.getYCoord()) / fireballSteps;
                    direction = utils.getDirection(deltaY, deltaX);
                    shootAnimation = 'cast' + direction;
                    stayAnimation = 'stay' + direction;
                }
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
                steps--;
                return true;
            }
        },

        heal: function (point) {
            var self = this;
            var target = new Square(point.y, point.x);
            var steps = null;
            var init = true;
            var heal = null;
            return function () {
                if (init) {
                    init = false;
                    steps = 40;
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