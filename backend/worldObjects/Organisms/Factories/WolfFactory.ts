import { Position } from '../../Position';
import { World } from '../../World';
import { Organism } from '../Organism';
import { Wolf } from '../Animals/Wolf';
import { OrganismFactory } from './OrganismFactory';

class WolfFactory implements OrganismFactory {
    public createOrganism(organism: Organism, position: Position, world: World): Organism {
        return new Wolf(organism as Wolf, position, world);
    }
}

export { WolfFactory };