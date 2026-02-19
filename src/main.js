// Title: Sonich The Endless Runner
// Author: Jared Melendez
// Hours Spent: ~30
// Citations: Music - https://bellkalengar.itch.io/essential-game-music-pack
//            Sound - https://jdwasabi.itch.io/8-bit-16-bit-sound-effects-pack
//            Highscore Code - https://stackoverflow.com/questions/37408825/create-a-high-score-in-phaser
//            Endless Runner Tutorial - https://emanueleferonato.com/2018/11/13/build-a-html5-endless-runner-with-phaser-in-a-few-lines-of-code-using-arcade-physics-and-featuring-object-pooling/
//            Sonic Running Sprite - https://www.deviantart.com/spongedrew250/art/Sonic-Sonic-Running-Sprite-Sheet-920021662
// Creative Tilt Technical: I would say the two things I'm most proud of technically are either the highscore system which uses window.localstorage to store a player's highscore,
// or its the way I added randomness to the spawn of spikes by connecting it with the number of jumps the player makes. For the highscore system I pretty much just learned it by
// looking at the stackoverflow question above and then made it from there, as for the randomness being tied to player action I didn't really actually take that from anywhere but
// instead learned about it from the internet. I've heard about how in order to make things truly random in games, game devs will tie a player action to the way they generate
// randomness in order to induce true randomness. I feel like I did a pretty decent job here by tieing it to the jumps the player makes although one glaring issue is that the
// game always starts out the same but for this it seems to work fine enough.
// Creative Tilt Visual: I would say that I'm particulary proud of my Sonich running sprite. I've done pixel animations before but I've never tried a running animation so being
// able to do that here was really fun even if I did use the Sonic 1 running animation as a reference. I still think it turned out really nice and I got to learn a lot about
// animation.
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
            debug: false
        }
    },
    scene: [ Menu, Runner ]
}
let game = new Phaser.Game(config)

// set global variables
let playerStartingPosX = 100
let playerStartingPosY = 340
let gravity = 900
let jumpVelocity = 500

// reserve keyboard bindings
let keySpace, keyRESET