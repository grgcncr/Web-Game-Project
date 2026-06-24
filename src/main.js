import Phaser from 'phaser';
import GameScene from './scenes/GameScene';

const config = {
    type: Phaser.WEBGL,
    width: 140,
    height: 100,
    
    backgroundColor: '#081820',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            // debug: true
        }
    },
    scale: {
        // zoom: 10,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
        },
    pixelArt: true,
    antialias: false,   
    // roundPixels: true,
    scene: [GameScene]  
};

new Phaser.Game(config);