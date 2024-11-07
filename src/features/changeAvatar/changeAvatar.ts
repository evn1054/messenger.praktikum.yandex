import Block, { BaseProps } from '@core/Block';
import { Avatar } from '@components/avatar';
import './changeAvatar.scss';
import tpl from './changeAvatar.hbs?raw';

interface ChangeAvatarProps extends BaseProps {
    avatar: Avatar;
}

export class ChangeAvatar extends Block<ChangeAvatarProps> {
  constructor(props: ChangeAvatarProps) {
    super({
      ...props,
      attr: {
        class: 'change_avatar',
      },
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
