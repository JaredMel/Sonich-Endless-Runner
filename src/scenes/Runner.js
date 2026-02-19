class Runner extends Phaser.Scene {
    constructor() {
        super('runnerScene')
    }

    init() {
        this.spikeSpeed = -480
        this.spikesSpawnDelay = 1500
        this.difficultyDelay = 5000
        this.parallaxingSpeedMultiplier = 1
        this.minSpikesSpawnDelay = 200
        this.difficultyCounter = 1
    }
    
    create() {
        // counts player jumps used to add randomness
        this.playerJumps = 1
        // tilesprites
        this.background = this.add.tileSprite(0, 0, 1280, 480, 'background').setOrigin(0,0)
        this.sun = this.add.tileSprite(0, 0, 1380, 480, 'sun').setOrigin(0,0)
        this.clouds = this.add.tileSprite(0, 0, 1920, 480, 'clouds').setOrigin(0,0)
        this.ground = this.add.tileSprite(0, 0, 1426, 480, 'ground').setOrigin(0,0)

        // texts
        let failStateConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '40px',
            backgroundColor: '#d95b00',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.gameOverText = this.add.text(game.config.width/2, game.config.height/3, "GAME OVER", failStateConfig).setOrigin(0.5)
        this.gameOverText.visible = false
        failStateConfig.fontSize = '36px'
        this.resetText = this.add.text(game.config.width/2, game.config.height/2, "Press Space to Restart", failStateConfig).setOrigin(0.5)
        this.resetText.visible = false
        this.highscoreText = this.add.text(game.config.width/2, game.config.height/1.5, 'Highscore: ' + window.localStorage.getItem('highscore'), failStateConfig).setOrigin(0.5)
        this.highscoreText.visible = false
        this.scoreText = this.add.text(game.config.width/2, game.config.height/1.2, 'Score: ' + this.difficultyCounter, failStateConfig).setOrigin(0.5)
        failStateConfig.backgroundColor = '#d95a0000'
        this.instructions = this.add.text(game.config.width/2, game.config.height/2, 'Press ^ to jump', failStateConfig).setOrigin(0.5)
        failStateConfig.backgroundColor = '#d95b00'


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
            this.instructions.visible = false
        }, null, this)

        // // Sonich running animation
        // this.anims.create({
        //     key: 'running',
        //     frameRate: 20,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('sonich', {
        //         start: 1,
        //         end: 4
        //     })
        // })

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

        // set up difficultyTimer
        this.difficultyTimer = this.time.addEvent({
            delay: this.difficultyDelay,
            callback: this.difficultyUp,
            callbackScope: this,
            loop: true
        })
        this.difficultyTimer.paused = true

        // set keySpace
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    // function to add spikes at a 75% chance
    addSpikes() {
         let ran = Math.round(Math.random() * this.playerJumps) % 4 // random variable between 0 or 1
         if (ran > 0) { // if 0 spawn a new spike
            let spikes = new Spikes(this, this.spikeSpeed, 32, 32)
            this.spikesGroup.add(spikes)
         }
    }

    difficultyUp() {
        // Flash Too Fast message

        if (this.spikesSpawnDelay > this.minSpikesSpawnDelay) { // check if sikesSpawnDelay is at it's minimum
            this.spikesSpawnDelay -= 250 // shorten time between spawns
        }
        this.spikeSpeed -= 50 // increase spikeSpeed
        this.parallaxingSpeedMultiplier += 0.5 // increase parallaxing speed
        this.difficultyCounter++
        this.scoreText.text = 'Score: ' + this.difficultyCounter
    }

    // function for jumping
    jump() {
        if (this.grounded) { // check if Sonich is grounded
            this.sonich.setVelocityY(jumpVelocity * -1) // make him jump
            this.playerJumps++ // increment playerJumps
        }
    }

    update() {
        if (this.sonich.body.touching.down) { // check if Sonich is grounded
            this.grounded = true
        } else {
            this.grounded = false
        }

        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            if (!this.gameStart && this.sonich.destroyed) {
                this.scene.restart()
            }
        }

        if (this.gameStart && !this.sonich.destroyed) { // check if the game is still running
            this.spikesTimer.paused = false // start spikesTimer
            this.difficultyTimer.paused = false // start difficultyTimer
            this.ground.tilePositionX += 2 * this.parallaxingSpeedMultiplier // Paralax backgrounds
            this.clouds.tilePositionX += 0.1 * this.parallaxingSpeedMultiplier
            this.sun.tilePositionX += 0.01 * this.parallaxingSpeedMultiplier
            this.sonich.play('running', true) // play runnning animation
            if (this.cursors.up.isDown && this.grounded) { // check for player input
                this.jump() // call jump()
            }
            this.spikesCollider = this.physics.add.overlap(this.sonich, this.spikesGroup, this.spikeCollision, null, this) // check if Sonich collided with a spike and call spikeCollision if so
        }
    }

    // function for spikeCollision
    spikeCollision() {
        this.sonich.anims.pause() // pause Sonich's animation
        this.spikesGroup.children.each(child => { // stop all spikes in place
            child.setVelocityX(0)
        })
        this.sonich.destroyed = true // kill Sonich
        this.spikesTimer.paused = true // pause the spike timer so it doesn't spawn more
        this.difficultyTimer.paused = true // pause the difficulty timer
        this.gameStart = false // set gameStart to false

        if (window.localStorage.getItem('highscore') < this.difficultyCounter) {
            window.localStorage.setItem('highscore', this.difficultyCounter)
            this.highscoreText.text = 'Highscore: ' + window.localStorage.getItem('highscore')
        }

        this.gameOverText.visible = true
        this.resetText.visible = true
        this.highscoreText.visible = true
    }
}