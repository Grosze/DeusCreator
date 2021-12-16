import { Position } from '../../Position';
import { World } from '../../World';
import { Organism } from '../Organism';
import { Toadstool } from '../Plants/Toadstool';
import { OrganismFactory } from './OrganismFactory';

class ToadstoolFactory implements OrganismFactory {
    public createOrganism(organism: Organism, position: Position, world: World): Organism {
        return new Toadstool(organism, position, world);
    }
}

export { ToadstoolFactory };