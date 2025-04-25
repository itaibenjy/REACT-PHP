import { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { User } from '../types';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await login(username, password);
    
    if (response.success) {
      const user: User = response.user;
      localStorage.setItem('user', JSON.stringify(user)); // 🔥 Save in localStorage

      if (user.role === 'admin') {
        navigate('/admin'); // Redirect admin
      } else {
        navigate('/dashboard'); // Redirect user
      }
    } else {
      alert(response.error || "Login failed.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Username" margin="normal" onChange={e => setUsername(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" onChange={e => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
      </form>
    </Container>
  );
};

export default Login;
