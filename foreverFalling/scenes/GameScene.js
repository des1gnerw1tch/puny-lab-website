/* TO DO:
Mesosphere and Stratosphere tweaks and changes
spaceship scene art and background!
Add rainbow to end scenes
Completely redesign mesosphere, and stratosphere also.
*/
var player;
var platforms;
var timedBackground;
var timedSwitch;
  //timers
var timedMeteor;
var timedSatellite;
var timedStone;
var timedBackground;
var timedStar;
var timedFireball;
var timedLMonster;
var timedEnergyBall;
var timedFairy;
var timedKeyCatch;
var timedSpaceship;
var timedIceCloud;
var timedPlane;
var timedBird;
var timedUFO;
var timedTime;
//input
var keys;
var cursors;
//background
var spaceBackground;
var hexColor;
//atmosphere colors
var sky;
var cExo;
var cThermo;
var cIon;
var cMeso;
var cStrato1;
var cStrato2;

var counter;
var stars;
var rect;
var randomRect;
var movingScreen;
var backgroundImages;
var starsDestroyed = 0;

var gameOver = false;
var level = 0;
//UI and Misc
var atmosphere; // text holder for atmosphere player is in
var atmosphereText;
var children; // dont know why this has to be here
var debug;
var showDebug = false;
var seconds;
var acceleration;
var altitude;
var altitudeText;
//obstacles
var flyingObject;
var birdGroup;
var lavaMonGroup;
var ufoGroup;
var birdVelocity;
var timeText;
//particles (Not usable yet)
var particles;
var emitter;
//death stuff
var isDead;
//colliders
var playerCollider1;
var playerCollider2;
var playerCollider3;
var playerCollider4;
//green mountains
var greenMountain;

class GameScene extends Phaser.Scene{
  constructor(){
  /*  super ({
      key: CST.SCENES.LOAD
    })*/
    super("enterGame");
  }

  create()  {
    if (soundOn)  {
      music1.play();
      music1.setVolume(1);
      music2.setVolume(1);
    }
      //sky colors and player rotation
    sky = new Phaser.Display.Color(120, 120, 255);
    cExo = new Phaser.Display.Color(0, 0, 0);
    cThermo = new Phaser.Display.Color(200, 34, 0);
    cIon = new Phaser.Display.Color(141, 5, 182);
    cMeso = new Phaser.Display.Color(8, 18, 107);
    cStrato1 = new Phaser.Display.Color(69, 179, 224);
    cStrato2 = new Phaser.Display.Color(201, 233, 246);

    timedBackground = this.time.addEvent({ delay: 10, callback: this.moveBackground, callbackScope: this, loop: true });
    //fix for movement glitch
    timedKeyCatch = this.time.addEvent({ delay: 100, callback: this.resetKeys, callbackScope: this, loop: false });
      //Flying Obstacles
    flyingObject = this.physics.add.group ();
    birdGroup = this.physics.add.group();
    lavaMonGroup = this.physics.add.group();
    ufoGroup = this.physics.add.group();
    //Bird group

      //Game background images
    backgroundImages = this.physics.add.group();
    starsDestroyed = 0;
      //keyboard input
    keys = this.input.keyboard.addKeys('W,S,A,D,Z');
    cursors = this.input.keyboard.createCursorKeys();
      //levels and progression
    level = 0;
    altitude = 750;
    seconds = 0;
    acceleration = 80/867;
    timedTime = this.time.addEvent({ delay: 100, callback: this.changeTime, callbackScope: this, loop: true });
    debug = this.add.text(32, 32, '',  {fill: '#00ff00' });

    atmosphereText = this.add.text(500, 50, '', {fontSize: 32}).setDepth(1);
    altitudeText = this.add.text(500, 80, '', {fontSize: 16}).setDepth(1);

    this.switchLevel();
    timedSwitch = this.time.addEvent({ delay: 25500, callback: this.switchLevel, callbackScope: this, loop: true });
  //  timedSwitch = this.time.addEvent({ delay: 1000, callback: this.switchLevel, callbackScope: this, loop: true });

      //player
    player = this.physics.add.sprite(400, 0, 'astronaut').setScale(.9);
    player.anims.play('idle', true);
    player.body.collideWorldBounds=true;
    isDead = false;
      //colliders

    playerCollider1 = this.physics.add.overlap(player, flyingObject, this.hitObject, null, this);
    playerCollider2 = this.physics.add.overlap(player, birdGroup, this.hitObject, null, this);
    playerCollider3 = this.physics.add.overlap(player, lavaMonGroup, this.hitObject, null, this);
    playerCollider4 = this.physics.add.overlap(player, ufoGroup, this.hitObject, null, this);

        //Background images of stars/ planets
      for (var i = 0; i < 50; i++) {
        var aStar = backgroundImages.create(Phaser.Math.FloatBetween(0, 800), Phaser.Math.FloatBetween(0, 600), 'star');
        aStar.setDepth(-1);
        aStar.setVelocityY(-20);
      }

      backgroundImages.create(700, 750, 'bigPlanet1').setScale(1).setVelocityY(-20).setDepth(-1);
      //home button
      homeButton = this.add.image(750, 50, 'houseIcon').setDepth(1);
      homeButton.setInteractive();

      homeButton.on("pointerup", ()=>  {
        music1.pause();
        music2.pause();
        this.scene.stop("enterKill");
        this.scene.start("startMenu");
      })
  }



  update () {
    /*DEBUG
    When debug menu is open, player does not collide with objects, as the hitObject
    function will fire but nothing will happen*/
/*
    if (this.input.keyboard.checkDown(keys.Z, 1000))  {
      if (showDebug)  {
      showDebug = false;
      } else {
        showDebug = true;
      }
    }

    if (showDebug)  {
      debug.setText('timedSwitch Progress: ' + timedSwitch.getProgress().toString().substr(0, 4) + '\n Level: ' + atmosphere + '\n counter ' + counter
      + '\n stars destroyed : ' + starsDestroyed + '\nLeft Down? : ' + keys.A.isDown + '\nRight Down? : ' + keys.D.isDown
       + '\nbird velocity:' + birdVelocity + '\nIs Dead?' + isDead
     + '\ntime: ' + seconds + ' s' + '\naltitude: ' + altitude.toFixed(2) + ' km');
    } else {
      debug.setText('');
    }
*/


    //level UI
    atmosphereText.setText(atmosphere);
    altitude = 820 - ((acceleration * Math.pow(seconds, 2)/2) );
    altitudeText.setText('Altitude ' + altitude.toFixed(2) + ' km');

    //respawn after death with space bar
    if (cursors.space.isDown && isDead && player.y < 0) {
      cursors.space.isDown = false;
      this.scene.stop("enterKill");
    //  this.scene.start("enterIntro");
      this.scene.start("enterGame");
    }

    //Player movement
    if (wasdOn) {
      if (keys.A.isDown)  {
        player.setAccelerationX(-700);
        player.anims.play('left', true);
      }
      else if (keys.D.isDown) {
        player.setAccelerationX(700);
        player.anims.play('right', true);
      } else {
        player.setAccelerationX(0);
      }
    } else {
      if (cursors.left.isDown)  {
        player.setAccelerationX(-700);
        player.anims.play('left', true);
      }
      else if (cursors.right.isDown) {
        player.setAccelerationX(700);
        player.anims.play('right', true);
      } else {
        player.setAccelerationX(0);
      }
    }

    /*Beginning falling. Player will first fall down from the spaceship. Then
    when his y position hits greater than 300, there will be no more force of
    gravity. Once the game is completed (leve 6), these rules are negated and
    enter end will happen once player drops through floor*/
    if (player.y > 300 && level != 6 && !isDead) {
      player.body.allowGravity = false;
      player.setVelocityY(0);
    } else if (player.y < 300 && level != 6 && !isDead) {
        player.body.gravity.y = 800;
    } else if(player.y > 600 && !isDead) {
      this.scene.start("enterEnd");
    }

    /*Destroying old Objects when they go off screen.
    ------------------------------------------ -------------------------*/
    flyingObject.children.iterate(function (child) {
        //bit found in code that works, no idea what it does. ..
        if (child == undefined)
            return;
        if (child.y < -200)  {
            child.destroy();
          }
    })
    //destroying background images
    backgroundImages.children.iterate(function (child) {
        //bit found in code that works, no idea what it does. ..
      if (child == undefined)
          return;
      //background images pause when win
      if (level == 6) {
          child.setVelocityY(0);
      }
      //on last level, background images will pause, will not keep scrolling by
      if (level == 5 && isDead) {
        child.setVelocityY(0);
      }
      if (child.y < -300)  {
          child.destroy();
          starsDestroyed++;
        }


    })
  /*----------------------------------------------------------------------------------------*/
  //makes the birds move in a sinisouidel way
  birdVelocity = Math.sin(timedSwitch.getProgress() *20) * 300;
  birdGroup.children.iterate(function (child) {
      //bit found in code that works, no idea what it does. ..
      if (child == undefined) {
          return;
        }
      child.setVelocityY(Math.sin(timedSwitch.getProgress() * 40) * 300);
      if (child.x > 850 || child.x < -50)  {
        child.destroy();
      }
  })
  /*smart living obstacles will move smart, chasing the player rather than just
  going by. */
  lavaMonGroup.children.iterate(function (child) {
      //bit found in code that works, no idea what it does. ..
      if (child == undefined) {
          return;
        }

      if (child.y + 30 > player.y) {
        if (child.x - player.x < -10)  {
          child.setVelocityX(100);
          child.setAngle(30);
        } else if (child.x - player.x > 10)  {
          child.setVelocityX(-100);
          child.setAngle(-30);
        } else {
          child.setVelocityX(0);
          child.setAngle(0);
        }
    }
    if (child.y < -300) {
      child.destroy();
    }

  })

  ufoGroup.children.iterate(function (child) {
      //bit found in code that works, no idea what it does. ..
      if (child == undefined) {
          return;
        }


      if (child.x - player.x < -20 && player.x > -10 && player.x < 810) {
        child.setVelocityX(200);
      } else if (child.x - player.x > 20 && player.x > -10 && player.x < 810)  {
        child.setVelocityX(-200);
      } else {
        child.setVelocityX(0);
      }

      if (child.y < 500)  {
        child.setAccelerationY(-600);
      }
      if (child.y < -300) {
        child.destroy();
      }

  })

  }

//background star placement
  placebStar()  {

    var nextStar;
    nextStar = backgroundImages.create(Phaser.Math.FloatBetween(0, 800), 650, 'star');
    nextStar.setDepth(-1);
    nextStar.setVelocityY(-20);
//  nextStar.setVelocityY(Phaser.Math.Between(1, 3));
  }

/*Hit objects spawn functions
------------------------------------------------------------------------
*/
  placeMeteor()  {
    //Meteor movement

    var nextMeteor;
    nextMeteor = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 650, 'meteor');
    //random meteor skin
    var num = Phaser.Math.Between(0, 2);
    switch (num)  {
      case 0: nextMeteor.anims.play('m0', true);
      break;
      case 1: nextMeteor.anims.play('m1', true);
      break;
      case 2: nextMeteor.anims.play('m2', true);
      break;
      case 3: nextMeteor.anims.play('m3', true);
      break;
      case 4: nextMeteor.anims.play('m4', true);
      break;
      case 5: nextMeteor.anims.play('m5', true);
      break;
    }

      //meteors will turn red when in thermosphere, need to add counter
    if (level == 2 && counter >= 350)
      nextMeteor.setTint(0xff0000);

    nextMeteor.setScale(Phaser.Math.FloatBetween(.5, .7));
    nextMeteor.setVelocityX(Phaser.Math.FloatBetween(-10, 10));
    nextMeteor.setVelocityY(-200);
    nextMeteor.setAngularVelocity(Phaser.Math.Between(-200, 200));
  //  nextMeteor.setAngularVelocity(Phaser.Math.FloatBetween(0,100));

  }

  placeSatellite()  {
    //Satellite movement
    var nextSatellite;
    nextSatellite = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 650, 'satellite');
    nextSatellite.setScale(.5);
    nextSatellite.setVelocityX(Phaser.Math.FloatBetween(-10, 10));
    nextSatellite.setVelocityY(-100);
    nextSatellite.setAngularVelocity(Phaser.Math.FloatBetween(10,50));
    nextSatellite.anims.play('aSatellite', true);

  }

  placeStone()  {
    //Stone movement
    var nextStone;
    nextStone = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 650, 'stone');
    nextStone.setScale(2);
    nextStone.setVelocityX(Phaser.Math.FloatBetween(-10, 10));
    nextStone.setVelocityY(-230);
    nextStone.setAngularVelocity(Phaser.Math.FloatBetween(0,100));

  }

  placeFireball() {
    var nextFireball;
    if (counter> 100) {
      nextFireball = flyingObject.create(Phaser.Math.Between(0, 800), 650, 'fireball');
      nextFireball.setScale(.7);
    //  nextFireball.setScale(1);
      var velocityX = Phaser.Math.FloatBetween(-50, 50);
      var velocityY = -320;
      nextFireball.setVelocityX(velocityX);
      nextFireball.setVelocityY(velocityY);
      //makes sure velocity vector and angle is correct lined up
      if (velocityX > 0)  {
        var angle = 90 - (Phaser.Math.RAD_TO_DEG * Math.atan(300 / velocityX));
      } else if (velocityX < 0) {
        var angle = 90- (180 + Phaser.Math.RAD_TO_DEG * Math.atan(300 / velocityX));
      }
      nextFireball.setAngle(angle);
    //  nextFireball.setAngularVelocity(Phaser.Math.FloatBetween(0,20));
  }

  }

  placeLMonster() {
    var nextLMonster;
    nextLMonster = lavaMonGroup.create(Phaser.Math.FloatBetween(200, 600), 650, 'lavaMonster');
    nextLMonster.setScale(1);
    nextLMonster.setVelocityY(-100);
    nextLMonster.anims.play('aLavaMonster', true);
  }

  placeEnergyBall() {
    if (counter > 200)  {
      var nextEnergyBall;
      nextEnergyBall = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 650, 'energyBall');
      nextEnergyBall.setScale(.5);
      nextEnergyBall.setVelocityX(Phaser.Math.FloatBetween(-50, 50));
      nextEnergyBall.setVelocityY(-100);
      nextEnergyBall.anims.play('aEnergyBall', true);
      nextEnergyBall.setAngularVelocity(Phaser.Math.FloatBetween(200, 250));
    }
  }

  placeFairy()  {
    var nextFairy;
    nextFairy = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 650, 'fairy');
    nextFairy.setScale(.5);
    nextFairy.setVelocityX(Phaser.Math.FloatBetween(-10, 10));
    nextFairy.setVelocityY(-120);
    nextFairy.setAngle(-10);
    nextFairy.anims.play('aFairy', true);
    nextFairy.setAngularVelocity(Phaser.Math.FloatBetween(-1, -2));
  }

  placeSpaceship()  {
    var num = Phaser.Math.Between(0, 7);
    if (num == 0 && counter > 400) {
      var nextSpaceship;
      nextSpaceship = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 650, 'spaceship');
      nextSpaceship.setScale(1);
      nextSpaceship.setVelocityY(-320);
      nextSpaceship.setAngle(0);
      nextSpaceship.anims.play('aSpaceship', true);
    }
  }

  placeIceCloud()  {
      var nextCloud;
      nextCloud = flyingObject.create(Phaser.Math.FloatBetween(0, 800), 700, 'iceCloud');
      nextCloud.setScale(.5);
      nextCloud.setVelocityY(-100);
      nextCloud.setAngle(0);
      nextCloud.anims.play('aIceCloud', true);
    }

  placeUFO()  {
    if (timedSwitch.getProgress() < .70)  {
      var next;
      next = ufoGroup.create(Phaser.Math.FloatBetween(0, 800), 700, 'ufo');
      next.setScale(.5);
      next.setVelocityY(-40);
      next.anims.play('aUFO', true);
  }
  }

  placePlane()  {
    if (counter > 0)  {
      var nextPlane;
      var posY = Phaser.Math.Between(0, 600);
      nextPlane = flyingObject.create(-100, posY, 'plane');
      nextPlane.setVelocityX(Phaser.Math.Between(100, 500));
      nextPlane.anims.play('aPlane', true);
      nextPlane.setScale(.75);
      /*ensures that there will be a chance of dodging when plane spawns.
      When plane is spawned in the upper half, it will have a velocity that sends
      the plane down, vice versa. Also sets plane angle corresponding to direction*/
      if (posY > 300) {
        var velY = Phaser.Math.Between(-300, 0);
        nextPlane.setVelocityY(velY);
        nextPlane.setAngle(velY/10);
      } else if (posY < 300)  {
        var velY = Phaser.Math.Between(0, 300);
        nextPlane.setVelocityY(velY);
        nextPlane.setAngle(velY/10);
      }

      if (posY < 384 && posY > 216 && velY < 100) {
        nextPlane.destroy();
        this.placePlane()
      }
    }

  }

  placeBird()  {
      var num = Phaser.Math.Between(1,2);
      //Right facing birds
      if (num == 1 && counter > 50) {
        var next;
        next = birdGroup.create(0, Phaser.Math.Between(100, 500), 'bird');
        next.setScale(1);
        next.setVelocityX(200);
        next.setAngle(0);
        var rand = Phaser.Math.Between(1, 3);
        switch (rand){
          case 1:
            next.anims.play('aBBird', true);
            break;
          case 2:
            next.anims.play('aRBird', true);
            break;
          case 3:
            next.anims.play('aYBird', true);
            break;
        }
      }
        //left facing birds
        if (num == 2 && counter > 200) {
          var next;
          next = birdGroup.create(800, Phaser.Math.Between(100, 500), 'birdFacingLeft');
          next.setScale(1);
          next.setVelocityX(-200);
          next.setAngle(0);
          var rand = Phaser.Math.Between(1, 3);
          switch (rand){
            case 1:
              next.anims.play('aBBirdLeft', true);
              break;
            case 2:
              next.anims.play('aRBirdLeft', true);
              break;
            case 3:
              next.anims.play('aYBirdLeft', true);
              break;
          }
      }
}




  //------------------------------------------------------------------


  hitObject() {
    if (!showDebug) {
      isDead = true;
    /*  player.setTint(0xff0000);
      keys.A.isDown = false;
      keys.D.isDown = false;
      this.scene.pause("enterGame");*/
      keys.A.isDown = false;
      keys.D.isDown = false;
      timedSwitch.paused = true;
      timedTime.paused = true;
      player.body.collideWorldBounds = false;
      player.setVelocityY(-400);
      playerCollider1.destroy();
      playerCollider2.destroy();
      playerCollider3.destroy();
      playerCollider4.destroy();
      if (level == 5) {
        greenMountain.setVelocityY(0);
      }
      if (soundOn)
        soundBack.play();
      this.scene.launch("enterKill", atmosphere);
    }
  }

  moveBackground() {
    player.angle += 5;
  }

  changeTime()  {
    seconds += .1;
  }
    //temporary fix to movement glitch. resets the keys 100 ms after scene starts
  resetKeys() {
    keys.A.isDown = false;
    keys.D.isDown = false;
    cursors.left.isDown = false;
    cursors.right.isDown = false;
  }
//will fade a sound out
  fadeSound()  {
    music1.setVolume(.3);
  }
    /*this function switches the background color with a counter and interpolate.
    Is called multiple times until paused. the Switch is used so that the right colors
    are switched for each level.
    */
  switchBackgroundColor() {
    counter++;
    switch(level) {
      case 2:
        if (counter <= 600) {
          hexColor = Phaser.Display.Color.Interpolate.ColorWithColor(cExo, cThermo, 600, counter);
          this.cameras.main.setBackgroundColor(hexColor);
        } else {
          timedBackground.paused = true;
          }
        break;
      case 3:
        if (counter <= 600) {
          hexColor = Phaser.Display.Color.Interpolate.ColorWithColor(cThermo, cIon, 600, counter);
          this.cameras.main.setBackgroundColor(hexColor);
          } else {
          timedBackground.paused = true;
          }
        break;
      case 4:
        if (counter <= 600) {
          hexColor = Phaser.Display.Color.Interpolate.ColorWithColor(cIon, cMeso, 600, counter);
          this.cameras.main.setBackgroundColor(hexColor);
          if (soundOn)  {
            music1.setVolume(1 - (counter/600));
            music2.setVolume(counter/600);
          }
          } else {
            timedBackground.paused = true;
          }
        break;
      case 5:
        if (counter <= 600) {
          hexColor = Phaser.Display.Color.Interpolate.ColorWithColor(cMeso, cStrato1, 600, counter);
          this.cameras.main.setBackgroundColor(hexColor);
          }
        else {
          timedBackground.paused = true;
          }
        break;

    }



  }

    //function to change the level !
  switchLevel() {
    level += 1;

    switch(level) {
      case 1:
        atmosphere = "Exosphere";
        timedMeteor = this.time.addEvent({ delay: 2000, callback: this.placeMeteor, callbackScope: this, loop: true });
        timedSatellite = this.time.addEvent({ delay: 5000, callback: this.placeSatellite, callbackScope: this, loop: true });
        timedStone = this.time.addEvent({ delay: 1000, callback: this.placeStone, callbackScope: this, loop: true });
        timedStar = this.time.addEvent({ delay: 500, callback: this.placebStar, callbackScope: this, loop: true });
        break;
      case 2:
        atmosphere = "Thermosphere";
        counter = 0;
        timedBackground = this.time.addEvent({ delay: 20, callback: this.switchBackgroundColor, callbackScope: this, loop: true });
          //pausing old objects so that they don't spawn
        timedSatellite.paused = true;
        timedStone.paused = true;
        //starting new spawns
        timedFireball = this.time.addEvent({ delay: 600, callback: this.placeFireball, callbackScope: this, loop: true });
        timedLMonster = this.time.addEvent({ delay: 5000, callback: this.placeLMonster, callbackScope: this, loop: true });
        backgroundImages.create(600, 900, 'swanNebula').setVelocityY(-20).setDepth(-1).setAlpha(.8);
        break;
      case 3:
        atmosphere = "Ionosphere";
        counter = 0;
        timedBackground = this.time.addEvent({ delay: 20, callback: this.switchBackgroundColor, callbackScope: this, loop: true });
        //pausing old objects
        timedMeteor.paused = true;
        timedFireball.paused = true;
        timedLMonster.paused = true;

        //starting new spawns
        timedEnergyBall = this.time.addEvent({delay: 200, callback: this.placeEnergyBall, callbackScope: this, loop: true});
        timedFairy = this.time.addEvent({delay: 6000, callback: this.placeFairy, callbackScope: this, loop: true});
        backgroundImages.create(200, 750, 'pluto').setScale(1).setVelocityY(-20).setDepth(-1);
        break;
        case 4:
          atmosphere = 'Mesosphere';
          counter = 0;
          timedBackground = this.time.addEvent({ delay: 20, callback: this.switchBackgroundColor, callbackScope: this, loop: true });
          timedSwitch.destroy();
          timedSwitch = this.time.addEvent({ delay: 30000, callback: this.switchLevel, callbackScope: this, loop: true });
          //pausing old hitobjects
          timedEnergyBall.paused = true;
          timedFairy.paused = true;

          //starting new spawns
          timedSpaceship = this.time.addEvent({delay: 150, callback: this.placeSpaceship, callbackScope: this, loop: true});
          timedIceCloud = this.time.addEvent({delay: 6000, callback: this.placeIceCloud, callbackScope: this, loop: true});
          timedUFO = this.time.addEvent({delay: 4000, callback: this.placeUFO, callbackScope: this, loop: true});
          backgroundImages.create(600, 900, 'mesosPlanet').setScale(1).setVelocityY(-20).setDepth(-1);

          //new music
          if (soundOn)
            music2.play();
          break;
        case 5:
          atmosphere = 'Stratosphere'
          counter = 0;
          timedBackground = this.time.addEvent({ delay: 20, callback: this.switchBackgroundColor, callbackScope: this, loop: true });
          timedSwitch.destroy();
          timedSwitch = this.time.addEvent({ delay: 25500, callback: this.switchLevel, callbackScope: this, loop: true });
            //paused old objects
          timedSpaceship.paused = true;
          timedIceCloud.paused = true;
          timedUFO.paused = true;
          //new objects
          timedPlane = this.time.addEvent({delay: 5000, callback: this.placePlane, callbackScope: this, loop: true});
          timedBird = this.time.addEvent({delay: 600, callback: this.placeBird, callbackScope: this, loop: true});
          greenMountain = backgroundImages.create(400, 1000, 'greenMountains').setVelocityY(-20).setDepth(-1);
          greenMountain.anims.play('steam', true);
          break;
        case 6:
          timedPlane.paused = true;
          timedBird.paused = true;
          player.body.allowGravity = true;
          player.body.gravity.y = 800;
          player.body.collideWorldBounds=false;
          break;

    }
  }
    //different case levels = new atmospheres!

}
