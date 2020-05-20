/* istanbul ignore file */
import React from 'react';

export const mockFieldService = (service: any): void => {
    service.getField = jest.fn();
    service.fieldToTableElement = jest.fn().mockReturnValue(<div/>);
 };
 