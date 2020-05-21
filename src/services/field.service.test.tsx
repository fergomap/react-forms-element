import React from 'react';
import { getField, fieldToTableElement } from './field.service';
import InputComponent from 'components/input/input.component';
import { mockUtilsService } from './utils.service.mock';
import * as utilsService from './utils.service';
import TextareaComponent from 'components/textarea/textarea.component';
import CheckboxComponent from 'components/checkbox/checkbox.component';
import CheckboxListComponent from 'components/checkbox-list/checkbox-list.component';
import SelectComponent from 'components/select/select.component';
import FileComponent from 'components/file/file.component';
import DateComponent from 'components/date/date.component';
import ListComponent from 'components/list/list.component';
import { mount } from 'enzyme';

describe('FieldService', () => {

    beforeEach(() => {
        mockUtilsService(utilsService);
    });

    describe('getField', () => {
        it('should return a component according to the field type', () => {
            expect(getField({ name: '', type: 'string' }, 0, {}, jest.fn(), {}, jest.fn()).type).toEqual(InputComponent);
            expect(getField({ name: '', type: 'number' }, 0, {}, jest.fn(), {}, jest.fn()).type).toEqual(InputComponent);
            expect(getField({ name: '', type: 'email' }, 0, {}, jest.fn(), {}, jest.fn()).type).toEqual(InputComponent);
            expect(getField({ name: '', type: 'wrong' }, 0, {}, jest.fn(), {}, jest.fn()).type).toEqual(InputComponent);
            expect(getField({ name: '', type: 'textarea' }, 0, {}, jest.fn(), {}, jest.fn()).type).toEqual(TextareaComponent);
            expect(getField({ name: '', type: 'checkbox' }, 0, {}, jest.fn(), {}, jest.fn()).type).toEqual(CheckboxComponent);
            expect(getField({ name: '', type: 'checkbox-list' }, 0, {}, jest.fn(), {}, jest.fn()).type).toEqual(CheckboxListComponent);
            expect(getField({ name: '', type: 'select' }, 0, {}, jest.fn(), {}, jest.fn()).type).toEqual(SelectComponent);
            expect(getField({ name: '', type: 'file' }, 0, {}, jest.fn(), {}, jest.fn()).type).toEqual(FileComponent);
            expect(getField({ name: '', type: 'date' }, 0, {}, jest.fn(), {}, jest.fn()).type).toEqual(DateComponent);
            expect(getField({ name: '', type: 'list' }, 0, {}, jest.fn(), {}, jest.fn()).type).toEqual(ListComponent);
            expect(getField({ name: '', type: 'custom' }, 0, {}, jest.fn(), {}, jest.fn()).type).toEqual('div');
        });
    });

    describe('fieldToTableElement', () => {
        it('should return a span with passed value as default', () => {
            expect(fieldToTableElement({name: '', type: 'string'}, 'MockValue')).toEqual(<span>MockValue</span>);
        });

        it('should return a span with selected or not-selected class depending of the checkbox value', () => {
            expect(fieldToTableElement({name: '', type: 'checkbox'}, true)).toEqual(<span className="selected"/>);
            expect(fieldToTableElement({name: '', type: 'checkbox'}, false)).toEqual(<span className="not-selected"/>);
        });

        it('should return a list of span with the label as text for each checkbox-list option selected', () => {
            const wrapper = mount(fieldToTableElement({name: '', options: [{label: 'Option', value: 'option'}], type: 'checkbox-list'}, ['option', 'other']));

            expect(wrapper.find('span').length).toEqual(2);
            expect(wrapper.find('span').at(0).text()).toEqual('Option');
            expect(wrapper.find('span').at(1).text()).toEqual('-');
        });

        it('should return an empty span when options is undefined', () => {
            const wrapper = mount(fieldToTableElement({name: '', type: 'checkbox-list'}, ['option']));

            expect(wrapper.find('span').text()).toEqual('-');
        });

        it('should call getFileName to as many times as files there are and return a list of span', () => {
            const wrapper = mount(fieldToTableElement({name: '', type: 'file', multipleFiles: true}, ['file1', new File([], 'file2')]));

            expect(wrapper.find('span').length).toEqual(2);
            expect(utilsService.getFileName).toHaveBeenCalledTimes(2);
        });

        it('should call getFileName one time when the file field has multipleFiles as false', () => {
            const wrapper = mount(fieldToTableElement({name: '', type: 'file', multipleFiles: false}, 'file1'));

            expect(wrapper.find('span').length).toEqual(1);
            expect(utilsService.getFileName).toHaveBeenCalledTimes(1);
        });

        it('should return a list of span with the label as text for each select option selected', () => {
            const wrapper = mount(fieldToTableElement({name: '', options: [{label: 'Option', value: 'option'}], type: 'select', multipleSelected: true}, ['option', 'other']));

            expect(wrapper.find('span').length).toEqual(2);
            expect(wrapper.find('span').at(0).text()).toEqual('Option');
            expect(wrapper.find('span').at(1).text()).toEqual('-');
        });

        it('should return a list of span with the label as text for the select option selected', () => {
            const wrapper = mount(fieldToTableElement({name: '', options: [{label: 'Option', value: 'option'}], type: 'select'}, 'option'));

            expect(wrapper.find('span').length).toEqual(1);
            expect(wrapper.find('span').at(0).text()).toEqual('Option');
        });

        it('should an empty span when options is undefined', () => {
            const wrapper = mount(fieldToTableElement({name: '', type: 'select'}, 'option'));
            
            expect(wrapper.find('span').text()).toEqual('-');
        });

        it('should not call to formatDate when it is defined but there is no value', () => {
            const formatDate = jest.fn();
            const wrapper = mount(fieldToTableElement({name: '', formatDate, type: 'date'}, undefined));

            expect(wrapper.text()).toEqual('');
            expect(formatDate).not.toHaveBeenCalled();
        });

        it('should call to formatDate when it is defined and there is value', () => {
            const formatDate = jest.fn().mockReturnValue('Date');
            const wrapper = mount(fieldToTableElement({name: '', formatDate, type: 'date'}, new Date()));

            expect(wrapper.text()).toEqual('Date');
            expect(formatDate).toHaveBeenCalled();
        });

        it('should format the date when there is value and formatDate is undefined', () => {
            const wrapper = mount(fieldToTableElement({name: '', type: 'date'}, new Date('1/1/2020')));

            expect(wrapper.text()).toEqual('1/1/2020');
        });
    });
});
