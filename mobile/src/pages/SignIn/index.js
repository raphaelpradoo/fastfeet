import React from 'react';
import { Image, StatusBar } from 'react-native';
import { Form } from '@unform/mobile';

import logo from '~/assets/logo.png';
import colors from '~/styles/colors';
import { Container, Input, SubmitButton } from './styles';

export default function SignIn() {
  return (
    <Container>
      <StatusBar backgroundColor={colors.primary} />
      <Image source={logo} />
      <Form>
        <Input
          name="id"
          keyboardType="default"
          placeholder="Informe seu ID de cadastro"
          autoCorrect={false}
          returnKeyType="send"
          autoCapitalize="none"
        />
        <SubmitButton>Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
}
