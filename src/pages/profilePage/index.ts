import Block, { BaseProps } from '@core/Block';
import './profilePage.scss';
import { Avatar } from '@components/avatar';
import { ChangeAvatar } from '@features/changeAvatar/changeAvatar';
import { Sidebar } from '@features/sidebar';
import { ProfileFieldList } from '@features/profileMainInfoList/profileMainInfoList';
import tpl from './profilePage.hbs?raw';

export interface ProfilePageProps extends BaseProps {
    label?: string;
    isEdit?: boolean;
    avatar?: Avatar;
}

export class ProfilePage extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    const isEditMock = true; // временное решение для рвзработки
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

      avatar: new ChangeAvatar({
        avatar: new Avatar({
          name: userNameMock,
          size: '130px',
          svgWidth: '40px',
          svgHeight: '40px',
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
