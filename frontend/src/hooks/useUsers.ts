// src/hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';
import { UserDto } from '../types/dto';

// --- API Function ---
const fetchAllUsers = async (): Promise<UserDto[]> => {
  const response = await apiClient.get('/user/all');
  return response.data.data;
};

// --- Custom Hook ---
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
  });
};
