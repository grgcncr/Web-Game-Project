
import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('player', 'src/assets/orb.png');
    }

    create() {
        const player = this.add.image(400, 300, 'player');
        player.setScale(4);
    }
}