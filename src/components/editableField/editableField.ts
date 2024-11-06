import './editableField.scss';
import Block, { BaseProps } from '@core/Block.ts';
import { Input } from '@components/input/input';
import tpl from './editableField.hbs?raw';

export interface EditableFieldProps extends BaseProps {
    editable?: boolean
    name?: string;
    type?: string
    events?: {
        blur?: (event: FocusEvent) => void;
        focus?: (event: FocusEvent) => void;
    };
}

export class EditableField extends Block<EditableFieldProps> {
  constructor(props: EditableFieldProps) {
    super({
      ...props,
      input: new Input({
        editable: true,
        type: 'text',
        name: props.name,
        events: props.events,
      }),
    });
  }

  render() {
    return this.compile(tpl as string, this._props);
  }
}
