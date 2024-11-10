import Block, { BaseProps } from '@core/Block';
import { Button } from '@components/button';
import { Input } from '@components/input';
import { validateLogin, validatePassword } from '@features/loginForm/helpers';
import { InputField } from '@features/inputField';
import tpl from './LoginForm.hbs?raw';

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

export class LoginForm extends Block<BaseProps> {
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
    return this.compile(tpl as string, this._props);
  }
}
