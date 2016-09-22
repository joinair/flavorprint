
export const numberText = (numberOfResults, term) => {
  const formatedNumber =
    numberOfResults.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const forText = term ? ` for "${term}"` : '';

  return (
    `${formatedNumber} result${numberOfResults === 1 ? '' : 's'}${forText}`
  );
};

export default { numberText };
