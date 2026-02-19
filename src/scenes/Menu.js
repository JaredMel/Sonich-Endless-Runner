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
        this.load.image('spikes', 'Spikes.png')
    }

    create() {
        // tilesprites
        this.background = this.add.tileSprite(0, 0, 1280, 480, 'background').setOrigin(0,0)
        this.sun = this.add.tileSprite(0, 0, 1380, 480, 'sun').setOrigin(0,0)
        this.clouds = this.add.tileSprite(0, 0, 1920, 480, 'clouds').setOrigin(0,0)
        this.ground = this.add.tileSprite(0, 0, 1426, 480, 'ground').setOrigin(0,0)

        // add Sonich
        this.sonich = this.add.sprite(game.config.width/2, playerStartingPosY, 'sonich', 0).setScale(3).setOrigin(0.5,1).setSize(16, 0)

        // Sonich running animation
        this.anims.create({
            key: 'running',
            frameRate: 20,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('sonich', {
                start: 1,
                end: 4
            })
        })
        this.sonich.play('running', true) // play runnning animation

        // Menu Config
        let menuConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '50px',
            color: '#ffffff',
            backgroundColor: '#d95b00',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        };
        // display menu text & credits
        this.add.text(game.config.width/2, game.config.height/4, 'Sonich The Endless Runner', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '40px'
        this.add.text(game.config.width/2, game.config.height/2.5, 'Press space to play', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '30px'
        this.add.text(game.config.width/7, game.config.height/4, 'Credits', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/7, game.config.height/2, 'Programmer: Jared Melendez\nPixel Artist: Jared Melendez\nConcept Art: Nathan Altice', menuConfig).setOrigin(0.5)
        // define key
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('runnerScene')
        }
    }
}