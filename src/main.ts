import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import './styles/main.scss';

export interface IDialogData {
    'dialogImage'?: string;
    'dialogName': string;
    'dialogDescription': string;
    'dialogDate': string;
    'dialogNotification'?: string;
}

type PageContext = {
    [key: string]: any;
};

type PageEntry = [Handlebars.TemplateDelegate, PageContext];

interface PagesMap {
    [key: string]: PageEntry;
}

const pages: PagesMap = {
  login: [Pages.LoginPage, {}],
  registration: [Pages.RegistrationPage, {}],
  pageNotFound: [Pages.PageNotFound, {}],
  serverError: [Pages.ServerError, {}],
  chatList: [Pages.ChatList, {}],
  nav: [Pages.NavigatePage, {}],
  profile: [Pages.ProfilePage, {}],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  // Проверяем, существует ли страница в объекте pages
  const pageEntry = pages[page];
  if (pageEntry) {
    const [source, context] = pageEntry;
    const container = document.getElementById('app')!;
    container.innerHTML = Handlebars.compile(source)(context);
  } else {
    throw Error(`Page "${page}" not found`);
  }
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', (e) => {
  const page = (e.target as HTMLElement).getAttribute('data-page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

Handlebars.registerHelper('getHours', (dateString: string) => {
  // Преобразуем строку в объект даты
  const date = new Date(dateString);

  // Получаем часы и минуты из объекта даты
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Возвращаем часы и минуты в виде строки
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
});
Handlebars.registerHelper('dateTransform', (inputDate: string) => {
  const currentDate = new Date();
  const parsedDate = new Date(inputDate);

  const timeDiff = Math.abs(currentDate.getTime() - parsedDate.getTime());
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  const daysDiff = Math.floor(hoursDiff / 24);

  if (hoursDiff <= 24) {
    return parsedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  if (daysDiff <= 7) {
    const days = ['ВС', ' ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[parsedDate.getDay()];
  }
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  return `${parsedDate.getDate()} ${months[parsedDate.getMonth()]} ${parsedDate.getFullYear()}`;
});
Handlebars.registerHelper(
  'dateArrSort',
  (dataArray: IDialogData[]) => dataArray.sort((a, b) => {
    const dateA: Date = new Date(a.dialogDate);
    const dateB: Date = new Date(b.dialogDate);
    return dateB.getTime() - dateA.getTime();
  }),
);

Handlebars.registerHelper('currentChatData', () => ({
  info: {
    dialogImage: 'https://via.placeholder.com/600/f66b97',
    dialogName: 'Прокат фото',
  },
  messages: [
    {
      text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
      date: 'Wed, 19 Jun 2023 11:56:00 GMT',
      owner: false,
    },
    {
      text: 'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
      date: 'Wed, 19 Jun 2023 11:56:00 GMT',
      owner: false,
    },
    {
      srcImg: 'https://via.placeholder.com/600/f66b97',
      date: 'Wed, 19 Jun 2023 11:56:10 GMT',
      owner: true,
    },
    {
      text: 'Круто!',
      date: 'Wed, 19 Jun 2023 12:00:10 GMT',
      owner: true,
      isRead: true,
    },
    {
      text: ':-)',
      date: 'Wed, 19 Jun 2023 12:01:10 GMT',
      owner: true,
      isRead: false,
    },
  ],
}));
Handlebars.registerHelper('profileInfo', () => ({
  image: 'https://via.placeholder.com/600/f66b97',
  name: 'Иван',
  surname: 'Иванов',
  chatName: 'Иван',
  phone: '+7 (909) 967 30 30',
  email: 'pochta@yandex.ru',
  login: 'ivanivanov',
}));
Handlebars.registerHelper('chatListData', (): IDialogData[] => [
  {
    dialogImage: 'https://via.placeholder.com/600/f66b97',
    dialogName: 'Пользователь 1',
    dialogDescription: 'Последнее сообщение',
    dialogDate: 'Sat, 13 Apr 2024 03:04:05 GMT',
    dialogNotification: '6',
  },
  {
    dialogImage: 'https://via.placeholder.com/600/f66b97',
    dialogName: 'Пользователь 2',
    dialogDescription: 'Описание диалога 2',
    dialogDate: 'Fri, 12 Apr 2024 07:42:44 GMT',
    dialogNotification: '1',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 3',
    dialogDescription: 'Пока!',
    dialogDate: 'Tue, 02 Jan 2018 19:21:21 GMT',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 4',
    dialogDescription: 'Что нового?',
    dialogDate: 'Wed, 21 Feb 2001 01:39:20 GMT',
    dialogNotification: '5',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 5',
    dialogDescription: 'Давай встретимся завтра',
    dialogDate: 'Wed, 05 Apr 2017 08:47:27 GMT',
    dialogNotification: '6',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 6',
    dialogDescription: 'Какие у тебя планы на выходные?',
    dialogDate: 'Thu, 03 Jan 2008 17:08:26 GMT',
    dialogNotification: '4',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 7',
    dialogDescription: 'Спасибо за приглашение!',
    dialogDate: 'Thu, 02 Apr 1987 17:50:44 GMT',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 8',
    dialogDescription: 'Как дела?',
    dialogDate: 'Sat, 21 Aug 1999 12:53:07 GMT',
    dialogNotification: '1',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 9',
    dialogDescription: 'Привет!',
    dialogDate: 'Sat, 10 Sep 2011 00:24:34 GMT',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 10',
    dialogDescription: 'Спасибо за приглашение!',
    dialogDate: 'Fri, 18 Oct 2019 12:13:42 GMT',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 11',
    dialogDescription: 'Пока!',
    dialogDate: 'Wed, 17 Nov 1982 02:08:46 GMT',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 12',
    dialogDescription: 'Как прошел день?',
    dialogDate: 'Sun, 03 Jul 2005 15:39:47 GMT',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 13',
    dialogDescription: 'Привет!',
    dialogDate: 'Mon, 05 Feb 2018 06:30:47 GMT',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 14',
    dialogDescription: 'Привет!',
    dialogDate: 'Tue, 29 Sep 1981 10:15:36 GMT',
    dialogNotification: '7',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 15',
    dialogDescription: 'Как прошел день?',
    dialogDate: 'Thu, 06 Apr 1995 00:29:33 GMT',
    dialogNotification: '1',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 16',
    dialogDescription: 'Спасибо за приглашение!',
    dialogDate: 'Wed, 29 Nov 2017 02:34:50 GMT',
    dialogNotification: '6',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 17',
    dialogDescription: 'Давай встретимся завтра',
    dialogDate: 'Tue, 11 Aug 2015 20:35:57 GMT',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 18',
    dialogDescription: 'Как дела?',
    dialogDate: 'Sat, 23 Nov 2002 07:53:35 GMT',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 19',
    dialogDescription: 'Что нового?',
    dialogDate: 'Sat, 25 May 2019 22:15:09 GMT',
    dialogNotification: '4',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 20',
    dialogDescription: 'Давай встретимся завтра',
    dialogDate: 'Mon, 10 Sep 2012 20:42:40 GMT',
    dialogNotification: '8',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 21',
    dialogDescription: 'Как прошел день?',
    dialogDate: 'Sun, 29 Dec 1996 15:47:21 GMT',
    dialogNotification: '6',
  },
  {
    dialogImage: '',
    dialogName: 'Пользователь 22',
    dialogDescription: 'Привет!',
    dialogDate: 'Fri, 02 Oct 2009 09:32:11 GMT',
  },
]);
