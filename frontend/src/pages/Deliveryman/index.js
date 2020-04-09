import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, Grid } from './styles';

import PageTitle from '~/components/PageTitle';
import SearchInput from '~/components/SearchInput';
import AddButton from '~/components/AddButton';
import DeliverymanItem from '~/components/DeliverymanItem';

export default function Deliveryman() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [page, setPage] = useState(1);

  // Busca os Entregadores do Backend pelo campo de Pesquisa
  async function handleSearchDeliveryman(e) {
    setPage(1);
    const response = await api.get('/deliverymen', {
      params: {
        name: e.target.value,
        page,
      },
    });
    const { data } = response;
    setDeliverymen(data);
  }

  // Busca todos os Entregadores do Backend
  async function loadDeliverymen() {
    const response = await api.get('/deliverymen', {
      params: {
        page,
      },
    });
    const { data } = response;
    setDeliverymen(data);
  }

  useEffect(() => {
    loadDeliverymen();
  }, [page]);

  return (
    <Container>
      <Content>
        <PageTitle title="Gerenciando entregadores">
          <SearchInput
            onChange={handleSearchDeliveryman}
            type="text"
            placeholder="Buscar por entregadores"
          />
          <AddButton
            Icon={MdAdd}
            title="CADASTRAR"
            action={() => history.push('')}
            type="button"
          />
        </PageTitle>

        <Grid>
          <section>
            <strong>ID</strong>
            <strong>Foto</strong>
            <strong>Nome</strong>
            <strong>E-mail</strong>
            <strong>Ações</strong>
          </section>
          {deliverymen.map((deliveryman) => (
            <DeliverymanItem
              updateDeliverymen={loadDeliverymen}
              key={deliveryman.id}
              data={deliveryman}
            />
          ))}
        </Grid>
      </Content>
    </Container>
  );
}
