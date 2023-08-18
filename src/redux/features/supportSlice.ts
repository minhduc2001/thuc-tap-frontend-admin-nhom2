import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../enums/enum';
import supportApi from '../../api/supportApi';

export const getSupport = createAsyncThunk(
	'support',
	async (query: Query, thunkAPI) => {
		const response = await supportApi.getListSupport(query);
		if (!response.success) throw response.message;
		return response.data;
	},
);

export interface Support {
	code?: string;
	subject?: any;
	title?: string;
	content?: string;
	createdAt?: string;
	priority?: number;
	resolved?: number;
	images?: string[];
	user?: any;
}

export interface SupportState {
	supports: Support[];
	metadata: Metadata;
	error: ErrorResponse | null;
	loading: LoadingStatus;
}
const initialState: SupportState = {
	supports: [],
	metadata: {},
	error: null,
	loading: LoadingStatus.Pedding,
};
const supportSlice = createSlice({
	name: 'support',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getSupport.fulfilled, (state, action) => {
				state.supports = action.payload?.results;
				state.metadata = action.payload?.meta ?? {};
			})
			.addMatcher(
				(action) => action.type.includes('rejected'),
				(state, action) => {
					state.error = {
						message: action.error.message,
						errorCode: action.error.code,
					};
					state.supports = [];
					state.metadata = {};
				},
			)
			.addMatcher(
				(action) => action.type.includes('fulfilled'),
				(state, action) => {
					state.error = null;
					state.loading = LoadingStatus.Fulfilled;
				},
			)
			.addDefaultCase((state, action) => {
				// console.log(`action type: ${action.type}`, current(state));
			});
	},
});

export const {} = supportSlice.actions;
export default supportSlice.reducer;
