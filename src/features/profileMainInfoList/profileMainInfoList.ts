import Block, { BaseProps } from '@core/Block';
import './profileMainInfoList.scss';
import { InfoForm } from '@features/infoForm';
import { PasswordForm } from '@features/passwordForm';
import { ProfileFooterInfo } from '@features/profileFooterInfo';
import tpl from './profileMainInfoList.hbs?raw';

export interface ProfileFieldListProps extends BaseProps {
    isPasswordEdit?: boolean;
    isEdit?: boolean;
    attr?: {
        class?: string;
    };
}

export class ProfileFieldList extends Block<ProfileFieldListProps> {
  constructor(props: ProfileFieldListProps) {
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

      profileFooterInfo: new ProfileFooterInfo(props),
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
