
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import map from 'lodash/map';
import bind from 'lodash/bind';

import { PRODUCTS, RECIPES } from 'constants/Routes';

import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';

import iconPlay from 'assets/images/icons/icon-play.svg';
import iconProductRecs from 'assets/images/icons/icon-product-recs.svg';
import iconRecipeRecs from 'assets/images/icons/icon-recipe-recs.svg';
import iconMore from 'assets/images/icons/icon-more.svg';
import vivandaLogo from 'assets/images/icons/vivanda-logo.svg';

import './styles.css';

const Details = ({ title, text, iconProps, buttonText, buttonUrl }) => {
  const isExternal = buttonUrl.match(/^http/);
  const ButtonComp = isExternal ? 'a' : Link;
  const target = isExternal ? '_blank' : null;

  return (
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

        <ButtonComp href={buttonUrl} to={buttonUrl} target={target}>
          <Button
            outline
            icon={iconMore}
            iconBefore={false}
            iconStyle={{ width: 12, height: 12 }}
          >
            {buttonText}
          </Button>
        </ButtonComp>
      </div>
    </div>
  );
};

Details.propTypes = {
  buttonText: PropTypes.string,
  buttonUrl: PropTypes.string,
  iconProps: PropTypes.object,
  text: PropTypes.node,
  title: PropTypes.string,
};

const Main = () => (
  <div className="Home-main">
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
          Get your <strong>FlavorPrint</strong>
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

class Taste extends Component {
  constructor(props, context) {
    super(props, context);

    this.tick = bind(this.tick, this);

    this.state = {
      steps: [
        { percent: '87%', text: <span>Taste Drives Food<br />Choise Statistic</span> },
        { percent: '89%', text: <span>Taste Drives Food<br />Choise Statistic</span> },
        { percent: '90%', text: <span>Taste Drives Food<br />Choise Statistic</span> },
      ],

      previousStep: null,
      activeStep: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 2000);
  }

  componentWillUnmount() {
    this.interval = clearInterval(this.interval);
  }

  tick() {
    const { steps, activeStep } = this.state;
    this.setState({ activeStep: (activeStep + 1) % steps.length });
  }

  render() {
    const { steps, activeStep } = this.state;

    const renders = map(steps, ({ percent, text }, i) => type => (
      <div
        key={i}
        className={
          classnames('Home-content Home-taste-content', {
            'Home-taste-content--active': type === 'active',
            'Home-taste-content--beforeActive': type === 'before',
            'Home-taste-content--afterActive': type === 'after',
          })
        }
      >
        <div className="Home-taste-content-small" />
        <div className="Home-taste-content-small">
          {percent}
        </div>
        <div className="Home-taste-content-large">
          {text}
        </div>
        <div className="Home-taste-content-small" />
        <div className="Home-taste-content-small" />
      </div>
    ));

    const last = steps.length - 1;

    return (
      <div className="Home-taste">
        {renders[activeStep === 0 ? last : activeStep - 1]('before')}
        {renders[activeStep]('active')}
        {renders[activeStep === last ? 0 : activeStep + 1]('after')}
      </div>
    );
  }
}

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
        buttonUrl="http://vivanda.com"
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
