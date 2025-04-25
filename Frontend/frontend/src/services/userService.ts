import axios from 'axios';
import { API_BASE_URL } from '../config';
const BASE_URL = `${API_BASE_URL}/users`;

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/getUsers.php`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    console.log(err)
    return { error: err.response?.data?.error || "Could not fetch users." };
  }
};
