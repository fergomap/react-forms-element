import React, { FunctionComponent, ReactElement } from 'react';
import './App.scss';
import { FormComponent, Field } from 'react-forms-element';

const validatePassword = (password: string): string => {
  return password.length < 6 ? 'short_pwd' : '';
}

const App: FunctionComponent = (): ReactElement => {
  const fields: Field[] = [
    { content: <div><h1>FORM EXAMPLE</h1></div>, type: 'custom' },
    { value: '', label: 'Name', name: 'name', type: 'string', required: true },
    { value: '', label: 'Password', name: 'pwd', type: 'password', required: true, customValidator: validatePassword, inputType: 'password' },
    { value: '', label: 'Business', name: 'business', type: 'checkbox', required: true }
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
