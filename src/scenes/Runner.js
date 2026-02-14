class Runner extends Phaser.Scene {
    constructor() {
        super('runnerScene')
    }
    
    create() {
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0,0)
        this.sun = this.add.tileSprite(0, 0, 640, 480, 'sun').setOrigin(0,0)
        this.clouds = this.add.tileSprite(0, 0, 1280, 480, 'clouds').setOrigin(0,0)
        this.ground = this.add.tileSprite(0, 0, 719, 480, 'ground').setOrigin(0,0)
    }
}