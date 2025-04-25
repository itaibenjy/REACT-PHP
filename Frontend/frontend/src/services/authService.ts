import axios from 'axios';
import { API_BASE_URL } from '../config';

const BASE_URL = `${API_BASE_URL}/auth`;

export const login = async (username: string, password: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/login.php`, { username, password }, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return { error: err.response?.data?.error || "Login failed." };
  }
};

export const register = async (username: string, email: string, password: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/register.php`, { username, email, password }, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return { error: err.response?.data?.error || "Registration failed." };
  }
};
