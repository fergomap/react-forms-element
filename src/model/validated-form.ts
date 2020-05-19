export default interface ValidatedForm {
    values: Record<string, any>;
    errors: Record<string, string>;
    isValid: boolean;
}
