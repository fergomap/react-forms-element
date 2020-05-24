import React, { ReactElement, FunctionComponent, FormEvent, useEffect, useState } from 'react';
import './list.component.scss';
import FieldComponentProps from 'model/field-component-props';
import { getField, fieldToTableElement } from 'services/field.service';
import Field from 'model/field';
import { generateForm, getFileName } from 'services/utils.service';
import ValidatedForm from 'model/validated-form';
import { validateForm } from 'services/form.service';
import ErrorComponent from 'components/error/error.component';

const ListComponent: FunctionComponent<FieldComponentProps> = (props): ReactElement => {
    const [ form, setForm ] = useState<Record<string, any>>({});
    const [ formErrors, setFormErrors ] = useState<Record<string, string>>({});

    useEffect(() => {
        const generatedForm = generateForm(props.field.fields || []);
        setForm(generatedForm[0]);
        setFormErrors(generatedForm[1]);
    }, [props.field.fields]);

    const editElement = (index: number): void => {
        const fieldsCopy: Field[] = [];

        (props.field.fields || []).forEach(field => {
            const fieldCopy = {...field};
            fieldCopy.value = props.form[props.field.name][index][field.name];
            fieldsCopy.push(fieldCopy);
        });

        const generatedForm = generateForm(fieldsCopy);
        setForm(generatedForm[0]);
        setFormErrors(generatedForm[1]);
        removeElement(index);
    };

    const removeElement = (index: number): void => {
        const copyForm = {...props.form};
        copyForm[props.field.name].splice(index, 1);
        props.setForm(copyForm);
    };

    const submit = async(): Promise<void> => {
        const validatedForm: ValidatedForm = await validateForm(props.field.fields || [], form, formErrors);

        if (validatedForm.isValid) {
            let errors: Record<string, string> = {};

            if (props.field.onSubmit) {
                errors = await props.field.onSubmit(validatedForm.values);
            }

           if (errors && Object.keys(errors).length) {
                const formErrorsCopy = {...formErrors};

                Object.keys(errors).forEach(key => {
                    formErrorsCopy[key] = errors[key];
                });

                setFormErrors(formErrorsCopy);
            } else {
                const copyForm = {...props.form};
                const copyFormErrors = {...props.formErrors};
                copyForm[props.field.name] = copyForm[props.field.name].concat(form);
                copyFormErrors[props.field.name] = '';
                props.setForm(copyForm);
                props.setFormErrors(copyFormErrors);
                props.field.onChange && props.field.onChange(form);
                const generatedForm = generateForm(props.field.fields || []);
                setForm(generatedForm[0]);
                setFormErrors(generatedForm[1]);
            }
        } else {
            setFormErrors(validatedForm.errors);
        }
    };

    return <div className={`list-component ${props.field.className ? props.field.className : ''}`}>
        <p className="title">{ props.field.title }</p>
        { Object.keys(form).length && (props.field.fields || []).map((f: Field, index: number) => getField(f, index, form, setForm, formErrors, setFormErrors, props.errors)) }
        <div className="submit-container">
            <button type="button" onClick={submit}>{ props.field.addButton || 'ADD' }</button>
        </div>
        { !!props.form[props.field.name].length && <>
            <table>
                <thead>
                    <tr>
                        {(props.field.fields || []).filter(f => f.showInList).map((field: Field, i: number) => <th key={i}>{ field.listLabel || field.label }</th>)}
                        <th/>
                    </tr>
                </thead>
                <tbody>
                { props.form[props.field.name].map((element: any, index: number) => {
                    return <tr key={index}>
                        {(props.field.fields || []).filter(f => f.showInList).map((field: Field, i: number) => <td key={i} data-label={field.listLabel || field.label} className="data-td">{ fieldToTableElement(field, element[field.name]) }</td>)}
                        <td className="remove-td">
                            <span className="edit-span" onClick={() => editElement(index)}><span className="edit"/></span>
                            <span className="remove not-selected" onClick={() => removeElement(index)}/>
                        </td>
                    </tr>;
                }) }
                </tbody>
            </table>
        </> }
        <ErrorComponent errorCode={props.formErrors[props.field.name]} errors={props.errors} />
        <ErrorComponent errorCode={formErrors.generalError} errors={props.errors} />
    </div>;
}

export default ListComponent;
