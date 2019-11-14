import { connectRealm } from '~/services/realmDB/realm';

export const createMural = async (description) => {
    const realm = await connectRealm();

    try {
        realm.write(() => {
            const newMural = realm.create('Mural', { description })
            console.log(newMural.description);
        })
    } catch (err) {
        console.log(err)
    }

}

