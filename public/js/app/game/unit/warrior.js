'use strict';

define([
    './animations',
    '../map/square',
    '../../helpers/utils'
], function (animations, Square, utils) {

    function Warrior (game, square, team) {
        this.game = game;
        this.square = square;
        this.sprite = this.game.add.sprite(square.getXCoord(), square.getYCoord(), 'warrior' + team);
        for (var key in animations) {
            if (animations.hasOwnProperty(key)) {
                this.sprite.animations.add(key, animations[key]);
            }
        }

        this.sprite.animations.play(team == 1 ? 'stayRight' : 'stayLeft', 8, true);
    }

    Warrior.prototype = {

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
            var steps = 40;
            var deltaX = target.getXCoord() - this.square.getXCoord();
            var deltaY = target.getYCoord() - this.square.getYCoord();
            var direction = utils.getDirection(deltaY, deltaX);
            var attackAnimation = 'attack' + direction;
            var stayAnimation = 'stay' + direction;
            return function () {
                self.sprite.animations.play(attackAnimation, 8, false);
                steps--;
                if (steps == 0) {
                    self.sprite.animations.play(stayAnimation, 8, false);
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

    return Warrior;

});