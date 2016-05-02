'use strict';

define([

], function () {
    var utils = {};

    utils.range = function (a, b) {
        var arr = [];
        for (var i = a; i <= b; i++) arr.push(i);
        return arr;
    };

    utils.copy = function (obj) {
        var copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.copy(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.copy(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    };

    utils.getSteps = function (from, to) {
        var x = Math.abs(from.getX() - to.getX());
        var y = Math.abs(from.getY() - to.getY());
        var d = Math.sqrt(x * x + y * y);
        return Math.round(d) * 10;
    };

    utils.getDirection = function (y, x) {
        var tan = Math.abs(y) / Math.abs(x);
        if (tan > 1) {
            return y > 0 ? 'Down' : 'Up';
        } else {
            return x > 0 ? 'Right' : 'Left';
        }
    };

    return utils;
});