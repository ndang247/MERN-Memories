import * as api from '../api';

// Actions creators.
export const getPosts = () => async (dispath) => { // Since we are working with async data make use of redux thunk.
    try {
        const { data } = await api.fetchPosts();

        const action = {
            type: "FETCH_POSTS",
            payload: data
        }

        dispath(action);

    } catch (err) {
        console.log(err.message);
    }
}

export const createPost = (newPost) => async (dispath) => {
    try {
        const { data } = await api.createPost(newPost);

        const action = {
            type: "CREATE_POST",
            payload: data
        }

        dispath(action);

    } catch (err) {
        console.log(err.message);
    }
}

export const updatePost = (id, post) => async (dispath) => {
    try {
        const  { data } = await api.updatePost(id, post);

        const action = {
            type: 'UPDATE',
            payload: data
        }

        dispath(action);
        
    } catch (err) {
        console.log(err.message);
    }
}