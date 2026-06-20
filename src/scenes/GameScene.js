
import Phaser from 'phaser';
import { preload } from './preload';
import { create } from './create';
export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        preload.call(this);
    }

    create() {
        create.call(this);
    }


    update() {
        
        // ATTACK LOGIC
        
        switch (this.sword.anims.currentFrame?.textureKey){
            case 'swordright1':
                this.sword.setPosition(
                    this.player.x + 6,
                    this.player.y - 12
                );
                this.sword.body.enable = true;
                break;
            
            case 'swordleft1':
                this.sword.setPosition(
                    this.player.x - 6,
                    this.player.y - 12
                );
                this.sword.body.enable = true;
                break;
         
            case 'swordright2':
                this.sword.setPosition(
                    this.player.x + 13,
                    this.player.y - 10
                );
                // this.sword.body.enable = true;
                break;
            
            case 'swordleft2':
                this.sword.setPosition(
                    this.player.x - 13  ,
                    this.player.y - 10
                );
                // this.sword.body.enable = true;
                break;
            
            case 'swordright3':
                this.sword.setPosition(
                    this.player.x + 12,
                    this.player.y + 4
                );
                // this.sword.body.enable = true;
                break;
            
            case 'swordleft3':
                this.sword.setPosition(
                    this.player.x - 12,
                    this.player.y + 4
                );
                // this.sword.body.enable = true;
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
        
        if (this.skeleton.body.blocked.down){
            // this.skeleton.setVelocityX(this.skeleton.speed * this.skeleton.direction);
            if (this.skeleton.direction === -1) {
                this.skeleton.anims.play('skeletonwalkleft', true)
            }else{
                this.skeleton.anims.play('skeletonwalkright', true)
            }

        }

        if (
            this.skeleton.body.blocked.left ||
            this.skeleton.body.blocked.right
        ) {
            this.direction *= -1;
        }
        
    }

}

