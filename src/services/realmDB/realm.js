import Realm from 'realm';
import { MuralSchema } from '~/schemas/mural';


export const connectRealm = async () => {
    const realm = await Realm.open({
        schema: [MuralSchema],
        schemaVersion: 3
    });
    return realm;
}  