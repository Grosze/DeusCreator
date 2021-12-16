import { Action } from '../../Action';
import { ActionType } from '../../ActionType';
import { Position } from '../../Position';
import { World } from '../../World';
import { Organism } from '../Organism';

abstract class Animal extends Organism {    
    constructor(animal: Animal, position: Position, world: World) {
        super(animal, position, world);
    }

    public move(): void {
        const result: Array<Action> = [];
        const freePositionsAroundAnimal: Array<Position> = this.getNeighbouringPositions();
        let newPosition: Position = null;

        if (freePositionsAroundAnimal !== null) {
            newPosition = freePositionsAroundAnimal[
                Math.floor(
                    Math.random() * freePositionsAroundAnimal.length
                )
            ];

            result.push(new Action(ActionType.ACTION_MOVE, newPosition, 0, this));

            const organismApproachedInNewPosition: Organism = this.world.getOrganismFromPosition(newPosition);
            
            if (organismApproachedInNewPosition !== null) {
                organismApproachedInNewPosition
                    .consequences(this)
                    .forEach(action => result.push(action));
            };
        };

        result.forEach(action => this.notifyObservers(action));
    }

    public action(): void {
        const result: Array<Action> = [];
        let newAnimalBornWhileAction: Animal = null;
        let newAnimalPosition: Position = null;

        if (this.ifReproduce()) {
            const freePositionsAroundAnimal: Array<Position> = this.getNeighbouringFreePositions();
            
            if (freePositionsAroundAnimal !== null) {
                const randomPositionToReproduce: Position = freePositionsAroundAnimal[
                    Math.floor(
                        Math.random() * freePositionsAroundAnimal.length
                    )
                ];

                const newAnimalBornWhileAction: Animal = this.factory.createOrganism(this, null, null) as Animal;
                newAnimalBornWhileAction.initParams();

                newAnimalBornWhileAction.setPosition(randomPositionToReproduce);

                this.power /= 2;

                result.push(new Action(ActionType.ACTION_ADD, randomPositionToReproduce, 0, newAnimalBornWhileAction));
            }
        }

        result.forEach(action => this.notifyObservers(action));
    }

    public getNeighbouringPositions(): Array<Position> {
        return this.world.getNeighbouringPositions(this.position);
    }
}

export { Animal };