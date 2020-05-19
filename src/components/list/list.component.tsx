import React, { ReactElement, FunctionComponent, FormEvent, useEffect, useState } from 'react';
import './list.component.scss';
import FieldComponentProps from 'model/field-component-props';
import { getField } from 'services/field.service';
import Field from 'model/field';
import { generateForm } from 'services/utils.service';
import ValidatedForm from 'model/validated-form';
import { validateForm } from 'services/form.service';

const ListComponent: FunctionComponent<FieldComponentProps> = (props): ReactElement => {
    const [ form, setForm ] = useState<Record<string, any>>({});
    const [ formErrors, setFormErrors ] = useState<Record<string, string>>({});

    useEffect(() => {
        const generatedForm = generateForm(props.field.fields || []);
        setForm(generatedForm[0]);
        setFormErrors(generatedForm[1]);
    }, [props.field.fields]);

    const submit = async(): Promise<void> => {
        const validatedForm: ValidatedForm = await validateForm(props.field.fields || [], form, formErrors);

        if (validatedForm.isValid) {
            const copyForm = {...props.form};
            copyForm[props.field.name] = copyForm[props.field.name].concat(form);
            props.setForm(copyForm);
            const generatedForm = generateForm(props.field.fields || []);
            setForm(generatedForm[0]);
            setFormErrors(generatedForm[1]);
        } else {
            setFormErrors(validatedForm.errors);
        }
    };

    const fieldToTableElement = (field: Field, value: any): ReactElement => {
        switch(field.type) {
            case 'checkbox':
                return <span className={value ? 'selected' : 'not-selected'}/>;
            default:
                return value;
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
                        { (props.field.fields || []).filter(f => f.showInList).map((field: Field, i: number) => <th key={i}>{ field.label }</th> ) }
                        <th/>
                    </tr>
                </thead>
                <tbody>
                { props.form[props.field.name].map((element: any, index: number) => {
                    return <tr key={index}>
                        { (props.field.fields || []).filter(f => f.showInList).map((field: Field, i: number) => <td key={i}>{ fieldToTableElement(field, element[field.name]) }</td> ) }
                        <td className="remove-td">
                            <span className="edit-span"><span className="edit"/></span>
                            <span className="remove not-selected"/>
                        </td>
                    </tr>;
                }) }
                </tbody>
            </table>
        </> }
    </div>;
}

export default ListComponent;
