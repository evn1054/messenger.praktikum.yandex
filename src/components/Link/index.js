import Block from '@core/Block.ts';
import tpl from './tpl';
import './Link.scss';

export default class Link extends Block {
  render() {
    return this.compile(tpl);
  }
}
