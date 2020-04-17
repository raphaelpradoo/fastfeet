import styled from 'styled-components/native';

import TextArea from '~/components/TextAreaInput';
import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
  background: #fff;
  flex: 1;
`;

export const Background = styled.View`
  background: ${colors.primary};
  height: 155px;
`;

export const TitleDeliveryId = styled.Text`
  background: ${colors.primary};
  flex: 1;
  align-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin-top: 50px;
  color: #fff;
`;

export const Content = styled.View`
  margin-top: -60px;
  padding: 0 20px;
`;

export const TextAreaInput = styled(TextArea)`
  height: 70%;
  font-size: 16px;
  border: 1px solid #0000001a;
`;
