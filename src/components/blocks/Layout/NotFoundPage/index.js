
import React from 'react';

import { Image, View } from 'react-native';

import NavigationBar from 'components/blocks/NavigationBar';
import Text from 'components/ui-elements/Text';

import styles from './styles';

const NotFoundPage = () =>
  <View style={styles.main}>
    <NavigationBar title="Error" />

    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('assets/images/native/generic-error.png')}
      />

      <Text style={styles.text}>
        Oops! Something went wrong or the page you’re
        looking for doesn’t exist.
      </Text>
    </View>
  </View>;

export default NotFoundPage;
