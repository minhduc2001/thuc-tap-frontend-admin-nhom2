import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import authorApi from '../../api/authorApi';
import { LoadingStatus } from '../../enums/enum';

export const getAllAuthor = createAsyncThunk(
	'author',
	async (query: Query, thunkAPI) => {
		const response = await authorApi.getListAuthor(query);
		return response.data;
	},
);

export const updateAuthor = createAsyncThunk(
	'author/update',
	async (data: any, thunkAPI) => {
		const response = await authorApi.updateAuthor(data.id, data.formData);
		if (!response.success) throw response.message;
		return response.data;
	},
);

export const saveAuthor = createAsyncThunk(
	'author/save',
	async (data: any, thunkAPI) => {
		const response = await authorApi.saveAuthor(data);
		if (!response.success) throw response.message;
		return response.data;
	},
);

export interface AuthorState {
	authors: [];
	metadata: Metadata;
	error: ErrorResponse | null;
	loading: LoadingStatus;
}
const initialState: AuthorState = {
	authors: [],
	metadata: {},
	error: null,
	loading: LoadingStatus.Pedding,
};
const authorSlice = createSlice({
	name: 'author',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getAllAuthor.fulfilled, (state, action) => {
				state.authors = action.payload?.results;
				state.metadata = action.payload?.meta ?? {};
			})
			.addMatcher(
				(action) => action.type.includes('rejected'),
				(state, action) => {
					state.error = {
						message: action.error.message,
						errorCode: action.error.code,
					};
					state.authors = [];
					state.metadata = {};
					state.loading = LoadingStatus.Rejected;
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

export const {} = authorSlice.actions;
export default authorSlice.reducer;
