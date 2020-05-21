import React from 'react';
import { mockUtilsService } from 'services/utils.service.mock';
import * as utilsService from 'services/utils.service';
import { mount } from 'enzyme';
import ErrorComponent from './error.component';

describe('ErrorComponent', () => {

    beforeEach(() => {
        mockUtilsService(utilsService);
    });

    it('should render null when there is no error', () => {
        const wrapper = mount(<ErrorComponent errorCode=""/>);

        expect(wrapper.find('span').length).toEqual(0);
    });

    it('should render an error span when there is error and show the error from errors when it is defined', () => {
        const wrapper = mount(<ErrorComponent errorCode="error" errors={{ error: 'Custom error' }}/>);

        expect(wrapper.find('span').text()).toEqual('Custom error');
    });

    it('should render an error span when there is error and call to getErrorMessage when the errorCode is not found in errors', () => {
        const wrapper = mount(<ErrorComponent errorCode="otherError"/>);

        expect(wrapper.find('span').length).toEqual(1);
        expect(utilsService.getErrorMessage).toHaveBeenCalled();
    });
});
