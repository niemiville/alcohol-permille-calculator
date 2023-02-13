import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

interface FormData {
  milliliters: number;
  percent: number;
  kilograms: number;
  sex: string;
}

const femaleMultiplier = 0.55;
const maleMultiplier = 0.68;
const densityOfEthanol = 0.789;
const toPermille = 1000;

const PermilleForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    milliliters: 0,
    percent: 0,
    kilograms: 0,
    sex: 'male'
  });
  const [permilles, setPermilles] = useState<number>(0.0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, sex: event.target.value });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    let sexMultiplier = maleMultiplier;
    if (formData.sex === 'female') {
      sexMultiplier = femaleMultiplier;
    }
    setPermilles((densityOfEthanol * (formData.milliliters * formData.percent / 100)) / (formData.kilograms * 1000 * sexMultiplier) * toPermille);
    console.log(permilles);
  };

  return (
    <Grid container alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          BAC Calculator
        </Typography>
        <TextField
          label="Amount drunk ml"
          type="number"
          id="milliliters"
          name="milliliters"
          value={formData.milliliters}
          onChange={handleInputChange}
        />
        <br />
        <TextField
          label="Alcohol %"
          type="number"
          id="percent"
          name="percent"
          value={formData.percent}
          onChange={handleInputChange}
        />
        <br />
        <TextField
          label="Weight kg"
          type="number"
          id="kilograms"
          name="kilograms"
          value={formData.kilograms}
          onChange={handleInputChange}
        />
        <br />
        <RadioGroup
          aria-label="sex"
          name="sex"
          value={formData.sex}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="Male"
          />
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Female"
          />
        </RadioGroup>
        <br />
        <Typography variant="body1" gutterBottom>
          Permilles: {permilles.toFixed(2)}
        </Typography>
        <br />
        <Button variant="contained" color="primary" type="submit">Calculate</Button>
      </form>
    </Grid>
  );
};

export { PermilleForm };