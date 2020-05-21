import React, { FunctionComponent, ReactElement } from 'react';
import { handleChange, handleBlur } from 'services/form.service';
import ErrorComponent from 'components/error/error.component';
import FieldComponentProps from 'model/field-component-props';
import LabelComponent from 'components/label/label.component';

const InputComponent: FunctionComponent<FieldComponentProps> = ({ field, form, setForm, formErrors, setFormErrors, errors }): ReactElement => {
    return <div className={`field ${field.className ? field.className : ''}`}>
        <LabelComponent label={field.label} />
        <input 
            value={form[field.name]} 
            name={field.name} 
            type={field.inputType || 'text'} 
            onChange={e => handleChange(field, e.target.value, form, setForm, formErrors, setFormErrors)}
            onBlur={e => handleBlur(field, form, formErrors, setFormErrors)} 
            min={field.min} 
            max={field.max} 
            step={field.step}
            className={formErrors[field.name] && 'input-error'}
            placeholder={field.placeholder}
        />
        <ErrorComponent errorCode={formErrors[field.name]} errors={errors} />
    </div>;
};

export default InputComponent;
