"use strict"

let config = {
    type: Phaser.AUTO,
    width: 1280,
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

let playerStartingPosX = 100
let playerStartingPosY = 340
let gravity = 900
let jumpVelocity = 500
let centerX = game.config.width / 2

// reserve keyboard bindings
let keySpace

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3