import axios from 'axios';
import { User } from '../types';

const BASE_URL = 'http://localhost/REACT-PHP/Backend/auth';

export const login = async (username: string, password: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/login.php`, { username, password });
    return res.data;
  } catch (err: any) {
    return { error: err.response?.data?.error || "Login failed." };
  }
};

export const register = async (username: string, email: string, password: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/register.php`, { username, email, password });
    return res.data;
  } catch (err: any) {
    return { error: err.response?.data?.error || "Registration failed." };
  }
};
