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
import { AppStyles, AppSizes , AppColors} from '@theme/';
import Timeline from 'react-native-timeline-listview'
// Components
import { Card, Spacer, Text } from '@ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text:{
    color:AppColors.brand.secondary,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

/* Component ==================================================================== */
class FarmView extends Component {
  static componentName = 'FarmView';
  constructor(props){
    super(props);
    this.data = [
      {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
      {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
      {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
    ]
  }

  static propTypes = {

  }


  render = () => {
    // const { title, body, image, ingredients, method } = this.props.recipe;

    return (
      <ScrollView style={[AppStyles.container]}>
        <View style={[AppStyles.padding,AppStyles.row]}>
          <Card style={[AppStyles.flex1]}>
            <Text h3 style={[styles.text]} style={[styles.text]}>Fields list:</Text>
            <Text h3  onPress={() => Alert.alert('hey')}>Field 1</Text>
            <Text h3  onPress={() => Alert.alert('hey')}>Field 2</Text>
            <Text h3  onPress={() => Alert.alert('hey')}>Field 3</Text>
          </Card>
          <Card style={[AppStyles.flex1]}>
            <Text h3 style={[styles.text]}>Description:</Text>
            <Text >The farm description can be here or summary infos or Photo.</Text>
          </Card>

        </View>
        <View>
          <Card>
            <Text h3>Event Timeline</Text>
            <Timeline
              data={this.data}
            />
          </Card>
        </View>
      </ScrollView>
    );
  }
}

/* Export Component ==================================================================== */
export default FarmView;
