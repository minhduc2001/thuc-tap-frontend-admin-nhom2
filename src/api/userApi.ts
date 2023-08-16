import { ApiResponse } from '../interfaces/apiResponse';
import { ILogin, IRegister, IToken } from '../interfaces/auth.interface';
import { IUser } from '../interfaces/user.interface';
import Api from './api';

class UserApi {
	private baseUrl: string;
	constructor() {
		this.baseUrl = '/users';
	}

	async getMe(): Promise<ApiResponse<IUser>> {
		return Api.GET<ApiResponse<IUser>>(this.baseUrl + '/get-me');
	}

	async update(userData: any): Promise<ApiResponse<IUser>> {
		return Api.PUT<ApiResponse<IUser>>(this.baseUrl + '/update', userData);
	}

	async updateAvatar(data: any): Promise<ApiResponse<IUser>> {
		return Api.PUT<ApiResponse<IUser>>(this.baseUrl + '/upload-avatar', data);
	}
}

export default new UserApi();
