import React from 'react';
import PropTypes from 'prop-types';

import Modal from '~/components/Modal';
import { Container } from '~/styles/information';

export default function DeliveryProblemInformation({ data }) {
  return (
    <Modal>
      <Container>
        <div>
          <strong>Visualizar problema</strong>
          <small>{data.description}</small>
        </div>
      </Container>
    </Modal>
  );
}

DeliveryProblemInformation.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string,
  }).isRequired,
};
