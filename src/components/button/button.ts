import Block from '@core/Block.ts';
import { BaseProps } from '@core/types.ts';
import tpl from './button.hbs?raw';

interface ButtonProps extends BaseProps {
    label?: string;
    type?: string;
    events?: {
        click?: (event: Event) => void,
    }
}

export class Button extends Block<ButtonProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
