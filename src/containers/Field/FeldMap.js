/**
 * Recipe View Screen
 *  - The individual recipe screen
 *
 * WaziApp
 * https://github.com/Waziup/waziup-mobile
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';
// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';

// Components
import { Card, Spacer, Text } from '@ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  featuredImage: {
    left: 0,
    right: 0,
    height: AppSizes.screen.height * 0.2,
    resizeMode: 'cover',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    height:AppSizes.screen.height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

/* Component ==================================================================== */
class FarmView extends Component {
  static componentName = 'FarmView';

  static propTypes = {

  }


  render = () => {
    // const { title, body, image, ingredients, method } = this.props.recipe;

    return (
      <ScrollView style={[AppStyles.container]}>
        <View style={[AppStyles.row,styles.container]}>
          <MapView style={[styles.map]}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

/* Export Component ==================================================================== */
export default FarmView;
