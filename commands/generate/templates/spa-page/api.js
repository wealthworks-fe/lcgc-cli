import Axios from 'axios';
import { Toast } from 'antd-mobile';

const axiosInstance = Axios.create();

axiosInstance.interceptors.response.use((res) => {
  const { data } = res;
  if (data.status === 0 || data.success || data.r) {
    return data.data;
  }
  const errorMsg = data.message || data.error || '请求错误';
  Toast.info(errorMsg, 3, null, false);
  throw new Error(errorMsg);
});

// 获取首页数据
export const getHome = () => axiosInstance.get('/api/v1/home');
