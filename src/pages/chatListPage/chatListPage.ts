import Block, { BaseProps } from '@core/Block';
import './chatListPage.scss';
import { ChatItem } from '@features/сhatItem/сhatItem';
import { SearchInput } from '@features/searchInput';
import { chatDateSort, dateTransform } from '@features/helpers';
import { ChatHeader } from '@features/chatHeader/chatHeader';
import { ChatMain } from '@features/chatMain';
import { ChatFooter } from '@features/chatFooter';
import tpl from './chatListPage.hbs?raw';

export interface IChat {
    userId: string,
    avatar: {
        image: string,
    },
    chatName: string,
    chatDate: string,
    chatDescription: string,
    chatNotification: {
        count: number,
    },
}

const MockChatData: IChat[] = [
  {
    userId: '1',
    avatar: {
      image: '',
    },
    chatName: 'Фродо Бэггинс',
    chatDate: '2024-11-05T11:30:00Z',
    chatDescription: 'Привет, Сэм, готов к путешествию?',
    chatNotification: {
      count: 2,
    },
  },
  {
    userId: '2',
    avatar: {
      image: '',
    },
    chatName: 'Сэмуайз Гэмджи',
    chatDate: '2023-05-23T12:00:00Z',
    chatDescription: 'Конечно, мистер Фродо! Я всё упаковал.',
    chatNotification: {
      count: 1,
    },
  },
  {
    userId: '3',
    avatar: {
      image: '',
    },
    chatName: 'Гэндальф Серый',
    chatDate: '2024-07-01T07:00:00Z',
    chatDescription: 'Волшебник никогда не опаздывает, Фродо Бэггинс.',
    chatNotification: {
      count: 0,
    },
  },
  {
    userId: '4',
    avatar: {
      image: '',
    },
    chatName: 'Арагорн',
    chatDate: '2023-11-11T15:45:00Z',
    chatDescription: 'Встретимся сегодня вечером в трактире "Гарцующий пони".',
    chatNotification: {
      count: 3,
    },
  },
  {
    userId: '5',
    avatar: {
      image: '',
    },
    chatName: 'Леголас',
    chatDate: '2022-09-15T13:20:00Z',
    chatDescription: 'Враг движется. Будь на чеку.',
    chatNotification: {
      count: 0,
    },
  },
  {
    userId: '6',
    avatar: {
      image: '',
    },
    chatName: 'Гимли',
    chatDate: '2023-08-21T09:30:00Z',
    chatDescription: 'И мой топор!',
    chatNotification: {
      count: 1,
    },
  },
  {
    userId: '7',
    avatar: {
      image: '',
    },
    chatName: 'Боромир',
    chatDate: '2024-01-05T08:15:00Z',
    chatDescription: 'Никто просто так не войдёт в Мордор.',
    chatNotification: {
      count: 5,
    },
  },
  {
    userId: '8',
    avatar: {
      image: '',
    },
    chatName: 'Саруман',
    chatDate: '2022-12-30T06:00:00Z',
    chatDescription: 'Нам нужно присоединиться к Саурону. Это будет мудрое решение, мой друг.',
    chatNotification: {
      count: 0,
    },
  },
  {
    userId: '9',
    avatar: {
      image: '',
    },
    chatName: 'Саурон',
    chatDate: '2023-04-17T20:59:00Z',
    chatDescription: 'Ты не можешь спрятаться. Я вижу тебя.',
    chatNotification: {
      count: 8,
    },
  },
  {
    userId: '10',
    avatar: {
      image: '',
    },
    chatName: 'Голлум',
    chatDate: '2022-10-11T18:45:00Z',
    chatDescription: 'Моя прелесть...',
    chatNotification: {
      count: 0,
    },
  },
];
const MockHeaderData = {
  userId: '10',
  avatar: {
    image: '',
  },
  chatName: 'Голлум',
  chatDate: '2022-10-11T18:45:00Z',
  chatDescription: 'Моя прелесть...',
  chatNotification: {
    count: 0,
  },
};

export class ChatListPage extends Block<BaseProps> {
  constructor() {
    const chatList: ChatItem[] = chatDateSort(MockChatData).map((item: IChat) => new ChatItem({
      ...item,
      chatDate: dateTransform(item.chatDate),
    }));
    super({
      searchInput: new SearchInput({}),
      chatList,
      chatHeader: new ChatHeader({ ...MockHeaderData }),
      chatMain: new ChatMain(),
      chatFooter: new ChatFooter(),
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
