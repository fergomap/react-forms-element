import React from 'react';
import { mount } from 'enzyme';
import LabelComponent from './label.component';

describe('LabelComponent', () => {
    it('should render a label when there is label', () => {
        const wrapper = mount(<LabelComponent label="Label"/>);

        expect(wrapper.find('label').length).toEqual(1);
    });

    it('should render a label when there is no label', () => {
        const wrapper = mount(<LabelComponent/>);

        expect(wrapper.find('label').length).toEqual(0);
    });
});
