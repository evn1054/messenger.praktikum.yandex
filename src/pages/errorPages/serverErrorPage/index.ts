import Block from '@core/Block.ts';
import ErrorPageWrapper from '@features/errorPageWrapper';
import { Button } from '@components/button';
import tpl from './serverErrorPage.hbs?raw';

export default class ServerErrorPage extends Block {
  constructor() {
    super({
      errorPageWrapper: new ErrorPageWrapper({
        errorNumber: '500',
        errorDescription: 'Мы уже фиксим',
        errorPageButton: new Button({
          label: 'Назад к чатам',
          type: 'link',
          attr: {
            class: 'error-message__button',
          },
        }),
        attr: {
          class: 'error-message',
        },
      }),
    }, 'div');
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
