import React, { FunctionComponent, ReactElement, FormEvent, useState, useEffect } from 'react';
import './form.component.scss';
import Field from 'model/field';
import { validateForm } from 'services/form.service';
import ValidatedForm from 'model/validated-form';
import { getField } from 'services/field.service';
import { generateForm } from 'services/utils.service';
import ErrorComponent from 'components/error/error.component';

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

    const onSubmit = async(): Promise<void> => {
        const validatedForm: ValidatedForm = await validateForm(props.fields, form, formErrors);

        if (validatedForm.isValid) {
            const errors = await props.onSubmit(validatedForm.values);

            if (errors) {
                const formErrorsCopy = {...formErrors};

                Object.keys(errors).forEach(key => {
                    formErrorsCopy[key] = errors[key];
                });

                setFormErrors(formErrorsCopy);
            }
        } else {
            setFormErrors(validatedForm.errors);
        }
    };

    return <div className={`form-component ${props.className ? props.className : ''}`}>
        { Object.keys(form).length && props.fields.map((field: Field, index: number) => getField(field, index, form, setForm, formErrors, setFormErrors, props.errors, props.calendarLocale)) }
        <div className="general-error-container">
            <ErrorComponent errorCode={formErrors.generalError} errors={props.errors} />
        </div>
        <div className="submit-container">
            <button onClick={onSubmit}>{ props.submitButtonText || 'SEND' }</button>
        </div>
    </div>;
};

export default FormComponent;
