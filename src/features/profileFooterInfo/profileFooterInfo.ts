import Block, { BaseProps } from '@core/Block.ts';
import './profileFooterInfo.scss';
import tpl from './profileFooterInfo.hbs?raw';

export class ProfileFooterInfo extends Block<BaseProps> {
  render() {
    return this.compile(tpl as string, this._props);
  }
}
