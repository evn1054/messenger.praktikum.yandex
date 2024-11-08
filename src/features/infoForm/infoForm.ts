import Block, { BaseProps } from '@core/Block';
import { Button } from '@components/button';
import { validateForm } from '@features/helpers';
import { ProfileField } from '@features/profileField';
import {
  validateProfileChatName,
  validateProfileEmail, validateProfileFirstName,
  validateProfileLastName, validateProfileLogin,
  validateProfilePhone,
} from '@features/infoForm/helpers';
import { EditableField } from '@features/editableField';
import tpl from './infoForm.hbs?raw';

export interface InfoFormProps extends BaseProps {
    passwordInfoForm?: ProfileField;
    mail?: ProfileField;
    login?: ProfileField;
    firstName?: ProfileField;
    secondName?: ProfileField;
    chatName?: ProfileField;
    phone?: ProfileField;
    isEdit?: boolean;
    isButton?: boolean;
    event?: {
        submit?: (event: Event) => void
        blur?: (event: FocusEvent) => void
    }

}

export const profileEmailField = new EditableField({
  name: 'email',
  events: {
    blur: () => {
      validateProfileEmail();
    },
  },
});
export const profileLoginField = new EditableField({
  name: 'login',
  events: {
    blur: () => {
      validateProfileLogin();
    },
  },
});
export const profileFirstNameField = new EditableField({
  name: 'first_name',
  events: {
    blur: () => {
      validateProfileFirstName();
    },
  },
});
export const profileLastNameField = new EditableField({
  name: 'second_Name',
  events: {
    blur: () => {
      validateProfileLastName();
    },
  },
});
export const profileChatNameField = new EditableField({
  name: 'chatName',
  events: {
    blur: () => {
      validateProfileChatName();
    },
  },
});
export const profilePhoneField = new EditableField({
  name: 'phone',
  events: {
    blur: () => {
      validateProfilePhone();
    },
  },
});

export class InfoForm extends Block<InfoFormProps> {
  constructor(props: InfoFormProps) {
    super({
      email: new ProfileField({
        fieldTitle: 'Почта',
        value: 'mock value', // TODO: в будущем будет приходить объект с информаций по этому полю
        isEdit: props.isEdit,
        editableInput: profileEmailField,
      }),
      login: new ProfileField({
        fieldTitle: 'Логин',
        value: 'mock value', // TODO: в будущем будет приходить объект с информаций по этому полю
        isEdit: props.isEdit,
        editableInput: profileLoginField,
      }),
      firstName: new ProfileField({
        fieldTitle: 'Имя',
        value: 'mock value', // TODO: в будущем будет приходить объект с информаций по этому полю
        isEdit: props.isEdit,
        editableInput: profileFirstNameField,
      }),
      secondName: new ProfileField({
        fieldTitle: 'Фамилия',
        value: 'mock value', // TODO: в будущем будет приходить объект с информаций по этому полю
        isEdit: props.isEdit,
        editableInput: profileLastNameField,
      }),
      chatName: new ProfileField({
        fieldTitle: 'Имя в чате',
        value: 'mock value', // TODO: в будущем будет приходить объект с информаций по этому полю
        isEdit: props.isEdit,
        editableInput: profileChatNameField,
      }),
      phone: new ProfileField({
        fieldTitle: 'Телефон',
        value: 'mock value', // TODO: в будущем будет приходить объект с информаций по этому полю
        isEdit: props.isEdit,
        editableInput: profilePhoneField,
      }),
      events: {
        submit: (event) => {
          event.preventDefault();
          validateForm(event, {
            email: validateProfileEmail,
            login: validateProfileLogin,
            firstName: validateProfileFirstName,
            secondName: validateProfileLastName,
            chatName: validateProfileChatName,
            phone: validateProfilePhone,
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
