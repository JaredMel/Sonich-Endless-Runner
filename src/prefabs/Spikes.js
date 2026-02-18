class Spikes extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, spikesWidth, spikesHeight) {
        super(scene, game.config.width + spikesWidth, playerStartingPosY - spikesHeight, 'spikes').setScale(2)

        this.parentScene = scene // maintain scene context

        this.parentScene.add.existing(this) // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this) // add to physics system
        this.setVelocityX(velocity) // make it go
        this.setImmovable()
        this.tint = 0xffffff
    }

    update() {
        // destroy spike if it reaches the left edge of the screen
        if (this.x < -this.width) {
            this.destroy()
        }
    }
}