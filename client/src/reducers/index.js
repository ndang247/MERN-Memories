import { combineReducers } from 'redux';
import posts from './posts';

export const reducers = combineReducers({ posts }); // Only need posts instead of posts: posts since key value here are the same.