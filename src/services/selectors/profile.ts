import { RootState } from 'services/store';

export const selectCurrentUser = (state: RootState) => state.profile.user;
export const userErrors = (state: RootState) => state.profile.errors;
export const isAuth = (state: RootState) => state.profile.isAuth;
