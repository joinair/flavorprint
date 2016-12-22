
import stepRecipes from './stepRecipes';
import stepOccasions from './stepOccasions';
import stepEquipment from './stepEquipment';
import stepCookingTechniques from './stepCookingTechniques';
import stepPantry from './stepPantry';

import { RECIPES_SEED } from 'constants/Onboarding';

const stepLunch = stepRecipes(
  'Pick the recipe you prefer for lunch',
  [
    { sourceId: RECIPES_SEED.classicBurger, image: 'classicBurger' },
    { sourceId: RECIPES_SEED.fettuccineWithAsparagus, image: 'fettuccineWithAsparagus' },
    { sourceId: RECIPES_SEED.cedarPlankSalmon, image: 'cedarPlankSalmon' },
    { sourceId: RECIPES_SEED.arugulaAppleAndPomegranateSalad, image: 'arugulaAppleAndPomegranateSalad' },
  ]
);

const stepSundayMorning = stepRecipes(
  'What would you prefer on a Sunday morning?',
  [
    { sourceId: RECIPES_SEED.cerealWithWalnutsAndDriedFruit, image: 'cerealWithWalnutsAndDriedFruit' },
    { sourceId: RECIPES_SEED.friedEggsWithBacon, image: 'friedEggsWithBacon' },
    { sourceId: RECIPES_SEED.pancakesWithMapleSyrup, image: 'pancakesWithMapleSyrup' },
    { sourceId: RECIPES_SEED.chickenAndWaffles, image: 'chickenAndWaffles' },
  ]
);

const stepSnack = stepRecipes(
  'When it\'s time for a snack, what would you choose?',
  [
    { sourceId: RECIPES_SEED.chipotleLimeMixedNuts, image: 'chipotleLimeMixedNuts' },
    {
      sourceId: RECIPES_SEED.houmousWithPitaBread,
      image: 'houmousWithPitaBread',
      title: 'Hummus with Pita Bread',
    },
    { sourceId: RECIPES_SEED.bakedCamembertWithBacon, image: 'bakedCamembertWithBacon' },
    { sourceId: RECIPES_SEED.blueberryMuffins, image: 'blueberryMuffins' },
  ]
);

const stepDesert = stepRecipes(
  'Which of these is sure to get your mouth watering?',
  [
    { sourceId: RECIPES_SEED.freshFruitSalad, image: 'freshFruitSalad' },
    { sourceId: RECIPES_SEED.chocolateCake, image: 'chocolateCake' },
    { sourceId: RECIPES_SEED.raspberryIceCream, image: 'raspberryIceCream' },
    { sourceId: RECIPES_SEED.caramelisedPeachTarts, image: 'caramelisedPeachTarts' },
  ]
);

const stepDinner = stepRecipes(
  'What would you like for dinner on the weekend',
  [
    { sourceId: RECIPES_SEED.seafoodStew, image: 'seafoodStew' },
    { sourceId: RECIPES_SEED.vegetablePastaWithBalsamicVinaigrette, image: 'vegetablePastaWithBalsamicVinaigrette' },
    { sourceId: RECIPES_SEED.garlicPepperSteak, image: 'garlicPepperSteak' },
    { sourceId: RECIPES_SEED.sweetAsianBbqStirFry, image: 'sweetAsianBbqStirFry' },
  ]
);

const stepParty = stepRecipes(
  'Which of these would you like to run into at a party?',
  [
    { sourceId: RECIPES_SEED.beerCheeseDip, image: 'beerCheeseDip' },
    { sourceId: RECIPES_SEED.brazilianChimichurriSteak, image: 'brazilianChimichurriSteak' },
    { sourceId: RECIPES_SEED.mozzarellaAndBasilPizza, image: 'mozzarellaAndBasilPizza' },
    { sourceId: RECIPES_SEED.roastedVegetables, image: 'roastedVegetables' },
  ]
);

const stepBeverage = stepRecipes(
  'Which beverage sounds most delicious?',
  [
    { sourceId: RECIPES_SEED.mintMojito, image: 'mintMojito' },
    { sourceId: RECIPES_SEED.pinaColada, image: 'pinaColada' },
    { sourceId: RECIPES_SEED.hibiscusPomegranateIcedTea, image: 'hibiscusPomegranateIcedTea' },
    { sourceId: RECIPES_SEED.bloodyMary, image: 'bloodyMary' },
  ]
);

export const generateOnboardingSteps = state => [
  stepLunch(state),
  stepSundayMorning(state),
  stepSnack(state),
  stepDesert(state),
  stepDinner(state),
  stepParty(state),
  stepBeverage(state),
  stepOccasions(state),
  stepEquipment(state),
  stepCookingTechniques(state),
  stepPantry(state),
];

export default { generateOnboardingSteps };
