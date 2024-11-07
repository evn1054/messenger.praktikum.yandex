import Block, { BaseProps } from '@core/Block';
import './formWrapper.scss';
import tpl from './formWrapper.hbs?raw';

export class FormWrapper extends Block<BaseProps> {
  render() {
    return this.compile(tpl as string, this._props);
  }
}
