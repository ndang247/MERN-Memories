import axios from 'axios';

const url = 'http://localhost:8080/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost); // Send the data to the back end which is newPost.