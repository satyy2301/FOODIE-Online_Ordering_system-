import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder,fetchAdminOrders,fetchAllOrders,updateOrder } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null,
  totalOrders: 0,
  adminTotalOrders:[],
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort, pagination}) => {
    const response = await fetchAllOrders(sort,pagination);
    return response.data;
  }
);
export const fetchAdminOrdersAsync = createAsyncThunk(
  'order/fetchAdminOrders',
  async () => {
    const response = await fetchAdminOrders();
    return response.data;
  }
);
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
      resetOrder: (state) => {
        state.currentOrder = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createOrderAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createOrderAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.orders.push(action.payload);
          state.currentOrder = action.payload;
        })
        .addCase(fetchAllOrdersAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.orders = action.payload.orders;
          state.totalOrders = action.payload.totalOrders;
        })
        .addCase(fetchAdminOrdersAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAdminOrdersAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.adminTotalOrders = action.payload;
          
        })
        .addCase(updateOrderAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateOrderAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          const index =  state.orders.findIndex(order=>order.id===action.payload.id)
          state.orders[index] = action.payload;
        });
    },
  });
  
  export const { resetOrder } = orderSlice.actions;
  
  export const selectCurrentOrder = (state) => state.order.currentOrder;
  export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectAdminOrders=(state)=> state.order.adminTotalOrders;

  
  export default orderSlice.reducer;