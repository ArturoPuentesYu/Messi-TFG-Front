// src/services/userService.ts
import axios from 'axios';

import { User } from '../types/user';

export const fetchUsers = async () => {
  try {
    const response: { data: User[] } = await axios.get(`${import.meta.env.API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
