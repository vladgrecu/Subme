import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({percentage}) => {
  return (
    <div className="progress" style={{width:'230px',backgroundColor:'#fff',color:'#fff'}}>
      <div className="bar" role="progressbar" style={{width:`${percentage}%`,backgroundColor:'rgba(21, 198, 2,0.8)'}}>
        {percentage}%
      </div>
    </div>
  )
}

Progress.propTypes = {
  percentage: PropTypes.number.isRequired
}

export default Progress