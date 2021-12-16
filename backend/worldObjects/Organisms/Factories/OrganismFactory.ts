import { Position } from '../../Position';
import { World } from '../../World';
import { Organism } from '../Organism';

interface OrganismFactory {
    createOrganism(organism: Organism, position: Position, world: World): Organism;
}

export { OrganismFactory };