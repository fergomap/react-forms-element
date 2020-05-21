import Field from 'model/field';
import { validateForm, getFieldError, handleChange, handleBlur, handleCheckboxChange } from './form.service';
import ValidatedFormImp from 'model/validated-form.imp';
import OptionImp from 'model/option.imp';

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
        it('should return an empty string when the field is not required, is of type undefined and has no customValidator', () => {
            return getFieldError({ name: 'name' }, { name: '' }).then(error => {
                expect(error).toEqual('');
            });
        });

        it('should return an empty string when the field is not required, is of type string and has no customValidator', () => {
            return getFieldError({ name: 'name', type: 'string' }, { name: '' }).then(error => {
                expect(error).toEqual('');
            });
        });

        it('should return a required_field string when the field is required, is of type string, has no customValidator and is empty', () => {
            return getFieldError({ name: 'name', required: true, type: 'string' }, { name: '' }).then(error => {
                expect(error).toEqual('required_field');
            });
        });

        it('should return an empty string when the field is required, is of type string, has no customValidator and has value', () => {
            return getFieldError({ name: 'name', required: true, type: 'string' }, { name: 'Name' }).then(error => {
                expect(error).toEqual('');
            });
        });

        it('should return the string that the customValidator returns when it is of type string and has customValidator', () => {
            const customValidator = jest.fn().mockReturnValue('error');
            return getFieldError({ name: 'name', customValidator, type: 'string' }, { name: 'Name' }).then(error => {
                expect(error).toEqual('error');
                expect(customValidator).toHaveBeenCalled();
            });
        });

        it('should return a required_field string when the field is required, is of type email and has no value', () => {
            return getFieldError({ name: 'email', type: 'email', required: true }, { email: '' }).then(error => {
                expect(error).toEqual('required_field');
            });
        });

        it('should return an empty string when the field is not required, is of type email and has no customValidator', () => {
            return getFieldError({ name: 'email', type: 'email' }, { email: '' }).then(error => {
                expect(error).toEqual('');
            });
        });

        it('should return a wrong_email string when the field is not required, is of type email and has a wrong value', () => {
            return getFieldError({ name: 'email', type: 'email' }, { email: 'wrongmail' }).then(error => {
                expect(error).toEqual('wrong_email');
            });
        });

        it('should return an empty string when the field is not required, is of type email and has a correct value', () => {
            return getFieldError({ name: 'email', type: 'email' }, { email: 'mail@mail.com' }).then(error => {
                expect(error).toEqual('');
            });
        });

        it('should return a required_field string when the field is required, is of type number and has no value', () => {
            return getFieldError({ name: 'number', type: 'number', required: true }, { number: '' }).then(error => {
                expect(error).toEqual('required_field');
            });
        });

        it('should return a wrong_number string when the field is of type number and the value is not a number', () => {
            return getFieldError({ name: 'number', type: 'number' }, { number: 'n' }).then(error => {
                expect(error).toEqual('wrong_number');
            });
        });

        it('should return a wrong_min_ string when the field is of type number and the value is lower than the min', () => {
            return getFieldError({ name: 'number', type: 'number', min: 1 }, { number: '0' }).then(error => {
                expect(error).toEqual('wrong_min_1');
            });
        });

        it('should return a wrong_max_ string when the field is of type number and the value is higher than the max', () => {
            return getFieldError({ name: 'number', type: 'number', max: 1 }, { number: '2' }).then(error => {
                expect(error).toEqual('wrong_max_1');
            });
        });

        it('should return an empty string when the field is of type number and the value is a correct number', () => {
            return getFieldError({ name: 'number', type: 'number', max: 10 }, { number: '2' }).then(error => {
                expect(error).toEqual('');
            });
        });

        it('should return a required_field string when the field is required, is of type list and has no value', () => {
            return getFieldError({ name: 'list', type: 'list', required: true }, { list: '' }).then(error => {
                expect(error).toEqual('required_field');
            });
        });

        it('should return a no_selected string when the field is required, is of type checkbox-list and is an empty list', () => {
            return getFieldError({ name: 'list', type: 'checkbox-list', required: true }, { list: [] }).then(error => {
                expect(error).toEqual('no_selected');
            });
        });

        it('should return an empty string when the field is not required, is of type checkbox-list and is an empty list', () => {
            return getFieldError({ name: 'list', type: 'checkbox-list' }, { list: [] }).then(error => {
                expect(error).toEqual('');
            });
        });

        it('should return an empty string when the field is required, is of type file and is not an empty list', () => {
            return getFieldError({ name: 'files', type: 'file', required: true }, { files: ['file'] }).then(error => {
                expect(error).toEqual('');
            });
        });
    });

    describe('handleChange', () => {
        it('should call setForm with the data added, setFormErrors with the field empty and call to onChange if it is defined', () => {
            const setForm = jest.fn(), setFormErrors = jest.fn();
            const field = { name: 'name', onChange: jest.fn() };

            handleChange(field, 'Name', { name: '' }, setForm, { name: '' }, setFormErrors);

            expect(setForm).toHaveBeenCalledWith({ name: 'Name' });
            expect(setFormErrors).toHaveBeenCalledWith({ name: '', generalError: '' });
            expect(field.onChange).toHaveBeenCalledWith('Name');
        });
    });

    describe('handleCheckboxChange', () => {
        it('should set the value to the field when it is of type checkbox', () => {
            const setForm = jest.fn(), setFormErrors = jest.fn();
            const field: Field = { name: 'name', onChange: jest.fn(), type: 'checkbox' };

            return handleCheckboxChange(field, new OptionImp('Name', 'name'), true, { name: false }, setForm, { name: '' }, setFormErrors).then(() => {
                expect(setForm).toHaveBeenCalledWith({ name: true });
                expect(setFormErrors).toHaveBeenCalledWith({ name: '', generalError: '' });
                expect(field.onChange).toHaveBeenCalledWith(true);
            });
        });

        it('should set the value to the field when it is of type checkbox-list and not multipleSelected', () => {
            const setForm = jest.fn(), setFormErrors = jest.fn();
            const field: Field = { name: 'name', type: 'checkbox-list' };

            return handleCheckboxChange(field, new OptionImp('Name', 'name'), true, { name: [] }, setForm, { name: '' }, setFormErrors).then(() => {
                expect(setForm).toHaveBeenCalledWith({ name: ['name'] });
                expect(setFormErrors).toHaveBeenCalledWith({ name: '', generalError: '' });
            });
        });

        it('should set remove value to the field when it is of type checkbox-list, not multipleSelected and the option is already selected', () => {
            const setForm = jest.fn(), setFormErrors = jest.fn();
            const field: Field = { name: 'name', type: 'checkbox-list' };

            return handleCheckboxChange(field, new OptionImp('Name', 'name'), true, { name: ['name'] }, setForm, { name: '' }, setFormErrors).then(() => {
                expect(setForm).toHaveBeenCalledWith({ name: [] });
                expect(setFormErrors).toHaveBeenCalledWith({ name: '', generalError: '' });
            });
        });

        it('should add the value to the field when it is of type checkbox-list and multipleSelected', () => {
            const setForm = jest.fn(), setFormErrors = jest.fn();
            const field: Field = { name: 'name', type: 'checkbox-list', multipleSelected: true };

            return handleCheckboxChange(field, new OptionImp('Name', 'name'), true, { name: [] }, setForm, { name: '' }, setFormErrors).then(() => {
                expect(setForm).toHaveBeenCalledWith({ name: ['name'] });
                expect(setFormErrors).toHaveBeenCalledWith({ name: '', generalError: '' });
            });
        });

        it('should set remove value to the field when it is of type checkbox-list, multipleSelected and the option is already selected', () => {
            const setForm = jest.fn(), setFormErrors = jest.fn();
            const field: Field = { name: 'name', type: 'checkbox-list', multipleSelected: true };

            return handleCheckboxChange(field, new OptionImp('Name', 'name'), true, { name: ['name'] }, setForm, { name: '' }, setFormErrors).then(() => {
                expect(setForm).toHaveBeenCalledWith({ name: [] });
                expect(setFormErrors).toHaveBeenCalledWith({ name: '', generalError: '' });
            });
        });
    });

    describe('handleBlur', () => {
        it('should validate the field and call to onBlur if it is defined', () => {
            const setFormErrors = jest.fn();
            const field = { name: 'name', onBlur: jest.fn(), required: true };

            return handleBlur(field, { name: '' }, { name: '' }, setFormErrors).then(() => {
                expect(setFormErrors).toHaveBeenCalledWith({ name: 'required_field' });
                expect(field.onBlur).toHaveBeenCalledWith('');
            });
        });
    });
});
