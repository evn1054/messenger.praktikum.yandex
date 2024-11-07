import Block, { BaseProps } from '@core/Block';
import tpl from './tpl.hbs?raw';

export class IndexLayout extends Block<BaseProps> {
  componentDidUpdate(oldProps: BaseProps, newProps: BaseProps) {
    if (oldProps.title !== newProps.title) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
      return true;
    }
    return false;
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
