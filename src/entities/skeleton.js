import Phaser from 'phaser';

export default class Skeleton
extends Phaser.Physics.Arcade.Sprite {

    constructor(GameScene, x, y) {

        super(GameScene, x, y, 'skeletonright1');

        GameScene.add.existing(this);
        GameScene.physics.add.existing(this);

        this.speed = 20;
        this.direction = -1;
    }

    update() {
        
    }
}