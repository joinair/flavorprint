
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import map from 'lodash/map';
import bind from 'lodash/bind';

import { PRODUCTS, RECIPES } from 'constants/Routes';

import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';

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

const Main = ({ onStartOnboarding, onPromo }) => (
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
          onClick={onStartOnboarding}
        >
          Get your <strong>FlavorPrint</strong>
        </Button>
      </div>

      <div className="Home-columns-column">
        <div className="Home-main-video" onClick={onPromo} />
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
            style: { width: 41, height: 54 },
          }}
        />
      </div>

      <div className="Home-columns-column Home-recs-right">
        <Details
          title="Recipe recommendations"
          text="Discover delicious recipes that are perfectly matched to your unique taste."
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
        { percent: '59%', text: 'of consumers use devices to make shopping lists or meal plans.' },
        { percent: '59%', text: 'of 25- to 34-year-olds head to the kitchen with either their smartphones or tablets.' },
        { percent: '50%', text: 'of purchases are influenced by at least one digital touch point.' },
        { percent: '86%', text: 'of foodies say the internet is their no. 1 source of food information.' },
        { percent: '60%', text: 'of meals are prepared at home.' },
        { percent: '78%', text: 'say that they visited food brand\'s social pages to find recipes and tips.' },
        { percent: '30%', text: 'of consumers participate in some kind of specialized approach to eating.' },
        { percent: '90%', text: 'of consumers find custom content useful.' },
        { percent: '87%', text: 'of consumers say the online retailer that personalizes the best influences them to buy more.' },
        { percent: '59%', text: 'of consumers want personalization when grocery shopping.' },
        { percent: '39%', text: 'of shoppers who received a personalized coupon, promotion, or recommendation spend more.' },
        { percent: '87%', text: 'of consumers say that taste ranks number one when it comes to food choices.' },
      ],

      previousStep: null,
      activeStep: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 5000);
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
          Vivanda's mission is to enable our food ecosystem partners to better
          meet their consumers' needs with an enhanced and relevant food
          experience through personalization and added insights.
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

const Home = ({ onStartOnboarding, onPromo }) => (
  <div className="Home">
    <Main onStartOnboarding={onStartOnboarding} onPromo={onPromo} />
    <Recommendations />
    <Taste />
    <Vivanda />
  </div>
);

Main.propTypes = {
  onPromo: PropTypes.func.isRequired,
  onStartOnboarding: PropTypes.func.isRequired,
};

Home.propTypes = {
  onPromo: PropTypes.func.isRequired,
  onStartOnboarding: PropTypes.func.isRequired,
};

export default Home;
