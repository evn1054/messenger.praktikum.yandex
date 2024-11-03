import Block from '@core/Block';
import tpl from './errorPageWrapper.hbs?raw';
import './errorPageWrapper.scss';

export default class ErrorPageWrapper extends Block {
  constructor(props) {
    super({
      errorNumber: props.errorNumber,
      errorDescription: props.errorDescription,
      errorPageButton: props.errorPageButton,
      attr: {
        class: props.attr.class,
      },
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
