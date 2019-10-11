export function createAccount(user) {
    return {
        type: 'ASYNC_CREATE_ACCOUNT',
        payload: {
            user
        }
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