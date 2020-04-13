import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { parseISO, format } from 'date-fns';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, Grid } from './styles';

import PageTitle from '~/components/PageTitle';
import SearchInput from '~/components/SearchInput';
import AddButton from '~/components/AddButton';
import DeliveryItem from '~/components/DeliveryItem';

export default function Delivery() {
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);

  function formatDates(data) {
    return data.map((delivery) => ({
      ...delivery,
      start_dateFormated: delivery.start_date
        ? format(parseISO(delivery.start_date), 'dd/MM/yyyy')
        : null,
      end_dateFormated: delivery.end_date
        ? format(parseISO(delivery.end_date), 'dd/MM/yyyy')
        : null,
    }));
  }

  // Busca todas as Encomendas do Backend pelo campo de Pesquisa
  async function handleSearchDelivery(e) {
    setPage(1);
    const response = await api.get('/deliveries', {
      params: {
        product: e.target.value,
        page,
      },
    });

    const data = formatDates(response.data);

    setDeliveries(data);
  }

  // Busca todas Encomendas do Backend
  async function loadDeliveries() {
    const response = await api.get('/deliveries', {
      params: {
        page,
      },
    });

    const data = formatDates(response.data);

    setDeliveries(data);
  }

  useEffect(() => {
    loadDeliveries();
  }, [page]);

  return (
    <Container>
      <Content>
        <PageTitle title="Gerenciando encomendas">
          <SearchInput
            onChange={handleSearchDelivery}
            type="text"
            placeholder="Buscar por encomendas"
          />
          <AddButton
            Icon={MdAdd}
            title="CADASTRAR"
            action={() => history.push('/delivery/form')}
            type="button"
          />
        </PageTitle>

        <Grid>
          <section>
            <strong>ID</strong>
            <strong>Destinatário</strong>
            <strong>Entregador</strong>
            <strong>Cidade</strong>
            <strong>Estado</strong>
            <strong>Status</strong>
            <strong>Ações</strong>
          </section>
          {deliveries.map((delivery) => (
            <DeliveryItem
              loadDelivery={loadDeliveries}
              key={delivery.id}
              data={delivery}
            />
          ))}
        </Grid>
      </Content>
    </Container>
  );
}
