import React from 'react';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

export default function PageTitle({ title, children }) {
  return (
    <Container>
      <h1>{title}</h1>

      {children && <Content>{children}</Content>}
    </Container>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
};

PageTitle.defaultProps = {
  children: null,
};
