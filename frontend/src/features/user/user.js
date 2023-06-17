import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: null,
  error: false,
};

export const addUser = createAsyncThunk(
  "user/loginuser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/user/loginuser",
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.error = false;
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(addUser.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { logOutUser } = userSlice.actions;

export default userSlice.reducer;
