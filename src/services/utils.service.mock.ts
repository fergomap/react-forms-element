/* istanbul ignore file */
export const mockUtilsService = (service: any): void => {
    service.getFileName = jest.fn().mockReturnValue('');
    service.getErrorMessage = jest.fn().mockReturnValue('');
    service.generateForm = jest.fn().mockReturnValue([{}, {}]);
 };
