import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { ILogin } from '../../interfaces/auth.interface';
import { IUser } from '../../interfaces/user.interface';
import AuthApi from './../../api/authApi';

export const requestLogin = createAsyncThunk(
	'auth/login',
	async (input: ILogin, thunkAPI) => {
		const response = await AuthApi.login(input);

		if (!response.success) throw response.message;
		localStorage.setItem('token', JSON.stringify(response.data?.accessToken));
		return response.data;
	},
);

export interface AuthState {
	currentUser: IUser | null | undefined;
	accessToken: string;
	message: string;
}
const initialState: AuthState = {
	currentUser: null,
	accessToken: '',
	message: '',
};
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(requestLogin.fulfilled, (state, action) => {
				state.currentUser = action.payload;
			})
			.addCase(requestLogin.rejected, (state, action) => {
				state.message = action.error.message ?? '';
			})
			.addMatcher(
				(action) => action.type.includes('cancel'),
				(state, action) => {
					console.log(current(state));
				},
			)
			.addDefaultCase((state, action) => {
				console.log(`action type: ${action.type}`, current(state));
			});
	},
});

export const {
	// loginStart,
	// loginSuccess,
	// loginFailed,
	// logoutStart,
	// logoutSuccess,
	// logoutFailed,
} = authSlice.actions;
export default authSlice.reducer;
