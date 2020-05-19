import React, { FunctionComponent, ReactElement } from 'react';
import './checkbox.component.scss';
import Field from 'model/field';
import { handleCheckboxChange } from 'services/form.service';
import Option from 'model/option';
import ErrorComponent from 'components/error/error.component';

interface CheckboxComponentProps {
    field: Field;
    form: Record<string, any>;
    setForm: Function;
    formErrors: Record<string, string>;
    setFormErrors: Function;
    option: Option;
    onChange?: Function;
    errors?: Record<string, string>;
}

const CheckboxComponent: FunctionComponent<CheckboxComponentProps> = ({ field, form, setForm, formErrors, setFormErrors, option, onChange, errors }): ReactElement => {

    const isChecked = (): boolean => {
        return field.type === 'checkbox' ? !!form[field.name] : form[field.name].includes(option.value);
    };

    return <div className={`checkbox-component ${field.className ? field.className : ''}`}>
        <label>
            { option.label && <span className="span-label">{ option.label }</span> }
            <input type="checkbox" 
                checked={isChecked()} 
                name={field.name} 
                onChange={e => handleCheckboxChange(field, option, e.target.checked, form, setForm, formErrors, setFormErrors)}
            />
            <span className="checkmark"></span>
        </label>
        { field.type === 'checkbox' && <ErrorComponent errorCode={formErrors[field.name]} errors={errors} /> }
    </div>;
}

export default CheckboxComponent;
