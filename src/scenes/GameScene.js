
import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('player', 'assets/knight.png');
        this.load.image('walkright1', 'assets/knight.png');
        this.load.image('walkright2', 'assets/knight2.png');
        this.load.image('walkleft1', 'assets/knight3.png');
        this.load.image('walkleft2', 'assets/knight4.png');
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
        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            this.lastDirection = 'left';
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            this.lastDirection = 'right';
        }

        if (this.cursors.left.isDown && this.cursors.right.isDown) {

            if (this.lastDirection === 'left') {
                this.player.setVelocityX(-100);
                this.player.anims.play('walkleft', true);
            } else {
                this.player.setVelocityX(100);
                this.player.anims.play('walkright', true);
            }
        
        }
        else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-100);
            this.player.anims.play('walkleft', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(100);
            this.player.anims.play('walkright', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.stop();
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

        if (
            this.cursors.up.isDown &&
            this.player.body.blocked.down
        ) {
            this.player.setVelocityY(-150);
            }
        
    }
    // update() {
    //     if (this.cursors.left.isDown) {
    //         this.player.setVelocityX(-200);
    //     }
    //     else if (this.cursors.right.isDown) {
    //         this.player.setVelocityX(200);
    //     }
    //     else {
    //         this.player.setVelocityX(0);
    //     }
    //     if (this.cursors.up.isDown && this.player.body.touching.down) {
    //         this.player.setVelocityY(-500);
    //     }
    // }

}

