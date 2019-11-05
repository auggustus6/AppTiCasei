import React from 'react';
import { View, Modal, Image, StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Modal_Image({ visible, closeModal, image }) {
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={() => closeModal()}>
                <View>
                    <View style={styles.containerImage}>
                        <Image
                            source={{ uri: image.label }}
                            style={styles.image}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerImage: {
        backgroundColor:'#444',
        width,
        height
    },

    image: {
        width,
        height,
        resizeMode: 'contain'
    }

})