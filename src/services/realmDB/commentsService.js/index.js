import { getRealm } from '~/services/realmDB/realm';

export const saveComment  = async()=>{
    const realm = await getRealm();

    realm.create('Comment', {
        
    })
}

