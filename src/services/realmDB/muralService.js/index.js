import { connectRealm } from '~/services/realmDB/realm';
import { Alert } from 'react-native';

export const createMural = async (value) => {
    const realm = await connectRealm();
    const { description } = value;

    try {
        realm.write(() => {
            const newMural = {
                description,
                entryAt: new Date()
            }

           realm.create('Mural', newMural, true)
            console.log('Mural criado' + JSON.stringify(newMural));
        })
    } catch (err) {
        console.log('Mural com erro' + JSON.stringify(newMural));
        Alert.alert('Erro ao salvar os dados no realm');
    }

}

