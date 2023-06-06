import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { IAddress } from 'types/addresses';

const getAddressesData = createAsyncThunk<
  {suggestions: IAddress[] },
  { query: string },
  { rejectValue: string | undefined; state: RootState }
>(
  'addresses/getAddressesData',
  async (action, { rejectWithValue }) => {
    try {
      const requestUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
      const token = process.env.REACT_APP_DADATA_TOKEN;
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`
      };

      const response = await axios({
        method: 'POST',
        headers,
        url: requestUrl,
        data: JSON.stringify({ query: action.query }),
      });
      return response.data;
    } catch (e) {
      const error = e as AxiosError<{message: string}>;
      return rejectWithValue(error.response?.data.message);
    }
  }
);

const addressesService = {
  getAddressesData,
};
export default addressesService;
