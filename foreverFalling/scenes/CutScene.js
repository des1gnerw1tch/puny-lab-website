class CutScene extends Phaser.Scene{
  constructor() {
    super("enterCutscene");
  }

  create()  {
    var gameText;
    gameText = "Where is everybody?"
    this.add.text(20, 20, gameText.italics());
  }
}
