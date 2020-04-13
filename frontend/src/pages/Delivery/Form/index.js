import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import SaveButton from '~/components/Button/SaveButton';
import BackButton from '~/components/Button/BackButton';
import ComboboxInput from '~/components/Input/ComboboxInput';
import SimpleInput from '~/components/Input/SimpleInput';
import HeaderForm from '~/components/HeaderForm';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, UnForm } from './styles';

export default function DeliveryForm({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);

  useEffect(() => {
    async function loadInitialData(deliveryId) {
      if (id) {
        const response = await api.get(`/deliveries/${deliveryId}`);

        formRef.current.setData(response.data);
        formRef.current.setFieldValue('recipient_id', {
          value: response.data.recipient.id,
          label: response.data.recipient.name,
        });
        formRef.current.setFieldValue('deliveryman_id', {
          value: response.data.deliveryman.id,
          label: response.data.deliveryman.name,
        });
      }
    }
    loadInitialData(id);
  }, [id]);

  const customStylesSelectInput = {
    control: (provided) => ({
      ...provided,
      height: 45,
    }),
  };

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});
    try {
      const schema = Yup.object().shape({
        product: Yup.string().required('* Produto é obrigatório'),
        recipient_id: Yup.string().required('* Destinatário é obrigatório'),
        deliveryman_id: Yup.string().required('* Entregador é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        await api.put(`/deliveries/${id}`, {
          product: data.product,
          recipient_id: data.recipient_id,
          deliveryman_id: data.deliveryman_id,
        });

        toast.success('Encomenda editada com sucesso!');
        history.push('/delivery');
      } else {
        await api.post('/deliveries', {
          product: data.product,
          recipient_id: data.recipient_id,
          deliveryman_id: data.deliveryman_id,
        });

        toast.success('Encomenda criada com sucesso!');
        history.push('/delivery');
      }

      reset();
    } catch (err) {
      toast.error('Erro na execução !');
    }
  }

  return (
    <Container>
      <Content>
        <HeaderForm title="Cadastro de encomendas">
          <BackButton />
          <SaveButton action={() => formRef.current.submitForm()} />
        </HeaderForm>

        <UnForm ref={formRef} onSubmit={handleSubmit}>
          <section>
            <ComboboxInput
              name="recipient_id"
              label="Destinatário"
              placeholder="Destinatários"
              noOptionsMessage={() => 'Nenhum destinatário encontrado'}
              loadOptions={async (value) => {
                const response = await api.get('/recipients', {
                  params: {
                    name: value,
                  },
                });
                const data = response.data.map((recipient) => ({
                  value: recipient.id,
                  label: recipient.name,
                }));

                return data;
              }}
              styles={customStylesSelectInput}
            />

            <ComboboxInput
              name="deliveryman_id"
              label="Entregador"
              placeholder="Entregadores"
              noOptionsMessage={() => 'Nenhum entregador encontrado'}
              loadOptions={async (value) => {
                const response = await api.get('/deliverymen', {
                  params: {
                    name: value,
                  },
                });
                const data = response.data.map((deliveryman) => ({
                  value: deliveryman.id,
                  label: deliveryman.name,
                }));

                return data;
              }}
              styles={customStylesSelectInput}
            />
          </section>
          <SimpleInput
            label="Nome do produto"
            name="product"
            type="text"
            placeholder="Nome do produto"
            onKeyPress={(e) =>
              e.key === 'Enter' ? formRef.current.submitForm() : null
            }
          />
        </UnForm>
      </Content>
    </Container>
  );
}

DeliveryForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
