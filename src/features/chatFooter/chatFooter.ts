import './chatFooter.scss';

import Block, { BaseProps } from '@core/Block';
import { Button } from '@components/button';
import tpl from './chatFooter.hbs?raw';

export class ChatFooter extends Block<BaseProps> {
  constructor() {
    super({
      sendButton: new Button({
        type: 'round',
        icon: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">\n'
                    + '<rect x="8" y="13.2" width="11" height="1.6" fill="white"/>\n'
                    + '<path d="M15 9L19 14L15 19" stroke="white" stroke-width="1.6"/>\n'
                    + '</svg>\n',
      }),
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
