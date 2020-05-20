import React, { FunctionComponent, ReactElement } from 'react';
import CheckboxComponent from 'components/checkbox/checkbox.component';
import Option from 'model/option';
import ErrorComponent from 'components/error/error.component';
import FieldComponentProps from 'model/field-component-props';

const CheckboxListComponent: FunctionComponent<FieldComponentProps> = ({ field, form, setForm, formErrors, setFormErrors, errors }): ReactElement => {
    return <div className={field.className ? field.className : ''}>
        { field.label && <label>{ field.label }</label> }
        { (field.options || []).map((option: Option, index: number) => <CheckboxComponent key={index} option={option} field={field} form={form} setForm={setForm} formErrors={formErrors} setFormErrors={setFormErrors} />) }
        <ErrorComponent errorCode={formErrors[field.name]} errors={errors} />
    </div>;
};

export default CheckboxListComponent;
