import React, { FunctionComponent, ReactElement } from 'react';
import Field from 'model/field';
import CheckboxComponent from 'components/checkbox/checkbox.component';
import Option from 'model/option';
import ErrorComponent from 'components/error/error.component';

interface CheckboxListComponentProps {
    field: Field;
    form: Record<string, any>;
    setForm: Function;
    formErrors: Record<string, string>;
    setFormErrors: Function;
    errors?: Record<string, string>;
}

const CheckboxListComponent: FunctionComponent<CheckboxListComponentProps> = ({ field, form, setForm, formErrors, setFormErrors, errors }): ReactElement => {
    return <div className={field.className ? field.className : ''}>
        { field.label && <label>{ field.label }</label> }
        { (field.options || []).map((option: Option, index: number) => <CheckboxComponent key={index} option={option} field={field} form={form} setForm={setForm} formErrors={formErrors} setFormErrors={setFormErrors} />) }
        <ErrorComponent errorCode={formErrors[field.name]} errors={errors} />
    </div>;
};

export default CheckboxListComponent;
