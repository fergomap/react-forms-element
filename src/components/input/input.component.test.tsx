import React from 'react';
import InputComponent from './input.component';
import { mount } from 'enzyme';
import { mockFormService } from 'services/form.service.mock';
import * as formService from 'services/form.service';

describe('InputComponent', () => {

    beforeEach(() => {
        mockFormService(formService);
    });

    it('should render the className when passed and input-error when there are errors', () => {
        const wrapper = mount(<InputComponent field={{ name: 'name', className: 'input-class' }} form={{}} setForm={jest.fn()} formErrors={{name: 'error'}} setFormErrors={jest.fn()}/>);

        expect(wrapper.find('.input-class').length).toEqual(1);
        expect(wrapper.find('.input-error').length).toEqual(1);
    });

    it('should call to handleChange and handleBlur when these events are fired in the input component', () => {
        const wrapper = mount(<InputComponent field={{ name: 'name' }} form={{}} setForm={jest.fn()} formErrors={{}} setFormErrors={jest.fn()}/>);
        wrapper.find('input').simulate('change', { target: { value: '' } });
        wrapper.find('input').simulate('blur');
        
        expect(formService.handleChange).toHaveBeenCalled();
        expect(formService.handleBlur).toHaveBeenCalled();
    });
});
