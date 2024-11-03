import Link from '@components/Link';
import IndexLayout from '@components/layout/Index/index';
import Nav from '@components/Nav/index';
import { renderDOM } from './utils/render';

import './styles/main.scss';

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
    // new Link('li', {
    //   url: '/profile',
    //   title: 'Профиль',
    //   attr: {
    //     class: 'link',
    //   },
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
