import authReducer from './auth/reducers';
import loadingReducer from './loader/reducers';
import themeReducer from './theme/reducers';
import notifReducer from './notif/reducers';

const rootReducers = {
  auth: authReducer,
  loading: loadingReducer,
  theme: themeReducer,
  notif: notifReducer,
};

export default rootReducers;
