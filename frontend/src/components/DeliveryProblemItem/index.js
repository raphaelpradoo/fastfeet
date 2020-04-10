import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import Actions from '~/components/Actions';
import api from '~/services/api';
import history from '~/services/history';
import { colors } from '~/styles/colors';

import { Container, ActionsContainer } from './styles';

export default function DeliveryProblemItem({ data, updateDeliveryProblem }) {
  async function handleDelete() {
    const confirm = window.confirm('Você tem certeza ... ?');

    if (!confirm) {
      toast.error('... não apagada!');
      return;
    }

    try {
      await api.delete(`/deliveries/${data.id}`);
      updateDeliveryProblem();
      toast.success('... apagada com sucesso!');
    } catch (err) {
      toast.error('... não pode ser deletada!');
    }
  }

  return (
    <Container>
      <small>#{data.delivery.id}</small>
      <small>{data.description}</small>

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
              <span>Cancelar encomenda</span>
            </button>
          </div>
        </ActionsContainer>
      </Actions>
    </Container>
  );
}

DeliveryProblemItem.propTypes = {
  updateDeliveryProblem: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    delivery: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};
