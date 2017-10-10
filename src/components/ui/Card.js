/**
 * Cards
 *
     <Card></Card>
 *
 * WaziApp
 * https://github.com/Waziup/waziup-mobile
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-native-elements';

// Consts and Libs
import { AppSizes, AppColors, AppStyles } from '@theme/';

/* Component ==================================================================== */
class CustomCard extends Component {
  static propTypes = {
    containerStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({}),
    ]),
    titleStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({}),
    ]),
  }

  static defaultProps = {
    containerStyle: [],
    titleStyle: [],
  }

  cardProps = () => {
    // Defaults
    const props = {
      dividerStyle: [{
        backgroundColor: AppColors.border,
      }],
      ...this.props,
      containerStyle: [{
        backgroundColor: AppColors.cardBackground,
        //borderRadius: AppSizes.borderRadius,
        borderColor: "transparent",
      }],
      titleStyle: [
        AppStyles.h2,
        { marginBottom: 15 },
      ],
    };

    if (this.props.containerStyle) {
      props.containerStyle.push(this.props.containerStyle);
    }

    if (this.props.titleStyle) {
      props.titleStyle.push(this.props.titleStyle);
    }

    return props;
  }

  render = () => <Card {...this.cardProps()} />
}

/* Export Component ==================================================================== */
export default CustomCard;
