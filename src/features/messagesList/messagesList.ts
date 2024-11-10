import './messagesList.scss';
import Block, { BaseProps } from '@core/Block';
import { getHours } from '@features/helpers';
import { Message } from '@components/message';
import tpl from './messagesList.hbs?raw';

const MockMessagesListData = [
  {
    userId: '1',
    messages: [
      {
        messageId: '1',
        senderId: 'myId',
        text: 'Привет, Сэм, готов к путешествию?',
        timestamp: '2022-03-12T11:30:00Z',
        status: 'isRead',
      },
      {
        messageId: '2',
        senderId: '1',
        text: 'Конечно, мистер Фродо! Я всё упаковал.',
        timestamp: '2022-03-12T11:35:00Z',
        status: 'isRead',
      },
      {
        messageId: '3',
        senderId: 'myId',
        text: 'Отлично, тогда выдвигаемся завтра утром!',
        timestamp: '2022-03-12T11:40:00Z',
        status: 'isRead',
      },
    ],
  },
  {
    userId: '2',
    messages: [
      {
        messageId: '1',
        senderId: '2',
        text: 'Фродо, ты где?',
        timestamp: '2023-05-23T09:00:00Z',
        status: 'isNotRead',
      },
      {
        messageId: '2',
        senderId: 'myId',
        text: 'Я здесь, Сэм!',
        timestamp: '2023-05-23T09:05:00Z',
        status: 'isRead',
      },
      {
        messageId: '3',
        senderId: '2',
        text: 'Отлично, тогда начнем наше приключение!',
        timestamp: '2023-05-23T09:10:00Z',
        status: 'isRead',
      },
    ],
  },
  {
    userId: '3',
    messages: [
      {
        messageId: '1',
        senderId: '3',
        text: 'Волшебник никогда не опаздывает, Фродо.',
        timestamp: '2024-07-01T07:00:00Z',
        status: 'isRead',
      },
      {
        messageId: '2',
        senderId: 'myId',
        text: 'Но ты же сказал, что придешь вовремя!',
        timestamp: '2024-07-01T07:05:00Z',
        status: 'isRead',
      },
      {
        messageId: '3',
        senderId: '3',
        text: 'Ты ошибся в значении "вовремя".',
        timestamp: '2024-07-01T07:10:00Z',
        status: 'isRead',
      },
    ],
  },
  {
    userId: '4',
    messages: [
      {
        messageId: '1',
        senderId: '4',
        text: 'Фродо, встречаемся сегодня вечером в "Гарцующем пони".',
        timestamp: '2023-11-11T15:45:00Z',
        status: 'isNotRead',
      },
      {
        messageId: '2',
        senderId: 'myId',
        text: 'Я буду там, Арагорн.',
        timestamp: '2023-11-11T15:50:00Z',
        status: 'isNotRead',
      },
      {
        messageId: '3',
        senderId: '4',
        text: 'Не забудь держать кольцо в безопасности.',
        timestamp: '2023-11-11T15:55:00Z',
        status: 'isNotRead',
      },
    ],
  },
  {
    userId: '5',
    messages: [
      {
        messageId: '1',
        senderId: '5',
        text: 'Фродо, враг движется. Будь начеку.',
        timestamp: '2022-09-15T13:20:00Z',
        status: 'isRead',
      },
      {
        messageId: '2',
        senderId: 'myId',
        text: 'Спасибо, Леголас. Я буду осторожен.',
        timestamp: '2022-09-15T13:25:00Z',
        status: 'isRead',
      },
    ],
  },
];

export class MessagesList extends Block<BaseProps> {
  constructor() {
    const currentUserMockId = 'myId';
    const currentChatMockData = MockMessagesListData[1]?.messages.map((item) => new Message({
      text: item.text,
      owner: item.senderId !== currentUserMockId,
      date: getHours(item.timestamp),
      isRead: item.status,
      srcImg: '', // TODO: переработать работу с изображением
    }));
    super({
      attr: {
        class: 'main__messages',
      },
      messageList: currentChatMockData,
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
