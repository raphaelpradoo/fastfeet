import React, { useRef, useState } from 'react';
import { Image, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/mobile';

import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.png';
import colors from '~/styles/colors';
import { Container, Input, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const formRef = useRef(null);

  const [id, setId] = useState('');

  function handleSubmit({ reset }) {
    dispatch(signInRequest(id));
    reset();
  }

  return (
    <Container>
      <StatusBar backgroundColor={colors.primary} />
      <Image source={logo} />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="id"
          value={id}
          onChangeText={setId}
          keyboardType="number-pad"
          placeholder="Informe seu ID de cadastro"
          autoCorrect={false}
          returnKeyType="send"
          autoCapitalize="none"
        />
        <SubmitButton
          loading={loading}
          onPress={() => formRef.current.submitForm()}
        >
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
