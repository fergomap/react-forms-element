import React, { FunctionComponent, ReactElement } from 'react';
import './select.component.scss';
import Select from 'react-select';
import { handleChange } from 'services/form.service';
import ErrorComponent from 'components/error/error.component';
import FieldComponentProps from 'model/field-component-props';
import LabelComponent from 'components/label/label.component';

const SelectComponent: FunctionComponent<FieldComponentProps> = ({ field, form, setForm, formErrors, setFormErrors, errors }): ReactElement => {
    return <div className={`select-component ${field.className ? field.className : ''}`}>
        <LabelComponent label={field.label} />
        <Select
            placeholder={field.placeholder}
            value={(field.options || []).filter(o => field.multipleSelected ? form[field.name].includes(o.value) : o.value === form[field.name])} 
            isSearchable={false}
            onChange={(option: any) => handleChange(field, field.multipleSelected ? option.map((o: any) => o.value) : option.value, form, setForm, formErrors, setFormErrors)}
            options={field.options} 
            classNamePrefix="select" 
            isMulti={field.multipleSelected}
            className={formErrors[field.name] && 'input-error'}
        />
        <ErrorComponent errorCode={formErrors[field.name]} errors={errors} />
    </div>;
}

export default SelectComponent;
