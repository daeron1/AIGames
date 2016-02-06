'use strict';

define([

], function () {

    function Tree(game, square) {
        game.add.sprite(square.getXCoord(), square.getYCoord(), 'tree');
    }

    return Tree;

});