import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  user: null,
  email: null,
  role: null,
  photo: null,
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
      state.user = decodedToken.user;
      state.email = decodedToken.email;
      state.role = decodedToken.role;
      state.photo = decodedToken.photo;
    },
    clearUser(state) {
      state.user = null;
      state.role = null;
      state.token = null;
      state.email = null;
      state.photo = null;
    },
    updateProfile(state, action) {
      state.user = action.payload.pseudo;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.photo = action.payload.photo;
    }
  },
});

export const { setUser, clearUser, updateProfile } = userSlice.actions;
export default userSlice.reducer;
