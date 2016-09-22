
import React, { PropTypes } from 'react';
import { Image, StatusBar, View } from 'react-native';

import Button from 'components/ui-elements/Button';
import Text from 'components/ui-elements/Text';

import styles from './styles.js';

const Welcome = ({ onComplete }) => (
  <View style={styles.container}>
    <Image
      style={styles.background}
      source={require('assets/images/native/welcome-screen-texture.jpg')}
    />

    <View style={styles.main}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="default"
      />

      <Image
        source={require('assets/images/native/whisk-logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Your smart cookbook</Text>

      <Text style={styles.subtitle}>
        Save any recipe in the world and get personal recommendations
      </Text>

      <Button style={styles.button} size="xLarge" onClick={onComplete}>
        Get started
      </Button>
    </View>
  </View>
);

Welcome.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default Welcome;
