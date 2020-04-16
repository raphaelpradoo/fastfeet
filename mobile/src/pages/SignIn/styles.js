import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';
import UnInput from '~/components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  background: #7d40e7;
  flex: 1;

  justify-content: center;
  align-items: center;

  padding: 0 30px;
`;

export const Input = styled(UnInput)`
  margin-top: 37.5px;
`;

export const SubmitButton = styled(Button)`
  background: #82bf18;
  width: 100%;
  margin-top: 15.5px;
`;
