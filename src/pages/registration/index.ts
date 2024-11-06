import './registration.scss';

import Block, { BaseProps } from '@core/Block.ts';
import { FormWrapper } from '@components/formWrapper';
import { RegistrationForm } from '@features/RegistrationForm';
import {
  validateEmail, validateFirstName, validateLastName,
  validatePassword, validateLogin,
  validatePasswordAgain, validatePhone,
} from '@features/RegistrationForm/helpers';
import { validateForm } from '@features/helpers.ts';
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
              lastName: validateLastName,
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
