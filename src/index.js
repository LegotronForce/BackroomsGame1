/** @type {Engine} engine */
let engine = new Engine();

function loadSprites() {
    // Load sprites in here to use for entities
    engine.addSprite('test');
}

function preload() {
    engine = new Engine();
    engine.setImageDirectory('img/');
    loadSprites();
}

function setup() {
    createCanvas(600, 460);
    background(0);
}

function draw() {
    
}