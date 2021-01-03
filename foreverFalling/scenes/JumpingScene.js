var introObjects;
var timedBSpaceship;
var spaceshipSound;
var homeButton;
class JumpingScene extends Phaser.Scene{
  constructor(){
  /*  super ({
      key: CST.SCENES.LOAD
    })*/
    super("enterIntro");
  }

  create()  {
    //keys
    keys = this.input.keyboard.addKeys('W,S,A,D,');
    cursors = this.input.keyboard.createCursorKeys();
    timedKeyCatch = this.time.addEvent({ delay: 100, callback: this.resetKeys, callbackScope: this, loop: false });
    //background objects sounds
    spaceshipSound = this.sound.add('spaceshipSound');
    spaceshipSound.setVolume(.1);
      //Background
      for (var i = 0; i < 100; i++) {
        var aStar = this.add.image(Phaser.Math.FloatBetween(0, 800), Phaser.Math.FloatBetween(0, 600), 'star').setScale(1);
        aStar.setDepth(-1);
      }
      //background objects
      introObjects = this.physics.add.group();
      timedBSpaceship = this.time.addEvent({ delay: 10000, callback: this.placeBSpaceship, callbackScope: this, loop: true});
      this.placeBSpaceship();
      this.add.image(700, 100, 'saturn').setScale(1);

      //creating platforms
      var platforms = this.physics.add.staticGroup();
  /*    //silver platforms
    for (var i = 1; i <=4; i++) {

    var y = 330 + (48*i);
      for (var x = 320 + (48*i); x <= 800; x+=48) {
      platforms.create(x, y, 'spaceBlock', 0).setScale(1);
      }
    }
      //caution platforms
    platforms.create(368, 378, 'spaceBlock', 1);
    platforms.create(416, 378, 'spaceBlock', 1);
    platforms.create(464, 378, 'spaceBlock', 1);
    platforms.create(512, 378, 'spaceBlock', 1);
      //barrels!
      /*  platforms.create(640, 330, 'spaceBlock', 2);*/


    //asteroid ground
    platforms.create(500, 520, 'asteroidGround');
      //spacecraft
    var playerSpacecraft = platforms.create(690, 175, 'abandonedSpacecraft').setDepth(-1);
    playerSpacecraft.anims.play('shipSmoke', true);
      //player!
    player = this.physics.add.sprite(500, 200, 'astronautPadded').setScale(.9);
      //gravity
    player.body.gravity.y = 800;

    //colliders
    this.physics.add.collider(player, platforms);
    //home button
    homeButton = this.add.image(750, 50, 'houseIcon');
    homeButton.setInteractive();

    homeButton.on("pointerup", ()=>  {
      this.scene.start("startMenu");
    })

  }
  update()  {
    if (wasdOn) {
      if (keys.A.isDown)  {
        player.setVelocityX(-200);
        player.anims.play('left', true);
      }
      else if (keys.D.isDown) {
        player.setVelocityX(200);
        player.anims.play('right', true);
      } else {
        player.setVelocityX(0);
        player.anims.play('idle', true);
      }
      if (keys.W.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
      }
  } else {
    if (cursors.left.isDown)  {
      player.setVelocityX(-200);
      player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
      player.setVelocityX(200);
      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);
      player.anims.play('idle', true);
    }
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }

    if (player.y > 600) {
      this.scene.start("enterGame");
    }

    introObjects.children.iterate(function (child) {
        //bit found in code that works, no idea what it does. ..
      if (child == undefined)
          return;
      if (child.x >= 800)  {
          child.destroy();
        }
    })
  }
//temporary fix to movement glitch. resets the keys 100 ms after scene starts
  resetKeys() {
    keys.A.isDown = false;
    keys.D.isDown = false;
    keys.W.isDown = false;
    cursors.left.isDown= false;
    cursors.right.isDown= false;
    cursors.up.isDown= false;
  }
  placeBSpaceship() {
    var rand = Phaser.Math.Between(0, 5);
    if (rand == 0)  {
      var ship = introObjects.create(-22, Phaser.Math.Between(0, 200), 'spaceship');
      ship.setScale(.2);
      ship.setAngle(90);
      ship.anims.play('aSpaceship', true);
      ship.setVelocityX(100);
      ship.setAccelerationX(500);
      if (soundOn)
        spaceshipSound.play();
    }
  }

}
