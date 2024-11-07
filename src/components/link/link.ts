import Block, { BaseProps } from '@core/Block';
import './link.scss';
import tpl from './link.hbs?raw';

export class Link extends Block<BaseProps> {
  render() {
    return this.compile(tpl as string, this._props);
  }
}
