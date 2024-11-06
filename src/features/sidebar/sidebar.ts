import Block, { BaseProps } from '@core/Block.ts';
import { Button } from '@components/button';
import './sidebar.scss';
import tpl from './sidebar.hbs?raw';

export interface SidebarProps extends BaseProps {
    buttonIcon?: Button
}

export class Sidebar extends Block<SidebarProps> {
  constructor() {
    super({
      attr: {
        class: 'back',
      },
      buttonIcon: new Button({
        attr: {
          class: 'sidebarButton',
        },
        type: 'round',
        icon: '<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1 9L5 5L1 1" stroke="#fff" transform="rotate(180 3 5)"/></svg>',
      }),
    }, 'aside');
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
