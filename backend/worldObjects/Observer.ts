import { Action } from './Action';

interface Observer {
    update(Action): void;
};

export { Observer };