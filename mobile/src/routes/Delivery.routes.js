import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Deliveries from '~/pages/Deliveries';
import DeliveryDetails from '~/pages/DeliveryDetails';
import ReportProblem from '~/pages/DeliveryActions/ReportProblem';
import ShowProblem from '~/pages/DeliveryActions/ShowProblem';
import ConfirmDelivery from '~/pages/DeliveryActions/ConfirmDelivery';

const Stack = createStackNavigator();

export default function DeliveryRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: '#fff',
        headerTransparent: true,
      }}
      initialRouteName="Entregas"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Entregas"
        component={Deliveries}
      />
      <Stack.Screen
        name="Detalhes"
        options={{
          title: 'Detalhes da encomenda',
        }}
        component={DeliveryDetails}
      />
      <Stack.Screen
        name="InformarProblema"
        options={{
          title: 'Informar problema',
        }}
        component={ReportProblem}
      />
      <Stack.Screen
        name="VisualizarProblema"
        options={{
          title: 'Visualizar problema',
        }}
        component={ShowProblem}
      />
      <Stack.Screen
        name="ConfirmarEntrega"
        options={{
          title: 'Confirmar entrega',
        }}
        component={ConfirmDelivery}
      />
    </Stack.Navigator>
  );
}
