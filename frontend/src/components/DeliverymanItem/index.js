import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import InitialsName from '~/components/InitialsName';
import Actions from '~/components/Actions';
import api from '~/services/api';
import history from '~/services/history';
import { colors } from '~/styles/colors';

import { Container, ActionsContainer } from './styles';

export default function DeliverymanItem({ data }) {
  async function handleDelete() {
    const confirm = window.confirm('Você tem certeza ... ?');

    if (!confirm) {
      toast.error('... não apagada!');
      return;
    }

    try {
      await api.delete(`/deliveries/${data.id}`);
      // updateDeliveryman();
      toast.success('... apagada com sucesso!');
    } catch (err) {
      toast.error('... não pode ser deletada!');
    }
  }

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

      <Actions>
        <ActionsContainer>
          <div>
            <button
              onClick={() => history.push(`/deliveries/form/${data.id}`)}
              type="button"
            >
              <MdEdit color={colors.info} size={15} />
              <span>Editar</span>
            </button>
          </div>
          <div>
            <button onClick={handleDelete} type="button">
              <MdDeleteForever color={colors.danger} size={15} />
              <span>Excluir</span>
            </button>
          </div>
        </ActionsContainer>
      </Actions>
    </Container>
  );
}

DeliverymanItem.propTypes = {
  // updateDeliveryman: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};
