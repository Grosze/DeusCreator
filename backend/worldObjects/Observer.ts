import { Action } from './Action';

interface Observer {
    update(action: Action): void;
};

export { Observer };