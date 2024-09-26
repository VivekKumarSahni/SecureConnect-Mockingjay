import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllAgency } from './agencyAPI';


const initialState = {
    allAgency: null,
    status: 'idle',
  };
  
  
  export const getAllAgencyAsync = createAsyncThunk(
    'agency/getAllAgency',
    async () => {
      const response = await getAllAgency();
      return response.data;
    }
  );
  


  export const agencySlice = createSlice({
    name: 'agency',
    initialState,
    reducers: {
      increment: (state) => {
        state.value += 1;
      },
     
    },
    
    extraReducers: (builder) => {
      builder
        .addCase(getAllAgencyAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getAllAgencyAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.allAgency = action.payload;
          }) ;
    },
  });
  

  export const selectAllAgency =(state)=> state.agency.allAgency;
  export default agencySlice.reducer;

