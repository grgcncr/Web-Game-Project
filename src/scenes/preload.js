export function preload(GameScene) {
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
    
    this.load.image('platform', 'assets/rocktileset3/tilesets/rocktile3.png')


    
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

    this.load.image('skeletonright1', 'assets/skeletonright1.png')
    this.load.image('skeletonright2', 'assets/skeletonright2.png')
    this.load.image('skeletonleft1', 'assets/skeletonleft1.png')
    this.load.image('skeletonleft2', 'assets/skeletonleft2.png')
}