class Runner extends Phaser.Scene {
    constructor() {
        super('runnerScene')
    }

    init() {

    }
    
    create() {
        // tilesprites
        this.background = this.add.tileSprite(0, 0, 1280, 480, 'background').setOrigin(0,0)
        this.sun = this.add.tileSprite(0, 0, 1380, 480, 'sun').setOrigin(0,0)
        this.clouds = this.add.tileSprite(0, 0, 1920, 480, 'clouds').setOrigin(0,0)
        this.ground = this.add.tileSprite(0, 0, 1426, 480, 'ground').setOrigin(0,0)

        // add ground collision
        this.groundCollisionBox = this.add.rectangle(0, 340, 1426, 139, '#ffffff').setOrigin(0,0)
        this.physics.add.existing(this.groundCollisionBox, true)
        this.groundCollisionBox.visible = false

        // add Sonich
        this.sonich = this.physics.add.sprite(game.settings.playerStartingPosX, game.settings.playerStartingPosY, 'sonich', 0).setScale(3).setOrigin(0,1).setSize(16, 0)
        this.sonich.setGravityY(this.game.settings.gravity)
        this.grounded = false
        this.physics.add.collider(this.sonich, this.groundCollisionBox, () => {
            this.grounded = true
        })
        // 3 second start
        this.gameStart = false
        this.clock = this.time.delayedCall(3000, () => {
            this.gameStart = true
        }, null, this)
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
        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    jump() {
        if (this.grounded) {
            this.sonich.setVelocityY(this.game.settings.jumpVelocity * -1)
        }
    }

    update() {
        if (this.sonich.body.touching.down) {
            this.grounded = true
        } else {
            this.grounded = false
        }
        if (this.gameStart) {
            this.ground.tilePositionX += 3
            this.clouds.tilePositionX += 0.1
            this.sun.tilePositionX += 0.01
            this.sonich.play('running', true)
            if (this.cursors.up.isDown && this.grounded) {
                this.jump()
            }
        }
    }
}