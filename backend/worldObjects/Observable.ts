import { Observer } from './Observer';
import { Action } from "./Action";

interface Observable {
    attach(Observer): void;
    detach(Observer): void;
    notifyObservers(Action): void;
};

export { Observable };