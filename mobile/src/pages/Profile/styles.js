import styled from 'styled-components/native';

import AvatarView from '~/components/Avatar';
import Button from '~/components/Button';
import InitialsNameView from '~/components/InitialsName';
import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
  justify-content: center;
`;

export const Content = styled.View`
  align-items: center;
  padding: 0 36px;
`;

export const Avatar = styled(AvatarView)`
  height: 140px;
  width: 140px;
  border-radius: 70px;
`;

export const InitialsName = styled(InitialsNameView)`
  height: 140px;
  width: 140px;
  border-radius: 70px;
`;

export const Details = styled.View`
  width: 100%;
  padding-top: 40px;
`;

export const Label = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const Information = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
  margin-bottom: 15px;
`;

export const LogoutButton = styled(Button)`
  background: ${colors.danger};
  height: 40px;
  margin-top: 15px;
  width: 100%;
`;
