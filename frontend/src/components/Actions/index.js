import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import Popup from 'reactjs-popup';

import PropTypes from 'prop-types';

import { ActionButton } from './styles';

export default function Actions({ children, ...rest }) {
  return (
    <Popup
      trigger={
        <ActionButton type="button">
          <MdMoreHoriz color="#C6C6C6" size={25} />
        </ActionButton>
      }
      position="bottom center"
      contentStyle={{
        width: '150px',
        borderRadius: '4px',
      }}
      {...rest}
    >
      {children}
    </Popup>
  );
}

Actions.propTypes = {
  children: PropTypes.element.isRequired,
};
