import Mock from 'mockjs';
import countryList from './country.json';
import { successResult } from './mockUtil';
const mockAPI = {
  'GET /v1/pub/mix/country': () => {
    return successResult(countryList);
  },

};

const init = () => {
  Object.entries(mockAPI).forEach(([key, mockFn]) => {
    const [method, url] = key.split(' ');
    Mock.mock(new RegExp(url), method.toLowerCase(), mockFn);
  });
};

export default init;
