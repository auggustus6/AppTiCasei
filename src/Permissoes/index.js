import {PermissionsAndroid} from 'react-native';

export async function  requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Permitir localização',
                'message': 'App de Maps solicita permissão, aceite e ative sua localização.'
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;

        } else {
            return false;
        }

    } catch (err) {
        console.warn(err)
    }

  }