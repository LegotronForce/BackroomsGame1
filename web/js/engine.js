/** Base class for the Engine */
class Engine {
    imageDir = '';
    /** @type {BaseEntity[]} entities */
    entities = [];
    /** @type {{id: number, sprite: Sprite}[]} sprites */
    sprites = [];
    /** @type {{id: number, spritesheet: Spritesheet}[]} Spritesheets */
    spritesheets = [];
    /** @type {{id: number, animation: SpriteAnimation}[]} Animations */
    animations = [];

    constructor() {
        this.allSpritesLoaded = false;
        this.allSpritesheetsLoaded = false;
    }

    /** @param {string} directory */
    setImageDirectory(directory) { this.imageDir = directory; }
    
    // /**
    //  * @param {number} id
    //  * @param {string} file The directory inside the `imageDirectory` directory. 
    //  * @param {number} scaleFactor The scale of the image
    //  */
    // loadSprite(id, file, scaleFactor) {
    //     this.sprites.push({id: id, sprite: new Sprite(this.imageDir + file, scaleFactor)});
    // }

    loadSpritesheet(id, file) {
        this.spritesheets.push({id: id, spritesheet: new Spritesheet(this.imageDir + file)});
    }

    /**
     * Create a sprite based on a tileset
     * @param {number} id The ID of the sprite
     * @param {number} tilesetID The ID of the tileset
     * @param {number} scaleFactor The scalefactor of the sprite
     * @param {number} tileX The X of the tile * 16
     * @param {number} tileY The Y of the tile * 16
     * @param {number} tileWidth The width of the tile * 16
     * @param {number} tileHeight The height of the tile * 16 
     */
    createSprite(id, tilesetID, scaleFactor, tileX, tileY, tileWidth, tileHeight) {
        this.checks();
        this.sprites.push({
            id: id,
            sprite: new Sprite(this.getSpritesheet(tilesetID).getSelection(tileX*16, tileY*16, tileWidth*16, tileHeight*16),
            scaleFactor)
        });
    }


    addAnimationToSprite(spriteID, animationID) {
        this.getSprite(spriteID).animation = this.getAnimation(animationID);
    }

    /**
     * Create a spritesheet from a file path
     * @param {number} id The ID of the sprite
     * @param {string} file File path for the spritesheet
     * @param {Function} loaded Called when the spritesheet is loaded. Used to load sprites
     */
    createSpritesheet(id, file, loaded) {
        this.spritesheets.push({
            id: id,
            spritesheet: new Spritesheet(file, loaded)
        });
    }

    /**
     * @param {number} id
     * @returns {Spritesheet} 
     */
    getSpritesheet(id) {
        for(let i=0;i<this.spritesheets.length;i++) {
            if(this.spritesheets[i].id == id) return this.spritesheets[i].spritesheet;
        }
    }

    checks() {
        for(let i=0;i<this.spritesheets.length;i++) {
            if(this.spritesheets[i].loaded === false) {
                this.allSpritesheetsLoaded = false;
                break;
            } else {
                this.allSpritesheetsLoaded = true;
            }
        }

        for(let i=0;i<this.sprites.length;i++) {
            if(this.sprites[i].sprite.loaded === false) {
                this.allSpritesLoaded = false;
                break;
            } else {
                this.allSpritesLoaded = true;
            }
        }

        if(this.allSpritesLoaded && this.allSpritesheetsLoaded) {
            return true;
        } else {
            // ('All sprites are not loaded, with allSpritesLoaded: ' + this.allSpritesLoaded + ' and ' + this.allSpritesheetsLoaded);
            return false;
        }
    }

    /**
     * @param {number} id The ID of the sprite
     */
    getSprite(id) {
        for(let i=0;i<this.sprites.length;i++) {
            if(this.sprites[i].id == id) return this.sprites[i].sprite;
        }
    }

    /** @argument {BaseEntity} entity */
    addEntity(entity) { this.entities.push(entity); }
    /** @argument {number} id */
    getEntity(id) {
        for(let i=0;i<this.entities.length; i++) {
            if(this.entities[i].getID() == id) {
                return this.entities[i];
            }
        }
    }

    /**
     * @argument {number} id
     */
    removeEntity(id) {
        for(let i=0;this.entities.length;i++) {
            if(this.entities[i].getID() == id) {
                delete this.entities[i];
            }
        }
    }

    // `generateID()` is useful in making custom IDs
    // for entities that can be addressed.
    generateID(mul = 10) {
        let id = Math.floor(Math.random() * mul);
        for(let i=0;i<this.entities.length;i++) {
            if(this.entities[i].getID() == id) {
                return this.generateID(mul); // Recursion!
            }
        }
        return id;
    }

    createAnimation(id) {
        this.animations.push({id: id, animation: new SpriteAnimation()});
    }

    /**
     * @param {number} id The ID of the animation
     * @param {number} tilesetID The ID of the tileset
     * @param {number} selectionX The X*16
     * @param {number} selectionY The Y*16
     * @param {number} selectionWidth The W*16
     * @param {number} selectionHeight The H*16
     */
    addImageToAnimation(id, tilesetID, selectionX, selectionY, selectionWidth, selectionHeight) {
        this.getAnimation(id).addFrame(
            this.getSpritesheet(tilesetID).getSelection(selectionX*16, selectionY*16, selectionWidth*16, selectionHeight*16)
        );
    }

    /**
     * @param {number} id The ID of the animation
     * @returns {SpriteAnimation}
     */
    getAnimation(id) {
        for(let i=0;i<this.animations.length;i++) {
            if(this.animations[i].id == id) {
                return this.animations[i].animation;
            }
        }
    } 
}

class SpriteAnimation {
    /** @type {p5.Image[]} */
    frames = [];

    constructor() {}

    addFrame(img) {
        this.frames.push(img);
    }

    getFrame(num) {
        return this.frames[num];
    }

    removeFrame(num) {
        delete this.frames[num];
    }
}

class Spritesheet {
    loaded = false;

    /**
     * @param {string} location 
     */
    constructor(location, loadedCallback) {
        this.loaded = false;
        
        loadImage(location, img => {
            this.loaded = true;
            this.image = img;
            loadedCallback(this);
        });
    }

    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     * @returns 
     */
    getSelection(x, y, w, h) {
        if(!this.loaded) return -1;
        return this.image.get(x, y, w, h); //(this.image, 0, 0, endX - begX, endY - begY, endX - begX, endY - begY);
    }
}

class Sprite {
    /** @type {string} The location of the image */
    location;
    /** @type {p5.Image} */
    image;
    /** @type {number} The scale factor of the image */
    scaleFactor;
    /** @type {SpriteAnimation} */
    animation;

    /**
     * @argument {p5.Image} image The image that will be loaded
     * @argument {number} scaleFactor
     */
    constructor(image, scaleFactor=4) {
        this.location = location;
        this.scaleFactor = scaleFactor;
        this.image = image;
        this.loaded = true;
    }

    getLocation() { return this.location; }
    getImage() { return this.image; }
    draw(x, y, frame) {
        image(this.animation.getFrame(frame), x, y, this.scaleFactor * this.image.width, this.scaleFactor * this.image.height);
    }
}

class BaseEntity {
    /**
     * @argument {string} name The name of the entity
     * @argument {number} id
     * @argument {Sprite} sprite
     */
    constructor(name, id, sprite) {
        this.name = name;
        this.id = id;
        this.sprite = sprite;
    }

    getName() { return this.name; }
    getID() { return this.id; }
    getSprite() { return this.sprite; }

    onDraw() {}
    onKeypress(key) {}
}