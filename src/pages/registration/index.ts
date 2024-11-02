import './registration.scss';

import Block, { BaseProps } from '@core/Block.ts';
import { FormWrapper } from '@components/formWrapper';
import { RegistrationForm } from '@features/RegistrationForm';
import { validateRegistrationForm } from '@features/RegistrationForm/helpers';
import tpl from './registration.hbs?raw';

export default class RegistrationPage extends Block<BaseProps> {
  constructor() {
    super({
      formWrapper: new FormWrapper({
        title: 'Регистрация',
        children: new RegistrationForm(),
        events: {
          submit: validateRegistrationForm,
        },
      }),
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
