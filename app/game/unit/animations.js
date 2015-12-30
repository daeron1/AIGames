'use strict';

define([
    '../../helpers/utils'
], function (utils) {

    return {
        castUp: utils.range(0, 6),
        castLeft: utils.range(13, 19),
        castDown: utils.range(26, 32),
        castRight: utils.range(39, 45),
        stayUp: [104],
        moveUp: utils.range(104, 112),
        stayLeft: [117],
        moveLeft: utils.range(117, 125),
        stayDown: [130],
        moveDown: utils.range(130, 138),
        stayRight: [143],
        moveRight: utils.range(143, 151),
        shootUp: utils.range(208, 220),
        shootLeft: utils.range(221, 233),
        shootDown: utils.range(234, 246),
        shootRight: utils.range(247, 259),
        die: utils.range(260, 265)
    };

});