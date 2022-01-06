import { useState } from 'react';
import './SignIn.css';
import { FormInput, FormButton, FormHeader } from './SignIn';
import AuthService from '../../services/auth.service';

const ForgottenPassword: React.FC = (props: any) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const { data } = await AuthService.forgottenPassword(email);
    setMessage(data.message);
  };

  return <>
    <FormHeader title="Forgotten Password"/>
    <FormInput placeholder="Email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
    <FormButton title="Submit" onClick={handleSubmit}/>
    <label className='row'>{message}</label>
  </>
}

export default ForgottenPassword;