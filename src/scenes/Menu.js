class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        this.load.path = './assets/'
        this.load.image('background', 'Background.png')
        this.load.image('sun', 'Sun.png')
        this.load.image('clouds', 'Clouds.png')
        this.load.image('ground', 'Ground.png')
        this.load.spritesheet('sonich', 'Sonich.png', {
            frameWidth: 32,
            frameHeight: 32
        })
    }

    create() {
        // Menu Config
        let menuConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '40px',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        };
        // display menu text
        this.add.text(game.config.width/6, game.config.height/6 - borderUISize - borderPadding, 'Sonich The Endless Runner', menuConfig).setOrigin(0, 0)
        this.add.text(game.config.width/4, game.config.height/4 + borderUISize + borderPadding, 'Press space to play', menuConfig).setOrigin(0, 0)
        // define key
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // game settings
        game.settings = {
            playerStartingPosX: 100,
            playerStartingPosY: 340
        }
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('runnerScene')
        }
    }
}