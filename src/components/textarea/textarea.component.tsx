import React, { FunctionComponent, ReactElement } from 'react';
import Field from 'model/field';
import { handleChange, handleBlur } from 'services/form.service';
import ErrorComponent from 'components/error/error.component';

interface TextareaComponentProps {
    field: Field;
    form: Record<string, any>;
    setForm: Function;
    formErrors: Record<string, string>;
    setFormErrors: Function;
    errors?: Record<string, string>;
}

const TextareaComponent: FunctionComponent<TextareaComponentProps> = ({ field, form, setForm, formErrors, setFormErrors, errors }): ReactElement => {
    return <div className={`field ${field.className ? field.className : ''}`}>
        { field.label && <label>{ field.label }</label> }
        <textarea 
            value={form[field.name]} 
            name={field.name}
            onChange={e => handleChange(field, e.target.value, form, setForm, formErrors, setFormErrors)}
            onBlur={e => handleBlur(field, form, formErrors, setFormErrors)}
            className={formErrors[field.name] && 'input-error'}
            placeholder={field.placeholder}
        />
        <ErrorComponent errorCode={formErrors[field.name]} errors={errors} />
    </div>;
};

export default TextareaComponent;
