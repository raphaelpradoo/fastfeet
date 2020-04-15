import { Platform } from 'react-native';
import styled from 'styled-components';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  background: #7159c1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

/*
export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;
*/
