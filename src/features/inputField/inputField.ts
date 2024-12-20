import './inputField.scss';
import Block, { BaseProps } from '@core/Block';
import { Input } from '@components/input/input';
import tpl from './inputField.hbs?raw';

export interface InputFieldProps extends BaseProps {
    label?: string;
    input: Input
}

export class InputField extends Block<InputFieldProps> {
  render() {
    return this.compile(tpl as string, this._props);
  }
}
