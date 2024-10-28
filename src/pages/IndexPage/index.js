import Block from '@core/Block.ts';
import tpl from './tpl';

export default class IndexPage extends Block {
  render() {
    return this.compile(tpl);
  }
}
