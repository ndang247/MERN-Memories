import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';

export const reducers = combineReducers({ posts, auth }); // Only need posts instead of posts: posts since key value here are the same.