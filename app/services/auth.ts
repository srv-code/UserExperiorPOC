import apiClient from '@services/client';
import ApiConfig from '@config/apis';

const loginUser = (username: string, password: string) => {
  return apiClient.post(ApiConfig.LOGIN, { username, password });
};

export { loginUser };
