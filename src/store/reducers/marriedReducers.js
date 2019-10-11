
const INITIAL_STATE = {
    dataMarried: {},
    comments: [],
    err: false,
    success: false,
    loading: false,
    message: ''
}

export default function MarriedReducers(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'REQUEST_MARRIED':
            return {
                ...state,
                loading: true,
                err: false,
                success: false,
            }

        case 'SUCCESS_GET_MARRIED':

            return {
                ...state,
                dataMarried: action.payload.data,
                success: true,
                loading: false
            }

        case 'ERR_GET_MARRIED':
            return {
                ...state,
                success: false,
                err: true,
                message: action.payload ? action.payload.data.message : ''
            }

        case 'POST_COMMENT':
            return {
                ...state,
                dataMarried: {
                    ...state.dataMarried, gallery: state.dataMarried.gallery.map(galeria => {
                        if (galeria._id === action.payload.idImage) {
                            galeria.commentaries = [...galeria.commentaries, {
                                _id: Math.random().toString,
                                author: action.payload.author,
                                commentarie: action.payload.comment
                            }]
                        }
                        return galeria;
                    })
                }
            }



        default:
            return state;
    }
}