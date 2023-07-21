import { ApiResponse } from '../interfaces/apiResponse';
import { ILogin, IRegister, IToken } from '../interfaces/auth.interface';
import { IUser } from '../interfaces/user.interface';
import Api from './api';

class AudioBookApi {
	private baseUrl: string;
	constructor() {
		this.baseUrl = '/audio-book';
	}

	async getListAudioBook(query: string) {
		return Api.GET(this.baseUrl + '?' + query);
	}

	async getAudioBook(id: number) {
		return Api.GET(this.baseUrl, id);
	}
}

export default new AudioBookApi();
