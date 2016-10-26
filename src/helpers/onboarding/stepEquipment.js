
import { QUESTIONS } from 'constants/Onboarding';

import stepQuestions from './stepQuestions';

export default stepQuestions({
  title: 'What cooking equipment do you have?',

  bubbles: [
    {
      text: 'Food Processor',
      value: 'food_processor',
      image: 'quiz_equipment_food_processor',
      questionId: QUESTIONS.foodProcessor,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Blender',
      value: 'blender',
      image: 'quiz_equipment_blender',
      questionId: QUESTIONS.blender,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Slow Cooker',
      value: 'slow_cooker',
      image: 'quiz_equipment_slow_cooker',
      questionId: QUESTIONS.slowCooker,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Stand Mixer',
      value: 'stand_mixer',
      image: 'quiz_equipment_stand_mixer',
      questionId: QUESTIONS.standMixer,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Springform Pan',
      value: 'springform_pan',
      image: 'quiz_equipment_springform_pan',
      questionId: QUESTIONS.springformPan,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Ice Cream Maker',
      value: 'ice_cream_maker',
      image: 'quiz_equipment_ice_cream_maker',
      questionId: QUESTIONS.iceCreamMaker,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Mandolin',
      value: 'mandolin',
      image: 'quiz_equipment_mandolin',
      questionId: QUESTIONS.mandolin,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Bread Machine',
      value: 'bread_machine',
      image: 'quiz_equipment_bread_machine',
      questionId: QUESTIONS.breadMachine,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Pizza Stone',
      value: 'pizza_stone',
      image: 'quiz_equipment_pizza_stone',
      questionId: QUESTIONS.pizzaStone,
      yesValue: 'YES',
      noValue: 'NO',
    },
    {
      text: 'Pressure Cooker',
      value: 'pressure_cooker',
      image: 'quiz_equipment_pressure_cooker',
      questionId: QUESTIONS.pressureCooker,
      yesValue: 'YES',
      noValue: 'NO',
    },
  ],
});
