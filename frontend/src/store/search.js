import csrfFetch from "./csrf"

export const GET_SEARCH_RESULTS = 'search/GET_SEARCH_RESULTS'

export const CLEAR_SEARCH_RESULTS = 'search/CLEAR_SEARCH_RESULTS'

export const receiveSearchResults = (searchResults) => ({
    type: GET_SEARCH_RESULTS,
    searchResults
})

export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
})

export const fetchSearchResults = (query) => async dispatch => {
    const res = await csrfFetch(`api/songs/search?query=${query}`);
    const data = await res.json();
    // console.log(data)
    dispatch(receiveSearchResults(data));
}

const searchReducer = (state = {}, action) => {
    const newState = {...Object.freeze(state)};

    switch (action.type) {
        case GET_SEARCH_RESULTS:
            console.log(action.searchResults)
            return {...action.searchResults};
        case CLEAR_SEARCH_RESULTS:
            console.log("whoops")
            return {};
        default:
            return newState;
    }
}

export default searchReducer;