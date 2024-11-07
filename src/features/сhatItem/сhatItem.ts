import Block, { BaseProps } from '@core/Block';
import './сhatItem.scss';
import { Avatar } from '@components/avatar';
import { IChat } from '@pages/chatListPage/chatListPage';
import tpl from './сhatItem.hbs?raw';

// export interface ChatItemProps extends BaseProps {
//     avatar: {
//         image: string
//     },
//     chatName: string
//     chatDate: string,
//     chatDescription: string,
//     chatNotification: number
// }

export class ChatItem extends Block<BaseProps> {
  constructor(props: IChat) {
    super({
      avatar: new Avatar({
        name: props.chatName,
        image: props.avatar.image,
        size: '47px',
        svgWidth: '20',
        svgHeight: '20',
      }),
      chatName: props.chatName,
      chatDate: props.chatDate,
      chatDescription: props.chatDescription,
      chatNotification: props.chatNotification.count,
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
