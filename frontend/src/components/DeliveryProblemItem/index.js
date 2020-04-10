import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import DeliveryProblemInformation from '~/components/DeliveryProblemInformation';
import Actions from '~/components/Actions';
import api from '~/services/api';
import { colors } from '~/styles/colors';

import { Container, ActionsContainer } from './styles';

export default function DeliveryProblemItem({ data }) {
  async function handleDelete() {
    const confirm = window.confirm('Você tem certeza ... ?');

    if (!confirm) {
      toast.error('... não apagada!');
      return;
    }

    try {
      await api.delete(`/deliveries/${data.id}`);
      // updateDeliveryProblem();
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
            <DeliveryProblemInformation data={data} />
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
  // updateDeliveryProblem: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    delivery: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};
