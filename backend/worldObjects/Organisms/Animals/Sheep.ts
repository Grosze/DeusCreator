import { Position } from '../../Position';
import { Animal } from './Animal';
import { World } from '../../World';

class Sheep extends Animal {
    constructor(sheep: Sheep, position: Position, world: World) {
        super(sheep, position, world);
    }

    public initParams(): void {
        this.power = 3;
        this.initiative = 3;
        this.liveLength = 10;
        this.powerToReproduce = 6;
    }

    public stringData(): string {
        return `Sheep{power: ${this.power}, 
            initiative: ${this.initiative}, 
            liveLength: ${this.liveLength}, 
            powerToReproduce: ${this.powerToReproduce}, 
            position: ${this.position.stringData()}}`;
    }

    public getNeighbouringPositions(): Array<Position> {
        return this.world.filterPositionsWithoutAnimals(this.world.getNeighbouringPositions(this.position));
    }
}

export { Sheep };