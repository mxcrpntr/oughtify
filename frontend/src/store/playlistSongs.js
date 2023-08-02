const RECEIVE_PLAYLIST_SONGS = 'playlist_songs/RECEIVE_PLAYLIST_SONGS'

const RECEIVE_PLAYLIST_SONG = 'playlist_songs/RECEIVE_PLAYLIST_SONG'

export const receivePlaylistSongs = (playlistSongs) => ({
    type: RECEIVE_PLAYLIST_SONGS,
    playlistSongs
})

export const receivePlaylistSong = (playlistSong) => ({
    type: RECEIVE_PLAYLIST_SONG,
    playlistSong
})

export const getPlaylistSongs = (store) => {
    return store?.playlistSongs ? store.playlistSongs : [];
}

const getPlaylistSong = (playlistSongId) => (store) => {
    return store?.playlistSongs?.[playlistSongId] ? store.playlistSongs[playlistSongId] : null;
}

const fetchPlaylistSongs = () => async dispatch => {
    const res = await fetch('api/playlist_songs')
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePlaylistSongs(data));
    }
}

const fetchPlaylistSong = (playlistSongId) => async dispatch => {
    const res = await fetch(`api/playlist_songs/${playlistSongId}`)
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePlaylistSong(data));
    }
}

const createPlaylistSong = (playlistSong) => async dispatch => {
    const res = await fetch(`api/playlist_songs`, {
        method: 'POST',
        body: JSON.stringify(playlistSong),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePlaylistSong(data));
    }
}

const updatePlaylistSong = (playlistSong) => async dispatch => {
    const res = await fetch(`api/playlist_songs/${playlistSong.id}`, {
        method: 'PATCH',
        body: JSON.stringify(playlistSong),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(receivePlaylistSong(data));
    }
}

const playlistSongsReducer = (state = {}, action) => {
    let newState = {...Object.freeze(state)};
    switch(action.type) {
        case RECEIVE_PLAYLIST_SONGS:
            newState = action.playlistSongs;
            return newState;
        case RECEIVE_PLAYLIST_SONG:
            newState[action.playlistSong.id] = action.playlistSong
            return newState;
        default:
            return state;
    }
}

export default playlistSongsReducer;