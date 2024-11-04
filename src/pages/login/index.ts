import './login.scss';
import Block, { BaseProps } from '@core/Block.ts';
import { FormWrapper } from '@components/formWrapper';
import { LoginForm } from '@features/LoginForm';
import { validateLoginForm } from '@features/LoginForm/helpers';
import tpl from './login.hbs?raw';

export class LoginPage extends Block<BaseProps> {
  constructor() {
    super({
      formWrapper: new FormWrapper({
        title: 'Вход',
        children: new LoginForm(),
        events: {
          submit: validateLoginForm,
        },
      }),
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
