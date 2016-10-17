
import pick from 'lodash/pick';
import values from 'lodash/values';

import stepOccasions from './stepOccasions';

import {
  RECIPES_SEED,
  TYPE_RECIPES,
  TYPE_DIETS,
  TYPE_BUBBLES,
  BUTTON_CONTINUE,
  BUTTON_SKIP,
} from 'constants/Onboarding';

const stepSundayMorning = state => ({
  type: TYPE_RECIPES,
  title: 'What would you prefer on a Sunday morning?',
  button: BUTTON_SKIP,

  recipes: values(pick(
    state.recipes,
    RECIPES_SEED.recipe1,
    RECIPES_SEED.recipe2,
    RECIPES_SEED.recipe3,
    RECIPES_SEED.recipe4,
  )),
});

const stepSnacks = state => ({
  type: TYPE_RECIPES,
  title: 'When it\'s time for a snack, what would you choose?',
  button: BUTTON_SKIP,

  recipes: values(pick(
    state.recipes,
    RECIPES_SEED.recipe4,
    RECIPES_SEED.recipe2,
    RECIPES_SEED.recipe3,
    RECIPES_SEED.recipe1,
  )),
});

const stepDesert = state => ({
  type: TYPE_RECIPES,
  title: 'Which of these is sure to get your mouth watering?',
  button: BUTTON_SKIP,

  recipes: values(pick(
    state.recipes,
    RECIPES_SEED.recipe3,
    RECIPES_SEED.recipe4,
    RECIPES_SEED.recipe2,
    RECIPES_SEED.recipe1,
  )),
});

const stepWeekendDinner = state => ({
  type: TYPE_RECIPES,
  title: 'What would you like for dinner on the weekend?',
  button: BUTTON_SKIP,

  recipes: values(pick(
    state.recipes,
    RECIPES_SEED.recipe2,
    RECIPES_SEED.recipe3,
    RECIPES_SEED.recipe4,
    RECIPES_SEED.recipe1,
  )),
});

const stepDiets = () => ({
  type: TYPE_DIETS,
  title: 'Do you have any diets or avoidances?',
  button: BUTTON_CONTINUE,
});

const stepEquipment = () => ({
  type: TYPE_BUBBLES,
  title: 'What cooking equipment do you have?',
  button: BUTTON_CONTINUE,

  bubbles: [
    { text: 'Food Processor', value: 'food_processor', image: 'quiz_equipment_food_processor' },
    { text: 'Blender', value: 'blender', image: 'quiz_equipment_blender' },
    { text: 'Slow Cooker', value: 'slow_cooker', image: 'quiz_equipment_slow_cooker' },
    { text: 'Stand Mixer', value: 'stand_mixer', image: 'quiz_equipment_stand_mixer' },
    { text: 'Springform Pan', value: 'springform_pan', image: 'quiz_equipment_springform_pan' },
    { text: 'Ice Cream Maker', value: 'ice_cream_maker', image: 'quiz_equipment_ice_cream_maker' },
    { text: 'Mandolin', value: 'mandolin', image: 'quiz_equipment_mandolin' },
    { text: 'Bread Machine', value: 'bread_machine', image: 'quiz_equipment_bread_machine' },
    { text: 'Pizza Stone', value: 'pizza_stone', image: 'quiz_equipment_pizza_stone' },
    { text: 'Pressure Cooker', value: 'pressure_cooker', image: 'quiz_equipment_pressure_cooker' },
  ],
});

const stepTechniques = () => ({
  type: TYPE_BUBBLES,
  title: 'What kind of cooking techniques do you like?',
  button: BUTTON_CONTINUE,

  bubbles: [
    { text: 'Bake', image: 'quiz_techniques_bake' },
    { text: 'Grill', image: 'quiz_techniques_grill' },
    { text: 'Stir-Fry', image: 'quiz_techniques_stir_fry' },
    { text: 'Deep Fry', image: 'quiz_techniques_deep_fry' },
    { text: 'Smoke', image: 'quiz_techniques_smoke' },
    { text: 'Preserve', image: 'quiz_techniques_preserve' },
    { text: 'Roast', image: 'quiz_techniques_roast' },
    { text: 'Puree', image: 'quiz_techniques_puree' },
    { text: 'Saute', image: 'quiz_techniques_saute' },
    { text: 'Poach', image: 'quiz_techniques_poach' },
  ],
});

const stepPantry = () => ({
  type: TYPE_BUBBLES,
  title: 'What do you usually have in your pantry?',
  button: BUTTON_CONTINUE,

  bubbles: [
    { text: 'Onions', image: 'quiz_pantry_onion' },
    { text: 'Eggs', image: 'quiz_pantry_eggs' },
    { text: 'Olive Oil', image: 'quiz_pantry_olive_oil' },
    { text: 'Fresh Garlic', image: 'quiz_pantry_fresh_garlic' },
    { text: 'Brown Sugar', image: 'quiz_pantry_brown_sugar' },
    { text: 'Vanilla Extract', image: 'quiz_pantry_vanilla_extract' },
    { text: 'Cinnamon', image: 'quiz_pantry_cinnamon' },
    { text: 'Honey', image: 'quiz_pantry_honey' },
    { text: 'Rice', image: 'quiz_pantry_rice' },
    { text: 'Lettuce', image: 'quiz_pantry_lettuce' },
  ],
});

export const generateOnboardingSteps = state => [
  stepSundayMorning(state),
  stepSnacks(state),
  stepDesert(state),
  stepWeekendDinner(state),
  stepOccasions(state),
  stepDiets(state),
  stepEquipment(state),
  stepTechniques(state),
  stepPantry(state),
];

export default { generateOnboardingSteps };
