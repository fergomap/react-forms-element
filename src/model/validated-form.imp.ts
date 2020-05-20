/* istanbul ignore file */
import ValidatedForm from './validated-form';

export default class ValidatedFormImp implements ValidatedForm {
    values: Record<string, any>;
    errors: Record<string, string>;
    isValid: boolean;

    constructor(values: Record<string, any> = {}, errors: Record<string, string> = {}, isValid: boolean = false) {
        this.values = values;
        this.errors = errors;
        this.isValid = isValid;
    }
}
