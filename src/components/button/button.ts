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

// export class Button extends Block<Props> {
export class Button extends Block<ButtonProps> {
  render() {
    return this.compile(tpl as string, this._props);
  }
}
