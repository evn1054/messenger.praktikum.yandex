import Block from '@core/Block.ts';
import tpl from './formWrapper.hbs?raw';

export class FormWrapper extends Block {
  render() {
    return this.compile(tpl as string, this._props);
  }
}
