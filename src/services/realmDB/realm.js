import Realm from 'realm';
import { CommentSchema } from '~/schemas/comment';


export const getRealm = async () => {
    const realm = await Realm.open({
        schema: [CommentSchema],
        schemaVersion: 1
    });
    return realm;
}  