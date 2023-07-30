const RECEIVE_ALBUMS = 'albums/RECEIVE_ALBUMS'


const RECEIVE_ALBUM = 'albums/RECEIVE_ALBUM'


export const receiveAlbums = (albums) => ({
    type: RECEIVE_ALBUMS,
    albums
})

export const receiveAlbum = (album) => ({
    type: RECEIVE_ALBUM,
    album
})

export const getAlbum = (albumId) => (store) => {
    return store?.albums?.[albumId] ? store.albums[albumId] : null;
}


export const fetchAlbum = (albumId) => async dispatch => {
    const res = await fetch(`api/albums/${albumId}`)
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveAlbum(data));
    }
}

const albumsReducer = (state = {}, action) => {
    let newState = {...Object.freeze(state)};
    switch(action.type) {
        case RECEIVE_ALBUMS:
            newState = action.albums
            return newState;
        case RECEIVE_ALBUM:
            newState[action.album.id] = action.album
            return newState;
        default:
            return state;
    }
}

export default albumsReducer;