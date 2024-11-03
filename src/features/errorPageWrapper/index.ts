import Block, { BaseProps } from '@core/Block';
import { Button } from '@components/button';
import './errorPageWrapper.scss';
import tpl from './errorPageWrapper.hbs?raw';

export interface ErrorPageWrapperProps {
    errorNumber?: string;
    errorDescription?: string;
    errorPageButton?: Button;
    attr: {
        class: string
    }

}

export default class ErrorPageWrapper extends Block<BaseProps> {
  constructor(props: ErrorPageWrapperProps) {
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
