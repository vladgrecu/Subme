import React from 'react';
import PropTypes from 'prop-types';

const Message = ({msg, backgroundColor}) => {
  return (
    <div className={backgroundColor}>
      {msg}
    </div>
  )
}

Message.propTypes = {
  msg: PropTypes.string.isRequired
}

export default Message