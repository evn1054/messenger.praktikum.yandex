import Block, { BaseProps } from '@core/Block';
import { ProfileField } from '@features/profileField';
import {
  validateProfileNewPassword,
  validateProfileNewPasswordAgain,
  validateProfileOldPassword,
} from '@features/passwordForm/helpers';
import { Button } from '@components/button';
import { validateForm } from '@features/helpers';
import { EditableField } from '@features/editableField';
import tpl from './passwordForm.hbs?raw';

export interface PasswordFormProps extends BaseProps {
    oldPassword?: ProfileField,
    newPassword?: ProfileField,
    newPasswordAgain?: ProfileField,
    isEdit?: boolean;
}

export const profileOldPasswordField = new EditableField({
  name: 'phone',
  events: {
    blur: () => {
      validateProfileOldPassword();
    },
  },
});
export const profileNewPasswordField = new EditableField({
  name: 'phone',
  events: {
    blur: () => {
      validateProfileNewPassword();
    },
  },
});
export const profileNewPasswordAgainField = new EditableField({
  name: 'phone',
  events: {
    blur: () => {
      validateProfileNewPasswordAgain();
    },
  },
});

export class PasswordForm extends Block<PasswordFormProps> {
  constructor(props: PasswordFormProps) {
    super({
      oldPassword: new ProfileField({
        fieldTitle: 'Старый пароль',
        value: 'mock value', // TODO: в будущем будет приходить объект с информаций по этому полю
        isHideValue: true,
        isEdit: props.isEdit,
        editableInput: profileOldPasswordField,
      }),
      newPassword: new ProfileField({
        fieldTitle: 'Новый пароль',
        value: 'mock value', // TODO: в будущем будет приходить объект с информаций по этому полю
        isHideValue: true,
        isEdit: props.isEdit,
        editableInput: profileNewPasswordField,
      }),
      newPasswordAgain: new ProfileField({
        fieldTitle: 'Повторите новый пароль',
        value: 'mock value', // TODO: в будущем будет приходить объект с информаций по этому полю
        isHideValue: true,
        isEdit: props.isEdit,
        editableInput: profileNewPasswordAgainField,
      }),

      events: {
        submit: (event) => {
          event.preventDefault();
          validateForm(event, {
            oldPassword: validateProfileOldPassword,
            newPassword: validateProfileNewPassword,
            newPasswordAgain: validateProfileNewPasswordAgain,
          });
        },
      },

      submitButton: props.isEdit ? new Button({
        attr: {
          class: 'profile__button',
        },
        label: 'Сохранить',
        type: 'submit',
      }) : '',
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
