import { Comments } from './comments';
import { Leaders } from './leaders';
import { Dishes } from './dishes';
import { Promotions } from './promotions';
import { createStore, combineReducers } from 'redux';

export const ConfigureStore = () => {
    const store = createStore(combineReducers({
        dishes: Dishes,
        promotions: Promotions,
        comments: Comments,
        leaders: Leaders
    }));
    return store;
}