'use strict';

require.config({
    deps: ['main'],
    shim: {
        'phaser': {
            exports: 'Phaser'
        }
    },
    paths: {
        main: 'main',
        jquery: 'node_modules/jquery/dist/jquery.min',
        phaser: 'node_modules/phaser/dist/phaser.min'
    }
});

