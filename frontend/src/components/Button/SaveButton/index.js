import React from 'react';
import { MdDone } from 'react-icons/md';
import PropTypes from 'prop-types';

import Button from '../GenericButton';

export default function SaveButton({ action }) {
  return <Button title="SALVAR" Icon={MdDone} action={action} />;
}

SaveButton.propTypes = {
  action: PropTypes.func.isRequired,
};
