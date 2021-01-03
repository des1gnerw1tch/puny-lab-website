var onIcon;
var offIcon;
var wasdIcon;
var arrowsIcon;
class OptionsScene extends Phaser.Scene{
  constructor() {
    super("optionsScene");
  }

  create()  {
    let icon;

    //volume button
    var volumeButton = this.add.image(23, 250, 'volumeButton').setScale(.3);
    volumeButton.setInteractive();
    volumeButton.setOrigin(0, 0);

    onIcon = this.add.image(volumeButton.x + 250, volumeButton.y + 20, 'on');
    offIcon = this.add.image(volumeButton.x + 250, volumeButton.y + 20, 'off');

    volumeButton.on("pointerover", ()=>  {
      icon = this.add.sprite(volumeButton.x + 190, volumeButton.y + 20, 'astronautPadded').setScale(.5);
      icon.anims.play('right', true);
    })

    volumeButton.on("pointerout", ()=>  {
      icon.visible = false;
    })

    volumeButton.on("pointerup", ()=>  {
      if (soundOn)  {
        soundOn = false;
        menuMusic.pause();
      } else {
        soundOn = true;
        menuMusic.play();
      }
    })

    //controls button
    var controlsButton = this.add.image(23, 300, 'controlsButton').setScale(.3);
    controlsButton.setInteractive();
    controlsButton.setOrigin(0, 0);

    wasdIcon = this.add.image(controlsButton.x + 350, controlsButton.y + 20, 'wasd');
    arrowsIcon = this.add.image(controlsButton.x + 350, controlsButton.y + 20, 'arrows');

    controlsButton.on("pointerover", ()=>  {
      icon = this.add.sprite(controlsButton.x + 218, controlsButton.y + 20, 'astronautPadded').setScale(.5);
      icon.anims.play('right', true);
    })

    controlsButton.on("pointerout", ()=>  {
      icon.visible = false;
    })

    controlsButton.on("pointerup", ()=>  {
        if (soundOn)
          soundSelect.play();
        if (wasdOn) {
            wasdOn = false;
        } else {
            wasdOn = true;
        }
    })

    //back button
    var backButton = this.add.image(23, 350, 'backButton').setScale(.3);
    backButton.setInteractive();
    backButton.setOrigin(0, 0);

    backButton.on("pointerover", ()=>  {
      icon = this.add.sprite(backButton.x + 145, backButton.y + 20, 'astronautPadded').setScale(.5);
      icon.anims.play('right', true);
    })

    backButton.on("pointerout", ()=>  {
      icon.visible = false;
    })

    backButton.on("pointerup", ()=>  {
      if (soundOn)
        soundBack.play();
      this.scene.start("titleScene");
    })


  }

  update()  {
    if (soundOn)  {
      onIcon.visible = true;
      offIcon.visible = false;
      onIcon.setScale(.3);
    } else {
        offIcon.visible = true;
        onIcon.visible = false;
        offIcon.setScale(.3);
    }

    if (wasdOn) {
      wasdIcon.visible = true;
      arrowsIcon.visible = false;
      wasdIcon.setScale(.3);
    } else {
      arrowsIcon.visible = true;
      wasdIcon.visible = false;
      arrowsIcon.setScale(.3);
    }

  }

}
