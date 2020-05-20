import Field from 'model/field';
import ValidatedForm from 'model/validated-form';
import ValidatedFormImp from 'model/validated-form.imp';
import { VALIDATORS_CONSTANTS } from 'model/validators.config';
import Option from 'model/option';

export const validateForm = async(fields: Field[], form: Record<string, any>, formErrors: Record<string, string>): Promise<ValidatedForm> => {
    const newFormErrors = {...formErrors};
    
    for (let field of fields) {
        const error = await getFieldError(field, form);

        if (!error && field.type === 'file' && !field.multipleFiles) {
            form[field.name] = form[field.name][0];
        }

        newFormErrors[field.name] = error;
    };
    
    return new ValidatedFormImp(form, newFormErrors, !Object.values(newFormErrors).find(e => e !== ''));
};

export const getFieldError = (field: Field, form: Record<string, any>): Promise<string> | string => {
    switch(field.type) {
        case 'string':
        case 'checkbox':
        case 'date':
        case 'textarea':
            return validateValue(field, form[field.name]);
        case 'email':
            return validateEmail(field, form[field.name]);
        case 'number':
            return validateNumber(field, form[field.name]);
        case 'list':
            return validateList(field, form[field.name], 'required_field');
        case 'checkbox-list':
            return validateList(field, form[field.name]);
        case 'file':
            return validateList(field, form[field.name], 'select_file');
        default:
            return validateValue(field, form[field.name]);
    }
};

const validateValue = async(field: Field, value: any): Promise<string> => {
    if (field.customValidator) {
        return await field.customValidator(value);
    } else {
        return field.required ? (value ? '' : 'required_field') : '';
    }
};

const validateEmail = async(field: Field, value: any): Promise<string> => {
    const error = await validateValue(field, value);

    if (error) {
        return error;
    } else {
        return value ? (VALIDATORS_CONSTANTS.EMAIL.test(value) ? '' : 'wrong_email') : '';
    }
};

const validateNumber = async(field: Field, value: any): Promise<string> => {
    const error = await validateValue(field, value);

    if (error) {
        return error;
    } else {
        if (isNaN(value)) {
            return 'wrong_number';
        }

        const n = Number(value);

        if (field.min && n < field.min) {
            return 'wrong_min_' + field.min;
        }

        if (field.max && n > field.max) {
            return 'wrong_max_' + field.max;
        }

        return '';
    }
};

const validateList = async(field: Field, value: any, errorMessage: string = 'no_selected'): Promise<string> => {
    return await validateValue(field, value) || (field.required ? (value.length > 0 ? '' : errorMessage) : '');
};

export const handleChange = (field: Field, value: any, form: Record<string, any>, setForm: Function, formErrors: Record<string, string>, setFormErrors: Function): void => {
    const newForm = {...form};
    const newFormErrors = {...formErrors};
    newForm[field.name] = value;
    newFormErrors[field.name] = '';
    newFormErrors.generalError = '';
    setForm(newForm);
    setFormErrors(newFormErrors);
    field.onChange && field.onChange(value);
};

export const handleCheckboxChange = async (field: Field, option: Option, value: any, form: Record<string, any>, setForm: Function, formErrors: Record<string, string>, setFormErrors: Function): Promise<void> => {
    const newForm = {...form};
    const newFormErrors = {...formErrors};

    if (field.type === 'checkbox') {
        newForm[field.name] = value;
    } else {
        if (!field.multipleSelected) {
            newForm[field.name] = newForm[field.name][0] === option.value ? [] : [option.value];
        } else {
            const index = newForm[field.name].indexOf(option.value);

            if (index < 0) {
                newForm[field.name].push(option.value);
            } else {
                newForm[field.name].splice(index, 1);
            }
        }
    }
    
    newFormErrors[field.name] = await getFieldError(field, newForm);
    setForm(newForm);
    setFormErrors(newFormErrors);
    field.onChange && field.onChange(newForm[field.name]);
};

export const handleBlur = async(field: Field, form: Record<string, any>, formErrors: Record<string, string>, setFormErrors: Function): Promise<void> => {
    const newFormErrors = {...formErrors};
    newFormErrors[field.name] = await getFieldError(field, form);
    setFormErrors(newFormErrors);
    field.onBlur && field.onBlur(form[field.name]);
};
