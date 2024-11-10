import './burgerMenu.scss';

import Block, { BaseProps } from '@core/Block';
import { Button } from '@components/button';
import tpl from './burgerMenu.hbs?raw';

export class BurgerMenu extends Block<BaseProps> {
  constructor() {
    super({
      attr: {
        class: 'burger-menu',
      },
      burgerMenu: new Button({
        icon: '<svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E"/><circle cx="1.5" cy="8" r="1.5" fill="#1E1E1E"/><circle cx="1.5" cy="14" r="1.5" fill="#1E1E1E"/></svg>',
      }),
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
