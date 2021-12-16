import { Square } from "./Square";
import { Position } from "./Position";
import { Organism } from "./Organisms/Organism";
import { Plant } from "./Organisms/Plants/Plant";

class World {
    private size: Square;
    private turn: number = 0;
    private organismsList: Array<Organism> = []; 
    private newOrganismsList: Array<Organism> = [];

    public checkIfPositionIsInRangeOfWorld(position: Position): Boolean {
        return position.getX() >= 0 &&
            position.getY() >= 0 &&
            position.getX() < this.size.getWidth() &&
            position.getY() < this.size.getHeight();
    }

    public getOrganismFromPosition(position: Position): Organism {
        let result: Organism = null;

        this.organismsList.every(organism => {
            if (organism.getPosition().getX() === position.getX() && organism.getPosition().getY() === position.getY()) {
                result = organism;
                return false;
            };

            return true;
        });

        if (result !== null) {
            this.newOrganismsList.every(organism => {
                if (organism.getPosition().getX() === position.getX() && organism.getPosition().getY() === position.getY()) {
                    result = organism;
                    return false;
                };

                return true;
            });
        };

        return result;
    }

    public filterFreePositions(fields: Array<Position>): Array<Position> {
        const result: Array<Position> = [];

        if (fields !== null) {
            fields.forEach(field => {
                if (this.getOrganismFromPosition(field) === null) {
                    result.push(field);
                };
            });
        };

        if (result.length === 0) {
            return null;
        };

        return result;
    }

    public filterPositionsWithoutAnimals(fields: Array<Position>): Array<Position> {
        const result: Array<Position> = [];

        if (fields !== null) {
            fields.forEach(field => {
                const organismFromPosition: Organism = this.getOrganismFromPosition(field);

                if (organismFromPosition === null || organismFromPosition instanceof Plant) {
                    result.push(field);
                };
            });
        };

        if (result.length === 0) {
            return null;
        }

        return result;
    }

    public filterPositionsWithOtherSpecies(fields: Array<Position>, species: Organism): Array<Position> {
        const result: Array<Position> = [];

        if (fields !== null) {
            fields.forEach(field => {
                const organismFromPosition: Organism = this.getOrganismFromPosition(field);

                if (organismFromPosition !== null) {
                    if (organismFromPosition.constructor.name !== species.constructor.name) {
                        result.push(field);
                    };
                };
            });
        };

        if (result.length === 0) {
            return null;
        }

        return result;
    }

    public getNeighbouringPositions(position: Position): Array<Position> {
        const result: Array<Position> = [];

        for (let x: number = -1; x < 2; x++) {
            for (let y: number = -1; y < 2; y++) {
                const positionToCheck: Position = new Position(x, y);

                if (this.checkIfPositionIsInRangeOfWorld(positionToCheck) && Math.abs(x) + Math.abs(y) != 0) {
                    result.push(positionToCheck);
                };
            };
        };
        
        return result;
    }
};

export { World };