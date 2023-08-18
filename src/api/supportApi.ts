import { ApiListResponse, ApiResponse } from '../interfaces/apiResponse';
import Api from './api';
class SupportApi {
	private baseUrl: string;
	constructor() {
		this.baseUrl = 'support';
	}

	async getListSupport(query: Query) {
		return Api.GET<ApiListResponse<any>>(this.baseUrl, { ...query });
	}

	async getSupport(code: string) {
		return Api.GET<ApiResponse<any>>(this.baseUrl + '/' + code);
	}

	async resloved(id: number) {
		return Api.PUT<ApiResponse<any>>(this.baseUrl + '/resolved/' + id, {});
	}

	async cancel(id: number) {
		return Api.PUT<ApiResponse<any>>(this.baseUrl + '/cancel/' + id, {});
	}
}
export default new SupportApi();
