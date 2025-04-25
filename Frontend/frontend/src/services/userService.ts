import axios from 'axios';

export const getAllUsers = async () => {
  try {
    const res = await axios.get('http://localhost/UserManager/backend/users/getUsers.php', {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return { error: err.response?.data?.error || "Could not fetch users." };
  }
};
