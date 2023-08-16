import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import AudioBookApi from '../../api/audioBookApi';

export const getAllAudioBook = createAsyncThunk(
	'audio-book',
	async (query: Query, thunkAPI) => {
		console.log(query);

		const response = await AudioBookApi.getListAudioBook(query);

		return response.data;
	},
);

export const updateAudioBook = createAsyncThunk(
	'audio-book/update',
	async (data: any, thunkAPI) => {
		const response = await AudioBookApi.updateAudioBook(data.id, data.formData);
		if (!response.success) throw response.message;
		return response.data;
	},
);

export const saveAudioBook = createAsyncThunk(
	'audio-book/save',
	async (data: any, thunkAPI) => {
		const response = await AudioBookApi.saveAudioBook(data);
		if (!response.success) throw response.message;
		return response.data;
	},
);

export interface AudioBookState {
	audioBooks: [];
	metadata: Metadata;
	error: ErrorResponse | null;
}
const initialState: AudioBookState = {
	audioBooks: [],
	metadata: {},
	error: null,
};
const audioBookSlice = createSlice({
	name: 'audiobook',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getAllAudioBook.fulfilled, (state, action) => {
				state.audioBooks = action.payload?.results;
				state.metadata = action.payload?.meta ?? {};
				state.error = null;
			})
			.addMatcher(
				(action) => action.type.includes('rejected'),
				(state, action) => {
					state.error = {
						message: action.error.message,
						errorCode: action.error.code,
					};
					state.audioBooks = [];
					state.metadata = {};
				},
			)
			.addDefaultCase((state, action) => {
				// console.log(`action type: ${action.type}`, current(state));
			});
	},
});

export const {} = audioBookSlice.actions;
export default audioBookSlice.reducer;
