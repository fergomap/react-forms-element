import React from 'react';
import { mockFormService } from 'services/form.service.mock';
import * as formService from 'services/form.service';
import { mockFieldService } from 'services/field.service.mock';
import * as fieldService from 'services/field.service';
import { mockUtilsService } from 'services/utils.service.mock';
import * as utilsService from 'services/utils.service';
import { mount } from 'enzyme';
import FormComponent from './form.component';
import { act } from 'react-dom/test-utils';
import ValidatedFormImp from 'model/validated-form.imp';

describe('FormComponent', () => {

    beforeEach(() => {
        mockFormService(formService);
        mockFieldService(fieldService);
        mockUtilsService(utilsService);
    });

    it('should call to generateForm and to getField when form is defined', () => {
        (utilsService.generateForm as jest.Mock).mockReturnValue([{ field: 'field' }, {}]);
        mount(<FormComponent fields={[{ name: 'name' }]} onSubmit={jest.fn()}/>);

        expect(utilsService.generateForm).toHaveBeenCalled();
        expect(fieldService.getField).toHaveBeenCalled();
    });

    describe('onSubmit', () => {
        it('should not call to onSubmit when the form is not valid', async() => {
            const onSubmit = jest.fn();
            const wrapper = mount(<FormComponent fields={[{ name: 'name' }]} onSubmit={onSubmit}/>);

            await act(async() => {
                wrapper.find('.submit-container button').simulate('click');
            });

            expect(formService.validateForm).toHaveBeenCalled();
            expect(onSubmit).not.toHaveBeenCalled();
        });

        it('should not call to onSubmit when the form is not valid', async() => {
            const onSubmit = jest.fn();
            const wrapper = mount(<FormComponent fields={[{ name: 'name' }]} onSubmit={onSubmit}/>);

            (formService.validateForm as jest.Mock).mockReturnValue(new ValidatedFormImp({}, {}, true));

            await act(async() => {
                wrapper.find('.submit-container button').simulate('click');
            });

            expect(formService.validateForm).toHaveBeenCalled();
            expect(onSubmit).toHaveBeenCalled();
        });
    });
});
