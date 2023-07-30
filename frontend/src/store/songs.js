const RECEIVE_SONGS = 'songs/RECEIVE_SONGS'


const RECEIVE_SONG = 'songs/RECEIVE_SONG'


export const receiveSongs = (songs) => ({
    type: RECEIVE_SONGS,
    songs
})

export const receiveSong = (song) => ({
    type: RECEIVE_SONG,
    song
})

export const getSongs = (store) => {
    return store?.songs ? store.songs : {};
}

export const getSong = (songId) => (store) => {
    return store?.songs?.[songId] ? store.songs[songId] : {};
}

const songsReducer = (state = {}, action) => {
    let newState = {...Object.freeze(state)};
    switch(action.type) {
        case RECEIVE_SONGS:
            newState = action.songs;
            return newState;
        case RECEIVE_SONG:
            newState[action.song.id] = action.song
            return newState;
        default:
            return state;
    }
}

export default songsReducer;