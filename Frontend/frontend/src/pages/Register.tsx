import { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { register } from '../services/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await register(username, email, password);
    console.log(response);
    // Redirect or show error
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Username" margin="normal" onChange={e => setUsername(e.target.value)} />
        <TextField fullWidth label="Email" type="email" margin="normal" onChange={e => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" onChange={e => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
      </form>
    </Container>
  );
};

export default Register;
