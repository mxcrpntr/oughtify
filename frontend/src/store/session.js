import csrfFetch from './csrf';
import { RECEIVE_USER } from './users';

const SET_CURRENT_USER = 'session/SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER';

const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    payload: user
})

const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER
});

const storeCSRFToken = response => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}
  
export const storeCurrentUser = user => {
    if (user) {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
    }
    else {
      sessionStorage.removeItem("currentUser");
    }
}

export const restoreSession = () => async dispatch => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    let updatedUser = null;
    if (data.user) {
      updatedUser = {...data.user};
      const storedQueue = JSON.parse(updatedUser.queue)
      const storedReverseQueue = JSON.parse(updatedUser.reverseQueue);
      if (storedQueue && storedReverseQueue &&
         ((storedQueue.length === 0 || (storedQueue.length > 0 && storedQueue.map(songAndTime => new Date() - new Date(songAndTime[0].dateFetched)).sort().slice(-1)[0] < 86400000)) ||
         (storedReverseQueue.length === 0 || (storedReverseQueue.length > 0 && storedReverseQueue.map(songAndTime => new Date() - new Date(songAndTime[0].dateFetched)).sort().slice(-1)[0] < 86400000)))) {
          updatedUser.queue = storedQueue
          updatedUser.reverseQueue = storedReverseQueue
      } else {
          updatedUser.queue = []
          updatedUser.reverseQueue = []
      }
    }
    storeCurrentUser(updatedUser);
    dispatch(setCurrentUser(updatedUser));
    return response;
 };

export const login = ({ credential, password }) => async dispatch => {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ credential, password })
    });
    const data = await response.json();
    let updatedUser = null;
    if (data.user) {
      updatedUser = {...data.user};
      const storedQueue = JSON.parse(updatedUser.queue)
      const storedReverseQueue = JSON.parse(updatedUser.reverseQueue);
      if (storedQueue && storedReverseQueue &&
         ((storedQueue.length === 0 || (storedQueue.length > 0 && storedQueue.map(songAndTime => new Date() - new Date(songAndTime[0].dateFetched)).sort().slice(-1)[0] < 86400000)) ||
         (storedReverseQueue.length === 0 || (storedReverseQueue.length > 0 && storedReverseQueue.map(songAndTime => new Date() - new Date(songAndTime[0].dateFetched)).sort().slice(-1)[0] < 86400000)))) {
          updatedUser.queue = storedQueue
          updatedUser.reverseQueue = storedReverseQueue
      } else {
          updatedUser.queue = []
          updatedUser.reverseQueue = []
      }
    }
    storeCurrentUser(updatedUser);
    dispatch(setCurrentUser(updatedUser));
    return response;
};

export const signup = ({ email, password, name, birthDate }) => async dispatch => {
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password, name, birthDate })
    });
    const data = await response.json();
    const updatedUser = {...data.user}
    // if (updatedUser.queue) updatedUser.queue = JSON.parse(updatedUser.queue)
    storeCurrentUser(updatedUser);
    dispatch(setCurrentUser(updatedUser));
    return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE"
  });
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  return response;
};

const initialState = { 
    user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case RECEIVE_USER:
      const updatedUser = {...action.user};
      if (updatedUser.queue) updatedUser.queue = JSON.parse(updatedUser.queue)
      storeCurrentUser(updatedUser);
      return { ...state, user: updatedUser };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;