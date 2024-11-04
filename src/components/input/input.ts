import './input.scss';
import Block, { BaseProps } from '@core/Block.ts';
import tpl from './input.hbs?raw';

export interface InputProps extends BaseProps {
    name?: string;
    type?: string;
    editable?: boolean;
    events?: {
        blur?: (event: FocusEvent) => void;
        focus?: (event: FocusEvent) => void;
    };
}

export class Input extends Block<InputProps> {
  addEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach((eventName) => {
      const listener = events[eventName] as (event: Event) => void | undefined;
      const element = this._element!.children[0] as HTMLInputElement;
      if (listener) {
        element.addEventListener(eventName, listener);
      }
    });
  }

  setProps(newProps: Partial<InputProps>) {
    if (!newProps) return;

    const element = this._element!.children[0] as HTMLInputElement;
    this._setUpdate = false;
    const oldValue = { oldInnerHTMLValue: element.value, oldElement: element, ...this._props };

    const { props, children } = this.getChildren(newProps);
    if (Object.values(children).length) Object.assign(this._children, children);
    if (Object.values(props).length) Object.assign(this._props, props);

    if (this._setUpdate) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, this._props);
      this._setUpdate = false;
    }
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
