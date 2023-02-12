import React, { useState } from 'react';

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
    if (formData.sex === 'female'){
        sexMultiplier = femaleMultiplier;
    }
    setPermilles((densityOfEthanol * (formData.milliliters * formData.percent / 100)) / (formData.kilograms * 1000 * sexMultiplier) * toPermille);
    console.log(permilles);
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="milliliters">Amount of alcohol drank in milliliters: </label>
      <input
        type="number"
        id="milliliters"
        name="milliliters"
        value={formData.milliliters}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="percent">Alcohol strenght in percents: </label>
      <input
        type="number"
        id="percent"
        name="percent"
        value={formData.percent}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="kilograms">Weight of person in kilograms: </label>
      <input
        type="number"
        id="kilograms"
        name="kilograms"
        value={formData.kilograms}
        onChange={handleInputChange}
      />
      <br />
      <label>
        <input
          type="radio"
          name="sex"
          value='male'
          checked={formData.sex === 'male'}
          onChange={handleRadioChange}
        />
        Male
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="sex"
          value='female'
          checked={formData.sex === 'female'}
          onChange={handleRadioChange}
        />
        Female
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
    <p>Permilles: {permilles.toFixed(2)}</p>
    </>
  );
};

export { PermilleForm };