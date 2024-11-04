import Link from '@components/Link';
import Nav from '@components/Nav/index';
import { IndexLayout } from '@components/layout/IndexLayout/index';

import './styles/main.scss';
import { renderDOM } from './utils/render';

const nav = new Nav({

  items: [
    // new Link('li', {
    //   url: '/',
    //   title: 'Главная',
    //   attr: {
    //     class: 'link',
    //   },
    // }),

    new Link({
      url: '/login',
      title: 'Вход',
      attr: {
        class: 'link',
      },
    }, 'li'),

    new Link({
      url: '/registration',
      title: 'Регистрация',
      attr: {
        class: 'link',
      },
    }, 'li'),

    new Link({
      url: '/notFoundPage',
      title: '404',
      attr: {
        class: 'link',
      },
    }, 'li'),

    new Link({
      url: '/serverErrorPage',
      title: '500',
      attr: {
        class: 'link',
      },
    }, 'li'),

    // new Link('li', {
    //   url: '/chatList',
    //   title: 'Список чатов',
    //   attr: {
    //     class: 'link',
    //   },
    // }),
    new Link({
      url: '/profile',
      title: 'Профиль',
      attr: {
        class: 'link',
      },
    }, 'li'),
    // }),
  ],

  events: {
    click: (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
  },
}, 'ul');

const page = new IndexLayout(
  {
    nav,
    attr: {
      class: 'page',
    },
  },
);

renderDOM('.app', page);
