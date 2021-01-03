var killText;
var homeButton;
var againButton;
var playerScore;
var timedFlash;
var alpha;
class KillScene extends Phaser.Scene{
  constructor(){

      super("enterKill");
  }

  init(score) {
    playerScore = score;
  }
  create()  {
    music1.pause();
    music2.pause();
    alpha = 0;
    //makes game over screen delay before popping up
    this.time.addEvent({delay: 700, callback: this.placeKillText, callbackScope: this, loop: false});




  }

  update()  {

  }

  placeKillText() {
    killText = this.add.image(400, 300, 'gameOver').setScale(.5);
    againButton = this.add.image(400, 400, 'playAgain').setScale(.5);
    timedFlash = this.time.addEvent({delay: 10, callback: this.flashAgain, callbackScope: this, loop: true});
  }
  flashAgain()  {
    againButton.setAlpha((Math.sin(alpha) + 1)/2);
    alpha += .1;
  }
}
