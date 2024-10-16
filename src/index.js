import { renderDOM } from './utils/render';
import IndexLayout from './components/layout/Index';
import Link from './components/Link';
import Page from './pages/IndexPage';

import Nav from './components/Nav/index';

const nav = new Nav('ul', {
  items: [
    { url: '/', title: 'Главная' },
    { url: '/login', title: 'Вход' },
    { url: '/registration', title: 'Регистрация' },
    { url: '/pageNotFound', title: '404' },
    { url: '/serverError', title: '500' },
    { url: '/chatList', title: 'Список чатов' },
    { url: '/profile', title: 'Профиль' },
  ],

  /*
                                      items: [
                                          new Link('li', { url: '/', title: 'Главная'}),
                                          new Link('li', { url: '/form', title: 'Формой'})
                                      ],
                                      */

  events: {
    click: (e) => {
      console.log('Nav link clicked');
      e.preventDefault();
      e.stopPropagation();
      // if(e.target && e.target.getAttribute('href'))
      // {
      //     console.log('Nav link clicked');
      //     e.preventDefault();
      //     e.stopPropagation();
      // }
      // else console.log('No link clicked');
    },
  },
});

const content = new Page(
  'div',
  {
    text: 'Некий текст сожержимого страницы',
  },
);

const page = new IndexLayout(
  'div',
  {
    nav,
    title: 'Заголовок',
    content,
    attr: {
      class: 'page',
    },
  },
);

window.page = page;
window.content = content;
window.changePageContent = () => {
  const newContent = new Page('div', {
    text: 'Какой-то другой текст',
  });

  page.setProps({ content: newContent });
};

renderDOM('.app', page);
