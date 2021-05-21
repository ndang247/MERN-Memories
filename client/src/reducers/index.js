import { combineReducers } from 'redux';
import posts from './posts';

export default combineReducers({ posts }); // Only need posts insted of posts: posts since key value here are the same.