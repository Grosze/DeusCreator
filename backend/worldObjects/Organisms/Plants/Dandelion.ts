import { Position } from '../../Position';
import { World } from '../../World';
import { Plant } from './Plant';

class Dandelion extends Plant {
    constructor(dandelion: Dandelion, position: Position, world: World) {
        super(dandelion, position, world);
    }

    public initParams(): void {
        this.power = 0;
        this.initiative = 0;
        this.liveLength = 6;
        this.powerToReproduce = 2;
    }

    public stringData(): string {
        return `Dandelion{power: ${this.power}, 
            initiative: ${this.initiative}, 
            liveLength: ${this.liveLength}, 
            powerToReproduce: ${this.powerToReproduce}, 
            position: ${this.position.stringData()}}`;
    }
}

export { Dandelion };