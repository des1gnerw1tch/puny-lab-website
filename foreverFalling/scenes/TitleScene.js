class TitleScene extends Phaser.Scene{
  constructor() {
    super("titleScene");
  }

  create()  {
    let icon;
    //play button
    let playButton = this.add.image(23, 250, 'playButton').setScale(.3).setOrigin(0, 0);
    playButton.setInteractive();

    playButton.on("pointerover", ()=>  {
      icon = this.add.sprite(playButton.x + 130, playButton.y + 20, 'astronautPadded').setScale(.5);
      icon.anims.play('right', true);
    })

    playButton.on("pointerout", ()=>  {
      icon.visible = false;
    })

    playButton.on("pointerup", ()=>  {
    if (soundOn)
      soundPlay.play();
      menuMusic.pause();
      this.scene.stop("startMenu");
      this.scene.start("enterIntro");

    })

      //options button
    let optionsButton = this.add.image(23, 300, 'optionsButton').setScale(.3).setOrigin(0, 0);
    optionsButton.setInteractive();

    optionsButton.on("pointerover", ()=>  {
      icon = this.add.sprite(optionsButton.x + 205, optionsButton.y + 20, 'astronautPadded').setScale(.5);
      icon.anims.play('right', true);
    })

    optionsButton.on("pointerout", ()=>  {
      icon.visible = false;
    })

    optionsButton.on("pointerup", ()=>  {
      if (soundOn)
      soundSelect.play();
      this.scene.start("optionsScene");
    })

    //extras button (Portal to end screen. )
    /*
  let extrasButton = this.add.image(23, 350, 'extrasButton').setScale(.3).setOrigin(0,0);
    extrasButton.setInteractive();

    extrasButton.on("pointerover", ()=>  {
    icon = this.add.sprite(extrasButton.x + 180, extrasButton.y + 20, 'astronautPadded').setScale(.5);
    icon.anims.play('right', true);
  })

  extrasButton.on("pointerout", ()=>  {
    icon.visible = false;
  })

  extrasButton.on("pointerup", ()=>  {
    if (soundOn)
      soundSelect.play();
    this.scene.start("enterEnd");
  })*/

  }
}
