import { receiveAlbums } from "./albums"
import { receiveSongs } from "./songs"


const RECEIVE_ARTISTS = 'artists/RECEIVE_ARTISTS'

const RECEIVE_ARTIST = 'artists/RECEIVE_ARTIST'

const receiveArtists = (artists) => ({
    type: RECEIVE_ARTISTS,
    artists
})

export const receiveArtist = (artist) => ({
    type: RECEIVE_ARTIST,
    artist
})

export const getArtists = (store) => {
    return store?.artists ? store.artists : [];
}

export const getArtist = (artistId) => (store) => {
    return store?.artists?.[artistId] ? store.artists[artistId] : {};
}

export const getArtistWithExtras = (artistId) => (store) => {
    return {artist: store?.artists?.[artistId] ? store.artists[artistId] : {},
            albums: store?.albums ? store.albums : [],
            songs: store?.songs ? store.songs : []
    };
}


export const fetchArtists = () => async dispatch => {
    const res = await fetch('api/artists')
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveArtists(data));
    }
}

export const fetchArtist = (artistId) => async dispatch => {
    const res = await fetch(`api/artists/${artistId}`)
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveArtist(data.artist));
        dispatch(receiveAlbums(data.albums));
        dispatch(receiveSongs(data.songs));
    }
}

const artistsReducer = (state = {}, action) => {
    let newState = {...Object.freeze(state)};
    switch(action.type) {
        case RECEIVE_ARTISTS:
            newState = action.artists;
            return newState;
        case RECEIVE_ARTIST:
            newState[action.artist.id] = action.artist
            return newState;
        default:
            return state;
    }
}



export default artistsReducer;