import React, { FunctionComponent, ReactElement, FormEvent, useState, useEffect } from 'react';
import './form.component.scss';
import Field from 'model/field';
import { validateForm } from 'services/form.service';
import ValidatedForm from 'model/validated-form';
import { getField } from 'services/field.service';
import { generateForm } from 'services/utils.service';

interface FormComponentProps {
    fields: Field[];
    onSubmit: Function;
    className?: string;
    errors?: Record<string, string>;
    calendarLocale?: any;
    submitButtonText?: string;
}

const FormComponent: FunctionComponent<FormComponentProps> = (props): ReactElement => {
    const [ form, setForm ] = useState<Record<string, any>>({});
    const [ formErrors, setFormErrors ] = useState<Record<string, string>>({});

    useEffect(() => {
        const generatedForm = generateForm(props.fields);
        setForm(generatedForm[0]);
        setFormErrors(generatedForm[1]);
    }, [props.fields]);

    const onSubmit = async(e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const validatedForm: ValidatedForm = await validateForm(props.fields, form, formErrors);

        if (validatedForm.isValid) {
            console.log(validatedForm.values);
        } else {
            setFormErrors(validatedForm.errors);
        }
    };

    return <form className={`form-component ${props.className ? props.className : ''}`} noValidate={true} onSubmit={onSubmit}>
        { Object.keys(form).length && props.fields.map((field: Field, index: number) => getField(field, index, form, setForm, formErrors, setFormErrors, props.errors, props.calendarLocale)) }
        <div className="submit-container">
            <button type="submit">{ props.submitButtonText || 'SEND' }</button>
        </div>
    </form>;
};

export default FormComponent;
