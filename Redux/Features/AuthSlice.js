import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Vite Env variable
const API_URL = import.meta.env.VITE_API_URL;

// Global settings taaki baar-baar na likhna pade
axios.defaults.withCredentials = true;

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  logoutSuccess: false, 
  message: "",
};

// --- Login User ---
export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, userData);
    
    // Naye backend response (success: true) ke hisaab se data nikala
    const userDataToSave = response.data.user || response.data;
    localStorage.setItem("user", JSON.stringify(userDataToSave));
    
    return userDataToSave;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login Failed");
  }
});

// --- Register User ---
export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration Failed");
  }
});

// --- Verify OTP ---
export const verifyOtp = createAsyncThunk("auth/verifyOtp", async (otpData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/verify`, otpData);
    
    const userDataToSave = response.data.user || response.data;
    if (userDataToSave?._id || userDataToSave?.email) {
      localStorage.setItem("user", JSON.stringify(userDataToSave));
    }
    
    return userDataToSave;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Invalid OTP");
  }
});

// --- Resend OTP ---
export const resendOtp = createAsyncThunk("auth/resendOtp", async (emailData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/resend-otp`, emailData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to resend OTP");
  }
});

// --- Check Auth Status ---
export const CheckingLogin = createAsyncThunk("auth/checkingLogin", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/check-auth`);
    return response.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Session Expired");
  }
});

// --- Logout User ---
export const logoutUserThunk = createAsyncThunk("auth/logoutUserThunk", async (_, thunkAPI) => {
  try {
    await axios.post(`${API_URL}/api/auth/logout`);
    localStorage.removeItem("user");
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Logout failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.logoutSuccess = false;
      state.message = "";
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login flow
      .addCase(loginUser.pending, (state) => { state.isLoading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Register flow
      .addCase(registerUser.pending, (state) => { state.isLoading = true; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message || "OTP Sent!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // OTP Verification
      .addCase(verifyOtp.pending, (state) => { state.isLoading = true; })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Resend OTP
      .addCase(resendOtp.pending, (state) => { state.isLoading = true; })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Auth check
      .addCase(CheckingLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(CheckingLogin.rejected, (state) => {
        state.user = null;
        localStorage.removeItem("user");
      })
      
      
      // Logout
.addCase(logoutUserThunk.fulfilled, (state) => {
  state.user = null;
  state.isLoading = false;
  state.isError = false;
  state.logoutSuccess = true;
  state.message = "Logout Successful";
});
  },
});

export const { resetAuth, logout } = authSlice.actions;
export default authSlice.reducer;