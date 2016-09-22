
const changeHandler = ({ onChange, minValue }) => val => {
  if (val === '') {
    onChange(null);
  } else {
    const parsedString = val.replace(/\D/g, '');

    if (parsedString !== '') {
      const parsedValue = Number(parsedString);

      if (parsedValue >= minValue && parsedValue.toString().length < 3) {
        onChange(parsedValue);
      }
    }
  }
};

export default changeHandler;
