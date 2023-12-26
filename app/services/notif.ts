import apiClient from '@services/client';
import ApiConfig from '@config/apis';

const fetchNotifications = (userToken: string) => {
  return apiClient.post(ApiConfig.NOTIF, { userToken });
};

export { fetchNotifications };
