import Block, { BaseProps } from '@core/Block';
import './avatar.scss';
import tpl from './avatar.hbs?raw';

export interface AvatarProps extends BaseProps {
    class?: string;
    image?: string;
    name?: string;
    size?: string;
    svgWidth?: string;
    svgHeight?: string;
}

export class Avatar extends Block<AvatarProps> {
  render() {
    return this.compile(tpl as string, this._props);
  }
}
