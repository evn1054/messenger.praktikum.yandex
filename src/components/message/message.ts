import './message.scss';

import Block, { BaseProps } from '@core/Block';
import tpl from './message.hbs?raw';

export class Message extends Block<BaseProps> {
  render() {
    return this.compile(tpl as string, this._props);
  }
}
