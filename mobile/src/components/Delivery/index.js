import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import Status from '~/components/Status';
import colors from '~/styles/colors';

import {
  Container,
  TitleContainer,
  Title,
  Details,
  Detail,
  TitleDetail,
  TextDetail,
  TextLink,
} from './styles';

export default function Delivery({ data }) {
  const navigation = useNavigation();

  function checkStatus(delivery) {
    if (delivery.canceled_at !== null) {
      return 'CANCELADA';
    }
    if (delivery.start_date === null) {
      return 'PENDENTE';
    }
    if (delivery.start_date !== null && delivery.end_date === null) {
      return 'RETIRADA';
    }
    if (delivery.end_date !== null) {
      return 'ENTREGUE';
    }
    return '';
  }

  const status = checkStatus(data);

  return (
    <Container>
      <TitleContainer>
        <Icon name="local-shipping" color={colors.primary} size={20} />
        <Title>Encomenda 0{data.id}</Title>
      </TitleContainer>

      <Status status={status} />

      <Details>
        <Detail>
          <TitleDetail>Data</TitleDetail>
          <TextDetail>{data.start_date_formated}</TextDetail>
        </Detail>
        <Detail>
          <TitleDetail>Cidade</TitleDetail>
          <TextDetail>{data.recipient.city}</TextDetail>
        </Detail>
        <Detail>
          <TextLink
            onPress={() => navigation.navigate('Detalhes', { delivery: data })}
          >
            Ver detalhes
          </TextLink>
        </Detail>
      </Details>
    </Container>
  );
}

Delivery.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    start_date_formated: PropTypes.string.isRequired,
    recipient: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
