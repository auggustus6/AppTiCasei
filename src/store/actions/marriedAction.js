export function async_getMarried(code) {
    return {
        type: 'ASYNC_GET_MARRIED',
        payload: {
            code
        }
    }
}

export function async_postComment(idMarried, idImage, comment) {
    return {
        type: 'ASYNC_POST_COMMENT',
        payload: {
            idMarried,
            idImage,
            comment
        }
    }
}

export function async_like_image(idMarried, idImage) {
    return {
        type: 'ASYNC_LIKE_IMAGE',
        payload: {
            idMarried,
            idImage
        }
    }
}