export function createAccount(user) {
    return {
        type: 'ASYNC_CREATE_ACCOUNT',
        payload: {
            user
        }
    }
}

export function updateUser(user) {
    return {
        type: 'ASYNC_UPDATE_USER',
        payload: {
            user
        }
    }
}

export function userfollowMarried(idMarried) {
    return {
        type: 'ASYNC_FOLLOW_MARRIED',
        payload: { idMarried }
    }
}




export function loggedAccount(user) {
    return {
        type: 'ASYNC_LOGGED_USER',
        payload: {
            user
        }
    }
}