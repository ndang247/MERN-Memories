import { FETCH_POSTS, FETCH_POST, LIKE, CREATE_POST, UPDATE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from '../constants/actionType';

const Reducer = (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_POSTS:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case FETCH_POST:
            return { ...state, post: action.payload };
        case CREATE_POST:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        case LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        default:
            return state;
    }
}

export default Reducer;
