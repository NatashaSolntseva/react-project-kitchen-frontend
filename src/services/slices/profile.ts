import Api from '../../utils/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../../services/store';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import { TStatus, TUser, TProfile, TErrors } from '../../utils/types';
import { IUserApi } from '../../utils/interfaces';

type TInitialState = {
  status: TStatus;
  user: TUser;
  selectedProfile: TProfile | null;
  isAuth: boolean;
  errors: TErrors;
  following: boolean;
};

export const initialState: TInitialState = {
  status: 'success',
  user: {
    username: '',
    email: '',
    bio: '',
    image: '',
  },
  selectedProfile: null,
  isAuth: !!getCookie('accessToken'),
  errors: {},
  following: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setStatusSuccess(state) {
      state.status = 'success';
    },
    setStatusPending(state) {
      state.status = 'pending';
    },
    setStatusFailed(state) {
      state.status = 'failed';
    },
    setUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
    },
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setErrors(state, action: PayloadAction<TErrors>) {
      state.errors = action.payload;
    },
    signOut(state) {
      state.user = {
        username: '',
        email: '',
        bio: '',
        image: '',
      };
      state.isAuth = false;
      deleteCookie('accessToken');
    },
    setSelectedProfileSuccess(state, action: PayloadAction<TProfile>) {
      state.selectedProfile = action.payload;
    },
    resetSelectedProfile(state) {
      state.selectedProfile = null;
    },
  },
});

export const {
  setStatusSuccess,
  setStatusPending,
  setStatusFailed,
  setUser,
  setAuth,
  setErrors,
  signOut,
  setSelectedProfileSuccess,
  resetSelectedProfile,
} = profileSlice.actions;

export const signIn: AppThunk = (data: IUserApi) => (dispatch: AppDispatch) => {
  dispatch(setStatusPending());
  Api.signIn(data)
    .then((res) => {
      setCookie('accessToken', res.user.token);
      dispatch(setUser(res.user));
      dispatch(setAuth(true));
      dispatch(setStatusSuccess());
      dispatch(setErrors({}));
    })
    .catch((err) => {
      dispatch(setStatusFailed());
      dispatch(setAuth(false));
      console.log(err.message);
      dispatch(setErrors(err.response.data.errors));
    });
};

export const registerUser: AppThunk =
  (data: IUserApi) => (dispatch: AppDispatch) => {
    dispatch(setStatusPending());
    Api.register(data)
      .then((res) => {
        setCookie('accessToken', res.user.token);
        dispatch(setUser(res.user));
        dispatch(setAuth(true));
        dispatch(setStatusSuccess());
        dispatch(setErrors({}));
      })
      .catch((err) => {
        dispatch(setStatusFailed());
        dispatch(setAuth(false));
        console.log(err.message);
        dispatch(setErrors(err.response.data.errors));
      });
  };

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(setStatusPending());
  Api.getUser()
    .then((res) => {
      dispatch(setUser(res.user));
      dispatch(setStatusSuccess());
    })
    .catch((err) => {
      dispatch(setStatusFailed());
      console.log(err.message);
      dispatch(setErrors(err.response.data.errors));
    });
};

export const patchUser: AppThunk =
  (data: IUserApi) => (dispatch: AppDispatch) => {
    dispatch(setStatusPending());
    Api.patchUser(data)
      .then((res) => {
        dispatch(setUser(res.user));
        dispatch(setStatusSuccess());
      })
      .catch((err) => {
        dispatch(setStatusFailed());
        console.log(err.message);
        dispatch(setErrors(err.response.data.errors));
      });
  };

export const getProfile: AppThunk =
  (username: string) => (dispatch: AppDispatch) => {
    dispatch(setStatusPending());
    Api.getProfile(username)
      .then((res) => {
        dispatch(setSelectedProfileSuccess(res.profile));
        dispatch(setStatusSuccess());
      })
      .catch((err) => {
        dispatch(setStatusFailed());
        console.log(err.message);
        dispatch(setErrors(err.response.data.errors));
      });
  };

export const followUser: AppThunk =
  (username: string) => (dispatch: AppDispatch) => {
    dispatch(setStatusPending());
    Api.followUser(username)
      .then((res) => {
        dispatch(setSelectedProfileSuccess(res.profile));
        dispatch(setStatusSuccess());
      })
      .catch((err) => {
        dispatch(setStatusFailed());
        console.log(err.message);
        dispatch(setErrors(err.response.data.errors));
      });
  };

export const unfollowUser: AppThunk =
  (username: string) => (dispatch: AppDispatch) => {
    dispatch(setStatusPending());
    Api.unfollowUser(username)
      .then((res) => {
        dispatch(setSelectedProfileSuccess(res.profile));
        dispatch(setStatusSuccess());
      })
      .catch((err) => {
        dispatch(setStatusFailed());
        console.log(err.message);
        dispatch(setErrors(err.response.data.errors));
      });
  };

export default profileSlice.reducer;
