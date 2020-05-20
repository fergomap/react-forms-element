import React, { ReactElement } from 'react';
import Field from 'model/field';
import InputComponent from 'components/input/input.component';
import CheckboxComponent from 'components/checkbox/checkbox.component';
import CheckboxListComponent from 'components/checkbox-list/checkbox-list.component';
import OptionImp from 'model/option.imp';
import SelectComponent from 'components/select/select.component';
import FileComponent from 'components/file/file.component';
import DateComponent from 'components/date/date.component';
import TextareaComponent from 'components/textarea/textarea.component';
import ListComponent from 'components/list/list.component';
import { getFileName } from './utils.service';

export const getField = (field: Field, index: number, form: Record<string, any>, setForm: Function, formErrors: Record<string, string>, setFormErrors: Function, errors?: Record<string, string>, calendarLocale?: any): ReactElement | void => {
    switch (field.type) {
        case 'string':
        case 'email':
        case 'number':
            return <InputComponent key={index} field={field} form={form} setForm={setForm} formErrors={formErrors} setFormErrors={setFormErrors} errors={errors} />;
        case 'textarea':
            return <TextareaComponent key={index} field={field} form={form} setForm={setForm} formErrors={formErrors} setFormErrors={setFormErrors} errors={errors} />;
        case 'checkbox':
            return <CheckboxComponent key={index} option={new OptionImp(field.label)} field={field} form={form} setForm={setForm} formErrors={formErrors} setFormErrors={setFormErrors} errors={errors} />;
        case 'checkbox-list':
            return <CheckboxListComponent key={index} field={field} form={form} setForm={setForm} formErrors={formErrors} setFormErrors={setFormErrors} errors={errors} />;
        case 'select':
            return <SelectComponent key={index} field={field} form={form} setForm={setForm} formErrors={formErrors} setFormErrors={setFormErrors} errors={errors} />;
        case 'file':
            return <FileComponent key={index} field={field} form={form} setForm={setForm} formErrors={formErrors} setFormErrors={setFormErrors} errors={errors} />;
        case 'date':
            return <DateComponent key={index} field={field} form={form} setForm={setForm} formErrors={formErrors} setFormErrors={setFormErrors} errors={errors} calendarLocale={calendarLocale} />;
        case 'list':
            return <ListComponent key={index} field={field} form={form} setForm={setForm} formErrors={formErrors} setFormErrors={setFormErrors} errors={errors} />;
        case 'custom':
            return <div key={index}>{ field.content }</div>;
        default:
            return <InputComponent key={index} field={field} form={form} setForm={setForm} formErrors={formErrors} setFormErrors={setFormErrors} errors={errors} />;
    }
};

export const fieldToTableElement = (field: Field, value: any): ReactElement => {
    switch (field.type) {
        case 'checkbox':
            return <span className={value ? 'selected' : 'not-selected'}/>;
        case 'checkbox-list':
            return <>
                { value.map((v: string, index: number) => {
                    const option = (field.options || []).find(option => option.value === v);
                    return <span key={index} className="list-file-name">{ option ? option.label : '-' }</span>;
                })}
            </>;
        case 'file':
            return <>
                { field.multipleFiles ? 
                    value.map((file: File | string, index: number) => <span key={index} className="list-file-name">{ getFileName(file) }</span>) : 
                    <span className="list-file-name">{ getFileName(value) }</span> 
                }
            </>;
        case 'select':
            return <>
                { (field.multipleSelected ? value : [value]).map((v: string, index: number) => {
                    const option = (field.options || []).find(option => option.value === v);
                    return <span key={index} className="list-file-name">{ option ? option.label : '-' }</span>;
                })}
            </>;
        case 'date':
            return <span>{ value && (field.formatDate ? field.formatDate(value) : `${value.getMonth() + 1}/${value.getDate()}/${value.getFullYear()}`) }</span>;
        default:
            return <span>{ value }</span>;
    }
};
