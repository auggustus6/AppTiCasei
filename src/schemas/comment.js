export const CommentSchema = {
    name: 'Comment',
    primaryKey: 'id',
    properties: {
        id:'string',
        author: {
            type: 'string',
            default: 'Masculino'
        },
        comment: 'string',
        genre: 'string',
        entryAt: 'date?'
    }
};