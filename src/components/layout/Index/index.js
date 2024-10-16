import Block from '../../../core/Block';
import Nav from '../../Nav/index';
import tpl from './tpl';

export default class Index extends Block {
  render() {
    console.log('Layout render');
    return this.compile(tpl);
  }

  /*
            componentDidUpdate(oldProps, newProps) {
                return oldProps['title'] !== newProps['title'];
            }
            */

  /*
            constructor(tag = 'div', props = {}) {
                props['nav'] = new Nav('div', {
                    items: [
                        { url: '/', title: 'Главная'},
                        { url: '/form', title: 'Формой'},
                    ],

                    events: {
                        click: e => {
                            const t = e.target;

                            if(t && t.getAttribute('href')) {
                                console.log('Nav link clicked');
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        }
                    }
                })
            }
            */
}
