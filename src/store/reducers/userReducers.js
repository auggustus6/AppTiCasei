
const INITIAL_STATE = {
    Email: '',
    Password: '',
    token: null,
    idUser: null,
    assignedTo: null,
    loading: false,
    message: ''
}

export default function UserReducers(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'REQUEST_USERS':
            return {
                ...state,
                loading: true
            }

        case 'CREATE_USER':
            return {
                ...state,
                loading: false,
                Email: action.payload.Email,
                token: action.payload.token,
                idUser: action.payload.id,
                message: action.payload.message
            }

        case 'AUTH_LOGGED': {

            return {
                ...state,
                Email: action.payload.Email,
                assignedTo: action.payload.assignedTo,
                idUser: action.payload.id,
                token: action.payload.token,
                loading: false,
                message: action.payload.message,
            }
        }


        case 'LOGGED_USER': {
            return {
                ...state,
                Email: action.payload.Email,
                assignedTo: action.payload.assignedTo,
                idUser: action.payload.id,
                token: action.payload.token,
                loading: false,
                message: action.payload.message,
            }
        }

        case 'LOGOUT_USER': {
            return {
                state: INITIAL_STATE
            }
        }

        case 'ERROR_USER': {
            return {
                ...state,
                message: action.payload.message
            }
        }
        default: {
            return state
        }
    }
}