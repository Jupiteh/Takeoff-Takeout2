import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId) => {
    const response = await axios.get(`/api/user/${userId}`);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    token: '',
    role: '',
    isLoggedIn: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      const decodedToken = jwtDecode(action.payload.token); // Décodez le token
      state.role = decodedToken.role; // Extrayez le rôle
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.name = '';
      state.email = '';
      state.token = '';
      state.role = '';
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
        const decodedToken = jwtDecode(action.payload.token); // Décodez le token
        state.role = decodedToken.role; // Extrayez le rôle
        state.isLoggedIn = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
