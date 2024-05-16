import { Math } from 'phaser'

export default  class JumpMeter extends Phaser.GameObjects.Rectangle
{
    constructor(scene, x, y, color)
    {
        super(scene, x, y, 400, 50, color)
        this.x = x
        this.y = y
        this.w = 400
        this.scene.add.existing(this)
        
        this.meterLine = this.scene.add.rectangle(this.x / 2, this.y, 10, 60, 0xff0000).setOrigin(0, 0.5)
        this.scene.events.on('update', this.update, this)

        this.scene.physics.add.existing(this.meterLine)
        this.meterLine.body.setAllowGravity(false)
        this.meterLine.body.setImmovable(true)
        this.jumpPower = 0
        this.jumpFactor = 0.8
        this.direction = 1

    }

    update()
    {
        this.jumpPower = this.meterLine.x * this.jumpFactor
        this.moveLine(this.meterLine.x)
        
        // console.log(this.meterLine.x);
    }
    
    moveLine(currentPos)
    {
        let speed = 150
        let offsetSize = 30
        if (currentPos <= (this.x - this.w / 2) + offsetSize) {
            this.direction = 1
            // this.meterLine.body.setAccelerationX(speed * 5)
            this.meterLine.body.setVelocityX(speed * this.direction)
            // return 
        }

        
        else if (currentPos >= (this.x + this.w / 2) - offsetSize) { 
            this.direction = -1
            // this.meterLine.body.setAccelerationX(-speed * 5)
            this.meterLine.body.setVelocityX(speed * this.direction)
            // return s
        }
        
        if (Math.Within(currentPos, 300, 400)){
            this.meterLine.body.setAccelerationX(speed * 10 * this.direction)
        } else {
            this.meterLine.body.setAccelerationX(0)

        }

    }

    moveLine2()
    {

    }
}