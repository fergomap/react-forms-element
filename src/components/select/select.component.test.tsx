import React from 'react';
import { mockFormService } from 'services/form.service.mock';
import * as formService from 'services/form.service';
import SelectComponent from './select.component';
import { mount } from 'enzyme';
import Select from 'react-select';
import OptionImp from 'model/option.imp';

describe('SelectComponent', () => {

    beforeEach(() => {
        mockFormService(formService);
    });

    it('should render the passed className, set [] as value when options are not defined, call to handleChange with the option value when onChange event is fired and !multipleSelected and render input-error class when there are errors', () => {
        const wrapper = mount(<SelectComponent field={{ name: 'colors', className: 'select-class' }} form={{}} setForm={jest.fn()} formErrors={{colors: 'error'}} setFormErrors={jest.fn()}/>);
        (wrapper.find(Select) as any).props().onChange(new OptionImp('label', 'value'));

        expect(wrapper.find('.select-class').length).toEqual(1);
        expect(wrapper.find('.input-error').length).toBeGreaterThan(0);
        expect(wrapper.find(Select).props().value).toEqual([]);
        expect(formService.handleChange).toHaveBeenCalledWith(
            expect.anything(),
            'value',
            expect.anything(),
            expect.anything(),
            expect.anything(),
            expect.anything()
        );
    });

    it('should set an array with the selected value as value when options are defined and !multipleSelected', () => {
        const wrapper = mount(<SelectComponent field={{ name: 'colors', options: [new OptionImp('label', 'value')] }} form={{colors: 'value'}} setForm={jest.fn()} formErrors={{}} setFormErrors={jest.fn()}/>);

        expect(wrapper.find(Select).props().value).toEqual([new OptionImp('label', 'value')]);
    });

    it('should set an array with the selected values as value when options are defined and multipleSelected and call to handleChange with an array of values when on change is fired', () => {
        const wrapper = mount(<SelectComponent field={{ name: 'colors', options: [new OptionImp('label', 'value'), new OptionImp('label2', 'value2')], multipleSelected: true }} form={{colors: ['value']}} setForm={jest.fn()} formErrors={{}} setFormErrors={jest.fn()}/>);
        (wrapper.find(Select) as any).props().onChange([new OptionImp('label', 'value')]);

        expect(wrapper.find(Select).props().value).toEqual([new OptionImp('label', 'value')]);
        expect(formService.handleChange).toHaveBeenCalledWith(
            expect.anything(),
            ['value'],
            expect.anything(),
            expect.anything(),
            expect.anything(),
            expect.anything()
        );
    });
});
