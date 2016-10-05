
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { PRODUCTS, RECIPES } from 'constants/Routes';

import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';

import iconPlay from 'assets/images/icons/icon-play.svg';
import iconProductRecs from 'assets/images/icons/icon-product-recs.svg';
import iconRecipeRecs from 'assets/images/icons/icon-recipe-recs.svg';
import iconMore from 'assets/images/icons/icon-more.svg';
import vivandaLogo from 'assets/images/icons/vivanda-logo.svg';

import './styles.css';

const Details = ({ title, text, iconProps, buttonText, buttonUrl }) => (
  <div className="Home-details">
    <div className="Home-details-iconContainer">
      <Icon
        className="Home-details-iconContainer-icon"
        {...iconProps}
      />
    </div>
    <div className="Home-details-text">
      <div className="Home-details-text-title">
        {title}
      </div>

      <div className="Home-details-text-content">
        {text}
      </div>

      <Link to={buttonUrl}>
        <Button
          outline
          icon={iconMore}
          iconBefore={false}
          iconStyle={{ width: 12, height: 12 }}
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  </div>
);

Details.propTypes = {
  buttonText: PropTypes.string,
  buttonUrl: PropTypes.string,
  iconProps: PropTypes.object,
  text: PropTypes.node,
  title: PropTypes.string,
};

const Main = () => (
  <div className="Home-main">
    <div className="Home-main-cover" />
    <div className="Home-main-content Home-content Home-columns">
      <div className="Home-columns-column">
        <div className="Home-main-title">
          Meet <strong>FlavorPrint.</strong>
        </div>
        <div className="Home-main-description">
          A technology that matches<br />
          people with food they love.
        </div>

        <Button
          className="Home-main-button"
        >
          Get your FlavorPrint
        </Button>
      </div>

      <div className="Home-columns-column">
        <div className="Home-main-video">
          <Icon glyph={iconPlay} className="Home-main-video-play" />
        </div>
      </div>
    </div>
  </div>
);

const Recommendations = () => (
  <div className="Home-recs">
    <div className="Home-content Home-columns">
      <div className="Home-columns-column Home-recs-left">
        <Details
          title="Product recommendations"
          text="Find products that match your taste and save money with the best offers."
          buttonText="Explore products"
          buttonUrl={PRODUCTS}
          iconProps={{
            glyph: iconProductRecs,
            style: { width: 63, height: 58 },
          }}
        />
      </div>

      <div className="Home-columns-column Home-recs-right">
        <Details
          title="Recipe recommendations"
          text="Discover delicious recipes that are perfectly matched to your unique tastes."
          buttonText="Explore recipes"
          buttonUrl={RECIPES}
          iconProps={{
            glyph: iconRecipeRecs,
            style: { width: 66, height: 78 },
          }}
        />
      </div>
    </div>
  </div>
);

const Taste = () => (
  <div className="Home-taste">
    <div className="Home-taste-cover" />
    <div className="Home-content Home-taste-content">
      <div className="Home-taste-content-small">
        87%
      </div>
      <div className="Home-taste-content-large">
        Taste Drives Food <br />
        Choice Statistic
      </div>
      <div className="Home-taste-content-small" />
    </div>
  </div>
);

const Vivanda = () => (
  <div className="Home-vivanda">
    <div className="Home-content">
      <Details
        title="Insights powered by Vivanda"
        text="
          Vivanda’s company mission is to be the personal and trusted food
          advisor for the Network of Food. We help our customers build brand
          loyalty and grow by helping them create seamless, contextualized
          and personalized food experiences.
        "
        buttonText="Learn more"
        iconProps={{
          glyph: vivandaLogo,
          style: {
            width: 99,
            height: 99,
            marginBottom: -54, // see styles.css
          },
        }}
      />
    </div>
  </div>
);

const Home = () => (
  <div className="Home">
    <Main />
    <Recommendations />
    <Taste />
    <Vivanda />
  </div>
);

export default Home;
