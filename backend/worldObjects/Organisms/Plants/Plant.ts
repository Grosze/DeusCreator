import { Organism } from '../Organism';
import { Position } from '../../Position';
import { World } from '../../World';
import { Action } from '../../Action';
import { ActionType } from '../../ActionType';

abstract class Plant extends Organism {
    constructor(organism: Organism, position: Position, world: World) {
        super(organism, position, world);
    }

    public move(): void {}

    public action(): void {
        const result: Array<Action> = [];
        let newPlantBornWhileAction: Plant = null;
        let newPlantPosition: Position = null;

        if (this.ifReproduce()) {
            const freePositionsAroundPlant: Array<Position> = this.getNeighbouringFreePositions();
            
            if (freePositionsAroundPlant !== null) {
                const randomPositionToReproduce: Position = freePositionsAroundPlant[
                    Math.floor(
                        Math.random() * freePositionsAroundPlant.length
                    )
                ];

                const newPlantBornWhileAction: Plant = this.factory.createOrganism(this, null, null);
                newPlantBornWhileAction.initParams();

                newPlantBornWhileAction.setPosition(randomPositionToReproduce);

                this.power /= 2;

                result.push(new Action(ActionType.ACTION_ADD, randomPositionToReproduce, 0, newPlantBornWhileAction));
            }
        }

        result.forEach(action => this.notifyObservers(action));
    }
    
}

export { Plant };