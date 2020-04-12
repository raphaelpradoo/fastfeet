import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  // Index - Método para LISTAR
  async index(req, res) {
    // Recebendo os Query Parameters
    const { page = 1, name } = req.query;

    // Filtra os Destinatarios que:
    // - Não foram excluidos (deleted_at = null)
    const recipients = await Recipient.findAll({
      where: {
        deleted_at: null,
        name: {
          [Op.iLike]: name ? `%${name}%` : '%%',
        },
      },
      order: ['name'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: [
        'id',
        'name',
        'address',
        'number',
        'complement',
        'city',
        'state',
        'cep',
      ],
    });

    return res.json(recipients);
  }

  // GetById - Método para trazer um Destinatario por ID
  async getById(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);
    return res.json(recipient);
  }

  // Store - Método para SALVAR
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.number().required().positive().integer(),
      complement: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required().max(2),
      cep: Yup.string().required(),
    });

    // Erro de validação. Alguns dos campos não estão no padrão
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    // Tudo certo para CRIAR o Destinatário
    const {
      id,
      name,
      addres,
      number,
      complement,
      city,
      state,
      cep,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      addres,
      number,
      complement,
      city,
      state,
      cep,
    });
  }

  // Update - Método para ATUALIZAR
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.number().required().positive().integer(),
      complement: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required().max(2),
      cep: Yup.string().required(),
    });

    // Erro de validação. Alguns dos campos não estão no padrão
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    // Erro. Usuário não foi encontrado.
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found.' });
    }

    // Tudo certo para ALTERAR o Destinatário
    const {
      id,
      name,
      addres,
      number,
      complement,
      city,
      state,
      cep,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      addres,
      number,
      complement,
      city,
      state,
      cep,
    });
  }

  // Delete - Método para DELETAR
  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    // Erro. Destinatário não foi encontrado.
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found.' });
    }

    // Erro. Destinatário já foi excluido.
    if (recipient.deleted_at) {
      return res.status(400).json({ error: 'Recipient already deleted.' });
    }

    // Tudo certo para DELETAR o Destinatário
    // Marcar a coluna "deleted_at" com a data da exclusão
    recipient.deleted_at = new Date();

    await recipient.save();

    return res.json({ recipient });
  }
}

export default new RecipientController();
