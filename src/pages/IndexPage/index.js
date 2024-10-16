import Block from '../../core/Block';
import tpl from './tpl';

export default class IndexPage extends Block {
  render() {
    console.log('Page render');
    return this.compile(tpl);
  }
}
