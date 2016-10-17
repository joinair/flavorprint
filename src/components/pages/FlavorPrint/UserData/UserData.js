
import React, { PropTypes } from 'react';

import map from 'lodash/map';

import Content from '../Content';
import Button from 'components/ui-elements/Button';
import Mark from 'components/blocks/Mark';

import './styles.css';

const UserData = ({ mark }) => (
  <div className="FlavorPrintUserData">
    <Content>
      <div className="FlavorPrintUserData-blocks">
        <div className="FlavorPrintUserData-left">
          <h1>Your FlavorPrint</h1>
          <p>
            As you interact with food experiences and
            tell us more, your FlavorPrint will evolve.
          </p>
          <Button
            className="FlavorPrintUserData-saveButton"
          >
            Save your FlavorPrint
          </Button>
          <p>
            Explore your{' '}
            <a>Product</a>{' '}
            or{' '}
            <a>Recipe</a>{' '}
            recommendations.
          </p>
        </div>

        <div className="FlavorPrintUserData-center">
          {mark && (
            <Mark mark={mark} />
          )}
        </div>

        <div className="FlavorPrintUserData-right">
          {mark && (
            <div className="FlavorPrintUserData-topFlavors">
              <div className="FlavorPrintUserData-topFlavors-title">
                Your standout flavors
              </div>

              {map(mark.topFlavors, (flavor, i) => (
                <div className="FlavorPrintUserData-topFlavors-flavor" key={i}>
                  <div
                    className="FlavorPrintUserData-topFlavors-flavor-box"
                    style={{ backgroundColor: `#${flavor.hex}` }}
                  />
                  <div className="FlavorPrintUserData-topFlavors-flavor-name">
                    {flavor.name}
                  </div>
                </div>
              ))}

              <Button outline>Refine your FlavorPrint</Button>
            </div>
          )}
        </div>
      </div>

      <div className="FlavorPrintUserData-footer">
        FlavorPrint is a service by Vivanda, built on 150 years
        of sensory science. <a>Learn more</a>
      </div>
    </Content>
  </div>
);

UserData.propTypes = {
  mark: PropTypes.object,
};

export default UserData;
