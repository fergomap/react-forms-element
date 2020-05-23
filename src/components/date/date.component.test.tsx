import React from 'react';
import { mockFormService } from 'services/form.service.mock';
import * as formService from 'services/form.service';
import { mount } from 'enzyme';
import DateComponent from './date.component';
import DatePicker from 'react-datepicker';

describe('DateComponent', () => {

    beforeEach(() => {
        mockFormService(formService);
    });

    it('should render the DatePicker with the default date format, the withPortal as false when they are not defined and call to handleChange when the onChange event is fired', () => {
        const wrapper = mount(<DateComponent field={{ name: 'date', className: 'class-name' }} form={{}} setForm={jest.fn()} formErrors={{}} setFormErrors={jest.fn()}/>);

        (wrapper.find(DatePicker) as any).props().onChange('01/01/2020');

        expect(wrapper.find(DatePicker).props().dateFormat).toEqual('dd/MM/yyyy');
        expect(wrapper.find(DatePicker).props().withPortal).toEqual(false);
        expect(formService.handleChange).toHaveBeenCalled();
    });

    it('should render an input-error class when there is error, set the passed dateFormat and withPortal to true when it is set as true and the document width is mobile', () => {
        window.innerWidth = 100;
        const wrapper = mount(<DateComponent field={{ name: 'date', dateFormat: 'format', mobileCalendar: true }} form={{}} setForm={jest.fn()} formErrors={{ date: 'error' }} setFormErrors={jest.fn()}/>);

        expect(wrapper.find('.input-error').length).toBeGreaterThan(0);
        expect(wrapper.find(DatePicker).props().dateFormat).toEqual('format');
        expect(wrapper.find(DatePicker).props().withPortal).toEqual(true);
    });
});
