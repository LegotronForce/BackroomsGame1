class TestEntity extends BaseEntity {
    /** @param {Engine} engine */
    constructor(engine) {
        super('Test', engine.generateID(), engine.getSprite(''));
    }
}