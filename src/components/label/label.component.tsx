import React, { FunctionComponent, ReactElement } from 'react';

interface LabelComponentProps {
    label?: string | ReactElement;
    className?: string;
}

const LabelComponent: FunctionComponent<LabelComponentProps> = ({ label, className }): ReactElement | null => {
    return label ? <label className={className}>{ label }</label> : null;
};

export default LabelComponent;
