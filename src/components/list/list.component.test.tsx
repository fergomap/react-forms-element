import React from 'react';
import { mockFormService } from 'services/form.service.mock';
import * as formService from 'services/form.service';
import { mockFieldService } from 'services/field.service.mock';
import * as fieldService from 'services/field.service';
import { mockUtilsService } from 'services/utils.service.mock';
import * as utilsService from 'services/utils.service';
import { mount } from 'enzyme';
import ListComponent from './list.component';
import { act } from 'react-dom/test-utils';
import ValidatedFormImp from 'model/validated-form.imp';

describe('ListComponent', () => {

    beforeEach(() => {
        mockFormService(formService);
        mockFieldService(fieldService);
        mockUtilsService(utilsService);
    });

    it('should call to generateForm with an empty array when field are undefined, render a className when it is defined, should not call to getField and should not render the table when there are no values', () => {
        const wrapper = mount(<ListComponent field={{ name: 'list', className: 'list-class' }} form={{ list: [] }} setForm={jest.fn()} formErrors={{}} setFormErrors={jest.fn()}/>);

        expect(wrapper.find('.list-class').length).toEqual(1);
        expect(wrapper.find('table').length).toEqual(0);
        expect(utilsService.generateForm).toHaveBeenCalledWith([]);
        expect(fieldService.getField).not.toHaveBeenCalled();
    });

    it('should not call to getField when the form is defined but the fields are not', () => {
        (utilsService.generateForm as jest.Mock).mockReturnValue([{ field: 'field' }, {}]);
        mount(<ListComponent field={{ name: 'list' }} form={{ list: [] }} setForm={jest.fn()} formErrors={{}} setFormErrors={jest.fn()}/>);

        expect(fieldService.getField).not.toHaveBeenCalled();
    });

    it('should call to getField as many times as fields there are and to fieldToTableElement for all the fields that have showInList as true', () => {
        const field = { name: 'list', fields: [ { name: 'name', showInList: true }, { name: 'surname' } ] };
        const form = { list: [{name: 'Name', surname: 'Surname'}] };

        (utilsService.generateForm as jest.Mock).mockReturnValue([{ field: 'field' }, {}]);
        mount(<ListComponent field={field} form={form} setForm={jest.fn()} formErrors={{}} setFormErrors={jest.fn()}/>);

        expect(fieldService.getField).toHaveBeenCalledTimes(2);
        expect(fieldService.fieldToTableElement).toHaveBeenCalled();
    });

    it('should not call to fieldToTableElement when the form is defined but the fields are not', () => {
        const field = { name: 'list' };
        const form = { list: [{name: 'Name', surname: 'Surname'}] };

        (utilsService.generateForm as jest.Mock).mockReturnValue([{ field: 'field' }, {}]);
        mount(<ListComponent field={field} form={form} setForm={jest.fn()} formErrors={{}} setFormErrors={jest.fn()}/>);

        expect(fieldService.fieldToTableElement).not.toHaveBeenCalled();
    });

    describe('editElement', () => {
        it('should remove the element from the props form and set it in the ListComponent form', () => {
            const field = { name: 'list', fields: [ { name: 'name', showInList: true }, { name: 'surname' } ] };
            const form = { list: [{name: 'Name', surname: 'Surname'}] };
            const setForm = jest.fn();
    
            (utilsService.generateForm as jest.Mock).mockReturnValue([{ field: 'field' }, {}]);
            const wrapper = mount(<ListComponent field={field} form={form} setForm={setForm} formErrors={{}} setFormErrors={jest.fn()}/>);

            wrapper.find('.edit-span').simulate('click');

            expect(setForm).toHaveBeenCalledWith({list: []});
            expect(fieldService.getField).toHaveBeenCalled();
        });


        it('should call to generateForm with an empty object when fields are not defined', () => {
            const field = { name: 'list' };
            const form = { list: [{name: 'Name', surname: 'Surname'}] };
            const setForm = jest.fn();
    
            (utilsService.generateForm as jest.Mock).mockReturnValue([{ field: 'field' }, {}]);
            const wrapper = mount(<ListComponent field={field} form={form} setForm={setForm} formErrors={{}} setFormErrors={jest.fn()}/>);

            wrapper.find('.edit-span').simulate('click');

            expect(utilsService.generateForm).toHaveBeenCalledWith([]);
        });
    });

    describe('removeElement', () => {
        it('should call to setForm with the element clicked removed', () => {
            const field = { name: 'list', fields: [ { name: 'name', showInList: true }, { name: 'surname' } ] };
            const form = { list: [{name: 'Name', surname: 'Surname'}] };
            const setForm = jest.fn();
    
            (utilsService.generateForm as jest.Mock).mockReturnValue([{ field: 'field' }, {}]);
            const wrapper = mount(<ListComponent field={field} form={form} setForm={setForm} formErrors={{}} setFormErrors={jest.fn()}/>);

            wrapper.find('.remove').simulate('click');

            expect(setForm).toHaveBeenCalledWith({list: []});
        });
    });

    describe('submit', () => {
        it('should call to validateForm and not to props.setForm when the form is not valid', async() => {
            const setForm = jest.fn();
            const wrapper = mount(<ListComponent field={{ name: 'list' }} form={{list: []}} setForm={setForm} formErrors={{}} setFormErrors={jest.fn()}/>);

            await act(async() => {
                wrapper.find('.submit-container button').simulate('click');
            });

            expect(formService.validateForm).toHaveBeenCalled();
            expect(setForm).not.toHaveBeenCalled();
        });

        it('should call to validateForm, to onSubmit when it is defined and not to props.setForm when the form is valid but onSubmit returns errors', async() => {
            const setForm = jest.fn();
            const field = { name: 'list', onSubmit: jest.fn().mockReturnValue({error: 'error'}) };
            const wrapper = mount(<ListComponent field={field} form={{list: []}} setForm={setForm} formErrors={{}} setFormErrors={jest.fn()}/>);

            (formService.validateForm as jest.Mock).mockReturnValue(new ValidatedFormImp({}, {}, true));

            await act(async() => {
                wrapper.find('.submit-container button').simulate('click');
            });

            expect(formService.validateForm).toHaveBeenCalled();
            expect(field.onSubmit).toHaveBeenCalled();
            expect(setForm).not.toHaveBeenCalled();
        });

        it('should call to validateForm, to props.setForm, to props.onChange and to generateForm when the form is valid', async() => {
            const setForm = jest.fn();
            const field = { name: 'list', onChange: jest.fn() };
            const wrapper = mount(<ListComponent field={field} form={{list: []}} setForm={setForm} formErrors={{}} setFormErrors={jest.fn()}/>);

            (formService.validateForm as jest.Mock).mockReturnValue(new ValidatedFormImp({}, {}, true));

            await act(async() => {
                wrapper.find('.submit-container button').simulate('click');
            });

            expect(formService.validateForm).toHaveBeenCalled();
            expect(setForm).toHaveBeenCalled();
            expect(field.onChange).toHaveBeenCalled();
            expect(utilsService.generateForm).toHaveBeenCalled();
        });
    });
});
