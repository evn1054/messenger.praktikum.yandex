import Block, { BaseProps } from '@core/Block';
import './button.scss';
import tpl from './button.hbs?raw';

interface ButtonProps extends BaseProps {
    label?: string;
    icon?: string;
    type?: string
    events?: {
        click?: (event: Event) => void,
    };
}

export class Button extends Block<ButtonProps> {
  render() {
    return this.compile(tpl as string, this._props);
  }
}
