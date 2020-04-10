import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Delivery from '~/pages/Delivery';
import Deliveryman from '~/pages/Deliveryman';
import Recipient from '~/pages/Recipient';
import DeliveryProblem from '~/pages/DeliveryProblem';

import RecipientForm from '~/pages/Recipient/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/delivery" component={Delivery} isPrivate />

      <Route path="/deliveryman" component={Deliveryman} isPrivate />

      <Route path="/recipient" exact component={Recipient} isPrivate />
      <Route path="/recipient/form" exact component={RecipientForm} isPrivate />
      <Route
        path="/recipient/form/:id"
        exact
        component={RecipientForm}
        isPrivate
      />

      <Route path="/deliveryProblem" component={DeliveryProblem} isPrivate />
    </Switch>
  );
}
