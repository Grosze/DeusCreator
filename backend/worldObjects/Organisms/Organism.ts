import { Position } from '../Position';
import { World } from '../World';
import { Observable } from '../Observable';
import { Observer } from '../Observer';
import { Action } from '../Action';
import { ActionType } from '../ActionType';

abstract class Organism implements Observable {
    protected power: number;
    protected initiative: number;
    protected position: Position;
    protected liveLength: number;
    protected powerToReproduce: number;
    protected world: World;
    protected observersList: Set<Observer>;
    protected isStopped: boolean = false;

    constructor(organism: Organism, position: Position, world: World) {
        if (organism != null) {
            this.power = organism.getPower();
            this.initiative = organism.getInitiative();
            this.position = organism.getPosition();
            this.liveLength = organism.getLiveLength();
            this.powerToReproduce = organism.getPowerToReproduce();
            this.world = organism.getWorld();

        } else {
            this.initParams();

        };

        if (position != null) {
            this.position = position;

        };

        if (world != null) {
            this.world = world;
            
        };
    }

    public attach(observer: Observer): void {
        this.observersList.add(observer);
    }

    public detach(observer: Observer): void {
        this.observersList.delete(observer);
    }

    public notifyObservers(action: Action): void {
        this.observersList.forEach(observer => {
            observer.update(action);
        });
    }

    public getPower(): number {
        return this.power;
    }

    public getInitiative(): number {
        return this.initiative;
    }

    public getPosition(): Position {
        return this.position;
    }

    public getLiveLength(): number {
        return this.liveLength;
    }

    public getPowerToReproduce(): number {
        return this.powerToReproduce;
    }

    public getWorld(): World {
        return this.world;
    }

    public getIsStopped(): boolean {
        return this.isStopped;
    }

    public getNeighbouringFreePositions(): Array<Position> {
        return this.world.filterFreePositions(this.world.getNeighbouringPositions(this.position));
    } 

    public setPower(power: number): void {
        this.power = power;
    }

    public setInitiative(initiative: number): void {
        this.initiative = initiative;
    }

    public setPosition(position: Position): void {
        this.position = position;
    }

    public setLiveLength(liveLength: number): void {
        this.liveLength = liveLength;
    }

    public setPowerToReproduce(powerToReproduce: number): void {
        this.powerToReproduce = powerToReproduce;
    }

    public setWorld(world: World): void {
        this.world = world;
    }

    public setIsStopped(isStopped: boolean): void {
        this.isStopped = isStopped;
    }

    public ifReproduce(): Boolean {
        return this.power >= this.powerToReproduce;
    }

    public consequences(approachedOrganism: Organism): Array<Action> {
        const result: Array<Action> = [];

        if (this.power > approachedOrganism.getPower()) {
            result.push(
                new Action(
                    ActionType.ACTION_REMOVE,
                    new Position(-1, -1),
                    0,
                    approachedOrganism
                )
            );
        } else {
            result.push(
                new Action(
                    ActionType.ACTION_REMOVE,
                    new Position(-1, -1),
                    0,
                    this
                )
            );
        };

        if (result.length === 0) {
            return null;
        };

        return result;
    }

    abstract stringData(): string;
    
    abstract move(): void;

    abstract action(): void;

    abstract initParams(): void;
}

export { Organism };