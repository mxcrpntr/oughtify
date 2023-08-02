import csrfFetch from "./csrf"
import { storeCurrentUser } from "./session"


const RECEIVE_USERS = 'users/RECEIVE_USERS'

export const RECEIVE_USER = 'users/RECEIVE_USER'

const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

const getUsers = (store) => {
    return store?.users ? store.users : [];
}

const getUser = (userId) => (store) => {
    return store?.users?.[userId] ? store.users[userId] : null;
}

const fetchUsers = () => async dispatch => {
    const res = await fetch('api/users')
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveUsers(data));
    }
}

const fetchUser = (userId) => async dispatch => {
    const res = await fetch(`api/users/${userId}`)
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveUser(data));
    }
}

const createUser = (user) => async dispatch => {
    const res = await fetch(`api/users`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveUser(data));
    }
}

export const updateUser = (user) => async dispatch => {
    const copyUser = {...user};
    copyUser.queue = JSON.stringify(copyUser.queue);
    const res = await csrfFetch(`api/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify(copyUser),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        const data = await res.json();
        const updatedUser = data.user;
        updatedUser.queue = JSON.parse(updatedUser.queue);
        // debugger;
        storeCurrentUser(updatedUser);
        // storeCurrentUser
        // dispatch(receiveUser(data.user));
    }
}

const usersReducer = (state = {}, action) => {
    let newState = {...Object.freeze(state)};
    switch(action.type) {
        case RECEIVE_USERS:
            newState = action.users;
            return newState;
        case RECEIVE_USER:
            const updatedUser = {...action.user};
            // debugger;
            updatedUser.queue = JSON.parse(updatedUser.queue)
            newState[updatedUser.id] = updatedUser;
            return newState;
        default:
            return state;
    }
}

export default usersReducer;