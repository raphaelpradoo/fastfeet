import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import history from '~/services/history';
import Button from '../GenericButton';

export default function BackButton() {
  return (
    <Button
      title="VOLTAR"
      Icon={MdKeyboardArrowLeft}
      action={history.goBack}
      background="#CCC"
    />
  );
}
