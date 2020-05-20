import Field from 'model/field';
import { validateForm } from './form.service';
import ValidatedFormImp from 'model/validated-form.imp';

describe('FormService', () => {
    describe('validateForm', () => {
        it('should return a valid form with the values parsed when the form is valid', () => {
            const fields: Field[] = [{name: 'name', type: 'string'}, {name: 'file', type: 'file', required: true}];

            return validateForm(fields, { name: '', file: ['File'] }, { name: '', file: '' }).then(validatedForm => {
                expect(validatedForm).toEqual(new ValidatedFormImp({ name: '', file: 'File' }, { name: '', file: '' }, true));
            })
        });

        it('should return an invalid form with the values parsed when the form is not valid', () => {
            const fields: Field[] = [{name: 'name', type: 'string', required: true}, {name: 'file', type: 'file', required: true}];

            return validateForm(fields, { name: '', file: ['File'] }, { name: '', file: '' }).then(validatedForm => {
                expect(validatedForm).toEqual(new ValidatedFormImp({ name: '', file: 'File' }, { name: 'required_field', file: '' }, false));
            })
        });
    });

    describe('getFieldError', () => {

    });
});
