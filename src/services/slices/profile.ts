import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

type TProfileState = {
  user: TUser | null;
  isLoading: boolean;
  isAuthChecked: boolean;
  error: string | null;
};

const initialState: TProfileState = {
  user: null,
  isLoading: false,
  isAuthChecked: false,
  error: null
};

// Thunk
export const signUp = createAsyncThunk('profile/signUp', registerUserApi);
export const signIn = createAsyncThunk('profile/signIn', loginUserApi);
export const getUser = createAsyncThunk('profile/user', getUserApi);
export const updateUser = createAsyncThunk('profile/update', updateUserApi);
export const logout = createAsyncThunk('profile/logout', logoutApi);

// Matchers
interface RejectedAction extends Action {
  error: { message?: string };
}

const isPendingAction = (action: Action) => action.type.endsWith('/pending');
const isRejectedAction = (action: Action): action is RejectedAction =>
  action.type.endsWith('/rejected');

// Slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsLoading: (state) => state.isLoading,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder

      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = false;
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.error = null;
        state.isAuthChecked = false;
        state.isLoading = false;
      })
      .addMatcher(isPendingAction, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? 'Ошибка';
      });
  }
});

// export const {
//     selectUser,
//     selectIsLoading,
//     selectIsAuthChecked,
//     selectError
// } = profileSlice.selectors;

export const profileSelectors = profileSlice.selectors;

export const { clearError, setAuthChecked } = profileSlice.actions;

export default profileSlice;
