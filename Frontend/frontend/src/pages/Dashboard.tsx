import { Typography, Container } from '@mui/material';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="h6">
          Welcome, {user?.username}!
        </Typography>
        <Typography>Your role: {user?.role}</Typography>
        <Typography>Your id: {user?.id}</Typography>
      </Container>
    </>
  );
};

export default Dashboard;
