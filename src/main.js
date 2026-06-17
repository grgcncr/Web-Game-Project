import Phaser from 'phaser';
import GameScene from './scenes/GameScene';

const config = {
    type: Phaser.AUTO,
    width: 140,
    height: 100,
    pixelArt: true,
    roundPixels: true,
    backgroundColor: '#081820',
    fps: {
        target: 50,
        forceSetTimeOut: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            // debug: true
        }
    },
    scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
    scene: [GameScene]
};

new Phaser.Game(config);