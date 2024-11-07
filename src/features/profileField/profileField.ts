import Block, { BaseProps } from '@core/Block';
import './profileField.scss';
import { Button } from '@components/button';
import { EditableField } from 'src/features/editableField';
import tpl from './profileField.hbs?raw';

export interface ProfileFieldProps extends BaseProps {
    isButton?: boolean;
    fieldTitle?: string;
    value?: string;
    isEdit?: boolean;
    isLast?: boolean;
    isHideValue?: boolean,
    type?: string
    editableInput?: EditableField
    events?: {
        click?: (event: Event) => void,
    };
}

export class ProfileField extends Block<ProfileFieldProps> {
  constructor(props: ProfileFieldProps) {
    super({
      ...props,
      value: props.isHideValue ? props.value && props.value?.replace(/./g, '•') : props.value,
      mainInfoButton: new Button({
        label: props.fieldTitle,
        type: props.type ? props.type : 'profile-link',
        events: props.events,
      }),
      editableInput: props.editableInput,
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
