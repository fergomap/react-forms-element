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

export const getField = (field: Field, index: number, form: Record<string, any>, setForm: Function, formErrors: Record<string, string>, setFormErrors: Function, errors?: Record<string, string>, calendarLocale?: any): ReactElement | void => {
    switch(field.type) {
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
