import { ApiListResponse, ApiResponse } from '../interfaces/apiResponse';
import Api from './api';
class GenreApi {
	private baseUrl: string;
	constructor() {
		this.baseUrl = 'genre';
	}

	async getListGenre(query: Query) {
		return Api.GET<ApiListResponse<any>>(this.baseUrl, { ...query });
	}
}
export default new GenreApi();
