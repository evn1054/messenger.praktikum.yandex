import Block, { BaseProps } from '@core/Block.ts';
import { Input } from '@components/input';
import { Button } from '@components/button';

import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validateLogin, validatePassword, validatePasswordAgain,
  validatePhone,
} from '@features/RegistrationForm/helpers';
import { InputField } from '@components/inputField';
import tpl from './RegistrationForm.hbs?raw';

export const registrationEmailField = new InputField({
  label: 'E-mail',
  input: new Input({
    name: 'email',
    events: {
      blur: () => {
        validateEmail();
      },
    },
  }),
});
export const registrationLoginField = new InputField({
  label: 'Логин',
  input: new Input({
    name: 'login',
    events: {
      blur: () => {
        validateLogin();
      },
    },
  }),
});
export const registrationFirstNameField = new InputField({
  label: 'Имя',
  input: new Input({
    name: 'firstName',
    events: {
      blur: () => {
        validateFirstName();
      },
    },
  }),
});
export const registrationLastNameField = new InputField({
  label: 'Фамилия',
  input: new Input({
    name: 'lastName',
    events: {
      blur: () => {
        validateLastName();
      },
    },
  }),
});
export const registrationPhoneField = new InputField({
  label: 'Номер телефона',
  input: new Input({
    name: 'phone',
    events: {
      blur: () => {
        validatePhone();
      },
    },
  }),
});

export const registrationPasswordField = new InputField({
  label: 'Пароль',
  input: new Input({
    name: 'password',
    type: 'password',
    events: {
      blur: () => {
        validatePassword();
      },
    },
  }),
});
export const registrationPasswordAgainField = new InputField({
  label: 'Пароль (ещё раз)',
  input: new Input({
    name: 'passwordAgain',
    type: 'password',
    events: {
      blur: () => {
        validatePasswordAgain();
      },
    },
  }),
});

export class RegistrationForm extends Block<BaseProps> {
  constructor() {
    super({
      emailInput: registrationEmailField,
      loginInput: registrationLoginField,
      firstNameInput: registrationFirstNameField,
      lastNameInput: registrationLastNameField,
      phoneInput: registrationPhoneField,
      passwordInput: registrationPasswordField,
      passwordAgainInput: registrationPasswordAgainField,
      primaryButton: new Button({
        label: 'Авторизироваться',
        type: 'submit',
      }),
      linkButton: new Button({
        label: 'Нет аккаунта?',
        type: 'link',
      }),
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
