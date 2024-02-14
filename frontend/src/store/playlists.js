import csrfFetch from "./csrf"
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
        console.log(data)
        dispatch(receivePlaylists(data.playlists));
    }
}

export const fetchPlaylist = (playlistId) => async dispatch => {
    const res = await fetch(`api/playlists/${playlistId}`)
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePlaylist(data.playlist));
        data.playlistSongs ?
            dispatch(receivePlaylistSongs(data.playlistSongs)) :
            dispatch(receivePlaylistSongs({}))

    }
}

export const createPlaylist = (playlist) => async dispatch => {
    const res = await csrfFetch(`api/playlists`, {
        method: 'POST',
        body: JSON.stringify(playlist),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        const data = await res.json();
        console.log(data)
        dispatch(receivePlaylist(data));
    }
}

export const updatePlaylistTitle = (playlist) => async dispatch => {
    debugger
    const res = await csrfFetch(`api/playlists/${playlist.id}`, {
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

export const updatePlaylistImage = (playlist) => async dispatch => {
    const formData = new FormData();
    // formData.append('id', playlist.id);
    formData.append('playlist[user_id]', playlist.playlist.user_id);
    formData.append('playlist[image_file]', playlist.playlist.image_file, playlist.playlist.image_file.name);
    console.log(playlist.playlist.image_file);
    debugger
    const res = await csrfFetch(`api/playlists/${playlist.id}`, {
        method: 'PATCH',
        body: formData
    }, true)
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePlaylist(data));
    }
}

export const deletePlaylist = (playlist) => async dispatch => {
    const res = await csrfFetch(`api/playlists/${playlist.id}`, {
        method: 'DELETE'
    })
    // if (res.ok) {
    //     const data = await res.json();
    //     dispatch(receivePlaylist(data));
    // }
}

const playlistsReducer = (state = {}, action) => {
    let newState = {...Object.freeze(state)};
    switch(action.type) {
        case RECEIVE_PLAYLISTS:
            newState = action.playlists;
            // console.log(action)
            return newState;
        case RECEIVE_PLAYLIST:
            newState[action.playlist.id] = action.playlist
            return newState;
        default:
            return state;
    }
}

export default playlistsReducer;