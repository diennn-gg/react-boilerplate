import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserData {
  id: number;
  name: string;
}

interface ApiState {
  userData: UserData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ApiState = {
  userData: null,
  status: 'idle',
  error: null,
};

export const login: any = createAsyncThunk(
  'auth/login',
  async () => {
    await axios.get<UserData>('https://api.example.com/login')
  }
);

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(login.pending, (state: ApiState) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state: ApiState, action: PayloadAction<UserData>) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(login.rejected, (state: ApiState, action: PayloadAction<string>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const AuthStore = (state: { auth: ApiState } ) => state.auth;
export default auth.reducer;
