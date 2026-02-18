class Runner extends Phaser.Scene {
    constructor() {
        super('runnerScene')
    }

    init() {
        this.spikeSpeed = -480
        this.spikesSpawnDelay = 1500
        this.playerLives = 3
    }
    
    create() {
        // counts player jumps used to add randomness
        this.playerJumps = 0
        // tilesprites
        this.background = this.add.tileSprite(0, 0, 1280, 480, 'background').setOrigin(0,0)
        this.sun = this.add.tileSprite(0, 0, 1380, 480, 'sun').setOrigin(0,0)
        this.clouds = this.add.tileSprite(0, 0, 1920, 480, 'clouds').setOrigin(0,0)
        this.ground = this.add.tileSprite(0, 0, 1426, 480, 'ground').setOrigin(0,0)

        // add ground collision
        this.groundCollisionBox = this.add.rectangle(0, playerStartingPosY, 1426, 139, '#ffffff').setOrigin(0,0)
        this.physics.add.existing(this.groundCollisionBox, true)
        this.groundCollisionBox.visible = false

        // add Sonich
        this.sonich = this.physics.add.sprite(playerStartingPosX, playerStartingPosY, 'sonich', 0).setScale(3).setOrigin(0,1).setSize(16, 0)
        this.sonich.setGravityY(gravity)
        this.grounded = false
        this.physics.add.collider(this.sonich, this.groundCollisionBox, () => {
            this.grounded = true
        })
        this.sonich.destroyed = false
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

        // set up spike group
        this.spikesGroup = this.add.group({
            runChildUpdate: true
        })

        // set up spikesTimer
        this.spikesTimer = this.time.addEvent({
            delay: this.spikesSpawnDelay,
            callback: this.addSpikes,
            callbackScope: this,
            loop: true
        })
        this.spikesTimer.paused = true
    }

    addSpikes() {
         let ran = Math.round(Math.random() * this.playerJumps) % 2
         //console.log(ran)
         if (ran === 0) {
            let spikes = new Spikes(this, this.spikeSpeed, 32, 32)
            this.spikesGroup.add(spikes)
         }
    }

    jump() {
        if (this.grounded) {
            this.sonich.setVelocityY(jumpVelocity * -1)
            this.playerJumps++
        }
    }

    update() {
        if (this.sonich.body.touching.down) {
            this.grounded = true
        } else {
            this.grounded = false
        }
        if (this.gameStart && !this.sonich.destroyed) {
            this.spikesTimer.paused = false
            this.ground.tilePositionX += 2
            this.clouds.tilePositionX += 0.1
            this.sun.tilePositionX += 0.01
            this.sonich.play('running', true)
            if (this.cursors.up.isDown && this.grounded) {
                this.jump()
            }
            this.spikesCollider = this.physics.add.overlap(this.sonich, this.spikesGroup, this.spikeCollision, null, this)
        }
    }

    spikeCollision() {
        if (this.playerLives > 0) {
            this.playerLives--
            console.log(this.playerLives)
            this.spikesCollider.active = false
        } else {
            this.sonich.destroyed = true
            this.spikesTimer.destroy()
        }
    }
}