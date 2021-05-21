// A reducer is a function accept two parameters: state and action.
// Based on the action do some logic accordingly and return the state.
export default (posts = [], action) => { // In this case the state here is an array post.
    switch (action.type) { // Action type can be fetch, create, delete or update.
        case "FETCH_POSTS":
            return action.payload;
        case "CREATE_POST":
            return [...posts, action.payload];
        default:
            return posts;
    }
}