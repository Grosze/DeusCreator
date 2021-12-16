import { Square } from './Square';
import { Position } from './Position';
import { Organism } from './Organisms/Organism';
import { Plant } from './Organisms/Plants/Plant';
import { Action } from './Action';
import { ActionType } from './ActionType';
import { Observer } from './Observer';

class World implements Observer {
    private size: Square;
    private turn: number = 0;
    private organismsList: Array<Organism> = []; 
    private newOrganismsList: Array<Organism> = [];

    public getSize(): Square {
        return this.size;
    }

    public getTurn(): number {
        return this.turn;
    }

    public getOrganismList(): Array<Organism> {
        return this.organismsList;
    }

    public getNewOrganismList(): Array<Organism> {
        return this.newOrganismsList;
    }

    public setSize(size: Square): void {
        this.size = size; 
    }

    public setTurn(turn: number): void {
        this.turn = turn;
    }

    public setOrganismList(organismList: Array<Organism>): void {
        this.organismsList = organismList;
    }

    public setNewOrganismList(newOrganismList: Array<Organism>): void {
        this.newOrganismsList = newOrganismList;
    }

    public makeTurn(): void {
        this.organismsList.forEach(organism => {
            if (this.checkIfPositionIsInRangeOfWorld(organism.getPosition())) {
                if (!organism.getIsStopped()) {
                    organism.move();
                };

                if (this.checkIfPositionIsInRangeOfWorld(organism.getPosition())) {
                    if (!organism.getIsStopped()) {
                        organism.action();
                    };
                };
            };
        });

        this.organismsList = this.organismsList.filter(organism => this.checkIfPositionIsInRangeOfWorld(organism.getPosition()));
        

        this.organismsList.forEach(organism => {
            if (!organism.getIsStopped()) {
                organism.setLiveLength(organism.getLiveLength() - 1);
                organism.setPower(organism.getPower() + 1);
            };
        });

        this.organismsList = this.organismsList.filter(organism => organism.getLiveLength() > 0);

        this.newOrganismsList = this.newOrganismsList.filter(organism => this.checkIfPositionIsInRangeOfWorld(organism.getPosition()));
        this.newOrganismsList.forEach(organism => {
            this.organismsList.push(organism);
        });

        this.newOrganismsList = [];

        this.turn += 1;
    }

    public update(action: Action): void {
        this.makeMove(action);
    }

    public makeMove(action: Action): void {
        switch (action.getType()) {
            case ActionType.ACTION_ADD:
                this.newOrganismsList.push(action.getOrganism());

            case ActionType.ACTION_INCREASE_POWER:
                action.getOrganism().setPower(action.getOrganism().getPower() + action.getValue());

            case ActionType.ACTION_MOVE:
                action.getOrganism().setPosition(action.getPosition());
            
            case ActionType.ACTION_REMOVE:
                action.getOrganism().setPosition(new Position(-1, -1));
        };
    }

    public addOrganism(newOrganism: Organism): Boolean {
        if (this.checkIfPositionIsInRangeOfWorld(newOrganism.getPosition())) {
            this.organismsList.push(newOrganism);
            this.organismsList.sort((organism1: Organism, organism2: Organism) => organism1.getInitiative() - organism2.getInitiative());
            return true;
        };

        return false;
    }

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