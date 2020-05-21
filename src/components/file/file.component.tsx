import React, { FunctionComponent, ReactElement } from 'react';
import './file.component.scss';
import Dropzone from 'react-dropzone';
import { handleChange } from 'services/form.service';
import { getFileName } from 'services/utils.service';
import ErrorComponent from 'components/error/error.component';
import FieldComponentProps from 'model/field-component-props';
import LabelComponent from 'components/label/label.component';

const FileComponent: FunctionComponent<FieldComponentProps> = ({ field, form, setForm, formErrors, setFormErrors, errors }): ReactElement => {
    const removeElement = (index: number): void => {
        const files = [...form[field.name]];
        files.splice(index, 1);
        handleChange(field, files, form, setForm, formErrors, setFormErrors);
    };

    return <div className={`field file-component ${field.className ? field.className : ''}`}>
        <LabelComponent label={field.label} />
        <Dropzone onDrop={(files: File[]) => handleChange(field, field.multipleFiles ? form[field.name].concat(files) : files, form, setForm, formErrors, setFormErrors)} accept={field.fileType} multiple={field.multipleFiles}>
            {({getRootProps, getInputProps}: any) => (
                <section className={`dropzone ${formErrors[field.name] && 'input-error'}`}>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>{ field.placeholder || 'Drag and drop some files here, or click to select files' }</p>
                    </div>
                </section>
            )}
        </Dropzone>
        { form[field.name].map((file: string | File, index: number) => {
            return <div key={index} className="file-name">
                <div className="paperclip"/>
                <span className="name">{ getFileName(file) }</span>
                <div className="buttons">
                    <div className="download">
                        <a target="_blank" rel="noopener norreferrer" className="arrow down" href={typeof file === 'string' ? file : URL.createObjectURL(file)} />
                    </div>
                    <span className="remove" onClick={() => removeElement(index)} />
                </div>
            </div>;
        }) }
        <ErrorComponent errorCode={formErrors[field.name]} errors={errors} />
    </div>;
};

export default FileComponent;
