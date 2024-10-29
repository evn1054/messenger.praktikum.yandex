import './login.scss';
import Block, { BaseProps } from '@core/Block.ts';
import { FormWrapper } from '@components/formWrapper';
import { LoginForm } from '@features/LoginForm';
import { validateForm } from '@features/helpers.ts';
import tpl from './login.hbs?raw';

export default class LoginPage extends Block<BaseProps> {
  constructor() {
    super({
      formWrapper: new FormWrapper({
        title: 'Вход',
        children: new LoginForm(),
        events: {
          submit: validateForm,
        },
      }),
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
