import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function InitialsName({ name }) {
  const nameSplit = name.split(' ');

  return (
    <Container number={Math.floor(Math.random() * (5 + 1))}>
      <span>
        {nameSplit.length >= 2 ? nameSplit[0][0] : name[0]}
        {nameSplit.length >= 2 ? nameSplit[1][0] : name[1]}
      </span>
    </Container>
  );
}

InitialsName.propTypes = {
  name: PropTypes.string.isRequired,
};
