import Block, { BaseProps } from '@core/Block.ts';
import './profileMainInfo.scss';
import { Button } from '@components/button';
import { Input } from '@components/input';
import tpl from './profileMainInfo.hbs?raw';

export interface ProfileMainInfoProps extends BaseProps {
    isButton?: boolean;
    key?: string;
    value?: string;
    isEdit?: boolean;
    isLast?: boolean;
    isHideValue?: boolean,
    mainInfoButton?: Button
    editableValue?: Input
}

export class ProfileMainInfo extends Block<ProfileMainInfoProps> {
  constructor(props: ProfileMainInfoProps) {
    console.log('props ProfileMainInfo >>>>', props);
    super({
      ...props,
      value: props.isHideValue ? props.value?.replace(/./g, '•') : props.value,
      mainInfoButton: new Button({
        label: props.key,
        type: props.type ? props.type : 'profile-link',
      }),
      editableValue: new Input({
        editable: true,
      }),
    });
  }

  render() {
    console.log('ProfileMainInfo');
    return this.compile(tpl as string, this._props);
  }
}
