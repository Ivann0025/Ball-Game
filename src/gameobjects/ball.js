import JumpMeter from "./jumpMeter"

class Ball extends Phaser.GameObjects.Ellipse
{
    constructor(scene, x, y, w)
    {
        super(scene, x, y, w, w, 0xffff00)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.setCircle(8)
        this.body.setBounce(0.6)
        this.cursor = this.scene.input.keyboard.createCursorKeys()
        this.isMoving = true;

        this.jumpPower = 0
        this.jumpFactor = 1.1
        this.deceleration = 100

        this.initControllers();
        this.body.setCollideWorldBounds(true)
        
    }

    initControllers() 
    {
        // Pointer event handling
        this.scene.input.on('pointerdown', () => {
            let posDelta = 0

            if (!this.isMoving && this.body.velocity.y <= 0) {
                if (this.scene.game.input.activePointer.position.x >= this.body.position.x){
                    posDelta = 1
                } else {
                    posDelta = -1
                }

                this.body.setVelocityY(-this.jumpPower * this.jumpFactor);
                this.body.setVelocityX((this.jumpPower * 0.5) * posDelta);

                this.isMoving = true;
            }
        });

        this.scene.events.on('update', () => {

            this.fillColor = 0xffff00
            this.changeColor(this.isMoving)
            if (this.isMoving) {
                const velocityMagnitude = Math.sqrt(Math.pow(this.body.velocity.x, 2) + Math.pow(this.body.velocity.y, 2));
                if (velocityMagnitude < 10) {
                    this.body.setVelocity(0);
                    this.body.setAcceleration(0);
                    this.isMoving = false;
                } else {
                    const decelerationX = this.body.velocity.x * this.deceleration / velocityMagnitude;
                    const decelerationY = this.body.velocity.y * this.deceleration / velocityMagnitude;
                    this.body.setAcceleration(-decelerationX, -decelerationY);
                }
            }
        });

        
    }

    changeColor(isMoving)
    {
        if(!isMoving) {
            this.fillColor = 0x00ff00
            return
        }

        this.fillColor = 0xff0000
    }
}


export default Ball;