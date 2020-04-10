import React from 'react';
import PropTypes from 'prop-types';

import Button from './styles';

export default function GenericButton({
  title,
  Icon,
  action,
  background,
  ...rest
}) {
  return (
    <Button onClick={action} background={background} {...rest}>
      <Icon color="#fff" size={16} />
      {title}
    </Button>
  );
}

GenericButton.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  background: PropTypes.string,
};

GenericButton.defaultProps = {
  background: '',
};
