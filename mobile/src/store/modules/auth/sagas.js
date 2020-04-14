import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email } = payload;

    const response = yield call(api.post, 'deliverymen/login', {
      email,
    });

    const { deliveryman } = response.data;

    // api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(deliveryman));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert('Falha na autenticação', 'Entregador não encontrado.');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
