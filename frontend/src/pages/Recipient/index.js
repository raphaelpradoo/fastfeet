import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, Grid } from './styles';

import PageTitle from '~/components/PageTitle';
import SearchInput from '~/components/SearchInput';
import AddButton from '~/components/AddButton';
import RecipientItem from '~/components/RecipientItem';

export default function Recipient() {
  const [recipients, setRecipients] = useState([]);
  const [page, setPage] = useState(1);

  // Busca os Destinatários do Backend pelo campo de Pesquisa
  async function handleSearchRecipients(e) {
    setPage(1);
    const response = await api.get('/recipients', {
      params: {
        name: e.target.value,
        page,
      },
    });
    const { data } = response;
    setRecipients(data);
  }

  // Busca todos os Destinatários do Backend
  async function loadRecipients() {
    setPage(1);
    const response = await api.get('/recipients', {
      params: {
        page,
      },
    });
    const { data } = response;
    setRecipients(data);
  }

  useEffect(() => {
    loadRecipients();
  }, [page]);

  return (
    <Container>
      <Content>
        <PageTitle title="Gerenciando destinatários">
          <SearchInput
            onChange={handleSearchRecipients}
            type="text"
            placeholder="Buscar por destinatários"
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
            <strong>Nome</strong>
            <strong>Endereço</strong>
            <strong>Ações</strong>
          </section>
          {recipients.map((recipient) => (
            <RecipientItem
              updateRecipients={loadRecipients}
              key={recipient.id}
              data={recipient}
            />
          ))}
        </Grid>
      </Content>
    </Container>
  );
}
