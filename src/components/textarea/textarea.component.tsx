import React, { FunctionComponent, ReactElement } from 'react';
import { handleChange, handleBlur } from 'services/form.service';
import ErrorComponent from 'components/error/error.component';
import FieldComponentProps from 'model/field-component-props';
import LabelComponent from 'components/label/label.component';

const TextareaComponent: FunctionComponent<FieldComponentProps> = ({ field, form, setForm, formErrors, setFormErrors, errors }): ReactElement => {
    return <div className={`field ${field.className ? field.className : ''}`}>
        <LabelComponent label={field.label} />
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
