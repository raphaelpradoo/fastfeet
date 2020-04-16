import { Alert } from 'react-native';
import { parseISO, format } from 'date-fns';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* singIn({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `deliveryman/${id}/login`);
    yield put(
      signInSuccess(id, {
        name: response.data.name,
        email: response.data.email,
        created_at: format(parseISO(response.data.createdAt), 'dd/MM/yyyy'),
        avatar: response.data.avatar,
      })
    );
  } catch (err) {
    Alert.alert('Falha na autenticação', 'Entregador não cadastrado');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', singIn)]);
