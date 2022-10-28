// scene to inform participants of task instructions. routes to first task stage scene (context A)

// import js game element modules (sprites, ui, outcome animations)
import InstructionsPanel from "../elements/instructionsPanel.js";

// import our custom events centre for passsing info between scenes and data saving function
import eventsCenter from "../eventsCenter.js";
import { saveStartData } from "../saveData.js";

// initialize global start time var
var startTime;

// this function extends Phaser.Scene and includes the core logic for the scene
export default class InstructionsScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'InstructionsScene',
            autoStart: true
        });
    }

    preload() {
        // space background
        this.load.image('background','./assets/imgs/underwater.jpg')
    }
    
    create() {
        // load space pic as background
        var bg = this.add.sprite(0, 0, 'background')
                         .setOrigin(0,0);

        // initialise game vars
        var gameHeight = this.sys.game.config.height;
        var gameWidth = this.sys.game.config.width;
        startTime = Math.round(this.time.now); 
        
        // instr vars
        var titleText = 'Welcome to the game!'

        ///////////////////PAGE ONE////////////////////
        var mainTxt = ("You have been shipwrecked, and need to try and reach \n" +
                      "the shore with enough pearls to trade for your passage home.\n\n" +

                      "On your way, you will encounter [color=#cb4335]different kinds of sea creatures[/color],\n" +
                      "who you will need to [color=#cb4335]help you carry the pearls[/color].\n\n" +

                      "Unfortunately, [color=#cb4335]some of the sea creatures have slippery claws[/color], so\n" +
                      "there is a chance they will drop and lose your precious pearls!\n\n" +

                      "As you travel through different parts of the ocean, your job\n" +
                      "is to [color=#cb4335]to predict how likely you think it is that each creature\n" +
                      "you meet will lose some of your pearls[/color].\n\n" +

                      "You can swim through the ocean using the [b]arrow keys[/b]\n" +
                      "on your keyboard.\n\n" +               
                      "Swim to the [b]right[/b] to explore!\n\n");
        var buttonTxt = "start game!";
        var pageNo = 1;
        this.instructionsPanel = new InstructionsPanel(this, 
                                                       gameWidth/2, gameHeight/2,
                                                       pageNo, titleText, mainTxt, buttonTxt);

        // end scene
        eventsCenter.once('page1complete', function () {
            this.nextScene();
            }, this);
    }
    
    update(time, delta) {
    }
    
    nextScene() {
        saveStartData(startTime);           
        this.scene.start('PlatformerSceneA');
    } 
}