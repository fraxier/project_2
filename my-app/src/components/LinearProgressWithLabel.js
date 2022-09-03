import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: props.mb }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="buffer" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
  valueBuffer: PropTypes.number.isRequired
};

export default function LinearWithValueLabel({ value, valueBuffer, color, sx, mb }) {

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={value} valueBuffer={valueBuffer} color={color} sx={sx} mb={mb} />
    </Box>
  );
}
