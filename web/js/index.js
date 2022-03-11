/** @type {Engine} engine */
let engine = new Engine();
let playerID = engine.generateID();
let spritesheetID = engine.generateID();
let playerAnimationID = engine.generateID();
let frameIndex = 0;

async function loadSprites() {
    // Load sprites in here to use for entities
    engine.createSpritesheet(spritesheetID, '/web/img/tilesheet-for-a-backrooms-game.png', (spritesheet) => {
        engine.createSprite(playerID, spritesheetID, 3, 0, 1, 2, 2);
        engine.createAnimation(playerAnimationID);
        engine.addImageToAnimation(playerAnimationID, spritesheetID, 2, 0, 1, 1);
        engine.addImageToAnimation(playerAnimationID, spritesheetID, 3, 0, 1, 1);
        engine.addImageToAnimation(playerAnimationID, spritesheetID, 2, 0, 1, 1);
        engine.addImageToAnimation(playerAnimationID, spritesheetID, 4, 0, 1, 1);
        engine.addAnimationToSprite(playerID, playerAnimationID);
    });
}

function preload() {
    engine = new Engine();
    engine.setImageDirectory('/web/img/');
    loadSprites();
}

function setup() {
    createCanvas(600, 460);
}

function draw() {
    clear();
    background([100,0,100]);
    if(!engine.checks()) return;

    noSmooth();
    // image(engine.getSprite(tilesetID).sprite.image, 0, 0, 512, 512);
    engine.getSprite(playerID).draw(0, 0, frameIndex);
    frameIndex++;
    if(frameIndex >= engine.getAnimation(playerAnimationID).frames.length) {
        frameIndex = 0;
    }

    smooth();
}