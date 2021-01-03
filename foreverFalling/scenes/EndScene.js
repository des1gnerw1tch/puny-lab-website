var aStar;
class EndScene extends Phaser.Scene{
  constructor() {
    super("enterEnd");
  }
  create()  {
    //pause old music
    music1.pause();
    music2.pause();
    //platforms
    var platforms = this.physics.add.staticGroup();
    platforms.create(400, 590, 'ground').setDepth(0);
    //moon and stars
    var moon = this.physics.add.group();
    moon.create(720, 80, 'moon').setDepth(0).setScale(.3).setAlpha(.4);
    var starGroup = this.physics.add.group();
    for (var i = 0; i < 40; i++) {
      aStar = starGroup.create(Phaser.Math.FloatBetween(0, 800), Phaser.Math.FloatBetween(0, 240), 'star').setScale(1);
      if (aStar.x >= 680 && aStar.x < 760 && aStar.y <= 120 && aStar.y >= 40)  {
        aStar.visible = false;
        console.log('Destroyed star on moon');
      }
      aStar.setDepth(-1);
    }
    //welcome home image
    this.add.image(400, 200, 'welcomeHome').setScale(.4);
    //hills backdrop
    var hills = this.add.sprite(400, 450, 'greenMountain').setDepth(-1);
    hills.anims.play('steam', true);
    //trees and foliage
    this.add.image(100, 470, 'foliage', 0).setDepth(-1);
    this.add.image(700, 470, 'foliage', 1).setDepth(-1);
    this.add.image(660, 518, 'foliage', 2).setDepth(-1).setScale(.5);
    //house
    this.add.image(530, 470, 'house').setScale(.6);
    //background color
    cStrato1 = new Phaser.Display.Color(69, 179, 224);
    this.cameras.main.setBackgroundColor(cStrato1);
    //keys
    keys = this.input.keyboard.addKeys('W,S,A,D,');
    cursors = this.input.keyboard.createCursorKeys();
    //player
    player = this.physics.add.sprite(400, 0, 'astronautPadded').setScale(.9);
    player.body.gravity.y = 800;
    //colliders
    this.physics.add.collider(player, platforms);
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
  //restarting to menu scene
  if (player.y > 600) {
    this.scene.start("startMenu");
  }
  }


}
