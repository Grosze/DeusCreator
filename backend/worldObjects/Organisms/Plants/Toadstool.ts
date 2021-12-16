import { Action } from '../../Action';
import { ActionType } from '../../ActionType';
import { Position } from '../../Position';
import { World } from '../../World';
import { Organism } from '../Organism';
import { Plant } from './Plant';

class Toadstool extends Plant {
    constructor(toadstool: Toadstool, position: Position, world: World) {
        super(toadstool, position, world);
    }

    public initParams(): void {
        this.power = 0;
        this.initiative = 0;
        this.liveLength = 10;
        this.powerToReproduce = 5;
    }

    public consequences(approachedOrganism: Organism): Action[] {
        const result: Array<Action> = [];
            
        if (this.power > approachedOrganism.getPower()) {
            result.push(new Action(ActionType.ACTION_REMOVE, new Position(-1, -1), 0, approachedOrganism));
        } else {
            result.push(new Action(ActionType.ACTION_REMOVE, new Position(-1, -1), 0, approachedOrganism));
            result.push(new Action(ActionType.ACTION_REMOVE, new Position(-1, -1), 0, this));
        };

        if (result.length === 0) {
            return null;
        };

        return result;
    }
    
    public stringData(): string {
        return `Toadstool{power: ${this.power}, 
            initiative: ${this.initiative}, 
            liveLength: ${this.liveLength}, 
            powerToReproduce: ${this.powerToReproduce}, 
            position: ${this.position.stringData()}}`;
    };
}

export { Toadstool };