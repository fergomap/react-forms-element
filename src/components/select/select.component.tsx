import React, { FunctionComponent, ReactElement } from 'react';
import './select.component.scss';
import Field from 'model/field';
import Select from 'react-select';
import { handleChange } from 'services/form.service';
import ErrorComponent from 'components/error/error.component';

interface SelectComponentProps {
    field: Field;
    form: Record<string, any>;
    setForm: Function;
    formErrors: Record<string, string>;
    setFormErrors: Function;
    errors?: Record<string, string>;
}

const SelectComponent: FunctionComponent<SelectComponentProps> = ({ field, form, setForm, formErrors, setFormErrors, errors }): ReactElement => {
    return <div className={`select-component ${field.className ? field.className : ''}`}>
        { field.label && <label>{ field.label }</label> }
        <Select
            placeholder={field.placeholder}
            value={field.options?.find(o => o.value === form[field.name])} 
            isSearchable={false}
            onChange={(option: any) => handleChange(field, option, form, setForm, formErrors, setFormErrors)}
            options={field.options} 
            classNamePrefix="select" 
            isMulti={field.multipleSelected}
            className={formErrors[field.name] && 'input-error'}
        />
        <ErrorComponent errorCode={formErrors[field.name]} errors={errors} />
    </div>;
}

export default SelectComponent;
