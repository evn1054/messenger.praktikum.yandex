import Block, { BaseProps } from '@core/Block';
import { ErrorPageWrapper } from '@features/errorPageWrapper';
import { Button } from '@components/button';
import tpl from './serverErrorPage.hbs?raw';

export class ServerErrorPage extends Block<BaseProps> {
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
