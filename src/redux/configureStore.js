import { Reducer, initialState } from './reducer';
import { createStore } from 'redux';

export const ConfigureStore = () => {
    const store = createStore(Reducer, initialState);
    return store;
}