import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number | null;
  name: string | null;
  email: string | null;
  roles: string[];
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  roles: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        email: string;
        roles: string[];
      }>
    ) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.roles = action.payload.roles;
    },
    clearUser(state) {
      state.id = null;
      state.name = null;
      state.email = null;
      state.roles = [];
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
