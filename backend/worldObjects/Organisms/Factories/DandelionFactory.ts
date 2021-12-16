import { Position } from '../../Position';
import { World } from '../../World';
import { Organism } from '../Organism';
import { Dandelion } from '../Plants/Dandelion';
import { OrganismFactory } from './OrganismFactory';

class DandelionFactory implements OrganismFactory {
    public createOrganism(organism: Organism, position: Position, world: World): Organism {
        return new Dandelion(organism, position, world);
    }
}

export { DandelionFactory };