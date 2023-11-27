import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders, updateUser, fetchLoggedInUser, fetchAllUsers } from './UserAPI';

const initialState = {
  allUsers:[],
  status: 'idle',
  userInfo: null, 
  totalUsers: 0,
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
   
    return response.data;
  }
);

export const fetchAllUsersAsync = createAsyncThunk(
  'user/fetchAllUsers', 
  async () => {
    const response = await fetchAllUsers();
    return response.data;
  }
);




export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (id) => {
    const response = await fetchLoggedInUser(id);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo.orders = action.payload;
      })
      .addCase(fetchAllUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.allUsers = action.payload.users;
        state.totalUsers=action.payload.totalUsers;
      })
      
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = state.userInfo || {};
        state.userOrders = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
  },
});

export const selectUserOrders = (state)=>state.user.userInfo.orders;
export const selectUserInfo = (state)=>state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;
export const selectAllusers=(state) => state.user.allUsers;
export const { increment } = userSlice.actions;
export const selecttotalusers=(state)=> state.user.totalUsers;
export default userSlice.reducer;