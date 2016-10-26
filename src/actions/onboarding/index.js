
import * as recipes from './recipes';
import * as questions from './questions';
import * as common from './common';

export * from './recipes';
export * from './questions';
export * from './common';

export default {
  ...recipes,
  ...questions,
  ...common,
};
