import { ActionType } from './ActionType';
import { Position } from './Position';
import { Organism } from './Organisms/Organism';

class Action {
    private type: ActionType;
    private position: Position;
    private value: number;
    private organism: Organism;

    constructor(type: ActionType, position: Position, value: number, organism: Organism) {
        this.type = type;
        this.position = position;
        this.value = value;
        this.organism = organism;
    }

    public getType(): ActionType {
        return this.type;
    }

    public getPosition(): Position {
        return this.position;
    }

    public getValue(): number {
        return this.value;
    }

    public getOrganism(): Organism {
        return this.organism;
    }

    public setType(type: ActionType): void {
        this.type = type;
    }

    public setPosition(position: Position): void {
        this.position = position;
    }

    public setValue(value: number): void {
        this.value = value;
    }

    public setOrganism(organism: Organism): void {
        this.organism = organism;
    }

    public stringData(): string {
        return 'Action{type: ' + this.type +
            ', postition: ' + this.position.stringData() + 
            ', value: ' + this.value +
            ', organism: ' + this.organism.stringData() +
            '}';
    }
};

export { Action };