import { ApiListResponse, ApiResponse } from '../interfaces/apiResponse';
import { ILogin, IRegister, IToken } from '../interfaces/auth.interface';
import { IUser } from '../interfaces/user.interface';
import Api from './api';

class AudioBookApi {
	private baseUrl: string;
	constructor() {
		this.baseUrl = '/audio-book';
	}

	async getListAudioBook(query: Query) {
		return Api.GET<ApiListResponse<any>>(this.baseUrl, query);
	}

	async getAudioBook(id: number) {
		return Api.GET<ApiResponse<any>>(this.baseUrl + '/' + id);
	}

	async updateAudioBook(id: number, data: any) {
		return Api.PUT<ApiResponse<any>>(this.baseUrl + '/' + id, data);
	}

	async saveAudioBook(data: any) {
		return Api.POST<ApiResponse<any>>(this.baseUrl, data);
	}
}

export default new AudioBookApi();
