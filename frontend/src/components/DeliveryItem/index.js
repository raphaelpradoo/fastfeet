import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import Actions from '~/components/Actions';
import api from '~/services/api';
import history from '~/services/history';
import { statusColors, colors } from '~/styles/colors';
import { stateName } from '~/utils/states';

import DeliveryInformation from '~/components/DeliveryInformation';
import Status from '~/components/DeliveryStatus';
import { Container, ActionsContainer } from './styles';

export default function DeliveryItem({ data, updateDeliveries }) {
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

  async function handleDelete() {
    const confirm = window.confirm('Você tem certeza que deseja deletar isso?');

    if (!confirm) {
      toast.error('Encomenda não apagada!');
      return;
    }

    try {
      await api.delete(`/deliveries/${data.id}`);
      updateDeliveries();
      toast.success('Encomenda apagada com sucesso!');
    } catch (err) {
      toast.error('Essa encomenda não pode ser deletada!');
    }
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

      <Actions>
        <ActionsContainer>
          <div>
            <DeliveryInformation data={data} />
          </div>
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
