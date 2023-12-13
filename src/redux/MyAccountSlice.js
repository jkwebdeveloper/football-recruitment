import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DeleteUrl, GetUrl, PostUrl } from "../BaseUrl";
import toast from "react-hot-toast";

export const handleGetResume = createAsyncThunk(
  "myaccount/handleGetResume",
  async ({ token, signal }, { rejectWithValue }) => {
    toast.dismiss();
    signal.current = new AbortController();
    const response = await GetUrl("resume", {
      signal: signal.current.signal,
      headers: { Authorization: token },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        return rejectWithValue(err?.response?.data);
      });
    return response;
  }
);

export const handleUploadResume = createAsyncThunk(
  "myaccount/handleUploadResume",
  async ({ resume, resumeTitle, token, signal }, { rejectWithValue }) => {
    toast.dismiss();
    const formdata = new FormData();
    formdata.append("resumes", resume);
    formdata.append("resumeTitle", resumeTitle);
    signal.current = new AbortController();
    const response = await PostUrl("resume", {
      data: formdata,
      signal: signal.current.signal,
      headers: { Authorization: token, "Content-Type": "mulitpart/form-data" },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        return rejectWithValue(err?.response?.data);
      });
    return response;
  }
);

export const handleDeleteResume = createAsyncThunk(
  "myaccount/handleDeleteResume",
  async ({ id, token, signal }, { rejectWithValue }) => {
    toast.dismiss();
    signal.current = new AbortController();
    const response = await DeleteUrl(`resume/${id}`, {
      signal: signal.current.signal,
      headers: { Authorization: token },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        return rejectWithValue(err?.response?.data);
      });
    return response;
  }
);

const initialState = {
  loading: false,
  error: null,
  resume: [],
  resumeUploadLoading: false,
};

const MyAccountSlice = createSlice({
  name: "myaccount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get resume
    builder
      .addCase(handleGetResume.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(handleGetResume.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.resume = payload?.resumes;
        state.error = null;
      })
      .addCase(handleGetResume.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // upload resume
    builder
      .addCase(handleUploadResume.pending, (state, { payload }) => {
        state.resumeUploadLoading = true;
        state.error = null;
      })
      .addCase(handleUploadResume.fulfilled, (state, { payload }) => {
        state.resumeUploadLoading = false;
        state.error = null;
      })
      .addCase(handleUploadResume.rejected, (state, { payload }) => {
        state.resumeUploadLoading = false;
        state.error = payload;
      });

    // delete resume
    builder
      .addCase(handleDeleteResume.pending, (state, { payload }) => {
        state.resumeUploadLoading = true;
        state.error = null;
      })
      .addCase(handleDeleteResume.fulfilled, (state, { payload }) => {
        state.resumeUploadLoading = false;
        state.error = null;
      })
      .addCase(handleDeleteResume.rejected, (state, { payload }) => {
        state.resumeUploadLoading = false;
        state.error = payload ?? null;
      });
  },
});

export const {} = MyAccountSlice.actions;

export default MyAccountSlice.reducer;
