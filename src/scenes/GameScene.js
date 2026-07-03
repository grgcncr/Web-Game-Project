
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

    playerHit(player, skeleton) {

        // Ignore hits while invincible
        if (this.invincible) {
            return;
        }

        this.invincible = true;
        this.playerdamaged = true;

        if (skeleton.x < player.x) {
            player.setVelocityX(70);
        } else {
            player.setVelocityX(-70);
        }

        player.setVelocityY(-80);

        // End knockback after 150ms
        this.time.delayedCall(150, () => {
            this.playerdamaged = false;
        });

        // End invincibility after 700ms
        this.time.delayedCall(700, () => {
            this.invincible = false;
        });
    }

    skeletonHit(player, skeleton) {
        this.sword.body.enable = true;
        // Ignore hits while invincible
        // if (this.enemy_invincible) {
        //     return;
        // }

        // this.invincible = true;

        if (this.lastDirection === 'right' ) {
            skeleton.setVelocityX(70);
        } else {
            skeleton.setVelocityX(-70);
        }

        skeleton.setVelocityY(-80);

        // // End knockback after 150ms
        // this.time.delayedCall(150, () => {
        //     this.playerdamaged = false;
        // });

        // // End invincibility after 700ms
        // this.time.delayedCall(700, () => {
        //     this.invincible = false;
        // });
        this.sword.body.enable = false;
    }

    update() {
        this.headSensor.setPosition(
            this.player.x,
            this.player.y -10
        );
        if (this.playerdamaged) {
            this.time.addEvent({
                delay: 100,
                repeat: 6, // 7 flashes total = 700ms
                callback: () => {
                    this.player.visible = !this.player.visible;
                }
            });

            this.time.delayedCall(700, () => {
                this.player.visible = true;
                this.invincible = false;
            });
            return;
        }
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
            this.lastDirection = 'left';
        }else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.playerxvelocity);
            this.lastDirection = 'right';

        }else {
            if (!this.playerdamaged){
                this.player.setVelocityX(0);
            }
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
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.player.body.blocked.down && !this.blockedAbove) {
            this.player.setVelocityY(-this.playeryvelocity);
            if (this.lastDirection === 'right'){
                this.player.anims.play('jumpright');
            }else {
                this.player.anims.play('jumpleft');
            }
        
        } else {

            // FALL LOGIC
            if (!this.player.body.blocked.down && !this.isAttacking && !this.playerdamaged) {
                if (this.lastDirection === 'right') {
                    if (this.player.anims.currentAnim?.key !== 'jumpright') {
                        this.player.anims.timeScale = 2;
                        this.player.anims.play('jumpright');
                        this.player.anims.timeScale = 1;
                    }
                } else {
                    if (this.player.anims.currentAnim?.key !== 'jumpleft') {
                        this.player.anims.timeScale = 2;
                        this.player.anims.play('jumpleft');
                        this.player.anims.timeScale = 1;
                    }
                }
            }
        }

        if (this.skeleton.body.blocked.down){
            this.skeleton.setVelocityX(this.skeleton.speed * this.skeleton.direction); 
            // this.skeleton.x -= 0.1; 
            // this.skeleton.anims.pause();
            if (this.skeleton.direction === -1) {
                this.skeleton.anims.play('skeletonwalkleft', true)
            }else{
                this.skeleton.anims.play('skeletonwalkright', true)
            }

        }

        const blockedX = this.skeleton.body.blocked.left || this.skeleton.body.blocked.right;

        if (blockedX && !this.skeleton.wasBlockedX) {
            this.skeleton.direction *= -1;
        }

        this.skeleton.wasBlockedX = blockedX;
        
        
        // this.player.x = Math.round(this.player.x);
        // this.player.y = Math.round(this.player.y);

        // this.skeleton.x = Math.round(this.skeleton.x);
        // this.skeleton.y = Math.round(this.skeleton.y);
        // if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
        //     if (this.skeleton.texture.key === 'skeletonright1') {
        //         this.skeleton.setTexture('skeletonright2');
        //     } else {
        //         this.skeleton.setTexture('skeletonright1');
        //     }
        // }
        
    this.blockedAbove = false
    }

}

