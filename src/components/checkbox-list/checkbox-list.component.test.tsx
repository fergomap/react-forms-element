import React from 'react';
import { mount } from 'enzyme';
import CheckboxListComponent from './checkbox-list.component';
import CheckboxComponent from 'components/checkbox/checkbox.component';
import OptionImp from 'model/option.imp';

describe('CheckboxList', () => {
    it('should render 0 CheckboxComponent when options is undefined', () => {
        const wrapper = mount(<CheckboxListComponent field={{ name: 'colors' }} form={{}} setForm={jest.fn()} formErrors={{}} setFormErrors={jest.fn()} />);

        expect(wrapper.find(CheckboxComponent).length).toEqual(0);
    });


    it('should render as many CheckboxComponent as options there are', () => {
        const wrapper = mount(<CheckboxListComponent field={{ name: 'colors', className: 'custom-class', options: [new OptionImp()] }} form={{ colors: [] }} setForm={jest.fn()} formErrors={{}} setFormErrors={jest.fn()} />);

        expect(wrapper.find(CheckboxComponent).length).toEqual(1);
        expect(wrapper.find('.custom-class').length).toEqual(1);
    });
});
