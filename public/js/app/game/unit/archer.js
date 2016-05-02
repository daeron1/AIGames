'use strict';

define([
    './animations',
    '../map/square',
    '../../helpers/utils'
], function (animations, Square, utils) {

    function Archer(game, square, team) {
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
                    stayAnimation = 'stayArcher' + direction;
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
            var arrowSteps = null;
            var init = true;
            var deltaX = null;
            var deltaY = null;
            var direction = null;
            var shootAnimation = 'shoot' + direction;
            var stayAnimation = 'stayArcher' + direction;
            var arrow = null;
            return function () {
                self.sprite.animations.play(shootAnimation, 8, false);
                if (init) {
                    init = false;
                    target = new Square(point.y, point.x);
                    steps = utils.getSteps(target, self.square);
                    steps = (steps < 10) ? 30 : steps;
                    arrowSteps = steps - 20;
                    deltaX = (target.getXCoord() - self.square.getXCoord()) / arrowSteps;
                    deltaY = (target.getYCoord() - self.square.getYCoord()) / arrowSteps;
                    direction = utils.getDirection(deltaY, deltaX);
                    shootAnimation = 'shoot' + direction;
                    stayAnimation = 'stayArcher' + direction;
                }
                if (steps == arrowSteps) {
                    arrow = self.game.add.sprite(self.square.getXCoord(), self.square.getYCoord() + 32, 'arrow' + direction);
                }
                if (steps < arrowSteps) {
                    arrow.x += deltaX;
                    arrow.y += deltaY;
                }
                if (steps == 0) {
                    self.sprite.animations.play(stayAnimation, 8, false);
                    arrow.kill();
                    return false;
                }
                steps--;
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