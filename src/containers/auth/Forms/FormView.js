/**
 * Login/Sign Up/Forgot Password Screen
 *
 * WaziApp
 * https://github.com/Waziup/waziup-mobile
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  AsyncStorage,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FormValidation from 'tcomb-form-native';
import { Actions } from 'react-native-router-flux';
import { SocialIcon } from 'react-native-elements'

// Consts and Libs
import { AppStyles,AppSizes } from '@theme/';
/* Styles ==================================================================== */
const styles = StyleSheet.create({
  launchImage: {
    width: AppSizes.screen.width,
    height: AppSizes.screen.height,
  },
  logo: {
    width: AppSizes.screen.width * 0.80,
    height: 120,
    resizeMode: 'contain',
  },
});

// Components
import { Alerts, Card, Spacer, Text, Button } from '@ui/';
import TcombTextInput from '@components/tcomb/TextInput';

/* Component ==================================================================== */
let redirectTimeout;
class AuthForm extends Component {
  static componentName = 'Login';

  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
    submit: PropTypes.func,
    onSuccessfulSubmit: PropTypes.func,
    formType: PropTypes.oneOf(['login', 'signUp', 'passwordReset', 'updateProfile']),
    formFields: PropTypes.arrayOf(PropTypes.string),
    buttonTitle: PropTypes.string,
    successMessage: PropTypes.string,
    introTitle: PropTypes.string,
    introText: PropTypes.string,
  }

  static defaultProps = {
    user: null,
    submit: null,
    onSuccessfulSubmit: null,
    formType: 'login',
    formFields: ['Email', 'Password'],
    buttonTitle: 'Login',
    successMessage: 'Awesome, you\'re now logged in',
    introTitle: null,
    introText: null,
  }

  constructor(props) {
    super(props);

    // What fields should exist in the form?
    const formFields = {};
    if (props.formFields.indexOf('Email') > -1) formFields.Email = this.validEmail;
    if (props.formFields.indexOf('Password') > -1) formFields.Password = this.validPassword;
    if (props.formFields.indexOf('ConfirmPassword') > -1) formFields.ConfirmPassword = this.validPassword;
    if (props.formFields.indexOf('FirstName') > -1) formFields.FirstName = FormValidation.String;
    if (props.formFields.indexOf('LastName') > -1) formFields.LastName = FormValidation.String;

    this.state = {
      resultMsg: {
        status: '',
        success: '',
        error: '',
      },
      form_fields: FormValidation.struct(formFields),
      form_values: {
        Email: (props.user && props.user.email) ? props.user.email : '',
        FirstName: (props.user && props.user.firstName) ? props.user.firstName : '',
        LastName: (props.user && props.user.lastName) ? props.user.lastName : '',
      },
      options: {
        auto: 'placeholders',
        fields: {
          Email: {
            template: TcombTextInput,
            error: 'Please enter a valid email',
            autoCapitalize: 'none',
            clearButtonMode: 'while-editing',
          },
          Password: {
            template: TcombTextInput,
            error: 'Passwords must be more than 8 characters and contain letters and numbers',
            clearButtonMode: 'while-editing',
            secureTextEntry: true,
          },
          ConfirmPassword: {
            template: TcombTextInput,
            error: 'Your passwords must match',
            clearButtonMode: 'while-editing',
            secureTextEntry: true,
          },
          FirstName: {
            template: TcombTextInput,
            error: 'Please enter your first name',
            clearButtonMode: 'while-editing',
          },
          LastName: {
            template: TcombTextInput,
            error: 'Please enter your first name',
            clearButtonMode: 'while-editing',
          },
        },
      },
    };
  }

  componentDidMount = async () => {
    // Pre-populate any details stored in AsyncStorage
    const values = await this.getStoredCredentials();

    if (values !== null && values.email && values.password) {
      this.setState({
        form_values: {
          ...this.state.form_values,
          Email: values.email || '',
          Password: values.password || '',
        },
      });
    }
  }

  componentWillUnmount = () => clearTimeout(redirectTimeout);

  /**
    * Get user data from AsyncStorage to populate fields
    */
  getStoredCredentials = async () => {
    const values = await AsyncStorage.getItem('api/credentials');
    const jsonValues = JSON.parse(values);

    return jsonValues;
  }

  /**
    * Email Validation
    */
  validEmail = FormValidation.refinement(
    FormValidation.String, (email) => {
      const regularExpression = /^.+@.+\..+$/i;

      return regularExpression.test(email);
    },
  );

  /**
    * Password Validation - Must be 6 chars long
    */
  validPassword = FormValidation.refinement(
    FormValidation.String, (password) => {
      if (password.length < 8) return false; // Too short
      if (password.search(/\d/) === -1) return false; // No numbers
      if (password.search(/[a-zA-Z]/) === -1) return false; // No letters
      return true;
    },
  );

  /**
    * Password Confirmation - password fields must match
    * - Sets the error and returns bool of whether to process form or not
    */
  passwordsMatch = (form) => {
    const error = form.Password !== form.ConfirmPassword;

    this.setState({
      options: FormValidation.update(this.state.options, {
        fields: {
          ConfirmPassword: {
            hasError: { $set: error },
            error: { $set: error ? 'Passwords don\'t match' : '' },
          },
        },
      }),
      form_values: form,
    });

    return error;
  }

  /**
    * Handle Form Submit
    */
  handleSubmit = () => {
    // Get new credentials and update
    const formData = this.form.getValue();

    // Check whether passwords match
    if (formData && formData.Password && formData.ConfirmPassword) {
      const passwordsDontMatch = this.passwordsMatch(formData);
      if (passwordsDontMatch) return false;
    }

    // Form is valid
    if (formData) {
      this.setState({ form_values: formData }, () => {
        this.setState({ resultMsg: { status: 'One moment...' } });

        // Scroll to top, to show message
        if (this.scrollView) this.scrollView.scrollTo({ y: 0 });

        if (this.props.submit) {
          this.props.submit(formData).then(() => {
            this.setState({
              resultMsg: { success: this.props.successMessage },
            }, () => {
              // If there's another function to fire on successful submit
              // eg. once signed up, let's log them in - pass the Login function
              // through as the onSuccessfulSubmit prop
              if (this.props.onSuccessfulSubmit) {
                return this.props.onSuccessfulSubmit(formData, true)
                  .then(() => {
                    Actions.app({ type: 'reset' });
                    Actions.pop();
                  }).catch(err => this.setState({ resultMsg: { error: err.message } }));
              }

              // Timeout to ensure success message is seen/read by user
              redirectTimeout = setTimeout(() => {
                Actions.app({ type: 'reset' });
                Actions.pop();
              }, 500);

              return true;
            });
          }).catch(err => this.setState({ resultMsg: { error: err.message } }));
        } else {
          this.setState({ resultMsg: { error: 'Submit function missing' } });
        }
      });
    }

    return true;
  }

  render = () => {
    const Form = FormValidation.form.Form;

    return (
    <View style={[AppStyles.containerCentered, AppStyles.container]}>
      {/*<ScrollView
        automaticallyAdjustContentInsets={false}
        ref={(a) => { this.scrollView = a; }}
        style={[AppStyles.container]}
        contentContainerStyle={[AppStyles.container]}
      >*/}
      
          <Alerts
            status={this.state.resultMsg.status}
            success={this.state.resultMsg.success}
            error={this.state.resultMsg.error}
          />

          {(!!this.props.introTitle || !!this.props.introText) &&
            <View>
              {!!this.props.introTitle &&
                <Text h1>{this.props.introTitle}</Text>
              }
              {!!this.props.introText &&
                <Text>{this.props.introText}</Text>
              }
            </View>
          }

        <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
          <View style={[AppStyles.flex1]}>
            <Form
              ref={(b) => { this.form = b; }}
              type={this.state.form_fields}
              value={this.state.form_values}
              options={this.state.options}
            />
          </View>
        </View>
          <Spacer size={10} />
          <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
            <View style={[AppStyles.flex1]}>
              <Button outlined title={this.props.buttonTitle} onPress={this.handleSubmit} />
            </View>
          </View>
          <Spacer size={10} />

          {this.props.formType === 'login' &&
            <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
                <View style={[AppStyles.flex1]}>
                  <TouchableOpacity onPress={Actions.passwordReset}>
                    <Text p style={[AppStyles.textRightAligned, AppStyles.link]}>
                      Forgot Password
                    </Text>
                  </TouchableOpacity>
                </View>

              <Spacer size={10} />

            </View>
          }
          <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
                <View style={[AppStyles.flex1]}>
                  <SocialIcon
                    title='Sign In With Facebook'
                    button
                    iconSize={15}
                    type='facebook'
                    style={[{borderRadius:5,padding:1}]}
                  />

                  <SocialIcon
                    title='Some Twitter Message'
                    button
                    iconSize={15}
                    type='twitter'
                    style={[{borderRadius:5,padding:5}]}
                  />
                </View>
              </View>
          {this.props.formType ==='login' &&
          <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
              <View style={[AppStyles.flex1]}>
                <TouchableOpacity onPress={Actions.signUp}>
                  <Text p style={[AppStyles.textCenterAligned, AppStyles.link]}>
                    signUp
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        <Spacer size={60} />
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default AuthForm;
