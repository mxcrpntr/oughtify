import { receivePlaylistSongs } from "./playlistSongs"

const RECEIVE_PLAYLISTS = 'playlists/RECEIVE_PLAYLISTS'

const RECEIVE_PLAYLIST = 'playlists/RECEIVE_PLAYLIST'

const receivePlaylists = (playlists) => ({
    type: RECEIVE_PLAYLISTS,
    playlists
})

const receivePlaylist = (playlist) => ({
    type: RECEIVE_PLAYLIST,
    playlist
})

export const getPlaylists = (store) => {
    return store?.playlists ? store.playlists : [];
}

export const getPlaylist = (playlistId) => (store) => {
    return store?.playlists?.[playlistId] ? store.playlists[playlistId] : null;
}

export const fetchPlaylists = () => async dispatch => {
    const res = await fetch('api/playlists')
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePlaylists(data));
    }
}

export const fetchPlaylist = (playlistId) => async dispatch => {
    const res = await fetch(`api/playlists/${playlistId}`)
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePlaylist(data.playlist));
        dispatch(receivePlaylistSongs(data.playlistSongs));
    }
}

export const createPlaylist = (playlist) => async dispatch => {
    const res = await fetch(`api/playlists`, {
        method: 'POST',
        body: JSON.stringify(playlist),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePlaylist(data));
    }
}

export const updatePlaylist = (playlist) => async dispatch => {
    const res = await fetch(`api/playlists/${playlist.id}`, {
        method: 'PATCH',
        body: JSON.stringify(playlist),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePlaylist(data));
    }
}

const playlistsReducer = (state = {}, action) => {
    let newState = {...Object.freeze(state)};
    switch(action.type) {
        case RECEIVE_PLAYLISTS:
            newState = action.playlists;
            return newState;
        case RECEIVE_PLAYLIST:
            newState[action.playlist.id] = action.playlist
            return newState;
        default:
            return state;
    }
}

export default playlistsReducer;