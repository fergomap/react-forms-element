import React, { FunctionComponent, ReactElement } from 'react';
import { defaultErrors } from 'translations/errors';
import { getErrorMessage } from 'services/utils.service';

interface ErrorComponentProps {
    errorCode: string;
    errors?: Record<string, string>;
}

const ErrorComponent: FunctionComponent<ErrorComponentProps> = ({ errorCode, errors }): ReactElement | null => {
    return errorCode ? (<span className="error">{ (errors && errors[errorCode]) || getErrorMessage(errorCode) }</span>) : null;
}

export default ErrorComponent;
