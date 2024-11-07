import './styles/main.scss';
import { Navigation } from '@features/navigation';
import { Link } from '@components/link';
import { IndexLayout } from './layout/IndexLayout';
import { renderDOM } from './utils/render';

const navigation = new Navigation({
  items: [
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
    new Link({
      url: '/profile',
      title: 'Профиль',
      attr: {
        class: 'link',
      },
    }, 'li'),
    new Link({
      url: '/chatListPage',
      title: 'Список чатов',
      attr: {
        class: 'link',
      },
    }, 'li'),
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
    navigation,
    attr: {
      class: 'page',
    },
  },
);

renderDOM('.app', page);
