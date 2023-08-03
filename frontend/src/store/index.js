import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import usersReducer from './users';
import sessionReducer from './session';
import artistsReducer from './artists';
import albumsReducer from './albums';
import songsReducer from './songs';
import playlistsReducer from './playlists';
import playlistSongsReducer from './playlistSongs';
import searchReducer from './search';
// import configureStore from '@reduxjs/toolkit';


const rootReducer = combineReducers({
  users: usersReducer, 
  session: sessionReducer, 
  artists: artistsReducer, 
  albums: albumsReducer,
  songs: songsReducer,
  playlists: playlistsReducer,
  playlistSongs: playlistSongsReducer,
  search: searchReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {}) => {
    return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore;