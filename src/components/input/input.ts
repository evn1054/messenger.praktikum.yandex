import Block from '@core/Block.ts';
import tpl from './input.hbs?raw';

interface InputProps extends Block {
    name: string,
    label?: string,
    type?: string,
    events?: {
        blur?: (event: any) => void;
        focus?: (event: any) => void;
    };
}

export class Input extends Block {
  constructor({
    label, name, type, events,
  }: InputProps) {
    super({
      label, name, type, events,
    }, 'div');
  }

  addEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach((eventName) => {
      this._element.children[0].children[0].children[0].addEventListener(eventName, events[eventName]); //  Такая реализация, потому что целевой input вложен в обертки
    });
  }

  setProps(newProps) {
    if (!newProps) return;

    const element = this._element.children[0].children[0].children[0]; //  Такая реализация, потому что целевой input вложен в обертки
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
    return this.compile(tpl, this._props);
  }
}
