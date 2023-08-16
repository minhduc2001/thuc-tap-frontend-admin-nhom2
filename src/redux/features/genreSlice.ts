import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

import GenreApi from '../../api/genreApi';

export const listGenre = createAsyncThunk(
	'genre/list',
	async (query: Query, thunkAPI) => {
		const response = await GenreApi.getListGenre(query);

		if (!response.success) throw response.message;
		return response.data;
	},
);

export interface GenreState {
	genres: [];
	error: ErrorResponse | null;
	metadata: Metadata;
}
const initialState: GenreState = {
	genres: [],
	metadata: {},
	error: null,
};

const genreSlice = createSlice({
	name: 'genre',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(listGenre.fulfilled, (state, action) => {
				state.genres = action.payload?.results;
				state.metadata = action.payload?.meta ?? {};
			})

			.addMatcher(
				(action) => action.type.includes('rejected'),
				(state, action) => {
					state.error = {
						message: action.error.message ?? action.payload.message,
						errorCode: action.error.code,
					};
				},
			)
			.addDefaultCase((state, action) => {
				// console.log(`action type: ${action.type}`, current(state));
			});
	},
});

export default genreSlice.reducer;
