'use strict';

define([

], function () {
    var utils = {};

    utils.range = function (a, b) {
        var arr = [];
        for (var i = a; i <= b; i++) arr.push(i);
        return arr;
    };

    return utils;
});