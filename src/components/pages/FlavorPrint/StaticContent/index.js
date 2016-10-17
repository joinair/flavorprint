
import React from 'react';

import Content from '../Content';

import './styles.css';

const StaticContent = () => (
  <div className="FlavorPrintStaticContent">
    <Content>
      <h1>What makes up a FlavorPrint?</h1>

      <div className="FlavorPrintStaticContent-centered">
        FlavorPrint is a sophisticated taste machine.
        Compiling data from 33 flavors, 9 textures and each flavor{"'"}s intensity,
        it represents the taste profile of a recipe, product or you!
      </div>

      <h2>Flavor Blending</h2>

      <div className="FlavorPrintStaticContent-columns">
        <img
          alt=""
          className="FlavorPrintStaticContent-imgLeft"
          src="/assets/images/static-images/home-main-bg.jpg"
          width={400}
        />

        <div className="FlavorPrintStaticContent-par">
          <h4>So much flavor in every recipe and product!</h4>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla hendrerit
            iaculis est, non mattis eros condimentum vitae.
          </p>

          <p>
            Nunc risus purus, placerat sed lacus ac, venenatis tincidunt metus. Mauris
            pulvinar neque eu mauris volutpat condimentum. Cras iaculis ligula enim.
            Proin egestas non felis.
          </p>
        </div>
      </div>

      <h2>Flavor Intensity</h2>

      <div className="FlavorPrintStaticContent-columns">
        <div className="FlavorPrintStaticContent-par">
          <h4>Strong flavor? Weak flavor? Check the length!</h4>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla hendrerit
            suscipit porttitor. Sed lectus metus, rutrum posuere maximus vitae, tempus
            a leo.
          </p>
        </div>

        <img
          alt=""
          className="FlavorPrintStaticContent-imgLeft"
          src="/assets/images/static-images/home-main-bg.jpg"
          width={400}
        />
      </div>

    </Content>
  </div>
);

export default StaticContent;
