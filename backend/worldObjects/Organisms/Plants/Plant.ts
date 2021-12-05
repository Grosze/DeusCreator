import { Organism } from "../Organism";
import { Position } from "../../Position";
import { World } from "../../World";
import { Action } from "../../Action";

class Plant extends Organism {
    constructor(organism: Organism, position: Position, world: World) {
        super(organism, position, world);
    }

    public move(): void {}

    public action(): void {
        const result: Array<Action> = [];
        let newPlantBornWhileAction: Plant = null;
        let newPlantPosition: Position = null

        if (this.ifReproduce()) {
            const freePositionsAroundPlant: Array<Position> = this.getNeighbouringFreePositions();
            
            if (freePositionsAroundPlant !== null) {
                const randomPositionToReproduce: Position = freePositionsAroundPlant[
                    Math.floor(
                        Math.random() * freePositionsAroundPlant.length
                    )
                ];

                newPlantBornWhileAction = new Plant(this)
            }
        }

    }
}