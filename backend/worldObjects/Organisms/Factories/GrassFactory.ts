import { Position } from '../../Position';
import { World } from '../../World';
import { Organism } from '../Organism';
import { Grass } from '../Plants/Grass';
import { OrganismFactory } from './OrganismFactory';

class GrassFactory implements OrganismFactory {
    public createOrganism(organism: Organism, position: Position, world: World): Organism {
        return new Grass(organism, position, world);
    }
}

export { GrassFactory };