
export default class Rim extends Phaser.GameObjects.Rectangle
{
    constructor(scene, x, y, w)
    {
        super(scene, x, y, w, 10, 0xffff00)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.setAllowGravity(false)
        this.w = w
        
        this.x = x
        this.y = y
        
        this.create()

    }

    create()
    {
        this.setOrigin(0)
        let rimCorner1 = this.scene.add.rectangle(this.x, this.y+5, 10, 40, 0x8f4007)
        let rimCorner2 = this.scene.add.rectangle(this.w + this.x, this.y+5, 10, 40, 0x8f4007)

        this.scene.physics.add.existing(rimCorner1)
        this.scene.physics.add.existing(rimCorner2)
        rimCorner1.setOrigin(0, 0.5)
        rimCorner2.setOrigin(0, 0.5)

        this.scene.obstacles.add(rimCorner1)
        this.scene.obstacles.add(rimCorner2)

        // this.scene.obstacles.add(this)
    }
}