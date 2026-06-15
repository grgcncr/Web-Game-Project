
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
        // this.player.on('animationcomplete', (anim) => {
        //     console.log('completed:', anim.key);
        // });
        // this.time.timeScale = 0.5;
        this.player = this.physics.add.sprite(150, 120, 'player');
        // this.player.setCollideWorldBounds(true);
        this.player.setScale(1);
        // this.cameras.main.startFollow(this.player);
        this.cameras.main.startFollow(this.player, true, 1, 1);
        this.cameras.main.setDeadzone(80, 100);
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
        this.anims.create({
            key: 'jumpright',
            frames: [
                { key: 'jumpright1' },
                { key: 'jumpright2' },
                { key: 'jumpright3' },
                { key: 'jumpright4' },
                { key: 'jumpright1' }
            ],
            frameRate: 8,
            repeat: 0
        }); 
        this.anims.create({
            key: 'jumpleft',
            frames: [
                { key: 'jumpleft1' },
                { key: 'jumpleft2' },
                { key: 'jumpleft3' },
                { key: 'jumpleft4' },
                { key: 'jumpleft1' }
            ],
            frameRate: 8,
            repeat: 0
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
        // let jump = false;
        // console.log(this.player.body.blocked.down, this.player.body.velocity.y);
        console.log(this.player.anims.currentAnim?.key);
        // console.log(this.player.frame.name);
        

        // WALK LOGIC

        if (Phaser.Input.Keyboard.JustDown(this.cursors.right)){
            if (this.player.texture.key === "walkright1"){
                this.player.setTexture('walkright2');
            }else{
                this.player.setTexture('walkright1');
            }
            this.lastDirection = 'right';
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)){
            if (this.player.texture.key === "walkleft1"){
                this.player.setTexture('walkleft2');
            }else{
                this.player.setTexture('walkleft1');
            }
            this.lastDirection = 'left';
        }

        if (this.cursors.left.isDown && this.cursors.right.isDown) {

            if (this.lastDirection === 'left') {
                this.player.setVelocityX(-50);
                // if (this.player.body.blocked.down){
                //     this.player.anims.play('walkleft', true);
                // }
            } else {
                this.player.setVelocityX(50);
                // if (this.player.body.blocked.down){
                //     this.player.anims.play('walkright', true);
                // }
            }
        
        }
        else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-50);
            // if (this.player.body.blocked.down){
            //     this.player.anims.play('walkleft', true);
            // }
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(50);
            // if (this.player.body.blocked.down){
            //     this.player.anims.play('walkright', true);
            // }
        }
        else {
            this.player.setVelocityX(0);
            // this.player.anims.stop();
        }
        

        if(this.player.body.blocked.down){
            if (this.player.body.velocity.x === 0) {
                if (this.lastDirection === 'right'){
                    // this.player.setTexture('jumpright1');
                    this.player.setTexture('walkright1');
                }else {
                    this.player.setTexture('walkleft1');
                }
                // this.player.anims.pause();
            }
            else if (this.player.body.velocity.x > 0) {
                if (this.player.anims.currentAnim?.key !== 'walkright') {
                    this.player.anims.play('walkright');
                }
            }
            else {
                if (this.player.anims.currentAnim?.key !== 'walkleft') {
                    this.player.anims.play('walkleft');
                }
            }
        }  

        // JUMP LOGIC
        
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.player.body.blocked.down) {
            this.player.setVelocityY(-150);
            if (this.lastDirection === 'right'){
                // this.player.setTexture('jumpright1');
                this.player.anims.play('jumpright');
            }else {
                this.player.anims.play('jumpleft');
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
        console.log(this.player.anims.currentFrame?.index);
    }

}

