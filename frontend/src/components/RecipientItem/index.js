import React from 'react';
import PropTypes from 'prop-types';

import { stateName } from '~/utils/states';

import { Container } from './styles';

export default function RecipientItem({ data }) {
  function concatAddress(recipient) {
    return recipient.address.concat(
      ', ',
      recipient.number,
      ', ',
      recipient.city,
      ' - ',
      stateName[recipient.state]
    );
  }

  const concatenatedAddress = concatAddress(data);

  return (
    <Container>
      <small>#{data.id}</small>
      <small>{data.name}</small>
      <small>{concatenatedAddress}</small>
      <small>...</small>
    </Container>
  );
}

RecipientItem.propTypes = {
  // updateRecipient: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
    number: PropTypes.number,
    complement: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};
