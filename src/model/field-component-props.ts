/* istanbul ignore file */
import Field from 'model/field';

export default interface FieldComponentProps {
    field: Field;
    form: Record<string, any>;
    setForm: Function;
    formErrors: Record<string, string>;
    setFormErrors: Function;
    errors?: Record<string, string>;
}
