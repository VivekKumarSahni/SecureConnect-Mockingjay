import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkAgency, checkUser, registerAgency, signOut , updateAgency,updateAgencyDelRes,getLoggedInAgency} from './authAPI';


const initialState = {
    loggedInUser:null,
    loggedInAgency:null,
    status: 'idle',
    error:null,
  };
  
  
  export const registerAgencyAsync = createAsyncThunk(
    'agency/registerAgency',
    async (agencyData) => {
      const response = await registerAgency(agencyData);
      return response.data;
    }
  );



  export const checkUserAsync = createAsyncThunk(
    'user/checkUser',
    async (loginInfo, {rejectWithValue}) => {
     try{
      const response = await checkUser(loginInfo);
      return response.data;
     }catch(err){
        console.log(err);
        return rejectWithValue(err)
     }
  
    }
  );

  export const checkAgencyAsync = createAsyncThunk(
    'agency/checkAgency',
    async (loginInfo, {rejectWithValue}) => {
     try{
      const response = await checkAgency(loginInfo);
      return response.data;
     }catch(err){
        console.log(err);
        return rejectWithValue(err)
     }
  
    }
  );
  
  export const signOutAsync = createAsyncThunk(
    'user/signOut',
    async (id) => {
      const response = await signOut(id);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );
  

  export const updateAgencyAsync = createAsyncThunk(
    'agency/updateAgency',
    async (data) => {
      const response = await updateAgency(data.id,data.resource);
      console.log(response);
      return response.result;
    }
  );
  export const updateAgencyDelResAsync = createAsyncThunk(
    'agency/updateAgencyDelRes',
    async (data) => {
      const response = await updateAgencyDelRes(data.id,data.resId);
      return response.result;
    }
  );
  export const getLoggedInAgencyAsync = createAsyncThunk(
    'agency/getLoggedInAgency',
    async () => {
      const response = await getLoggedInAgency();
      return response.data;
    }
  );



  export const authSlice = createSlice({
    name: 'agency',
    initialState,
    reducers: {
      increment: (state) => {
        state.value += 1;
      },
     
    },
    
    extraReducers: (builder) => {
      builder
          // register
        .addCase(registerAgencyAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(registerAgencyAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.loggedInAgency = action.payload;
          })
          // checkUser
          .addCase(checkUserAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(checkUserAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.loggedInUser = action.payload;
          })
          .addCase(checkUserAsync.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.payload;
          })
          // checkAgency
          .addCase(checkAgencyAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(checkAgencyAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.loggedInAgency = action.payload;
          })
          .addCase(checkAgencyAsync.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.payload;
          })
          // sign-out
          .addCase(signOutAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(signOutAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.loggedInUser = null;
            state.agency = null
          }).addCase(updateAgencyAsync.pending, (state) => {
            state.status = 'loading';
           
          }).addCase(updateAgencyAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
            state.loggedInAgency=action.payload;
            // state.loggedInAgency = {...loggedInAgency, resources:{...loggedInAgency.resources,...action.payload}};
    
    
          }).addCase(updateAgencyDelResAsync.pending, (state) => {
            state.status = 'loading';
           
          }).addCase(updateAgencyDelResAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.loggedInAgency=action.payload;
    
          }).addCase(getLoggedInAgencyAsync.pending, (state) => {
            state.status = 'loading';
           
          }).addCase(getLoggedInAgencyAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.loggedInAgency=action.payload;
    
          });
    },
  });

  
export const selectloggedInUser = (state) => state.auth.loggedInUser;
export const selectloggedInAgency = (state) => state.auth.loggedInAgency;
export const selectError = (state) => state.auth.error;
  

  export default authSlice.reducer;
