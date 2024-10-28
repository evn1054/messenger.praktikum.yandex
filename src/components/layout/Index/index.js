import Block from '@core/Block.ts';
import tpl from './tpl';

export default class Index extends Block {
  render() {
    return this.compile(tpl);
  }

  componentDidUpdate(oldProps, newProps) {
    return oldProps.title !== newProps.title;
  }
}
