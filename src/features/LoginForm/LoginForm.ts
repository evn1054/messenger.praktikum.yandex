import Block from '@core/Block.ts';
import { Input } from '@components/input';
import { Button } from '@components/button';

import { validateLogin, validatePassword } from '@features/LoginForm/helpers';
import tpl from './LoginForm.hbs?raw';

export const loginField = new Input({
  name: 'login',
  label: 'Логин',
  events: {
    blur: () => {
      validateLogin();
    },
  },

});
export const passwordField = new Input({
  name: 'password',
  label: 'Пароль',
  type: 'password',
  events: {
    blur: () => {
      validatePassword();
    },
  },
});

export class LoginForm extends Block {
  constructor() {
    super({
      loginInput: loginField,
      passwordInput: passwordField,
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
    console.log('LoginForm Render');
    return this.compile(tpl as string, this._props);
  }
}
