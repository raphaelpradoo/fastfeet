import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import Actions from '~/components/Actions';
import { stateName } from '~/utils/states';
import api from '~/services/api';
import history from '~/services/history';
import { colors } from '~/styles/colors';

import { Container, ActionsContainer } from './styles';

export default function RecipientItem({ data, loadRecipients }) {
  async function handleDelete() {
    const confirm = window.confirm('Deseja realmente excluir o Destinatário ?');

    if (!confirm) {
      toast.info('Cancelada a exclusão do destinatário !');
      return;
    }

    try {
      await api.delete(`/recipients/${data.id}`);
      loadRecipients();
      toast.success('Destinatário excluído com sucesso !');
    } catch (err) {
      toast.error('Destinatário não pode ser excluído !');
    }
  }

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

      <Actions>
        <ActionsContainer>
          <div>
            <button
              onClick={() => history.push(`/recipient/form/${data.id}`)}
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

RecipientItem.propTypes = {
  loadRecipients: PropTypes.func.isRequired,
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
