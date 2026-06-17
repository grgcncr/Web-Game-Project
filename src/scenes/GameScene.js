
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
        this.load.image('attackright1', 'assets/knightattackright1.png');
        this.load.image('attackright2', 'assets/knightattackright2.png');
        this.load.image('attackleft1', 'assets/knightattackleft1.png');
        this.load.image('attackleft2', 'assets/knightattackleft2.png');
        this.load.image('swordright1', 'assets/swordright1.png');
        this.load.image('swordright2', 'assets/swordright2.png');
        this.load.image('swordright3', 'assets/swordright3.png');
        this.load.image('swordleft1', 'assets/swordleft1.png');
        this.load.image('swordleft2', 'assets/swordleft2.png');
        this.load.image('swordleft3', 'assets/swordleft3.png');

        this.load.image('UI-Bar', 'assets/UI-Bar.png')
        this.load.image('Location-Dungeon', 'assets/Location-Dungeon.png')
        this.load.image('Heart', 'assets/Heart.png')
      
        // this.load.audio('footstep', 'assets/footstep1.wav');
        
        // this.load.image('rocktile', 'assets/rocktile1.png');
        
        this.load.tilemapTiledJSON(
            'ground',
            'assets/rocktileset3/rocktileset3.tilemap.json'
        );

        this.load.image(
            'terrain',
            'assets/rocktileset3/tilesets/rocktile3.png'
        );
    }

    create() {
        this.player = this.physics.add.sprite(150, 120, 'player');
        this.player.setScale(1);
        this.cameras.main.startFollow(this.player);
        // this.cameras.main.setLerp(1,1);
        this.cameras.main.setDeadzone(80, 100);
        this.cameras.roundPixels = true;
        // UI CAMERA
        this.uiCamera = this.cameras.add(0, 0, 140, 100);
        this.uiCamera.setScroll(0, 0);
        this.uiCamera.roundPixels = true;
        

        

        this.player.body.setSize(10, 16);
        this.player.body.setOffset(3, 0);
        this.playerxvelocity = 50;
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
        this.anims.create({
            key: 'attackright',
            frames: [
                { key: 'attackright1' },
                { key: 'attackright2' },
                { key: 'attackright2' }
            ],
            frameRate: 15,
            repeat: 0
        }); 
        this.anims.create({
            key: 'attackleft',
            frames: [
                { key: 'attackleft1' },
                { key: 'attackleft2' },
                { key: 'attackleft2' }
            ],
            frameRate: 15,
            repeat: 0
        }); 
        this.anims.create({
            key: 'swordslashright',
            frames: [
                { key: 'swordright1' },
                { key: 'swordright2' },
                { key: 'swordright3' }
            ],
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: 'swordslashleft',
            frames: [
                { key: 'swordleft1' },
                { key: 'swordleft2' },
                { key: 'swordleft3' }
            ],
            frameRate: 15,
            repeat: 0
        });

        this.sword = this.add.sprite(this.player.x, this.player.y, 'sword1');

        this.sword.setVisible(false);
        
        
        const ground = this.make.tilemap({ key: 'ground' });

        const tileset = ground.addTilesetImage(
            'rocktile3',
            'terrain'
        );
        this.textures.get('terrain').setFilter(Phaser.Textures.NEAREST);
        const groundLayer = ground.createLayer('Layer 1',tileset,0,137);
        groundLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, groundLayer);
        
        this.ui_Bar = this.add.image(70, 87, 'UI-Bar');

        this.ui_Bar.setScrollFactor(0);
        this.ui_Bar.setDepth(100);

        this.location_dungeon = this.add.image(117, 82, 'Location-Dungeon');
        
        this.location_dungeon.setScrollFactor(0);
        this.location_dungeon.setDepth(101);

        this.heart1 = this.add.image(10, 92, 'Heart');
        this.heart1.setScrollFactor(0);
        this.heart1.setDepth(101);

        this.heart2 = this.add.image(22, 92, 'Heart');
        this.heart2.setScrollFactor(0);
        this.heart2.setDepth(101);

        this.heart3 = this.add.image(34, 92, 'Heart');
        this.heart3.setScrollFactor(0);
        this.heart3.setDepth(101);

        this.cameras.main.ignore([
            this.ui_Bar,
            this.location_dungeon,
            this.heart1,
            this.heart2,
            this.heart3
        ]);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.lastDirection = 'right';
        this.isAttacking = false;
        
        this.player.on('animationcomplete', (anim) => {

            if (anim.key === 'attackright' || anim.key === 'attackleft') {
                this.isAttacking = false;

                if (this.lastDirection === 'right') {
                    this.player.setTexture('walkright1');
                } else {
                    this.player.setTexture('walkleft1');
                }
            }
        });
        
        this.sword.on('animationcomplete', () => {
            this.sword.setVisible(false);
        });

    }


    update() {
        
        // ATTACK LOGIC
        
        switch (this.sword.anims.currentFrame?.textureKey){
            case 'swordright1':
                this.sword.setPosition(
                    this.player.x + 6,
                    this.player.y - 12
                );
                break;
            
            case 'swordleft1':
                this.sword.setPosition(
                    this.player.x - 6,
                    this.player.y - 12
                );
                break;
         
            case 'swordright2':
                this.sword.setPosition(
                    this.player.x + 13,
                    this.player.y - 10
                );
                break;
            
            case 'swordleft2':
                this.sword.setPosition(
                    this.player.x - 13  ,
                    this.player.y - 10
                );
                break;
            
            case 'swordright3':
                this.sword.setPosition(
                    this.player.x + 12,
                    this.player.y + 4
                );
                break;
            
            case 'swordleft3':
                this.sword.setPosition(
                    this.player.x - 12,
                    this.player.y + 4
                );
                break;
        }

        if (this.isAttacking) {
            if (this.player.body.velocity.y === 0){
                this.player.setVelocityX(0);
            }
            return;
        }

        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && !this.isAttacking) {
            this.isAttacking = true;
            if (this.player.body.velocity.y === 0){
                this.player.setVelocityX(0);
            }

            if (this.lastDirection === 'right') {
                this.player.anims.play('attackright',true);
                this.sword.setPosition(
                    this.player.x + 6,
                    this.player.y - 12
                );
                this.sword.anims.play('swordslashright', true);
                this.sword.setVisible(true);
            } else {
                this.player.anims.play('attackleft',true);
                this.sword.setPosition(
                    this.player.x - 6,
                    this.player.y - 12
                );
                this.sword.anims.play('swordslashleft', true);
                this.sword.setVisible(true);

            }
            return;
        }


        // WALK LOGIC

        if (this.player.body.blocked.down){
            if (Phaser.Input.Keyboard.JustDown(this.cursors.right) ){
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
        }

        if (this.cursors.left.isDown && this.cursors.right.isDown) {

            if (this.lastDirection === 'left') {
                this.player.setVelocityX(-this.playerxvelocity);
            } else {
                this.player.setVelocityX(this.playerxvelocity);
            }
        
        }else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.playerxvelocity);
        }else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.playerxvelocity);

        }else {
            this.player.setVelocityX(0);
            // this.footstep.stop();
            // this.player.anims.stop();
        }
        

        if(this.player.body.blocked.down){
            if (this.player.body.velocity.x === 0) {
                if(this.player.anims.currentAnim?.key !== 'attackright'){    
                    if (this.lastDirection === 'right'){
                        this.player.setTexture('walkright1');
                    }else {
                        this.player.setTexture('walkleft1');
                    }
                }
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
                this.player.anims.play('jumpright');
            }else {
                this.player.anims.play('jumpleft');
            }
        
        }
        
    
    }

}

