
export default ({ recipe, text }) =>
  `${recipe || 'withoutRecipe'}.${text}`;
