import { createSlice } from '@reduxjs/toolkit';
import { IAddress } from 'types/addresses';
import addressesService from 'services/addresses';

export interface IAddressesState {
  data: {
    suggestions: IAddress[] | null;
  };
  loading: boolean;
  menuIsOpen: boolean;
  error?: string | null;
}

const initialState: IAddressesState = {
  data: {
    suggestions: null
  },
  error: null,
  loading: false,
  menuIsOpen: false
};

const addressesSlice = createSlice({
  name: 'addresses',
  reducers: {
    resetData(state) {
      state.data = initialState.data;
    },
    setMenuIsOpen(state, action) {
      state.menuIsOpen = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    }
  },
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addressesService.getAddressesData.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(addressesService.getAddressesData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addressesService.getAddressesData.rejected, (state, action) => {
        state.loading = false;
        state.data = initialState.data;
        state.error = action.payload;
      });
  },
});

export const { actions: addressesActions } = addressesSlice;
export const { reducer: addressesReducer } = addressesSlice;
