import Phaser from 'phaser';
import Ball from '../gameobjects/ball'
import JumpMeter from "../gameobjects/jumpMeter"
import Rim from '../gameobjects/rim';

export class Game extends Phaser.Scene
{
    constructor ()
    {
        super({key: 'Game'});
        this.map = null;
        this.player = null;
        this.layers = [];
        this.groundLayer = null
        this.jumpMeter = null
        this.rim = null
        this.cameraPrevPos = null

        this.timePassed = 0
        this.obstacles = null

    }
    
    create()
    {
        this.cameraPrevPos = { x: this.cameras.main.scrollX, y: this.cameras.main.scrollY };
        this.createMap()
        this.obstacles = this.physics.add.group({
            immovable: true,
            allowGravity: false
        })
        
        // this.jumpMeter = new JumpMeter(this, 400, 600, 0xffffff)
        
        this.map.getObjectLayer('objects').objects.forEach(obj => {
            if(obj.name === 'rim'){
                this.rim = new Rim(this, obj.x, obj.y, obj.width)
            }
            
            if(obj.name === 'player'){
                this.player = new Ball(this, obj.x, obj.y, obj.width)
            }
            
            if(obj.name === 'jumpmeter'){
                this.jumpMeter = new JumpMeter(this, obj.x, obj.y, 0xffffff)
            }
        })
        
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        this.cameras.main.startFollow(this.player)
        
        this.colliders()
        
    }

    update(time, delta) {
        this.player.jumpPower = this.jumpMeter.jumpPower
        let cameraOffsetX = this.cameras.main.scrollX - this.cameraPrevPos.x;
        this.jumpMeter.x += cameraOffsetX;
        this.cameraPrevPos = { x: this.cameras.main.scrollX, y: this.cameras.main.scrollY };
    }

    createMap()
    {
        this.map = this.make.tilemap({key: 'map1'})
        this.map.addTilesetImage('tileset-map', 'tileset')
        this.layers.push(this.map.createLayer('ground', 'tileset-map')
            .setCollisionByProperty({collides: true}))
    }

    colliders()
    {
        this.physics.add.collider(
            this.player,
            this.layers,
            () => {},
            () => true,
            this
        )

        this.physics.add.collider(
            this.player,
            this.obstacles,
            () => {},
            () => true,
            this
        )

        this.physics.add.overlap(
            this.player,
            this.rim,
            () => {console.log("Touched the rim");},
            () => {
                if(this.player.body.velocity.y <= 0){
                    return false
                } return true
            },
            this
        )
    }
}

