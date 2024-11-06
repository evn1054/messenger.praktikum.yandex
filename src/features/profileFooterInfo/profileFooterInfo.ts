import Block from '@core/Block.ts';
import './profileFooterInfo.scss';
import { ProfileField } from '@features/profileField';
import { ProfileFieldListProps } from '@features/profileMainInfoList/profileMainInfoList';
import tpl from './profileFooterInfo.hbs?raw';

export class ProfileFooterInfo extends Block<ProfileFieldListProps> {
  constructor(props: ProfileFieldListProps) {
    super({
      attr: {
        class: 'profile__footer',
      },
      changeDataButton: new ProfileField({
        fieldTitle: 'Изменить данные',
        isButton: true,
        isEdit: props.isEdit,
      }),
      changePasswordButton: new ProfileField({
        fieldTitle: 'Изменить пароль',
        isButton: true,
        isEdit: props.isEdit,
      }),
      exitButton: new ProfileField({
        type: 'attention',
        fieldTitle: 'Выйти',
        isLast: true,
        isButton: true,
        isEdit: props.isEdit,
      }),
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
