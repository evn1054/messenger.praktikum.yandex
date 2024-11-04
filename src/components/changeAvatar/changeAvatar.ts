import Block, { BaseProps } from '@core/Block.ts';
import { ProfileAvatar } from '@components/avatar';
import './changeAvatar.scss';
import tpl from './changeAvatar.hbs?raw';

interface ChangeAvatarProps extends BaseProps {
    avatar: ProfileAvatar;
}

export class ChangeAvatar extends Block<ChangeAvatarProps> {
  constructor(props) {
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
