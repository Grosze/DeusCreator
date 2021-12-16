import { Position } from '../../Position';
import { World } from '../../World';
import { Organism } from '../Organism';
import { Sheep } from '../Animals/Sheep';
import { OrganismFactory } from './OrganismFactory';

class SheepFactory implements OrganismFactory {
    public createOrganism(organism: Organism, position: Position, world: World): Organism {
        return new Sheep(organism as Sheep, position, world);
    }
}

export { SheepFactory };