
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import map from 'lodash/map';

import Content from '../Content';
import Button from 'components/ui-elements/Button';
import Mark from 'components/blocks/Mark';

import { PRODUCTS, RECIPES } from 'constants/Routes';

import './styles.css';

const UserData = ({ showSave, showRefine, mark, onSave, onRefine }) => (
  <div className="FlavorPrintUserData">
    <Content>
      <div className="FlavorPrintUserData-blocks">
        <div className="FlavorPrintUserData-left">
          <h1>Your FlavorPrint</h1>
          <p>
            As you interact with food experiences and
            tell us more, your FlavorPrint will evolve.
          </p>
          {showSave && (
            <Button
              onClick={onSave}
              className="FlavorPrintUserData-saveButton"
            >
              Save your FlavorPrint
            </Button>
          )}
          {!showSave && showRefine && (
            <Button
              onClick={onRefine}
              className="FlavorPrintUserData-saveButton"
            >
              Refine your FlavorPrint
            </Button>
          )}
          <p>
            Explore your{' '}
            <Link to={PRODUCTS}>Product</Link>{' '}
            or{' '}
            <Link to={RECIPES}>Recipe</Link>{' '}
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

              {showSave && showRefine && (
                <Button onClick={onRefine} outline>Refine your FlavorPrint</Button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="FlavorPrintUserData-footer">
        FlavorPrint is a service by Vivanda, built on 130
        years of food sensory science. <a href="http://vivanda.com">Learn more</a>
      </div>
    </Content>
  </div>
);

UserData.propTypes = {
  mark: PropTypes.object,
  showSave: PropTypes.bool,
  showRefine: PropTypes.bool,

  onSave: PropTypes.func,
  onRefine: PropTypes.func,
};

export default UserData;
