import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



const initialState = {
    allAlerts: null,
    status: 'idle',
  };
  
  
  export const getAllAlerts = createAsyncThunk(
    'alert/getAllAlerts',
    async () => {
    //   const response = await getAllAgency();
    //   return response.data;

    const response = await fetch('https://secureconnect-backend.onrender.com/alerts');

     const data = await response.json();
    return data;
    }
  );


  export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
      increment: (state) => {
        state.value += 1;
      },
     
    },
    
    extraReducers: (builder) => {
      builder
        .addCase(getAllAlerts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getAllAlerts.fulfilled, (state, action) => {
            state.status = 'idle';
            state.allAlerts = action.payload;
          }) ;
    },
  });
  

  export const selectAllAlerts =(state)=> state.alert.allAlerts;
  export default alertSlice.reducer;

