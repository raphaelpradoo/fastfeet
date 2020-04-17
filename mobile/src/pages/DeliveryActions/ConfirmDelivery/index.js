import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
  Container,
  Background,
  Content,
  CameraWrapper,
  Camera,
  Button,
  TakePictureButton,
} from './styles';

export default function ConfirmDelivery() {
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const route = useRoute();
  // eslint-disable-next-line prefer-const
  let cameraRef = useRef(null);
  const [pictureUri, setPictureUri] = useState('');

  async function handleSubmit() {
    // eslint-disable-next-line no-undef
    const dataFile = new FormData();
    dataFile.append('file', {
      type: 'image/jpg',
      uri: pictureUri,
      name: 'signature.jpg',
    });

    const pictureResponse = await api.post('files', dataFile);
    await api.put(`/deliverymen/${auth.id}/close/${route.params.delivery_id}`, {
      signature_id: pictureResponse.data.id,
    });
    navigation.navigate('Entregas');
  }

  async function handleTakePicture() {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      await setPictureUri(data.uri);
    }
  }

  return (
    <Container>
      <Background />
      <Content>
        {pictureUri ? (
          <CameraWrapper>
            <Image source={{ uri: pictureUri }} style={{ height: '100%' }} />
          </CameraWrapper>
        ) : (
          <CameraWrapper>
            <Camera
              ref={cameraRef}
              captureAudio={false}
              type="back"
              autoFocus="on"
              flashMode="off"
              permissionDialogTitle="Permission to use camera"
              permissionDialogMessage="We need your permission to use your camera phone"
            />
            <TakePictureButton onPress={handleTakePicture}>
              <Icon name="photo-camera" color="#fff" size={30} />
            </TakePictureButton>
          </CameraWrapper>
        )}
        <Button onPress={handleSubmit} loading={false}>
          Enviar
        </Button>
      </Content>
    </Container>
  );
}
