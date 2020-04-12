import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import DeliveryProblemInformation from '~/components/DeliveryProblemInformation';
import Actions from '~/components/Actions';
import api from '~/services/api';
import { colors } from '~/styles/colors';

import { Container, ActionsContainer } from './styles';

export default function DeliveryProblemItem({ data, loadDeliveryProblem }) {
  async function handleDelete() {
    const confirm = window.confirm('Deseja realmente cancelar a encomenda ?');

    if (!confirm) {
      toast.info('Cancelado o cancelamento da encomenda !');
      return;
    }

    try {
      await api.delete(`problem/${data.delivery.id}/cancel-delivery`);
      loadDeliveryProblem();
      toast.success('Encomenda cancelada com sucesso !');
    } catch (err) {
      toast.error('Encomenda não pode ser cancelada !');
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
  loadDeliveryProblem: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    delivery: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};
