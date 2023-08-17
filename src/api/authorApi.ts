import { ApiListResponse, ApiResponse } from '../interfaces/apiResponse';
import Api from './api';
class AuthorApi {
	private baseUrl: string;
	constructor() {
		this.baseUrl = 'author';
	}

	async getListAuthor(query: Query) {
		return Api.GET<ApiListResponse<any>>(this.baseUrl, { ...query });
	}

	async getAuthor(id: number) {
		return Api.GET<ApiResponse<any>>(this.baseUrl + '/' + id);
	}

	async updateAuthor(id: number, data: any) {
		return Api.PUT<ApiResponse<any>>(this.baseUrl + '/' + id, data);
	}

	async saveAuthor(data: any) {
		return Api.POST<ApiResponse<any>>(this.baseUrl, data);
	}
}
export default new AuthorApi();
