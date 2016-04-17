'use strict';

define([
    '../config'
], function (config) {

    function Square(y, x) {
        this.y = y;
        this.x = x;
        this.xCoord = config.start_x + (x - 1) * config.square_width;
        this.yCoord = config.start_y + (y - 1) * config.square_width;
    }

    Square.prototype = {
        constructor: Square,

        getX: function () {
            return this.x;
        },

        getY: function () {
            return this.y;
        },

        getXCoord: function () {
            return this.xCoord;
        },

        getYCoord: function () {
            return this.yCoord;
        }
    };

    return Square;

});