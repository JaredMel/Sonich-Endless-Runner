"use strict"

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Menu, Runner ]
}
let game = new Phaser.Game(config)

// reserve keyboard bindings
let keySpace

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3