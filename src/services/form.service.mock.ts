/* istanbul ignore file */
import ValidatedFormImp from "model/validated-form.imp";

export const mockFormService = (service: any): void => {
    service.validateForm = jest.fn().mockReturnValue(Promise.resolve(new ValidatedFormImp));
    service.getFieldError = jest.fn().mockReturnValue(Promise.resolve(''));
    service.handleChange = jest.fn();
    service.handleCheckboxChange = jest.fn().mockReturnValue(Promise.resolve());
    service.handleBlur = jest.fn().mockReturnValue(Promise.resolve());
 };
 