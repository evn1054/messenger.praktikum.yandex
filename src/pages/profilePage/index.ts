import Block, { BaseProps } from '@core/Block.ts';
import './profilePage.scss';
import { ProfileAvatar } from '@components/avatar';
import { ChangeAvatar } from '@components/changeAvatar/changeAvatar';
import { Sidebar } from '@features/sidebar';
import { ProfileFieldList } from '@features/profileMainInfoList/profileMainInfoList';
import tpl from './profilePage.hbs?raw';

export interface ProfilePageProps extends BaseProps {
    label?: string;
    isEdit?: boolean;
    profileAvatar?: ProfileAvatar;
}

export class ProfilePage extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    const isEditMock = false; // временное решение для рвзработки
    const isPasswordEditMock = true; // временное решение для рвзработки
    const userNameMock = 'Gerald'; // временное решение для рвзработки
    super({
      ...props,
      attr: {
        class: 'profile',
      },
      sidebar: new Sidebar(),
      userName: userNameMock,
      isEdit: isEditMock,

      profileAvatar: new ChangeAvatar({
        avatar: new ProfileAvatar({
          name: userNameMock,
          size: '130px',
        }),
      }),

      ProfileFieldList: new ProfileFieldList({
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
