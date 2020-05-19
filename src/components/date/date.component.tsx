import React, { FunctionComponent, ReactElement } from 'react';
import './date.component.scss';
import DatePicker from 'react-datepicker';
import Field from 'model/field';
import { handleChange } from 'services/form.service';
import ErrorComponent from 'components/error/error.component';

interface DateComponentProps {
    field: Field;
    form: Record<string, any>;
    setForm: Function;
    formErrors: Record<string, string>;
    setFormErrors: Function;
    errors?: Record<string, string>;
    calendarLocale?: any;
}

const DateComponent: FunctionComponent<DateComponentProps> = ({ field, form, setForm, formErrors, setFormErrors, errors, calendarLocale }): ReactElement => {
    return <div className="date-component field">
        { field.label && <label>{ field.label }</label> }
        <DatePicker 
            className={formErrors[field.name] && 'input-error'}
            selected={form[field.name]}
            onChange={date => handleChange(field, date && new Date(date), form, setForm, formErrors, setFormErrors)}
            dateFormat="dd/MM/yyyy"
            withPortal={field.mobileCalendar && window.innerWidth < 600}
            placeholderText={field.placeholder}
            minDate={field.minDate}
            maxDate={field.maxDate}
            showMonthDropdown={true}
            showYearDropdown={true}
            locale={calendarLocale}
        />
        <ErrorComponent errorCode={formErrors[field.name]} errors={errors} />
    </div>;
}

export default DateComponent;
