import './searchInput.scss';

import Block, { BaseProps } from '@core/Block';
import tpl from './searchInput.hbs?raw';

export class SearchInput extends Block<BaseProps> {
  render() {
    return this.compile(tpl as string, this._props);
  }
}
