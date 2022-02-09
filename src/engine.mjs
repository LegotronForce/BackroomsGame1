/** Base class for the Engine */
export class Engine {
    /** @type {BaseEntity[]} entities */
    entities = [];

    constructor() {}

    /** @argument {BaseEntity} entity */
    addEntity(entity) { this.entities.push(entity); }
    /** @argument {number} id */
    getEntity(id) {
        for(let i=0;i<this.entities.length; i++) {
            if(this.entities[i].getID() == id) {
                return this.entities[i];
            }
        }
        return;
    }

    removeEntity(id) {}

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

export class Sprite {
    /** @type {string} The location of the image */
    location;
    /** @type {p5.Image} */
    image;

    /**
     * @argument {string} location The location of the image.
     */
    constructor(location, width, height) {
        this.location = location;
        
        loadImage(this.location, img => {
            this.image = img;
        });
    }

    getLocation() { return this.location; }
    getImage() { return this.image; }
}

export class BaseEntity {
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