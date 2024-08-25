import { selector } from 'recoil';
import { isServer } from '@/utils/utils';
import { CountryListResponse, getCountryList } from '@/apis';
import { requestWrapper } from '@/utils/asyncWrapper';

const queryCountryList = async () => {
  const [error, res] = await requestWrapper(getCountryList());
  if (error) {
    return [];
  }
  return res.data;
};

export const countryListState = selector<CountryListResponse>({
  key: 'site/countryListAtom',
  get: () => {
    if (isServer()) {
      return [];
    }
    return queryCountryList();
  },
});
