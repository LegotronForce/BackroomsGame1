/** Base class for the Engine */
class Engine {
    imageDir = '';

    /** @type {BaseEntity[]} entities */
    entities = [];
    
    /** @type {{id: number, sprite: Sprite}[]} sprites */
    sprites = [];

    constructor() {}

    /** @param {string} directory */
    setImageDirectory(directory) { this.imageDir = directory; }
    
    /**
     * @param {number} id
     * @param {string} directory The directory inside the `imageDirectory` directory. 
     * @param {number} scaleFactor The scale of the image
     */
    loadSprite(id, directory, scaleFactor) {
        this.sprites.push({id: id, sprite: new Sprite(this.imageDir + directory, scaleFactor)});
    }

    /**
     * @param {number} id
     */
    getSprite(id) {
        for(let i=0;i<this.sprites.length;i++) {
            if(this.sprites[i].id == id) return this.sprites[i];
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

    }

    // `generateID()` is useful in making custom IDs
    // for entities that can be addressed.
    generateID(mul = 10) {
        let id = Math.floor(Math.random() * mul);
        for(let i=0;i<this.entities.length;i++) {
            if(this.entities[i].getID() == id) {
                this.generateID(mul); // Recursion!
                break;
            }
        }
        return id;
    }
}

class Sprite {
    /** @type {string} The location of the image */
    location;
    /** @type {p5.Image} */
    image;

    /**
     * @argument {string} location The location of the image.
     * @argument {number} scaleFactor
     */
    constructor(location, scaleFactor=10) {
        this.location = location;
        
        loadImage(this.location, img => {
            this.image = img;
            this.image.resize(scaleFactor, 0);
        });
    }

    getLocation() { return this.location; }
    getImage() { return this.image; }
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
}