import React from 'react';
// import { MdEdit, MdDeleteForever } from 'react-icons/md';
// import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import InitialsName from '~/components/InitialsName';
// import More from '~/components/MorePopUp';
// import api from '~/services/api';
// import history from '~/services/history';

import { Container } from './styles';

export default function DeliverymanItem({ data }) {
  return (
    <Container>
      <small>#{data.id}</small>
      {data.avatar ? (
        <img src={data.avatar.url} alt="avatar" />
      ) : (
        <InitialsName name={data.name} />
      )}
      <small>{data.name}</small>
      <small>{data.email}</small>
      <small>...</small>
    </Container>
  );
}

DeliverymanItem.propTypes = {
  // updateDeliverymen: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};
