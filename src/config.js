import Phaser from 'phaser';

const config = {
    type: Phaser.AUTO,

    width: 800,
    height: 600,

    pixelArt: true,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    scene: [GameScene]
};

new Phaser.Game(config);