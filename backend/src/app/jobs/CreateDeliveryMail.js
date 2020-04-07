import Mail from '../../lib/Mail';

class CreateDeliveryMail {
  get key() {
    return 'CreateDeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman, email, product, recipient } = data;

    await Mail.sendMail({
      to: `${deliveryman} <${email}>`,
      subject: 'Encomenda Cadastrada',
      template: 'create',
      context: {
        deliveryman,
        product,
        recipient: recipient.name,
        address: recipient.address,
        number: recipient.number,
        complement: recipient.complement ? recipient.complement : '',
        city: recipient.city,
        state: recipient.state,
        cep: recipient.cep,
      },
    });
  }
}

export default new CreateDeliveryMail();
