import Block from '@core/Block.ts';
import tpl from './tpl.hbs?raw';

export default class Index extends Block {
  componentDidUpdate(oldProps, newProps) {
    if (oldProps.title !== newProps.title) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
      return true;
    }
    return false;
  }

  render() {
    return this.compile(tpl, this._props);
  }
}
