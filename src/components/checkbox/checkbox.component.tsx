import React, { FunctionComponent, ReactElement } from 'react';
import './checkbox.component.scss';
import { handleCheckboxChange } from 'services/form.service';
import Option from 'model/option';
import ErrorComponent from 'components/error/error.component';
import FieldComponentProps from 'model/field-component-props';
import LabelComponent from 'components/label/label.component';

interface CheckboxComponentProps extends FieldComponentProps {
    option: Option;
}

const CheckboxComponent: FunctionComponent<CheckboxComponentProps> = ({ field, form, setForm, formErrors, setFormErrors, option, errors }): ReactElement => {

    const isChecked = (): boolean => {
        return field.type === 'checkbox' ? !!form[field.name] : form[field.name].includes(option.value);
    };

    return <div className={`checkbox-component ${field.className ? field.className : ''}`}>
        <label>
            <LabelComponent label={option.label} className="span-label"/>
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
