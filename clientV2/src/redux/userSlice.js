import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  user: null,
  email: null,
  role: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { token } = action.payload;
      state.token = token;

      // Décoder le token pour extraire les informations
      const decodedToken = jwtDecode(token);
      state.user = decodedToken.username;
      state.email = decodedToken.email;
      state.role = decodedToken.role;
    },
    clearUser(state) {
      state.user = null;
      state.role = null;
      state.token = null;
      state.email = null;
    },
    updateProfile(state, action) {
      state.user = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
    }
  },
});

export const { setUser, clearUser, updateProfile } = userSlice.actions;
export default userSlice.reducer;
