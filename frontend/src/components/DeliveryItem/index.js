import React from 'react';
// import { MdEdit, MdDeleteForever } from 'react-icons/md';
// import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

// import More from '~/components/MorePopUp';
// import api from '~/services/api';
// import history from '~/services/history';
import { statusColors } from '~/styles/colors';
import { stateName } from '~/utils/states';

// import DeliveryModal from '../Modal';
import Status from '~/components/DeliveryStatus';
import { Container } from './styles';

export default function DeliveryItem({ data }) {
  function checkStatus(deliveryItem) {
    if (deliveryItem.canceled_at !== null) {
      return 'CANCELADA';
    }
    if (deliveryItem.start_date === null) {
      return 'PENDENTE';
    }
    if (deliveryItem.start_date !== null && deliveryItem.end_date === null) {
      return 'RETIRADA';
    }
    if (deliveryItem.end_date !== null) {
      return 'ENTREGUE';
    }
    return '';
  }

  const status = checkStatus(data);

  return (
    <Container>
      <small>#{data.id}</small>
      <small>{data.recipient.name}</small>
      <small>{data.deliveryman.name}</small>
      <small>{data.recipient.city}</small>
      <small>{stateName[data.recipient.state]}</small>
      <Status
        text={status}
        color={statusColors[status].color}
        background={statusColors[status].background}
      />
    </Container>
  );
}

DeliveryItem.propTypes = {
  // updateDeliveries: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    product: PropTypes.string,
    canceled_at: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    recipient: PropTypes.shape({
      name: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    deliveryman: PropTypes.shape({
      name: PropTypes.string,
    }),
    status: PropTypes.string,
  }).isRequired,
};
