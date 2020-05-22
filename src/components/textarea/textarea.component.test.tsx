import React from 'react';
import TextareaComponent from './textarea.component';
import { mount } from 'enzyme';
import { mockFormService } from 'services/form.service.mock';
import * as formService from 'services/form.service';

describe('TextareaComponent', () => {

    beforeEach(() => {
        mockFormService(formService);
    });

    it('should render the className when passed and input-error when there are errors', () => {
        const wrapper = mount(<TextareaComponent field={{ name: 'name', className: 'textarea-class' }} form={{}} setForm={jest.fn()} formErrors={{name: 'error'}} setFormErrors={jest.fn()}/>);

        expect(wrapper.find('.textarea-class').length).toEqual(1);
        expect(wrapper.find('.input-error').length).toEqual(1);
    });

    it('should call to handleChange and handleBlur when these events are fired in the Textarea component', () => {
        const wrapper = mount(<TextareaComponent field={{ name: 'name' }} form={{}} setForm={jest.fn()} formErrors={{}} setFormErrors={jest.fn()}/>);
        wrapper.find('textarea').simulate('change', { target: { value: '' } });
        wrapper.find('textarea').simulate('blur');
        
        expect(formService.handleChange).toHaveBeenCalled();
        expect(formService.handleBlur).toHaveBeenCalled();
    });
});
