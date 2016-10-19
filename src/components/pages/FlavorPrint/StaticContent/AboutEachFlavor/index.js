
import React, { PropTypes } from 'react';

import map from 'lodash/map';
import zip from 'lodash/zip';

import Content from '../../Content';

import './styles.css';

import flavors from './flavors';

const ProgressBar = ({ title, value, color }) => (
  <div className="AboutEachFlavor-progress">
    <div className="AboutEachFlavor-progress-text">
      {title}
    </div>
    <div className="AboutEachFlavor-progress-bg">
      <div
        className="AboutEachFlavor-progress-bar"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  </div>
);

ProgressBar.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
  color: PropTypes.string,
};

const AboutEachFlavor = () => (
  <div className="AboutEachFlavor">
    <Content>
      <h1>About each flavor</h1>

      {map(flavors, flavor => (
        <div className="AboutEachFlavor-flavor" key={flavor.title}>
          <div className="AboutEachFlavor-heading">
            <div className="AboutEachFlavor-heading-image">
              <img alt="" src={flavor.mark} />
            </div>
            <div className="AboutEachFlavor-heading-text">
              <h2>{flavor.title}</h2>
              <p>{flavor.description}</p>
            </div>
          </div>
          <div className="AboutEachFlavor-content">
            <h3>Tasting the Flavor of {flavor.title}:</h3>

            <div className="AboutEachFlavor-content-recipes">
              {map(
                zip(
                  flavor.recipeImages, flavor.recipeNames,
                  flavor.recipeLinks, flavor.recipeBars,
                  ['Light', 'Medium', 'Strong']
                ),
                ([image, name, link, bar, type], i) => (
                  <div className="AboutEachFlavor-content-recipe" key={i}>
                    <ProgressBar title={type} value={bar} color={flavor.color} />
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <img alt="" src={image} />
                      {name}
                    </a>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </Content>
  </div>
);

export default AboutEachFlavor;
