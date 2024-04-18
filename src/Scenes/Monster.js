class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        this.AKey = null;
        this.SKey = null;
        this.DKey = null;
        this.FKey = null;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenD.png");
        my.sprite.armL = this.add.sprite(this.bodyX-100, this.bodyY+50, "monsterParts", "arm_greenD.png");
        my.sprite.armR = this.add.sprite(this.bodyX+100, this.bodyY+50, "monsterParts", "arm_greenD.png");
        my.sprite.armL.flipX = true;
    
        my.sprite.legL = this.add.sprite(this.bodyX-50, this.bodyY+125, "monsterParts", "leg_greenD.png");
        my.sprite.legR = this.add.sprite(this.bodyX+50, this.bodyY+125, "monsterParts", "leg_greenD.png");
        my.sprite.legL.flipX = true;

        my.sprite.eye1 = this.add.sprite(this.bodyX, this.bodyY-25, "monsterParts", "eye_psycho_light.png");
        my.sprite.mouthS = this.add.sprite(this.bodyX, this.bodyY+25, "monsterParts", "mouth_closed_happy.png");
        my.sprite.mouthF = this.add.sprite(this.bodyX, this.bodyY+25, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.mouthF.visible = false;
        my.sprite.horn1 = this.add.sprite(this.bodyX-50, this.bodyY-80, "monsterParts", "detail_green_horn_large.png");
        my.sprite.horn2 = this.add.sprite(this.bodyX+50, this.bodyY-80, "monsterParts", "detail_green_horn_small.png");
        my.sprite.horn1.flipX = true;
        
        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability
    
        if (Phaser.Input.Keyboard.JustDown(this.SKey)) {
            my.sprite.mouthS.visible = true;
            my.sprite.mouthF.visible = false;
        }
        if (Phaser.Input.Keyboard.JustDown(this.FKey)) {
            my.sprite.mouthS.visible = false;
            my.sprite.mouthF.visible = true;
        }
        if (this.AKey.isDown) {
            for(let part in my.sprite){
                my.sprite[part].x -= 1;
            }
        }
        if (this.DKey.isDown) {
            for(let part in my.sprite){
                my.sprite[part].x += 1;
            }
        }
    }
}
