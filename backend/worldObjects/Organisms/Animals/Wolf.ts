import { Animal } from './Animal';
import { Position } from '../../Position';
import { World } from '../../World';
import { Action } from '../../Action';
import { ActionType } from '../../ActionType';
import { Organism } from '../Organism';
import { Plant } from '../Plants/Plant';

class Wolf extends Animal {
    constructor(wolf: Wolf, position: Position, world: World) {
        super(wolf, position, world);
    }

    public initParams(): void {
        this.power = 8;
        this.initiative = 5;
        this.liveLength = 20;
        this.powerToReproduce = 16;
    }

    public move(): void {
        const result: Array<Action> = [];
        const positionWithSpeciesAroundAnimal: Array<Position> = this.getNeighbouringPositions();
        let newPosition: Position = null;

        if (positionWithSpeciesAroundAnimal !== null) {
            newPosition = positionWithSpeciesAroundAnimal[
                Math.floor(
                    Math.random() * positionWithSpeciesAroundAnimal.length
                )
            ];

            result.push(new Action(ActionType.ACTION_MOVE, newPosition, 0, this));

            const organismApproachedInNewPosition: Organism = this.world.getOrganismFromPosition(newPosition);
            
            if (organismApproachedInNewPosition !== null && !(organismApproachedInNewPosition instanceof Plant)) {
                organismApproachedInNewPosition
                    .consequences(this)
                    .forEach(action => result.push(action));
            };
        };

        result.forEach(action => this.notifyObservers(action));
    }

    public getNeighbouringPositions(): Position[] {
        return this.world.filterPositionsWithOtherSpecies(this.world.getNeighbouringPositions(this.position), this);
    }

    public stringData(): string {
        return `Wolf{power: ${this.power}, 
            initiative: ${this.initiative}, 
            liveLength: ${this.liveLength}, 
            powerToReproduce: ${this.powerToReproduce}, 
            position: ${this.position.stringData()}}`;
    }
}

export { Wolf }