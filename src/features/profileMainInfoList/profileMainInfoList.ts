import Block, { BaseProps } from '@core/Block.ts';
import './profileMainInfoList.scss';
import { Button } from '@components/button';
import { InfoForm } from '@features/infoForm';
import { PasswordForm } from '@features/passwordForm';
import { ProfileFooterInfo } from '@features/profileFooterInfo';
import { ProfileMainInfo } from '@features/profileMainInfo';
import tpl from './profileMainInfoList.hbs?raw';

export interface ProfileMainInfoListProps extends BaseProps {
    isPasswordEdit?: boolean;
    isEdit?: boolean;
    infoForm?: InfoForm,
    attr?: {
        class?: string;
    };
}

export class ProfileMainInfoList extends Block<ProfileMainInfoListProps> {
  constructor(props: ProfileMainInfoListProps) {
    super({
      attr: {
        class: props.attr?.class || '',
      },
      isPasswordEdit: props.isPasswordEdit,
      isEdit: props.isEdit,
      infoForm: new InfoForm({ // TODO: тут нужно реализовать прокидывание value в input так, чтобы это значение можно было изменять
        isEdit: props.isEdit,
      }),
      passwordForm: new PasswordForm({ // TODO: тут нужно реализовать прокидывание value в input так, чтобы это значение можно было изменять
        isEdit: props.isEdit,
      }),
      profileButton: new Button({
        attr: {
          class: 'profile__button',
        },
        type: 'primary',
        label: 'Сохранить',
      }),
      profileFooterInfo: new ProfileFooterInfo({
        changeDataButton: new ProfileMainInfo({
          isButton: true,
          key: 'Изменить данные',
        }),
        changePasswordButton: new ProfileMainInfo({
          isButton: true,
          key: 'Изменить пароль',
        }),
        exitButton: new ProfileMainInfo({
          isButton: true,
          key: 'Выйти',
          isLast: true,
          type: 'attention',
        }),
        attr: {
          class: 'profile__footer',
        },
      }),
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
