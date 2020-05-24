import React from 'react';
import { mockFormService } from 'services/form.service.mock';
import * as formService from 'services/form.service';
import { mount } from 'enzyme';
import CheckboxComponent from './checkbox.component';
import OptionImp from 'model/option.imp';
import { Field } from 'index';
import ErrorComponent from 'components/error/error.component';

describe('CheckboxComponent', () => {

    beforeEach(() => {
        mockFormService(formService);
    });

    it('should render an ErrorComponent when the type is checkbox and call to handleCheckboxChange when the label is clicked', () => {
        const field: Field = { name: 'business', type: 'checkbox', className: 'custom-class' };
        const form = { business: true }, formErrors = { business: '' };
        const setForm = jest.fn(), setFormErrors = jest.fn();
        const wrapper = mount(<CheckboxComponent option={new OptionImp()} field={field} form={form} setForm={setForm} formErrors={formErrors} setFormErrors={setFormErrors} />);

        wrapper.find('div.span-label').simulate('click');
        wrapper.find('span.checkmark').simulate('click');

        expect(wrapper.find('.custom-class').length).toEqual(1);
        expect(wrapper.find('input').prop('checked')).toEqual(true);
        expect(wrapper.find(ErrorComponent).length).toEqual(1);
        expect(formService.handleCheckboxChange).toHaveBeenCalled();
    });

    it('should not render an ErrorComponent when the type is checkbox-list and set checked as false when it is not selected', () => {
        const field: Field = { name: 'colors', type: 'checkbox-list' };
        const form = { colors: [ 'red' ] }, formErrors = { colors: '' };
        const setForm = jest.fn(), setFormErrors = jest.fn();
        const wrapper = mount(<CheckboxComponent option={new OptionImp('Green', 'green')} field={field} form={form} setForm={setForm} formErrors={formErrors} setFormErrors={setFormErrors} />);

        expect(wrapper.find('input').prop('checked')).toEqual(false);
        expect(wrapper.find(ErrorComponent).length).toEqual(0);
    });
});
