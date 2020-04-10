import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function DeliveryProblemItem({ data }) {
  return (
    <Container>
      <small>#{data.delivery.id}</small>
      <small>{data.description}</small>
      <small>...</small>
    </Container>
  );
}

DeliveryProblemItem.propTypes = {
  // updateRecipient: PropTypes.func.isRequired,
  data: PropTypes.shape({
    description: PropTypes.string,
    delivery: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};
