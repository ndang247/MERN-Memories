import * as api from '../api';
import { FETCH_POSTS, CREATE_POST, UPDATE, DELETE } from '../constants/actionType';

// Actions creators.
export const getPosts = () => async (dispath) => { // Since we are working with async data make use of redux thunk.
    try {
        const { data } = await api.fetchPosts();

        const action = {
            type: FETCH_POSTS,
            payload: data
        }

        dispath(action);

    } catch (error) {
        console.log(error);
        
    }
}

export const createPost = (newPost) => async (dispath) => {
    try {
        const { data } = await api.createPost(newPost);

        const action = {
            type: CREATE_POST,
            payload: data
        }

        dispath(action);

    } catch (error) {
        console.log(error);
        
    }
}

export const updatePost = (id, post) => async (dispath) => {
    try {
        const  { data } = await api.updatePost(id, post);

        const action = {
            type: UPDATE,
            payload: data
        }

        dispath(action);
        
    } catch (error) {
        console.log(error);
        
    }
}

export const deletePost = (id) => async (dispath) => {
    try {
        await api.deletePost(id);

        const action = {
            type: DELETE,
            payload: id
        }

        dispath(action);

    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        const action = {
            type: UPDATE,
            payload: data
        }

        dispatch(action);
        
    } catch (error) {
        console.log(error);
    }
}