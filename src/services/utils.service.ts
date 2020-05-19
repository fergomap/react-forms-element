import { defaultErrors } from 'translations/errors';
import Field from 'model/field';

const WRONG_MIN: string = 'wrong_min';
const WRONG_MAX: string = 'wrong_max';

export const getFileName = (file: File | string): string => {
    if (typeof file === 'string') {
        return (file.split('/').pop() || '').split('?')[0];
    } else {
        return file.name;
    }
};

export const getErrorMessage = (errorCode: string): string => {
    if (defaultErrors[errorCode]) {
        return defaultErrors[errorCode];
    } else {
        if (errorCode.includes(WRONG_MIN)) {
            return `${defaultErrors[WRONG_MIN]} ${errorCode.split('_').pop()}`;
        }

        if (errorCode.includes(WRONG_MAX)) {
            return `${defaultErrors[WRONG_MAX]} ${errorCode.split('_').pop()}`;
        }

        return errorCode;
    }
};

export const generateForm = (fields: Field[]): [Record<string, any>, Record<string, string>] => {
    const newForm: Record<string, any> = {};
    const newFormErrors: Record<string, string> = {};

    fields.forEach((field: Field) => {
        if (field.type !== 'custom') {
            if (field.type === 'checkbox-list' || field.type === 'list' || field.type === 'file' || (field.type === 'select' && field.multipleSelected)) {
                newForm[field.name] = field.value ? (Array.isArray(field.value) ? field.value : [field.value]) : [];
            } else if (field.type === 'checkbox') {
                newForm[field.name] = !!field.value;
            } else {
                newForm[field.name] = field.value;
            }

            newFormErrors[field.name] = '';
        }
    });

    return [newForm, newFormErrors];
};
