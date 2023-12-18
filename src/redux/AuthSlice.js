import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { PostUrl, PutUrl } from "../BaseUrl";

export const handleLoginUser = createAsyncThunk(
  "auth/handleLoginUser",
  async ({ password, email, signal }, { rejectWithValue }) => {
    toast.dismiss();
    signal.current = new AbortController();
    const response = await PostUrl("login", {
      data: {
        email: email,
        password: password,
      },
      signal: signal.current.signal,
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err?.response?.data?.errors) {
          for (const [key, value] of Object.entries(
            err?.response?.data?.errors
          )) {
            // toast.error(err?.response?.data?.errors[key]);
          }
        } else {
          toast.error(err?.response?.data?.message);
        }
        // toast.error(err?.response?.data?.message);
        return rejectWithValue(err?.response?.data);
      });
    return response;
  }
);

export const handleRegisterUser = createAsyncThunk(
  "auth/handleRegisterUser",
  async (
    { name, email, password, phone, city, state, country, signal },
    { rejectWithValue }
  ) => {
    toast.dismiss();
    signal.current = new AbortController();

    const response = await PostUrl("register", {
      data: {
        name,
        email,
        password,
        phone,
        city,
        state,
        country,
      },
      signal: signal.current.signal,
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err?.response?.data?.errors) {
          for (const [key, value] of Object.entries(
            err?.response?.data?.errors
          )) {
            toast.error(err?.response?.data?.errors[key]);
          }
        } else {
          toast.error(err?.response?.data?.message);
        }
        return rejectWithValue(err?.response?.data);
      });
    return response;
  }
);

export const handleForgotPassword = createAsyncThunk(
  "auth/handleForgotPassword",
  async ({ email, signal }, { rejectWithValue }) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl("forgot-password", {
        data: { email },
        signal: signal.current.signal,
      });
      return response.data;
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const handleResetPassword = createAsyncThunk(
  "auth/handleResetPassword",
  async ({ password, token, signal }, { rejectWithValue }) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl("reset-password", {
        data: { password, token },
        signal: signal.current.signal,
      });
      return response.data;
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const handleChangePassword = createAsyncThunk(
  "auth/handleChangePassword",
  async (
    { oldPassword, newPassword, confirmPassword, token, signal },
    { rejectWithValue }
  ) => {
    try {
      signal.current = new AbortController();
      const response = await PostUrl("change-password", {
        data: { oldPassword, newPassword, confirmPassword },
        signal: signal.current.signal,
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const handleUpdateProfile = createAsyncThunk(
  "auth/handleUpdateProfile",
  async (
    { name, phone, state, city, country, token, signal },
    { rejectWithValue }
  ) => {
    try {
      signal.current = new AbortController();
      const response = await PutUrl("profile", {
        data: { name, phone, state, city, country },
        signal: signal.current.signal,
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    user: null,
    token: null,
  },
  reducers: {
    handleLogout: (state) => {
      state.loading = true;
      state.user = null;
      state.token = null;
      window.location.href = window.location.origin;
      toast.success("Logout Successfully.", { duration: 3000 });
      window.localStorage.clear();
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // register
    builder
      .addCase(handleRegisterUser.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(handleRegisterUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload?.user;
        state.token = payload?.token;
      })
      .addCase(handleRegisterUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // login
    builder
      .addCase(handleLoginUser.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(handleLoginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload?.user;
        state.token = payload?.token;
      })
      .addCase(handleLoginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // change password
    builder.addCase(handleChangePassword.pending, (state, {}) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleChangePassword.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(handleChangePassword.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload ?? null;
    });

    // upadte profile
    builder.addCase(handleUpdateProfile.pending, (state, {}) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleUpdateProfile.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.user = payload?.user;
    });
    builder.addCase(handleUpdateProfile.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload ?? null;
    });

    // forgot password
    builder.addCase(handleForgotPassword.pending, (state, {}) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleForgotPassword.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = null;
      state.token = null;
    });
    builder.addCase(handleForgotPassword.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = payload ?? null;
      state.token = null;
    });

    // reset password
    builder.addCase(handleResetPassword.pending, (state, {}) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handleResetPassword.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = null;
      state.token = null;
    });
    builder.addCase(handleResetPassword.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = payload ?? null;
      state.token = null;
    });
  },
});

export const { handleLogout } = AuthSlice.actions;
export default AuthSlice.reducer;
