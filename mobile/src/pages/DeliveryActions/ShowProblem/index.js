import React, { useRef, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';

import api from '~/services/api';
import {
  Container,
  Background,
  TitleDeliveryId,
  Content,
  TextAreaInput,
} from './styles';

export default function ShowProblem() {
  const [description, setDescription] = useState('');
  const formRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { delivery_id } = route.params;

  async function loadProblem() {
    const response = await api.get(`/problem/delivery/${delivery_id}`);
    if (response.data !== null) {
      setDescription(response.data.description);
    } else {
      Alert.alert('Tudo certo', 'Nenhum problema com a encomenda');
      navigation.navigate('Detalhes');
    }
  }

  useEffect(() => {
    loadProblem();
  });

  return (
    <Container>
      <Background>
        <TitleDeliveryId>Encomenda 0{delivery_id}</TitleDeliveryId>
      </Background>
      <Content>
        <Form ref={formRef}>
          <TextAreaInput
            name="description"
            value={description}
            onChangeText={setDescription}
            placeholder="..."
            maxLength={1000}
            readonly
            editable={false}
            multiline
            style={{
              textAlignVertical: 'top',
            }}
          />
        </Form>
      </Content>
    </Container>
  );
}
