import Phaser from 'phaser';
import Skeleton from '../entities/skeleton';
export function create(GameScene) {
    this.physics.world.fixedStep = true;
    
    this.playerdamaged = false;
    this.invinsible = false;
    this.player = this.physics.add.sprite(150, 120, 'player');
    // this.player.setScale(1);
    this.cameras.main.startFollow(this.player);
    // this.cameras.main.setLerp(1,1);
    this.cameras.main.setDeadzone(80, 100);
    this.cameras.roundPixels = true;
    // UI CAMERA
    this.uiCamera = this.cameras.add(0, 0, 140, 100);
    this.uiCamera.setScroll(0, 0);
    this.uiCamera.roundPixels = true;
    
    // ENEMY CAMERA
    this.enemyCamera = this.cameras.add(0, 0, 100, 100);
    this.enemyCamera.ignore(this.player);
    // this.cameras.main.ignore(this.skeleton);
    
    this.player.body.setSize(9, 16);
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

    this.sword = this.physics.add.sprite(this.player.x + 7, this.player.y + 20, 'sword1');
    this.sword.body.setSize(13, 10);
    this.sword.body.setOffset(1, 0);
    this.sword.setVisible(false);
    this.sword.body.moves = false;
    // this.swordHitbox = this.physics.add.sprite(10, 100, null);
    // console.log(this.swordHitbox);
    // this.swordHitbox.body.setSize(16, 16);
    this.sword.body.setAllowGravity(false);
    // this.swordHitbox.setVisible(false);
    
    
    
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
            this.sword.body.enable = false;
        }
    });
    
    this.sword.on('animationcomplete', () => {
        this.sword.setVisible(false);
    });


    this.enemies = this.physics.add.group();

    this.skeleton = this.physics.add.sprite(190, 120, 'skeletonright1');
    this.skeleton.body.setSize(9, 16);
    this.skeleton.body.setOffset(3, 0);
    this.physics.add.collider(this.skeleton, groundLayer);
    this.skeleton.speed = 20;
    this.skeleton.direction = -1;
    this.enemies.add(this.skeleton);

    // this.skeleton.setCollideWorldBounds(true);    
    this.anims.create({
        key: 'skeletonwalkright',
        frames: [
            { key: 'skeletonright1' },
            { key: 'skeletonright2' }
        ],
        frameRate: 4,
        repeat: -1
    });
    this.anims.create({
        key: 'skeletonwalkleft',
        frames: [
            { key: 'skeletonleft1' },
            { key: 'skeletonleft2' }
        ],
        frameRate: 4,
        repeat: -1
    });
    
    this.physics.add.overlap(
        this.player,
        this.enemies,
        this.playerHit,
        null,
        this
    );

    this.physics.add.overlap(
        this.sword,
        this.enemies,
        this.skeletonHit,
        null,
        this
    );

    
    // this.physics.world.createDebugGraphic();
    
    // this.cameras.main.stopFollow();
    


    


    // Scanlines
    // const scanlines = this.add.graphics();

    // scanlines.lineStyle(
    //     1,
    //     0x000000,
    //     0.10
    // );

    // for (let y = 0; y < 100; y += 2) {
    //     scanlines.lineBetween(
    //         0,
    //         y,
    //         140,
    //         y
    //     );
    // }

    // scanlines.setScrollFactor(0);
    // scanlines.setDepth(9998);


    // // Vignette
    // const vignette = this.add.graphics();

    // vignette.fillStyle(
    //     0x000000,
    //     0.12
    // );

    // vignette.fillRect(
    //     0,
    //     0,
    //     140,
    //     100
    // );

    // vignette.setScrollFactor(0);
    // vignette.setDepth(9999);
}
