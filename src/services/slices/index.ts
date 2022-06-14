import { combineReducers } from 'redux';
import articleReducer from './articles';
import profileReducer from './profile';

export const rootReducer = combineReducers({
  articles: articleReducer,
  profile: profileReducer,
});
