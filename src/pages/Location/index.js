import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity as Button } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { requestLocationPermission } from '~/Permissoes';


const width = Dimensions.get('screen').width;



function Location() {
  const [observer, setObserver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState({
    latitude: -20.783934,
    longitude: -49.366340,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })


  const [destination, setDestination] = useState({
    latitude: -20.809545,
    longitude: -49.351457
  })


  useEffect(() => {
    return () => {
      if (observer) {
        Geolocation.stopObserving();
      }
    }
  }, [])


  watchPosition = () => {
    Geolocation.watchPosition(({ coords }) => {
      const { latitude, longitude, ...rest } = coords;
      setOrigin({ ...origin, latitude, longitude });
      setObserver(true);
    }, error => {
      setObserver(false);
    })
  }


  handleGetGoogleMapDirections = () => {

  }

  handleGeoLocation = async () => {
    const granted = await requestLocationPermission();
    setLoading(true);
    if (granted) {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude, ...rest } = coords;
          setOrigin({ ...origin, latitude, longitude });
          setLoading(false);
          watchPosition();
        },
        error => {
          // Alert.alert(error)
          setLoading(false);
        }, {
        enableHighAccuracy: false, timeout: 20000, maximumAge: 1000
      })
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={origin}>

        {/* 
        <MapViewDirections
          origin={origintest}
          destination={destination}
          strokeColors="#7230B4"
          strokeWidth={3}
          apikey='AIzaSyDexB3v1tvNIKg0CVEKZ7GRahEUNazie1M'
        /> */}

        <Marker
          pinColor="#7230B4"
          coordinate={destination}>

          {/* <Callout onPress={handleGetGoogleMapDirections}>
            <Text>Press to Get Direction</Text>
          </Callout> */}

        </Marker>

        <Marker
          pinColor="#7230B4"
          coordinate={origin}>
        </Marker>

      </MapView>

      <View styles={styles.containersBadge}>
        <View style={styles.badge}>
          <Icon name="heart" size={18} color="#333" />
        </View>
        <View style={styles.badge}>
          <Icon name="loader" size={18} color="#333" />
        </View>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <Button style={styles.button} onPress={handleGeoLocation}>
          <Text style={styles.buttonText}>
            {loading ? 'Buscando...' : 'Buscar Rota'}
          </Text>
        </Button>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 10
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  containersBadge: {
    paddingHorizontal: 50,
  },

  badge: {
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 10,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  button: {
    width: width * 0.85,
    height: 40,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 7,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  buttonText: {
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },

})

Location.navigationOptions = (navigation) => {
  return {
    title: 'Cerimônia',
  }
}


export default Location;
