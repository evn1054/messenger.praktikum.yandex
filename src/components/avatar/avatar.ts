import Block, { BaseProps } from '@core/Block.ts';
import './avatar.scss';
import tpl from './avatar.hbs?raw';

export interface ProfileAvatarProps extends BaseProps {
    class?: string;
    image?: string;
    name?: string
}

export class ProfileAvatar extends Block<ProfileAvatarProps> {
  render() {
    return this.compile(tpl as string, this._props);
  }
}
