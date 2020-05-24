/* istanbul ignore file */
import { ReactElement } from 'react';
import Option from './option';

export default interface Field {
    name: string;
    value?: any;
    className?: string;
    placeholder?: string;
    title?: string;
    addButton?: string;
    label?: string | ReactElement;
    required?: boolean;
    type?: 'string' | 'textarea' | 'number' | 'select' | 'date' | 'checkbox' | 'file' | 'email' | 'checkbox-list' | 'list' | 'custom';
    fileType?: string;
    multipleFiles?: boolean;
    multipleSelected?: boolean;
    inputType?: string;
    customValidator?: Function;
    content?: ReactElement;
    options?: Option[];
    min?: number;
    max?: number;
    step?: number;
    mobileCalendar?: boolean;
    minDate?: Date;
    maxDate?: Date;
    onChange?: Function;
    onBlur?: Function;
    fields?: Field[];
    showInList?: boolean;
    listLabel?: string;
    formatDate?: Function;
    dateFormat?: string;
    onSubmit?: Function;
}
