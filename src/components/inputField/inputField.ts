import './inputField.scss';
import Block, { BaseProps } from '@core/Block.ts';
import { Input } from '@components/input/input';
import tpl from './inputField.hbs?raw';

export interface InputFieldProps extends BaseProps {
    label?: string;
    input: Input
}

export class InputField extends Block<InputFieldProps> {
  constructor(props: InputFieldProps) {
    super(props);
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
