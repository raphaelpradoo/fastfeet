import React, { useState, useEffect } from 'react';

import api from '~/services/api';

import { Container, Content, Grid } from './styles';

import PageTitle from '~/components/PageTitle';
import DeliveryProblemItem from '~/components/DeliveryProblemItem';

export default function DeliveryProblem() {
  const [deliveryProblems, setDeliveryProblems] = useState([]);
  const [page, setPage] = useState(1);

  // Busca todos os Problema de Entregas do Backend
  async function loadDeliveryProblems() {
    const response = await api.get('/deliveries/problems', {
      params: {
        page,
      },
    });
    const { data } = response;
    setDeliveryProblems(data);
  }

  useEffect(() => {
    loadDeliveryProblems();
  }, [page]);

  return (
    <Container>
      <Content>
        <PageTitle title="Problemas na entrega" />

        <Grid>
          <section>
            <strong>Encomenda</strong>
            <strong>Problema</strong>
            <strong>Ações</strong>
          </section>
          {deliveryProblems.map((problem) => (
            <DeliveryProblemItem
              loadDeliveryProblem={loadDeliveryProblems}
              key={problem.id}
              data={problem}
            />
          ))}
        </Grid>
      </Content>
    </Container>
  );
}
