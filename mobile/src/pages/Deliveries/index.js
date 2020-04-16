import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container } from './styles';

export default function Deliveries() {
  return (
    <Container>
      <Text>Entregas</Text>
    </Container>
  );
}

Deliveries.navigationOptions = {
  tabBarLabel: 'Entregas',
  tabBarOptions: {
    activeTintColor: '#7159c1',
    inactiveTintColor: '#808080',
  },
  tabBarIcon: ({ tintColor }) => (
    <Icon name="reorder" size={30} color={tintColor} />
  ),
};
