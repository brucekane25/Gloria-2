import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';

const RangeSlider = ({ setSelectedEvent, yearRange, setYearRange }) => {
  const [temporaryRange, setTemporaryRange] = useState([yearRange.startYear, yearRange.endYear]);

  const handleChange = (event, newValue) => {
    setTemporaryRange(newValue); // Update the temporary range while sliding
  };

  const handleChangeCommitted = (event, newValue) => {
    // Update the yearRange and selectedEvent after the slider is released
    setYearRange({ startYear: newValue[0], endYear: newValue[1] });
    setSelectedEvent({ startYear: newValue[0], endYear: newValue[1] });
  };

  const handleInputChangeStart = (event) => {
    const newValue = Number(event.target.value) || yearRange.startYear;
    setTemporaryRange([newValue, temporaryRange[1]]);
  };

  const handleInputChangeEnd = (event) => {
    const newValue = Number(event.target.value) || yearRange.endYear;
    setTemporaryRange([temporaryRange[0], newValue]);
  };

  const handleInputBlurStart = () => {
    const [startYear, endYear] = temporaryRange;
    if (startYear < -1458) setTemporaryRange([-1458, endYear]);
    else if (startYear > endYear) setTemporaryRange([endYear, endYear]);
  };

  const handleInputBlurEnd = () => {
    const [startYear, endYear] = temporaryRange;
    if (endYear > 2024) setTemporaryRange([startYear, 2024]);
    else if (endYear < startYear) setTemporaryRange([startYear, startYear]);
  };

  return (
    <Box sx={{ minWidth:"900px"  }}>
      <Typography id="input-slider" textAlign={'center'} gutterBottom>
        Year Range:
      </Typography>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid item>
          <Input
            value={temporaryRange[0]}
            size="small"
            onChange={handleInputChangeStart}
            onBlur={handleInputBlurStart}
            inputProps={{
              step: 1,
              min: -1458,
              max: 2024,
              type: 'number',
              'aria-labelledby': 'input-slider-start',
            }}
          />
        </Grid>
        <Grid item xs>
          <Slider
            getAriaLabel={() => 'Year range'}
            value={temporaryRange}
            onChange={handleChange}
            onChangeCommitted={handleChangeCommitted}
            valueLabelDisplay="on"
            min={-1458}
            max={2024}
            aria-labelledby="range-slider"
            color="secondary"
          />
        </Grid>
        <Grid item>
          <Input
            value={temporaryRange[1]}
            size="small"
            onChange={handleInputChangeEnd}
            onBlur={handleInputBlurEnd}
            inputProps={{
              step: 1,
              min: -1458,
              max: 2024,
              type: 'number',
              'aria-labelledby': 'input-slider-end',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RangeSlider;
