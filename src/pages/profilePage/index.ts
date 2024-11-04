import Block, { BaseProps } from '@core/Block.ts';
import './profilePage.scss';
import { Sidebar } from '@components/sidebar';
import { ProfileMainInfoList } from '@features/profileMainInfoList';
import { ProfileAvatar } from '@components/avatar';
import tpl from './profilePage.hbs?raw';

export interface ProfilePageProps extends BaseProps {
    label?: string;
    isEdit?: boolean;
    profileAvatar?: ProfileAvatar;
}

export class ProfilePage extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    const isEditMock = false; // временное решение для рвзработки
    const isPasswordEditMock = false; // временное решение для рвзработки
    const userNameMock = 'Gerald'; // временное решение для рвзработки
    super({
      ...props,
      attr: {
        class: 'profile',
      },
      sidebar: new Sidebar(),
      userName: userNameMock,
      isEdit: isEditMock,

      profileAvatar: new ProfileAvatar({
        // image: props.profileAvatar.image || 'olo',
        // name: props.profileAvatar.name || 'lol',
        image: 'olo',
        name: userNameMock, // зачем тут это
      }),

      profileMainInfoList: new ProfileMainInfoList({
        attr: {
          class: 'profile__main-info',
        },
        // isPasswordEdit: props.isPasswordEdit,
        isPasswordEdit: isPasswordEditMock,
        isEdit: isEditMock,
      }),

    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
