import './chatHeader.scss';

import Block, { BaseProps } from '@core/Block';
import { Avatar } from '@components/avatar';
import { BurgerMenu } from '@components/burgerMenu';
import { IChat } from '@pages/chatListPage/chatListPage';
import tpl from './chatHeader.hbs?raw';

export class ChatHeader extends Block<BaseProps> {
  constructor(props: IChat) {
    super({
      avatar: new Avatar({
        name: props.chatName,
        image: props.avatar.image,
        size: '34px',
        svgWidth: '14',
        svgHeight: '14',
      }),
      chatName: props.chatName,
      burgerMenu: new BurgerMenu(),
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
