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

export const emailField = new InputField({
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
export const loginField = new InputField({
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
export const firstNameField = new InputField({
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
export const lastNameField = new InputField({
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
export const phoneField = new InputField({
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

export const passwordField = new InputField({
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
export const passwordAgainField = new InputField({
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
      emailInput: emailField,
      loginInput: loginField,
      firstNameInput: firstNameField,
      lastNameInput: lastNameField,
      phoneInput: phoneField,
      passwordInput: passwordField,
      passwordAgainInput: passwordAgainField,
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
