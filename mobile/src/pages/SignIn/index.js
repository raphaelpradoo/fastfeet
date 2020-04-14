import React, { useRef } from 'react';
import { Image, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';

import { Form } from '@unform/mobile';

import logo from '~/assets/fastfeet-logo.png';
import { signInRequest } from '~/store/modules/auth/actions';
import colors from '~/styles/colors';

import { Container } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const formRef = useRef(null);

  function handleSubmit({ id }, { reset }) {
    dispatch(signInRequest(id));
    reset();
  }

  return (
    <Container>
      <StatusBar backgroundColor={colors.primary} />
      <Image source={logo} />
      <Form ref={formRef} onSubmit={handleSubmit} />
    </Container>
  );
}
