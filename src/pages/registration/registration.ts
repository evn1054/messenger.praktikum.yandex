import './registration.scss';

import Block, { BaseProps } from '@core/Block';
import { FormWrapper } from '@components/formWrapper';
import {
  validateEmail, validateFirstName, validateLastName,
  validatePassword, validateLogin,
  validatePasswordAgain, validatePhone,
} from '@features/registrationForm/helpers';
import { validateForm } from '@features/helpers';
import { RegistrationForm } from '@features/registrationForm';
import tpl from './registration.hbs?raw';

export class RegistrationPage extends Block<BaseProps> {
  constructor() {
    super({
      formWrapper: new FormWrapper({
        title: 'Регистрация',
        children: new RegistrationForm(),
        events: {
          submit: (event) => {
            validateForm(event, {
              login: validateLogin,
              password: validatePassword,
              passwordAgain: validatePasswordAgain,
              email: validateEmail,
              firstName: validateFirstName,
              secondName: validateLastName,
              phone: validatePhone,
            });
          },
        },
      }),
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
