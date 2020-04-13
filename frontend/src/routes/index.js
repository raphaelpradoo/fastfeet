import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Delivery from '~/pages/Delivery';
import Deliveryman from '~/pages/Deliveryman';
import Recipient from '~/pages/Recipient';
import DeliveryProblem from '~/pages/DeliveryProblem';

import DeliveryForm from '~/pages/Delivery/Form';
import RecipientForm from '~/pages/Recipient/Form';
import DeliverymanForm from '~/pages/Deliveryman/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/delivery" exact component={Delivery} isPrivate />
      <Route path="/delivery/form" exact component={DeliveryForm} isPrivate />
      <Route
        path="/delivery/form/:id"
        exact
        component={DeliveryForm}
        isPrivate
      />

      <Route path="/deliveryman" exact component={Deliveryman} isPrivate />
      <Route
        path="/deliveryman/form"
        exact
        component={DeliverymanForm}
        isPrivate
      />
      <Route
        path="/deliveryman/form/:id"
        exact
        component={DeliverymanForm}
        isPrivate
      />

      <Route path="/recipient" exact component={Recipient} isPrivate />
      <Route path="/recipient/form" exact component={RecipientForm} isPrivate />
      <Route
        path="/recipient/form/:id"
        exact
        component={RecipientForm}
        isPrivate
      />

      <Route
        path="/deliveryProblem"
        exact
        component={DeliveryProblem}
        isPrivate
      />
    </Switch>
  );
}
