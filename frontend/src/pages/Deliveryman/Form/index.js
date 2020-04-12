import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import SaveButton from '~/components/Button/SaveButton';
import BackButton from '~/components/Button/BackButton';
import SimpleInput from '~/components/Input/SimpleInput';
import PhotoInput from '~/components/Input/PhotoInput';
import HeaderForm from '~/components/HeaderForm';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, UnForm } from './styles';

export default function DeliverymanForm({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);

  useEffect(() => {
    async function loadInitialData(deliverymanId) {
      if (id) {
        const response = await api.get(`/deliverymen/${deliverymanId}`);
        formRef.current.setData(response.data[0]);
        formRef.current.setFieldValue(
          'avatar',
          response.data[0].avatar !== null ? response.data[0].avatar.url : null
        );
      }
    }
    loadInitialData(id);
  }, [id]);

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('* Nome é obrigatório'),
        email: Yup.string().required('* E-mail é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const dataFile = new FormData();

      dataFile.append('file', data.avatar);

      const responseFile = data.avatar
        ? await api.post('files', dataFile)
        : null;

      if (id) {
        await api.put(`/deliverymen/${id}`, {
          name: data.name,
          email: data.email,
          avatar_id: responseFile !== null ? responseFile.data.id : null,
        });

        toast.success('Entregador editado com sucesso!');
        history.push('/deliveryman');
      } else {
        await api.post('/deliverymen', {
          name: data.name,
          email: data.email,
          avatar_id: responseFile !== null ? responseFile.data.id : null,
        });

        toast.success('Entregador criado com sucesso!');
        history.push('/deliveryman');
      }

      reset();
    } catch (err) {
      toast.error('Erro na execução !');
    }
  }

  return (
    <Container>
      <Content>
        <HeaderForm
          title={id ? 'Edição de entregador' : 'Cadastro de entregador'}
        >
          <BackButton />
          <SaveButton action={() => formRef.current.submitForm()} />
        </HeaderForm>

        <UnForm ref={formRef} onSubmit={handleSubmit}>
          <PhotoInput name="avatar" />
          <SimpleInput
            label="Nome"
            name="name"
            type="text"
            placeholder="Nome do entregador"
          />
          <SimpleInput
            label="Email"
            name="email"
            type="email"
            placeholder="exemplo@fastfeet.com"
            onKeyPress={(e) =>
              e.key === 'Enter' ? formRef.current.submitForm() : null
            }
          />
        </UnForm>
      </Content>
    </Container>
  );
}

DeliverymanForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
