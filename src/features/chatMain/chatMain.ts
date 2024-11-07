import './chatMain.scss';

import Block, { BaseProps } from '@core/Block';
import { MessagesList } from '@features/messagesList/messagesList';
import tpl from './chatMain.hbs?raw';

export class ChatMain extends Block<BaseProps> {
  constructor() {
    super({
      attr: {
        class: 'main',
      },
      messagesList: new MessagesList(),
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
