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
        stayArcherUp: [208],
        moveUp: utils.range(104, 112),
        stayLeft: [117],
        stayArcherLeft: [221],
        moveLeft: utils.range(117, 125),
        stayDown: [130],
        stayArcherDown: [234],
        moveDown: utils.range(130, 138),
        stayRight: [143],
        stayArcherRight: [247],
        moveRight: utils.range(143, 151),
        shootUp: utils.range(208, 220),
        shootLeft: utils.range(221, 233),
        shootDown: utils.range(234, 246),
        shootRight: utils.range(247, 259),
        attackUp: utils.range(156, 161),
        attackLeft: utils.range(169, 174),
        attackDown: utils.range(182, 187),
        attackRight: utils.range(195, 200),
        die: utils.range(260, 265)
    };

});