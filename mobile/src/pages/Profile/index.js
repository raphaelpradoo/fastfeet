import React from 'react';
import { useDispatch } from 'react-redux';
import { Text } from 'react-native';

import { signOut } from '~/store/modules/auth/actions';

import { Container, LogoutButton } from './styles';

export default function Profile() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Text>Perfil</Text>
      <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
    </Container>
  );
}
