

class Obstacle extends Phaser.GameObjects.GameObject
{
    constructor(scene, x, y, type){
        super(scene, x, y, type)
        this.scene = scene
        this.type = type
        this.x = x
        this.y = y
        this.scene.add.existing(this)

        this.create()
        
    }

    create(){
        this.scene.physics.add.existing(this)
        this.body.setAllowGravity(false)
        this.body.setImmovable(true)
        this.scene.obstacles.add(this)
    }
}