import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  order: null,
  error: false,
};

export const getOrder = createAsyncThunk(
  "order/getorder",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8080/order/getorder", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addOrder = createAsyncThunk(
  "order/addorder",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/order/addorder/${data.userId}`,
        data.payload,
        data.token
      );
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.order = payload;
      })
      .addCase(getOrder.rejected, (state) => {
        state.error = true;
      })
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrder.fulfilled, (state, { payload }) => {
        console.log(state);
        state.loading = false;
        state.order = [...state.order, payload.data.neworder];
      })
      .addCase(addOrder.rejected, (state) => {
        state.error = true;
      });
  },
});

export default orderSlice.reducer;
