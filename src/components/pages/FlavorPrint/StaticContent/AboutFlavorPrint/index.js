
import React from 'react';

import Content from '../../Content';

import './styles.css';

const StaticContent = () => (
  <div className="FlavorPrintStaticAbout">
    <Content>
      <h1>What makes up your FlavorPrint?</h1>

      <div className="FlavorPrintStaticAbout-centered">
      FlavorPrint, understands your unique taste palate based on the way you interact with food. Your personal FlavorPrint is made up of 33 flavors that will help you recognize in the food you love. Each person, product, recipe and food item has a FlavorPrint. By matching these together,       FlavorPrint finds recommendations for new recipes, products and flavors just for you. 
        Come an explore your FlavorPrint!
      </div>

      <h2>Flavor Blending</h2>

      <div className="FlavorPrintStaticAbout-columns">
        <img
          alt=""
          className="FlavorPrintStaticAbout-imgLeft"
          src="/assets/images/static-images/fp-static-recipe.png"
        />

        <div className="FlavorPrintStaticAbout-par">
          <h4>So much flavor in every recipe and product!</h4>

          <p>
            The FlavorPrint displays all the flavors present in the
            recipe or product and each color is a different flavor.
          </p>

          <p>
            With almost infinite combinations, sometimes there are only
            a few flavors present, sometimes there are many! For example,
            the Arugula and Peach Salad recipe has 23 flavors in it‘s
            flavor profile. What a complex present for your taste buds!
          </p>
        </div>
      </div>

      <h2>Flavor Intensity</h2>

      <div className="FlavorPrintStaticAbout-columns">
        <div className="FlavorPrintStaticAbout-par">
          <h4>Strong flavor? Weak flavor? Check the length!</h4>

          <p>
            Each ray displays just how intense the flavor is. The longer
            the ray, the more intense the flavor. For example this
            recipe has some HEAT with a smidge of CITRUSY.
          </p>
        </div>

        <img
          alt=""
          className="FlavorPrintStaticAbout-imgLeft"
          src="/assets/images/static-images/fp-static-mark.png"
        />
      </div>

    </Content>
  </div>
);

export default StaticContent;
