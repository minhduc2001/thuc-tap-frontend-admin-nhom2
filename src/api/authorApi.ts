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
}
export default new AuthorApi();
