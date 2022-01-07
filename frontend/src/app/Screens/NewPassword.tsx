import { useState } from 'react';
import './SignIn.css';
import { FormInput, FormButton, FormHeader } from './SignIn';
import AuthService from '../../services/auth.service';
import { useParams } from "react-router-dom";

const NewPassword: React.FC = (props: any) => {
  const [resetPassword, setResetPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (resetPassword !== confirmPassword) {
      setMessage("Passwords are not the same!")
      return 
    }
    const { data } = await AuthService.resetPassword(token!, resetPassword);
    setMessage(data.message);
  };

  return <>
    <FormHeader title="New Password"/>
    <FormInput type="password" placeholder="New password" value={resetPassword} onChange={(e: any) => setResetPassword(e.target.value)} />
    <FormInput type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} />
    <FormButton title="Change" onClick={handleSubmit}/>
    <label className='row'>{message}</label>
  </>
}

export default NewPassword;