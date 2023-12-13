import { createSlice } from "@reduxjs/toolkit";

const whiteList = createSlice({
  name: "whiteList",
  initialState: {
    user: null,
    token: "",
  },
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload?.token;
    },
  },
});

export const { saveUser } = whiteList.actions;
export default whiteList.reducer;
