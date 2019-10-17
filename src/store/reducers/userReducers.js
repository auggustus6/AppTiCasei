
const INITIAL_STATE = {
    Nome: '',
    genre: '',
    Email: '',
    type: '',
    Password: '',
    image:'',
    token: null,
    tokenFacebook: null,
    idUser: null,
    assignedTo: null,
    loading: false,
    error: false,
    message: ''
}

export default function UserReducers(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'REQUEST_USERS':
            return {
                ...state,
                error: false,
                loading: true
            }

        case 'CREATE_USER':
            return {
                ...state,
                loading: false,
                Nome: action.payload.Nome,
                type: action.payload.type,
                image: action.payload.image ? action.payload.image : null,
                genre: action.payload.genre,
                Email: action.payload.Email,
                token: action.payload.token,
                idUser: action.payload.id,
                message: action.payload.message
            }

        case 'AUTH_LOGGED': {

            return {
                ...state,
                Nome: action.payload.Nome,
                genre: action.payload.genre,
                image: action.payload.image ? action.payload.image : null,
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
                Nome: action.payload.Nome,
                genre: action.payload.genre,
                Email: action.payload.Email,
                image: action.payload.image ? action.payload.image : null,
                assignedTo: action.payload.assignedTo,
                idUser: action.payload.id,
                token: action.payload.token,
                tokenFacebook: action.payload.tokenFacebook ? action.payload.tokenFacebook : null,
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
                error: true,
                message: 'Algo aconteceu, tente novamente mais tarde.'
            }
        }
        default: {
            return state
        }
    }
}