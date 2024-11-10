import './login.scss';
import Block, { BaseProps } from '@core/Block';
import { FormWrapper } from '@components/formWrapper';
import { validateForm } from '@features/helpers';
import { validateLogin, validatePassword } from '@features/loginForm/helpers';
import { LoginForm } from '@features/loginForm';
import tpl from './login.hbs?raw';

export class LoginPage extends Block<BaseProps> {
  constructor() {
    super({
      formWrapper: new FormWrapper({
        title: 'Вход',
        children: new LoginForm(),
        events: {
          submit: (event) => validateForm(event, {
            login: validateLogin,
            password: validatePassword,
          }),
        },
      }),
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
