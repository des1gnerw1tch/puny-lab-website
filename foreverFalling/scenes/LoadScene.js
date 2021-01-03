class LoadScene extends Phaser.Scene{
  constructor(){
  /*  super ({
      key: CST.SCENES.LOAD
    })*/
    super("loadGame");
  }

  preload() {

    //loading text
    var loadingText = this.make.text({
      x: 300,
      y: 260,
      text: 'Loading Game... ;)',
      style: {
      //    font: '20px monospace',
          fill: '#ffffff'
      }
  });
  //loading box
  var progressBox = this.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(237.5, 290, 325, 50);
    //loading bar
  let loadingBar = this.add.graphics({
    fillStyle: {
      color: 0x32CD32 // green
    }
  })
  //progress bar movement
  this.load.on("progress", (percent)=>{
  loadingBar.fillRect(250, 300, 300 * percent, 30);
  loadingText.setText('Loading Game... ' + Math.trunc(percent* 100)  + "%")
  })
  //asset loading text
  var fileText = this.add.text(300, 340);
  this.load.on('fileprogress', function (file) {
    fileText.setText(file.src);
  });
  //complete loading event listener
  this.load.on('complete', function () {
    loadingText.destroy();
    progressBox.destroy();
    loadingBar.destroy();
    fileText.destroy();
  });

    this.load.image('space', 'assets/space.png');
      //loading hitobjects
    this.load.spritesheet('meteor', 'assets/meteorMe.png', {frameWidth: 119, frameHeight: 120});
    this.load.image('stone', 'assets/stone.png');
    this.load.image('fireball', 'assets/fireball.png');
    this.load.spritesheet('lavaMonster', 'assets/lavaMonster.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('energyBall', 'assets/energyBall.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('fairy', 'assets/fairy.png', {frameWidth: 87, frameHeight: 87});
    this.load.spritesheet('spaceship', 'assets/spaceship.png', {frameWidth: 36, frameHeight: 96});
    this.load.spritesheet('iceCloud', 'assets/iceClouds.png', {frameWidth: 192, frameHeight: 114});
    this.load.spritesheet('plane', 'assets/plane.png', {frameWidth: 192, frameHeight: 84});
    this.load.spritesheet('satellite', 'assets/satellite.png', {frameWidth: 180, frameHeight: 186});
    this.load.spritesheet('bird', 'assets/bird.png', {frameWidth: 42, frameHeight: 28});
    this.load.spritesheet('birdFacingLeft', 'assets/birdFaceL.png', {frameWidth: 42, frameHeight: 28});
    this.load.spritesheet('ufo', 'assets/ufo.png', {frameWidth: 168, frameHeight: 84});
      //load UI.
    this.load.image('title', 'assets/title.png');
    this.load.image('mountains', 'assets/mountains2.png');
    this.load.image('playButton', 'assets/play.png');
    this.load.image('optionsButton', 'assets/options.png');
    this.load.image('extrasButton', 'assets/extras.png');
    this.load.image('volumeButton', 'assets/volume.png');
    this.load.image('controlsButton', 'assets/controls.png');
    this.load.image('backButton', 'assets/back.png');
    this.load.image('on', 'assets/on.png');
    this.load.image('off', 'assets/off.png');
    this.load.image('wasd', 'assets/wasd.png');
    this.load.image('arrows', 'assets/arrows.png');
    this.load.image('gameOver', 'assets/gameOver.png');
    this.load.image('playAgain', 'assets/playAgain.png');
    this.load.image('houseIcon', 'assets/houseIcon.png');
  //  this.load.image('bluePanel', 'spaceUI/PNG/metalPanel_blue.png');
    //songs
    this.load.audio('spaceTheme1', 'assets/spaceTheme1.mp3');
    this.load.audio('spaceTheme2', 'assets/spaceTheme2.m4a');
    this.load.audio('menuMusic', 'assets/titleMusic.m4a');
    //sound effects
    this.load.audio('yeet', 'assets/maxyeet.m4a');
    this.load.audio('datBei', 'assets/maxdatbei.m4a');
    this.load.audio('playPlay', 'assets/play.wav');
    this.load.audio('playSelect', 'assets/select.wav');
    this.load.audio('playBack', 'assets/back.wav');
    this.load.audio('spaceshipSound', 'assets/spaceship.wav');
      //background objects
    this.load.image('star', 'assets/star.png');
    this.load.image('smallMars', 'assets/smallMars.png');
    this.load.image('saturn', 'assets/saturn.png');
    this.load.image('bigPlanet1', 'assets/bigPlanet1.png');
    this.load.image('pluto', 'assets/pluto.png');
    this.load.image('mesosPlanet', 'assets/mesosPlanet.png');
    this.load.image('moon', 'assets/moon.png');
    this.load.spritesheet('foliage', 'assets/foliage.png', {frameWidth: 200, frameHeight: 200});
    this.load.image('welcomeHome', 'assets/welcomeHome.png');
    this.load.image('house', 'assets/house.png');
    this.load.image('swanNebula', 'assets/swanNebula.png');
    this.load.spritesheet('greenMountains', 'assets/greenMountains.png', {frameWidth: 800, frameHeight: 250});
    this.load.spritesheet('abandonedSpacecraft', 'assets/abandonedSpacecraft.png', {frameWidth: 168, frameHeight: 360});
      //terrain and ground
    this.load.image('ground', 'assets/ground.png');
    this.load.image('asteroidGround', 'assets/asteroidGround.png');
    this.load.spritesheet('spaceBlock', 'assets/spaceBlock.png', {frameWidth: 48, frameHeight: 48});
      //Sprites
    /* without padding, hitboxes are better but there is some pixel bleeding
    when animating*/
    this.load.spritesheet('astronaut', 'assets/myAstronaut.png', { frameWidth: 36, frameHeight: 45 });
    this.load.spritesheet('astronautPadded', 'assets/astronautPadding.png', { frameWidth: 42, frameHeight: 51 });
        //theme music




}

  create () {
    //animations -------------------------------------------------------------
    //player movement
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('astronautPadded', {start: 4, end: 7}),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('astronautPadded', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('astronautPadded', {start: 8, end: 8}),
      frameRate: 10,
      repeat: -1
    })


    //Meteor Types
    this.anims.create({
      key: 'm0',
      frames: [ { key: 'meteor', frame: 0 } ],
      frameRate: 20,
    })
    this.anims.create({
      key: 'm1',
      frames: [ { key: 'meteor', frame: 1 } ],
      frameRate: 20,
    })
    this.anims.create({
      key: 'm2',
      frames: [ { key: 'meteor', frame: 2 } ],
      frameRate: 20,
    })
    this.anims.create({
      key: 'm3',
      frames: [ { key: 'meteor', frame: 3 } ],
      frameRate: 20,
    })
    this.anims.create({
      key: 'm4',
      frames: [ { key: 'meteor', frame: 4 } ],
      frameRate: 20,
    })
    this.anims.create({
      key: 'm5',
      frames: [ { key: 'meteor', frame: 5 } ],
      frameRate: 20,
    })

    //Lava Dude
    this.anims.create({
      key: 'aLavaMonster',
      frames: this.anims.generateFrameNumbers('lavaMonster', {start: 0, end: 6}),
      frameRate: 12,
      repeat: -1
    })

    //Energy Ball animations
    this.anims.create({
      key: 'aEnergyBall',
      frames: this.anims.generateFrameNumbers('energyBall', {start: 0, end: 6}),
      frameRate: 48,
      repeat: -1
    })

    //Fairy animations
    this.anims.create({
      key: 'aFairy',
      frames: this.anims.generateFrameNumbers('fairy', {start: 0, end: 2}),
      frameRate: 10,
      repeat: -1
    })

    //Spaceship animations
    this.anims.create({
      key: 'aSpaceship',
      frames: this.anims.generateFrameNumbers('spaceship', {start: 0, end: 1}),
      frameRate: 18,
      repeat: -1
    })

    //Ice cloud animations
    this.anims.create({
      key: 'aIceCloud',
      frames: this.anims.generateFrameNumbers('iceCloud', {start: 0, end: 2}),
      frameRate: 9,
      repeat: -1
    })

    //UFO animation
    this.anims.create({
      key: 'aUFO',
      frames: this.anims.generateFrameNumbers('ufo', {start: 0, end: 3}),
      frameRate: 5,
      repeat: -1
    })

    //Plane animation
    this.anims.create({
      key: 'aPlane',
      frames: this.anims.generateFrameNumbers('plane', {start: 0, end: 1}),
      frameRate: 6,
      repeat: -1
    })
    //satellite animation
    this.anims.create({
      key: 'aSatellite',
      frames: this.anims.generateFrameNumbers('satellite', {start: 0, end: 3}),
      frameRate: 3,
      repeat: -1
    })

    //bird animations
      //black bird
    this.anims.create({
        key: 'aBBird',
        frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
      });
      //red bird
    this.anims.create({
        key: 'aRBird',
        frames: this.anims.generateFrameNumbers('bird', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
        });
        //yellow bird
    this.anims.create({
          key: 'aYBird',
          frames: this.anims.generateFrameNumbers('bird', { start: 4, end: 5 }),
          frameRate: 10,
          repeat: -1
          });

    //facing left birds
    this.anims.create({
        key: 'aBBirdLeft',
        frames: this.anims.generateFrameNumbers('birdFacingLeft', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
      });
      //red bird
    this.anims.create({
        key: 'aRBirdLeft',
        frames: this.anims.generateFrameNumbers('birdFacingLeft', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
        });
        //yellow bird
    this.anims.create({
        key: 'aYBirdLeft',
        frames: this.anims.generateFrameNumbers('birdFacingLeft', { start: 4, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    //green mountains animation
    this.anims.create({
      key: 'steam',
      frames: this.anims.generateFrameNumbers('greenMountains', {start: 0, end: 4}),
      frameRate: 4,
      repeat: -1
    })

    //abanonded spacecraft animation
    this.anims.create({
      key: 'shipSmoke',
      frames: this.anims.generateFrameNumbers('abandonedSpacecraft', {start: 0, end: 3}),
      frameRate: 6,
      repeat: -1
    })



      //start menu screen
    this.scene.start("startMenu");
  }
}
