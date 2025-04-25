import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import Navbar from '../components/Navbar';
import { getAllUsers } from '../services/userService';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (response.error) {
        setError(response.error);
      } else {
        setUsers(response);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" gutterBottom>Admin Panel</Typography>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.created_at}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Container>
    </>
  );
};

export default AdminPanel;

