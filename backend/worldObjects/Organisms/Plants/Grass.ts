import { Position } from '../../Position';
import { Plant } from './Plant';
import { World } from '../../World';

class Grass extends Plant {
    constructor(grass: Grass, position: Position, world: World) {
        super(grass, position, world);
    }

    public initParams(): void {
        this.power = 0;
        this.initiative = 0;
        this.liveLength = 6;
        this.powerToReproduce = 3;
    }

    public stringData(): string {
        return `Grass{power: ${this.power}, 
            initiative: ${this.initiative}, 
            liveLength: ${this.liveLength}, 
            powerToReproduce: ${this.powerToReproduce}, 
            position: ${this.position.stringData()}}`;
    }
}

export { Grass };