import Block, { BaseProps } from '@core/Block.ts';
import { ProfileMainInfo } from '@features/profileMainInfo';
import tpl from './infoForm.hbs?raw';

export interface InfoFormProps extends BaseProps {
    passwordInfoForm?: ProfileMainInfo;
    mail?: ProfileMainInfo;
    login?: ProfileMainInfo;
    firstName?: ProfileMainInfo;
    lastName?: ProfileMainInfo;
    chatName?: ProfileMainInfo;
    phone?: ProfileMainInfo;
    isEdit?: boolean;

}

export class InfoForm extends Block<InfoFormProps> {
  constructor(props: InfoFormProps) {
    super({
      passwordInfoForm: new ProfileMainInfo({
        // isButton: props.isButton,
        // key: props.key,
        // value: props.value,
        // isEdit: props.isEdit,
        // isLast: props.isLast,
        isButton: false,
        isHideValue: true,
        key: 'Старый пароль',
        value: 'valueLOL', // TODO: в будущем будет приходить объект с информаций по этому полю
        isEdit: props.isEdit,
      }),
      mail: new ProfileMainInfo({
        // isButton: props.isButton,
        // key: props.key,
        // value: props.value,
        // isEdit: props.isEdit,
        // isLast: props.isLast,
        key: 'Почта',
        value: 'Почта', // TODO: в будущем будет приходить объект с информаций по этому полю
        isEdit: props.isEdit,
      }),
      login: new ProfileMainInfo({
        // isButton: props.isButton,
        // key: props.key,
        // value: props.value,
        // isEdit: props.isEdit,
        // isLast: props.isLast,
        key: 'Логин',
        value: 'Логин', // TODO: в будущем будет приходить объект с информаций по этому полю
        isEdit: props.isEdit,
      }),
      firstName: new ProfileMainInfo({
        // isButton: props.isButton,
        // key: props.key,
        // value: props.value,
        // isEdit: props.isEdit,
        // isLast: props.isLast,
        key: 'Имя',
        value: 'firstName', // TODO: в будущем будет приходить объект с информаций по этому полю
        isEdit: props.isEdit,
      }),
      lastName: new ProfileMainInfo({
        // isButton: props.isButton,
        // key: props.key,
        // value: props.value,
        // isEdit: props.isEdit,
        // isLast: props.isLast,
        key: 'Фамилия',
        value: 'lastName', // TODO: в будущем будет приходить объект с информаций по этому полю
        isEdit: props.isEdit,
      }),
      chatName: new ProfileMainInfo({
        // isButton: props.isButton,
        // key: props.key,
        // value: props.value,
        // isEdit: props.isEdit,
        // isLast: props.isLast,
        key: 'Имя в чате',
        value: 'chatName', // TODO: в будущем будет приходить объект с информаций по этому полю
        isEdit: props.isEdit,
      }),
      phone: new ProfileMainInfo({
        // isButton: props.isButton,
        // key: props.key,
        // value: props.value,
        // isEdit: props.isEdit,
        // isLast: props.isLast,
        key: 'Телефон',
        value: 'phone', // TODO: в будущем будет приходить объект с информаций по этому полю
        isEdit: props.isEdit,
      }),
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
