import Block, { BaseProps } from '@core/Block.ts';
import { ProfileMainInfo } from '@features/profileMainInfo';
import tpl from './passwordForm.hbs?raw';

export interface PasswordFormProps extends BaseProps {
    oldPassword?: ProfileMainInfo,
    newPassword?: ProfileMainInfo,
    newPasswordAgain?: ProfileMainInfo,
    isEdit?: boolean;
}

export class PasswordForm extends Block<PasswordFormProps> {
  constructor(props: PasswordFormProps) {
    super({
      oldPassword: new ProfileMainInfo({
        // isButton: props.isButton,
        // key: props.key,
        // value: props.value,
        // isEdit: props.isEdit,
        // isLast: props.isLast,
        isButton: false,
        isHideValue: true,
        key: 'Старый пароль',
        value: 'Старый пароль', // TODO: в будущем будет приходить объект с информаций по этому полю
        isEdit: props.isEdit,
      }),
      newPassword: new ProfileMainInfo({
        // isButton: props.isButton,
        // key: props.key,
        // value: props.value,
        // isEdit: props.isEdit,
        // isLast: props.isLast,
        key: 'Новый пароль',
        value: 'Новый пароль', // TODO: в будущем будет приходить объект с информаций по этому полю
        isEdit: props.isEdit,
      }),
      newPasswordAgain: new ProfileMainInfo({
        // isButton: props.isButton,
        // key: props.key,
        // value: props.value,
        // isEdit: props.isEdit,
        // isLast: props.isLast,
        key: 'Повторите новый пароль',
        value: 'Повторите новый пароль', // TODO: в будущем будет приходить объект с информаций по этому полю
        isEdit: props.isEdit,
      }),

    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
