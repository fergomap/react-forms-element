import { getFileName, getErrorMessage, generateForm } from './utils.service';
import Field from 'model/field';

describe('UtilsService', () => {
    describe('getFileName', () => {
        it('should return the file param when the param is a File', () => {
            expect(getFileName(new File([], 'file.pdf'))).toEqual('file.pdf');
        });

        it('should parse the file name when the param is a string (url)', () => {
            expect(getFileName('https://example.com/forms/file.pdf?token=token')).toEqual('file.pdf');
        });
    });

    describe('getErrorMessage', () => {
        it('should return the default message when the code exists in the default errors object', () => {
            expect(getErrorMessage('required_field')).toEqual('Required field')
        });

        it('should return the the min error message with the min value set when the error code is min', () => {
            expect(getErrorMessage('wrong_min_0')).toEqual('Min value is 0')
        });

        it('should return the the max error message with the max value set when the error code is max', () => {
            expect(getErrorMessage('wrong_max_10')).toEqual('Max value is 10')
        });

        it('should return the code when it is not a default message', () => {
            expect(getErrorMessage('custom_error')).toEqual('custom_error')
        });
    });

    describe('generateForm', () => {
        it('should initialize the form and formErros object according to the passed fields and their values', () => {
            const fields: Field[] = [
                { name: 'custom', type: 'custom' },
                { name: 'name', value: 'MockName', type: 'string' },
                { name: 'business', value: true, type: 'checkbox' },
                { name: 'colors', value: [], type: 'checkbox-list' },
                { name: 'list', value: {label: 'Label', value: 'value'}, type: 'list' },
                { name: 'fruits', type: 'checkbox-list' },
                { name: 'jobs', value: [{label: 'Label', value: 'value'}], type: 'select', multipleSelected: true }
            ];
            const form: Record<string, any> = {
                name: 'MockName',
                business: true,
                colors: [],
                list: [{label: 'Label', value: 'value'}],
                fruits: [],
                jobs: [{label: 'Label', value: 'value'}]
            }
            const formErrors: Record<string, string> = {
                name: '',
                business: '',
                colors: '',
                list: '',
                fruits: '',
                jobs: '',
                generalError: '',
            }

            expect(generateForm(fields)).toEqual([form, formErrors]);
        });
    });
});
