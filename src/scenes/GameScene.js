
import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('player', 'assets/knight1.png');
        this.load.image('walkright1', 'assets/knight1.png');
        this.load.image('walkright2', 'assets/knight2.png');
        this.load.image('walkleft1', 'assets/knight3.png');
        this.load.image('walkleft2', 'assets/knight4.png');
        this.load.image('jumpright1', 'assets/knightjumpright1.png');
        this.load.image('jumpright2', 'assets/knightjumpright2.png');
        this.load.image('jumpright3', 'assets/knightjumpright3.png');
        this.load.image('jumpright4', 'assets/knightjumpright4.png');
        this.load.image('jumpleft1', 'assets/knightjumpleft1.png');
        this.load.image('jumpleft2', 'assets/knightjumpleft2.png');
        this.load.image('jumpleft3', 'assets/knightjumpleft3.png');
        this.load.image('jumpleft4', 'assets/knightjumpleft4.png');
        this.load.tilemapTiledJSON(
            'ground',
            'assets/tileset1/tileset1.tilemap.json'
        );

        this.load.image(
            'terrain',
            'assets/tileset1/tilesets/simpletile.png'
        );
    }

    create() {
        // this.time.timeScale = 0.5;
        this.player = this.physics.add.sprite(150, 120, 'player');
        // this.player.setCollideWorldBounds(true);
        this.player.setScale(1);
        // this.cameras.main.startFollow(this.player);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setDeadzone(50, 100);
        this.player.body.setSize(10, 16);
        this.player.body.setOffset(3, 0);
        this.anims.create({
            key: 'walkright',
            frames: [
                { key: 'walkright1' },
                { key: 'walkright2' }
            ],
            frameRate: 5,
            repeat: -1
        }); 
        this.anims.create({
            key: 'walkleft',
            frames: [
                { key: 'walkleft1' },
                { key: 'walkleft2' }
            ],
            frameRate: 5,
            repeat: -1
        }); 
        // this.anims.create({
        //     key: 'jumpright',
        //     frames: [
        //         { key: 'jumpright1' },
        //         { key: 'jumpright2' },
        //         { key: 'jumpright3' },
        //         { key: 'jumpright4' }
        //     ],
        //     frameRate: 1,
        //     repeat: -1
        // }); 
        const ground = this.make.tilemap({ key: 'ground' });

        const tileset = ground.addTilesetImage(
            'simpletile',
            'terrain'
        );
        this.textures.get('terrain').setFilter(Phaser.Textures.NEAREST);
        const groundLayer = ground.createLayer('Layer 1',tileset,0,155);
        groundLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, groundLayer);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        
        
        this.lastDirection = 'right';

        
    }


    update() {
        let jump = false;
        console.log(this.player.body.blocked.down, this.player.body.velocity.y);
        // console.log(this.player.anims.currentAnim?.key);
        if (this.cursors.left.isDown) {
            this.lastDirection = 'left';
        }

        if (this.cursors.right.isDown) {
            this.lastDirection = 'right';
        }

        
        if (this.cursors.left.isDown && this.cursors.right.isDown) {

            if (this.lastDirection === 'left') {
                this.player.setVelocityX(-100);
                // if (this.player.body.blocked.down){
                //     this.player.anims.play('walkleft', true);
                // }
            } else {
                this.player.setVelocityX(100);
                // if (this.player.body.blocked.down){
                //     this.player.anims.play('walkright', true);
                // }
            }
        
        }
        else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-100);
            // if (this.player.body.blocked.down){
            //     this.player.anims.play('walkleft', true);
            // }
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(100);
            // if (this.player.body.blocked.down){
            //     this.player.anims.play('walkright', true);
            // }
        }
        else {
            this.player.setVelocityX(0);
            // this.player.anims.stop();
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.player.body.blocked.down) {
            this.player.setVelocityY(-150);
            if (this.lastDirection === 'right'){
                this.player.setTexture('jumpright1');
                jump = true;
            }else {
                this.player.setTexture('jumpleft1');
                jump = true;
            }

            // if(this.player.body.blocked.down){
            //     if (this.lastDirection === 'right'){
            //         this.player.setTexture('walkright1')
            //         // break;
            //     } else {
            //         this.player.setTexture('walkleft1')
            //         // break;
            //     }
            // }

            this.time.delayedCall(120, () => {
                if (this.lastDirection === 'right'){
                    this.player.setTexture('jumpright2');
                    jump = true;
                }else {
                    this.player.setTexture('jumpleft2');
                    jump = true;
                }
            });

            // if(this.player.body.touching.down){
            //     if (this.lastDirection === 'right'){
            //         this.player.setTexture('walkright1')
            //         // break;
            //         return;
            //     } else {
            //         this.player.setTexture('walkleft1')
            //         // break;
            //     }
            // }

            this.time.delayedCall(240, () => {
                if (this.lastDirection === 'right'){
                    this.player.setTexture('jumpright3');
                    jump = true;
                }else {
                    this.player.setTexture('jumpleft3');
                    jump = true;
                }
            });

            // if(this.player.body.touching.down){
            //     if (this.lastDirection === 'right'){
            //         this.player.setTexture('walkright1')
            //         // break;
            //     } else {
            //         this.player.setTexture('walkleft1')
            //         // break;
            //     }
            // }

            this.time.delayedCall(360, () => {
                if (this.lastDirection === 'right'){
                    this.player.setTexture('jumpright4');
                    jump = true;
                }else {
                    this.player.setTexture('jumpleft4');
                    jump = true;
                }
            });

            // if(this.player.body.touching.down){
            //     if (this.lastDirection === 'right'){
            //         this.player.setTexture('walkright1')
            //         // break;
            //     } else {
            //         this.player.setTexture('walkleft1')
            //         // break;
            //     }
            // }

            this.time.delayedCall(480, () => {
                if (this.lastDirection === 'right'){
                    this.player.setTexture('jumpright1'); 
                    jump = true;
                }else {
                    this.player.setTexture('jumpleft1');
                    jump = true;
                }
            });
           
            // if (this.player.body.blocked.down){
            this.time.delayedCall(580, () => {
                if (this.lastDirection === 'right'){
                    this.player.setTexture('walkright1')
                } else {
                    this.player.setTexture('walkleft1')
                }
            });
            // }
        }else {
            if (!jump){
                if (this.player.body.velocity.x === 0) {
                    this.player.anims.stop();
                }
                else if (this.player.body.velocity.x > 0) {
                    this.player.anims.play('walkright', true);
                }
                else {
                    this.player.anims.play('walkleft', true);
                }
            }
        }
        // if (this.cursors.left.isDown) {
        //     this.player.setVelocityX(-100);
        //     this.player.anims.play('walkleft',true)
        // }
        // else if (this.cursors.right.isDown) {
        //     this.player.setVelocityX(100);
        //     this.player.anims.play('walkright',true)
        // }
        // else {
        //     this.player.setVelocityX(0);
        //     this.player.anims.play('walk',false)
        // }

        
        // if (!this.player.body.blocked.down){
        //     this.player.anims.play('jump', true)
        // }
        // if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            
        // }
        
    }

}

