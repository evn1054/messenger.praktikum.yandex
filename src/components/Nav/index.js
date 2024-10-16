import tpl from './tpl';
import Block from '../../core/Block';

export default class Nav extends Block {
  render() {
    console.log('Nav render');
    // return this.compile(tpl)
    return this.compile('{{{items}}}');
  }

  addEvents() {
    super.addEvents();
    this._element.querySelectorAll('a').forEach((a) => {
      //     a.addEventListener('click', e => {
      //         e.preventDefault();
      //         e.stopPropagation();
      //         console.log('Link clicked');
      //     })
      a.addEventListener('click', this._props.events.click);
    });
  }
}
