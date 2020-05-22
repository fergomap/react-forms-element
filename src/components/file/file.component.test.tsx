import React from 'react';
import { mockFormService } from 'services/form.service.mock';
import * as formService from 'services/form.service';
import { mockUtilsService } from 'services/utils.service.mock';
import * as utilsService from 'services/utils.service';
import { mount } from 'enzyme';
import FileComponent from './file.component';
import Dropzone from 'react-dropzone';

describe('FileComponent', () => {

    beforeEach(() => {
        mockFormService(formService);
        mockUtilsService(utilsService);
    });

    it('should render the passed className and call to handleChange when Dropzone onDrop is fired', () => {
        const wrapper = mount(<FileComponent field={{ name: 'file', className: 'file-class' }} form={{file: []}} setForm={jest.fn()} formErrors={{}} setFormErrors={jest.fn()}/>);
        (wrapper.find(Dropzone) as any).props().onDrop([]);

        expect(formService.handleChange).toHaveBeenCalled();
        expect(wrapper.find('.file-class').length).toEqual(1);
    });

    it('should render as .file-name as files there are and call to handleChange when an element is removed, call to getFileName for each file and createObjectURL when the file is of type File', () => {
        window.URL.createObjectURL = jest.fn();
        const wrapper = mount(<FileComponent field={{ name: 'file', multipleFiles: true }} form={{file: ['file', new File([], 'file')]}} setForm={jest.fn()} formErrors={{file: 'error'}} setFormErrors={jest.fn()}/>);
        (wrapper.find(Dropzone) as any).props().onDrop([]);
        
        expect(wrapper.find('.input-error').length).toEqual(1);
        expect(wrapper.find('.file-name').length).toEqual(2);
        expect(utilsService.getFileName).toHaveBeenCalledTimes(2);
        
        wrapper.find('.remove').at(0).simulate('click');

        expect(window.URL.createObjectURL).toHaveBeenCalled();
        expect(formService.handleChange).toHaveBeenCalled();
    });
});
