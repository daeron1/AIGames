'use strict';

define([
], function () {

    function Params() {
    }

    Params.prototype = {
        constructor: Params,

        setBarriers: function (barriers) {
            this.barriers = barriers;
        },

        getBarriers: function () {
            return this.barriers;
        },

        setSteps: function (steps) {
            this.steps = steps;
        },

        getSteps: function () {
            return this.steps;
        }

    };

    return new Params();

});