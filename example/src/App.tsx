import React, { FunctionComponent, ReactElement } from 'react';
import './App.scss';
import { FormComponent, Field } from 'react-forms-element';

const validateMail = (mail: string): Promise<string> => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      resolve(mail ? '' : 'Async mail validation');
    }, 100);
  });
};

const App: FunctionComponent = (): ReactElement => {
  const fields: Field[] = [
    { content: <div><h1>FORM EXAMPLE</h1></div>, type: 'custom' },
    { value: '', label: 'Name', name: 'name', type: 'string', required: true },
    { value: '', label: 'Textarea', name: 'textarea', required: true, type: 'textarea' },
    { value: '', label: 'Password', name: 'pwd', type: 'password', required: true, customValidator: (value: any) => value.length < 6 ? 'short_pwd' : '', inputType: 'password' },
    { value: '', label: 'Email', name: 'email', type: 'email', customValidator: validateMail },
    { value: '', title: 'List', name: 'list', type: 'list', required: true, fields: [ 
        { value: '', label: 'City', name: 'city', type: 'string', showInList: true }, 
        { value: '', label: 'Country', name: 'country', type: 'string' }, 
        { value: '', label: 'Europe', name: 'europe', type: 'checkbox', showInList: true },
        { value: '', label: 'Date', name: 'date', type: 'date', minDate: new Date(), showInList: true },
        { value: '', label: 'File', name: 'file', type: 'file', multipleFiles: true, showInList: true },
        { value: '', showInList: true, multipleSelected: false, placeholder: '-Selecciona-', name: 'jobs', type: 'select', options: [{label: 'IT', value: 'it'}, {label: 'Front', value: 'front'}, {label: 'Back', value: 'back'}], label: 'Jobs' },
        { value: '', showInList: true, multipleSelected: true, placeholder: '-Selecciona-', name: 'positions', type: 'select', options: [{label: 'IT', value: 'it'}, {label: 'Front', value: 'front'}, {label: 'Back', value: 'back'}], label: 'Positions' },
        { value: '', multipleSelected: true, name: 'colours', showInList: true, type: 'checkbox-list', options: [{label: 'Green', value: 'green'}, {label: 'Red', value: 'red'}, {label: 'Black', value: 'black'}], label: 'Colours' },
    ]},
    { value: '', label: 'Business', name: 'business', type: 'checkbox', required: true },
    { value: '', label: 'House', name: 'house', type: 'checkbox' },
    { value: '', label: 'Date', name: 'date', type: 'date', required: true, minDate: new Date(), mobileCalendar: true },
    { value: '', multipleSelected: false, required: true, name: 'colours', type: 'checkbox-list', options: [{label: 'Green', value: 'green'}, {label: 'Red', value: 'red'}, {label: 'Black', value: 'black'}], label: 'Colours' },
    { value: '', multipleSelected: false, required: true, placeholder: '-Selecciona-', name: 'jobs', type: 'select', options: [{label: 'IT', value: 'it'}, {label: 'Front', value: 'front'}, {label: 'Back', value: 'back'}], label: 'Jobs' },
    { value: '', label: 'Number', name: 'number', required: true, type: 'number', inputType: 'number', min: 1, step: .5 },
    { value: [], label: 'Files', name: 'files', required: true, type: 'file', multipleFiles: true }
  ];
  const errors = {
    short_pwd: 'Password too short'
  };

  const onSubmit = (form: any): any => console.log(form);

  return <div className="App">
      <FormComponent fields={fields} onSubmit={onSubmit} errors={errors} />
  </div>;
};

export default App;
