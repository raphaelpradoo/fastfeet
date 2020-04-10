import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import SaveButton from '~/components/Button/SaveButton';
import BackButton from '~/components/Button/BackButton';
import SimpleInput from '~/components/Input/SimpleInput';
import MaskInput from '~/components/Input/MaskedInput';
import HeaderForm from '~/components/HeaderForm';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, UnForm } from './styles';

export default function RecipientForm({ match }) {
  const { id } = match.params;
  const formRef = useRef();

  useEffect(() => {
    async function loadInitialData() {
      if (id) {
        const response = await api.get(`/recipients/${id}`);
        formRef.current.setData(response.data);
      }
    }
    loadInitialData();
  }, [id]);

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('* Nome é obrigatório'),
        address: Yup.string().required('* Endereço é obrigatório'),
        number: Yup.string().required('* Número é obrigatório'),
        complement: Yup.string().notRequired(),
        city: Yup.string().required('* Cidade é obrigatória'),
        state: Yup.string(2)
          .required('* Estado é obrigatório')
          .max(2, '* Máximo dois caracteres'),
        cep: Yup.string().required('* CEP é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        await api.put(`/recipients/${id}`, {
          name: data.name,
          address: data.address,
          number: data.number,
          complement: data.complement !== null ? data.complement : null,
          city: data.city,
          state: data.state,
          cep: data.cep,
        });

        toast.success('Destinatário editado com sucesso!');
        history.push('/recipient');
      } else {
        await api.post('/recipients', {
          name: data.name,
          address: data.address,
          number: data.number.toString(),
          complement: data.complement !== null ? data.complement : null,
          city: data.city,
          state: data.state,
          cep: data.cep,
        });

        toast.success('Destinatário criado com sucesso!');
        history.push('/recipient');
      }

      reset();
    } catch (err) {
      toast.error('Erro na execução !');
    }
  }

  return (
    <Container>
      <Content>
        <HeaderForm title="Cadastro de destinatário">
          <BackButton />
          <SaveButton action={() => formRef.current.submitForm()} />
        </HeaderForm>

        <UnForm ref={formRef} onSubmit={handleSubmit}>
          <SimpleInput
            label="Nome"
            name="name"
            type="text"
            placeholder="Nome do destinatário"
          />
          <div>
            <SimpleInput
              label="Endereço"
              name="address"
              type="text"
              placeholder="Endereço do destinatário"
            />
            <SimpleInput
              label="Número"
              name="number"
              type="number"
              placeholder="Número"
            />
            <SimpleInput
              label="Complemento"
              name="complement"
              type="text"
              placeholder="Complemento"
            />
          </div>
          <div>
            <SimpleInput
              label="Cidade"
              name="city"
              type="text"
              placeholder="Cidade do destinatário"
            />
            <SimpleInput
              label="Estado"
              name="state"
              type="text"
              placeholder="Estado"
            />
            <MaskInput
              label="CEP"
              name="cep"
              mask="99999-999"
              maskPlaceholder={null}
              placeholder="_____-___"
              onKeyPress={(e) =>
                e.key === 'Enter' ? formRef.current.submitForm() : null
              }
            />
          </div>
        </UnForm>
      </Content>
    </Container>
  );
}

RecipientForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
