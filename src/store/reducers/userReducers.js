
const INITIAL_STATE = {
    Nome: '',
    genre: '',
    Email: '',
    type: '',
    followMarrieds: [],
    image: '',
    token: null,
    tokenFacebook: null,
    idUser: null,
    assignedTo: null,
    loading: false,
    error: false,
    message: ''
    // Password: '',
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
                followMarrieds: action.payload.followMarrieds,
                Nome: action.payload.Nome,
                type: action.payload.type,
                image: action.payload.image ? action.payload.image : null,
                genre: action.payload.genre,
                Email: action.payload.Email,
                token: action.payload.token,
                idUser: action.payload.id,
                idFacebook: action.payload.idFacebook,
                message: action.payload.message
            }

        case 'AUTH_LOGGED': {
   
            return {
                ...state,
                Nome: action.payload.Nome,
                followMarrieds: action.payload.followMarrieds,
                genre: action.payload.genre,
                image: action.payload.image ? action.payload.image : null,
                Email: action.payload.Email,
                assignedTo: action.payload.assignedTo,
                idUser: action.payload.id,
                idFacebook: action.payload.idFacebook,
                token: action.payload.token,
                loading: false,
                message: action.payload.message,
            }
        }

        case 'UPDATE_USER': {

            return {
                ...state,
                loading:false,
                ...action.payload
            }
        }

        case 'UPDATE_IMAGE_USER': {

            return {
                ...state,
                loading:false,
                image: action.payload.image_url

            }
        }

        case 'FOLLOW_MARRIED': {
            return {
                ...state,
                loading:false,
                followMarrieds: [...action.payload.followMarrieds]
            }
        }


        case 'LOGGED_USER': {
         
            return {
                ...state,
                followMarrieds: action.payload.followMarrieds,
                Nome: action.payload.Nome,
                genre: action.payload.genre,
                Email: action.payload.Email,
                image: action.payload.image ? action.payload.image : null,
                assignedTo: action.payload.assignedTo,
                idUser: action.payload.id,
                idFacebook: action.payload.idFacebook,
                type: action.payload.type,
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
                loading:false,
                message: 'Algo aconteceu, tente novamente mais tarde.'
            }
        }
        default: {
            return state
        }
    }
}